import actions from "@/common/actions.js";
import cryptoUtil from "@/common/cryptoUtil.js";
import axios from "axios";
export default {
	trimFormData(formData) {		
		Object.keys(formData).forEach(element => (formData[element] = formData[element].trim()));
		return formData;
	},
	getPlainJSONHeader() {
		return {
			"Content-Type": "application/json",
		};
	},
	getAuthJSONHeader(router, swal) {
		if (actions.checkLoggedIn(router)) {
			return {				
				Authorization: "Bearer " + cryptoUtil.getItem("quortextoken", router),
				"Content-Type": "application/json",
			};
		} else {
			actions.fireLoggedOut(swal, router);			
		}
	},
	getUserId(router) {
		var userId = cryptoUtil.getItem("quortexuserId", router);
		if (userId != null) {
			return userId;
		} else {
			router.push("/signin");
		}
	},
	getUserType(router, swal) {
		var userType = cryptoUtil.getItem("quortexusertype", router);

		if (userType != "") {
			return userType;
		} else {
			actions.fireLoggedOut(swal, router);			
		}
	},
	secondsToHms(d) {
		if (d === 0) return "0 second";
		d = Number(d);
		var h = Math.floor(d / 3600);
		var m = Math.floor((d % 3600) / 60);
		var s = Math.floor((d % 3600) % 60);

		var hDisplay = h > 0 ? h + "hour(s), " : "";
		var mDisplay = m > 0 ? m + "minute(s), " : "";		
		var sDisplay = s > 0 ? s + "second(s), " : "";
		return hDisplay + mDisplay + sDisplay;
	},
	awakeAPIGatewayAndBackEndHeroku() {
		axios({
			method: "get",
			url: "https://quortex-api-gateway2.herokuapp.com/",
		});
		axios({
			method: "get",
			url: "https://quortex-server2.herokuapp.com/",
		});
	},
	updateFirebaseTimeStamp() {
		axios({
			method: "put",
			url: "https://simplerest-cfec7-default-rtdb.firebaseio.com/quortex.json",
			data: {
				TimeStamp: Math.round(new Date().getTime()).toString(),
			},
		});
	},
	sendRequest(config, success, failure) {
		axios(config)
			.then(success)
			.catch(failure);		
	},
};
