let cart = [];

function addToCart(itemName, price) {
  // Check if the item is already in the cart
  let itemIndex = cart.findIndex(item => item.name === itemName);

  if (itemIndex !== -1) {
    // If item already in cart, increase the quantity
    cart[itemIndex].quantity++;
  } else {
    // If item is not in cart, add it
    cart.push({
      name: itemName,
      price: price,
      quantity: 1
    });
  }
  updateCartDisplay();
}

function removeFromCart(itemName) {
  // Find item in cart and remove it
  cart = cart.filter(item => item.name !== itemName);
  updateCartDisplay();
}

function changeQuantity(itemName, change) {
  // Find item in cart and change the quantity
  let itemIndex = cart.findIndex(item => item.name === itemName);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += change;
    if (cart[itemIndex].quantity <= 0) {
      removeFromCart(itemName); // Remove item if quantity goes to 0 or less
    } else {
      updateCartDisplay();
    }
  }
}

function updateCartDisplay() {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  cartList.innerHTML = ''; // Clear the list before updating

  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - ₹${item.price} 
      <button onclick="changeQuantity('${item.name}', -1)">-</button>
      <span> ${item.quantity} </span>
      <button onclick="changeQuantity('${item.name}', 1)">+</button>
      <button onclick="removeFromCart('${item.name}')">Remove</button>`;
    
    cartList.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total;
}

function placeOrder() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  window.location.href = "Address.html";


  cart = [];
  updateCartDisplay();
}
// Function to handle the 'Place Order' click

  