import React, { useEffect, useRef } from 'react';

export const useClose = (toggleFunc: (state: boolean) => void) => {
	const ref = useRef<HTMLInputElement | null>(null);

	const closeHandler = (e: MouseEvent) => {
		const path: EventTarget[] = e.composedPath();
		if (ref.current && !path.includes(ref.current)) {
			toggleFunc(false);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			document.addEventListener('click', closeHandler);
		});
		return () => {
			document.removeEventListener('click', closeHandler);
		};
	}, []);

	return {
		ref,
	};
};
