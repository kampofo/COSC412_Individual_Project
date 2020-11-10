const resumeList = document.querySelector("#resume-list");

// set up resume list
const setUpResumeList = (data) => {
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
};
