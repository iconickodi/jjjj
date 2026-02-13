"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RestaurantsPage() {
  const router = useRouter();
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const featuredDishes = [
    {
      id: 1,
      name: "Grilled Jerk Chicken",
      restaurant: "Caribbean Kitchen",
      restaurantId: 1,
      location: "Georgetown",
      price: 2500,
      image: "🍗",
      description: "Spicy jerk seasoning with rice and peas"
    },
    {
      id: 2,
      name: "Roast Beef Special",
      restaurant: "The Grill House",
      restaurantId: 2,
      location: "Linden",
      price: 3200,
      image: "🥩",
      description: "Tender roast beef with mashed potatoes"
    },
    {
      id: 3,
      name: "Seafood Platter",
      restaurant: "Ocean Breeze",
      restaurantId: 3,
      location: "Georgetown",
      price: 4500,
      image: "🦐",
      description: "Fresh catch of the day with sides"
    }
  ];

  const restaurants = [
    { id: 1, name: "Caribbean Kitchen", rating: 4.8, cuisine: "Local, Caribbean", hours: "10:00 AM - 9:00 PM", status: "Open", image: "🍛" },
    { id: 2, name: "The Grill House", rating: 4.7, cuisine: "Grilled, Steakhouse", hours: "11:00 AM - 10:00 PM", status: "Open", image: "🥩" },
    { id: 3, name: "Ocean Breeze", rating: 4.6, cuisine: "Seafood, Fish", hours: "12:00 PM - 11:00 PM", status: "Open", image: "🦐" },
    { id: 4, name: "Tasty Bites", rating: 4.5, cuisine: "Fast Food, Burgers", hours: "9:00 AM - 10:00 PM", status: "Open", image: "🍔" },
    { id: 5, name: "Golden Wok", rating: 4.9, cuisine: "Chinese, Asian", hours: "11:00 AM - 11:00 PM", status: "Open", image: "🥡" },
    { id: 6, name: "Pizza Palace", rating: 4.4, cuisine: "Italian, Pizza", hours: "Opens at 5:00 PM", status: "Closed", image: "🍕" }
  ];

  useEffect(() => {
    const storedUsername = localStorage.getItem("kinnectUsername");
    const storedIsLoggedIn = localStorage.getItem("kinnectIsLoggedIn");
    if (storedUsername && storedIsLoggedIn === "true") {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }

    // Auto-rotate featured dishes
    const interval = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % featuredDishes.length);
    }, 5000);
    return () => clearInterval(interval);
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

  const currentDish = featuredDishes[featuredIndex];

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
          {/* Featured Dish Carousel */}
          <div className="featured-carousel" onClick={() => router.push(`/restaurant/${currentDish.restaurantId}`)}>
            <div className="featured-dish-icon">{currentDish.image}</div>
            <div className="featured-dish-info">
              <div className="featured-location">📍 {currentDish.location}</div>
              <h2 className="featured-dish-name">{currentDish.name}</h2>
              <p className="featured-dish-desc">{currentDish.description}</p>
              <div className="featured-dish-meta">
                <span className="featured-restaurant">{currentDish.restaurant}</span>
                <span className="featured-price">${currentDish.price.toLocaleString()}</span>
              </div>
            </div>
            <div className="featured-indicators">
              {featuredDishes.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`featured-dot ${idx === featuredIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFeaturedIndex(idx);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="rest-categories">
            <button 
              className={`rest-cat-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            <button 
              className={`rest-cat-btn ${activeCategory === 'meals' ? 'active' : ''}`}
              onClick={() => setActiveCategory('meals')}
            >
              Meals
            </button>
            <button 
              className={`rest-cat-btn ${activeCategory === 'fastfood' ? 'active' : ''}`}
              onClick={() => setActiveCategory('fastfood')}
            >
              Fast Food
            </button>
            <button 
              className={`rest-cat-btn ${activeCategory === 'drinks' ? 'active' : ''}`}
              onClick={() => setActiveCategory('drinks')}
            >
              Drinks
            </button>
          </div>

          {/* Restaurants Grid */}
          <div className="rest-grid">
            {restaurants.map(rest => (
              <Link key={rest.id} href={`/restaurant/${rest.id}`} className="rest-grid-card">
                <div className="rest-grid-image">{rest.image}</div>
                <div className="rest-grid-status" style={{ 
                  background: rest.status === 'Open' ? '#E8F5E9' : '#FFEBEE',
                  color: rest.status === 'Open' ? '#388E3C' : '#D32F2F'
                }}>
                  {rest.status}
                </div>
                <div className="rest-grid-info">
                  <h3>{rest.name}</h3>
                  <div className="rest-grid-rating">
                    <span>⭐ {rest.rating}</span>
                    <span>{rest.cuisine}</span>
                  </div>
                  <p className="rest-grid-hours">{rest.hours}</p>
                </div>
              </Link>
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
        {/* Featured Carousel */}
        <div className="featured-carousel" onClick={() => router.push(`/restaurant/${currentDish.restaurantId}`)}>
          <div className="featured-dish-icon">{currentDish.image}</div>
          <div className="featured-dish-info">
            <div className="featured-location">📍 {currentDish.location}</div>
            <h2 className="featured-dish-name">{currentDish.name}</h2>
            <p className="featured-dish-desc">{currentDish.description}</p>
            <div className="featured-dish-meta">
              <span className="featured-restaurant">{currentDish.restaurant}</span>
              <span className="featured-price">${currentDish.price.toLocaleString()}</span>
            </div>
          </div>
          <div className="featured-indicators">
            {featuredDishes.map((_, idx) => (
              <div 
                key={idx} 
                className={`featured-dot ${idx === featuredIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setFeaturedIndex(idx);
                }}
              />
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="rest-categories">
          <button 
            className={`rest-cat-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          <button 
            className={`rest-cat-btn ${activeCategory === 'meals' ? 'active' : ''}`}
            onClick={() => setActiveCategory('meals')}
          >
            Meals
          </button>
          <button 
            className={`rest-cat-btn ${activeCategory === 'fastfood' ? 'active' : ''}`}
            onClick={() => setActiveCategory('fastfood')}
          >
            Fast Food
          </button>
          <button 
            className={`rest-cat-btn ${activeCategory === 'drinks' ? 'active' : ''}`}
            onClick={() => setActiveCategory('drinks')}
          >
            Drinks
          </button>
        </div>

        {/* Restaurants Grid */}
        <div className="rest-grid">
          {restaurants.map(rest => (
            <Link key={rest.id} href={`/restaurant/${rest.id}`} className="rest-grid-card">
              <div className="rest-grid-image">{rest.image}</div>
              <div className="rest-grid-status" style={{ 
                background: rest.status === 'Open' ? '#E8F5E9' : '#FFEBEE',
                color: rest.status === 'Open' ? '#388E3C' : '#D32F2F'
              }}>
                {rest.status}
              </div>
              <div className="rest-grid-info">
                <h3>{rest.name}</h3>
                <div className="rest-grid-rating">
                  <span>⭐ {rest.rating}</span>
                  <span>{rest.cuisine}</span>
                </div>
                <p className="rest-grid-hours">{rest.hours}</p>
              </div>
            </Link>
          ))}
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
