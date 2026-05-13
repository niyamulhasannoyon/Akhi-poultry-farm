const STORAGE_KEY = 'akhi_products_v2';
let products = [];

// Default Product List (Matches Admin Default)
const defaultProducts = [
    { id: 101, name: "সোনালী রোস্ট", category: "chicken", price: 340, stock: 40, unit: "কেজি", image: "https://images.unsplash.com/photo-1615557960916-5f4791effe9d?q=80&w=600", desc: "সেরা মানের রোস্টের উপযোগী সোনালী মুরগি।" },
    { id: 102, name: "সোনালী মুরগি", category: "chicken", price: 320, stock: 60, unit: "কেজি", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=600", desc: "লাইভ রেগুলার সোনালী মুরগি।" },
    { id: 103, name: "ব্রয়লার মুরগি", category: "chicken", price: 180, stock: 150, unit: "কেজি", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=600", desc: "খামারের তাজা ব্রয়লার মুরগি।" },
    { id: 201, name: "সোনালী স্টার্টার", category: "feed", price: 3400, stock: 20, unit: "ব্যাগ", image: "images.jpeg", desc: "সোনালী বাচ্চার জন্য স্টার্টার ফিড।" },
    { id: 202, name: "সোনালী গ্রোয়ার", category: "feed", price: 3300, stock: 25, unit: "ব্যাগ", image: "images.jpeg", desc: "দ্রুত বৃদ্ধির জন্য গ্রোয়ার ফিড।" },
    { id: 203, name: "ব্রয়লার স্টার্টার", category: "feed", price: 3500, stock: 15, unit: "ব্যাগ", image: "images.jpeg", desc: "ব্রয়লারের জন্য উচ্চ প্রোটিন যুক্ত স্টার্টার।" },
    { id: 204, name: "ব্রয়লার গ্রোয়ার", category: "feed", price: 3450, stock: 30, unit: "ব্যাগ", image: "images.jpeg", desc: "সুষম গ্রোয়ার ফিড।" },
    { id: 301, name: "ধানের গুঁড়া", category: "gura", price: 40, stock: 200, unit: "কেজি", image: "https://thumbs.dreamstime.com/b/rice-bran-powder-bowl-isolated-white-background-top-view-flat-lay-166291687.jpg", desc: "গবাদি পশু/পোল্ট্রির জন্য তাজা ধানের গুঁড়া।" },
    { id: 401, name: "সোনালী বাচ্চা (আদর্শ)", category: "chicks", price: 45, stock: 0, unit: "পিস", image: "https://images.unsplash.com/photo-1579165352523-28682dc193ee?q=80&w=600", desc: "গ্রেড এ আদর্শ সোনালী বাচ্চা।" },
    { id: 402, name: "সোনালী বাচ্চা (ক্লাসিক)", category: "chicks", price: 40, stock: 0, unit: "পিস", image: "https://images.unsplash.com/photo-1579165352523-28682dc193ee?q=80&w=600", desc: "ক্লাসিক জাতের সোনালী বাচ্চা।" },
    { id: 403, name: "ব্রয়লার বাচ্চা", category: "chicks", price: 65, stock: 500, unit: "পিস", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600", desc: "এক দিনের ব্রয়লার বাচ্চা।" },
    { id: 501, name: "রেনামাইসিন", category: "medicine", price: 120, stock: 50, unit: "বক্স", image: "https://www.renata-ltd.com/wp-content/uploads/2021/04/Renamycin-100-Tabs.jpg", desc: "পোল্ট্রির জন্য অ্যান্টিবায়োটিক।" },
    { id: 502, name: "নাপা এক্সট্রা", category: "medicine", price: 30, stock: 100, unit: "পাতা", image: "https://cdn.osudpotro.com/medicine/napa-extra-500mg-65mg-tablet-1635674064132.webp", desc: "ব্যথা এবং জ্বরের উপশম।" },
    { id: 503, name: "অ্যামপ্রিয়াম ভেট (১০০ মিলি)", category: "medicine", price: 420, stock: 50, unit: "পিস", image: "https://www.squarevet.com.bd/assets/product_img/Amprium%20Vet%20100%20ml.jpg", desc: "স্কয়ার ফার্মাসিউটিক্যালস" },
    { id: 504, name: "প্রোবায়োজাইম (১০০ মিলি)", category: "medicine", price: 380, stock: 40, unit: "পিস", image: "https://www.squarevet.com.bd/assets/product_img/Probiozyme.jpg", desc: "স্কয়ার ফার্মাসিউটিক্যালস" },
    { id: 505, name: "মিউকোস্পেল (১০০ মিলি)", category: "medicine", price: 410, stock: 60, unit: "পিস", image: "https://www.squarevet.com.bd/assets/product_img/Mucospel-100m.jpg", desc: "স্কয়ার ফার্মাসিউটিক্যালস" },
    { id: 506, name: "নিওবায়োটিক (১০০ মিলি)", category: "medicine", price: 450, stock: 35, unit: "পিস", image: "https://www.squarevet.com.bd/assets/product_img/Neobiotic.jpg", desc: "স্কয়ার ফার্মাসিউটিক্যালস" },
    { id: 507, name: "এনফ্লক্স (১০০ মিলি)", category: "medicine", price: 460, stock: 45, unit: "পিস", image: "https://www.squarevet.com.bd/assets/product_img/Enflox-Solution.jpg", desc: "স্কয়ার ফার্মাসিউটিক্যালস" },
    { id: 508, name: "পৃথী (১০০ মিলি)", category: "medicine", price: 350, stock: 70, unit: "পিস", image: "images.jpeg", desc: "স্কয়ার ফার্মাসিউটিক্যালস" },
    { id: 509, name: "রেস্পিরন ( ৫০০ মিলি)", category: "medicine", price: 980, stock: 20, unit: "পিস", image: "https://www.squarevet.com.bd/assets/product_img/Respiron.jpg", desc: "স্কয়ার ফার্মাসিউটিক্যালস" },
    { id: 510, name: "ফুসিড (১০০ মিলি)", category: "medicine", price: 430, stock: 55, unit: "পিস", image: "https://www.squarevet.com.bd/assets/product_img/Fusid-plus.jpg", desc: "স্কয়ার ফার্মাসিউটিক্যালস" },
    // ACME
    { id: 511, name: "ভাইটালামিনো (৫০০ মিলি)", category: "medicine", price: 520, stock: 30, unit: "পিস", image: "images.jpeg", desc: "এসিএমই ল্যাবরেটরিজ" },
    { id: 512, name: "ভিটা-ডি (৫০০ মিলি)", category: "medicine", price: 360, stock: 40, unit: "পিস", image: "images.jpeg", desc: "এসিএমই ল্যাবরেটরিজ" },
    { id: 513, name: "অরিটক্স-প্লাস (৫০০ মিলি)", category: "medicine", price: 540, stock: 25, unit: "পিস", image: "images.jpeg", desc: "এসিএমই ল্যাবরেটরিজ" },
    { id: 514, name: "ডিলোরেস (১০০ মিলি)", category: "medicine", price: 290, stock: 50, unit: "পিস", image: "images.jpeg", desc: "এসিএমই ল্যাবরেটরিজ" },
    { id: 515, name: "ই-ভেট (১০০ মিলি)", category: "medicine", price: 310, stock: 45, unit: "পিস", image: "images.jpeg", desc: "এসিএমই ল্যাবরেটরিজ" },
    { id: 516, name: "এসিডিফায়ার (৫০০ মিলি)", category: "medicine", price: 480, stock: 30, unit: "পিস", image: "images.jpeg", desc: "এসিএমই ল্যাবরেটরিজ" },
    { id: 517, name: "অ্যামিনোসেফ (১০০০ মিলি)", category: "medicine", price: 780, stock: 20, unit: "পিস", image: "images.jpeg", desc: "এসিএমই ল্যাবরেটরিজ" },
    { id: 518, name: "জাইলোজ (১০০০ মিলি)", category: "medicine", price: 820, stock: 15, unit: "পিস", image: "images.jpeg", desc: "এসিএমই ল্যাবরেটরিজ" },
    { id: 519, name: "সেফ জিংক (১০০০ মিলি)", category: "medicine", price: 760, stock: 25, unit: "পিস", image: "images.jpeg", desc: "এসিএমই ল্যাবরেটরিজ" },
    { id: 520, name: "সেফ ক্যাল (১০০০ মিলি)", category: "medicine", price: 740, stock: 25, unit: "পিস", image: "images.jpeg", desc: "এসিএমই ল্যাবরেটরিজ" },
    // Tecno
    { id: 521, name: "ভিটাজিংক (১০০০ মিলি)", category: "medicine", price: 720, stock: 20, unit: "পিস", image: "images.jpeg", desc: "টেকনো ড্রাগস" },
    { id: 522, name: "সিপ্রোসোল (১০০০ মিলি)", category: "medicine", price: 880, stock: 15, unit: "পিস", image: "images.jpeg", desc: "টেকনো ড্রাগস" },
    { id: 523, name: "লেভোসাল (৫০০ মিলি)", category: "medicine", price: 460, stock: 30, unit: "পিস", image: "images.jpeg", desc: "টেকনো ড্রাগস" },
    { id: 524, name: "ফ্লোর্ট (১০০ মিলি)", category: "medicine", price: 300, stock: 50, unit: "পিস", image: "images.jpeg", desc: "টেকনো ড্রাগস" },
    // ACI
    { id: 525, name: "হেপামিন (১০০০ মিলি)", category: "medicine", price: 920, stock: 15, unit: "পিস", image: "images.jpeg", desc: "এসিআই অ্যানিমেল হেলথ" },
    { id: 526, name: "নো-আইবিএইচ (৫০০ মিলি)", category: "medicine", price: 540, stock: 25, unit: "পিস", image: "images.jpeg", desc: "এসিআই অ্যানিমেল হেলথ" },
    { id: 527, name: "পাথোনিল (১০০ মিলি)", category: "medicine", price: 320, stock: 45, unit: "পিস", image: "images.jpeg", desc: "এসিআই অ্যানিমেল হেলথ" },
    { id: 528, name: "নেফ্রোফ্লোর (৫০০ মিলি)", category: "medicine", price: 560, stock: 20, unit: "পিস", image: "images.jpeg", desc: "এসিআই অ্যানিমেল হেলথ" },
    { id: 529, name: "আনপান (১০০ মিলি)", category: "medicine", price: 300, stock: 50, unit: "পিস", image: "images.jpeg", desc: "এসিআই অ্যানিমেল হেলথ" },
    { id: 530, name: "ফ্রা-১২ (১০০ মিলি)", category: "medicine", price: 340, stock: 40, unit: "পিস", image: "images.jpeg", desc: "এসিআই অ্যানিমেল হেলথ" },
    { id: 531, name: "ব্রঙ্কো (১০০০ মিলি)", category: "medicine", price: 890, stock: 15, unit: "পিস", image: "images.jpeg", desc: "এসিআই অ্যানিমেল হেলথ" },
    { id: 532, name: "পিজিইডি (৪০০ মিলি)", category: "medicine", price: 460, stock: 30, unit: "পিস", image: "images.jpeg", desc: "এসিআই অ্যানিমেল হেলথ" },
    { id: 533, name: "লিসোপ্লাস (১০ গ্রাম)", category: "medicine", price: 90, stock: 100, unit: "প্যাকেট", image: "images.jpeg", desc: "এসিআই অ্যানিমেল হেলথ" }
];

// Load Products
// Load Products
const storedProducts = localStorage.getItem(STORAGE_KEY);
if (storedProducts) {
    try {
        products = JSON.parse(storedProducts);
        // Fallback if data is corrupted
        if (!Array.isArray(products) || products.length === 0) {
            console.warn("Stored data corrupted or empty, using defaults as backup but keeping storage intact if needed manually.");
            // Optional: Uncomment next line to force reset if really broken
            // products = defaultProducts; 
        }
    } catch (e) {
        console.error("Error parsing stored products", e);
        products = defaultProducts;
    }
} else {
    products = defaultProducts;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Default Blog Posts
const defaultPosts = [
    {
        id: 1,
        title: "শীতে মুরগির যত্ন নেবেন কীভাবে?",
        category: "খামার পরামর্শ",
        image: "https://images.unsplash.com/photo-1569246294372-ed319c674f14?q=80&w=600&auto=format&fit=crop",
        desc: "শীতকাল পোল্ট্রির জন্য কঠিন হতে পারে। তাপমাত্রা নিয়ন্ত্রণ এবং সঠিক যত্ন সম্পর্কে জানুন...",
        date: "২৮ জানুয়ারী, ২০২৬",
        readTime: "৫ মিনিট পড়ুন"
    },
    {
        id: 2,
        title: "অর্গানিক মুরগি খাওয়ার উপকারিতা",
        category: "পুষ্টি বাৰ্তা",
        image: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?q=80&w=600&auto=format&fit=crop",
        desc: "আপনার পরিবারের সুস্বাস্থ্যের জন্য কেন ক্ষতিকর স্টেরয়েড মুক্ত মাংস বেছে নেবেন...",
        date: "২৫ জানুয়ারী, ২০২৬",
        readTime: "৩ মিনিট পড়ুন"
    }
];

const POSTS_KEY = 'akhi_posts';
let posts = [];
const storedPosts = localStorage.getItem(POSTS_KEY);

if (storedPosts) {
    posts = JSON.parse(storedPosts);
} else {
    posts = defaultPosts;
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

// Cart State
let cart = [];

// DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderBlogPosts();
    initScrollAnimations();
    updateCartIcon();
    setupFilters();
    setupChatbot();
    loadCart();
    setupMobileMenu();

    // Setup Filter & Search Listeners
    function setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('product-search');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Active State
                filterBtns.forEach(b => {
                    b.classList.remove('bg-green-600', 'text-white');
                    b.classList.add('bg-gray-100', 'text-gray-600');
                });
                btn.classList.remove('bg-gray-100', 'text-gray-600');
                btn.classList.add('bg-green-600', 'text-white');

                const category = btn.getAttribute('data-filter');
                renderProducts(category, searchInput.value);
            });
        });

        searchInput.addEventListener('input', (e) => {
            const activeBtn = document.querySelector('.filter-btn.bg-green-600');
            const category = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
            renderProducts(category, e.target.value);
        });
    }
});

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        // Toggle function exposed globally
        window.toggleMobileMenu = () => {
            menu.classList.toggle('hidden');
        };

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.toggleMobileMenu();
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !btn.contains(e.target)) {
                menu.classList.add('hidden');
            }
        });

        // Close menu when a link is clicked
        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }
}

