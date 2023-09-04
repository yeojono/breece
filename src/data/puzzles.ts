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

export const practicePuzzles: { [key: string]: PuzzleConfig } = {
	'easy1': { puzzleId: 'easy1', sequence: 'ABABABABA', a: 'triangle', b: 'circle' },
	'medium2': { puzzleId: 'medium2', sequence: 'AABAABAAB', a: 'square', b: 'plus' },
	'random1': { puzzleId: 'random1', sequence: 'ABAABBBAA', a: 'pentagon', b: 'star' }
};

export const puzzles: { [key: string]: PuzzleConfig } = {
	'easy1': { puzzleId: 'easy1', sequence: 'ABABABABA', a: 'square', b: 'circle' },
	'easy2': { puzzleId: 'easy2', sequence: 'ABABABABA', a: 'star', b: 'triangle' },
	'easy3': { puzzleId: 'easy3', sequence: 'ABABABABA', a: 'plus', b: 'octagon' },
	'easy4': { puzzleId: 'easy4', sequence: 'ABABABABA', a: 'star', b: 'square' },
	'easy5': { puzzleId: 'easy5', sequence: 'ABABABABA', a: 'plus', b: 'circle' },
	'easy6': { puzzleId: 'easy6', sequence: 'ABABABABA', a: 'triangle', b: 'octagon' },
	'hard1': { puzzleId: 'hard1', sequence: 'AABAAABAA', a: 'triangle', b: 'octagon' },
	'hard2': { puzzleId: 'hard2', sequence: 'AABAAABAA', a: 'cross', b: 'plus' },
	'hard3': { puzzleId: 'hard3', sequence: 'ABAAABAAA', a: 'circle', b: 'crescent' },
	'hard4': { puzzleId: 'hard4', sequence: 'ABAAABAAA', a: 'pentagon', b: 'star' },
	'hard5': { puzzleId: 'hard5', sequence: 'ABBAABBAA', a: 'crescent', b: 'cross' },
	'hard6': { puzzleId: 'hard6', sequence: 'ABBAABBAA', a: 'triangle', b: 'circle' },
	'medium1': { puzzleId: 'medium1', sequence: 'AABAABAAB', a: 'circle', b: 'star' },
	'medium2': { puzzleId: 'medium2', sequence: 'AABAABAAB', a: 'plus', b: 'triangle' },
	'medium3': { puzzleId: 'medium3', sequence: 'ABAABAABA', a: 'pentagon', b: 'square' },
	'medium4': { puzzleId: 'medium4', sequence: 'ABAABAABA', a: 'cross', b: 'octagon' },
	'medium5': { puzzleId: 'medium5', sequence: 'ABBABBABB', a: 'crescent', b: 'plus' },
	'medium6': { puzzleId: 'medium6', sequence: 'ABBABBABB', a: 'square', b: 'pentagon' },
	'random1': { puzzleId: 'random1', sequence: 'ABAABBBAA', a: 'octagon', b: 'square' },
	'random2': { puzzleId: 'random2', sequence: 'ABAABBBAA', a: 'pentagon', b: 'triangle' },
	'random3': { puzzleId: 'random3', sequence: 'AABABAAAB', a: 'cross', b: 'crescent' },
	'random4': { puzzleId: 'random4', sequence: 'AABABAAAB', a: 'crescent', b: 'circle' },
	'random5': { puzzleId: 'random5', sequence: 'ABBABAABA', a: 'star', b: 'circle' },
	'random6': { puzzleId: 'random6', sequence: 'ABBABAABA', a: 'cross', b: 'star' },
};

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
