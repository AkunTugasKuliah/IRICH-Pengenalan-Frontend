// Pilih elemen-elemen HTML
const itemList = document.getElementById('item-list');
const orderSummary = document.getElementById('order-summary');
const resetButton = document.getElementById('reset-btn');
const payButton = document.getElementById('pay-btn');
const subtotalElement = document.getElementById('subtotal');

let cart = []; // Array untuk menyimpan item yang dipilih

// Event listener untuk menambahkan item ke keranjang saat diklik
itemList.addEventListener('click', function(event) {
    const item = event.target.closest('.item-clickable');
    if (!item) return;

    const itemId = item.getAttribute('data-id');
    const itemName = item.querySelector('h3').textContent;
    const itemPrice = parseFloat(item.querySelector('p:last-child').textContent.split('Rp ')[1].replace('.', ''));

    addToCart(itemId, itemName, itemPrice);
});

// Fungsi untuk menambahkan item ke keranjang
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCartUI();
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCartUI() {
    orderSummary.innerHTML = ''; // Hapus item sebelumnya di keranjang

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} x ${item.quantity}</p>
            <p>Rp ${item.price * item.quantity}</p>
        `;
        orderSummary.appendChild(itemElement);
    });

    // Perbarui subtotal
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    subtotalElement.textContent = `Subtotal: Rp ${subtotal}`;
}

// Event listener untuk tombol reset
resetButton.addEventListener('click', function() {
    cart = []; // Kosongkan array keranjang
    updateCartUI();
});

// Event listener untuk tombol bayar
payButton.addEventListener('click', function() {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const paidAmount = parseFloat(prompt(`Total belanja Anda Rp ${total}. Masukkan jumlah uang yang dibayarkan:`));

    if (paidAmount >= total) {
        const change = paidAmount - total;
        alert(`Terima kasih atas pembayaran Anda. Kembalian Anda Rp ${change}.`);
        cart = []; // Kosongkan array keranjang setelah pembayaran berhasil
        updateCartUI();
    } else {
        alert('Maaf, uang yang Anda masukkan kurang.');
    }
});