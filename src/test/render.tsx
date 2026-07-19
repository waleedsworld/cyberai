import { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Options = Omit<RenderOptions, "wrapper"> & {
  route?: string;
};

/**
 * Render a component inside the same providers the real app uses
 * (React Router + TanStack Query), starting at an optional route.
 */
export function renderWithProviders(ui: ReactElement, options: Options = {}) {
  const { route = "/", ...rtlOptions } = options;
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </QueryClientProvider>,
    rtlOptions,
  );
}
