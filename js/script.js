// === DATA DUMMY MENU AYAM GEPREK ===
const menuData = [
    {
        id: 1,
        nama: "Geprek Original",
        kategori: "original",
        harga: 15000,
        level: "Sedang",
        deskripsi: "Ayam geprek klasik sambal bawang",
        gambar: "🍗"
    },
    {
        id: 2,
        nama: "Geprek Setan",
        kategori: "pedas",
        harga: 18000,
        level: "Sangat Pedas",
        deskripsi: "Level maksimal untuk pecinta tantangan",
        gambar: "🔥"
    },
    {
        id: 3,
        nama: "Geprek Mozzarella",
        kategori: "premium",
        harga: 22000,
        level: "Sedang",
        deskripsi: "Gurih keju mozzarella meleleh",
        gambar: "🧀"
    },
    {
        id: 4,
        nama: "Geprek Matah",
        kategori: "original",
        harga: 17000,
        level: "Pedas",
        deskripsi: "Sambal matah khas Bali segar",
        gambar: "🥬"
    },
    {
        id: 5,
        nama: "Geprek Sambal Ijo",
        kategori: "pedas",
        harga: 19000,
        level: "Pedas",
        deskripsi: "Sambal hijau padang autentik",
        gambar: "🫑"
    },
    {
        id: 6,
        nama: "Geprek Truffle",
        kategori: "premium",
        harga: 28000,
        level: "Ringan",
        deskripsi: "Sentuhan minyak truffle mewah",
        gambar: "🍄"
    }
];

// === MOBILE MENU TOGGLE ===
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // === RENDER KATALOG (hanya di halaman katalog) ===
    if (document.getElementById('productGrid')) {
        renderProducts(menuData);
        
        // Event listener untuk filter
        const filterKategori = document.getElementById('filterKategori');
        const filterHarga = document.getElementById('filterHarga');
        
        filterKategori.addEventListener('change', applyFilters);
        filterHarga.addEventListener('change', applyFilters);
    }

    // === BOOKING FORM HANDLING ===
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        // Set minimum date to today
        const dateInput = document.getElementById('tanggal');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
        
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
});

// === RENDER PRODUCTS ===
function renderProducts(products) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    
    if (products.length === 0) {
        grid.innerHTML = '<p class="no-results">Tidak ada menu yang sesuai filter.</p>';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="card">
            <div class="card-image placeholder-img">${product.gambar}</div>
            <div class="card-body">
                <h3>${product.nama}</h3>
                <p>${product.deskripsi}</p>
                <span class="price">Rp ${product.harga.toLocaleString('id-ID')}</span>
                <span class="level">Level: ${product.level}</span>
                <a href="detail.html#booking" class="btn btn-outline" style="margin-top: 12px; width: 100%;">Pesan</a>
            </div>
        </div>
    `).join('');
}

// === APPLY FILTERS ===
function applyFilters() {
    const kategoriFilter = document.getElementById('filterKategori').value;
    const hargaFilter = document.getElementById('filterHarga').value;
    
    let filtered = menuData.filter(item => {
        // Filter kategori
        if (kategoriFilter !== 'semua' && item.kategori !== kategoriFilter) {
            return false;
        }
        
        // Filter harga
        if (hargaFilter !== 'semua') {
            if (hargaFilter === 'murah' && item.harga >= 18000) return false;
            if (hargaFilter === 'sedang' && (item.harga < 18000 || item.harga > 25000)) return false;
            if (hargaFilter === 'mahal' && item.harga <= 25000) return false;
        }
        
        return true;
    });
    
    renderProducts(filtered);
}

// === BOOKING FORM SUBMISSION ===
function handleBookingSubmit(event) {
    event.preventDefault();
    
    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const paket = document.getElementById('paket').value;
    const tanggal = document.getElementById('tanggal').value;
    
    // Validasi
    if (!nama || !email || !paket || !tanggal) {
        alert('Mohon lengkapi semua field yang diperlukan.');
        return;
    }
    
    // Validasi email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Mohon masukkan alamat email yang valid.');
        return;
    }
    
    // Validasi tanggal (tidak boleh masa lalu)
    const selectedDate = new Date(tanggal);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('Tanggal tidak boleh di masa lalu.');
        return;
    }
    
    // Sukses
    alert(`✅ Booking Berhasil!\n\nTerima kasih ${nama}!\n\nDetail Booking:\n📦 ${paket}\n📅 ${tanggal}\n📧 Konfirmasi akan dikirim ke ${email}\n\nSilakan datang sesuai jadwal.`);
    
    // Reset form
    document.getElementById('bookingForm').reset();
}
