const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
	let timeout: any = null;

	return (...args: Parameters<F>): Promise<ReturnType<F>> =>
		new Promise(resolve => {
			if (timeout) {
				clearTimeout(timeout)
			}

			timeout = setTimeout(() => resolve(func(...args)), waitFor);
		});
}

export { debounce }