export const deepEquals = (
	a: Parameters<typeof JSON.stringify>[0],
	b: Parameters<typeof JSON.stringify>[0]
): boolean => JSON.stringify(a) === JSON.stringify(b);

export const loopOf = (n:number) => new Array(n).fill(0);