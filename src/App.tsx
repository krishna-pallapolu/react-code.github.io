// App.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slide from "./components/Slide";
import SlideControls from "./components/SlideControls";

interface SlideData {
	id: number;
	title: string;
	url: string;
}

const App: React.FC = () => {
	const [slides, setSlides] = useState<SlideData[]>([]);
	const [currentSlide, setCurrentSlide] = useState(1);

	useEffect(() => {
		axios
			.get("https://jsonplaceholder.typicode.com/photos")
			.then((response) => {
				const slidesData: SlideData[] = response.data.slice(0, 5); // Fetching first 5 slides for example
				setSlides(slidesData);
			})
			.catch((error) => {
				console.error("Error fetching slides:", error);
			});
	}, []);

	const handlePrevious = () => {
		setCurrentSlide((prevSlide) => prevSlide - 1);
	};

	const handleNext = () => {
		setCurrentSlide((prevSlide) => prevSlide + 1);
	};

	const handleRestart = () => {
		setCurrentSlide(1);
	};

	return (
		<div className="app container pb-5 mb-5">
			{slides.length > 0 && (
				<>
					<SlideControls currentSlide={currentSlide} totalSlides={slides.length} onPrevious={handlePrevious} onNext={handleNext} onRestart={handleRestart} />
					<Slide title={slides[currentSlide - 1].title} imageUrl={slides[currentSlide - 1].url} slideNumber={currentSlide} />
				</>
			)}
		</div>
	);
};

export default App;
