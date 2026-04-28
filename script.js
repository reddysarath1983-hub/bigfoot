// Initialize Lenis Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize ScrollReveal
const sr = ScrollReveal({
    distance: '60px',
    duration: 1500,
    delay: 100,
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
    reset: false
});

sr.reveal('.reveal-up', { origin: 'bottom' });
sr.reveal('.reveal-zoom', { scale: 0.9, distance: '0px' });
sr.reveal('.reveal-scale', { scale: 0.95, duration: 2000, distance: '0px' });

// WhatsApp Enquiry Function
function enquireProduct(productName) {
    const phoneNumber = '919876543210'; 
    const message = `Greetings. I would like to inquire about the artisanal "${productName}". Could you please provide details?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Page Transition Logic
const transitionOverlay = document.querySelector('.page-transition');
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            // Sweep in
            transitionOverlay.classList.add('active');
            
            setTimeout(() => {
                // Instantly jump to the new section while the screen is covered
                lenis.scrollTo(targetElement, { immediate: true });
                ScrollReveal().sync();
                
                // Sweep out to reveal the new section
                transitionOverlay.classList.remove('active');
                transitionOverlay.classList.add('exit');
                
                // Reset the overlay position after the animation finishes
                setTimeout(() => {
                    transitionOverlay.classList.remove('exit');
                }, 600);
            }, 600); // 600ms matches the CSS transition duration
        }
    });
});

// Stacking Slides Logic
function updateStickyTops() {
    const sections = document.querySelectorAll('section, footer');
    sections.forEach((sec, index) => {
        sec.style.position = 'sticky';
        sec.style.zIndex = index + 1;
        
        const height = sec.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (height > windowHeight) {
            sec.style.top = `${windowHeight - height}px`;
        } else {
            sec.style.top = '0px';
        }
    });
}

window.addEventListener('load', updateStickyTops);
window.addEventListener('resize', updateStickyTops);
setTimeout(updateStickyTops, 500);
setTimeout(updateStickyTops, 2000);
