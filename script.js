// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    /* Imagens locais otimizadas da galeria interna */
    const localImageMap = {
        'https://i.ibb.co/Kxh643pG/img1-timpanismo.png': 'assets/images/internas/timpanismo.jpg',
        'https://i.ibb.co/My8gf4tL/img2-diarreia-neonatal.png': 'assets/images/internas/diarreia.jpg',
        'https://i.ibb.co/Bd71hvv/img4-febre-aftosa.png': 'assets/images/internas/febre-aftosa.jpg',
        'https://i.ibb.co/1tQnFLZY/img1-pneumonia.png': 'assets/images/internas/pneumonia.jpg',
        'https://i.ibb.co/B22Z2zv8/img1-carrapato.png': 'assets/images/internas/carrapato.jpg',
        'https://i.ibb.co/WWTLm2NK/img3-leptospirose.png': 'assets/images/internas/leptospirose.jpg',
        'https://i.ibb.co/S4HvQCFc/img1-dermatite-digital.png': 'assets/images/internas/dermatite-digital.jpg',
        'https://i.ibb.co/HL1RzKjg/img4-estresse-termico.png': 'assets/images/internas/estresse-termico.jpg'
    };

    const previewSources = [...new Set(Object.values(localImageMap))];

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
       TESTIMONIALS CAROUSEL
       Use window.CUSTOMER_TESTIMONIALS before this script to provide real reviews.
       ========================================================================== */
    const testimonialTemplates = [
        { role: 'Produtor de gado de corte • MG', text: 'As imagens deixam a consulta muito mais direta quando aparece algum sinal diferente no rebanho.' },
        { role: 'Produtora rural • GO', text: 'Ter o conteúdo organizado por sinais ajuda a saber o que observar antes de buscar orientação profissional.' },
        { role: 'Manejador de rebanho • MT', text: 'O formato ilustrado facilita comparar alterações visíveis sem ficar perdido em textos muito técnicos.' },
        { role: 'Produtor de leite • PR', text: 'Consigo consultar pelo celular no curral e revisar os pontos mais importantes com rapidez.' },
        { role: 'Trabalhador rural • BA', text: 'As explicações simples ajudam a entender melhor o que merece atenção durante o manejo diário.' },
        { role: 'Produtor rural • MS', text: 'Gostei da separação dos conteúdos porque encontro o assunto sem precisar procurar em várias fontes.' },
        { role: 'Estudante de agropecuária • SP', text: 'As marcações nas imagens ajudam muito na revisão visual e tornam o estudo mais fácil de lembrar.' },
        { role: 'Criador de gado • TO', text: 'É um material prático para conferir sinais e preparar informações melhores para conversar com o veterinário.' },
        { role: 'Produtora de leite • SC', text: 'A consulta rápida ajuda a observar mudanças de comportamento, pele, locomoção e alimentação com mais atenção.' },
        { role: 'Capataz de fazenda • PA', text: 'O conteúdo visual funciona bem para orientar a equipe sobre quais alterações não devem passar despercebidas.' },
        { role: 'Produtor familiar • RS', text: 'A linguagem é acessível e as imagens tornam assuntos difíceis muito mais fáceis de compreender.' },
        { role: 'Técnico agropecuário • RO', text: 'A organização por situações do dia a dia deixa o material útil tanto para estudo quanto para consulta.' },
        { role: 'Pecuarista • GO', text: 'Ter tantas referências reunidas economiza tempo quando preciso revisar um sinal observado no lote.' },
        { role: 'Produtora rural • MG', text: 'O material ajuda a criar uma rotina de observação mais cuidadosa sem substituir a avaliação veterinária.' },
        { role: 'Manejador • AC', text: 'Os exemplos visuais tornam mais claro o que registrar em foto e relatar ao profissional responsável.' },
        { role: 'Produtor de corte • MT', text: 'É fácil navegar pelos temas e voltar rapidamente ao conteúdo que eu estava consultando.' },
        { role: 'Estudante de veterinária • PE', text: 'As ilustrações ajudam a fixar diferenças entre sinais parecidos e complementam meus estudos.' },
        { role: 'Produtor de leite • ES', text: 'Uso como referência para observar o rebanho com mais método durante a rotina da ordenha.' },
        { role: 'Administrador rural • MA', text: 'O formato facilita compartilhar orientações de observação com quem trabalha diretamente no manejo.' },
        { role: 'Criadora de gado • CE', text: 'As explicações objetivas ajudam a reconhecer quando uma alteração precisa de atenção rápida.' },
        { role: 'Produtor rural • PI', text: 'A variedade de situações ilustradas deixa a consulta mais completa para diferentes fases da criação.' },
        { role: 'Auxiliar de fazenda • MS', text: 'Consegui entender melhor quais detalhes observar e como descrever o problema ao responsável técnico.' },
        { role: 'Pecuarista • BA', text: 'O acesso vitalício é útil porque posso revisar o material sempre que surge uma dúvida no campo.' },
        { role: 'Produtora familiar • PR', text: 'O conteúdo direto, sem excesso de termos complicados, torna a leitura muito mais agradável.' },
        { role: 'Técnico rural • GO', text: 'As referências visuais ajudam a comparar sinais com mais critério e evitam depender apenas da memória.' },
        { role: 'Produtor de corte • PA', text: 'O material reúne em um só lugar assuntos que antes eu precisava pesquisar separadamente.' },
        { role: 'Criador de bezerros • MG', text: 'A parte ilustrada ajuda a prestar mais atenção aos primeiros sinais de mudança nos animais jovens.' },
        { role: 'Gestora de propriedade • SP', text: 'Achei útil para padronizar a observação do rebanho entre os diferentes membros da equipe.' },
        { role: 'Produtor de leite • SC', text: 'A possibilidade de consultar no celular torna o conteúdo realmente prático para a rotina da propriedade.' },
        { role: 'Estudante de zootecnia • RS', text: 'É um apoio visual interessante para revisar sanidade bovina e relacionar teoria com situações de campo.' }
    ].map((item, index) => ({
        ...item,
        name: 'Modelo de relato ' + String(index + 1).padStart(2, '0')
    }));

    const configuredTestimonials = Array.isArray(window.CUSTOMER_TESTIMONIALS)
        ? window.CUSTOMER_TESTIMONIALS.filter(item => item && item.name && item.text)
        : [];
    const usingDemoTestimonials = configuredTestimonials.length === 0;
    const testimonialItems = usingDemoTestimonials ? testimonialTemplates : configuredTestimonials;
    const testimonialsTrack = document.getElementById('testimonials-track');
    const testimonialsDisclosure = document.querySelector('.testimonials-disclosure');

    if (!usingDemoTestimonials && testimonialsDisclosure) {
        testimonialsDisclosure.hidden = true;
    }

    const createTestimonialCard = (item) => {
        const card = document.createElement('article');
        card.className = 'testimonial-card';

        const top = document.createElement('div');
        top.className = 'testimonial-card-top';

        const stars = document.createElement('span');
        stars.className = 'testimonial-stars';
        stars.setAttribute('aria-label', '5 de 5 estrelas');
        stars.textContent = '★★★★★';

        const status = document.createElement('span');
        status.className = 'testimonial-status';
        status.textContent = usingDemoTestimonials ? 'Conteúdo demonstrativo' : 'Cliente verificado';

        const quote = document.createElement('p');
        quote.className = 'testimonial-quote';
        quote.textContent = item.text;

        const person = document.createElement('div');
        person.className = 'testimonial-person';

        const avatar = document.createElement('span');
        avatar.className = 'testimonial-avatar';
        avatar.setAttribute('aria-hidden', 'true');
        avatar.textContent = item.name
            .split(/\s+/)
            .slice(0, 2)
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase();

        const personText = document.createElement('span');
        const name = document.createElement('strong');
        name.className = 'testimonial-name';
        name.textContent = item.name;
        const role = document.createElement('span');
        role.className = 'testimonial-role';
        role.textContent = item.role || item.location || 'Cliente';

        personText.append(name, role);
        person.append(avatar, personText);
        top.append(stars, status);
        card.append(top, quote, person);
        return card;
    };

    if (testimonialsTrack && testimonialItems.length) {
        for (let groupIndex = 0; groupIndex < 2; groupIndex += 1) {
            const group = document.createElement('div');
            group.className = 'testimonials-group';
            group.setAttribute('aria-hidden', groupIndex === 1 ? 'true' : 'false');
            testimonialItems.forEach(item => group.appendChild(createTestimonialCard(item)));
            testimonialsTrack.appendChild(group);
        }
    }

    /* ==========================================================================
       PURCHASE NOTIFICATIONS
       Real data can be injected through window.RECENT_PURCHASES,
       window.addPurchaseNotification(...) or the purchase:confirmed event.
       ========================================================================== */
    const configuredPurchases = Array.isArray(window.RECENT_PURCHASES)
        ? window.RECENT_PURCHASES.filter(item => item && item.name && item.product)
        : [];
    const purchaseQueue = [...configuredPurchases];
    const purchaseToast = document.getElementById('purchase-toast');
    const purchaseToastName = document.getElementById('purchase-toast-name');
    const purchaseToastProduct = document.getElementById('purchase-toast-product');
    const purchaseToastPrice = document.getElementById('purchase-toast-price');
    const purchaseToastClose = document.getElementById('purchase-toast-close');
    const formatBRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    let purchaseCursor = 0;
    let toastHideTimer;
    let toastStartTimer;
    let toastInterval;
    let notificationsDismissed = false;

    const showPurchaseNotification = (purchase) => {
        if (!purchaseToast || notificationsDismissed || !purchase) return;

        purchaseToastName.textContent = purchase.name + ' acabou de comprar';
        purchaseToastProduct.textContent = purchase.product;
        purchaseToastPrice.textContent = typeof purchase.price === 'number'
            ? formatBRL.format(purchase.price)
            : String(purchase.price || '');

        purchaseToast.classList.add('is-visible');
        window.clearTimeout(toastHideTimer);
        toastHideTimer = window.setTimeout(() => {
            purchaseToast.classList.remove('is-visible');
        }, 5200);
    };

    const showNextPurchase = () => {
        if (!purchaseQueue.length) return;
        const purchase = purchaseQueue[purchaseCursor % purchaseQueue.length];
        purchaseCursor += 1;
        showPurchaseNotification(purchase);
    };

    if (purchaseToast && purchaseQueue.length) {
        toastStartTimer = window.setTimeout(showNextPurchase, 1800);
        toastInterval = window.setInterval(showNextPurchase, 8500);
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

        purchaseQueue.push(purchase);
        showPurchaseNotification(purchase);
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
        planoCompleto: 'https://pay.cakto.com.br/35x7dv8_1151805'
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
        simulateCheckout('Plano Básico', 10.00);
    });

    // Modal Action: Accept Upsell
    if (btnUpsellAccept) {
        btnUpsellAccept.addEventListener('click', () => {
            closeUpsell();
            simulateCheckout('Plano Completo Promocional', 15.90);
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
    window.openLightbox = (imgUrl) => {
        const fullImg = document.getElementById('lightbox-full-img');
        if (fullImg) {
            fullImg.src = localImageMap[imgUrl] || imgUrl;
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
