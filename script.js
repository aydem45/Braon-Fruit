// FreshMart E-commerce JavaScript

// Global Variables
let cart = JSON.parse(localStorage.getItem('freshmart_cart')) || [];
let products = [];

// Sample Product Data
const sampleProducts = [
    {
        id: 1,
        name: "Apel Fuji Premium",
        category: "buah",
        price: 35000,
        originalPrice: 45000,
        image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Apel Fuji premium langsung dari kebun terpilih. Rasa manis, tekstur renyah.",
        rating: 5,
        reviews: 24,
        featured: true
    },
    {
        id: 2,
        name: "Jeruk Pontianak",
        category: "buah",
        price: 25000,
        originalPrice: 30000,
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Jeruk manis khas Pontianak dengan kandungan vitamin C tinggi.",
        rating: 4,
        reviews: 18,
        featured: true
    },
    {
        id: 3,
        name: "Bayam Segar",
        category: "sayur",
        price: 15000,
        originalPrice: 18000,
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Bayam organik segar, kaya akan zat besi dan vitamin.",
        rating: 5,
        reviews: 32,
        featured: true
    },
    {
        id: 4,
        name: "Pisang Cavendish",
        category: "buah",
        price: 20000,
        originalPrice: 25000,
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Pisang Cavendish premium dengan rasa manis alami.",
        rating: 4,
        reviews: 15,
        featured: true
    },
    {
        id: 5,
        name: "Wortel Baby",
        category: "sayur",
        price: 18000,
        originalPrice: 22000,
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Wortel baby organik, cocok untuk salad dan jus.",
        rating: 5,
        reviews: 28,
        featured: false
    },
    {
        id: 6,
        name: "Strawberry Import",
        category: "impor",
        price: 65000,
        originalPrice: 75000,
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Strawberry import segar dengan rasa manis dan asam yang seimbang.",
        rating: 5,
        reviews: 45,
        featured: false
    },
    {
        id: 7,
        name: "Brokoli Organik",
        category: "sayur",
        price: 28000,
        originalPrice: 35000,
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Brokoli organik segar, kaya akan vitamin dan mineral.",
        rating: 4,
        reviews: 22,
        featured: false
    },
    {
        id: 8,
        name: "Mangga Harum Manis",
        category: "buah",
        price: 42000,
        originalPrice: 50000,
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Mangga harum manis dengan tekstur lembut dan rasa yang manis.",
        rating: 5,
        reviews: 38,
        featured: false
    }
];

// Initialize products
products = sampleProducts;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    updateCartCount();
    
    // Check current page and load appropriate content
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            loadFeaturedProducts();
            break;
        case 'products.html':
            loadAllProducts();
            setupProductFilters();
            break;
        case 'product-detail.html':
            loadProductDetail();
            break;
        case 'contact.html':
            setupContactForm();
            break;
        case 'login.html':
            setupAuthForms();
            break;
    }
    
    // Setup global event listeners
    setupGlobalEventListeners();
}

// Setup Global Event Listeners
function setupGlobalEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', showCart);
    }
    
    // Newsletter subscription
    const newsletterBtn = document.querySelector('.newsletter-section .btn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', handleNewsletterSubscription);
    }
}

// Load Featured Products (Homepage)
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const featuredProducts = products.filter(product => product.featured).slice(0, 4);
    
    container.innerHTML = featuredProducts.map(product => `
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="product-card card h-100 hover-lift">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-muted flex-grow-1">${product.description}</p>
                    <div class="rating mb-2">
                        ${generateStarRating(product.rating)}
                        <small class="text-muted">(${product.reviews})</small>
                    </div>
                    <div class="price mb-3">
                        <span class="h5 text-success fw-bold">Rp ${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<small class="text-muted text-decoration-line-through ms-2">Rp ${formatPrice(product.originalPrice)}</small>` : ''}
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-success flex-grow-1" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus me-1"></i>Keranjang
                        </button>
                        <a href="product-detail.html?id=${product.id}" class="btn btn-outline-success">
                            <i class="fas fa-eye"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Load All Products (Products Page)
function loadAllProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    displayProducts(products);
    updateProductCount(products.length);
}

