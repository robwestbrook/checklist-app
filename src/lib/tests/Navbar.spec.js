import Navbar from "../components/nav/Navbar.svelte";
import { render, fireEvent, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

describe("Navbar Component Tests", () => {
  test("Should render Navbar", () => {
    const rendered = render(Navbar);
    expect(rendered).toBeTruthy();
  });
  test("Hamburger Menu Button", async () => {
    render(Navbar);

    expect(Navbar.menuOpen).toBeTruthy();
  });
});
