// ============ js/cart.js ============
// ============ UPDATED WITH IMAGE SUPPORT ============

class ShoppingCart {
  constructor() {
    this.cart = this.loadCart();
  }

  loadCart() {
    const saved = localStorage.getItem('dailyGadgetCart');
    return saved ? JSON.parse(saved) : [];
  }

  saveCart() {
    localStorage.setItem('dailyGadgetCart', JSON.stringify(this.cart));
    this.updateCartCount();
  }

  /**
   * ADD ITEM TO CART WITH IMAGE SUPPORT
   * @param {Object} product - Product object with image property
   * @param {number} quantity - Quantity to add
   */
  addItem(product, quantity = 1) {
    // Check if product already exists in cart (with same options)
    const existing = this.cart.find(item => 
      item.id === product.id && 
      item.selectedSize === product.selectedSize &&
      item.selectedColor === product.selectedColor
    );
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      // Make sure to include image in the cart item
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        icon: product.icon || 'fa-tshirt', // Fallback icon
        image: product.image || null, // Store image path
        selectedSize: product.selectedSize || 'M',
        selectedColor: product.selectedColor || 'Black',
        quantity: quantity
      });
    }
    
    this.saveCart();
    this.showToast(`✅ ${product.name} added to cart`);
  }

  removeItem(id) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.saveCart();
    this.showToast('🗑️ Item removed');
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.showToast('🛒 Cart cleared');
  }

  updateQuantity(id, newQuantity) {
    const item = this.cart.find(item => item.id === id);
    if (item) {
      if (newQuantity <= 0) {
        this.removeItem(id);
      } else {
        item.quantity = newQuantity;
        this.saveCart();
      }
    }
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  updateCartCount() {
    const count = this.getItemCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  /**
   * RENDER CART ITEMS WITH IMAGES
   * Call this on cart.html page
   */
  renderCartPage() {
    const cartContainer = document.querySelector('.cart-items');
    const summaryContainer = document.querySelector('.cart-summary');
    
    if (!cartContainer) return;

    if (this.cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="empty-cart" style="text-align:center; padding:3rem;">
          <i class="fas fa-shopping-cart" style="font-size:4rem; color:#cde0d7;"></i>
          <p style="margin:1rem 0;">Your cart is empty</p>
          <a href="index.html" style="background:#1e7b4c; color:white; padding:0.8rem 2rem; border-radius:50px; text-decoration:none;">
            Continue Shopping
          </a>
        </div>
      `;
      if (summaryContainer) summaryContainer.style.display = 'none';
      return;
    }

    if (summaryContainer) summaryContainer.style.display = 'block';
    
    // Render cart items with images
    cartContainer.innerHTML = this.cart.map(item => `
      <div class="cart-item" data-product-id="${item.id}" style="display:grid; grid-template-columns:80px 1fr auto auto auto; gap:1rem; align-items:center; padding:1rem 0; border-bottom:1px solid #e3ece8;">
        
        <!-- PRODUCT IMAGE -->
        <div class="cart-item-image" style="width:80px; height:80px; background:#f9fbfa; border-radius:1rem; display:flex; align-items:center; justify-content:center; overflow:hidden;">
          ${item.image 
            ? `<img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;">` 
            : `<i class="fas ${item.icon}" style="font-size:2rem; color:#43755a;"></i>`
          }
        </div>
        
        <!-- PRODUCT DETAILS -->
        <div class="cart-item-details">
          <h3 style="font-size:1rem; font-weight:700; margin-bottom:0.3rem;">${item.name}</h3>
          <div style="font-size:0.8rem; color:#5d6b65;">
            Size: ${item.selectedSize} | Color: ${item.selectedColor}
          </div>
          <div class="cart-item-price" style="color:#1e7b4c; font-weight:700; margin-top:0.3rem;">
            ₹${item.price}
          </div>
        </div>
        
        <!-- QUANTITY CONTROLS -->
        <div class="cart-item-quantity" style="display:flex; align-items:center; gap:0.5rem;">
          <button class="cart-qty-btn" onclick="cart.decrementQuantity(${item.id})" style="width:32px; height:32px; border-radius:50%; border:1px solid #e3ece8; background:white; cursor:pointer;">-</button>
          <span class="cart-qty-value" style="min-width:30px; text-align:center;">${item.quantity}</span>
          <button class="cart-qty-btn" onclick="cart.incrementQuantity(${item.id})" style="width:32px; height:32px; border-radius:50%; border:1px solid #e3ece8; background:white; cursor:pointer;">+</button>
        </div>
        
        <!-- ITEM TOTAL -->
        <div class="cart-item-total" style="font-weight:700; color:#0a3529;">
          ₹${item.price * item.quantity}
        </div>
        
        <!-- REMOVE BUTTON -->
        <div class="cart-item-remove" onclick="cart.removeItem(${item.id})" style="color:#c0421e; cursor:pointer;">
          <i class="fas fa-trash"></i>
        </div>
      </div>
    `).join('');

    // Update summary
    if (summaryContainer) {
      const subtotal = this.getTotal();
      const shipping = subtotal > 2000 ? 0 : 29;
      const total = subtotal + shipping;

      summaryContainer.innerHTML = `
        <h3 style="margin-bottom:1rem;">Order Summary</h3>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Subtotal</span><span>₹${subtotal}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Shipping</span><span>${shipping === 0 ? 'Free' : '₹' + shipping}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-weight:700; margin-top:0.5rem; padding-top:0.5rem; border-top:1px solid #cde0d7;">
          <span>Total</span><span>₹${total}</span>
        </div>
        <button class="checkout-btn" onclick="window.location.href='checkout.html'" style="width:100%; padding:1rem; background:#1e7b4c; color:white; border:none; border-radius:50px; font-weight:700; margin-top:1.5rem; cursor:pointer;">
          Proceed to Checkout
        </button>
      `;
    }
  }

  /**
   * RENDER ORDER ITEMS FOR CHECKOUT/TRACKING PAGES
   */
  renderOrderItems(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = this.cart.map(item => `
      <div style="display:flex; gap:1rem; padding:1rem 0; border-bottom:1px solid #e3ece8;">
        <div style="width:60px; height:60px; background:#f9fbfa; border-radius:0.8rem; overflow:hidden;">
          ${item.image 
            ? `<img src="${item.image}" style="width:100%; height:100%; object-fit:cover;">` 
            : `<i class="fas ${item.icon}" style="font-size:1.5rem; color:#43755a; display:flex; justify-content:center; align-items:center; height:100%;"></i>`
          }
        </div>
        <div style="flex:1;">
          <div style="font-weight:700;">${item.name}</div>
          <div style="font-size:0.8rem; color:#5d6b65;">Size: ${item.selectedSize} | Color: ${item.selectedColor}</div>
          <div style="display:flex; justify-content:space-between; margin-top:0.3rem;">
            <span>Qty: ${item.quantity}</span>
            <span style="font-weight:700;">₹${item.price * item.quantity}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  incrementQuantity(id) {
    const item = this.cart.find(item => item.id === id);
    if (item) {
      this.updateQuantity(id, item.quantity + 1);
      this.renderCartPage(); // Re-render after update
    }
  }

  decrementQuantity(id) {
    const item = this.cart.find(item => item.id === id);
    if (item) {
      this.updateQuantity(id, item.quantity - 1);
      this.renderCartPage(); // Re-render after update
    }
  }

  showToast(msg) {
    const toast = document.getElementById('cartToast');
    if (!toast) return;
    toast.innerHTML = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }
}

// Initialize cart globally
const cart = new ShoppingCart();