// Display Products
function displayProducts(productsToShow) {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    container.innerHTML = productsToShow.map(product => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="product-card card h-100 hover-lift">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-muted flex-grow-1">${product.description}</p>
                    <div class="rating mb-2">
                        ${generateStarRating(product.rating)}
                        <small class="text-muted">(${product.reviews})</small>
                    </div>
                    <div class="price mb-3">
                        <span class="h5 text-success fw-bold">Rp ${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<small class="text-muted text-decoration-line-through ms-2">Rp ${formatPrice(product.originalPrice)}</small>` : ''}
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-success flex-grow-1" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus me-1"></i>Keranjang
                        </button>
                        <a href="product-detail.html?id=${product.id}" class="btn btn-outline-success">
                            <i class="fas fa-eye"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup Product Filters
function setupProductFilters() {
    // Category filters
    const categoryFilters = document.querySelectorAll('input[type="checkbox"][value]');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    // Sort filter
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }
    
    // Clear filters
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
    
    // View toggle
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    
    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener('click', () => toggleView('grid'));
        listViewBtn.addEventListener('click', () => toggleView('list'));
    }
}

// Apply Filters
function applyFilters() {
    let filteredProducts = [...products];
    
    // Category filter
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"][value]:checked'))
        .map(cb => cb.value);
    
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            selectedCategories.includes(product.category)
        );
    }
    
    // Price filter
    const selectedPriceRanges = Array.from(document.querySelectorAll('input[type="checkbox"][value*="-"]:checked'))
        .map(cb => cb.value);
    
    if (selectedPriceRanges.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            return selectedPriceRanges.some(range => {
                if (range === '50000+') {
                    return product.price >= 50000;
                }
                const [min, max] = range.split('-').map(Number);
                return product.price >= min && product.price <= max;
            });
        });
    }
    
    // Sort
    const sortValue = document.getElementById('sortSelect')?.value;
    if (sortValue && sortValue !== 'default') {
        switch(sortValue) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
    }
    
    displayProducts(filteredProducts);
    updateProductCount(filteredProducts.length);
}

// Clear All Filters
function clearAllFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById('sortSelect').value = 'default';
    displayProducts(products);
    updateProductCount(products.length);
}

// Toggle View
function toggleView(viewType) {
    const gridBtn = document.getElementById('gridView');
    const listBtn = document.getElementById('listView');
    const container = document.getElementById('productsContainer');
    
    if (viewType === 'grid') {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        container.className = 'row product-grid';
    } else {
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        container.className = 'product-list';
    }
}

// Load Product Detail
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Update breadcrumb
    const breadcrumb = document.getElementById('productBreadcrumb');
    if (breadcrumb) {
        breadcrumb.textContent = product.name;
    }
    
    // Update product info
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = `Rp ${formatPrice(product.price)}`;
    document.getElementById('productDescription').textContent = product.description;
    
    if (product.originalPrice) {
        document.getElementById('originalPrice').textContent = `Rp ${formatPrice(product.originalPrice)}`;
    }
    
    // Setup quantity controls
    setupQuantityControls();
    
    // Setup add to cart
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCart(product.id, quantity);
    });
    
    // Setup buy now
    document.getElementById('buyNowBtn').addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCart(product.id, quantity);
        showCart();
    });
    
    // Setup thumbnail images
    setupThumbnailImages();
    
    // Load related products
    loadRelatedProducts(product.category, product.id);
}

// Setup Quantity Controls
function setupQuantityControls() {
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantity');
    
    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        increaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    }
}

// Setup Thumbnail Images
function setupThumbnailImages() {
    const thumbnails = document.querySelectorAll('.thumbnail-img');
    const mainImage = document.getElementById('mainProductImage');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            // Update main image
            if (mainImage) {
                mainImage.src = thumbnail.src.replace('w=200', 'w=1000');
            }
        });
    });
}

// Load Related Products
function loadRelatedProducts(category, excludeId) {
    const container = document.getElementById('relatedProducts');
    if (!container) return;
    
    const relatedProducts = products
        .filter(p => p.category === category && p.id !== excludeId)
        .slice(0, 4);
    
    container.innerHTML = relatedProducts.map(product => `
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="product-card card h-100 hover-lift">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h6 class="card-title">${product.name}</h6>
                    <div class="price">
                        <span class="text-success fw-bold">Rp ${formatPrice(product.price)}</span>
                    </div>
                    <a href="product-detail.html?id=${product.id}" class="btn btn-outline-success btn-sm mt-2">
                        Lihat Detail
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Handle Contact Form Submit
function handleContactSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Mengirim...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showAlert('Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Setup Auth Forms
function setupAuthForms() {
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Toggle between login and register
    if (showRegisterBtn && showLoginBtn && loginForm && registerForm) {
        showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.add('d-none');
            registerForm.classList.remove('d-none');
        });
        
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.classList.add('d-none');
            loginForm.classList.remove('d-none');
        });
    }
    
    // Password toggle
    setupPasswordToggle('toggleLoginPassword', 'loginPassword');
    setupPasswordToggle('toggleRegisterPassword', 'registerPassword');
    setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');
    
    // Form submissions
    const loginFormSubmit = document.getElementById('loginFormSubmit');
    const registerFormSubmit = document.getElementById('registerFormSubmit');
    
    if (loginFormSubmit) {
        loginFormSubmit.addEventListener('submit', handleLogin);
    }
    
    if (registerFormSubmit) {
        registerFormSubmit.addEventListener('submit', handleRegister);
    }
}

// Setup Password Toggle
function setupPasswordToggle(toggleId, inputId) {
    const toggleBtn = document.getElementById(toggleId);
    const passwordInput = document.getElementById(inputId);
    
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = toggleBtn.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Masuk...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Store user session
        localStorage.setItem('freshmart_user', JSON.stringify({
            email: email,
            name: 'User',
            loginTime: new Date().toISOString()
        }));
        
        showAlert('Login berhasil! Selamat datang di FreshMart.', 'success');
        
        // Redirect to homepage
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 2000);
}

