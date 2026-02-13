"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface MenuItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

export default function RestaurantDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sortBy, setSortBy] = useState("popular");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const restaurant = {
    id: params.id,
    name: "Tasty Bites",
    rating: 4.5,
    reviews: 230,
    cuisine: "Fast Food, Burgers",
    hours: "9:00 AM - 10:00 PM",
    status: "Open"
  };

  const menuItems: MenuItem[] = [
    { id: 1, name: "Chicken Burger", desc: "Crispy chicken patty with lettuce, tomato & mayo", price: 4800.99, rating: 4.5, image: "🍔", category: "Burgers" },
    { id: 2, name: "BBQ Wings", desc: "6pc crispy wings with BBQ sauce", price: 1200, rating: 4.8, image: "🍗", category: "Wings" },
    { id: 3, name: "Cheese Fries", desc: "Golden fries topped with melted cheese", price: 800, rating: 4.3, image: "🍟", category: "Sides" },
    { id: 4, name: "Classic Burger", desc: "Beef patty, cheese, lettuce, tomato, onion", price: 5200, rating: 4.7, image: "🍔", category: "Burgers" },
    { id: 5, name: "Hot Wings", desc: "Spicy buffalo wings with ranch", price: 1300, rating: 4.6, image: "🍗", category: "Wings" },
    { id: 6, name: "Soft Drink", desc: "Choice of Coke, Sprite, or Fanta", price: 300, rating: 4.2, image: "🥤", category: "Drinks" },
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

  const handleAddToCart = () => {
    setCartCount(prev => prev + quantity);
    setSelectedItem(null);
    setQuantity(1);
  };

  const categories = [...new Set(menuItems.map(item => item.category))];

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
          <Link href="/restaurants" className="active">🍴 Food</Link>
        </nav>
        <div className="topbar-right">
          <button className="topbar-icon-btn">🌟</button>
          <Link href="/activity" className="topbar-icon-btn">🔔</Link>
          <Link href="/cart" className="topbar-icon-btn" style={{ position: 'relative' }}>
            🛒<span className="badge">{cartCount}</span>
          </Link>
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
          {/* Restaurant Header */}
          <div className="rest-detail-header">
            <button className="rest-back-btn" onClick={() => router.back()}>← Back</button>
            <div className="rest-detail-info">
              <h1>{restaurant.name}</h1>
              <div className="rest-detail-meta">
                <span>⭐ {restaurant.rating} ({restaurant.reviews}+ reviews)</span>
                <span>•</span>
                <span>{restaurant.cuisine}</span>
                <span>•</span>
                <span className="rest-status-open">{restaurant.status}</span>
              </div>
              <p className="rest-detail-hours">⏰ {restaurant.hours}</p>
            </div>
          </div>

          {/* Menu Controls */}
          <div className="menu-controls">
            <div className="menu-categories-tabs">
              {categories.map(cat => (
                <button key={cat} className="menu-cat-tab active">{cat}</button>
              ))}
            </div>
            <div className="menu-sort">
              <label>Sort by:</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Menu Items */}
          <div className="menu-items-grid">
            {menuItems.map(item => (
              <div key={item.id} className="menu-item-card" onClick={() => setSelectedItem(item)}>
                <div className="menu-item-icon">{item.image}</div>
                <div className="menu-item-details">
                  <div className="menu-item-header">
                    <h3>{item.name}</h3>
                    <span className="menu-item-dot">●</span>
                    <span className="menu-item-rating">⭐ {item.rating}</span>
                  </div>
                  <p className="menu-item-desc">{item.desc}</p>
                  <div className="menu-item-footer">
                    <span className="menu-item-price">${item.price.toLocaleString()}</span>
                    <button className="menu-add-btn" onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}>
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
        <button className="nav-logo" onClick={() => router.back()} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <span style={{ fontSize: '20px' }}>←</span>
        </button>
        <h1 style={{ fontSize: '16px', fontWeight: 800 }}>{restaurant.name}</h1>
        <Link href="/cart" className="nav-icon-btn" style={{ position: 'relative' }}>
          🛒<span className="badge">{cartCount}</span>
        </Link>
      </header>

      {/* Mobile Content */}
      <div className="mobile-content">
        {/* Restaurant Info */}
        <div className="rest-detail-header">
          <div className="rest-detail-info">
            <div className="rest-detail-meta">
              <span>⭐ {restaurant.rating} ({restaurant.reviews}+)</span>
              <span>•</span>
              <span>{restaurant.cuisine}</span>
            </div>
            <p className="rest-detail-hours">⏰ {restaurant.hours}</p>
          </div>
        </div>

        {/* Menu Controls */}
        <div className="menu-controls">
          <div className="menu-categories-tabs">
            {categories.map(cat => (
              <button key={cat} className="menu-cat-tab active">{cat}</button>
            ))}
          </div>
          <div className="menu-sort">
            <label>Sort:</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
              <option value="popular">Popular</option>
              <option value="price-low">Price ↑</option>
              <option value="price-high">Price ↓</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Menu Items */}
        <div className="menu-items-grid">
          {menuItems.map(item => (
            <div key={item.id} className="menu-item-card" onClick={() => setSelectedItem(item)}>
              <div className="menu-item-icon">{item.image}</div>
              <div className="menu-item-details">
                <div className="menu-item-header">
                  <h3>{item.name}</h3>
                  <span className="menu-item-dot">●</span>
                  <span className="menu-item-rating">⭐ {item.rating}</span>
                </div>
                <p className="menu-item-desc">{item.desc}</p>
                <div className="menu-item-footer">
                  <span className="menu-item-price">${item.price.toLocaleString()}</span>
                  <button className="menu-add-btn" onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}>
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="footer-spacer"></div>
      </div>

      {/* Item Modal */}
      {selectedItem && (
        <div className="menu-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="menu-modal-content" onClick={e => e.stopPropagation()}>
            <button className="menu-modal-close" onClick={() => setSelectedItem(null)}>✕</button>
            <div className="menu-modal-icon">{selectedItem.image}</div>
            <h2 className="menu-modal-name">{selectedItem.name}</h2>
            <p className="menu-modal-desc">{selectedItem.desc}</p>
            <div className="menu-modal-rating">⭐ {selectedItem.rating}</div>
            <p className="menu-modal-price">${selectedItem.price.toLocaleString()}</p>
            
            <div className="menu-modal-qty">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button className="menu-modal-add-btn" onClick={handleAddToCart}>
              Add to Cart · ${(selectedItem.price * quantity).toLocaleString()}
            </button>
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
