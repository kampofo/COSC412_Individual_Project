const resumeList = document.querySelector("#resume-list");

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const formContent = document.querySelector("#create-form");
const formWarning = document.querySelector("#form-warning");

const setupUI = (user) => {
	// render particular navbar elements if user is signed in
	if (user) {
		// toggle UI elements
		loggedInLinks.forEach((item) => (item.style.display = "block"));
		loggedOutLinks.forEach((item) => (item.style.display = "none"));
	} else {
		// toggle UI elements
		loggedInLinks.forEach((item) => (item.style.display = "none"));
		loggedOutLinks.forEach((item) => (item.style.display = "block"));
	}
};

// set up resume list
const setUpResumeList = (data) => {
	if (data.length) {
		let html = "";

		data.forEach((document) => {
			console.log(document.title);
			const li = `
		<li>
			<div class="resume-title">
				${document.title}
			</div>
		</li>
		`;

			html += li;
		});

		resumeList.innerHTML = html;
	} else {
		resumeList.innerHTML = "<h1>Please login to view user account.</h1>";
	}
};

const setUpFormPage = (user) => {
	if (user) {
		// toggle form warning and form content
		formWarning.innerHTML = "";
		formWarning.style.display = "none";
		formContent.style.display = "block";
	} else {
		formWarning.style.display = "block";

		formWarning.innerHTML = "<h1>Please login to access the form.</h1>";
		formContent.style.display = "none";
	}
};
