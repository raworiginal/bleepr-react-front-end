const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/bleeprs`;

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
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

const aboutMe = async (bleeprId) => {
	try {
		const res = await fetch(`${BASE_URL}/${bleeprId}/aboutMe`, {
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		});

		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}

			const data = await res.json();

		if (data.error) {
			throw new Error(data.error);
		}

		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const editAboutMe = async (bleeprId, aboutMeData) => {
	try {
		const res = await fetch(`${BASE_URL}/${bleeprId}/aboutMe/edit`, {
			method: "PUT", 
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify(aboutMeData)
		});

		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}

			const data = await res.json();

		if (data.error) {
			throw new Error(data.error);
		}

		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const searchForBleeprs = async (bleeprId) => {
		try {
		const res = await fetch(`${BASE_URL}/${bleeprId}`, {
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		});
		const data = await res.json();

		if (data.err) {
			throw new Error(data.err);
		}
		return data;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
}

const editFriend = async (bleeprId) => {
		try {
		const res = await fetch(`${BASE_URL}/${bleeprId}/friend`, {
			method: "PUT", 
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});

		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}

			const data = await res.json();

		if (data.error) {
			throw new Error(data.error);
		}

		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export { index, aboutMe, editAboutMe, searchForBleeprs, editFriend };
