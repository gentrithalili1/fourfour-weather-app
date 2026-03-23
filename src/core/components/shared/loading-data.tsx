import { Spinner } from "@/core/components/ui/spinner";

type LoadingDataProps = {
	message?: string;
};

export function LoadingData({ message = "Loading data..." }: LoadingDataProps) {
	return (
		<div className="flex flex-col items-center gap-3 text-center">
			<Spinner className="size-8" />
			<p className="text-sm opacity-90">{message}</p>
		</div>
	);
}
