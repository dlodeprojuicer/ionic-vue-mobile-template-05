import firebase from "../../firebase";

const state = {
	userProfile: {},
}

const getters = {
	userProfile({ userProfile }) {
		return userProfile || JSON.parse(localStorage.getItem("tcdbUserProfile"));
	},
}

const mutations = {
	userProfile(state, data) {
		state.events = data;
		localStorage.setItem("tcdbUserProfile", JSON.stringify(data));
	},
}

const actions = {
	createUser(request) {
		return new Promise((resolve) => {
			firebase.firestore().collection("users")
				.doc(request.uid)
				.set({...request})
				.then(() => {
					resolve();
				});
		})
	},
	getUserProfile(context, request) {
		return new Promise((resolve, reject) => {
			firebase.firestore().collection("users")
				.doc(request)
				.get()
				.then(doc => {
					context.commit("userProfile", doc.data());
					resolve(doc.data());
				}).catch(error => {
					reject(error);
				});
		})
	},
	getUsers() {
		return new Promise((resolve) => {
			firebase.firestore().collection("users")
				.get()
				.then(({ docs }) => {
					resolve(docs.map(a => a.data()));
				});
		})
	},
	updateUser(context, request) {
		request.updatedBy = context.getters.loginToken;
		return new Promise((resolve) => {
			firebase.firestore().collection("users")
				.doc(request.uid)
				.update(request)
				.then(() => {
					resolve();
				});
		})
	}
}

export { state, getters, mutations, actions }
