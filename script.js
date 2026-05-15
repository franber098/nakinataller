document.addEventListener('DOMContentLoaded', () => {
    /* --- CUSTOM CURSOR --- */
    const cursorMain = document.getElementById('cursor-main');
    const cursorFollower = document.getElementById('cursor-follower');

    document.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        
        cursorMain.style.left = `${x}px`;
        cursorMain.style.top = `${y}px`;

        cursorFollower.animate({
            left: `${x}px`,
            top: `${y}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Expand cursor on interactive elements
    const clickables = document.querySelectorAll('a, button, input, textarea, .gallery-item');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
            cursorFollower.style.borderColor = 'rgba(163, 177, 138, 0.6)';
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursorFollower.style.borderColor = 'rgba(163, 177, 138, 0.3)';
        });
    });

    /* --- MODAL LOGIC (INSCRIPCIONES) --- */
    const modal = document.getElementById('enroll-modal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtn = document.getElementById('btn-close-modal');
    const gotoFormBtn = document.getElementById('btn-goto-form');

    if (modal) {
        const openModal = () => {
            modal.classList.add('active');
            document.body.classList.add('body-blur');
        };

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.classList.remove('body-blur');
        };

        openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
        closeModalBtn.addEventListener('click', closeModal);

        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // "Ir al formulario" logic
        gotoFormBtn.addEventListener('click', () => {
            closeModal();
            const contactSection = document.getElementById('contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                // Optional: focus first input
                const firstInput = contactSection.querySelector('input');
                if (firstInput) setTimeout(() => firstInput.focus(), 800);
            }
        });
    }

    /* --- FOOTER FORM LOGIC --- */
    const footerForm = document.getElementById('footer-unlock-form');
    const successMsg = document.getElementById('form-success-msg');

    if (footerForm) {
        footerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simular envío
            footerForm.style.opacity = '0.3';
            footerForm.style.pointerEvents = 'none';
            
            setTimeout(() => {
                footerForm.style.display = 'none';
                if (successMsg) {
                    successMsg.style.display = 'block';
                    successMsg.classList.add('animate-fade-in');
                }
            }, 1000);
        });
    }

    /* --- ACTIVE NAV LINK --- */
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html'))) {
            link.classList.add('active');
        } else if (href !== 'index.html' && currentPath.includes(href)) {
            link.classList.add('active');
        }
    });

    /* --- GALLERY HOVER OVERLAYS (REFUGIO) --- */
    const galleryItemsRefugio = document.querySelectorAll('.gallery-item');
    if (galleryItemsRefugio.length > 0) {
        galleryItemsRefugio.forEach(item => {
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');
            
            if (title && desc) {
                const infoDiv = document.createElement('div');
                infoDiv.className = 'gallery-hover-info';
                
                const titleEl = document.createElement('h4');
                titleEl.textContent = title;
                
                const descEl = document.createElement('p');
                descEl.textContent = desc;
                
                infoDiv.appendChild(titleEl);
                infoDiv.appendChild(descEl);
                
                item.appendChild(infoDiv);
            }
        });
    }
});
