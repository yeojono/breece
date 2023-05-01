import type { SequenceCharacter, ShapeType } from '../model/shapes';

export interface PuzzleConfig {
	sequence: string;
	a: ShapeType;
	b: ShapeType;
}
export const puzzlesV2: PuzzleConfig[] = [
	// Easy
	{ sequence: 'ABABABABA', a: 'square', b: 'circle' },
	{ sequence: 'ABABABABA', a: 'star', b: 'triangle' },
	{ sequence: 'ABABABABA', a: 'plus', b: 'octagon' },
	{ sequence: 'ABABABABA', a: 'star', b: 'square' },
	{ sequence: 'ABABABABA', a: 'plus', b: 'circle' },
	{ sequence: 'ABABABABA', a: 'triangle', b: 'octagon' },
	// Medium
	{ sequence: 'AABAABAAB', a: 'circle', b: 'star' },
	{ sequence: 'AABAABAAB', a: 'plus', b: 'triangle' },
	{ sequence: 'ABAABAABA', a: 'pentagon', b: 'square' },
	{ sequence: 'ABAABAABA', a: 'cross', b: 'octagon' },
	{ sequence: 'ABBABBABB', a: 'crescent', b: 'plus' },
	{ sequence: 'ABBABBABB', a: 'square', b: 'pentagon' },
	// Random
	{ sequence: 'ABAABBBAA', a: 'octagon', b: 'square' },
	{ sequence: 'ABAABBBAA', a: 'pentagon', b: 'triangle' },
	{ sequence: 'AABABAAAB', a: 'cross', b: 'crescent' },
	{ sequence: 'AABABAAAB', a: 'crescent', b: 'circle' },
	{ sequence: 'ABBABAABA', a: 'star', b: 'circle' },
	{ sequence: 'ABBABAABA', a: 'cross', b: 'star' }
];

export const shapesFromCharacterSequence = (sequence: string, a: ShapeType, b: ShapeType) => {
	return sequence.split('').map((c) => {
		if (c === 'A') {
			return a;
		} else if (c === 'B') {
			return b;
		} else {
			throw new Error('unsupported character in config sequence');
		}
	});
};

export const sequenceCharacterFromShapeType = (
	config: PuzzleConfig,
	shape: ShapeType
): SequenceCharacter => {
	if (config.a === shape) {
		return 'A';
	} else if (config.b === shape) {
		return 'B';
	} else {
		throw new Error(`Shape ${shape} doesnt exist in config`);
	}
};
