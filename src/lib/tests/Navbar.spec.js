import { it } from "vitest";
import Navbar from "../components/nav/Navbar.svelte";
import { cleanup, render, fireEvent, screen } from "@testing-library/svelte";

describe("Navbar Component Tests", () => {
  afterEach(() => cleanup());

  it("mounts", () => {
    const { container } = render(Navbar);
    expect(container).toBeTruthy();
  });

  it("button opens menu", async () => {
    render(Navbar);
    const menuButton = screen.getByTestId("menu-button");
    const div = screen.getAllByTestId("menu-div");
    await fireEvent.click(menuButton);
    expect(div).toContain(ul);
  });
});