// Data Synchronization (Tabs)
window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY || e.key === POSTS_KEY) {
        // Reload data
        const storedProducts = localStorage.getItem(STORAGE_KEY);
        if (storedProducts) products = JSON.parse(storedProducts);

        const storedPosts = localStorage.getItem(POSTS_KEY);
        if (storedPosts) posts = JSON.parse(storedPosts);

        // Re-render
        renderProducts();
        renderBlogPosts();
        updateCartIcon();
    }
});

// Render Blog Posts (New)
function renderBlogPosts() {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;

    if (posts.length === 0) {
        container.innerHTML = `<p class="text-gray-500 text-center col-span-2">এখনো কোনো পোস্ট নেই।</p>`;
        return;
    }

    container.innerHTML = posts.map(post => `
        <article class="bg-gray-800/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg flex group cursor-pointer hover:shadow-green-900/20 border border-white/5 transition hover:-translate-y-1 h-full">
            <div class="w-1/3 overflow-hidden relative">
                <img src="${post.image}" class="h-full w-full object-cover group-hover:scale-110 transition duration-500 min-h-[200px]" alt="${post.title}">
                <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
            </div>
            <div class="p-6 w-2/3 flex flex-col justify-between">
                <div>
                    <span class="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded mb-3 inline-block border border-green-500/20">${post.category}</span>
                    <h3 class="font-bold text-lg mb-2 text-gray-100 group-hover:text-green-400 transition leading-tight">${post.title}</h3>
                    <p class="text-gray-400 text-sm line-clamp-2">${post.desc}</p>
                </div>
                <span class="text-xs text-gray-500 mt-4 flex items-center gap-2">
                    <i class="fa-regular fa-clock"></i> ${post.date} • ${post.readTime}
                </span>
            </div>
        </article>
    `).join('');
}

