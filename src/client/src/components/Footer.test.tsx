import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Footer from "./Footer";

describe("<LoginButton />", () => {
  test("Footer contains links to my Github", () => {
    const wrapper = render(<Footer />);

    expect(wrapper).toBeTruthy();

    const githubText = screen.getByText("Github");

    expect(githubText).toHaveTextContent("Github");

    const githubLink = screen.getAllByRole("link");

    const linkHasGithubText = githubLink.some((link) =>
      link.textContent?.toLowerCase().includes("github")
    );

    expect(linkHasGithubText).toBeTruthy;
  });
});
