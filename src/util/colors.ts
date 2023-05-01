export const COLORS = {
	indigo: '#190041',
	tan: '#f5c882',
	magenta: '#dc3cbc',
	fandango: '#a00064',
	purple: '#230078',
	violet: '#7850ff',
	navy: '#00378c',
	blue: '#0046dc',
	teal: '#00b4c8',
	green: '#006964',
	lime: '#8cb41e',
	yellow: '#ffb400',
	chocolate: '#a05000',
	orange: '#ff6e00',
	red: '#e64632'
} as const;

const getTwoColors = (): [string, string] => {
	const shuffledColors = Object.values(COLORS).sort(() => Math.random() - 0.5);
	const colorTuple = shuffledColors.splice(0, 2);
	if (colorTuple[0] !== undefined && colorTuple[1] !== undefined) {
		return [colorTuple[0], colorTuple[1]];
	} else {
		return [COLORS.red, COLORS.blue];
	}
};
