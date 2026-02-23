// ============ js/main.js ============
// ============ UPDATED: COD ADVANCE ₹100 + RAZORPAY ============

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ---------- MOBILE SIDEBAR ----------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileSidebar = document.getElementById('mobileSidebar');
  const overlay = document.getElementById('overlay');
  const closeSidebar = document.getElementById('closeSidebar');

  function openSidebar() {
    if (mobileSidebar) mobileSidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebarFunc() {
    if (mobileSidebar) mobileSidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openSidebar);
  if (closeSidebar) closeSidebar.addEventListener('click', closeSidebarFunc);
  if (overlay) overlay.addEventListener('click', closeSidebarFunc);

  // ---------- SEARCH FUNCTIONALITY ----------
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const mobileSearchBtn = document.getElementById('mobileSearchBtn');
  const mobileSearchInput = document.getElementById('mobileSearchInput');

  function handleSearch(query) {
    if (query && query.trim()) {
      cart.showToast(`🔍 Searching: ${query}`);
    } else {
      cart.showToast('🔍 Enter search term');
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => handleSearch(searchInput?.value));
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSearch(searchInput.value);
    });
  }

  if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', () => handleSearch(mobileSearchInput?.value));
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSearch(mobileSearchInput.value);
    });
  }

  // ---------- HEADER ICONS ----------
  const wishlistIcon = document.getElementById('wishlistIcon');
  const accountIcon = document.getElementById('accountIcon');
  const cartIcon = document.getElementById('cartIcon');

  if (wishlistIcon) {
    wishlistIcon.addEventListener('click', () => cart.showToast('❤️ Wishlist'));
  }

  if (accountIcon) {
    accountIcon.addEventListener('click', () => cart.showToast('👤 Account'));
  }

  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }

  // ---------- MOBILE NAVIGATION ----------
  const mobileWishlist = document.getElementById('mobileWishlistLink');
  const mobileAccount = document.getElementById('mobileAccountLink');
  const mobileCart = document.getElementById('mobileCartLink');

  if (mobileWishlist) {
    mobileWishlist.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebarFunc();
      cart.showToast('❤️ Wishlist');
    });
  }

  if (mobileAccount) {
    mobileAccount.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebarFunc();
      cart.showToast('👤 Account');
    });
  }

  if (mobileCart) {
    mobileCart.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebarFunc();
      window.location.href = 'cart.html';
    });
  }

  // ---------- BANNER BUTTONS ----------
  const banner1Btn = document.getElementById('banner1Btn');
  const banner3Btn = document.getElementById('banner3Btn');

  if (banner1Btn) {
    banner1Btn.addEventListener('click', () => {
      window.location.href = 'product.html?id=4';
    });
  }

  if (banner3Btn) {
    banner3Btn.addEventListener('click', () => {
      window.location.href = 'product.html?id=5';
    });
  }

  // ---------- PRODUCT PAGE INITIALIZATION ----------
  if (window.location.pathname.includes('product.html')) {
    initProductPage();
  }

  // ---------- CART PAGE INITIALIZATION ----------
  if (window.location.pathname.includes('cart.html')) {
    cart.updateCartDisplay();
  }

  // ---------- CHECKOUT PAGE INITIALIZATION (UPDATED) ----------
  if (window.location.pathname.includes('checkout.html')) {
    initCheckoutPage();
  }

  // ---------- INDEX PAGE INITIALIZATION ----------
  if (window.location.pathname === '/' || 
      window.location.pathname.includes('index.html') || 
      window.location.pathname.endsWith('/')) {
    initIndexPage();
  }

  // ---------- UPDATE CART COUNT ON ALL PAGES ----------
  cart.updateCartCount();
});

