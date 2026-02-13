"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("mmg");
  const [deliveryTime, setDeliveryTime] = useState("asap");
  
  const shippingAddress = {
    street: "Blue house opposite school, 2nd bridge",
    area: "Georgetown",
    phone: "+592-XXX-XXXX"
  };

  const orderSummary = {
    subtotal: 3900,
    taxAndFees: 195,
    deliveryCost: 500,
    total: 4595
  };

  const handlePayNow = () => {
    router.push("/checkout/confirmed");
  };

  return (
    <>
      <header className="mobile-header">
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
          ←
        </button>
        <h1 style={{ fontSize: '16px', fontWeight: 800 }}>Payment</h1>
        <div style={{ width: '40px' }}></div>
      </header>

      <div className="mobile-content">
        <div className="payment-page">
          {/* Shipping Address (Read-only with edit) */}
          <div className="checkout-section">
            <div className="checkout-section-header">
              <h2>Shipping Address</h2>
              <button 
                className="checkout-edit-btn"
                onClick={() => router.back()}
              >
                ✏️ Edit
              </button>
            </div>
            <div className="checkout-address-display">
              <p className="checkout-address-street">{shippingAddress.street}</p>
              <p className="checkout-address-area">📍 {shippingAddress.area}</p>
              <p className="checkout-address-phone">📞 {shippingAddress.phone}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="checkout-section">
            <div className="checkout-section-header">
              <h2>Payment Method</h2>
              <button className="checkout-edit-btn">✏️ Edit</button>
            </div>
            
            <div className="payment-methods-list">
              <div 
                className={`payment-method-option ${paymentMethod === 'mmg' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('mmg')}
              >
                <div className="payment-method-radio">
                  {paymentMethod === 'mmg' && <div className="radio-dot"></div>}
                </div>
                <div className="payment-method-info">
                  <h4>💳 MMG Mobile Money</h4>
                  <p>Fast and secure</p>
                </div>
              </div>

              <div 
                className={`payment-method-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="payment-method-radio">
                  {paymentMethod === 'card' && <div className="radio-dot"></div>}
                </div>
                <div className="payment-method-info">
                  <h4>💳 Card •••• 4242</h4>
                  <p>Visa ending in 4242</p>
                </div>
              </div>

              <div 
                className={`payment-method-option ${paymentMethod === 'cash' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('cash')}
              >
                <div className="payment-method-radio">
                  {paymentMethod === 'cash' && <div className="radio-dot"></div>}
                </div>
                <div className="payment-method-info">
                  <h4>💵 Cash on Delivery</h4>
                  <p>Pay when you receive</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Time */}
          <div className="checkout-section">
            <div className="checkout-section-header">
              <h2>Delivery Time</h2>
            </div>
            
            <div className="delivery-time-options">
              <div 
                className={`delivery-time-option ${deliveryTime === 'asap' ? 'selected' : ''}`}
                onClick={() => setDeliveryTime('asap')}
              >
                <div className="delivery-time-radio">
                  {deliveryTime === 'asap' && <div className="radio-dot"></div>}
                </div>
                <div>
                  <h4>ASAP</h4>
                  <p>30-45 minutes</p>
                </div>
              </div>

              <div 
                className={`delivery-time-option ${deliveryTime === 'scheduled' ? 'selected' : ''}`}
                onClick={() => setDeliveryTime('scheduled')}
              >
                <div className="delivery-time-radio">
                  {deliveryTime === 'scheduled' && <div className="radio-dot"></div>}
                </div>
                <div>
                  <h4>Schedule for Later</h4>
                  <p>Choose your time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="checkout-section">
            <div className="checkout-section-header">
              <h2>Order Summary</h2>
              <button 
                className="checkout-edit-btn"
                onClick={() => router.back()}
              >
                ✏️ Edit
              </button>
            </div>
            
            <div className="checkout-totals">
              <div className="checkout-total-row">
                <span>Subtotal</span>
                <span>${orderSummary.subtotal.toLocaleString()}</span>
              </div>
              <div className="checkout-total-row">
                <span>Tax & Fees</span>
                <span>${orderSummary.taxAndFees.toLocaleString()}</span>
              </div>
              <div className="checkout-total-row">
                <span>Delivery Cost</span>
                <span>${orderSummary.deliveryCost.toLocaleString()}</span>
              </div>
              <div className="checkout-total-row checkout-total-final">
                <strong>Total</strong>
                <strong>${orderSummary.total.toLocaleString()}</strong>
              </div>
            </div>
          </div>

          {/* Pay Now Button */}
          <button 
            className="checkout-place-order-btn"
            onClick={handlePayNow}
          >
            Pay Now · ${orderSummary.total.toLocaleString()}
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
