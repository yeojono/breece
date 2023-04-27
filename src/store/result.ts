import { writable } from 'svelte/store';
import type { ShapeType } from '../model/shapes';

const RESULT_STORE_KEY = 'store:result';
export type ConfidenceRating = 0 | 1 | 2 | 3;

export type PuzzleId = string;

export interface PuzzleResponse {
	shapes: ShapeType[];
	confidenceRatings: ConfidenceRating[];
}

export type ResultId = string;

export interface Result {
	puzzleResponses: { [key: PuzzleId]: PuzzleResponse };
	date: string;
}

export interface ResultStoreType {
	results: { [key: ResultId]: Result };
}

const initialStore: ResultStoreType = { results: {} };

const getStoreFromLocalStorage = () => {
	const lsEntry = window.localStorage[RESULT_STORE_KEY];
	let storeFromLocalStorage;
	try {
		storeFromLocalStorage = lsEntry !== undefined ? JSON.parse(lsEntry) : initialStore;
	} catch (e) {
		// Backup current, corrupted data and reset RESULT_STORE_KEY entry to initial state;
		window.localStorage[`backup-${new Date().toISOString()}`] = lsEntry;
		window.localStorage[RESULT_STORE_KEY] = JSON.stringify(initialStore);
		storeFromLocalStorage = initialStore;
	}
	return storeFromLocalStorage;
};

export const store = writable<ResultStoreType>(getStoreFromLocalStorage());

store.subscribe((newStore) => {
	window.localStorage[RESULT_STORE_KEY] = JSON.stringify(newStore);
});

export const createResult = (key: ResultId) => {
	store.update((prevStore) => ({
		...prevStore,
		results: {
			...prevStore.results,
			[key]: {
				puzzleResponses: {},
				date: new Date().toISOString()
			}
		}
	}));
};

export const addPuzzleResponseToResult = (
	resultId: string,
	puzzleId: PuzzleId,
	puzzleResponse: PuzzleResponse
) => {
	store.update((prevStore) => ({
		...prevStore,
		results: {
			...prevStore.results,
			[resultId]: {
				...prevStore.results[resultId],
				[puzzleId]: puzzleResponse
			}
		}
	}));
};
