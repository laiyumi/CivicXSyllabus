import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import HeroSection from "./HeroSection";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock Axios globally
jest.mock("axios");

describe("HeroSection Component", () => {
  beforeEach(() => {
    // Mock useRouter to avoid errors in HeroSection or its children
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/",
    });

    // Mock the Axios GET request
    (axios.get as jest.Mock).mockResolvedValue({
      data: [], // Simulated response data for /api/categories
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("renders an h1 element with the correct text", () => {
    render(<HeroSection />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Your Roadmap to Civic Innovation");
  });

  it("renders an h2 element with the correct text", () => {
    render(<HeroSection />);

    const subheading = screen.getByRole("heading", { level: 2 });
    expect(subheading).toBeInTheDocument();
    expect(subheading).toHaveTextContent(
      "Your go-to platform for building foundational civic innovation knowledge. Our platform curates high-quality resources searchable by resource type and topic."
    );
  });
});
