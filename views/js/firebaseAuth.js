// <!-- project methods -->

// listen for auth status changes
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		console.log("user logged in", user);

		// get list of data of all documents in the resume collection
		db.collection("resumes")
			.get()
			.then((querySnapshot) => {
				const tempDoc = [];
				querySnapshot.forEach((doc) => {
					tempDoc.push({ id: doc.id, ...doc.data() });
				});

				setUpResumeList(tempDoc);
			});
	} else {
		console.log("user logged out!");
	}
});

// onclick method for sign in with google option
function signInWithGoogle() {
	// Using a popup.
	var googleAuthProvider = new firebase.auth.GoogleAuthProvider();
	// googleAuthProvider.addScope("profile");
	// googleAuthProvider.addScope("email");
	firebase
		.auth()
		.signInWithPopup(googleAuthProvider)
		.then(function (data) {
			window.location.pathname = "/user";
			// This gives you a Google Access Token.
			// var idToken = data.credential.idToken;
			// localStorage.setItem("firebase_idToken", idToken);
		})
		.catch(function (error) {
			console.log(error);
		});
}

// log user out
function signOutWithGoogle() {
	firebase.auth().signOut();
}
