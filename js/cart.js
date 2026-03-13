// ============ js/cart.js ============
// ============ COMPLETE FIXED VERSION ============

class ShoppingCart {
  constructor() {
    this.cart = this.loadCart();
    this.init();
  }

  // Load cart from localStorage
  loadCart() {
    try {
      const saved = localStorage.getItem('dailyGadgetCart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart:', e);
      return [];
    }
  }

  // Save cart to localStorage
  saveCart() {
    try {
      localStorage.setItem('dailyGadgetCart', JSON.stringify(this.cart));
      this.updateCartCount();
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }

  // Initialize
  init() {
    this.updateCartCount();
    
    window.addEventListener('storage', (e) => {
      if (e.key === 'dailyGadgetCart') {
        this.cart = this.loadCart();
        this.updateCartCount();
        this.refreshCartDisplay();
      }
    });
  }

  // ============ ADD ITEM TO CART ============
  addItem(product, quantity = 1) {
    if (!product || !product.id) {
      this.showToast('❌ Invalid product');
      return false;
    }

    // Check if product already exists with same size/color
    const existing = this.cart.find(item => 
      item.id === product.id && 
      item.selectedSize === product.selectedSize &&
      item.selectedColor === product.selectedColor
    );
    
    if (existing) {
      existing.quantity += quantity;
      this.showToast(`✅ ${product.name} quantity updated`);
    } else {
      // Create a truly unique ID
      const uniqueId = `item_${product.id}_${product.selectedSize || 'M'}_${product.selectedColor || 'Black'}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      this.cart.push({
        uniqueId: uniqueId,
        id: product.id,
        name: product.name,
        price: product.price,
        icon: product.icon || 'fa-tshirt',
        image: product.image || null,
        selectedSize: product.selectedSize || 'M',
        selectedColor: product.selectedColor || 'Black',
        quantity: quantity
      });
      this.showToast(`✅ ${product.name} added to cart`);
    }
    
    this.saveCart();
    this.refreshCartDisplay();
    return true;
  }

  // ============ FIXED: REMOVE ITEM BY UNIQUE ID ============
  removeItem(uniqueId) {
    console.log('Removing item with ID:', uniqueId); // Debug
    
    if (!uniqueId) {
      console.error('No uniqueId provided');
      this.showToast('❌ Error: Item ID not found');
      return false;
    }
    
    // Find the item
    const index = this.cart.findIndex(item => item.uniqueId === uniqueId);
    
    if (index !== -1) {
      const removedItem = this.cart[index];
      console.log('Found item to remove:', removedItem);
      
      // Remove the item
      this.cart.splice(index, 1);
      
      // Save to localStorage
      this.saveCart();
      
      // Show confirmation
      this.showToast(`🗑️ ${removedItem.name} removed from cart`);
      
      // Refresh display
      this.refreshCartDisplay();
      
      return true;
    } else {
      console.log('Item not found with ID:', uniqueId);
      console.log('Available items:', this.cart.map(item => item.uniqueId));
      this.showToast('❌ Item not found in cart');
      return false;
    }
  }

  // ============ REMOVE ITEM BY INDEX ============
  removeItemByIndex(index) {
    if (index >= 0 && index < this.cart.length) {
      const removedItem = this.cart[index];
      this.cart.splice(index, 1);
      this.saveCart();
      this.showToast(`🗑️ ${removedItem.name} removed`);
      this.refreshCartDisplay();
      return true;
    }
    return false;
  }

  // ============ CLEAR CART ============
  clearCart() {
    if (this.cart.length === 0) {
      this.showToast('🛒 Cart is already empty');
      return false;
    }
    
    this.cart = [];
    this.saveCart();
    this.showToast('🛒 Cart cleared');
    this.refreshCartDisplay();
    return true;
  }

  // ============ UPDATE QUANTITY ============
  updateQuantity(uniqueId, newQuantity) {
    const item = this.cart.find(item => item.uniqueId === uniqueId);
    
    if (item) {
      if (newQuantity <= 0) {
        this.removeItem(uniqueId);
      } else {
        item.quantity = newQuantity;
        this.saveCart();
        this.showToast(`🔄 Quantity updated`);
        this.refreshCartDisplay();
      }
      return true;
    }
    return false;
  }

  // ============ INCREMENT QUANTITY ============
  incrementQuantity(uniqueId) {
    const item = this.cart.find(item => item.uniqueId === uniqueId);
    if (item) {
      item.quantity++;
      this.saveCart();
      this.refreshCartDisplay();
      return true;
    }
    return false;
  }

  // ============ DECREMENT QUANTITY ============
  decrementQuantity(uniqueId) {
    const item = this.cart.find(item => item.uniqueId === uniqueId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.saveCart();
        this.refreshCartDisplay();
      } else {
        this.removeItem(uniqueId);
      }
      return true;
    }
    return false;
  }

  // ============ GET CART TOTAL ============
  getTotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // ============ GET ITEM COUNT ============
  getItemCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  // ============ UPDATE CART COUNT IN HEADER ============
  updateCartCount() {
    const count = this.getItemCount();
    
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });

    const mobileBadge = document.querySelector('.mobile-cart-badge');
    if (mobileBadge) {
      mobileBadge.textContent = count;
      mobileBadge.style.display = count > 0 ? 'inline-block' : 'none';
    }
  }

  // ============ REFRESH CART DISPLAY ============
  refreshCartDisplay() {
    if (window.location.pathname.includes('cart.html')) {
      this.renderCartPage();
    }
  }

  // ============ RENDER CART PAGE ============
  renderCartPage() {
    const cartContainer = document.querySelector('.cart-items');
    const summaryContainer = document.querySelector('.cart-summary');
    
    if (!cartContainer) return;

    if (this.cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="empty-cart" style="text-align:center; padding:3rem;">
          <i class="fas fa-shopping-cart" style="font-size:4rem; color:#cde0d7;"></i>
          <p style="margin:1rem 0; font-size:1.2rem;">Your cart is empty</p>
          <a href="index.html" style="background:#1e7b4c; color:white; padding:0.8rem 2rem; border-radius:50px; text-decoration:none; display:inline-block;">
            Continue Shopping
          </a>
        </div>
      `;
      if (summaryContainer) summaryContainer.style.display = 'none';
      return;
    }

    if (summaryContainer) summaryContainer.style.display = 'block';
    
    // Render cart items
    cartContainer.innerHTML = this.cart.map(item => {
      // Ensure uniqueId exists
      if (!item.uniqueId) {
        item.uniqueId = `item_${item.id}_${item.selectedSize}_${item.selectedColor}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      }
      
      return `
        <div class="cart-item" data-unique-id="${item.uniqueId}" 
             style="display:grid; grid-template-columns:80px 1fr auto auto auto; gap:1rem; align-items:center; padding:1.5rem 0; border-bottom:1px solid #e3ece8;">
          
          <!-- PRODUCT IMAGE -->
          <div class="cart-item-image" style="width:80px; height:80px; background:#f9fbfa; border-radius:1rem; display:flex; align-items:center; justify-content:center; overflow:hidden;">
            ${item.image 
              ? `<img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;" 
                   onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas ${item.icon}\\' style=\\'font-size:2rem; color:#43755a;\\'></i>';">` 
              : `<i class="fas ${item.icon}" style="font-size:2rem; color:#43755a;"></i>`
            }
          </div>
          
          <!-- PRODUCT DETAILS -->
          <div class="cart-item-details">
            <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:0.3rem;">${item.name}</h3>
            <div style="font-size:0.85rem; color:#5d6b65;">
              Size: ${item.selectedSize} | Color: ${item.selectedColor}
            </div>
            <div style="color:#1e7b4c; font-weight:700; margin-top:0.5rem; font-size:1.1rem;">
              ₹${item.price}
            </div>
          </div>
          
          <!-- QUANTITY CONTROLS -->
          <div class="cart-item-quantity" style="display:flex; align-items:center; gap:0.5rem;">
            <button class="cart-qty-btn" onclick="cart.decrementQuantity('${item.uniqueId}')" 
                    style="width:35px; height:35px; border-radius:50%; border:1px solid #1e7b4c; background:white; color:#1e7b4c; font-weight:bold; cursor:pointer;">-</button>
            <span style="min-width:35px; text-align:center; font-weight:600;">${item.quantity}</span>
            <button class="cart-qty-btn" onclick="cart.incrementQuantity('${item.uniqueId}')" 
                    style="width:35px; height:35px; border-radius:50%; border:1px solid #1e7b4c; background:white; color:#1e7b4c; font-weight:bold; cursor:pointer;">+</button>
          </div>
          
          <!-- ITEM TOTAL -->
          <div style="font-weight:700; color:#0a3529; font-size:1.1rem;">
            ₹${item.price * item.quantity}
          </div>
          
          <!-- REMOVE BUTTON - FIXED: Using direct function call -->
          <div style="color:#c0421e; cursor:pointer; font-size:1.3rem;" 
               onclick="cart.removeItem('${item.uniqueId}'); event.stopPropagation();">
            <i class="fas fa-trash"></i>
          </div>
        </div>
      `;
    }).join('');

    // Update summary
    if (summaryContainer) {
      const subtotal = this.getTotal();
      const shipping = subtotal > 2000 ? 0 : 29;
      const total = subtotal + shipping;

      summaryContainer.innerHTML = `
        <h3 style="margin-bottom:1.5rem; font-size:1.3rem;">Order Summary</h3>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.8rem;">
          <span>Subtotal</span><span style="font-weight:600;">₹${subtotal}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.8rem;">
          <span>Shipping</span><span style="font-weight:600;">${shipping === 0 ? 'Free' : '₹' + shipping}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-weight:700; margin-top:1rem; padding-top:1rem; border-top:2px solid #cde0d7; font-size:1.2rem;">
          <span>Total</span><span>₹${total}</span>
        </div>
        <button class="checkout-btn" onclick="window.location.href='checkout.html'" 
                style="width:100%; padding:1rem; background:#1e7b4c; color:white; border:none; border-radius:50px; font-weight:700; font-size:1.1rem; margin-top:2rem; cursor:pointer;">
          Proceed to Checkout
        </button>
      `;
    }
  }

  // ============ SHOW TOAST NOTIFICATION ============
  showToast(msg) {
    let toast = document.getElementById('cartToast');
    
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cartToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #1e4d3d;
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      `;
      document.body.appendChild(toast);
    }
    
    toast.innerHTML = msg;
    toast.style.opacity = '1';
    
    setTimeout(() => {
      toast.style.opacity = '0';
    }, 2000);
  }
}

// ============ CREATE GLOBAL CART INSTANCE ============
const cart = new ShoppingCart();
window.cart = cart;

// ============ INITIALIZE ON PAGE LOAD ============
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('cart.html')) {
    setTimeout(() => {
      cart.renderCartPage();
    }, 100);
  }
});