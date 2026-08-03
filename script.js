// --- Smooth Scroll & Navigation ---
function scrollToShop() {
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
}

// --- Product Filtering ---
function filterProducts(category, buttonElement) {
    const products = document.querySelectorAll('.product-card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => btn.classList.remove('active'));
    if (buttonElement) {
        buttonElement.classList.add('active');
    }

    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}

// --- Product Downloads ---
function downloadProduct(filename) {
    showNotification(`✓ ההורדה עבור ${filename} הופעלה בהצלחה`);
    console.log(`Downloading file: ${filename}`);
}

// --- Notification Toast ---
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3500);
}

// --- Maintenance Banner ---
function closeMaintenance() {
    const banner = document.getElementById('maintenance-banner');
    if (banner) banner.style.display = 'none';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMaintenance();
});

// --- Modal Handling (M36) ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
    
    const selectElement = document.getElementById('model-select');
    if (selectElement && selectElement.options.length <= 1) {
        loadModels();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// --- M36 Dynamic Models Loader ---
async function loadModels() {
    try {
        const response = await fetch('Download/logo-models.json');
        if (!response.ok) throw new Error('נכשלה טעינת קובץ הדגמים');
        
        const models = await response.json();
        const selectElement = document.getElementById('model-select');
        selectElement.innerHTML = ''; 

        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.image;
            option.textContent = model.name;
            selectElement.appendChild(option);
        });

        updatePreviewImage();
        
    } catch (error) {
        console.error("שגיאה בטעינת דגמים:", error);
        const selectElement = document.getElementById('model-select');
        selectElement.innerHTML = '<option value="">שגיאה - הדגמים לא נמצאו</option>';
    }
}

function updatePreviewImage() {
    const selectElement = document.getElementById('model-select');
    const previewImage = document.getElementById('modal-preview-img');
    const downloadBtn = document.getElementById('btn-download');
    
    if (selectElement && selectElement.value) {
        previewImage.src = selectElement.value; 
        downloadBtn.href = selectElement.value; 
    }
}

function addLike() {
    const likesElement = document.getElementById('likes-count');
    if (likesElement) {
        likesElement.innerText = parseInt(likesElement.innerText) + 1;
    }
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 האתר החדש והמודרני נטען בהצלחה!');
});
