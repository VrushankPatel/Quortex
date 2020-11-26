export default {
	baseUrl() {
		// return "http://localhost:9090";
		// return "http://localhost:3000";
		// return "http://winterfell.ml:3000";
		return "https://app.questa.tech/api";
		// return "https://questaapp.herokuapp.com";
	},
	subjectByCodes: {
		1: "English",
		2: "English Honors",
		3: "Algebra 1",
		4: "Geometry",
		5: "Algebra 2",
		6: "Pre-Calculus",
		7: "AP®️ Calculus AB",
		8: "AP®️ Calculus BC",
		9: "AP®️ Statistics",
		10: "Economics",
		11: "Spanish",
		12: "Biology",
		13: "Chemistry",
		14: "AP®️ Physics 1",
		15: "History",
		16: "AP®️ World History",
		17: "AP®️ US History",
		18: "General/Life Advice",
		19: "College Admissions",
	},
	searchTypes: {
		1: ["All questions", "ALL"],
		2: ["Only with answers", "WITHANSWER"],
		3: ["Unanswered", "WITHOUTANSWER"],
	},
	months: {
		1: "January",
		2: "Febuary",
		3: "March",
		4: "April",
		5: "May",
		6: "June",
		7: "July",
		8: "August",
		9: "September",
		10: "October",
		11: "November",
		12: "December",
	},
	logger: true,
	getTextColor() {
		return "lightgrey";
	},
	getGeneralBackgroundColor() {
		return "#edf9f6";
	},
};
