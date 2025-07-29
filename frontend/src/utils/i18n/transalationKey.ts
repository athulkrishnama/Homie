export default {
    brand: {
        name: "brand.name"
    },
    button: {
        save: "button.save",
        submit: "button.submit",
        submiting: "button.submiting",
        verify: "button.verify",
        verifying: "button.verifying",
        cancel: "button.cancel",
        login:"button.login",
        logout:"button.logout"
    },
    userlogin: {
        form: {
            labels: {
                email: "userlogin.form.labels.email",
                password: "userlogin.form.labels.password",
                register: "userlogin.form.labels.register",
                login: "userlogin.form.labels.login"
            },
            validations: {
                email: {
                    required: "userlogin.form.validations.email.required",
                    invalid: "userlogin.form.validations.email.invalid"
                },
                password: {
                    required: 'userlogin.form.validations.password.required',
                    min: 'userlogin.form.validations.password.min',
                    max: 'userlogin.form.validations.password.max'
                }
            }
        }
    },
    usersignup: {
        form: {
            lables: {
                signup: "usersignup.form.lables.signup",
                fullname: "usersignup.form.lables.fullname",
                email: "usersignup.form.lables.email",
                password: "usersignup.form.lables.password",
                confirmPassword: "usersignup.form.lables.confirmPassword",
                enterotp: "usersignup.form.lables.enterotp",
                otpsetdto: "usersignup.form.lables.otpsentto",
                resentOtp: "usersignup.form.lables.resentOtp",
                alreadyHaveAccount: "usersignup.form.lables.alreadyHaveAccount"
            },
            validations: {
                fullname: {
                    required: "usersignup.form.validations.fullname.required",
                    min: "usersignup.form.validations.fullname.min",
                    max: "usersignup.form.validations.fullname.max",
                },
                email: {
                    required: "usersignup.form.validations.email.required",
                    invalid: "usersignup.form.validations.email.invalid",
                },
                password: {
                    required: "usersignup.form.validations.password.required",
                    invalid: "usersignup.form.validations.password.invalid",
                },
                confirmPassword: {
                    required: "usersignup.form.validations.confirmPassword.required",
                    notsame: "usersignup.form.validations.confirmPassword.notsame",
                }
            }
        }
    },
    adminLogin: {
        form: {
            lables: {
                adminLogin: "adminLogin.form.lables.adminLogin",
            },

        }
    }
}