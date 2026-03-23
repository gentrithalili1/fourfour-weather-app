// here we can add more error types to handle based on the error response from the server
// we'll keep it simple for this assignment

export const getErrorMessage = (error?: Error | null) => {
	if (error instanceof Error) {
		return error.message;
	}

	if (typeof error === "string") {
		return error;
	}

	return String(error);
};