// Render Products with Filters

// Render Products with Filters
function renderProducts(filter = 'all', searchTerm = '') {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    // Filter Logic
    const filtered = products.filter(product => {
        let matchCat = filter === 'all' || product.category === filter;

        // Custom Rule: Hide medicine from 'all' view unless searching
        if (filter === 'all' && product.category === 'medicine' && !searchTerm) {
            matchCat = false;
        }

        const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.desc.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
        productGrid.innerHTML = `
            <div class="col-span-full text-center py-10">
                <i class="fa-solid fa-box-open text-4xl text-gray-300 mb-2"></i>
                <p class="text-gray-500">No products found for your selection.</p>
            </div>
        `;
        return;
    }

    let htmlContent = filtered.map(product => `
        <div class="product-card bg-gray-800/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl group relative border border-white/10 flex flex-col h-full transform transition duration-500 hover:-translate-y-2 hover:shadow-green-900/40">
            <div class="h-48 overflow-hidden relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-60"></div>
                
                ${product.stock === 0
            ? `<div class="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-black text-xl backdrop-blur-sm tracking-widest border-2 border-red-500/50 m-4 rounded-xl">স্টক শেষ</div>`
            : ''}
                
                <div class="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold shadow-lg uppercase tracking-wider text-green-400 border border-green-500/30">
                    ${product.category}
                </div>
            </div>
            
            <div class="p-6 flex-1 flex flex-col relative z-10">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-xl font-bold text-white leading-tight group-hover:text-green-400 transition">${product.name}</h3>
                    <span class="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg shadow-green-900/50 whitespace-nowrap">
                        ৳${product.price}/${product.unit}
                    </span>
                </div>
                
                <p class="text-gray-400 text-sm mb-6 flex-1 text-sm leading-relaxed border-b border-white/5 pb-4">${product.desc}</p>
                
                <div class="flex items-center justify-between mt-auto">
                    <div class="text-xs font-medium ${product.stock < 10 && product.stock > 0 ? 'text-red-400 animate-pulse' : 'text-green-400'} flex items-center gap-1">
                        ${product.stock > 0 ? `<div class="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div> ${product.stock} ${product.unit} স্টকে আছে` : '<div class="w-1.5 h-1.5 rounded-full bg-red-500"></div> শীঘ্রই আসছে'}
                    </div>
                    
                    <button onclick="addToCart(${product.id})" 
                        class="bg-white/5 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 text-sm disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed border border-white/10 hover:border-green-500 group-hover:bg-green-600 shadow-lg group-hover:shadow-green-500/40"
                        ${product.stock === 0 ? 'disabled' : ''}>
                        কিনুন <i class="fa-solid fa-plus bg-white text-green-600 w-4 h-4 rounded-full flex items-center justify-center text-[10px] group-hover:bg-white group-hover:text-green-600 transition"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Append 'See All Medicines' card if in All view
    if (filter === 'all' && !searchTerm) {
        htmlContent += `
        <div onclick="switchToMedicineCategory()" class="product-card bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl group relative border border-white/10 flex flex-col h-full transform transition duration-500 hover:-translate-y-2 hover:shadow-cyan-900/40 cursor-pointer text-center justify-center items-center min-h-[400px]">
            <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=600')] bg-cover opacity-20 group-hover:opacity-30 transition duration-700"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
            
            <div class="relative z-10 p-8">
                <div class="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-3xl text-white mb-6 shadow-2xl shadow-cyan-500/30 group-hover:scale-110 transition duration-500">
                    <i class="fa-solid fa-pills"></i>
                </div>
                <h3 class="text-2xl font-black text-white mb-3 group-hover:text-cyan-400 transition">আরও ঔষধ</h3>
                <p class="text-gray-400 text-sm mb-8 max-w-xs mx-auto">আমাদের ভেটেরিনারি ওষুধ, ভ্যাকসিন এবং সাপ্লিমেন্টের সম্পূর্ণ সংগ্রহ দেখুন।</p>
                
                <button class="px-8 py-3 rounded-full bg-white/10 hover:bg-cyan-600 text-white font-bold border border-white/10 hover:border-cyan-500 transition-all duration-300 shadow-lg flex items-center gap-2 mx-auto">
                    কালেকশন দেখুন <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
        `;
    }

    productGrid.innerHTML = htmlContent;
}

function switchToMedicineCategory() {
    const medBtn = document.querySelector('.filter-btn[data-filter="medicine"]');
    if (medBtn) medBtn.click();

    // Smooth scroll to top of products
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartIcon();
    renderCartItems(); // Update drawer content

    // Open cart drawer automatically on first add or just show toast
    const drawer = document.getElementById('cart-drawer');
    if (!drawer.classList.contains('open')) {
        toggleCartDrawer();
    }

    showToast(`${product.name} added!`);
}

// Cart Drawer Logic
function toggleCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');

    drawer.classList.toggle('open');
    backdrop.classList.toggle('hidden');

    // Small delay to allow display:block to apply before opacity transition
    if (!backdrop.classList.contains('hidden')) {
        setTimeout(() => backdrop.classList.add('open'), 10);
    } else {
        backdrop.classList.remove('open');
    }

    renderCartItems();
}

// Open Cart (Wrapper for existing onclicks)
function openCart() {
    toggleCartDrawer();
}

function renderCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-gray-400">
                <i class="fa-solid fa-basket-shopping text-6xl mb-4 text-gray-200"></i>
                <p>আপনার কার্ট খালি</p>
                <button onclick="toggleCartDrawer()" class="mt-4 text-green-600 font-bold hover:underline">কেনাকাটা শুরু করুন</button>
            </div>`;
        totalEl.innerText = '৳0';
        return;
    }

    let total = 0;

    cartContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        return `
            <div class="flex items-center gap-4 bg-gray-800/50 p-4 rounded-xl border border-white/10 shadow-sm relative overflow-hidden group">
                <div class="w-16 h-16 rounded-lg overflow-hidden border border-white/10 shrink-0">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                </div>
                
                <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-white text-sm truncate pr-4">${item.name}</h4>
                    <p class="text-xs text-gray-400">৳${item.price} / ${item.unit}</p>
                    
                    <div class="flex items-center gap-3 mt-3">
                        <div class="flex items-center bg-gray-900 rounded-lg p-1 border border-white/10">
                            <button onclick="updateQty(${item.id}, -1)" class="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition text-xs"><i class="fa-solid fa-minus"></i></button>
                            <span class="text-xs font-bold w-6 text-center text-white">${item.qty}</span>
                            <button onclick="updateQty(${item.id}, 1)" class="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition text-xs"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>
                
                <div class="text-right flex flex-col justify-between items-end h-full">
                    <div class="font-bold text-green-400 text-sm">৳${itemTotal}</div>
                    <button onclick="removeFromCart(${item.id})" class="w-6 h-6 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 flex items-center justify-center transition border border-red-500/10 mt-2">
                        <i class="fa-solid fa-trash-can text-xs"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    totalEl.innerText = '৳' + total;
}

