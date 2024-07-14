/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const AnimatedCount = ({ finalCount }) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const animationDuration = 500; // in milliseconds
		const steps = finalCount;
		const stepDuration = animationDuration / steps;

		let currentStep = 0;

		const interval = setInterval(() => {
			if (currentStep <= steps) {
				setCount(currentStep);
				currentStep += 1;
			} else {
				clearInterval(interval);
			}
		}, stepDuration);

		return () => clearInterval(interval);
	}, [finalCount]);

	return <div className="font-bold py-2 text-3xl">{count}</div>;
};
export default AnimatedCount