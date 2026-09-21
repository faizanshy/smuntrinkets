// Product Dataset
const products = [
    {
        id: 1,
        name: "Solitaire Diamond Pendant",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
        description: "Elegant 18k gold chain featuring a brilliant ethically sourced solitaire pendant."
    },
    {
        id: 2,
        name: "Minimalist Gold Band",
        price: 85.00,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
        description: "Classic slim band polished to perfection. Ideal for stacking or standalone wear."
    },
    {
        id: 3,
        name: "Pearl Drop Earrings",
        price: 95.00,
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80",
        description: "Freshwater pearls suspended from delicate gold hoops for refined charm."
    },
    {
        id: 4,
        name: "Twisted Cable Cuff",
        price: 110.00,
        image: "https://images.unsplash.com/photo-1611591475179-62cd34eb0e0f?auto=format&fit=crop&w=600&q=80",
        description: "Sophisticated twisted design bracelet made with solid sterling silver."
    }
];

// Cart State
let cart = [];

// DOM Elements
const productGrid = document.getElementById("product-grid");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartCount = document.querySelector(".cart-count");
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalBody = document.getElementById("modal-body");

// Render Products
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card reveal">
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="action-btn" onclick="openModal(${product.id})" aria-label="Quick View">
                        <i class="fa-regular fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="addToCart(${product.id})" aria-label="Add to Cart">
                        <i class="fa-solid fa-bag-shopping"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h4 class="product-title">${product.name}</h4>
                <div class="product-price">$${product.price.toFixed(2)}</div>
            </div>
        </div>
    `).join("");
}

// Cart Functions
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    openCartDrawer();
}

function updateCartUI() {
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align:center; color:#888;">Your bag is empty.</p>`;
    } else {
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
            </div>
        `).join("");
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}

function openCartDrawer() {
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
}

function closeCartDrawer() {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
}

// Quick View Modal
function openModal(id) {
    const product = products.find(p => p.id === id);
    modalBody.innerHTML = `
        <div class="modal-grid">
            <img src="${product.image}" alt="${product.name}" style="border-radius:4px;">
            <div>
                <h3 style="font-family:var(--font-heading); font-size:1.4rem; margin-bottom:10px;">${product.name}</h3>
                <p style="font-size:1.1rem; font-weight:600; margin-bottom:15px;">$${product.price.toFixed(2)}</p>
                <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:20px;">${product.description}</p>
                <button class="btn btn-primary btn-block" onclick="addToCart(${product.id}); closeModal();">Add To Cart</button>
            </div>
        </div>
    `;
    modalOverlay.classList.add("active");
}

function closeModal() {
    modalOverlay.classList.remove("active");
}

// Scroll Animations (Intersection Observer)
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

// Event Listeners
cartBtn.addEventListener("click", openCartDrawer);
closeCart.addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", closeCartDrawer);
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    initScrollAnimations();
});