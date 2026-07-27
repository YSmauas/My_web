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

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 האתר שלך טוען בהצלחה!');
});

// --- פונקציות עבור החלון הקופץ של ה-M36 ---

async function loadModels() {
  try {
    const response = await fetch('Download/logo-models.json');
    if (!response.ok) throw new Error('שגיאת רשת במשיכת הקובץ');
    
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
    console.error("שגיאה בטעינה:", error);
    const selectElement = document.getElementById('model-select');
    selectElement.innerHTML = '<option value="">שגיאה - הקובץ לא נמצא</option>';
  }
}

function updatePreviewImage() {
  const selectElement = document.getElementById('model-select');
  const previewImage = document.getElementById('modal-preview-img');
  const downloadBtn = document.getElementById('btn-download');
  
  if (selectElement.value) {
    previewImage.src = selectElement.value; 
    downloadBtn.href = selectElement.value; 
  }
}

function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
  
  const selectElement = document.getElementById('model-select');
  if (selectElement && selectElement.options.length <= 1) {
    loadModels();
  }
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
}

function addLike() {
  let likesElement = document.getElementById('likes-count');
  likesElement.innerText = parseInt(likesElement.innerText) + 1;
}

document.getElementById('btn-download').addEventListener('click', function() {
    showNotification('✓ ההורדה החלה בהצלחה!');
});
