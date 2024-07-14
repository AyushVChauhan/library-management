/* eslint-disable react/prop-types */
import AnimatedCount from "./AnimatedCount";

function CountCard({ iconClass, count, label }) {
	return (
		<div className="min-w-[100%] md:min-w-[45%] lg:min-w-[30%] mt-10 mx-3">
			<div className="w-[90%] bg-slate-200 py-5 rounded-md mx-auto">
				<div className="flex justify-center">{iconClass}</div>
				<div className="flex justify-center">
					<AnimatedCount finalCount={count} />
				</div>
				<div className="flex justify-center">{label}</div>
			</div>
		</div>
	);
}

export default CountCard;
