"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SettingsPage() {
  const router = useRouter();
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // Notification Settings
  const [notifications, setNotifications] = useState({
    general: true,
    sound: true,
    vibrate: false,
    offers: true,
    promos: true
  });

  // Password Settings
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("kinnectUsername");
    const storedIsLoggedIn = localStorage.getItem("kinnectIsLoggedIn");
    if (storedUsername && storedIsLoggedIn === "true") {
      setUsername(storedUsername);
      setIsLoggedIn(true);
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

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChangePassword = () => {
    if (passwords.current && passwords.new && passwords.confirm) {
      if (passwords.new === passwords.confirm) {
        alert("Password changed successfully!");
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        alert("New passwords don't match!");
      }
    }
  };

  const handleDeleteAccount = () => {
    // Implement delete account logic
    alert("Account deletion requested. This feature will be implemented soon.");
    setShowDeleteModal(false);
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
          <Link href="/rides/book">🚗 Rides</Link>
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
            <Link href="/settings" className="active"><span className="s-ico">⚙️</span> Settings</Link>
          </nav>
          <div className="sidebar-footer"><span style={{ fontSize: '22px' }}>👤</span></div>
        </aside>

        <main className="main-content">
          <div className="settings-page">
            <div className="settings-header">
              <h1>Settings</h1>
              <p>Manage your account preferences</p>
            </div>

            {/* Notification Settings */}
            <div className="settings-section">
              <h2 className="settings-section-title">🔔 Notification Settings</h2>
              <div className="settings-toggle-list">
                <div className="settings-toggle-item">
                  <div>
                    <h4>General Notifications</h4>
                    <p>Order updates, delivery status</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.general}
                      onChange={() => handleNotificationToggle('general')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-toggle-item">
                  <div>
                    <h4>Sound</h4>
                    <p>Play sound for notifications</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.sound}
                      onChange={() => handleNotificationToggle('sound')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-toggle-item">
                  <div>
                    <h4>Vibrate</h4>
                    <p>Vibrate on notifications</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.vibrate}
                      onChange={() => handleNotificationToggle('vibrate')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-toggle-item">
                  <div>
                    <h4>Special Offers</h4>
                    <p>Receive exclusive deals</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.offers}
                      onChange={() => handleNotificationToggle('offers')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-toggle-item">
                  <div>
                    <h4>Promo & Discounts</h4>
                    <p>Get notified about promotions</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.promos}
                      onChange={() => handleNotificationToggle('promos')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Password Settings */}
            <div className="settings-section">
              <h2 className="settings-section-title">🔒 Password Settings</h2>
              <div className="password-form">
                <div className="form-field">
                  <label>Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={passwords.current}
                    onChange={e => setPasswords({...passwords, current: e.target.value})}
                  />
                </div>
                <div className="form-field">
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={passwords.new}
                    onChange={e => setPasswords({...passwords, new: e.target.value})}
                  />
                </div>
                <div className="form-field">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={passwords.confirm}
                    onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                  />
                </div>
                <button className="change-password-btn" onClick={handleChangePassword}>
                  Change Password
                </button>
              </div>
            </div>

            {/* Delete Account */}
            <div className="settings-section">
              <h2 className="settings-section-title">🗑️ Delete Account</h2>
              <div className="delete-account-section">
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <button className="delete-account-btn" onClick={() => setShowDeleteModal(true)}>
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        </main>

        <aside className="right-panel">
          <div className="wallet-card">
            <div className="wallet-top">
              <div className="wallet-ico">💰</div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700 }}>Pay with MMG</div>
                <div className="w-amount">$12,500 <span>GYD</span></div>
              </div>
            </div>
            <button className="add-btn">Add Money <span>›</span></button>
          </div>
        </aside>
      </div>

      {/* Mobile Header */}
      <header className="mobile-header">
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
          ←
        </button>
        <h1 style={{ fontSize: '16px', fontWeight: 800 }}>Settings</h1>
        <div style={{ width: '40px' }}></div>
      </header>

      {/* Mobile Content */}
      <div className="mobile-content">
        <div className="settings-page">
          {/* Notification Settings */}
          <div className="settings-section">
            <h2 className="settings-section-title">🔔 Notification Settings</h2>
            <div className="settings-toggle-list">
              <div className="settings-toggle-item">
                <div>
                  <h4>General Notifications</h4>
                  <p>Order updates, delivery status</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.general}
                    onChange={() => handleNotificationToggle('general')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="settings-toggle-item">
                <div>
                  <h4>Sound</h4>
                  <p>Play sound for notifications</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.sound}
                    onChange={() => handleNotificationToggle('sound')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="settings-toggle-item">
                <div>
                  <h4>Vibrate</h4>
                  <p>Vibrate on notifications</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.vibrate}
                    onChange={() => handleNotificationToggle('vibrate')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="settings-toggle-item">
                <div>
                  <h4>Special Offers</h4>
                  <p>Receive exclusive deals</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.offers}
                    onChange={() => handleNotificationToggle('offers')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="settings-toggle-item">
                <div>
                  <h4>Promo & Discounts</h4>
                  <p>Get notified about promotions</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.promos}
                    onChange={() => handleNotificationToggle('promos')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Password Settings */}
          <div className="settings-section">
            <h2 className="settings-section-title">🔒 Password Settings</h2>
            <div className="password-form">
              <div className="form-field">
                <label>Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={passwords.current}
                  onChange={e => setPasswords({...passwords, current: e.target.value})}
                />
              </div>
              <div className="form-field">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={passwords.new}
                  onChange={e => setPasswords({...passwords, new: e.target.value})}
                />
              </div>
              <div className="form-field">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={passwords.confirm}
                  onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                />
              </div>
              <button className="change-password-btn" onClick={handleChangePassword}>
                Change Password
              </button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="settings-section">
            <h2 className="settings-section-title">🗑️ Delete Account</h2>
            <div className="delete-account-section">
              <p>Once you delete your account, there is no going back. Please be certain.</p>
              <button className="delete-account-btn" onClick={() => setShowDeleteModal(true)}>
                Delete My Account
              </button>
            </div>
          </div>
        </div>
        <div className="footer-spacer"></div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-card delete-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete Account?</h2>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: '20px', color: 'var(--muted)' }}>
                This action cannot be undone. All your data, orders, and preferences will be permanently deleted.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="modal-cancel-btn" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="modal-delete-btn" onClick={handleDeleteAccount}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav">
        <Link href="/"><span className="bnav-icon">🏠</span>Home</Link>
        <Link href="/activity"><span className="bnav-icon">📦</span>Orders</Link>
        <Link href="/rides/book"><span className="bnav-icon">🚗</span>Rides</Link>
        <Link href="/profile"><span className="bnav-icon">👤</span>Account</Link>
      </nav>
    </>
  );
}
