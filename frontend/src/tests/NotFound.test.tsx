import { render, screen } from "@testing-library/react";
import NotFound from "../pages/NotFound";

test("renders 404 Error :(", () => {
  render(<NotFound />);
  const linkElement = screen.getByText(/404 Error :\(/i);
  expect(linkElement).toBeInTheDocument();
});
