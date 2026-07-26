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
    showNotification('✓ ההודעה נשלחה בהצלחה!');
    event.target.reset();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 האתר שלך טוען בהצלחה!');
});