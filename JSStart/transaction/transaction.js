document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.item');
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    const payButton = document.getElementById('payButton');
    const resetButton = document.getElementById('resetButton');
    const paymentModal = document.getElementById('paymentModal');
    const closeModal = document.querySelector('.close');
    const confirmPaymentButton = document.getElementById('confirmPayment');
    const paymentAmountInput = document.getElementById('paymentAmount');

    let cart = [];
    let total = 0;

    // Add to cart button event listeners
    items.forEach(item => {
        const addToCartBtn = item.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => {
            const itemId = item.getAttribute('data-id');
            const itemName = item.querySelector('h3').textContent;
            const itemPrice = parseFloat(item.querySelector('.item-info p:last-child').textContent.replace('Price: $', ''));

            // Add item to cart
            cart.push({ id: itemId, name: itemName, price: itemPrice });

            // Update cart display
            renderCart();
            // Update total price
            updateTotal();
        });
    });

    // Render cart items
    function renderCart() {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
        });
    }

    // Update total price
    function updateTotal() {
        total = cart.reduce((acc, item) => acc + item.price, 0);
        totalPrice.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Pay button event listener
    payButton.addEventListener('click', () => {
        paymentModal.style.display = 'block';
    });

    // Close payment modal
    closeModal.addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });

    // Confirm payment button
    confirmPaymentButton.addEventListener('click', () => {
        const paymentAmount = parseFloat(paymentAmountInput.value);
        if (!isNaN(paymentAmount) && paymentAmount >= total) {
            const change = paymentAmount - total;
            alert(`Change: $${change.toFixed(2)}\nPayment Successful!`);
            resetCart();
        } else {
            alert('Payment amount insufficient!');
        }
        paymentModal.style.display = 'none';
    });

    // Reset button event listener
    resetButton.addEventListener('click', () => {
        resetCart();
    });

    // Reset cart
    function resetCart() {
        cart = [];
        total = 0;
        renderCart();
        updateTotal();
    }
});
