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
				Authorization: "Bearer " + cryptoUtil.getItem("questatoken"),
				"Content-Type": "application/json",
			};
		} else {
			actions.fireLoggedOut(swal, router);
			return;
		}
	},
	getUserId(router) {
		var userId = cryptoUtil.getItem("questauserId");
		if (userId != null) {
			return userId;
		} else {
			router.push("/signin");
		}
	},
	getUserType(router, swal) {
		var userType = cryptoUtil.getItem("questausertype");
		console.log("usertype = " + (userType == ""));
		if (userType != "") {
			return userType;
		} else {
			actions.fireLoggedOut(swal, router);
			// router.push("/signin");
		}
	},
};
