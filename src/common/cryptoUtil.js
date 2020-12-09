import Swal from "sweetalert2";

// var CryptoJS = require("crypto-js");
import CryptoJS from "crypto-js";

export default {
	setItem(key, value) {
		localStorage.setItem(this.getEncrypted(key), this.getEncrypted(value));
	},
	getItem(key, router) {
		const encValue = localStorage.getItem(this.getEncrypted(key));
		if (encValue == "" || encValue == null) {
			router.push("/signin");
			Swal.fire({
				icon: "info",
				title: "Logged out",
				text: "You're logged out of quortex, please login to continue.",
			});
		}
		return this.getDecrypted(encValue);
	},
	getEncrypted(data) {
		return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data));
	},
	getDecrypted(cipherText) {
		return CryptoJS.enc.Base64.parse(cipherText).toString(CryptoJS.enc.Utf8);
	},
};
