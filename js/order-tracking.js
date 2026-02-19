// ============ js/order-tracking.js ============
// ============ FIXED: HANDLES NULL ORDERS PROPERLY ============

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // Get order ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  let orderId = urlParams.get('orderId');
  
  // Display order ID
  document.getElementById('orderIdSpan').textContent = orderId || 'Not Found';
  
  // ============ TRY TO LOAD ORDER DATA ============
  let orderData = null;
  
  // Method 1: Get from 'lastOrder' (most recent order)
  const lastOrder = localStorage.getItem('lastOrder');
  if (lastOrder) {
    try {
      const parsed = JSON.parse(lastOrder);
      if (!orderId || parsed.orderId === orderId) {
        orderData = parsed;
      }
    } catch (e) {}
  }
  
  // Method 2: Get from 'allOrders' list
  if (!orderData && orderId) {
    const allOrders = localStorage.getItem('allOrders');
    if (allOrders) {
      try {
        const orders = JSON.parse(allOrders);
        orderData = orders.find(o => o.orderId === orderId);
      } catch (e) {}
    }
  }
  
  // Method 3: Create sample order for demo if nothing found
  if (!orderData) {
    orderData = createSampleOrder(orderId);
  }
  
  // Display order date
  const orderDate = new Date(orderData.orderTime);
  document.getElementById('orderDate').textContent = `Ordered on: ${formatDate(orderDate)} at ${formatTime(orderDate)}`;
  
  // Display address
  displayAddress(orderData.address);
  
  // Initialize tracking
  initTracking(orderData, orderDate);
});

// ============ CREATE SAMPLE ORDER ============
function createSampleOrder(orderId) {
  const now = new Date();
  
  return {
    orderId: orderId || 'DG' + Date.now().toString().slice(-8),
    orderTime: now.toISOString(),
    items: [
      { name: "Classic Cotton T-Shirt", quantity: 2, price: 499, icon: "fa-tshirt", size: "L", color: "Black" },
      { name: "Slim Fit Jeans", quantity: 1, price: 1299, icon: "fa-tshirt", size: "32", color: "Blue" },
      { name: "Running Shoes", quantity: 1, price: 1999, icon: "fa-shoe-prints", size: "9", color: "White" }
    ],
    subtotal: 4296,
    shipping: 0,
    total: 4296,
    address: {
      fullName: "Rahul Sharma",
      address: "123, Fashion Street, Andheri East",
      city: "Mumbai",
      pincode: "400093",
      phone: "9876543210",
      email: "rahul@email.com"
    },
    paymentMethod: "Razorpay"
  };
}

// ============ DISPLAY ADDRESS ============
function displayAddress(address) {
  const addressBox = document.getElementById('addressBox');
  if (!address) {
    addressBox.innerHTML = '<p>Address not available</p>';
    return;
  }
  addressBox.innerHTML = `
    <h4 style="margin-bottom: 0.8rem; color: #0a3529;">📦 Delivery Address</h4>
    <p><strong>${address.fullName || 'N/A'}</strong></p>
    <p>${address.address || ''}, ${address.city || ''}</p>
    <p>${address.pincode || ''} | Phone: ${address.phone || ''}</p>
  `;
}

// ============ INIT TRACKING ============
function initTracking(orderData, orderDate) {
  const orderTime = orderDate.getTime();
  const trackingContainer = document.getElementById('trackingContainer');
  
  // Status timeline
  const timeline = {
    confirmed: orderTime,
    shipped: orderTime + (2 * 24 * 60 * 60 * 1000),
    outForDelivery: orderTime + (5 * 24 * 60 * 60 * 1000),
    delivered: orderTime + (6 * 24 * 60 * 60 * 1000)
  };
  
  function getCurrentStatus(now) {
    if (now >= timeline.delivered) return 'delivered';
    if (now >= timeline.outForDelivery) return 'outForDelivery';
    if (now >= timeline.shipped) return 'shipped';
    return 'confirmed';
  }
  
  function updateDisplay() {
    const now = new Date().getTime();
    const currentStatus = getCurrentStatus(now);
    const progress = getProgressPercentage(currentStatus);
    
    trackingContainer.innerHTML = renderTrackingUI(
      orderData, 
      currentStatus, 
      timeline, 
      progress
    );
    
    updateStatusTime(currentStatus, timeline);
  }
  
  updateDisplay();
  setInterval(updateDisplay, 60000);
}

// ============ HELPER FUNCTIONS ============
function getProgressPercentage(status) {
  const percentages = { 'confirmed': 25, 'shipped': 50, 'outForDelivery': 80, 'delivered': 100 };
  return percentages[status] || 25;
}

function isStepCompleted(step, currentStatus) {
  const order = ['confirmed', 'shipped', 'outForDelivery', 'delivered'];
  return order.indexOf(step) < order.indexOf(currentStatus);
}

