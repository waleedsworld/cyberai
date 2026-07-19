import { describe, it, expect, vi, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { renderWithProviders } from "@/test/render";
import NotFound from "./NotFound";

describe("NotFound page", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the 404 heading and a link home", () => {
    renderWithProviders(
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>,
      { route: "/totally-missing" },
    );

    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(
      screen.getByText(/slipped past our perimeter/i),
    ).toBeInTheDocument();

    const home = screen.getByRole("link", { name: /return home/i });
    expect(home).toHaveAttribute("href", "/");
  });

  it("logs the attempted route for observability", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    renderWithProviders(
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>,
      { route: "/nope" },
    );
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("404"),
      "/nope",
    );
  });
});
