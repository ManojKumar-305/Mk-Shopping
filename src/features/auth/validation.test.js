import { describe, expect, it } from "vitest";

import { validateLogin } from "./validation";

describe("validateLogin", () => {
  it("allows sign-in when a password is provided even if it is shorter than 8 characters", () => {
    const errors = validateLogin({
      email: "user@example.com",
      password: "short",
    });

    expect(errors).toEqual({});
  });
});
