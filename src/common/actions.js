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
    successSignin(swal, code, status, router) {
        if (status == true && code == 200) {
            router.push("/home");
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
    },
    errorSignin(swal, code, status) {
        if (status == false && code == 532) {
            swal.fire({
                icon: "error",
                title: "Oops..",
                text: "Incorrect username or password, please try again.",
            });
        }
    },
    successQuestionPost(swal, code, status) {
        if (status == true && code == 200) {
            swal.fire({
                icon: "success",
                title: "Success",
                text: "Your question is posted successfully",
            });
        }
    },
}