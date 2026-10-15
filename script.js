// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    /* Páginas reais do produto usadas na galeria interna */
    const previewSources = [
        'assets/images/internas/acao-01-pneumonia.jpg',
        'assets/images/internas/acao-11-timpanismo.jpg',
        'assets/images/internas/acao-24-diarreia-neonatal.jpg',
        'assets/images/internas/acao-41-mastite-clinica.jpg',
        'assets/images/internas/acao-53-dermatite-digital.jpg',
        'assets/images/internas/acao-61-hipocalcemia.jpg',
        'assets/images/internas/acao-77-leptospirose.jpg',
        'assets/images/internas/acao-91-estresse-termico.jpg'
    ];

    document.querySelectorAll('.marquee-track').forEach((track, rowIndex) => {
        const orderedSources = rowIndex % 2 === 0
            ? previewSources
            : [...previewSources].reverse();
        // Duas voltas dentro de cada grupo garantem cobertura em monitores largos.
        const continuousSequence = [...orderedSources, ...orderedSources];
        const fragment = document.createDocumentFragment();

        track.replaceChildren();

        for (let groupIndex = 0; groupIndex < 2; groupIndex += 1) {
            const group = document.createElement('div');
            group.className = 'marquee-group';
            group.setAttribute('aria-hidden', groupIndex === 1 ? 'true' : 'false');

            continuousSequence.forEach((source, imageIndex) => {
                const slide = document.createElement('button');
                slide.type = 'button';
                slide.className = 'demo-slide is-local-preview';
                slide.setAttribute('aria-label', `Ampliar página demonstrativa ${imageIndex + 1}`);

                const image = document.createElement('img');
                image.src = source;
                image.alt = 'Página demonstrativa do material';
                image.decoding = 'async';
                image.draggable = false;

                slide.appendChild(image);
                slide.addEventListener('click', () => window.openLightbox(source));
                group.appendChild(slide);
            });

            fragment.appendChild(group);
        }

        track.appendChild(fragment);
    });

    /* ==========================================================================
       DEPOIMENTOS REAIS EM CARROSSEL INFINITO
       ========================================================================== */
    const testimonialImages = Array.from({ length: 15 }, (_, index) => ({
        src: `assets/images/depoimentos/depoimento-whatsapp-${String(index + 1).padStart(2, '0')}.png`,
        alt: `Depoimento real de cliente ${index + 1}`
    }));
    const testimonialsTrack = document.getElementById('testimonials-track');

    const createTestimonialCard = (item, isDuplicate) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'testimonial-card';
        card.setAttribute('aria-label', `Ampliar ${item.alt.toLowerCase()}`);
        if (isDuplicate) card.tabIndex = -1;

        const image = document.createElement('img');
        image.src = item.src;
        image.alt = item.alt;
        image.loading = 'lazy';
        image.decoding = 'async';
        image.draggable = false;

        card.appendChild(image);
        card.addEventListener('click', () => window.openLightbox(item.src, item.alt));
        return card;
    };

    if (testimonialsTrack) {
        const fragment = document.createDocumentFragment();

        for (let groupIndex = 0; groupIndex < 2; groupIndex += 1) {
            const group = document.createElement('div');
            const isDuplicate = groupIndex === 1;
            group.className = 'testimonials-group';
            group.setAttribute('aria-hidden', isDuplicate ? 'true' : 'false');
            testimonialImages.forEach(item => group.appendChild(createTestimonialCard(item, isDuplicate)));
            fragment.appendChild(group);
        }

        testimonialsTrack.replaceChildren(fragment);
    }

    /* ==========================================================================
       NOTIFICAÇÕES DE COMPRAS RECENTES
       Os registros iniciais vêm de purchases.js. Novas vendas também podem ser
       adicionadas por window.addPurchaseNotification(...) ou pelo evento
       purchase:confirmed, sem precisar recarregar a página.
       ========================================================================== */
    const offerNotices = [
        {
            icon: '⚡',
            title: 'Acesso liberado após a aprovação',
            message: 'Receba o material digital por e-mail.',
            meta: 'ACESSO IMEDIATO'
        },
        {
            icon: '7',
            title: 'Você tem 7 dias de garantia',
            message: 'Conheça o conteúdo com tranquilidade.',
            meta: 'COMPRA SEGURA'
        },
        {
            icon: '+',
            title: 'Plano Completo com bônus',
            message: 'Leve 3 materiais extras e o certificado.',
            meta: 'MELHOR ESCOLHA'
        },
        {
            icon: '∞',
            title: 'Consulte sempre que precisar',
            message: 'Use no celular, tablet ou computador.',
            meta: 'ACESSO VITALÍCIO'
        }
    ];
    const configuredPurchases = Array.isArray(window.RECENT_PURCHASES)
        ? window.RECENT_PURCHASES.filter(item => item && item.name && item.product)
        : [];
    const notificationQueue = configuredPurchases.length
        ? [...configuredPurchases]
        : [...offerNotices];
    const purchaseToast = document.getElementById('purchase-toast');
    const purchaseToastIcon = document.getElementById('purchase-toast-icon');
    const purchaseToastTitle = document.getElementById('purchase-toast-title');
    const purchaseToastMessage = document.getElementById('purchase-toast-message');
    const purchaseToastMeta = document.getElementById('purchase-toast-meta');
    const purchaseToastClose = document.getElementById('purchase-toast-close');
    const formatBRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    let notificationCursor = 0;
    let toastHideTimer;
    let toastStartTimer;
    let toastInterval;
    let notificationsDismissed = false;

    const showOfferNotification = (notice) => {
        if (!purchaseToast || notificationsDismissed || !notice) return;

        const isVerifiedPurchase = Boolean(notice.name && notice.product);
        purchaseToastIcon.textContent = isVerifiedPurchase ? '✓' : (notice.icon || '•');
        purchaseToastTitle.textContent = isVerifiedPurchase
            ? notice.name + ' comprou o ' + notice.product
            : notice.title;
        purchaseToastMessage.textContent = isVerifiedPurchase
            ? notice.location
            : notice.message;
        purchaseToastMeta.textContent = isVerifiedPurchase
            ? [
                typeof notice.price === 'number' ? formatBRL.format(notice.price) : String(notice.price || ''),
                notice.time || 'Compra recente'
            ].filter(Boolean).join(' • ')
            : notice.meta;

        purchaseToast.classList.add('is-visible');
        window.clearTimeout(toastHideTimer);
        toastHideTimer = window.setTimeout(() => {
            purchaseToast.classList.remove('is-visible');
        }, 5600);
    };

    const showNextNotification = () => {
        if (!notificationQueue.length) return;
        const notice = notificationQueue[notificationCursor % notificationQueue.length];
        notificationCursor += 1;
        showOfferNotification(notice);
    };

    if (purchaseToast && notificationQueue.length) {
        toastStartTimer = window.setTimeout(showNextNotification, 2500);
        toastInterval = window.setInterval(showNextNotification, 11000);
    }

    if (purchaseToastClose) {
        purchaseToastClose.addEventListener('click', () => {
            notificationsDismissed = true;
            purchaseToast.classList.remove('is-visible');
            window.clearTimeout(toastHideTimer);
            window.clearTimeout(toastStartTimer);
            window.clearInterval(toastInterval);
        });
    }

    window.addPurchaseNotification = (purchase) => {
        if (!purchase || !purchase.name || !purchase.product) return;
        notificationsDismissed = false;

        notificationQueue.push(purchase);
        showOfferNotification(purchase);
    };

    window.addEventListener('purchase:confirmed', (event) => {
        window.addPurchaseNotification(event.detail);
    });
    
    /* ==========================================================================
       FAQ ACCORDION INTERACTIVITY
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const currentItem = question.parentElement;
            
            // Check if current item is already active
            const isActive = currentItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle active state for clicked item
            if (!isActive) {
                currentItem.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       UPSELL POPUP LOGIC
       ========================================================================== */
    const btnComprarBasico = document.getElementById('btn-comprar-basico');
    const btnComprarCompleto = document.getElementById('btn-comprar-completo');
    
    const upsellModal = document.getElementById('upsell-modal');
    const btnCloseUpsell = document.getElementById('btn-close-upsell');
    const btnUpsellAccept = document.getElementById('btn-upsell-accept');
    const btnUpsellDecline = document.getElementById('btn-upsell-decline');

    // Open Upsell Modal on click of Basic Plan button
    if (btnComprarBasico) {
        btnComprarBasico.addEventListener('click', (e) => {
            e.preventDefault();
            upsellModal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        });
    }

    const checkoutUrls = {
        planoCompleto: 'https://pay.cakto.com.br/35x7dv8_1151805',
        planoBasico: 'https://pay.cakto.com.br/35juzto_1151899',
        planoCompletoPromocional: 'https://pay.cakto.com.br/35juzto_1151899'
    };

    if (btnComprarCompleto) {
        btnComprarCompleto.addEventListener('click', () => {
            window.location.assign(checkoutUrls.planoCompleto);
        });
    }

    // Modal Action: Close
    const closeUpsell = () => {
        upsellModal.classList.remove('open');
        document.body.style.overflow = ''; // Restore background scrolling
    };

    if (btnCloseUpsell) btnCloseUpsell.addEventListener('click', closeUpsell);
    if (btnUpsellDecline) btnUpsellDecline.addEventListener('click', () => {
        closeUpsell();
        window.location.assign(checkoutUrls.planoBasico);
    });

    // Modal Action: Accept Upsell
    if (btnUpsellAccept) {
        btnUpsellAccept.addEventListener('click', () => {
            closeUpsell();
            window.location.assign(checkoutUrls.planoCompletoPromocional);
        });
    }

    // Close Modal on clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === upsellModal) {
            closeUpsell();
        }
    });

    /* ==========================================================================
       LIGHTBOX / CASE DETAILS MODAL
       ========================================================================== */
    const lightboxModal = document.getElementById('lightbox-modal');
    const btnCloseLightbox = document.getElementById('btn-close-lightbox');
    
    const lightboxCaseId = document.getElementById('lightbox-case-id');
    const lightboxCaseTitle = document.getElementById('lightbox-case-title');
    const lightboxCaseDesc = document.getElementById('lightbox-case-desc');
    const lightboxSimBg = document.getElementById('lightbox-case-sim-bg');
    const lightboxPointer = document.getElementById('lightbox-case-pointer');
    const lightboxCallout = document.getElementById('lightbox-case-callout');

    // Global function to be called from inline onclick events
    window.openLightbox = (imgUrl, altText = 'Imagem ampliada') => {
        const fullImg = document.getElementById('lightbox-full-img');
        if (fullImg) {
            fullImg.src = imgUrl;
            fullImg.alt = altText;
        }
        lightboxModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightboxModal.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (btnCloseLightbox) btnCloseLightbox.addEventListener('click', closeLightbox);
    
    window.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    function simulateCheckout(planName, price) {
        // Log to console for debugging/verification
        console.log(`[Checkout Triggered] Plano: ${planName} | Preço: R$ ${price.toFixed(2)}`);
        
        // Show interactive notice to user
        const message = `✨ [Simulação de Checkout]\n\nVocê escolheu o "${planName}" por R$ ${price.toFixed(2)}.\n\nEm ambiente de produção, aqui o usuário seria redirecionado para a plataforma de pagamento (Hotmart, Kiwify, etc.).`;
        alert(message);
    }

    /* ==========================================================================
       DYNAMIC COUNTDOWN TIMER (EVERGREEN & PERSISTENT)
       ========================================================================== */
    const hoursVal = document.getElementById('hours');
    const minutesVal = document.getElementById('minutes');
    const secondsVal = document.getElementById('seconds');

    const sHoursVal = document.getElementById('scarcity-hours');
    const sMinutesVal = document.getElementById('scarcity-minutes');
    const sSecondsVal = document.getElementById('scarcity-seconds');

    if ((hoursVal && minutesVal && secondsVal) || (sHoursVal && sMinutesVal && sSecondsVal)) {
        const timerDurationSeconds = (76 * 60) + 2; // 1h 16m 02s = 4562s
        
        let deadline = localStorage.getItem('pricing_countdown_deadline');
        
        // If deadline is not set or is corrupted, set a new one
        if (!deadline || isNaN(parseInt(deadline))) {
            const newDeadline = new Date().getTime() + (timerDurationSeconds * 1000);
            localStorage.setItem('pricing_countdown_deadline', newDeadline.toString());
            deadline = newDeadline;
        } else {
            deadline = parseInt(deadline);
        }

        function updateTimer() {
            const now = new Date().getTime();
            let remaining = deadline - now;

            // Reset deadline if it has expired
            if (remaining <= 0) {
                const newDeadline = now + (timerDurationSeconds * 1000);
                localStorage.setItem('pricing_countdown_deadline', newDeadline.toString());
                deadline = newDeadline;
                remaining = timerDurationSeconds * 1000;
            }

            const totalSeconds = Math.floor(remaining / 1000);
            const hrs = Math.floor(totalSeconds / 3600);
            const mins = Math.floor((totalSeconds % 3600) / 60);
            const secs = totalSeconds % 60;

            const padHrs = hrs.toString().padStart(2, '0');
            const padMins = mins.toString().padStart(2, '0');
            const padSecs = secs.toString().padStart(2, '0');

            // Update main timer
            if (hoursVal) hoursVal.innerText = padHrs;
            if (minutesVal) minutesVal.innerText = padMins;
            if (secondsVal) secondsVal.innerText = padSecs;

            // Update sticky scarcity timer
            if (sHoursVal) sHoursVal.innerText = padHrs;
            if (sMinutesVal) sMinutesVal.innerText = padMins;
            if (sSecondsVal) sSecondsVal.innerText = padSecs;
        }

        // Run immediately once
        updateTimer();
        
        // Update timer every second
        setInterval(updateTimer, 1000);
    }

});
