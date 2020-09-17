import actions from "@/common/actions.js";
export default {
    trimFormData(formData) {
        Object.keys(formData).map(
            (k) => (formData[k] = formData[k].trim())
        );
        return formData;
    },
    getPlainJSONHeader() {
        return {
            "Content-Type": "application/json",
        }
    },
    getAuthJSONHeader(router, swal) {
        if (actions.checkSignedIn()) {
            return {
                "Authorization": "Bearer " + localStorage.getItem('questatoken'),
                "Content-Type": "application/json"
            }
        } else {
            swal.fire({
                icon: "info",
                title: "Session timeout",
                text: "Your session is timed out, please sign in to continue.",
            });
            actions.invalidate();
            router.push('/signin')
        }
    },
    getUserId(router) {
        var userId = localStorage.getItem('questauserId');
        if (userId != null) {
            return userId
        } else {
            router.push('/signin')
        }
    }
}