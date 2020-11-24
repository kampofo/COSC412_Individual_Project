// <!-- project methods -->

var userContent = document.querySelector("#user-content");

var userID;

var resumes = [];

// create on click
// listen for auth status changes
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		userID = user.uid;
		// show user page content
		// get list of data of all documents in the resume collection in real time
		db.collection("resumes").onSnapshot((querySnapshot) => {
			var tempDoc = [];

			querySnapshot.docs.forEach((doc) => {
			

				//render resumes with certain user id
				if (doc.data()["user-id"] == userID) {
					tempDoc.push({ id: doc.id, ...doc.data() });
				}
			});

			if (window.location.pathname == "/user") {
				userContent.style.display = "block";
				setUpResumeList(user, tempDoc);

				resumeContent = document.querySelector("#resume-content"); // select resume document arrea
				resumes = document.querySelectorAll(".resume-title");
				var skills = [];
				var companies = [];
				var jobTitles = [];
				var jobStarts = [];
				var jobEnds = [];
				var jobResponsibilities = [];

				var projects = [];
				var awards = [];

				for (var i = 0; i < resumes.length; ++i) {
					resumes[i].addEventListener("click", function (e) {
						document.querySelectorAll(".resume-hide").forEach(item => {
							item.style.display = "none";
						})
						for (let j = 0; j < tempDoc.length; j++) {
							if (tempDoc[j].id == e.target.id) {

								resumeContent.innerHTML = `
								<div style="text-align:center">
									<h3><strong>${tempDoc[j]["full-name"]}</strong></h3>
									<p>${tempDoc[j]["email"]} | ${tempDoc[j]["telephone"]} | ${tempDoc[j]["url"]}</p>
								</div>
				
								<h6><strong>EDUCATION</strong></h6>
								<hr>
								<p style="float:right"><strong>${tempDoc[j]["school-location"]}</strong></p>
								<p><strong>${tempDoc[j]["school-name"]}</strong></p>
								<!-- education section -->
								<p style="float:right"><em>${tempDoc[j]["graduation-date"]}</em></p>
								<p><em>${tempDoc[j]["degree-type"]} ${tempDoc[j]["degree-name"]}</em></p>
								<ul>
									<li>Relevant Courses: ${tempDoc[j]["relevant-courses"]}</li>
								</ul>
								
								<!-- Skills section -->
								<h6><strong>SKILLS</strong></h6>
								<hr>
								<ul id="skills-list">
								</ul>
								
								<!-- Experience -->
								<h6><strong>EXPERIENCE</strong></h6>
								<hr>
								<div id="experience-list">
								</div>
								
								<!-- Projects -->
								<h6><strong>SELECTED PROJECTS</strong></h6>
								<hr>
								<div id="projects-list"></div>
								
								<!-- Awards & Accomplishemnts-->
								<h6><strong>AWARDS & ACCOMPLISHMENTS</strong></h6>
								<hr>
								<td>
								<div id="awards-list"></div>
								`;

								// process skills
								skills = processSkills(
									tempDoc[j]["languages-technologies"]
								);

								skills.forEach((skill) => {
									document.querySelector(
										"#skills-list"
									).innerHTML += `<li>${skill}</li>`;
								});

								// process experience
								companies = tempDoc[j]["company"].split("|");
								companyLocations = tempDoc[j][
									"company-location"
								].split("|");
								jobTitles = tempDoc[j]["job-title"].split("|");
								jobStarts = tempDoc[j]["start-date"].split("|");
								jobEnds = tempDoc[j]["end-date"].split("|");
								jobResponsibilities = tempDoc[j][
									"job-responsibilities"
								].split("|");

								// split job responsibilities
								for (
									let i = 0;
									i < jobResponsibilities.length;
									i++
								) {
									jobResponsibilities[
										i
									] = jobResponsibilities[i].split("^");
								}
								
								// populate experience section
								for (let i = 0; i < companies.length; i++) {
									document.querySelector("#experience-list").innerHTML += `<div>
									<p style="float:right"><strong>${companyLocations[i]}</strong></p>
									<p><strong>${companies[i]}</strong></p>
									<p style="float:right"><em>${jobStarts[i]} - ${jobEnds[i]}</em></p>
									<p><em>${jobTitles[i]}</em></p>
									<ul class="job-responsibilities"></ul>
									</div>`
								}

								// select all job respons. ul elements
								var jobLists = document.querySelectorAll(
									".job-responsibilities"
								);

								// fills in all job responsibilities
								for (let i = 0; i < jobLists.length; i++) {
									for (
										let j = 0;
										j < jobResponsibilities[i].length;
										j++
									) {
										jobLists[i].innerHTML += `
										<li>
											${jobResponsibilities[i][j]}
										</li>
										`;
									}
								}

								// process projects
								projectTitles = tempDoc[j]["project-title"].split("|");
								projectDescriptions = tempDoc[j]["project-description"].split("|");
								projectResponsibilities = tempDoc[j][
									"project-responsibilities"
								].split("|");

								// split project responsibilities
								for (
									let i = 0;
									i < projectResponsibilities.length;
									i++
								) {
									projectResponsibilities[
										i
									] = projectResponsibilities[i].split("^");
								}
								
								// populate projects section
								for (let i = 0; i < projectTitles.length; i++) {
									document.querySelector("#projects-list").innerHTML += `<div>
									<p><strong>${projectTitles[i]}</strong></p>
									<p><em>${projectDescriptions[i]}</em></p>
									<ul class="project-responsibilities"></ul>
									</div>`
								}

								// select all project responsibilites ul elements
								var projectResLists = document.querySelectorAll(
									".project-responsibilities"
								);

								// fills in all job responsibilities
								for (let i = 0; i < projectResLists.length; i++) {
									for (
										let j = 0;
										j < projectResponsibilities[i].length;
										j++
									) {
										projectResLists[i].innerHTML += `
										<li>
											${projectResponsibilities[i][j]}
										</li>
										`;
									}
								}

								// process awards and accomplishments
								awardIssuers = tempDoc[j]["award-issuer"].split("|");
								awardTitles = tempDoc[j]["award-title"].split("|");
								awardDates = tempDoc[j]["award-date"].split("|");
								awardDescriptions = tempDoc[j][
									"award-description"
								].split("|");

								// split award descriptions
								for (
									let i = 0;
									i < awardDescriptions.length;
									i++
								) {
									awardDescriptions[
										i
									] = awardDescriptions[i].split("^");
								}
								

								// populate awards section
								for (let i = 0; i < awardIssuers.length; i++) {
									document.querySelector("#awards-list").innerHTML += `<div>
									<p><strong>${awardIssuers[i]}</strong></p>
									<p style="float:right"><em>${awardDates[i]}</em></p>
									<p><em>${awardTitles[i]}</em></p>
									<ul class="award-descriptions"></ul>
									</div>`
								}

								// select all award description ul elements
								var awardLists = document.querySelectorAll(
									".award-descriptions"
								);

								// fills in all job responsibilities
								for (let i = 0; i < awardLists.length; i++) {
									for (
										let j = 0;
										j < awardDescriptions[i].length;
										j++
									) {
										awardLists[i].innerHTML += `
										<li>
											${awardDescriptions[i][j]}
										</li>
										`;
									}
								}
							}
						}
					
					});
				}
			}

			if (window.location.pathname == "/form") {
				setUpFormPage(user);
			}

			setupUI(user);
		});
	} else {
		// on sign out
		console.log("user logged out!");
		// hide user page content
		setupUI(user);
		if (window.location.pathname == "/user") {
			setUpResumeList(false, []);
			userContent.style.display = "none";
		}

		if (window.location.pathname == "/form") {
			setUpFormPage(user);
		}
	}
});

function processSkills(skills) {
	skills = skills.split("|");

	return skills;
}

// creating new resume
if (window.location.pathname == "/form") {
	const createForm = document.querySelector("#create-form");
	createForm.addEventListener("submit", (e) => {
		e.preventDefault();

		db.collection("resumes")
			.add({
				"user-id": userID,
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
			.then((docRef) => {
				return db
					.collection("users")
					.doc(userID)
					.update({
						//updates the resume array with new resume id
						resumes: firebase.firestore.FieldValue.arrayUnion(
							docRef.id
						),
					});

				// // clear form and send user back to user page
				// createForm.reset();
			})
			.then(() => {
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
			//creates new user document
			return db.collection("users").doc(data.user.uid).set({
				id: data.user.uid,
				resumes: [],
			});

		})
		.then(() => {
			window.location.pathname = "/user";
		})
		.catch(function (error) {
			console.log(error);
		});
}

// log user out
function signOutWithGoogle() {
	firebase.auth().signOut();
}
