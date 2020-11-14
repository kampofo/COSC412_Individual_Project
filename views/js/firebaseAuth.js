// <!-- project methods -->

var userContent = document.querySelector("#user-content");

// listen for auth status changes
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		console.log("user logged in", user);
		// show user page content

		// get list of data of all documents in the resume collection in real time
		db.collection("resumes").onSnapshot((querySnapshot) => {
			const tempDoc = [];

			querySnapshot.docs.forEach((doc) => {
				tempDoc.push({ id: doc.id, ...doc.data() });
			});
			if (window.location.pathname == "/user") {
				userContent.style.display = "block";

				setUpResumeList(tempDoc);
			}

			if (window.location.pathname == "/form") {
				setUpFormPage(user);
			}
			setupUI(user);
		});
		// db.collection("resumes")
		// 	.get()
		// 	.then((querySnapshot) => {
		// 		const tempDoc = [];
		// 		querySnapshot.forEach((doc) => {
		// 			tempDoc.push({ id: doc.id, ...doc.data() });
		// 		});

		// 		if (window.location.pathname == "/user") {
		// 			userContent.style.display = "block";

		// 			setUpResumeList(tempDoc);
		// 		}

		// 		if (window.location.pathname == "/form") {
		// 			setUpFormPage(user);
		// 		}
		// 		setupUI(user);
		// 	});
	} else {
		// on sign out
		console.log("user logged out!");
		// hide user page content
		setupUI(user);
		if (window.location.pathname == "/user") {
			setUpResumeList([]);
			userContent.style.display = "none";
		}

		if (window.location.pathname == "/form") {
			setUpFormPage(user);
		}
	}
});

// creating new resume
if (window.location.pathname == "/form") {
	const createForm = document.querySelector("#create-form");
	createForm.addEventListener("submit", (e) => {
		e.preventDefault();

		db.collection("resumes")
			.add({
				title: createForm["title"].value,
				"full-name": createForm["full-name"].value,
				email: createForm["email"].value,
				url: createForm["url"].value,
				"school-name": createForm["school-name"].value,
				"school-location": createForm["school-location"].value,
				"degree-type": createForm["degree-type"].value,
				"degree-name": createForm["degree-name"].value,
				"graduation-date": createForm["graduation-date"].value,
				"relevant-courses": createForm["relevant-courses"].value,
				"languages-technologies":
					createForm["languages-technologies"].value,
				company: createForm["company"].value,
				"company-location": createForm["company-location"].value,
				"job-title": createForm["job-title"].value,
				"start-date": createForm["start-date"].value,
				"end-date": createForm["end-date"].value,
				"job-responsibilities":
					createForm["job-responsibilities"].value,
				"project-title": createForm["project-title"].value,
				"project-description": createForm["project-description"].value,
				"project-responsibilties":
					createForm["project-responsibilties"].value,
				"award-issuer": createForm["award-issuer"].value,
				"award-title": createForm["award-title"].value,
				"award-date": createForm["award-date"].value,
				"award-description": createForm["award-description"].value,
			})
			.then(() => {
				// // clear form and send user back to user page
				// createForm.reset();
				window.location.pathname = "/user";
			})
			.catch((err) => {
				console.log(err.message);
			});
	});
}

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
