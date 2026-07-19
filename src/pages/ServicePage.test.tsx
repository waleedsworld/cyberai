import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { renderWithProviders } from "@/test/render";
import ServicePage from "./ServicePage";
import { services } from "@/data/services";

function renderAt(route: string) {
  return renderWithProviders(
    <Routes>
      <Route path="/services/:slug" element={<ServicePage />} />
    </Routes>,
    { route },
  );
}

describe("ServicePage", () => {
  it("renders the title of a known service", () => {
    const service = services[0];
    renderAt(`/services/${service.slug}`);
    expect(
      screen.getAllByText(service.title).length,
    ).toBeGreaterThan(0);
  });

  it("shows a not-found state for an unknown slug", () => {
    renderAt("/services/this-service-does-not-exist");
    expect(
      screen.getByRole("heading", { name: /service not found/i }),
    ).toBeInTheDocument();
  });

  it("renders one of the service deliverables in the body", () => {
    const service = services.find((s) => s.deliverables.length > 0)!;
    renderAt(`/services/${service.slug}`);
    expect(
      screen.getAllByText(service.deliverables[0]).length,
    ).toBeGreaterThan(0);
  });
});
