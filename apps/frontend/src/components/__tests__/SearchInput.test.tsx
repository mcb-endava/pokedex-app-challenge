import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "../SearchInput";
import { vi } from "vitest";
describe("Common UI Components", () => {

  it("renders SearchInput and calls onChange", () => {
    const onChangeMock = vi.fn();
    render(<SearchInput value="" onChange={onChangeMock} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    input.focus();
    (input as HTMLInputElement).value = "pikachu";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    fireEvent.change(input, { target: { value: "pikachu" } });
  });
});