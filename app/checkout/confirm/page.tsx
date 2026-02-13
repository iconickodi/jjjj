"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ConfirmOrderPage() {
  const router = useRouter();
  const [items, setItems] = useState([
    { id: 1, name: "BBQ Wings", price: 1200, quantity: 2, image: "🍗" },
    { id: 2, name: "Classic Burger", price: 1500, quantity: 1, image: "🍔" }
  ]);
  
  const [shippingAddress, setShippingAddress] = useState({
    street: "Blue house opposite school, 2nd bridge",
    area: "Georgetown",
    phone: "+592-XXX-XXXX"
  });

  const [showEditAddress, setShowEditAddress] = useState(false);

  const updateQuantity = (id: number, change: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxAndFees = subtotal * 0.05;
  const deliveryCost = 500;
  const total = subtotal + taxAndFees + deliveryCost;

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    router.push("/checkout/payment");
  };

  return (
    <>
      <header className="mobile-header">
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
          ←
        </button>
        <h1 style={{ fontSize: '16px', fontWeight: 800 }}>Confirm Order</h1>
        <div style={{ width: '40px' }}></div>
      </header>

      <div className="mobile-content">
        <div className="confirm-order-page">
          {/* Shipping Address */}
          <div className="checkout-section">
            <div className="checkout-section-header">
              <h2>Shipping Address</h2>
              <button 
                className="checkout-edit-btn"
                onClick={() => setShowEditAddress(!showEditAddress)}
              >
                ✏️ Edit
              </button>
            </div>
            {!showEditAddress ? (
              <div className="checkout-address-display">
                <p className="checkout-address-street">{shippingAddress.street}</p>
                <p className="checkout-address-area">📍 {shippingAddress.area}</p>
                <p className="checkout-address-phone">📞 {shippingAddress.phone}</p>
              </div>
            ) : (
              <div className="checkout-address-edit">
                <input
                  type="text"
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                  className="checkout-input"
                  placeholder="Street address"
                />
                <input
                  type="text"
                  value={shippingAddress.area}
                  onChange={(e) => setShippingAddress({...shippingAddress, area: e.target.value})}
                  className="checkout-input"
                  placeholder="Area"
                />
                <input
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                  className="checkout-input"
                  placeholder="Phone number"
                />
                <button 
                  className="checkout-save-btn"
                  onClick={() => setShowEditAddress(false)}
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="checkout-section">
            <div className="checkout-section-header">
              <h2>Order Summary</h2>
            </div>
            
            {items.length === 0 ? (
              <div className="checkout-empty">
                <p>Your cart is empty</p>
                <Link href="/restaurants" className="checkout-browse-btn">
                  Browse Restaurants
                </Link>
              </div>
            ) : (
              <div className="checkout-items-list">
                {items.map(item => (
                  <div key={item.id} className="checkout-item">
                    <div className="checkout-item-image">{item.image}</div>
                    <div className="checkout-item-details">
                      <h4>{item.name}</h4>
                      <p className="checkout-item-price">${item.price.toLocaleString()}</p>
                    </div>
                    <div className="checkout-item-controls">
                      <div className="checkout-quantity-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                      <button 
                        className="checkout-remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add More Items */}
            <Link href="/restaurants" className="checkout-add-more-btn">
              + Add More Items
            </Link>
          </div>

          {/* Order Total */}
          <div className="checkout-section">
            <div className="checkout-totals">
              <div className="checkout-total-row">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="checkout-total-row">
                <span>Tax & Fees</span>
                <span>${Math.round(taxAndFees).toLocaleString()}</span>
              </div>
              <div className="checkout-total-row">
                <span>Delivery Cost</span>
                <span>${deliveryCost.toLocaleString()}</span>
              </div>
              <div className="checkout-total-row checkout-total-final">
                <strong>Total</strong>
                <strong>${Math.round(total).toLocaleString()}</strong>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button 
            className="checkout-place-order-btn"
            onClick={handlePlaceOrder}
            disabled={items.length === 0}
          >
            Place Order · ${Math.round(total).toLocaleString()}
          </button>
        </div>
        <div className="footer-spacer"></div>
      </div>

      <nav className="bottom-nav">
        <Link href="/home"><span className="bnav-icon">🏠</span>Home</Link>
        <Link href="/activity"><span className="bnav-icon">📦</span>Orders</Link>
        <Link href="/rides/book"><span className="bnav-icon">🚗</span>Rides</Link>
        <Link href="/profile"><span className="bnav-icon">👤</span>Account</Link>
      </nav>
    </>
  );
}
