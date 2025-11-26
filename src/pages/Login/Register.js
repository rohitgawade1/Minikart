import React, { useEffect, useState } from "react";
import "./Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Register = () => {

    const navigate = useNavigate()
    // Global array to store users (kept outside function)
    const [users, setUsers] = useState([]);
    console.log(users)

    const [EmailID, setEmailID] = useState('');
    const [Password, setPassword] = useState('');
    const [IsShow, setIsShow] = useState(true);

    const handleMailID = (e) => {
        setEmailID(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleIsShow = () => {
        setIsShow(!IsShow);
    };


    // ---------------- GOOGLE LOGIN ----------------
    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // get user info
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`,
                        },
                    }
                );

                const user = res.data;

                // save user session
                sessionStorage.setItem("Auth", true);
                sessionStorage.setItem("GoogleUser", JSON.stringify(user));

                toast.success("Google Login Successful!");

                navigate("/home");
            } catch (err) {
                toast.error("Google Login Failed!");
            }
        },
        onError: () => toast.error("Google Login Failed"),
    });


    function registerUser() {

        let errors = {};

        // ---- EMAIL VALIDATION ----
        if (!EmailID || EmailID.trim() === "") {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(EmailID)) {
            errors.email = "Invalid email format";
        }

        // ---- PASSWORD VALIDATION ----
        if (!Password || Password.trim() === "") {
            errors.password = "Password is required";
        } else if (Password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        // SHOW ERRORS & STOP
        if (Object.keys(errors).length > 0) {
            if (errors.email) toast.error(errors.email);
            if (errors.password) toast.error(errors.password);
            return;
        }

        // ---- CHECK IF USER ALREADY EXISTS ----
        const exists = users.some(user => user.EmailID === EmailID);

        if (exists) {
            toast.error("Email already registered!");
            return;
        }

        // ---- SAVE USER ----
        const newUser = { EmailID, Password };
        setUsers([...users, newUser]);

        localStorage.setItem("users", JSON.stringify(users));
        toast.success("User registered successfully!");

        // Clear fields after success
        setEmailID("");
        setPassword("");
    }

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    return (
        <div className="modal-bg">
            <Toaster />
            <div className="modal-container">
                <button className="close-btn">✕</button>

                <div className="circle"></div>

                <h2>Create an account</h2>
                <p className="subtitle">
                    Already have an account? <a style={{ cursor: "pointer" }} onClick={() => navigate("/LoginModal")}>Log in</a>
                </p>

                {/* ------ GOOGLE LOGIN BUTTON ------ */}
                <button className="social-btn" onClick={() => loginWithGoogle()}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                        alt="google"
                    />
                    <span className="TextBlack">Continue with Google</span>
                </button>

                <div className="divider">
                    <span>OR</span>
                </div>

                <p className="small-text">Enter your email address to create an account.</p>

                <div>
                    <label>Your email</label>
                    <input
                        type="email"
                        className="input-field"
                        value={EmailID}
                        onChange={handleMailID}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <div className="input-wrapper">
                        <input
                            type={IsShow ? "password" : "text"}
                            className="input-field"
                            value={Password}
                            onChange={handlePassword}
                        />

                        {IsShow ? (
                            <span className="input-icon" onClick={handleIsShow}>
                                <FaEye />
                            </span>
                        ) : (
                            <span className="input-icon" onClick={handleIsShow}>
                                <FaEyeSlash />
                            </span>
                        )}
                    </div>
                </div>

                <button
                    className="create-btn"
                    onClick={registerUser}
                    style={!EmailID || !Password ? { background: 'gray' } : { background: 'black' }}
                >
                    Create an account
                </button>
            </div>
        </div>
    );
};

export default Register;
