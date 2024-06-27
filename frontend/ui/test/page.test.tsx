import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/home/page";

describe("Home page tests", () => {
  it("renders a heading with text 'Welcome!'", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/welcome!/i);
  });
});
