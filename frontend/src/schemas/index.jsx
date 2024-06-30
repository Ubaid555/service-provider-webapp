import * as Yup from "yup";

export const signUpSchema = Yup.object({
    name:Yup.string().min(5, "Name must be at least 5 characters").max(20).required("Please enter your name"),
    email:Yup.string().email("Email must be a valid email").required("Please enter your email"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Please enter your password")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/,
            "At least one uppercase letter, one character, and one number"
        ),
    confirm_password:Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref('password'), null], "Password must match"),
});