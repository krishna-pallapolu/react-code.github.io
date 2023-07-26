// Slide.tsx
import React from "react";

interface SlideProps {
	title: string;
	imageUrl: string;
	slideNumber: number;
}

const Slide: React.FC<SlideProps> = ({ title, imageUrl, slideNumber }) => {
	return (
		<div className="slide">
			<h2>{title}</h2>
			<img src={imageUrl} alt={title} />
			<p>Slide {slideNumber}</p>
		</div>
	);
};

export default Slide;
