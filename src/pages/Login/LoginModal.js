import React, { useState } from "react";
import "./LoginModal.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const LoginModal = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    // ---------------- NORMAL LOGIN ----------------
    const handleLogin = () => {
        if (!email || !password) {
            alert("Please enter email & password");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find((u) => u.EmailID === email);

        if (!user) {
            toast.error("Email not registered!");
            return;
        }

        if (user.Password !== password) {
            toast.error("Incorrect password!");
            return;
        }

        sessionStorage.setItem("Auth", true);
        toast.success("Login successful!");
        navigate("/home");
    };

    return (
        <div className="modal-bg">
            <Toaster />
            <div className="modal-container">
                <button className="close-btn">✕</button>
                <div className="circle"></div>

                <h2>Log in</h2>
                <p className="subtitle">
                    Don't have an account?{" "}
                    <a style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                        Sign up
                    </a>
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

                <div>
                    <label>Your email</label>
                    <input
                        type="email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="create-btn"
                    style={!email || !password ? { background: 'gray' } : { background: 'black' }}
                    onClick={handleLogin}
                >
                    Log in
                </button>
            </div>
        </div>
    );
};

export default LoginModal;
