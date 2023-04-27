export function load({ params }) {
	if (params.slug) {
		return {
			slug: params.slug,
			title: 'Hello world!',
			content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
		};
	}
}
