"use client";

import { toast, type ToasterProps } from "sonner";

import { getErrorMessage } from "@/core/utils/get-error-message";

type HandleErrorParams = {
	error?: unknown;
	toastOptions?: ToasterProps;
};
export const useErrorHandler = () => {
	const handleError = ({ error, toastOptions }: HandleErrorParams) => {
		toast.error("Error!", {
			description: getErrorMessage(error as unknown as Error | null | undefined),
			...toastOptions,
		});
	};

	return {
		handleError,
	};
};
