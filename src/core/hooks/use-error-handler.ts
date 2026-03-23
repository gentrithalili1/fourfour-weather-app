"use client";

import { toast, type ToasterProps } from "sonner";

interface HandleErrorParams {
	error: unknown;
	toastOptions?: ToasterProps;
}
export const useErrorHandler = () => {
	const handleError = ({ error, toastOptions }: HandleErrorParams) => {
		toast.error("Error!", {
			description: getErrorMessage(error),
			...toastOptions,
		});
	};

	return {
		handleError,
	};
};

// here we can add more error types to handle based on the error response from the server
// we'll keep it simple for this assignment
const getErrorMessage = (error: unknown) => {
	if (error instanceof Error) {
		return error.message;
	}

	if (typeof error === "string") {
		return error;
	}

	return String(error);
};
