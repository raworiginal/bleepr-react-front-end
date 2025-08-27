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
			body: JSON.stringify(bleepFormData),
		});
		return res.json();
	} catch (error) {
		console.log(error);
	}
};

const show = async (bleepId) => {
	try {
		const res = await fetch(`${BASE_URL}/${bleepId}`, {
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		});
		return res.json();
	} catch (error) {
		console.log(error);
	}
};

const update = async (bleepId, bleepFormData) => {
	try {
		const res = await fetch(`${BASE_URL}/${bleepId}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bleepFormData),
		});
		return res.json();
	} catch (error) {
		console.log(error);
	}
};

const deleteBleep = async (bleepId) => {
	try {
		const res = await fetch(`${BASE_URL}/${bleepId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return res.json();
	} catch (error) {
		console.log(error);
	}
};

const updateLike = async (bleepId, bleeprId) => {
	try {
		const res = await fetch(`/bleeps/${bleepId}/liked-by/${bleeprId}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) {
			throw new Error("Failed to update like");
		}

		return res.json();
	} catch (error) {
		console.log(error)
	}
};

const createComment = async (bleepId, commentFormData) => {
	try {
		const res = await fetch(`${BASE_URL}/${bleepId}/comments`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(commentFormData),
		});	
		return res.json();
	} catch (error) {
		console.log(error)
	}
};

export { index, create, show, update, deleteBleep, updateLike,createComment, };
