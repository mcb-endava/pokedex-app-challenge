import { render, screen } from "@testing-library/react";
import { Loading } from "../Loading";

describe("Loading component", () => {

  it("renders Loading with text", () => {
    render(<Loading text="Loading..." />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

});