import * as React from "react";
import { useTheme } from "next-themes";

export function useMetaColor() {
	const { resolvedTheme } = useTheme();

	const metaColor = React.useMemo(() => {
		return resolvedTheme !== "dark" ? "#ffffff" : "#09090b";
	}, [resolvedTheme]);

	const setMetaColor = React.useCallback((color: string) => {
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute("content", color);
	}, []);

	return {
		metaColor,
		setMetaColor,
	};
}
