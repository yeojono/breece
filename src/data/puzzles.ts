import type { SequenceCharacter, ShapeType } from '../model/shapes';

export interface PuzzleConfig {
	sequence: string;
	a: ShapeType;
	b: ShapeType;
}
export const puzzlesV2: PuzzleConfig[] = [
	// Predictable
	{ sequence: 'AABAAB', a: 'square', b: 'circle' },
	{ sequence: 'ABAABA', a: 'star', b: 'triangle' },
	{ sequence: 'ABBABB', a: 'plus', b: 'octagon' },
	// Random
	{ sequence: 'ABAABB', a: 'pentagon', b: 'cross' },
	{ sequence: 'AABABA', a: 'crescent', b: 'square' },
	{ sequence: 'ABBABA', a: 'plus', b: 'star' }
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
