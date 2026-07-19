import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useAuth } from "./use-auth";

describe("useAuth", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts unauthenticated with no user and not loading", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it("exposes login, logout, and signup functions", () => {
    const { result } = renderHook(() => useAuth());
    expect(typeof result.current.login).toBe("function");
    expect(typeof result.current.logout).toBe("function");
    expect(typeof result.current.signup).toBe("function");
  });

  it("login is a stub that warns and does not authenticate", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.login("a@b.com", "pw");
    });
    expect(result.current.isAuthenticated).toBe(false);
    expect(console.warn).toHaveBeenCalled();
  });

  it("logout resets the user to null without throwing", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.logout();
    });
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("keeps stable callback identities across re-renders", () => {
    const { result, rerender } = renderHook(() => useAuth());
    const firstLogin = result.current.login;
    const firstLogout = result.current.logout;
    rerender();
    expect(result.current.login).toBe(firstLogin);
    expect(result.current.logout).toBe(firstLogout);
  });
});