function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += change;
    if (item.qty <= 0) {
        removeFromCart(id);
    } else {
        renderCartItems();
        updateCartIcon();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCartItems();
    updateCartIcon();
}

function updateCartIcon() {
    const total = cart.reduce((acc, item) => acc + item.qty, 0);
    const countBadges = document.querySelectorAll('#cart-count, #mobile-cart-count');

    countBadges.forEach(badge => {
        badge.textContent = total;
        if (total > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    });
}

function processCheckout() {
    if (cart.length === 0) {
        showToast("Cart is empty!");
        return;
    }

    const phone = "8801733919156";
    let message = "হ্যালো আখি পোল্ট্রি ফার্ম, আমি অর্ডার করতে চাই:\n\n";
    let total = 0;

    cart.forEach(item => {
        message += `▪ ${item.name} - ${item.qty}${item.unit} (৳${item.price * item.qty})\n`;
        total += item.price * item.qty;
    });

    message += `\n*মোট অর্ডার মূল্য: ৳${total}*`;
    message += `\n\nঅনুগ্রহ করে ডেলিভারি কনফার্ম করুন।`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Toast Notification
function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-24 right-5 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl z-[100] animate-bounce flex items-center gap-2';
    toast.innerHTML = `<i class="fa-solid fa-check-circle text-green-400"></i> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Order Tracking (Mock)
function trackOrder() {
    const id = document.getElementById('order-id-input').value;
    const result = document.getElementById('tracking-result');
    if (!id) {
        result.innerHTML = `<p class="text-red-500 text-sm mt-2">Please enter an Order ID</p>`;
        return;
    }

    result.innerHTML = `<div class="text-green-600 font-bold mt-2"><i class="fa-solid fa-spinner fa-spin"></i> Checking status...</div>`;

    setTimeout(() => {
        const statuses = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        result.innerHTML = `<div class="bg-green-50 border border-green-200 p-4 rounded-lg mt-2 animate-pulse">
            <h4 class="font-bold text-green-800 flex items-center gap-2"><i class="fa-solid fa-box"></i> Order #${id} Found</h4>
            <div class="mt-2 space-y-1">
                <p class="text-sm text-gray-600">Status: <span class="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-bold uppercase">${randomStatus}</span></p>
                <p class="text-sm text-gray-600">Location: Shibganj Hub</p>
                <p class="text-sm text-gray-600">Est. Delivery: Today, 5:00 PM</p>
            </div>
        </div>`;
    }, 1500);
}

// --- Smart AI Chatbot Logic ---

const SmartChat = {
    isOpen: false,
    history: [],
    context: null, // 'chicken', 'feed', 'delivery' etc.

    // Knowledge Base
    responses: {
        greetings: ["আসসালামু আলাইকুম! আপনাকে কীভাবে সাহায্য করতে পারি?", "হ্যালো! তাজা মুরগি খুঁজছেন?", "স্বাগতম! আখি পোল্ট্রি ফার্মে আপনাকে স্বাগতম।"],
        price: "আজকের দর:\n• সোনালী রোস্ট: ৳৩৪০/কেজি\n• সোনালী লাইভ: ৳৩২০/কেজি\n• ব্রয়লার: ৳১৮০/কেজি\n• ফিড: শুরু ৳৩৩০০/ব্যাগ থেকে।",
        location: "আমাদের অবস্থান: **জালমাছমারি, শিবগঞ্জ, চাঁপাইনবাবগঞ্জ**। আপনি আমাদের খামারে আমন্ত্রিত!",
        delivery: "আমরা শিবগঞ্জ সদর এলাকায় **হোম ডেলিভারি** দিয়ে থাকি। \n• ১০ কেজির বেশি অর্ডারে ডেলিভারি ফ্রি।\n• সাধারণত ২ ঘন্টার মধ্যে ডেলিভারি করা হয়।",
        contact: "আমাদের সাথে সরাসরি যোগাযোগ করুন: **01737-451342** অথবা **01746-735372** নাম্বারে।",
        feed: "আমাদের কাছে উন্নত মানের ফিড আছে:\n• সোনালী স্টার্টার\n• সোনালী গ্রোয়ার\n• ব্রয়লার স্টার্টার/গ্রোয়ার।\nদাম প্রতি ব্যাগ ৩৩০০-৩৫০০ টাকার মধ্যে।",
        stock: "আমাদের স্টক প্রতিদিন আপডেট হয়। বর্তমানে আমাদের কাছে ৪০ কেজি সোনালী রোস্ট, ৬০ কেজি সোনালী লাইভ এবং ১৫০ কেজি ব্রয়লার আছে।",
        fallback: "আমি ঠিক বুঝতে পারছি না। আপনি কি আমাদের প্রতিনিধির সাথে কথা বলতে চান? কল করুন 01737-451342 নাম্বারে।"
    },

    quickReplies: [
        { text: "🐓 মুরগির দাম জানুন", action: "price" },
        { text: "🚚 ডেলিভারি তথ্য", action: "delivery" },
        { text: "📍 খামারের অবস্থান", action: "location" },
        { text: "💊 ওষুধের তালিকা", action: "medicine" }
    ],

    init() {
        this.renderQuickReplies();
    },

    toggle() {
        const ui = document.getElementById('chatbot-ui');
        const btnIcon = document.querySelector('#chat-toggle-btn i');

        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            ui.classList.remove('translate-y-[120%]');
            ui.classList.add('translate-y-0', 'opacity-100');
            if (this.history.length === 0) this.scrollToBottom();
        } else {
            ui.classList.add('translate-y-[120%]');
            ui.classList.remove('translate-y-0', 'opacity-100');
        }
    },

    restart() {
        const msgBox = document.getElementById('chat-messages');
        msgBox.innerHTML = `
            <div class="text-center text-xs text-gray-400 my-4">Chat Started</div>
            <div class="flex gap-3">
                 <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 border border-green-200 flex-shrink-0 text-xs"><i class="fa-solid fa-robot"></i></div>
                 <div class="space-y-1 max-w-[85%]">
                     <div class="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 text-sm text-gray-700 shadow-sm animate-fade-in">
                         Assalamu Alaikum! 👋 I am Akhi Farm's AI Assistant.
                     </div>
                 </div>
            </div>`;
        this.history = [];
        this.context = null;
        this.renderQuickReplies();
    },

    handleInput(text) {
        if (!text.trim()) return;

        this.addMessage('user', text);
        this.showTyping();

        // Simulate thinking time (random between 1s and 2s)
        const delay = Math.floor(Math.random() * 1000) + 1000;

        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(text.toLowerCase());
            this.addMessage('bot', response);
        }, delay);
    },

    generateResponse(msg) {
        // Keyword Matching (Simple NLP)
        if (msg.includes('price') || msg.includes('dam') || msg.includes('rate') || msg.includes('cost')) return this.responses.price;
        if (msg.includes('location') || msg.includes('address') || msg.includes('kothay') || msg.includes('where')) return this.responses.location;
        if (msg.includes('delivery') || msg.includes('ship') || msg.includes('pathabo')) return this.responses.delivery;
        if (msg.includes('call') || msg.includes('phone') || msg.includes('number') || msg.includes('contact')) return this.responses.contact;
        if (msg.includes('feed') || msg.includes('khabar')) return this.responses.feed;
        if (msg.includes('stock') || msg.includes('available') || msg.includes('ache')) return this.responses.stock;
        if (msg.includes('salam') || msg.includes('hi') || msg.includes('hello')) return this.responses.greetings[Math.floor(Math.random() * this.responses.greetings.length)];

        // Context Awareness Check
        if (this.context === 'price' && (msg.includes('sonali') || msg.includes('broiler'))) {
            return "Please check the full price list above again. Sonali is 320/kg and Broiler is 180/kg.";
        }

        return this.responses.fallback;
    },

    addMessage(sender, text) {
        const msgBox = document.getElementById('chat-messages');
        const div = document.createElement('div');
        const isUser = sender === 'user';

        div.className = `flex gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-slide-up`;

        div.innerHTML = `
            <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs shadow-sm ${isUser ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600 border border-green-200'}">
                <i class="fa-solid ${isUser ? 'fa-user' : 'fa-robot'}"></i>
            </div>
            <div class="px-4 py-2 rounded-2xl text-sm shadow-sm max-w-[85%] border ${isUser ? 'bg-green-600 text-white rounded-tr-none border-green-600' : 'bg-white text-gray-700 rounded-tl-none border-gray-100'}">
                ${this.parseMarkdown(text)}
            </div>
        `;

        msgBox.appendChild(div);
        this.scrollToBottom();
    },

    showTyping() {
        const msgBox = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.id = 'typing-indicator';
        div.className = 'flex gap-3';
        div.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 border border-green-200 flex-shrink-0 text-xs"><i class="fa-solid fa-robot"></i></div>
            <div class="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-none border border-gray-200 flex items-center gap-1 w-16">
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
        `;
        msgBox.appendChild(div);
        this.scrollToBottom();
    },

    hideTyping() {
        const el = document.getElementById('typing-indicator');
        if (el) el.remove();
    },

    renderQuickReplies() {
        const container = document.getElementById('chat-suggestions');
        container.innerHTML = this.quickReplies.map(r => `
            <button onclick="SmartChat.handleInput('${r.text}')" class="whitespace-nowrap px-3 py-1 bg-white border border-green-200 text-green-700 rounded-full text-xs font-medium hover:bg-green-50 transition shadow-sm mb-1">
                ${r.text}
            </button>
        `).join('');
    },

    scrollToBottom() {
        const msgBox = document.getElementById('chat-messages');
        msgBox.scrollTop = msgBox.scrollHeight;
    },

    parseMarkdown(text) {
        // Simple parser for bold text (**text**)
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    }
};

// Global Functions for HTML Access
function toggleChat() { SmartChat.toggle(); }
function restartChat() { SmartChat.restart(); }
function handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    SmartChat.handleInput(input.value);
    input.value = '';
}

// Init Chat on Load
document.addEventListener('DOMContentLoaded', () => {
    SmartChat.init();
});

// Intersection Observer
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    });

    document.querySelectorAll('.fade-in-section').forEach((section) => {
        observer.observe(section);
    });
}
