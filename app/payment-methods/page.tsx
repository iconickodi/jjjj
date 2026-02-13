"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentMethodsPage() {
  const router = useRouter();
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const [selectedMethod, setSelectedMethod] = useState("mmg");
  const [cards, setCards] = useState([
    { id: 1, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true }
  ]);

  const [newCard, setNewCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
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

  const handleAddCard = () => {
    if (newCard.number && newCard.name && newCard.expiry && newCard.cvv) {
      const last4 = newCard.number.slice(-4);
      setCards([...cards, {
        id: cards.length + 1,
        type: "Card",
        last4,
        expiry: newCard.expiry,
        isDefault: false
      }]);
      setNewCard({ number: "", name: "", expiry: "", cvv: "" });
      setShowAddCardModal(false);
    }
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
            <Link href="/payment-methods" className="active"><span className="s-ico">💳</span> Payment Methods</Link>
            <Link href="/contact"><span className="s-ico">📞</span> Contact Us</Link>
            <Link href="/help"><span className="s-ico">❓</span> Help & FAQs</Link>
            <Link href="/settings"><span className="s-ico">⚙️</span> Settings</Link>
          </nav>
          <div className="sidebar-footer"><span style={{ fontSize: '22px' }}>👤</span></div>
        </aside>

        <main className="main-content">
          <div className="settings-page">
            <div className="settings-header">
              <h1>Payment Methods</h1>
              <p>Choose your preferred payment option</p>
            </div>

            <div className="payment-methods-grid">
              {/* MMG */}
              <div 
                className={`payment-method-card ${selectedMethod === 'mmg' ? 'selected' : ''}`}
                onClick={() => setSelectedMethod('mmg')}
              >
                <div className="payment-method-icon">💳</div>
                <div className="payment-method-info">
                  <h3>MMG Mobile Money</h3>
                  <p>Fast and secure mobile payments</p>
                </div>
                <div className="payment-method-radio">
                  {selectedMethod === 'mmg' && <div className="radio-dot"></div>}
                </div>
              </div>

              {/* Cards */}
              {cards.map(card => (
                <div 
                  key={card.id}
                  className={`payment-method-card ${selectedMethod === `card-${card.id}` ? 'selected' : ''}`}
                  onClick={() => setSelectedMethod(`card-${card.id}`)}
                >
                  <div className="payment-method-icon">💳</div>
                  <div className="payment-method-info">
                    <h3>{card.type} •••• {card.last4}</h3>
                    <p>Expires {card.expiry}</p>
                    {card.isDefault && <span className="default-badge-small">Default</span>}
                  </div>
                  <div className="payment-method-radio">
                    {selectedMethod === `card-${card.id}` && <div className="radio-dot"></div>}
                  </div>
                </div>
              ))}

              {/* Cash on Delivery */}
              <div 
                className={`payment-method-card ${selectedMethod === 'cash' ? 'selected' : ''}`}
                onClick={() => setSelectedMethod('cash')}
              >
                <div className="payment-method-icon">💵</div>
                <div className="payment-method-info">
                  <h3>Cash on Delivery</h3>
                  <p>Pay when you receive your order</p>
                </div>
                <div className="payment-method-radio">
                  {selectedMethod === 'cash' && <div className="radio-dot"></div>}
                </div>
              </div>
            </div>

            <button className="add-address-btn" onClick={() => setShowAddCardModal(true)}>
              + Add Credit/Debit Card
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
        <h1 style={{ fontSize: '16px', fontWeight: 800 }}>Payment Methods</h1>
        <div style={{ width: '40px' }}></div>
      </header>

      {/* Mobile Content */}
      <div className="mobile-content">
        <div className="settings-page">
          <div className="payment-methods-grid">
            <div 
              className={`payment-method-card ${selectedMethod === 'mmg' ? 'selected' : ''}`}
              onClick={() => setSelectedMethod('mmg')}
            >
              <div className="payment-method-icon">💳</div>
              <div className="payment-method-info">
                <h3>MMG Mobile Money</h3>
                <p>Fast and secure mobile payments</p>
              </div>
              <div className="payment-method-radio">
                {selectedMethod === 'mmg' && <div className="radio-dot"></div>}
              </div>
            </div>

            {cards.map(card => (
              <div 
                key={card.id}
                className={`payment-method-card ${selectedMethod === `card-${card.id}` ? 'selected' : ''}`}
                onClick={() => setSelectedMethod(`card-${card.id}`)}
              >
                <div className="payment-method-icon">💳</div>
                <div className="payment-method-info">
                  <h3>{card.type} •••• {card.last4}</h3>
                  <p>Expires {card.expiry}</p>
                  {card.isDefault && <span className="default-badge-small">Default</span>}
                </div>
                <div className="payment-method-radio">
                  {selectedMethod === `card-${card.id}` && <div className="radio-dot"></div>}
                </div>
              </div>
            ))}

            <div 
              className={`payment-method-card ${selectedMethod === 'cash' ? 'selected' : ''}`}
              onClick={() => setSelectedMethod('cash')}
            >
              <div className="payment-method-icon">💵</div>
              <div className="payment-method-info">
                <h3>Cash on Delivery</h3>
                <p>Pay when you receive your order</p>
              </div>
              <div className="payment-method-radio">
                {selectedMethod === 'cash' && <div className="radio-dot"></div>}
              </div>
            </div>
          </div>

          <button className="add-address-btn" onClick={() => setShowAddCardModal(true)}>
            + Add Credit/Debit Card
          </button>
        </div>
        <div className="footer-spacer"></div>
      </div>

      {/* Add Card Modal */}
      {showAddCardModal && (
        <div className="modal-overlay" onClick={() => setShowAddCardModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Card</h2>
              <button onClick={() => setShowAddCardModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={newCard.number}
                  onChange={e => setNewCard({...newCard, number: e.target.value})}
                />
              </div>
              <div className="form-field">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={newCard.name}
                  onChange={e => setNewCard({...newCard, name: e.target.value})}
                />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={newCard.expiry}
                    onChange={e => setNewCard({...newCard, expiry: e.target.value})}
                  />
                </div>
                <div className="form-field">
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={3}
                    value={newCard.cvv}
                    onChange={e => setNewCard({...newCard, cvv: e.target.value})}
                  />
                </div>
              </div>
              <button className="modal-save-btn" onClick={handleAddCard}>
                Add Card
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
