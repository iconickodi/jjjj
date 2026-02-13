"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MobileOnboarding() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(0);

  useEffect(() => {
    // Check if onboarding has been completed
    const onboardingComplete = localStorage.getItem("kinnectOnboardingComplete");
    if (onboardingComplete === "true") {
      router.push("/");
    }
  }, [router]);

  const screens = [
    {
      title: "Welcome to Kinnect",
      description: "Your all-in-one delivery and ride app. From getting things done to getting around, Kinnect has you covered.",
      image: "🚀",
      showButtons: false
    },
    {
      title: "Book a Ride",
      description: "Get where you need to go quickly and safely. Our trusted drivers are ready to take you anywhere in Guyana.",
      image: "🚗",
      showButtons: false
    },
    {
      title: "Order Food",
      description: "Craving something delicious? Browse hundreds of restaurants and get your favorite meals delivered to your door.",
      image: "🍔",
      showButtons: false
    },
    {
      title: "Your Everyday Everything App",
      description: "",
      image: "✨",
      showButtons: true
    }
  ];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("kinnectOnboardingComplete", "true");
    router.push("/");
  };

  const handleGetStarted = () => {
    localStorage.setItem("kinnectOnboardingComplete", "true");
    router.push("/login");
  };

  const handleLogin = () => {
    localStorage.setItem("kinnectOnboardingComplete", "true");
    router.push("/login");
  };

  const currentScreenData = screens[currentScreen];

  return (
    <div className="onboarding-page">
      {/* Header */}
      <div className="onboarding-header">
        <div className="logo-icon">K</div>
        <span className="logo-text">Kinnect</span>
      </div>

      {/* Main Content */}
      <div className="onboarding-content">
        {/* Image/Icon */}
        <div className="onboarding-illustration">
          <div className="onboarding-emoji">{currentScreenData.image}</div>
        </div>

        {/* Text */}
        <div className="onboarding-text">
          <h1>{currentScreenData.title}</h1>
          {currentScreenData.description && <p>{currentScreenData.description}</p>}
        </div>

        {/* Dots Indicator */}
        <div className="onboarding-dots">
          {screens.map((_, idx) => (
            <div 
              key={idx} 
              className={`onboarding-dot ${idx === currentScreen ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="onboarding-actions">
        {!currentScreenData.showButtons ? (
          <>
            <button className="onboarding-btn-primary" onClick={handleNext}>
              Next
            </button>
            <button className="onboarding-btn-text" onClick={handleSkip}>
              Skip
            </button>
          </>
        ) : (
          <>
            <button className="onboarding-btn-primary" onClick={handleLogin}>
              Login
            </button>
            <button className="onboarding-btn-secondary" onClick={handleGetStarted}>
              New to Kinnect? Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
