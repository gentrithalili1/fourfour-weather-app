import { useEffect } from "react";

export const useSetDocumentName = (name?: string) => {
	useEffect(() => {
		if (name) {
			document.title = `Weather in ${name}`;
		} else {
			document.title = "44Weather";
		}
	}, [name]);
};
