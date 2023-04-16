import Navbar from "../components/nav/Navbar.svelte";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

describe("Navbar Component", () => {
  test("should render the component", () => {
    render(Navbar);

    const navbarTitle = screen.findByText(/Remember/i);

    expect(navbarTitle).toBeTruthy();
  });
});
