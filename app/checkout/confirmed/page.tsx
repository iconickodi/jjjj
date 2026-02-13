"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrderConfirmedPage() {
  const router = useRouter();
  
  const estimatedDelivery = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 40);
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const todayDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <>
      <div className="mobile-content" style={{ paddingTop: '0' }}>
        <div className="order-confirmed-page">
          <div className="order-confirmed-icon">
            <div className="success-checkmark">✓</div>
          </div>
          
          <h1 className="order-confirmed-title">Order Confirmed!</h1>
          <p className="order-confirmed-subtitle">
            Your order has been placed successfully
          </p>

          <div className="order-confirmed-details">
            <div className="order-confirmed-detail-row">
              <span className="detail-label">Order Number</span>
              <span className="detail-value">#KN{Math.floor(Math.random() * 100000)}</span>
            </div>
            <div className="order-confirmed-detail-row">
              <span className="detail-label">Estimated Delivery</span>
              <span className="detail-value">{estimatedDelivery()}</span>
            </div>
            <div className="order-confirmed-detail-row">
              <span className="detail-label">Delivery Date</span>
              <span className="detail-value">{todayDate}</span>
            </div>
          </div>

          <div className="order-confirmed-actions">
            <Link href="/activity" className="order-confirmed-btn-primary">
              Track My Order
            </Link>
            <Link href="/home" className="order-confirmed-btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