function renderTrackingUI(orderData, currentStatus, timeline, progress) {
  const statusMessages = {
    confirmed: { title: "Order Confirmed", message: "Your order has been confirmed.", icon: "fa-check-circle" },
    shipped: { title: "Order Shipped", message: "Your order has been shipped.", icon: "fa-shipping-fast" },
    outForDelivery: { title: "Out for Delivery", message: "Your order is out for delivery.", icon: "fa-truck" },
    delivered: { title: "Delivered", message: "Your order has been delivered.", icon: "fa-check-double" }
  };
  
  const status = statusMessages[currentStatus];
  
  return `
    <div class="progress-container">
      <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${progress}%"></div></div>
      <div class="progress-steps">
        ${['confirmed', 'shipped', 'outForDelivery', 'delivered'].map(step => `
          <div class="step ${currentStatus === step ? 'active' : (isStepCompleted(step, currentStatus) ? 'completed' : '')}">
            <div class="step-icon"><i class="fas ${step === 'confirmed' ? 'fa-check' : step === 'shipped' ? 'fa-box' : step === 'outForDelivery' ? 'fa-truck' : 'fa-home'}"></i></div>
            <div class="step-label">${step.charAt(0).toUpperCase() + step.slice(1)}</div>
            <div class="step-date">${formatDate(new Date(timeline[step]))}</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="status-card">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <i class="fas ${status.icon}" style="font-size: 2rem; color: #1e7b4c;"></i>
        <div>
          <div class="status-title">${status.title}</div>
          <div class="status-time" id="statusTime"></div>
        </div>
      </div>
      <p class="status-message">${status.message}</p>
    </div>
    
    <div class="order-details-grid">
      <div class="detail-item"><span class="detail-label">Order Total</span><span class="detail-value">₹${orderData.total || 0}</span></div>
      <div class="detail-item"><span class="detail-label">Payment</span><span class="detail-value">${orderData.paymentMethod || 'N/A'}</span></div>
      <div class="detail-item"><span class="detail-label">Items</span><span class="detail-value">${orderData.items?.length || 0}</span></div>
      <div class="detail-item"><span class="detail-label">Est. Delivery</span><span class="detail-value">${formatDate(new Date(timeline.delivered))}</span></div>
    </div>
    
    <div class="tracking-products">
      <h4 style="margin-bottom: 1rem;">Items in this order</h4>
      ${(orderData.items || []).map(item => `
        <div class="tracking-product-item">
          <div class="product-thumb"><i class="fas ${item.icon || 'fa-tshirt'}"></i></div>
          <div class="product-info">
            <h4>${item.name}</h4>
            <p>Qty: ${item.quantity} | Size: ${item.size || 'M'} | Color: ${item.color || 'Black'}</p>
          </div>
          <div class="product-price">₹${item.price * item.quantity}</div>
        </div>
      `).join('')}
    </div>
    
    <div class="timeline">
      <h4 style="margin-bottom: 1rem;">Order Timeline</h4>
      <div class="timeline-item">
        <div class="timeline-icon"><i class="fas fa-check"></i></div>
        <div class="timeline-content">
          <div class="timeline-title">Order Confirmed</div>
          <div class="timeline-time">${formatDate(new Date(timeline.confirmed))} at ${formatTime(new Date(timeline.confirmed))}</div>
        </div>
      </div>
      ${currentStatus !== 'confirmed' ? `
      <div class="timeline-item">
        <div class="timeline-icon"><i class="fas fa-box"></i></div>
        <div class="timeline-content">
          <div class="timeline-title">Order Shipped</div>
          <div class="timeline-time">${formatDate(new Date(timeline.shipped))} at ${formatTime(new Date(timeline.shipped))}</div>
        </div>
      </div>
      ` : ''}
    </div>
  `;
}

function updateStatusTime(currentStatus, timeline) {
  const el = document.getElementById('statusTime');
  if (!el) return;
  
  const now = new Date().getTime();
  const nextStatuses = {
    'confirmed': { name: 'Shipped', time: timeline.shipped },
    'shipped': { name: 'Out for Delivery', time: timeline.outForDelivery },
    'outForDelivery': { name: 'Delivered', time: timeline.delivered }
  };
  
  if (nextStatuses[currentStatus]) {
    const next = nextStatuses[currentStatus];
    const diffTime = next.time - now;
    if (diffTime > 0) {
      const diffDays = Math.floor(diffTime / (24 * 60 * 60 * 1000));
      el.innerHTML = `⏳ Next: ${next.name} in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    }
  } else if (currentStatus === 'delivered') {
    el.innerHTML = '✅ Delivered';
  }
}

function formatDate(date) {
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatTime(date) {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}