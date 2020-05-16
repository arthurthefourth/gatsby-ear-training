import React from "react"
import WebMidi from "webmidi"
import * as Tone from "tone"

import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import Game from "../src/components/game"
import SequenceGenerator from "../src/components/sequence-generator"

const startingSequence = ["C3", "E3", "G3", "C3"]
const generateSequence = jest
  .spyOn(SequenceGenerator.prototype, "generate")
  .mockImplementation(() => startingSequence)

const playNote = Tone.mockMonoSynthTriggerAttackRelease

test("full integration test for all functionality", () => {
  jest.useFakeTimers()
  render(<Game />)

  // No replay button until we start
  expect(screen.queryByLabelText("replay")).not.toBeInTheDocument

  // START
  fireEvent.click(screen.getByRole("button", { name: "START" }))
  jest.runAllTimers()

  // Plays C major chord by default
  expect(Tone.mockPolySynthTriggerAttackRelease).toBeCalledWith(
    ["C3", "E3", "G3"],
    expect.anything()
  )

  // Plays starting sequence
  expect(
    playNote.mock.calls.map(call => call[0])
  ).toEqual(startingSequence)

  // Replay button shows up
  expect(screen.queryByLabelText("replay")).toBeInTheDocument

  // Replay button replays starting sequence
  playNote.mockClear()
  fireEvent.click(screen.getByRole("button", { name: "replay" }))
  jest.runAllTimers()
  expect(
    playNote.mock.calls.map(call => call[0])
  ).toEqual(startingSequence)

  // User plays notes
  const input = WebMidi.inputs[0]
  input.noteOn({ note: { name: "C#", octave: 4 } }) // Correct note
  input.noteOn({ note: { name: "E", octave: 2 } }) // Wrong note
  jest.runAllTimers()

  // Expect 2nd set of note blocks to be red, gray, gray, gray
  const noteBlocks = screen.getAllByRole("image", { name: /note/ })
  expect(noteBlocks).toHaveLength(8)
  const backgroundColors = [
    "grey",
    "grey",
    "grey",
    "grey",
    "red",
    "green",
    "grey",
    "grey",
  ]

  expect(
    noteBlocks.map(noteBlock => noteBlock.firstChild.style.backgroundColor)
  ).toEqual(backgroundColors)


  // Allow generateSequence to generate real sequences, so we can test settings changes
  generateSequence.mockRestore()
  fireEvent.click(screen.getByRole("button", { name: "Settings" }))

  // Change scale setting to "Do Re Mi"
  const scaleSelect = screen.getByRole("combobox", { name: "scale" })
  fireEvent.change(scaleSelect, { target: { value: "doReMi" } })

  playNote.mockClear()
  fireEvent.click(screen.getByRole("button", { name: "START" }))
  jest.runAllTimers()

  // Played notes fall within the appropriate scale
  playNote.mock.calls.forEach(note => {
    expect(note[0]).toBeOneOf(["C3", "D3", "E3"])
  })

  // Change key setting to C#
  const keySlider = screen.getByRole("slider", { name: "Key" })
  fireEvent.change(keySlider, { target: { value: 1 } })

  playNote.mockClear()
  fireEvent.click(screen.getByRole("button", { name: "START" }))
  jest.runAllTimers()

  // Played notes fall within the appropriate scale and key
  playNote.mock.calls.forEach(note => {
    expect(note[0]).toBeOneOf(["C#3", "D#3", "F3"])
  })
})
