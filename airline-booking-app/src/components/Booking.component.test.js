import React from "react";
import { render, screen } from "@testing-library/react";
import Booking from "./Booking.component";
import { useUser } from "../contexts/User.context";

jest.mock("../contexts/User.context", () => ({
  useUser: jest.fn(),
}));

describe("Booking Component Tests", () => {
  beforeEach(() => {
    useUser.mockClear();
  });

  test("renders Booking component", () => {
    const mockFlight = {
      flightNumber: "AA123",
      departure: "JFK",
      destination: "LAX",
    };

    useUser.mockReturnValue({ user: { id: "user1", name: "Test User" } });

    render(
      <Booking
        show={true}
        handleClose={() => {}}
        aircraftId="12345"
        flight={mockFlight}
      />
    );

    expect(screen.getByText(/Booking Passengers/i)).toBeInTheDocument();
  });
});
