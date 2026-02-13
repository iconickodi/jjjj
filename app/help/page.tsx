"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HelpPage() {
  const router = useRouter();
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: "How do I place a food order?",
      answer: "Simply browse restaurants, select items, add them to cart, provide delivery details, and place your order. You'll receive real-time updates on your order status."
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery times vary by restaurant and location. Typically, orders arrive within 30-45 minutes. You can track your order in real-time from the My Orders section."
    },
    {
      question: "How do I book a taxi?",
      answer: "Go to the Rides section, enter your pickup and destination locations, confirm the fare, and request a ride. A driver will be assigned to you within minutes."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept MMG Mobile Money, Credit/Debit Cards, and Cash on Delivery. You can manage your payment methods in Settings."
    },
    {
      question: "Can I cancel my order?",
      answer: "Yes, you can cancel orders from the My Orders page. However, cancellation may not be available once the restaurant has started preparing your food or if a driver is already en route."
    },
    {
      question: "How do I track my order?",
      answer: "Go to My Orders and click on your active order to see real-time tracking. You'll see the preparation status and driver location."
    },
    {
      question: "What if my order is wrong or late?",
      answer: "Contact our customer support immediately through the Contact Us page. We'll work with you to resolve the issue and make it right."
    },
    {
      question: "How do I add a new delivery address?",
      answer: "Go to Delivery Address in your account settings, click 'Add New Address', and fill in the details. You can save multiple addresses."
    },
    {
      question: "Is there a minimum order amount?",
      answer: "Minimum order amounts vary by restaurant. You'll see the minimum clearly displayed on each restaurant's page."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach us through the Contact Us page via live chat, WhatsApp, Facebook, or phone. We're available 8 AM - 10 PM every day."
    }
  ];

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
            <Link href="/help" className="active"><span className="s-ico">❓</span> Help & FAQs</Link>
            <Link href="/settings"><span className="s-ico">⚙️</span> Settings</Link>
          </nav>
          <div className="sidebar-footer"><span style={{ fontSize: '22px' }}>👤</span></div>
        </aside>

        <main className="main-content">
          <div className="settings-page">
            <div className="settings-header">
              <h1>Help & FAQs</h1>
              <p>Find answers to common questions</p>
            </div>

            <div className="search-wrap" style={{ marginBottom: '24px' }}>
              <div className="search-bar">
                <span className="s-icon-txt">🔍</span>
                <input type="text" placeholder="Search for help..." />
              </div>
            </div>

            <div className="faq-list">
              {faqs.map((faq, idx) => (
                <div key={idx} className="faq-item">
                  <button 
                    className="faq-question"
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-toggle">{expandedFaq === idx ? '−' : '+'}</span>
                  </button>
                  {expandedFaq === idx && (
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="help-footer">
              <h3>Still need help?</h3>
              <p>Our support team is here for you</p>
              <Link href="/contact" className="help-contact-btn">
                Contact Support
              </Link>
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
        <h1 style={{ fontSize: '16px', fontWeight: 800 }}>Help & FAQs</h1>
        <div style={{ width: '40px' }}></div>
      </header>

      {/* Mobile Content */}
      <div className="mobile-content">
        <div className="settings-page">
          <div className="search-wrap" style={{ marginBottom: '24px' }}>
            <div className="search-bar">
              <span className="s-icon-txt">🔍</span>
              <input type="text" placeholder="Search for help..." />
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <button 
                  className="faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-toggle">{expandedFaq === idx ? '−' : '+'}</span>
                </button>
                {expandedFaq === idx && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="help-footer">
            <h3>Still need help?</h3>
            <p>Our support team is here for you</p>
            <Link href="/contact" className="help-contact-btn">
              Contact Support
            </Link>
          </div>
        </div>
        <div className="footer-spacer"></div>
      </div>

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
