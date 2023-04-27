export const getQueryParams = (): { [key: string]: string } => {
	const queryString = window.location.search;
	const params = queryString
		.replace(/^\?/, '')
		.split('&')
		.map((p) => p.split('='))
		.reduce((acc, e) => ({ ...acc, [e[0]]: e[1] }), {});
	return params;
};

export const getQueryParam = (key: string) => getQueryParams()[key];
