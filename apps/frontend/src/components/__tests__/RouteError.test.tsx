import { render, screen } from "@testing-library/react";
import RouteError from "../RouteError";

describe("Common UI Components", () => {

  it("renders RouteError", () => {
    render(<RouteError />);
    expect(screen.getByAltText("404 Not Found")).toBeInTheDocument();
    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
  });

});