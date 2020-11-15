import actions from "@/common/actions.js";
import cryptoUtil from "@/common/cryptoUtil.js";

export default {
	trimFormData(formData) {
		Object.keys(formData).map((k) => (formData[k] = formData[k].trim()));
		return formData;
	},
	getPlainJSONHeader() {
		return {
			"Content-Type": "application/json",
		};
	},
	getAuthJSONHeader(router, swal) {
		if (actions.checkSignedIn()) {
			return {
				"Access-Control-Allow-Origin": "*",
				Authorization: "Bearer " + cryptoUtil.getItem("questatoken", router),
				"Content-Type": "application/json",
			};
		} else {
			actions.fireLoggedOut(swal, router);
			return;
		}
	},
	getUserId(router) {
		var userId = cryptoUtil.getItem("questauserId", router);
		if (userId != null) {
			return userId;
		} else {
			router.push("/signin");
		}
	},
	getUserType(router, swal) {
		var userType = cryptoUtil.getItem("questausertype", router);

		if (userType != "") {
			return userType;
		} else {
			actions.fireLoggedOut(swal, router);
			// router.push("/signin");
		}
	},
	secondsToHms(d) {
		if (d === 0) return "0 second";
		d = Number(d);
		var h = Math.floor(d / 3600);
		var m = Math.floor((d % 3600) / 60);
		var s = Math.floor((d % 3600) % 60);

		var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
		var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
		var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
		return hDisplay + mDisplay + sDisplay;
	},
};
