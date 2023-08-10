import { render, screen } from "@testing-library/react";
import { DataContext } from "../../context/AppContext";
import { describe, test, expect } from "vitest";

import Home from ".";

describe("<Home />", () => {
  test("Home component renders correctly", () => {
    const testValues = {
      isLoggedIn: false,
      userName: "Nikhil",
    };

    const wrapper = render(
      <DataContext.Provider value={testValues}>
        <Home />
      </DataContext.Provider>
    );

    expect(wrapper).toBeTruthy();

    const title = screen.getByRole("heading");

    expect(title).toHaveTextContent("Travel Planning made easy");
  });
});
