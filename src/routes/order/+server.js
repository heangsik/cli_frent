import { json } from '@sveltejs/kit';
const API_URL = 'https://api.escuelajs.co/api/v1/products';

export const GET = async () => {
	return new Response('{}', {
		headers: { 'Content-Type': 'application/json' }
	});
};

export const POST = async ({ request }) => {
	console.log('Fetching POST');
	const body = await request.json();
	console.log('Body:', body);
	try {
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		return new Response(JSON.stringify({ success: true }), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ success: false }), {
			headers: { 'Content-Type': 'application/json' },
			status: 500
		});
	}

	// if (!response.ok) {
	// 	return new Response('Error creating product', { status: 500 });
	// }

	// const data = await response.json();

	// return new Response(JSON.stringify(data), {
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	}
	// });
};
