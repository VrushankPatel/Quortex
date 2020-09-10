export default {
    successSignup(swal, code, status, router) {
        if (status == true && code == 200) {
            swal.fire({
                icon: "success",
                title: "Success",
                text: "Account successfully created, \nPlease signin to continue.",
            });
            router.push("/Signin");
        }
    },
    errorSignup(swal, code, status) {
        if (status == false && code == 531) {
            swal.fire({
                icon: "error",
                title: "Oops..",
                text: "Email Id already exists, please try again with different email.",
            });
        }
    }
}