const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/bleeps`;

const index = async () => {
	try {
		const res = await fetch(BASE_URL, {
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		});
		const data = await res.json();

		if (data.err) {
			throw new Error(data.err);
		}
		return data;
	} catch (err) {
		console.log(error);
		throw new Error(error);
	}
};

const create = async (bleepFormData) => {
	try {
		const res = await fetch(BASE_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bleepFormData)
		})
		return res.json()
	} catch (error) {
		console.log(error)
	}
}

const show = async (bleepId) => {
	try {
		const res = await fetch(`${BASE_URL}/${bleepId}`, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
		return res.json();
	} catch (error) {
		console.log(error);
	}
}
export { index, create, show, };