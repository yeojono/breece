import { writable } from 'svelte/store';
import type { SequenceCharacter, ShapeType } from '../model/shapes';
import { puzzles } from '../data/puzzles';

const RESULT_STORE_KEY = 'store:result';
export type ConfidenceRating = 0 | 1 | 2 | 3;

export type PuzzleId = string;

export interface SequenceResponse {
	character: SequenceCharacter,
	responseTime: number,
}

export interface ConfidenceRatingResponse {
	confidenceRating: ConfidenceRating,
	responseTime: number,
}

export interface PuzzleResponse {
	sequence: SequenceResponse[];
	confidenceRatings: ConfidenceRatingResponse[];
}

export type ResultId = string;

type Gender = 'male' | 'female' | '-';

export interface DemographicInfo {
	participantNumber: string;
	age: string;
	gender: Gender;
	hasAsdDiagnosis: boolean;
}

export interface Result {
	puzzleResponses: { [key: string]: PuzzleResponse };
	demographicInfo: DemographicInfo;
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

export const createResult = (key: ResultId, demographicInfo: DemographicInfo) => {
	const date = new Date();
	store.update((prevStore) => ({
		...prevStore,
		results: {
			...prevStore.results,
			[key]: {
				puzzleResponses: {},
				demographicInfo,
				date: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
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
				puzzleResponses: {
					...prevStore.results[resultId].puzzleResponses,
					[puzzleId]: puzzleResponse
				}
			}
		}
	}));
};

export const clearResults = () => {
	store.set(initialStore);
};

export const exportToCsv = () => {
	const store: ResultStoreType = getStoreFromLocalStorage();
	const puzzleOrder = puzzles
		.map((p) => p.puzzleId)
		.sort();
	const puzzleColumns = puzzleOrder
		.flatMap((pid) => [
			`${pid} shape1`,
			`${pid} shape1 time`,
			`${pid} shape2`,
			`${pid} shape2 time`,
			`${pid} shape3`,
			`${pid} shape3 time`,
			`${pid} confidence1`,
			`${pid} confidence1 time`,
			`${pid} confidence2`,
			`${pid} confidence2 time`,
			`${pid} confidence3`,
			`${pid} confidence3 time`,
		]);
	const headerRow = `id,date,participant number,age,gender,has ASD diagnosis,${puzzleColumns.join(
		','
	)}`;

	const dataRows = Object.entries<typeof store.results.puzzleResponses>(store.results)
		.map(([challengeId, { date, demographicInfo, puzzleResponses }]) => {
			try {
				let dataRow = `${challengeId},${date},${demographicInfo.participantNumber},${demographicInfo.age},${demographicInfo.gender},${demographicInfo.hasAsdDiagnosis},`;
				dataRow += puzzleOrder
					.map((pid) => {
						if (puzzleResponses[pid] !== undefined) {
							const response = puzzleResponses[pid];
							const sequenceString = response.sequence
								.map((resp) => `${resp.character},${resp.responseTime}`)
								.join(',');
							const confidenceRatingString = response.confidenceRatings
								.map((resp) => `${resp.confidenceRating},${resp.responseTime}`)
								.join(',');
							return `${sequenceString},${confidenceRatingString}`;
						} else {
							return `${Array(12).fill('N/A').join(',')}`;
						}
					})
					.join(',');
				return dataRow;
			} catch (e) {
				return null;
			}
		})
		.filter((r) => r != null);

	const csvContent = [headerRow, ...dataRows].join('\n');
	downloadBlob(csvContent);
};

/** Download contents as a file
 * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
 */
function downloadBlob(content: string) {
	// Create a blob
	const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
	const url = URL.createObjectURL(blob);

	// Create a link to download it
	const pom = document.createElement('a');
	pom.href = url;
	pom.setAttribute('download', 'result-output.csv');
	pom.click();
}
