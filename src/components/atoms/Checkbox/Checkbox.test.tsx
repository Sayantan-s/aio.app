import { render, screen } from "@testing-library/react";
import { Checkbox } from ".";

const POOP = () => {};

describe("Checkbox", () => {
  test("render <Checkbox /> correctly", () => {
    render(<Checkbox checked={false} onCheck={POOP} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    const svg = screen.queryByRole("img");
    expect(svg).not.toBeInTheDocument();
  });
  test("show checkbox green when checked!", () => {
    render(<Checkbox checked={true} onCheck={POOP} />);
    const svg = screen.queryByRole("img");
    expect(svg).toBeInTheDocument();
  });
});
