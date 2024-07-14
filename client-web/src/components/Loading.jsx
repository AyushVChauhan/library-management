import { ProgressSpinner } from "primereact/progressspinner"

function Loading() {
	return (
		<div className="w-screen h-screen absolute top-0 left-0 z-[999] bg-black bg-opacity-30 flex flex-row justify-center items-center">
			<ProgressSpinner />
		</div>
	)
}

export default Loading