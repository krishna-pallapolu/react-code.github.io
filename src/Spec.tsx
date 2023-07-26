// Spec.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import App from "./App";

jest.mock("axios"); // Mock axios to simulate API calls

const mockedAxios = axios as jest.Mocked<typeof axios>; // TypeScript specific mock

// Mock the response from the API
const mockedResponse = [
	{ id: 1, title: "Slide 1", url: "https://example.com/slide1.jpg" },
	{ id: 2, title: "Slide 2", url: "https://example.com/slide2.jpg" },
	{ id: 3, title: "Slide 3", url: "https://example.com/slide3.jpg" },
	{ id: 4, title: "Slide 4", url: "https://example.com/slide4.jpg" },
	{ id: 5, title: "Slide 5", url: "https://example.com/slide5.jpg" },
];

describe("App", () => {
	beforeEach(() => {
		mockedAxios.get.mockResolvedValueOnce({ data: mockedResponse });
	});

	it("renders Slide component with correct data", async () => {
		render(<App />);

		// Wait for the API call to complete and render the Slide component
		const slideElement = await screen.findByText("Slide 1");
		const imageElement = screen.getByAltText("Slide 1");
		const slideNumberElement = screen.getByText("Slide 1");

		// Assertions
		expect(slideElement).toBeInTheDocument();
		expect(imageElement).toHaveAttribute("src", "https://example.com/slide1.jpg");
		expect(slideNumberElement).toBeInTheDocument();
	});

	it("disables Previous and Restart buttons when showing the first slide", async () => {
		render(<App />);

		// Wait for the API call to complete and render the Slide Controls component
		const previousButton = await screen.findByText("Previous");
		const restartButton = screen.getByText("Restart");

		// Assertions
		expect(previousButton).toBeDisabled();
		expect(restartButton).not.toBeDisabled();

		// Ensure Next button is not disabled
		const nextButton = screen.getByText("Next");
		expect(nextButton).not.toBeDisabled();
	});

	it("disables Next button when showing the last slide", async () => {
		render(<App />);

		// Wait for the API call to complete and render the Slide Controls component
		const nextButton = await screen.findByText("Next");

		// Click Next button to navigate to the last slide
		fireEvent.click(nextButton);
		fireEvent.click(nextButton);
		fireEvent.click(nextButton);
		fireEvent.click(nextButton);

		// Wait for the UI to update and find the Next button again
		const nextButtonAfter = await screen.findByText("Next");

		// Assertions
		expect(nextButtonAfter).toBeDisabled();

		// Ensure Previous and Restart buttons are not disabled
		const previousButton = screen.getByText("Previous");
		const restartButton = screen.getByText("Restart");
		expect(previousButton).not.toBeDisabled();
		expect(restartButton).not.toBeDisabled();
	});

	it("restarts the presentation when clicking on Restart button", async () => {
		render(<App />);

		// Wait for the API call to complete and render the Slide Controls component
		const nextButton = await screen.findByText("Next");
		const restartButton = screen.getByText("Restart");

		// Click Next button to navigate to the last slide
		fireEvent.click(nextButton);
		fireEvent.click(nextButton);
		fireEvent.click(nextButton);
		fireEvent.click(nextButton);

		// Click Restart button
		fireEvent.click(restartButton);

		// Wait for the UI to update and find the Slide component with the first slide
		const slideElement = await screen.findByText("Slide 1");

		// Assertions
		expect(slideElement).toBeInTheDocument();

		// Ensure Previous and Restart buttons are disabled
		const previousButton = screen.getByText("Previous");
		expect(previousButton).toBeDisabled();
		expect(restartButton).not.toBeDisabled();
	});
});
