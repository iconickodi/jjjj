"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CartDrawer() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'BBQ Wings', price: 1200, quantity: 2 },
    { id: 2, name: 'Classic Burger', price: 1500, quantity: 1 },
  ]);
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const deliveryFee = 500;
  const total = subtotal + tax + deliveryFee;

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item)
        .filter(item => item.quantity > 0)
    );
  };

  const handlePlaceOrder = () => {
    if (!deliveryLocation || !contactNumber) {
      alert('Please fill in delivery location and contact number');
      return;
    }
    setShowConfirmation(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => router.back(), 300);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        onClick={handleClose}
      ></div>

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="cart-drawer-header">
          <h2>Your Cart</h2>
          <button className="cart-close-btn" onClick={handleClose}>✕</button>
        </div>

        {/* Content */}
        <div className="cart-drawer-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Want to add something?</p>
              <Link href="/restaurants" className="cart-add-btn">
                + Add Items
              </Link>
            </div>
          ) : (
            <>
              {/* Restaurant Name */}
              <div className="cart-restaurant-name">
                <h3>Tasty Bites</h3>
                <button 
                  className="cart-clear-btn"
                  onClick={() => setCartItems([])}
                >
                  Clear Cart
                </button>
              </div>

              {/* Items */}
              <div className="cart-items-list">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item-row">
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>${item.price.toLocaleString()}</p>
                    </div>
                    <div className="cart-item-controls">
                      <button 
                        className="cart-qty-btn"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        −
                      </button>
                      <span className="cart-qty">{item.quantity}</span>
                      <button 
                        className="cart-qty-btn"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="cart-summary">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Tax & Fees</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Delivery Cost</span>
                  <span>${deliveryFee.toLocaleString()}</span>
                </div>
                <div className="cart-summary-row cart-total">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="cart-delivery-section">
                <h3>Delivery Details</h3>
                <div className="cart-form-group">
                  <label>Delivery Location</label>
                  <input
                    type="text"
                    className="cart-input"
                    placeholder="Enter delivery address"
                    value={deliveryLocation}
                    onChange={e => setDeliveryLocation(e.target.value)}
                  />
                </div>
                <div className="cart-form-group">
                  <label>Contact Number</label>
                  <input
                    type="tel"
                    className="cart-input"
                    placeholder="592-XXX-XXXX"
                    value={contactNumber}
                    onChange={e => setContactNumber(e.target.value)}
                  />
                </div>
                <div className="cart-form-group">
                  <label>Notes (Optional)</label>
                  <textarea
                    className="cart-textarea"
                    placeholder="Special instructions..."
                    value={orderNotes}
                    onChange={e => setOrderNotes(e.target.value)}
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="cart-payment-section">
                <h3>Payment Method</h3>
                <div className="cart-payment-options">
                  <label className="cart-payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                    />
                    <span>💵 Cash on Delivery</span>
                  </label>
                  <label className="cart-payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="mmg"
                      checked={paymentMethod === 'mmg'}
                      onChange={() => setPaymentMethod('mmg')}
                    />
                    <span>💳 MMG Mobile Money</span>
                  </label>
                  <label className="cart-payment-option cart-payment-disabled">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      disabled
                    />
                    <span>💳 Card (Coming Soon)</span>
                  </label>
                </div>
              </div>

              {/* Place Order Button */}
              <button 
                className="cart-checkout-btn"
                onClick={handlePlaceOrder}
              >
                Place Order · ${total.toLocaleString()}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="cart-confirmation-overlay">
          <div className="cart-confirmation-modal">
            <div className="cart-success-icon">✓</div>
            <h2>Order Placed!</h2>
            <p>Your order has been sent to the restaurant</p>
            <p className="cart-order-id">Order #12345</p>
            <div className="cart-confirmation-actions">
              <Link href="/activity" className="cart-track-btn">
                Track Order
              </Link>
              <button 
                className="cart-home-btn"
                onClick={() => router.push('/')}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
