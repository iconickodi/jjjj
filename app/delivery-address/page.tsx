"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DeliveryAddressPage() {
  const router = useRouter();
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      address: "Blue house opposite school, 2nd bridge",
      area: "Georgetown",
      phone: "+592-XXX-XXXX",
      isDefault: true
    },
    {
      id: 2,
      label: "Work",
      address: "Main Street, Office Building 3rd Floor",
      area: "Georgetown",
      phone: "+592-XXX-XXXX",
      isDefault: false
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    label: "",
    address: "",
    area: "",
    phone: ""
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

  const handleAddAddress = () => {
    if (newAddress.label && newAddress.address && newAddress.area && newAddress.phone) {
      setAddresses([...addresses, {
        id: addresses.length + 1,
        ...newAddress,
        isDefault: false
      }]);
      setNewAddress({ label: "", address: "", area: "", phone: "" });
      setShowAddModal(false);
    }
  };

  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
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
            <Link href="/delivery-address" className="active"><span className="s-ico">📍</span> Delivery Address</Link>
            <Link href="/payment-methods"><span className="s-ico">💳</span> Payment Methods</Link>
            <Link href="/contact"><span className="s-ico">📞</span> Contact Us</Link>
            <Link href="/help"><span className="s-ico">❓</span> Help & FAQs</Link>
            <Link href="/settings"><span className="s-ico">⚙️</span> Settings</Link>
          </nav>
          <div className="sidebar-footer"><span style={{ fontSize: '22px' }}>👤</span></div>
        </aside>

        <main className="main-content">
          <div className="settings-page">
            <div className="settings-header">
              <h1>Delivery Addresses</h1>
              <p>Manage your saved delivery locations</p>
            </div>

            <div className="address-list">
              {addresses.map(addr => (
                <div key={addr.id} className="address-card">
                  <div className="address-card-header">
                    <div className="address-label-group">
                      <h3>{addr.label}</h3>
                      {addr.isDefault && <span className="default-badge">Default</span>}
                    </div>
                    <div className="address-actions">
                      <button className="address-edit-btn">✏️</button>
                      {!addr.isDefault && (
                        <button 
                          className="address-delete-btn"
                          onClick={() => handleDeleteAddress(addr.id)}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="address-details">
                    <p className="address-text">📍 {addr.address}</p>
                    <p className="address-area">📌 {addr.area}</p>
                    <p className="address-phone">📞 {addr.phone}</p>
                  </div>
                  {!addr.isDefault && (
                    <button 
                      className="set-default-btn"
                      onClick={() => handleSetDefault(addr.id)}
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button className="add-address-btn" onClick={() => setShowAddModal(true)}>
              + Add New Address
            </button>
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
        <h1 style={{ fontSize: '16px', fontWeight: 800 }}>Delivery Addresses</h1>
        <div style={{ width: '40px' }}></div>
      </header>

      {/* Mobile Content */}
      <div className="mobile-content">
        <div className="settings-page">
          <div className="address-list">
            {addresses.map(addr => (
              <div key={addr.id} className="address-card">
                <div className="address-card-header">
                  <div className="address-label-group">
                    <h3>{addr.label}</h3>
                    {addr.isDefault && <span className="default-badge">Default</span>}
                  </div>
                  <div className="address-actions">
                    <button className="address-edit-btn">✏️</button>
                    {!addr.isDefault && (
                      <button 
                        className="address-delete-btn"
                        onClick={() => handleDeleteAddress(addr.id)}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
                <div className="address-details">
                  <p className="address-text">📍 {addr.address}</p>
                  <p className="address-area">📌 {addr.area}</p>
                  <p className="address-phone">📞 {addr.phone}</p>
                </div>
                {!addr.isDefault && (
                  <button 
                    className="set-default-btn"
                    onClick={() => handleSetDefault(addr.id)}
                  >
                    Set as Default
                  </button>
                )}
              </div>
            ))}
          </div>

          <button className="add-address-btn" onClick={() => setShowAddModal(true)}>
            + Add New Address
          </button>
        </div>
        <div className="footer-spacer"></div>
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Address</h2>
              <button onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label>Label</label>
                <input
                  type="text"
                  placeholder="e.g., Home, Work, Friend's Place"
                  value={newAddress.label}
                  onChange={e => setNewAddress({...newAddress, label: e.target.value})}
                />
              </div>
              <div className="form-field">
                <label>Address</label>
                <textarea
                  placeholder="House number, street, landmarks"
                  value={newAddress.address}
                  onChange={e => setNewAddress({...newAddress, address: e.target.value})}
                />
              </div>
              <div className="form-field">
                <label>Area</label>
                <input
                  type="text"
                  placeholder="e.g., Georgetown, Linden"
                  value={newAddress.area}
                  onChange={e => setNewAddress({...newAddress, area: e.target.value})}
                />
              </div>
              <div className="form-field">
                <label>Contact Number</label>
                <input
                  type="tel"
                  placeholder="+592-XXX-XXXX"
                  value={newAddress.phone}
                  onChange={e => setNewAddress({...newAddress, phone: e.target.value})}
                />
              </div>
              <button className="modal-save-btn" onClick={handleAddAddress}>
                Save Address
              </button>
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
