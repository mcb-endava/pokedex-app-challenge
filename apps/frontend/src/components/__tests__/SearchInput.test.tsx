import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "../SearchInput";
import { vi } from "vitest";

describe("Common UI Components", () => {
  it("renders SearchInput and calls onChange", () => {
    const onChangeMock = vi.fn();
    render(<SearchInput value="" onChange={onChangeMock} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "pikachu" } });
    expect(onChangeMock).toHaveBeenCalledWith("pikachu");
  });
});