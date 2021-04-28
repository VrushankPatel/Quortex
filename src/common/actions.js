import cryptoUtil from "@/common/cryptoUtil.js";
import constants from "@/common/constants.js";
export default {
	actionSignup(swal, code, status, router) {
		if (status == false && code == 531) {
			swal.fire({
				icon: "error",
				title: "Oops..",
				text: "Email Id already exists, please try again with different email.",
			});
			return;
		}
		swal.fire({
			icon: "success",
			title: "Success",
			text: "Account successfully created, \nPlease signin to continue.",
		});
		router.push("/Signin");
	},
	// successSignup(swal, code, status, router) {
	// 	if (status == true && code == 200) {
	// 		swal.fire({
	// 			icon: "success",
	// 			title: "Success",
	// 			text: "Account successfully created, \nPlease signin to continue.",
	// 		});
	// 		router.push("/Signin");
	// 	}
	// },
	// errorSignup(swal, code, status) {
	// 	if (status == false && code == 531) {
	// 		swal.fire({
	// 			icon: "error",
	// 			title: "Oops..",
	// 			text: "Email Id already exists, please try again with different email.",
	// 		});
	// 	}
	// },
	actionSignin(swal, code, status, router) {
		if (status == true && code == 200) {
			router.push("/home");
		}
		if (status == false && code == 532) {
			swal.fire({
				icon: "error",
				title: "Oops..",
				text: "Incorrect username or password, please try again.",
			});
		}
	},
	successQuestionPost(code, status) {
		if (status == true && code == 200) {
			return true;
		}
		return false;
	},
	errorQuestionPost(code, status, router, swal) {
		if (!this.checkLoggedIn() || code == 555) {
			this.invalidate();
			swal.fire({
				icon: "info",
				title: "Logged out",
				text: "You're logged out of quortex, please login to continue.",
			});
			router.push("/signin");
			return;
		}
	},
	successForgotPassword(swal, code, status) {
		if (status == true && code == 200) {
			swal.fire({
				icon: "success",
				title: "Success",
				text: "Password is successfully sent to your email Id, \nPlease signin to continue.",
			});
		} else if (status == true && code == 550) {
			swal.fire({
				icon: "error",
				title: "Profile not found",
				text: "There is no account registered with this mail id.",
			});
		}
	},
	invalidate() {
		localStorage.clear();
	},
	checkLoggedIn(router) {
		if (
			(new Date() - new Date(cryptoUtil.getItem(constants.getSignedInDate()))) /
			1000 >
			21600
		) {
			localStorage.clear();
			return false;
		}
		var token = cryptoUtil.getItem(constants.getQuortexToken(), router);
		var quortexuserId = cryptoUtil.getItem(
			constants.getQuortexUserId(),
			router
		);
		if (
			token != null &&
			token.length != 0 &&
			quortexuserId != null &&
			quortexuserId.length != 0
		) {
			return true;
		}
		return false;
	},
	fireLoggedOut(swal, router) {
		this.invalidate();
		swal.fire({
			icon: "info",
			title: "Logged out",
			text: "You're logged out of quortex, please login to continue.",
		});
		router.push("/signin");
	},
};