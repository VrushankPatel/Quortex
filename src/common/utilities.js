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

    getAuthJSONHeader() {
        return {
            "userId": localStorage.getItem('questauserId'),
            "Authorization": "Bearer " + localStorage.getItem('questatoken'),
        }
    }
}