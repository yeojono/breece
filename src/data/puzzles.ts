import type { SequenceCharacter, ShapeType } from '../model/shapes';
import type { PuzzleId } from '../store/result';

export interface PuzzleConfig {
	puzzleId: PuzzleId;
	sequence: string;
	a: ShapeType;
	b: ShapeType;
}

// export const puzzlesInOrder: PuzzleConfig[] = [
// 	{ puzzleId: 'easy1', sequence: 'ABABABABA', a: 'square', b: 'circle' },
// 	{ puzzleId: 'easy2', sequence: 'ABABABABA', a: 'star', b: 'triangle' },
// 	{ puzzleId: 'easy3', sequence: 'ABABABABA', a: 'plus', b: 'octagon' },
// 	{ puzzleId: 'easy4', sequence: 'ABABABABA', a: 'star', b: 'square' },
// 	{ puzzleId: 'easy5', sequence: 'ABABABABA', a: 'plus', b: 'circle' },
// 	{ puzzleId: 'easy6', sequence: 'ABABABABA', a: 'triangle', b: 'octagon' },
// 	{ puzzleId: 'medium1', sequence: 'AABAABAAB', a: 'circle', b: 'star' },
// 	{ puzzleId: 'medium2', sequence: 'AABAABAAB', a: 'plus', b: 'triangle' },
// 	{ puzzleId: 'medium3', sequence: 'ABAABAABA', a: 'pentagon', b: 'square' },
// 	{ puzzleId: 'medium4', sequence: 'ABAABAABA', a: 'cross', b: 'octagon' },
// 	{ puzzleId: 'medium5', sequence: 'ABBABBABB', a: 'crescent', b: 'plus' },
// 	{ puzzleId: 'medium6', sequence: 'ABBABBABB', a: 'square', b: 'pentagon' },
// 	{ puzzleId: 'random1', sequence: 'ABAABBBAA', a: 'octagon', b: 'square' },
// 	{ puzzleId: 'random2', sequence: 'ABAABBBAA', a: 'pentagon', b: 'triangle' },
// 	{ puzzleId: 'random3', sequence: 'AABABAAAB', a: 'cross', b: 'crescent' },
// 	{ puzzleId: 'random4', sequence: 'AABABAAAB', a: 'crescent', b: 'circle' },
// 	{ puzzleId: 'random5', sequence: 'ABBABAABA', a: 'star', b: 'circle' },
// 	{ puzzleId: 'random6', sequence: 'ABBABAABA', a: 'cross', b: 'star' }
// ];

export const practicePuzzles: PuzzleConfig[] = [
	{ puzzleId: 'easy1', sequence: 'ABABABABA', a: 'triangle', b: 'circle' },
	{ puzzleId: 'medium2', sequence: 'AABAABAAB', a: 'square', b: 'plus' },
	{ puzzleId: 'random1', sequence: 'ABAABBBAA', a: 'pentagon', b: 'star' }
];

export const puzzles: PuzzleConfig[] = [
	{ puzzleId: 'easy1', sequence: 'ABABABABA', a: 'square', b: 'circle' },
	{ puzzleId: 'random4', sequence: 'AABABAAAB', a: 'crescent', b: 'circle' },
	{ puzzleId: 'medium1', sequence: 'AABAABAAB', a: 'circle', b: 'star' },
	{ puzzleId: 'random2', sequence: 'ABAABBBAA', a: 'pentagon', b: 'triangle' },
	{ puzzleId: 'easy4', sequence: 'ABABABABA', a: 'star', b: 'square' },
	{ puzzleId: 'easy3', sequence: 'ABABABABA', a: 'plus', b: 'octagon' },
	{ puzzleId: 'random5', sequence: 'ABBABAABA', a: 'star', b: 'circle' },
	{ puzzleId: 'medium4', sequence: 'ABAABAABA', a: 'cross', b: 'octagon' },
	{ puzzleId: 'easy6', sequence: 'ABABABABA', a: 'triangle', b: 'octagon' },
	{ puzzleId: 'easy2', sequence: 'ABABABABA', a: 'star', b: 'triangle' },
	{ puzzleId: 'medium2', sequence: 'AABAABAAB', a: 'plus', b: 'triangle' },
	{ puzzleId: 'hard3', sequence: 'ABAAABAAA', a: 'circle', b: 'crescent' },
	{ puzzleId: 'medium5', sequence: 'ABBABBABB', a: 'crescent', b: 'plus' },
	{ puzzleId: 'hard6', sequence: 'ABBAABBAA', a: 'triangle', b: 'circle' },
	{ puzzleId: 'random1', sequence: 'ABAABBBAA', a: 'octagon', b: 'square' },
	{ puzzleId: 'hard5', sequence: 'ABBAABBAA', a: 'crescent', b: 'cross' },
	{ puzzleId: 'easy5', sequence: 'ABABABABA', a: 'plus', b: 'circle' },
	{ puzzleId: 'hard2', sequence: 'AABAAABAA', a: 'cross', b: 'plus' },
	{ puzzleId: 'hard4', sequence: 'ABAAABAAA', a: 'pentagon', b: 'star' },
	{ puzzleId: 'random6', sequence: 'ABBABAABA', a: 'cross', b: 'star' },
	{ puzzleId: 'medium6', sequence: 'ABBABBABB', a: 'square', b: 'pentagon' },
	{ puzzleId: 'hard1', sequence: 'AABAAABAA', a: 'triangle', b: 'octagon' },
	{ puzzleId: 'medium3', sequence: 'ABAABAABA', a: 'pentagon', b: 'square' },
	{ puzzleId: 'random3', sequence: 'AABABAAAB', a: 'cross', b: 'crescent' },
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