// ============ INDEX PAGE FUNCTIONS ============
function initIndexPage() {
  // Render bestsellers grid
  const bestsellersGrid = document.getElementById('bestsellersGrid');
  if (bestsellersGrid) {
    bestsellersGrid.innerHTML = '';
    products.forEach(product => {
      const card = createProductCard(product);
      bestsellersGrid.appendChild(card);
    });
  }

  // Render new arrivals grid (first 5 products)
  const newArrivalsGrid = document.getElementById('newarrivalsGrid');
  if (newArrivalsGrid) {
    newArrivalsGrid.innerHTML = '';
    products.slice(0, 5).forEach(product => {
      const card = createProductCard(product);
      newArrivalsGrid.appendChild(card);
    });
  }

  // Render testimonials
  const testimonialGrid = document.getElementById('testimonialGrid');
  if (testimonialGrid) {
    testimonialGrid.innerHTML = '';
    testimonials.forEach(t => {
      const div = document.createElement('div');
      div.className = 'testimonial-card';
      div.innerHTML = `
        <h4>${t.name}</h4>
        <p>${t.text}</p>
        <span class="customer-location">✔ Verified purchase</span>
      `;
      testimonialGrid.appendChild(div);
    });
  }
}


// ============ INSIDE index.html - UPDATE THE createProductCard FUNCTION ============

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.onclick = () => {
    window.location.href = `product.html?id=${product.id}`;
  };
  
  // Use ONLY the first image for main page
  const firstImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : null;
  
  card.innerHTML = `
    <div class="product-img-placeholder">
      ${firstImage 
        ? `<img src="${firstImage}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover; border-radius:0.9rem;" 
            onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas ${product.icon}\\' style=\\'font-size:2.2rem; color:#43755a;\\'></i>';">` 
        : `<i class="fas ${product.icon}"></i>`
      }
    </div>
    <h3 class="product-title">${product.name}</h3>
    <div class="price-block">
      <span class="regular-price">₹${product.price}</span>
      <span class="compare-price">₹${product.compare}</span>
      <span class="sale-badge">${product.discount}</span>
    </div>
  `;
  
  return card;
}

// ============ PRODUCT PAGE FUNCTIONS ============
// ============ js/main.js - UPDATED PRODUCT PAGE WITH SIZES/COLORS ============

function initProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    window.location.href = 'index.html';
    return;
  }

  document.title = `${product.name} · Daily Fashion`;

  const productContainer = document.querySelector('.product-page-container');
  if (productContainer) {
    // Generate size buttons
    const sizeButtons = product.sizes ? product.sizes.map(size => 
      `<button class="size-btn" onclick="selectSize(this, '${size}')">${size}</button>`
    ).join('') : '<p>One size</p>';

    // Generate color buttons
    const colorButtons = product.colors ? product.colors.map(color => {
      const colorClass = color.toLowerCase().replace(' ', '-');
      return `
        <button class="color-btn color-${colorClass}" onclick="selectColor(this, '${color}')" style="background: ${getColorCode(color)};">
          <span>${color}</span>
        </button>
      `;
    }).join('') : '<p>One color</p>';

    productContainer.innerHTML = `
      <div class="product-gallery">
        ${product.image 
          ? `<img src="${product.image}" alt="${product.name}" style="width:100%; max-height:500px; object-fit:contain;">` 
          : `<i class="fas ${product.icon}" style="font-size: 8rem; color: #2d6b4b;"></i>`
        }
      </div>
      <div class="product-details">
        <span class="product-category">✨ ${product.category}</span>
        <h1 class="product-name">${product.name}</h1>
        <div class="product-rating">
          ${generateStarRating(product.rating)}
          <span style="color: #3a4d45;">(${product.reviews} reviews)</span>
        </div>
        <div class="product-price-box">
          <span class="product-current-price">₹${product.price.toFixed(2)}</span>
          <span class="product-old-price">₹${product.compare}.00</span>
          <span class="product-discount-badge">${product.discount}</span>
        </div>
        <p class="product-description">
          ${product.description}
        </p>
        
        <!-- SIZE SELECTOR -->
        <div style="margin: 1rem 0;">
          <label style="font-weight: 900; color: #0a3529;">Select Size:</label>
          <div class="size-selector" id="sizeSelector">
            ${sizeButtons}
          </div>
        </div>
        
        <!-- COLOR SELECTOR -->
        <div style="margin: 1rem 0;">
          <label style="font-weight: 900; color: #0a3529;">Select Quantity</label>
        </div>
        <!-- QUANTITY -->
        <div class="quantity-selector">
          <button class="quantity-btn" id="decrementQty">-</button>
          <span class="quantity-value" id="quantityValue">1</span>
          <button class="quantity-btn" id="incrementQty">+</button>
        </div>
        
        <div class="product-actions">
          <button class="add-to-cart-btn" id="addToCartBtn">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
          <button class="buy-now-btn" id="buyNowBtn">
            <i class="fas fa-bolt"></i> Buy Now
          </button>
        </div>
        <div style="margin-top:1rem; color:#5d6b65;">
          <i class="fas fa-check-circle" style="color: #1e7b4c;"></i> In stock: ${product.stock} units<br>
          <i class="fas fa-truck"></i> Free delivery · 3-5 business days · Easy returns
        </div>
      </div>
    `;

    // Add event listeners (quantity, add to cart, buy now)
    let quantity = 1;
    const quantityValue = document.getElementById('quantityValue');
    const decrementBtn = document.getElementById('decrementQty');
    const incrementBtn = document.getElementById('incrementQty');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');

    if (decrementBtn) {
      decrementBtn.addEventListener('click', () => {
        if (quantity > 1) {
          quantity--;
          quantityValue.textContent = quantity;
        }
      });
    }

    if (incrementBtn) {
      incrementBtn.addEventListener('click', () => {
        if (quantity < product.stock) {
          quantity++;
          quantityValue.textContent = quantity;
        } else {
          cart.showToast(`⚠️ Only ${product.stock} units available`);
        }
      });
    }

    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        const selectedSize = document.querySelector('.size-btn.selected')?.textContent || 'M';
        const selectedColor = document.querySelector('.color-btn.selected span')?.textContent || 'Default';
        cart.addItem({
          ...product,
          selectedSize,
          selectedColor
        }, quantity);
      });
    }

    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const selectedSize = document.querySelector('.size-btn.selected')?.textContent || 'M';
        const selectedColor = document.querySelector('.color-btn.selected span')?.textContent || 'Default';
        cart.addItem({
          ...product,
          selectedSize,
          selectedColor
        }, quantity);
        cart.showToast(`⚡ Redirecting to checkout...`);
        setTimeout(() => window.location.href = 'checkout.html', 300);
      });
    }
  }
}

// Helper function to get color code
function getColorCode(color) {
  const colors = {
    'black': '#000000',
    'white': '#ffffff',
    'navy': '#000080',
    'gray': '#808080',
    'blue': '#0000ff',
    'pink': '#ffc0cb',
    'maroon': '#800000',
    'red': '#ff0000',
    'yellow': '#ffff00',
    'lavender': '#e6e6fa',
    'light blue': '#add8e6'
  };
  return colors[color.toLowerCase()] || '#cccccc';
}

// Global functions for size/color selection
window.selectSize = function(btn, size) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
};

window.selectColor = function(btn, color) {
  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
};

function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  if (hasHalf) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }
  
  return stars;
}

// ============ CHECKOUT PAGE FUNCTIONS - UPDATED WITH COD ADVANCE ₹100 ============
function initCheckoutPage() {
  // Redirect to cart if cart is empty
  if (cart.cart.length === 0) {
    cart.showToast('🛒 Your cart is empty');
    setTimeout(() => {
      window.location.href = 'cart.html';
    }, 500);
    return;
  }

  const subtotal = cart.getTotal();
  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + shipping;
  const advanceAmount = 100; // ₹100 fixed advance for COD
  const remainingAmount = total; // Full amount payable on delivery

  const checkoutContainer = document.getElementById('checkoutDynamicContent');
  
  // Render checkout page with TWO payment options
  checkoutContainer.innerHTML = `
    <div class="checkout-container">
      <!-- Checkout Form -->
      <div class="checkout-form">
        <h3 style="margin-bottom: 1.5rem; color: #0a3529;">📦 Shipping Information</h3>
        
        <div class="form-group">
          <label>Full Name *</label>
          <input type="text" id="fullName" placeholder="Enter your full name">
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>Email *</label>
            <input type="email" id="email" placeholder="your@email.com">
          </div>
          <div class="form-group">
            <label>Phone *</label>
            <input type="tel" id="phone" placeholder="98765 43210">
          </div>
        </div>
        
        <div class="form-group">
          <label>Address *</label>
          <input type="text" id="address" placeholder="Street address">
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>City *</label>
            <input type="text" id="city" placeholder="Mumbai">
          </div>
          <div class="form-group">
            <label>Pincode *</label>
            <input type="text" id="pincode" placeholder="400001">
          </div>
        </div>
        
        <h3 style="margin: 2rem 0 1rem; color: #0a3529;">💳 Select Payment Method</h3>
        
        <!-- PAYMENT OPTION 1: CASH ON DELIVERY WITH ADVANCE ₹100 -->
        <div class="payment-option" id="codOption">
          <input type="radio" name="payment" id="codRadio" value="cod">
          <div class="payment-details">
            <div style="display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;">
              <span class="payment-title"><i class="fas fa-truck" style="color: #1e7b4c;"></i> Cash on Delivery (COD)</span>
              <span class="payment-badge">Pay ₹100 Advance</span>
            </div>
            <div class="payment-desc">
              Pay ₹100 now via UPI/Card, remaining <strong>₹${total.toFixed(2)}</strong> at delivery
            </div>
          </div>
        </div>
        
        <!-- COD ADVANCE INFO BOX (Shown when COD selected) -->
        <div class="cod-advance-box" id="codAdvanceBox">
          <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.5rem;">
            <i class="fas fa-info-circle" style="color: #c0421e;"></i>
            <span style="font-weight: 700; color: #c0421e;">How COD Advance works:</span>
          </div>
          <p style="margin-bottom: 0.5rem; color: #5d6b65;">You pay a <strong>refundable advance of ₹100</strong> now to confirm your order. The remaining amount <strong>₹${remainingAmount.toFixed(2)}</strong> is paid at delivery.</p>
          <div style="background: #fff; padding: 0.8rem; border-radius: 0.5rem; margin-top: 0.5rem;">
            <span style="font-weight: 600;">Advance: </span>
            <span class="advance-amount">₹100</span>
            <span style="margin-left: 1rem; font-weight: 600;">Pay on Delivery: </span>
            <span style="font-size: 1.2rem; font-weight: 700; color: #0a3529;">₹${remainingAmount.toFixed(2)}</span>
          </div>
          <div class="secure-badge" style="margin-top: 1rem;">
            <i class="fas fa-shield-alt"></i> 100% refundable if order cancelled
          </div>
        </div>
        
        <!-- PAYMENT OPTION 2: RAZORPAY (FULL PAYMENT) -->
        <div class="payment-option" id="razorpayOption">
          <input type="radio" name="payment" id="razorpayRadio" value="razorpay">
          <div class="payment-details">
            <div style="display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;">
              <span class="payment-title"><i class="fas fa-bolt" style="color: #1e7b4c;"></i> Razorpay</span>
              <span class="razorpay-badge">UPI · Cards · NetBanking</span>
            </div>
            <div class="payment-desc">
              Pay full amount <strong>₹${total.toFixed(2)}</strong> now via UPI, Credit/Debit Card, NetBanking
            </div>
            <div class="secure-badge">
              <i class="fas fa-lock"></i> PCI DSS Compliant · Encrypted
            </div>
          </div>
        </div>
        
        <!-- PLACE ORDER BUTTON (Dynamic text based on selection) -->
        <button class="place-order-btn" id="placeOrderBtn">
          <span id="btnText">Select a payment method</span>
        </button>
      </div>
      
      <!-- Order Summary -->
      <div class="order-summary">
        <h3>Your Order</h3>
        <div id="orderItems"></div>
        <div style="border-top: 1px solid #cde0d7; margin: 1rem 0; padding-top: 1rem;">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>Rs. ${subtotal.toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? 'Free' : 'Rs. ' + shipping.toFixed(2)}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>Rs. ${total.toFixed(2)}</span>
          </div>
        </div>
        
        <!-- Accepted Payment Methods -->
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed #cde0d7;">
          <p style="font-size: 0.8rem; color: #5d6b65; margin-bottom: 0.5rem;">Accepted via Razorpay:</p>
          <div style="display: flex; gap: 0.8rem; font-size: 1.5rem; color: #5d6b65;">
            <i class="fab fa-google-pay" title="Google Pay"></i>
            <i class="fab fa-amazon-pay" title="Amazon Pay"></i>
            <i class="fas fa-mobile-alt" title="PhonePe"></i>
            <i class="fab fa-cc-visa" title="Visa"></i>
            <i class="fab fa-cc-mastercard" title="Mastercard"></i>
            <i class="fab fa-cc-rupay" title="RuPay"></i>
          </div>
        </div>
      </div>
    </div>
  `;

  // Render order items
  const orderItemsContainer = document.getElementById('orderItems');
  if (orderItemsContainer) {
    orderItemsContainer.innerHTML = cart.cart.map(item => `
      <div class="order-item">
        <span>${item.name} x ${item.quantity}</span>
        <span>Rs. ${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join('');
  }

  // ============ PAYMENT METHOD SELECTION LOGIC ============
  const codOption = document.getElementById('codOption');
  const razorpayOption = document.getElementById('razorpayOption');
  const codRadio = document.getElementById('codRadio');
  const razorpayRadio = document.getElementById('razorpayRadio');
  const codAdvanceBox = document.getElementById('codAdvanceBox');
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  const btnText = document.getElementById('btnText');

  // Select COD option
  codOption.addEventListener('click', function() {
    codRadio.checked = true;
    razorpayRadio.checked = false;
    codOption.classList.add('selected');
    razorpayOption.classList.remove('selected');
    codAdvanceBox.classList.add('show');
    btnText.innerHTML = `Pay ₹100 Advance via Razorpay`;
  });

  // Select Razorpay option
  razorpayOption.addEventListener('click', function() {
    razorpayRadio.checked = true;
    codRadio.checked = false;
    razorpayOption.classList.add('selected');
    codOption.classList.remove('selected');
    codAdvanceBox.classList.remove('show');
    btnText.innerHTML = `Pay ₹${total.toFixed(2)} via Razorpay`;
  });

  // ============ PLACE ORDER BUTTON LOGIC ============
  placeOrderBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Validate shipping information
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const pincode = document.getElementById('pincode');
    
    if (!fullName?.value || !email?.value || !phone?.value || !address?.value || !city?.value || !pincode?.value) {
      cart.showToast('⚠️ Please fill all shipping fields');
      return;
    }

    // Get selected payment method
    if (codRadio.checked) {
      // ============ COD WITH ₹100 ADVANCE ============
      processCODAdvance(total, advanceAmount);
      
    } else if (razorpayRadio.checked) {
      // ============ RAZORPAY FULL PAYMENT ============
      processRazorpayPayment(total, 'full');
      
    } else {
      cart.showToast('⚠️ Please select a payment method');
    }
  });

  // Initialize default selection (COD selected)
  setTimeout(() => {
    codOption.click();
  }, 100);
}

