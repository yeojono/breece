export function load({ params }) {
	if (params.slug) {
		return {
			slug: params.slug,
		};
	}
}
