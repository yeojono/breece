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
	puzzleOrder: string[]
	puzzleResponses: { [key: string]: PuzzleResponse };
	demographicInfo: DemographicInfo;
	date: string;
}

export interface ResultStoreType {
	results: { [key: ResultId]: Result };
}

const initialStore: ResultStoreType = { results: {} };

const getStoreFromLocalStorage = (): ResultStoreType => {
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
				puzzleOrder: Object.keys(puzzles).sort(() => Math.random() - 0.5),
				puzzleResponses: {},
				demographicInfo,
				date: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
			}
		}
	}));
};

export const getResult = (key: ResultId) => {
	const store: ResultStoreType = getStoreFromLocalStorage();
	return store.results[key];
}

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
					[puzzleId]: puzzleResponse,
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
	const puzzleColumns = Object.keys(puzzles)
		.flatMap((puzzleId) => [
			`${puzzleId} order of appearance`,
			`${puzzleId} shape1`,
			`${puzzleId} shape1 time`,
			`${puzzleId} shape2`,
			`${puzzleId} shape2 time`,
			`${puzzleId} shape3`,
			`${puzzleId} shape3 time`,
			`${puzzleId} confidence1`,
			`${puzzleId} confidence1 time`,
			`${puzzleId} confidence2`,
			`${puzzleId} confidence2 time`,
			`${puzzleId} confidence3`,
			`${puzzleId} confidence3 time`,
		]);
	const headerRow = `id,date,participant number,age,gender,has ASD diagnosis,${puzzleColumns.join(
		','
	)}`;

	const dataRows = Object.entries<typeof store.results.puzzleResponses>(store.results)
		.map(([challengeId, { date, demographicInfo, puzzleResponses, puzzleOrder }]) => {
			try {
				let dataRow = `${challengeId},${date},${demographicInfo.participantNumber},${demographicInfo.age},${demographicInfo.gender},${demographicInfo.hasAsdDiagnosis},`;
				dataRow += Object.keys(puzzles)
					.map((pid) => {
						const orderColumn = puzzleOrder.indexOf(pid) + 1
						if (puzzleResponses[pid] !== undefined) {
							const response = puzzleResponses[pid];
							const sequenceString = response.sequence
								.map((resp) => `${resp.character},${resp.responseTime}`)
								.join(',');
							const confidenceRatingString = response.confidenceRatings
								.map((resp) => `${resp.confidenceRating},${resp.responseTime}`)
								.join(',');
							return `${orderColumn},${sequenceString},${confidenceRatingString}`;
						} else {
							return `${orderColumn},${Array(12).fill('N/A').join(',')}`;
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
	downloadBlob(csvContent, 'result-output.csv', 'text/csv');
};

export const exportAllData = () => {
	const keys: string[] = [];
	for (let i = 0; i < window.localStorage.length; i++) {
		keys.push(window.localStorage.key(i)!);
	}
	const allData = Object.fromEntries(keys.map((k) => [k, localStorage.getItem(k)]));
	downloadBlob(JSON.stringify(allData), 'data-dump.txt', 'text/json');
}


/** Download contents as a file
 * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
 */
function downloadBlob(content: string, filename: string, type: string) {
	// Create a blob
	const blob = new Blob([content], { type: `${type};charset=utf-8;` });
	const url = URL.createObjectURL(blob);

	// Create a link to download it
	const pom = document.createElement('a');
	pom.href = url;
	pom.setAttribute('download', filename);
	pom.click();
}