// ============ PROCESS COD ADVANCE PAYMENT (₹100) ============
function processCODAdvance(totalAmount, advanceAmount) {
  const orderId = 'ORD' + Date.now().toString().slice(-8);
  const subtotal = cart.getTotal();
  const shipping = subtotal > 2000 ? 0 : 99;
  
  // Get customer details
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  
  // Razorpay options for ADVANCE PAYMENT (₹100)
  const options = {
    key: 'rzp_live_SDycj4aMVg262d', // 🔴 REPLACE WITH YOUR ACTUAL RAZORPAY API KEY
    amount: advanceAmount * 100, // Amount in paise (₹100 = 10000 paise)
    currency: 'INR',
    name: 'Daily Gadget',
    description: `COD Advance for Order #${orderId}`,
    image: 'https://dailygadget.in/logo.png',
    order_id: '', // Will be generated by your backend in production
    handler: function(response) {
      // Payment successful
      const paymentId = response.razorpay_payment_id;
      
      // Show success message for COD advance
      const checkoutContainer = document.querySelector('.checkout-container');
      if (checkoutContainer) {
        checkoutContainer.innerHTML = `
          <div class="order-success">
            <i class="fas fa-check-circle"></i>
            <h2>Advance Paid Successfully!</h2>
            <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">₹${advanceAmount} paid via Razorpay</p>
            <p style="color: #1e7b4c; margin-bottom: 1rem;">Payment ID: ${paymentId}</p>
            <div style="background: #e8f3ee; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0; text-align: left;">
              <h3 style="color: #0a3529; margin-bottom: 1rem;">📦 Order Confirmed (COD)</h3>
              <p><strong>Order ID:</strong> #${orderId}</p>
              <p><strong>Advance Paid:</strong> ₹${advanceAmount}</p>
              <p><strong>Pay on Delivery:</strong> ₹${totalAmount.toFixed(2)}</p>
              <p><strong>Total Order Value:</strong> ₹${(advanceAmount + totalAmount).toFixed(2)}</p>
              <p style="margin-top: 1rem;"><i class="fas fa-truck"></i> Your order will be delivered in 3-5 business days</p>
            </div>
            <p style="margin-bottom: 2rem;">Thank you for shopping with Daily Gadget!</p>
            <a href="index.html" class="continue-shopping-btn">Continue Shopping</a>
          </div>
        `;
      }
      
      // Clear cart
      cart.clearCart();
      cart.showToast(`✅ Advance paid! Order confirmed`);
    },
    prefill: {
      name: fullName,
      email: email,
      contact: phone
    },
    notes: {
      order_id: orderId,
      payment_type: 'cod_advance',
      remaining_amount: totalAmount,
      shipping_charge: shipping
    },
    theme: {
      color: '#1e7b4c'
    },
    modal: {
      ondismiss: function() {
        cart.showToast('❌ Payment cancelled');
      }
    }
  };

  // Open Razorpay checkout
  const rzp = new Razorpay(options);
  rzp.open();
}

