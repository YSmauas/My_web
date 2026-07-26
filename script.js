function scrollToShop() {
    document.getElementById('shop').scrollIntoView({behavior: 'smooth'});
}

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}

function downloadProduct(filename) {
    showNotification(`✓ הופעלה הורדה של ${filename}`);
    console.log(`Downloading: ${filename}`);
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Create message object
    const contactMessage = {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Show success message
    showNotification('✓ ההודעה נשלחה בהצלחה! בדוק בלוח הניהול');
    form.reset();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 האתר שלך טוען בהצלחה!');
});
