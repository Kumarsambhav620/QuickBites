document.addEventListener("DOMContentLoaded", function () {
  const radios = document.querySelectorAll('input[name="payment-method"]');
  const methodSections = document.querySelectorAll('.payment-method-details');
  
  // Show the default selected method on load
  const defaultMethod = document.querySelector('input[name="payment-method"]:checked').value;
  document.getElementById(defaultMethod).classList.remove('hidden');

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      methodSections.forEach(section => section.classList.add('hidden'));
      const selected = radio.value;
      document.getElementById(selected).classList.remove('hidden');
    });
  });

  document.getElementById('payment-form').addEventListener('submit', function (e) {
    e.preventDefault();
    this.style.display = 'none';
    document.getElementById('thank-you-message').classList.remove('hidden');
  });
});
