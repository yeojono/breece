import type { ShapeType } from '../model/shapes';

export const puzzles: ShapeType[][] = [
	// Predictable
	['square', 'square', 'circle', 'square', 'square', 'circle'],
	['triangle', 'circle', 'triangle', 'triangle', 'circle', 'triangle'],
	['triangle', 'star', 'star', 'triangle', 'star', 'star'],
	// Random
	['star', 'square', 'star', 'star', 'square', 'square'],
	['triangle', 'triangle', 'square', 'triangle', 'square', 'triangle'],
	['square', 'circle', 'circle', 'square', 'circle', 'square']
];