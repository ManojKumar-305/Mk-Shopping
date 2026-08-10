import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Profile from "./Profile";

const updateProfileMock = vi.fn();
const mockUseAuth = vi.fn();

vi.mock("../hooks/useAuth", () => ({
  default: () => mockUseAuth(),
}));

describe("Profile", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      loading: false,
      user: {
        email: "alex@example.com",
        user_metadata: { full_name: "Alex Johnson" },
        created_at: "2024-01-15T10:00:00.000Z",
        email_confirmed_at: "2024-01-15T10:00:00.000Z",
      },
      updateProfile: updateProfileMock,
    });

    updateProfileMock.mockResolvedValue({ success: true });
  });

  function renderProfile() {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
  }

  it("allows updating the display name and saves it", async () => {
    const user = userEvent.setup();

    renderProfile();

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /edit profile/i }));
    });

    const nameInput = await screen.findByLabelText(/full name/i);

    await act(async () => {
      await user.clear(nameInput);
      await user.type(nameInput, "Alex Smith");
      await user.click(screen.getByRole("button", { name: /save changes/i }));
    });

    await waitFor(() => {
      expect(updateProfileMock).toHaveBeenCalledWith("Alex Smith");
    });
  });

  it("shows a success message after saving profile changes", async () => {
    const user = userEvent.setup();

    renderProfile();

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /edit profile/i }));
    });

    const nameInput = await screen.findByLabelText(/full name/i);

    await act(async () => {
      await user.clear(nameInput);
      await user.type(nameInput, "Alex Smith");
    });

    const saveButton = screen.getByRole("button", { name: /save changes/i });
    expect(saveButton).not.toBeDisabled();

    await act(async () => {
      await user.click(saveButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/profile updated successfully/i)).toBeInTheDocument();
    });
  });

  it("restores the original name when canceling edits", async () => {
    const user = userEvent.setup();

    renderProfile();

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /edit profile/i }));
    });

    const nameInput = await screen.findByLabelText(/full name/i);

    await act(async () => {
      await user.clear(nameInput);
      await user.type(nameInput, "Alex Smith");
      await user.click(screen.getByRole("button", { name: /cancel/i }));
    });

    expect(screen.getByText(/alex johnson/i)).toBeInTheDocument();
  });

  it("shows an error message when saving fails", async () => {
    const user = userEvent.setup();
    updateProfileMock.mockRejectedValueOnce(new Error("Network failure"));

    renderProfile();

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /edit profile/i }));
    });

    const nameInput = await screen.findByLabelText(/full name/i);

    await act(async () => {
      await user.clear(nameInput);
      await user.type(nameInput, "Alex Smith");
      await user.click(screen.getByRole("button", { name: /save changes/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/network failure/i)).toBeInTheDocument();
    });
  });
});
