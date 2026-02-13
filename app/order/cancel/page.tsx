"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CancelOrderPage() {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [cancelled, setCancelled] = useState(false);

  const cancelReasons = [
    "I ordered by mistake",
    "Delivery time is too long",
    "I want to change my order",
    "Found a better price elsewhere",
    "Changed my mind",
    "Other"
  ];

  const handleSubmit = () => {
    if (!selectedReason) {
      alert("Please select a reason");
      return;
    }
    if (selectedReason === "Other" && !otherReason.trim()) {
      alert("Please provide a reason");
      return;
    }
    setCancelled(true);
  };

  if (cancelled) {
    return (
      <>
        <div className="mobile-content" style={{ paddingTop: '0' }}>
          <div className="cancel-confirmed-page">
            <div className="cancel-confirmed-icon">✓</div>
            <h1>Order Cancelled!</h1>
            <p>Your order has been successfully cancelled</p>
            <div className="cancel-support-section">
              <p>If you have any questions, reach out directly to our customer support.</p>
              <Link href="/contact" className="cancel-contact-btn">
                Contact Support
              </Link>
              <Link href="/home" className="cancel-home-btn">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <header className="mobile-header">
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
          ←
        </button>
        <h1 style={{ fontSize: '16px', fontWeight: 800 }}>Cancel Order</h1>
        <div style={{ width: '40px' }}></div>
      </header>

      <div className="mobile-content">
        <div className="cancel-order-page">
          <div className="cancel-order-header">
            <h2>Why do you want to cancel your order?</h2>
            <p>This helps us improve our service</p>
          </div>

          <div className="cancel-reasons-list">
            {cancelReasons.map(reason => (
              <div
                key={reason}
                className={`cancel-reason-option ${selectedReason === reason ? 'selected' : ''}`}
                onClick={() => setSelectedReason(reason)}
              >
                <div className="cancel-reason-radio">
                  {selectedReason === reason && <div className="radio-dot"></div>}
                </div>
                <span>{reason}</span>
              </div>
            ))}
          </div>

          {selectedReason === "Other" && (
            <div className="cancel-other-reason">
              <textarea
                className="cancel-reason-textarea"
                placeholder="Please tell us why..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                rows={4}
              />
            </div>
          )}

          <button 
            className="cancel-submit-btn"
            onClick={handleSubmit}
          >
            Submit Cancellation
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
