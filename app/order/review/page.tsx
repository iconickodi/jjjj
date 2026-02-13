"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ReviewOrderPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      router.push("/activity");
    }, 2000);
  };

  if (submitted) {
    return (
      <>
        <div className="mobile-content" style={{ paddingTop: '0' }}>
          <div className="review-submitted-page">
            <div className="review-submitted-icon">✓</div>
            <h1>Review Submitted!</h1>
            <p>Thank you for your feedback</p>
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
        <h1 style={{ fontSize: '16px', fontWeight: 800 }}>Leave a Review</h1>
        <div style={{ width: '40px' }}></div>
      </header>

      <div className="mobile-content">
        <div className="review-order-page">
          <div className="review-order-header">
            <div className="review-order-dish">🍔</div>
            <h2>Classic Burger</h2>
            <p>We'd love to know what you think of this dish</p>
          </div>

          <div className="review-rating-section">
            <h3>Your Rating</h3>
            <div className="review-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  className={`review-star ${rating >= star ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="review-comment-section">
            <h3>Leave a Comment (Optional)</h3>
            <textarea
              className="review-comment-textarea"
              placeholder="Tell us about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={6}
            />
          </div>

          <div className="review-actions">
            <button 
              className="review-cancel-btn"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button 
              className="review-submit-btn"
              onClick={handleSubmit}
            >
              Submit Review
            </button>
          </div>
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
