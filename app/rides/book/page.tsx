"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BookRidePage() {
  const router = useRouter();
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // Ride state
  const [currentLocation, setCurrentLocation] = useState("Getting your location...");
  const [pickupDescription, setPickupDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationDescription, setDestinationDescription] = useState("");
  const [distance, setDistance] = useState(0);
  const [fare, setFare] = useState(0);
  const [rideRequested, setRideRequested] = useState(false);
  const [assigningDriver, setAssigningDriver] = useState(false);
  const [driver, setDriver] = useState<any>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("kinnectUsername");
    const storedIsLoggedIn = localStorage.getItem("kinnectIsLoggedIn");

    if (storedUsername && storedIsLoggedIn === "true") {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }

    // Auto-detect location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation("Current Location");
        },
        () => {
          setCurrentLocation("Location access denied");
        }
      );
    }
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("kinnectUsername");
    localStorage.removeItem("kinnectIsLoggedIn");
    setUsername("Guest");
    setIsLoggedIn(false);
    setShowDropdown(false);
    setShowMobileDropdown(false);
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setShowMobileDropdown(false);
      }
    };

    if (showDropdown || showMobileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, showMobileDropdown]);

  // Calculate fare when destination changes
  useEffect(() => {
    if (destination) {
      // Simulate distance calculation
      const calculatedDistance = Math.random() * 15 + 2; // 2-17 km
      setDistance(parseFloat(calculatedDistance.toFixed(1)));
      setFare(Math.round(calculatedDistance * 500)); // $500 per km
    }
  }, [destination]);

  const handleRequestRide = () => {
    if (!destination || !destinationDescription || !pickupDescription) {
      alert("Please fill in all fields");
      return;
    }

    setRideRequested(true);
    setAssigningDriver(true);

    // Simulate driver assignment
    setTimeout(() => {
      setAssigningDriver(false);
      setDriver({
        name: "Marcus Williams",
        car: "Toyota Corolla",
        plate: "PVV 1234",
        rating: 4.8,
        eta: "5 mins",
        phone: "+592-XXX-XXXX"
      });
    }, 3000);
  };

  const handleCancelRide = () => {
    setRideRequested(false);
    setAssigningDriver(false);
    setDriver(null);
    setDestination("");
    setDestinationDescription("");
    setPickupDescription("");
  };

  return (
    <>
      {/* Desktop Top Bar */}
      <header className="desktop-topbar">
        <div className="topbar-logo">
          <div className="logo-icon">K</div>
          <span className="logo-text">Kinnect</span>
        </div>
        <nav className="topbar-nav">
          <Link href="/">🏠 Home</Link>
          <Link href="/activity">📦 My Orders</Link>
          <Link href="/rides/book" className="active">🚗 Rides</Link>
          <Link href="/restaurants">🍴 Food</Link>
        </nav>
        <div className="topbar-right">
          <button className="topbar-icon-btn">🌟</button>
          <Link href="/activity" className="topbar-icon-btn">🔔</Link>
          <Link href="/cart" className="topbar-icon-btn">🛒</Link>
          <div className="dd-wrap" ref={dropdownRef}>
            {isLoggedIn ? (
              <>
                <button className="d-user-chip" onClick={() => setShowDropdown(!showDropdown)}>
                  <div className="d-user-avatar">👤</div>
                  {username} ▾
                </button>
                {showDropdown && (
                  <div className="dropdown open">
                    <Link href="/profile" onClick={() => setShowDropdown(false)}>👤 &nbsp;My Profile</Link>
                    <a href="#" onClick={handleLogout}>🚪 &nbsp;Logout</a>
                  </div>
                )}
              </>
            ) : (
              <Link href="/login" className="d-user-chip" style={{ textDecoration: 'none' }}>
                <div className="d-user-avatar">👤</div>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Desktop Shell */}
      <div className="desktop-shell">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <Link href="/"><span className="s-ico">🏠</span> Home</Link>
            <Link href="/activity"><span className="s-ico">📦</span> My Orders</Link>
            <Link href="/profile"><span className="s-ico">👤</span> My Profile</Link>
            <Link href="/delivery-address"><span className="s-ico">📍</span> Delivery Address</Link>
            <Link href="/payment-methods"><span className="s-ico">💳</span> Payment Methods</Link>
            <Link href="/contact"><span className="s-ico">📞</span> Contact Us</Link>
            <Link href="/help"><span className="s-ico">❓</span> Help & FAQs</Link>
            <Link href="/settings"><span className="s-ico">⚙️</span> Settings</Link>
          </nav>
          <div className="sidebar-footer"><span style={{ fontSize: '22px' }}>👤</span></div>
        </aside>

        <main className="main-content">
          <div className="rides-page">
            {!rideRequested ? (
              <>
                {/* Map Section */}
                <div className="rides-map">
                  <div className="map-placeholder">
                    🗺️ GPS Map
                    <p style={{ fontSize: '14px', marginTop: '10px', opacity: 0.7 }}>
                      Interactive map showing your location and destination
                    </p>
                  </div>
                </div>

                {/* Ride Form */}
                <div className="rides-form-card">
                  <h2 className="rides-form-title">Book a Ride</h2>

                  <div className="rides-form-group">
                    <label>📍 Pickup Location</label>
                    <input
                      type="text"
                      className="rides-input"
                      value={currentLocation}
                      readOnly
                    />
                    <textarea
                      className="rides-textarea"
                      placeholder="Describe where you are (e.g., Blue house near school)"
                      value={pickupDescription}
                      onChange={e => setPickupDescription(e.target.value)}
                    />
                  </div>

                  <div className="rides-form-group">
                    <label>🎯 Where do you want to go?</label>
                    <input
                      type="text"
                      className="rides-input"
                      placeholder="Enter destination"
                      value={destination}
                      onChange={e => setDestination(e.target.value)}
                    />
                    <textarea
                      className="rides-textarea"
                      placeholder="Describe destination (e.g., Big yellow building)"
                      value={destinationDescription}
                      onChange={e => setDestinationDescription(e.target.value)}
                    />
                  </div>

                  {destination && (
                    <div className="rides-fare-display">
                      <div className="rides-fare-row">
                        <span>📏 Distance</span>
                        <span>{distance} km</span>
                      </div>
                      <div className="rides-fare-row rides-fare-total">
                        <span>💵 Estimated Fare</span>
                        <span>${fare.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <button 
                    className="rides-request-btn"
                    onClick={handleRequestRide}
                    disabled={!destination || !pickupDescription || !destinationDescription}
                  >
                    Request Ride
                  </button>
                </div>
              </>
            ) : (
              <div className="rides-status-card">
                {assigningDriver ? (
                  <div className="rides-assigning">
                    <div className="rides-spinner"></div>
                    <h2>Assigning Driver...</h2>
                    <p>Finding the best driver for you</p>
                  </div>
                ) : (
                  <div className="rides-driver-assigned">
                    <div className="rides-driver-avatar">👤</div>
                    <h2>{driver.name}</h2>
                    <p>{driver.car} • {driver.plate}</p>
                    <div className="rides-driver-rating">⭐ {driver.rating}</div>

                    <div className="rides-trip-details">
                      <div className="rides-detail-row">
                        <span>📍 From</span>
                        <span>{pickupDescription}</span>
                      </div>
                      <div className="rides-detail-row">
                        <span>🎯 To</span>
                        <span>{destinationDescription}</span>
                      </div>
                      <div className="rides-detail-row">
                        <span>⏱️ ETA</span>
                        <span>{driver.eta}</span>
                      </div>
                      <div className="rides-detail-row">
                        <span>💵 Fare</span>
                        <span>${fare.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="rides-driver-actions">
                      <a href={`tel:${driver.phone}`} className="rides-call-btn">
                        📞 Call Driver
                      </a>
                      <a href="tel:911" className="rides-emergency-btn">
                        🚨 Emergency
                      </a>
                    </div>

                    <button 
                      className="rides-cancel-btn"
                      onClick={handleCancelRide}
                    >
                      Cancel Ride
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        <aside className="right-panel">
          <div className="wallet-card">
            <div className="wallet-top">
              <div className="wallet-ico">💰</div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700 }}>Balance</div>
                <div className="w-amount">$12,500 <span>GYD</span></div>
              </div>
            </div>
            <button className="add-btn">Add Money <span>›</span></button>
          </div>
        </aside>
      </div>

      {/* Mobile Header */}
      <header className="mobile-header">
        <Link className="nav-logo" href="/">
          <div className="logo-icon">K</div>
          <span className="logo-text">Kinnect</span>
        </Link>
        <div className="nav-right">
          <Link href="/cart" className="nav-icon-btn">🛒</Link>
          <div className="dd-wrap" ref={mobileDropdownRef}>
            {isLoggedIn ? (
              <>
                <button className="m-user-chip" onClick={() => setShowMobileDropdown(!showMobileDropdown)}>
                  <div className="m-user-avatar">👤</div>
                  {username} ▾
                </button>
                {showMobileDropdown && (
                  <div className="dropdown open">
                    <Link href="/profile" onClick={() => setShowMobileDropdown(false)}>👤 &nbsp;My Profile</Link>
                    <a href="#" onClick={handleLogout}>🚪 &nbsp;Logout</a>
                  </div>
                )}
              </>
            ) : (
              <Link href="/login" className="m-user-chip" style={{ textDecoration: 'none' }}>
                <div className="m-user-avatar">👤</div>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Content */}
      <div className="mobile-content">
        <div className="rides-page">
          {!rideRequested ? (
            <>
              <div className="rides-map">
                <div className="map-placeholder">
                  🗺️ GPS Map
                  <p style={{ fontSize: '14px', marginTop: '10px', opacity: 0.7 }}>
                    Your location and route
                  </p>
                </div>
              </div>

              <div className="rides-form-card">
                <h2 className="rides-form-title">Book a Ride</h2>

                <div className="rides-form-group">
                  <label>📍 Pickup Location</label>
                  <input
                    type="text"
                    className="rides-input"
                    value={currentLocation}
                    readOnly
                  />
                  <textarea
                    className="rides-textarea"
                    placeholder="Describe where you are"
                    value={pickupDescription}
                    onChange={e => setPickupDescription(e.target.value)}
                  />
                </div>

                <div className="rides-form-group">
                  <label>🎯 Where to?</label>
                  <input
                    type="text"
                    className="rides-input"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                  />
                  <textarea
                    className="rides-textarea"
                    placeholder="Describe destination"
                    value={destinationDescription}
                    onChange={e => setDestinationDescription(e.target.value)}
                  />
                </div>

                {destination && (
                  <div className="rides-fare-display">
                    <div className="rides-fare-row">
                      <span>📏 Distance</span>
                      <span>{distance} km</span>
                    </div>
                    <div className="rides-fare-row rides-fare-total">
                      <span>💵 Estimated Fare</span>
                      <span>${fare.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <button 
                  className="rides-request-btn"
                  onClick={handleRequestRide}
                  disabled={!destination || !pickupDescription || !destinationDescription}
                >
                  Request Ride
                </button>
              </div>
            </>
          ) : (
            <div className="rides-status-card">
              {assigningDriver ? (
                <div className="rides-assigning">
                  <div className="rides-spinner"></div>
                  <h2>Assigning Driver...</h2>
                  <p>Finding the best driver for you</p>
                </div>
              ) : (
                <div className="rides-driver-assigned">
                  <div className="rides-driver-avatar">👤</div>
                  <h2>{driver.name}</h2>
                  <p>{driver.car} • {driver.plate}</p>
                  <div className="rides-driver-rating">⭐ {driver.rating}</div>

                  <div className="rides-trip-details">
                    <div className="rides-detail-row">
                      <span>📍 From</span>
                      <span>{pickupDescription}</span>
                    </div>
                    <div className="rides-detail-row">
                      <span>🎯 To</span>
                      <span>{destinationDescription}</span>
                    </div>
                    <div className="rides-detail-row">
                      <span>⏱️ ETA</span>
                      <span>{driver.eta}</span>
                    </div>
                    <div className="rides-detail-row">
                      <span>💵 Fare</span>
                      <span>${fare.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="rides-driver-actions">
                    <a href={`tel:${driver.phone}`} className="rides-call-btn">
                      📞 Call Driver
                    </a>
                    <a href="tel:911" className="rides-emergency-btn">
                      🚨 Emergency
                    </a>
                  </div>

                  <button 
                    className="rides-cancel-btn"
                    onClick={handleCancelRide}
                  >
                    Cancel Ride
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="footer-spacer"></div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav">
        <Link href="/"><span className="bnav-icon">🏠</span>Home</Link>
        <Link href="/activity"><span className="bnav-icon">📦</span>Orders</Link>
        <Link href="/rides/book" className="active"><span className="bnav-icon">🚗</span>Rides</Link>
        <Link href="/profile"><span className="bnav-icon">👤</span>Account</Link>
      </nav>
    </>
  );
}
