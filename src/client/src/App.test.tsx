import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Router from "./pages/Router";

describe("<App />", () => {
  test("App mounts properly", () => {
    const wrapper = render(<Router />);
    expect(wrapper).toBeTruthy();

    // Get by text using the React testing library
    const text = screen.getByText(Inspirations);
    expect(text.textContent).toBeTruthy();
  });
});
