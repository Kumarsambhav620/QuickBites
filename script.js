let cart = JSON.parse(localStorage.getItem("quickbites-cart")) || [];

function addToCart(itemName, price) {
    const existing = cart.find(item => item.name === itemName);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name: itemName, price: price, qty: 1 });
    }
    saveCart();
    updateCartDisplay();
}

function changeQty(itemName, delta) {
    const item = cart.find(i => i.name === itemName);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.name !== itemName);
    }
    saveCart();
    updateCartDisplay();
}

function removeItem(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    saveCart();
    updateCartDisplay();
}

function saveCart() {
    localStorage.setItem("quickbites-cart", JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartList = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total');
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${item.name}</strong><br>
            ₹${item.price} x ${item.qty} = ₹${item.price * item.qty}<br>
            <button onclick="changeQty('${item.name}', -1)">-</button>
            <button onclick="changeQty('${item.name}', 1)">+</button>
            <button onclick="removeItem('${item.name}')">Remove</button>
        `;
        cartList.appendChild(li);
    });

    totalDisplay.textContent = total;
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Order placed successfully!");
    cart = [];
    saveCart();
    updateCartDisplay();
}

// Display cart on page load
updateCartDisplay();
