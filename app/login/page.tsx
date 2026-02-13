"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  
  // Check URL for mode parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    if (mode === 'login') {
      setIsLogin(true);
    } else if (mode === 'signup') {
      setIsLogin(false);
    }
  }, []);
  
  // Login fields
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Sign up fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Phone number
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");

  // Login handler - FIXED to go to /home
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername && loginPassword) {
      localStorage.setItem("kinnectUsername", loginUsername);
      localStorage.setItem("kinnectIsLoggedIn", "true");
      router.push("/home"); // FIXED: Changed from "/" to "/home"
    }
  };

  // Sign up handler - FIXED with success message
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      // Show success message
      alert("Your account has been created successfully! Please login.");
      // Reset form and switch to login
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsLogin(true);
      setStep(1);
    }
  };

  // Phone submit - FIXED to go to /home for login
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber) {
      if (isLogin) {
        // For login, go directly to home
        router.push("/home"); // FIXED: Changed from "/" to "/home"
      } else {
        // For sign up, show OTP form
        setShowOtpForm(true);
      }
    }
  };

  // OTP handler
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      setStep(4);
    }
  };

  // Enable location - FIXED to go to /home
  const handleEnableLocation = () => {
    localStorage.setItem("kinnectUsername", username);
    localStorage.setItem("kinnectIsLoggedIn", "true");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          router.push("/home"); // FIXED: Changed from "/" to "/home"
        },
        () => {
          router.push("/home"); // FIXED: Changed from "/" to "/home"
        }
      );
    } else {
      router.push("/home"); // FIXED: Changed from "/" to "/home"
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">
          <div className="logo-icon">K</div>
          <span className="logo-text">Kinnect</span>
        </div>

        {step === 1 && (
          <>
            <div className="auth-tabs">
              <button 
                className={isLogin ? "active" : ""} 
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button 
                className={!isLogin ? "active" : ""} 
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            {isLogin ? (
              <form className="auth-form" onSubmit={handleLogin}>
                <h2>Welcome Back!</h2>
                <input
                  type="text"
                  placeholder="Username or Email"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <a href="#" className="forgot-password">Forgot Password?</a>
                <button type="submit" className="auth-btn">Login</button>
                <div className="auth-divider">OR</div>
                <button type="button" className="auth-btn-phone" onClick={() => setStep(2)}>
                  📱 Continue with Phone
                </button>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleSignUp}>
                <h2>Create Account</h2>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button type="submit" className="auth-btn">Sign Up</button>
                <div className="auth-divider">OR</div>
                <button type="button" className="auth-btn-phone" onClick={() => setStep(2)}>
                  📱 Continue with Phone
                </button>
              </form>
            )}
          </>
        )}

        {step === 2 && (
          <div className="auth-form">
            <button className="back-btn" onClick={() => setStep(1)}>← Back</button>
            <h2>{isLogin ? "Login with Phone" : "Sign Up with Phone"}</h2>
            <p>We'll send you a verification code</p>

            {!showOtpForm ? (
              <form onSubmit={handlePhoneSubmit}>
                <input
                  type="tel"
                  placeholder="+592 XXX XXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <button type="submit" className="auth-btn">Send Code</button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit}>
                <p className="otp-sent">Code sent to {phoneNumber}</p>
                <input
                  type="text"
                  placeholder="Enter 4-digit code"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button type="submit" className="auth-btn">Verify</button>
                <button type="button" className="resend-btn">Resend Code</button>
              </form>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="auth-form location-step">
            <div className="location-icon">📍</div>
            <h2>Enable Location</h2>
            <p>Help us provide better service by allowing location access</p>
            <button className="auth-btn" onClick={handleEnableLocation}>
              Enable Location
            </button>
            <button className="skip-btn" onClick={handleEnableLocation}>
              Skip for Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
