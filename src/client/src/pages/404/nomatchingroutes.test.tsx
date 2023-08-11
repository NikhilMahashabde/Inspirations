import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import NoMatchingRoutes from "./nomatchingroutes";

describe("<NoMatchingRoutes />", () => {
  test("404 component renders correctly and shows 404", () => {
    const wrapper = render(
      <ChakraProvider>
        <NoMatchingRoutes />
      </ChakraProvider>
    );

    expect(wrapper).toBeTruthy();

    const redirectButton = screen.getByRole("button");

    expect(redirectButton).toHaveTextContent("Go to Home");
  });
});
