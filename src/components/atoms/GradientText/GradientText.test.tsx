import { render, screen } from "@testing-library/react";
import { GradientText } from ".";

describe("GradientText", () => {
  test("renders <GradientText /> correctly", () => {
    render(<GradientText>Gradient!</GradientText>);
    const element = screen.getByText(/gradient/i);
    expect(element).toBeInTheDocument();
  });

  test("renders <GradientText /> correctly", () => {
    const component = render(<GradientText as="p">Gradient!</GradientText>);
    expect(component.container.tagName).toBe("PARAGRAPH");
  });
});
