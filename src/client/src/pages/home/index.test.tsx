import { render, screen } from "@testing-library/react";
import { DataContext } from "../../context/AppContext";
import { describe, test, expect } from "vitest";

import Home from ".";

describe("<Home />", () => {
  test("Home component renders correctly", () => {
    const defaultValues = {
      isAuthenticated: false,
      isRowExpanded: [],
      setIsRowExpanded: () => {
        return;
      },
      setIsAuthenticated: () => {
        return;
      },
      setUserName: () => {
        return;
      },
      userName: "",
      navigate: () => {
        return;
      },
      errorResponse: "",
      setErrorResponse: () => {
        return;
      },
      myTrips: undefined,
      setMyTrips: () => {
        return;
      },
      tripData: {
        _id: "",
        images: [],
        name: "",
        authorisation: [],
        purpose: "",
        budget: 0,
        startDate: "",
        endDate: "",
        nodes: [],
        startLocation: "",
        endLocation: "",
        destinations: [],
        participants: 0,
      },
      setTripData: () => {
        return;
      },
    };

    const wrapper = render(
      <DataContext.Provider value={defaultValues}>
        <Home />
      </DataContext.Provider>
    );

    expect(wrapper).toBeTruthy();

    const title = screen.getByRole("heading");

    expect(title).toHaveTextContent("Travel Planning made easy");
  });
});
