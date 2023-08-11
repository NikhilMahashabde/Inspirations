import { AddNodeAIButton } from "./AddNodeAIButton.tsx";

import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

describe("<LoginButton />", () => {
  test("Login button renders and shows Log in", () => {
    const wrapper = render(<AddNodeAIButton />);

    expect(wrapper).toBeTruthy();

    const redirectButton = screen.getByRole("button");

    expect(redirectButton).toHaveTextContent("Generate Leg with AI");
  });
});