// ============ PROCESS RAZORPAY FULL PAYMENT ============
function processRazorpayPayment(amount, type) {
  const orderId = 'ORD' + Date.now().toString().slice(-8);
  const subtotal = cart.getTotal();
  const shipping = subtotal > 2000 ? 0 : 99;
  
  // Get customer details
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  
  // Razorpay options for FULL PAYMENT
  const options = {
    key: 'rzp_live_SDycj4aMVg262d', 
    amount: amount * 100, // Amount in paise
    currency: 'INR',
    name: 'Daily Gadget',
    description: `Order #${orderId}`,
    image: 'https://dailygadget.in/logo.png',
    order_id: '', // Will be generated by your backend in production
    handler: function(response) {
      const paymentId = response.razorpay_payment_id;
      
      // Show success message
      const checkoutContainer = document.querySelector('.checkout-container');
      if (checkoutContainer) {
        checkoutContainer.innerHTML = `
          <div class="order-success">
            <i class="fas fa-check-circle"></i>
            <h2>Payment Successful!</h2>
            <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">₹${amount.toFixed(2)} paid via Razorpay</p>
            <p style="color: #1e7b4c; margin-bottom: 1rem;">Payment ID: ${paymentId}</p>
            <div style="background: #e8f3ee; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0; text-align: left;">
              <h3 style="color: #0a3529; margin-bottom: 1rem;">📦 Order Confirmed</h3>
              <p><strong>Order ID:</strong> #${orderId}</p>
              <p><strong>Amount Paid:</strong> ₹${amount.toFixed(2)}</p>
              <p style="margin-top: 1rem;"><i class="fas fa-truck"></i> Your order will be delivered in 3-5 business days</p>
            </div>
            <p style="margin-bottom: 2rem;">Thank you for shopping with Daily Gadget!</p>
            <a href="index.html" class="continue-shopping-btn">Continue Shopping</a>
          </div>
        `;
      }
      
      // Clear cart
      cart.clearCart();
      cart.showToast(`✅ Payment successful! Order confirmed`);
    },
    prefill: {
      name: fullName,
      email: email,
      contact: phone
    },
    notes: {
      order_id: orderId,
      payment_type: 'full_payment',
      shipping_charge: shipping
    },
    theme: {
      color: '#1e7b4c'
    },
    modal: {
      ondismiss: function() {
        cart.showToast('❌ Payment cancelled');
      }
    }
  };

  // Open Razorpay checkout
  const rzp = new Razorpay(options);
  rzp.open();
}