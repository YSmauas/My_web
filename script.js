// ============================================================================
// פונקציות ממשק משתמש וגלילה
// ============================================================================
function scrollToShop() {
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
}

// סינון פרויקטים לפי קטגוריות
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

// הצגת התראות למשתמש (Toast)
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3500);
}

// באנר תחזוקה
function closeMaintenance() {
    const banner = document.getElementById('maintenance-banner');
    if (banner) banner.style.display = 'none';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMaintenance();
});

// ============================================================================
// ניהול מודאל (Modal) וטעינת מודלים (JSON)
// ============================================================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show'); // הפעלת אנימציית פתיחה
    }
    
    // טעינת מודלים אם עדיין לא נטענו
    const selectElement = document.getElementById('model-select');
    if (selectElement && selectElement.options.length <= 1) {
        loadModels();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
    }
}

// סגירת מודאל בלחיצה על הרקע הכהה
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        event.target.classList.remove('show');
    }
};

// בדיקות בטיחות לקישורים
function isSafeUrl(url) {
    return typeof url === 'string' && /^https?:\/\//i.test(url);
}

function isImageUrl(url) {
    return typeof url === 'string' && /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(url);
}

// טעינת דגמי לוגו מקובץ JSON החיצוני
async function loadModels() {
    try {
        const response = await fetch('Download/logo-models.json');
        if (!response.ok) throw new Error('נכשלה טעינת קובץ הדגמים');
        const models = await response.json();
        
        const selectElement = document.getElementById('model-select');
        if (!selectElement) return;
        selectElement.innerHTML = '';

        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'בחר דגם...';
        selectElement.appendChild(placeholder);

        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.file || ''; 
            if (model.preview) option.dataset.preview = model.preview;
            if (model.id) option.dataset.id = model.id;
            
            // הגדרת ברירת מחדל
            if (model.id === 'kosher-dark') option.selected = true;
            option.textContent = model.name || 'דגם';
            
            selectElement.appendChild(option);
        });

        // האזנה לשינוי בחירה בתיבה
        selectElement.addEventListener('change', updatePreviewImage);

        const downloadBtn = document.getElementById('btn-download');
        if (downloadBtn && !downloadBtn.dataset.listenerAdded) {
            downloadBtn.addEventListener('click', function (e) {
                const href = this.href;
                if (!href) return;
                e.preventDefault();
                window.open(href, '_blank');
            });
            downloadBtn.dataset.listenerAdded = '1';
        }

        updatePreviewImage(); // קריאה ראשונית לעדכון תצוגה
    } catch (error) {
        console.error('שגיאה בטעינת דגמים:', error);
    }
}

// עדכון התמונה וכפתור ההורדה לפי המודל שנבחר
function updatePreviewImage() {
    const selectElement = document.getElementById('model-select');
    const previewImage = document.getElementById('modal-preview-img');
    const downloadBtn = document.getElementById('btn-download');
    
    if (!selectElement || !previewImage || !downloadBtn) return;

    const selectedOption = selectElement.selectedOptions[0];
    if (!selectedOption || !selectedOption.value) {
        previewImage.removeAttribute('src');
        downloadBtn.removeAttribute('href');
        return;
    }

    const fileUrl = String(selectedOption.value);
    const previewUrl = selectedOption.dataset.preview || '';

    // החלפת תמונה
    if (previewUrl && isImageUrl(previewUrl)) {
        previewImage.src = previewUrl;
        previewImage.alt = selectedOption.textContent;
    } else if (isImageUrl(fileUrl)) {
        previewImage.src = fileUrl;
        previewImage.alt = selectedOption.textContent;
    } else {
        previewImage.removeAttribute('src');
    }

    // הגדרת קישור להורדה
    if (isSafeUrl(fileUrl)) {
        downloadBtn.href = fileUrl;
        downloadBtn.setAttribute('download', '');
    } else {
        downloadBtn.removeAttribute('href');
    }
}

function addLike() {
    const likesElement = document.getElementById('likes-count');
    if (likesElement) {
        likesElement.innerText = parseInt(likesElement.innerText) + 1;
    }
}

// ============================================================================
// מאזינים לאירועים (Event Listeners) - נטען בטעינת העמוד
// ============================================================================
document.addEventListener('click', (e) => {
    // זיהוי לחיצות על אלמנטים עם תכונת data-action
    const target = e.target.closest('[data-action]');
    if (target) {
        const action = target.dataset.action;
        switch (action) {
            case 'scroll-to-shop': scrollToShop(); break;
            case 'open-modal': openModal(target.dataset.modal); break;
            case 'close-modal': closeModal(target.dataset.modal); break;
            case 'add-like': addLike(); break;
            case 'close-maintenance': closeMaintenance(); break;
        }
    }

    // זיהוי לחיצות על כפתורי סינון קטגוריות
    const filterBtn = e.target.closest('.filter-btn[data-filter]');
    if (filterBtn) {
        filterProducts(filterBtn.dataset.filter, filterBtn);
    }
});

// הגדרת תמונת גיבוי במקרה של שגיאת טעינה
document.addEventListener('error', (e) => {
    const img = e.target;
    if (img.tagName === 'IMG' && img.dataset.fallback && img.src !== img.dataset.fallback) {
        img.src = img.dataset.fallback;
    }
}, true);


// ============================================================================
// מנגנון שליחת טופס יצירת קשר ב-AJAX (אוחד לכאן מ-contact-form-ajax.js)
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 האתר החדש והמודרני נטען בהצלחה!');

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : null;

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // בדיקת תקינות
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';
            }

            const formData = new FormData(contactForm);

            try {
                const resp = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (resp.ok) {
                    showNotification('✓ ההודעה נשלחה בהצלחה!');
                    contactForm.reset();
                } else {
                    showNotification('❌ אירעה שגיאה בשליחת ההודעה.');
                }
            } catch (networkErr) {
                console.error('Contact submit failed', networkErr);
                showNotification('❌ שגיאת תקשורת, אנא בדוק את החיבור לרשת.');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            }
        });
    }
});
// --- AI widget iframe resize (postMessage from ai-widget.html) ---
// כשהצ'אט בתוך ה-iframe נפתח/נסגר, ai-widget.html שולח הודעה לכאן,
// ואנחנו מגדילים/מקטינים את ה-iframe עצמו כדי שהפאנל לא ייחתך
// וכדי שלא יחסום קליקים בשאר העמוד כשהוא סגור.
window.addEventListener('message', (event) => {
    if (!event.data || event.data.type !== 'ai-widget-resize') return;
    const frame = document.getElementById('ai-widget-frame');
    if (!frame) return;
    frame.classList.toggle('widget-open', !!event.data.open);
});
