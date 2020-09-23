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
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    },
    getAuthJSONHeader(router, swal) {
        if (actions.checkSignedIn()) {
            return {
                "Authorization": "Bearer " + localStorage.getItem('questatoken'),
                "Content-Type": "application/json"
            }
        } else {
            actions.fireLoggedOut(swal, router);
            return;
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