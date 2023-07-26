// SlideControls.tsx
import React from "react";

interface SlideControlsProps {
	currentSlide: number;
	totalSlides: number;
	onPrevious: () => void;
	onNext: () => void;
	onRestart: () => void;
}

const SlideControls: React.FC<SlideControlsProps> = ({ currentSlide, totalSlides, onPrevious, onNext, onRestart }) => {
	const isFirstSlide = currentSlide === 1;
	const isLastSlide = currentSlide === totalSlides;

	return (
		<div className="slide-controls d-flex align-items-center justify-content-center scontrols">
			<button onClick={onPrevious} disabled={isFirstSlide}>
				Previous
			</button>
			<button onClick={onNext} disabled={isLastSlide}>
				Next
			</button>
			<button onClick={onRestart}>Restart</button>
		</div>
	);
};

export default SlideControls;
