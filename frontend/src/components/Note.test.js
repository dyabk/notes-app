import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Note from "./Note";

test("renders content", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  render(<Note note={note} />);

  /*
  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  */

  const { container } = render(<Note note={note} />);

  const div = container.querySelector(".note");
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );

  //the expect is not needed; the tst failes if getByText fails
  //expect(element).toBeDefined();
});
