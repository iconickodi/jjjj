"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ActivityPage() {
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

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

  // Sample orders data
  const activeOrders = [
    {
      id: 1,
      type: 'food',
      restaurant: 'Tasty Bites',
      orderId: '#12345',
      items: ['2x BBQ Wings', '1x Classic Burger'],
      location: 'Blue house opposite school',
      total: 2900,
      status: 'accepted',
      eta: '25 mins'
    }
  ];

  const completedOrders = [
    {
      id: 2,
      type: 'food',
      restaurant: 'Golden Wok',
      orderId: '#12344',
      items: ['1x Fried Rice', '1x Spring Rolls'],
      location: 'Work Office',
      total: 1800,
      status: 'completed',
      date: 'Yesterday, 7:30 PM'
    },
    {
      id: 3,
      type: 'ride',
      driver: 'John D.',
      rideId: '#TX5678',
      route: 'Home → Work',
      fare: 1500,
      status: 'completed',
      date: 'Feb 10, 2:15 PM'
    }
  ];

  const cancelledOrders = [
    {
      id: 4,
      type: 'food',
      restaurant: 'Caribbean Kitchen',
      orderId: '#12340',
      items: ['1x Curry Chicken'],
      total: 1200,
      status: 'cancelled',
      reason: 'Restaurant closed',
      date: 'Feb 9, 8:00 PM'
    }
  ];

  return (
    <>
      {/* ══════════════════════════════════════
          DESKTOP TOP BAR
          ══════════════════════════════════════ */}
      <header className="desktop-topbar">
        <div className="topbar-logo">
          <div className="logo-icon">K</div>
          <span className="logo-text">Kinnect</span>
        </div>
        <nav className="topbar-nav">
          <Link href="/">🏠 Home</Link>
          <Link href="/activity" className="active">📦 My Orders <span className="nav-badge">2</span></Link>
          <Link href="/rides/book">🚗 Rides</Link>
          <Link href="/restaurants">🍴 Food</Link>
        </nav>
        <div className="topbar-right">
          <button className="topbar-icon-btn">🌟</button>
          <Link href="/activity" className="topbar-icon-btn" style={{ position: 'relative' }}>
            🔔<span className="badge">3</span>
          </Link>
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

      {/* ══════════════════════════════════════
          DESKTOP SHELL
          ══════════════════════════════════════ */}
      <div className="desktop-shell">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <Link href="/"><span className="s-ico">🏠</span> Home</Link>
            <Link href="/activity" className="active"><span className="s-ico">📦</span> My Orders</Link>
            <Link href="/profile"><span className="s-ico">👤</span> My Profile</Link>
            <Link href="/delivery-address"><span className="s-ico">📍</span> Delivery Address</Link>
            <Link href="/payment-methods"><span className="s-ico">💳</span> Payment Methods</Link>
            <Link href="/contact"><span className="s-ico">📞</span> Contact Us</Link>
            <Link href="/help"><span className="s-ico">❓</span> Help & FAQs</Link>
            <Link href="/settings"><span className="s-ico">⚙️</span> Settings</Link>
          </nav>
          <div className="sidebar-footer"><span style={{ fontSize: '22px' }}>👤</span></div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="orders-page-header">
            <h1 className="orders-page-title">My Orders</h1>
            <p className="orders-page-subtitle">Track and manage your orders</p>
          </div>

          {/* Tabs */}
          <div className="orders-tabs">
            <button 
              className={`orders-tab ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Active
            </button>
            <button 
              className={`orders-tab ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
            <button 
              className={`orders-tab ${activeTab === 'cancelled' ? 'active' : ''}`}
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelled
            </button>
          </div>

          {/* Tab Content */}
          <div className="orders-content">
            {/* Active Orders */}
            {activeTab === 'active' && (
              <div className="orders-list">
                {activeOrders.length === 0 ? (
                  <div className="orders-empty-state">
                    <div className="empty-icon">📦</div>
                    <h3>You don't have any active orders at this time</h3>
                    <p>When you place an order, it will appear here</p>
                    <Link href="/restaurants" className="btn-primary" style={{ marginTop: '20px' }}>
                      Browse Restaurants
                    </Link>
                  </div>
                ) : (
                  activeOrders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-type">
                          <span className="order-icon">🍔</span>
                          <div>
                            <h3 className="order-title">{order.restaurant}</h3>
                            <p className="order-id">Order {order.orderId}</p>
                          </div>
                        </div>
                        <span className="order-status status-accepted">Accepted</span>
                      </div>
                      <div className="order-body">
                        <div className="order-items">
                          {order.items.map((item, idx) => (
                            <p key={idx}>{item}</p>
                          ))}
                        </div>
                        <div className="order-meta">
                          <span>📍 {order.location}</span>
                          <span>💵 ${order.total.toLocaleString()}</span>
                          <span>⏱️ ETA: {order.eta}</span>
                        </div>
                      </div>
                      <div className="order-actions">
                        <button className="order-btn-secondary">Track Order</button>
                        <button className="order-btn-danger">Cancel Order</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Completed Orders */}
            {activeTab === 'completed' && (
              <div className="orders-list">
                {completedOrders.length === 0 ? (
                  <div className="orders-empty-state">
                    <div className="empty-icon">✅</div>
                    <h3>No completed orders yet</h3>
                    <p>Your completed orders will show up here</p>
                  </div>
                ) : (
                  completedOrders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-type">
                          <span className="order-icon">{order.type === 'food' ? '🍔' : '🚗'}</span>
                          <div>
                            <h3 className="order-title">{order.type === 'food' ? order.restaurant : order.driver}</h3>
                            <p className="order-id">{order.type === 'food' ? `Order ${order.orderId}` : `Ride ${order.rideId}`}</p>
                          </div>
                        </div>
                        <span className="order-status status-completed">Completed</span>
                      </div>
                      <div className="order-body">
                        {order.type === 'food' ? (
                          <>
                            <div className="order-items">
                              {order.items?.map((item, idx) => (
                                <p key={idx}>{item}</p>
                              ))}
                            </div>
                            <div className="order-meta">
                              <span>📍 {order.location}</span>
                              <span>💵 ${order.total.toLocaleString()}</span>
                              <span>📅 {order.date}</span>
                            </div>
                          </>
                        ) : (
                          <div className="order-meta">
                            <span>📍 {order.route}</span>
                            <span>💵 ${order.fare?.toLocaleString()}</span>
                            <span>📅 {order.date}</span>
                          </div>
                        )}
                      </div>
                      <div className="order-actions">
                        <button className="order-btn-primary">Reorder</button>
                        <button className="order-btn-secondary">View Receipt</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Cancelled Orders */}
            {activeTab === 'cancelled' && (
              <div className="orders-list">
                {cancelledOrders.length === 0 ? (
                  <div className="orders-empty-state">
                    <div className="empty-icon">🚫</div>
                    <h3>No cancelled orders</h3>
                    <p>You haven't cancelled any orders</p>
                  </div>
                ) : (
                  cancelledOrders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-type">
                          <span className="order-icon">🍔</span>
                          <div>
                            <h3 className="order-title">{order.restaurant}</h3>
                            <p className="order-id">Order {order.orderId}</p>
                          </div>
                        </div>
                        <span className="order-status status-cancelled">Cancelled</span>
                      </div>
                      <div className="order-body">
                        <div className="order-items">
                          {order.items.map((item, idx) => (
                            <p key={idx}>{item}</p>
                          ))}
                        </div>
                        <div className="order-meta">
                          <span>💵 ${order.total.toLocaleString()}</span>
                          <span>📅 {order.date}</span>
                          <span>❌ {order.reason}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </main>

        {/* Right Panel */}
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

      {/* ══════════════════════════════════════
          MOBILE HEADER
          ══════════════════════════════════════ */}
      <header className="mobile-header">
        <Link className="nav-logo" href="/">
          <div className="logo-icon">K</div>
          <span className="logo-text">Kinnect</span>
        </Link>
        <div className="nav-right">
          <Link href="/cart" className="nav-icon-btn">
            🛒<span className="badge">3</span>
          </Link>
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

      {/* ══════════════════════════════════════
          MOBILE CONTENT
          ══════════════════════════════════════ */}
      <div className="mobile-content">
        <div className="mobile-orders-page">
          <div className="orders-page-header">
            <h1 className="orders-page-title">My Orders</h1>
          </div>

          {/* Tabs */}
          <div className="orders-tabs">
            <button 
              className={`orders-tab ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Active
            </button>
            <button 
              className={`orders-tab ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
            <button 
              className={`orders-tab ${activeTab === 'cancelled' ? 'active' : ''}`}
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelled
            </button>
          </div>

          {/* Tab Content - Same as desktop */}
          <div className="orders-content">
            {/* Active Orders */}
            {activeTab === 'active' && (
              <div className="orders-list">
                {activeOrders.length === 0 ? (
                  <div className="orders-empty-state">
                    <div className="empty-icon">📦</div>
                    <h3>You don't have any active orders at this time</h3>
                    <p>When you place an order, it will appear here</p>
                    <Link href="/restaurants" className="btn-primary" style={{ marginTop: '20px' }}>
                      Browse Restaurants
                    </Link>
                  </div>
                ) : (
                  activeOrders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-type">
                          <span className="order-icon">🍔</span>
                          <div>
                            <h3 className="order-title">{order.restaurant}</h3>
                            <p className="order-id">Order {order.orderId}</p>
                          </div>
                        </div>
                        <span className="order-status status-accepted">Accepted</span>
                      </div>
                      <div className="order-body">
                        <div className="order-items">
                          {order.items.map((item, idx) => (
                            <p key={idx}>{item}</p>
                          ))}
                        </div>
                        <div className="order-meta">
                          <span>📍 {order.location}</span>
                          <span>💵 ${order.total.toLocaleString()}</span>
                          <span>⏱️ ETA: {order.eta}</span>
                        </div>
                      </div>
                      <div className="order-actions">
                        <button className="order-btn-secondary">Track Order</button>
                        <button className="order-btn-danger">Cancel Order</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Completed Orders */}
            {activeTab === 'completed' && (
              <div className="orders-list">
                {completedOrders.length === 0 ? (
                  <div className="orders-empty-state">
                    <div className="empty-icon">✅</div>
                    <h3>No completed orders yet</h3>
                    <p>Your completed orders will show up here</p>
                  </div>
                ) : (
                  completedOrders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-type">
                          <span className="order-icon">{order.type === 'food' ? '🍔' : '🚗'}</span>
                          <div>
                            <h3 className="order-title">{order.type === 'food' ? order.restaurant : order.driver}</h3>
                            <p className="order-id">{order.type === 'food' ? `Order ${order.orderId}` : `Ride ${order.rideId}`}</p>
                          </div>
                        </div>
                        <span className="order-status status-completed">Completed</span>
                      </div>
                      <div className="order-body">
                        {order.type === 'food' ? (
                          <>
                            <div className="order-items">
                              {order.items?.map((item, idx) => (
                                <p key={idx}>{item}</p>
                              ))}
                            </div>
                            <div className="order-meta">
                              <span>📍 {order.location}</span>
                              <span>💵 ${order.total.toLocaleString()}</span>
                              <span>📅 {order.date}</span>
                            </div>
                          </>
                        ) : (
                          <div className="order-meta">
                            <span>📍 {order.route}</span>
                            <span>💵 ${order.fare?.toLocaleString()}</span>
                            <span>📅 {order.date}</span>
                          </div>
                        )}
                      </div>
                      <div className="order-actions">
                        <button className="order-btn-primary">Reorder</button>
                        <button className="order-btn-secondary">View Receipt</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Cancelled Orders */}
            {activeTab === 'cancelled' && (
              <div className="orders-list">
                {cancelledOrders.length === 0 ? (
                  <div className="orders-empty-state">
                    <div className="empty-icon">🚫</div>
                    <h3>No cancelled orders</h3>
                    <p>You haven't cancelled any orders</p>
                  </div>
                ) : (
                  cancelledOrders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-type">
                          <span className="order-icon">🍔</span>
                          <div>
                            <h3 className="order-title">{order.restaurant}</h3>
                            <p className="order-id">Order {order.orderId}</p>
                          </div>
                        </div>
                        <span className="order-status status-cancelled">Cancelled</span>
                      </div>
                      <div className="order-body">
                        <div className="order-items">
                          {order.items.map((item, idx) => (
                            <p key={idx}>{item}</p>
                          ))}
                        </div>
                        <div className="order-meta">
                          <span>💵 ${order.total.toLocaleString()}</span>
                          <span>📅 {order.date}</span>
                          <span>❌ {order.reason}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="footer-spacer"></div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav">
        <Link href="/">
          <span className="bnav-icon">🏠</span>Home
        </Link>
        <Link href="/activity" className="active">
          <span className="bnav-icon" style={{ position: 'relative' }}>📦<span className="badge">2</span></span>Orders
        </Link>
        <Link href="/rides/book">
          <span className="bnav-icon">🚗</span>Rides
        </Link>
        <Link href="/profile">
          <span className="bnav-icon">👤</span>Account
        </Link>
      </nav>
    </>
  );
}