// Handle Register
function handleRegister(e) {
    e.preventDefault();
    
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showAlert('Password dan konfirmasi password tidak cocok!', 'danger');
        return;
    }
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Mendaftar...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showAlert('Pendaftaran berhasil! Silakan masuk dengan akun Anda.', 'success');
        
        // Switch to login form
        document.getElementById('registerForm').classList.add('d-none');
        document.getElementById('loginForm').classList.remove('d-none');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reset form
        e.target.reset();
    }, 2000);
}

// Cart Functions
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    localStorage.setItem('freshmart_cart', JSON.stringify(cart));
    updateCartCount();
    showAlert(`${product.name} telah ditambahkan ke keranjang!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('freshmart_cart', JSON.stringify(cart));
    updateCartCount();
    showCart(); // Refresh cart display
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('freshmart_cart', JSON.stringify(cart));
            updateCartCount();
        }
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function showCart() {
    // Create cart modal
    const cartModal = `
        <div class="modal fade" id="cartModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-shopping-cart me-2"></i>Keranjang Belanja
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${cart.length === 0 ? 
                            '<div class="text-center py-4"><p class="text-muted">Keranjang Anda kosong</p></div>' :
                            generateCartHTML()
                        }
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                        ${cart.length > 0 ? '<button type="button" class="btn btn-success" onclick="checkout()">Checkout</button>' : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal
    const existingModal = document.getElementById('cartModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add new modal
    document.body.insertAdjacentHTML('beforeend', cartModal);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();
}

function generateCartHTML() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return `
        <div class="cart-items">
            ${cart.map(item => `
                <div class="cart-item d-flex align-items-center mb-3 p-3 border rounded">
                    <img src="${item.image}" alt="${item.name}" class="me-3" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-success mb-1">Rp ${formatPrice(item.price)}</p>
                        <div class="quantity-controls d-flex align-items-center">
                            <button class="btn btn-sm btn-outline-secondary" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="mx-3">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <div class="text-end">
                        <p class="fw-bold mb-1">Rp ${formatPrice(item.price * item.quantity)}</p>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="cart-total mt-4 pt-3 border-top">
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Total:</h5>
                <h5 class="mb-0 text-success">Rp ${formatPrice(total)}</h5>
            </div>
        </div>
    `;
}

function checkout() {
    showAlert('Fitur checkout akan segera hadir! Terima kasih atas minat Anda.', 'info');
}

// Search Function
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    if (query.length === 0) {
        // Show all products if search is empty
        if (window.location.pathname.includes('products.html')) {
            displayProducts(products);
            updateProductCount(products.length);
        }
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    if (window.location.pathname.includes('products.html')) {
        displayProducts(filteredProducts);
        updateProductCount(filteredProducts.length);
    } else {
        // Redirect to products page with search results
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
}

// Newsletter Subscription
function handleNewsletterSubscription(e) {
    e.preventDefault();
    const emailInput = e.target.previousElementSibling;
    const email = emailInput.value;
    
    if (!email || !isValidEmail(email)) {
        showAlert('Masukkan email yang valid!', 'danger');
        return;
    }
    
    // Show loading
    const originalText = e.target.textContent;
    e.target.textContent = 'Berlangganan...';
    e.target.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showAlert('Terima kasih! Anda telah berhasil berlangganan newsletter kami.', 'success');
        emailInput.value = '';
        
        // Reset button
        e.target.textContent = originalText;
        e.target.disabled = false;
    }, 1500);
}

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
}

function generateStarRating(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push('<i class="fas fa-star text-warning"></i>');
        } else {
            stars.push('<i class="far fa-star text-warning"></i>');
        }
    }
    return stars.join('');
}

function updateProductCount(count) {
    const productCount = document.getElementById('productCount');
    if (productCount) {
        productCount.textContent = count;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alertId = 'alert-' + Date.now();
    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed" 
             id="${alertId}" 
             style="top: 100px; right: 20px; z-index: 9999; min-width: 300px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Add to document
    document.body.insertAdjacentHTML('beforeend', alertHTML);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        const alertElement = document.getElementById(alertId);
        if (alertElement) {
            alertElement.remove();
        }
    }, 5000);
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading animation to buttons on click
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn:not(.btn-close)') && !e.target.disabled) {
        const btn = e.target;
        const originalContent = btn.innerHTML;
        
        // Add loading state
        btn.style.minWidth = btn.offsetWidth + 'px';
        btn.innerHTML = '<span class="loading"></span>';
        btn.disabled = true;
        
        // Remove loading after short delay (for visual feedback)
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.disabled = false;
            btn.style.minWidth = '';
        }, 800);
    }
});

// Initialize tooltips and popovers if Bootstrap is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize Bootstrap popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});