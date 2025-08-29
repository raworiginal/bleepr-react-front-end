const profanityFilter = async (text) => {
	const url = `https://www.purgomalum.com/service/json?text=${encodeURIComponent(
		text
	)}`;
	try {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Status:${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default profanityFilter;
