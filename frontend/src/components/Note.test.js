import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./Note";

test("renders content", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  render(<Note note={note} />);

  //screen.debug();

  const element = screen.getByText(
    "Component testing is done with react-testing-library",
    { exact: false }
  );
  //screen.debug(element);

  //the expect is not needed; the test failes if getByText fails
  expect(element).toBeDefined();

  //use CSS-selectors to find rendered elements by using the method querySelector
  //of the object container that is one of the fields returned by the render
  /*
  const { container } = render(<Note note={note} />);

  const div = container.querySelector(".note");
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
  */
});

test("does not render this", () => {
  const note = {
    content: "This is a reminder",
    important: true,
  };

  render(<Note note={note} />);

  const element = screen.queryByText("do not want this thing to be rendered");
  expect(element).toBeNull();
});

test("clicking the button calls event handler once", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const mockHandler = jest.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
