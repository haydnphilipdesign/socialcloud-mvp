// SocialCloud Mobile Premium Effects
// Touch-optimized interactions and mobile-specific enhancements

document.addEventListener('DOMContentLoaded', function() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    if (!isMobile) return; // Only apply mobile effects on mobile devices

    // Mobile-specific initialization
    initMobileTouchEffects();
    initMobileNavigation();
    initMobileCardInteractions();
    initMobileScrollEffects();
    initMobileLoadingStates();
    initMobileGestures();
});

// Touch-optimized button effects
function initMobileTouchEffects() {
    // Enhanced touch feedback for buttons
    const buttons = document.querySelectorAll('.btn, .talent-view-profile, .mobile-menu-btn');
    
    buttons.forEach(button => {
        // Touch start effect
        button.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
            
            // Create touch ripple effect
            createMobileRipple(e, this);
        }, { passive: true });
        
        // Touch end effect
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        }, { passive: true });
        
        // Touch cancel effect
        button.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });
}

// Mobile ripple effect for touch
function createMobileRipple(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const touch = e.touches[0] || e.changedTouches[0];
    const size = Math.max(rect.width, rect.height);
    const x = touch.clientX - rect.left - size / 2;
    const y = touch.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: mobileRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Enhanced mobile navigation
function initMobileNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-nav');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    // Add smooth slide animation for mobile menu
    mobileMenu.style.cssText += `
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        will-change: transform;
    `;
    
    // Enhanced menu toggle with animation
    window.toggleMobileMenu = function() {
        const isOpen = mobileMenu.style.transform === 'translateX(0px)' || mobileMenu.style.display === 'block';
        
        if (isOpen) {
            mobileMenu.style.transform = 'translateX(100%)';
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300);
            
            // Animate hamburger to normal
            mobileMenuBtn.classList.remove('menu-open');
        } else {
            mobileMenu.style.display = 'block';
            setTimeout(() => {
                mobileMenu.style.transform = 'translateX(0)';
            }, 10);
            
            // Animate hamburger to X
            mobileMenuBtn.classList.add('menu-open');
        }
    };
    
    // Close menu when clicking nav links
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                window.toggleMobileMenu();
            }, 150);
        });
    });
}

// Mobile card interactions
function initMobileCardInteractions() {
    const cards = document.querySelectorAll('.card, .talent-card');
    
    cards.forEach(card => {
        // Touch feedback for cards
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
            this.style.transition = 'transform 0.2s ease';
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0) scale(1)';
        }, { passive: true });
        
        card.addEventListener('touchcancel', function() {
            this.style.transform = 'translateY(0) scale(1)';
        }, { passive: true });
    });
}

// Mobile-optimized scroll effects
function initMobileScrollEffects() {
    let ticking = false;
    
    // Throttled scroll handler for performance
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollEffects();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    function updateScrollEffects() {
        const scrollY = window.pageYOffset;
        const header = document.querySelector('header');
        
        // Mobile header effects
        if (header) {
            if (scrollY > 50) {
                header.style.background = 'rgba(10, 10, 10, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            } else {
                header.style.background = 'rgba(26, 26, 26, 0.9)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.borderBottom = 'none';
            }
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Mobile loading states
function initMobileLoadingStates() {
    // Add loading shimmer for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        if (!img.complete) {
            img.style.background = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
            img.style.backgroundSize = '200% 100%';
            img.style.animation = 'shimmer 1.5s infinite';
            
            img.addEventListener('load', function() {
                this.style.background = 'none';
                this.style.animation = 'none';
                this.style.opacity = '0';
                this.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 50);
            });
        }
    });
}

// Mobile gesture support
function initMobileGestures() {
    const talentGrid = document.querySelector('.talent-grid, .talent-grid-home');
    if (!talentGrid) return;
    
    let startX = 0;
    let startY = 0;
    let currentCard = null;
    
    // Add swipe gesture for talent cards
    talentGrid.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        currentCard = e.target.closest('.card');
    }, { passive: true });
    
    talentGrid.addEventListener('touchmove', function(e) {
        if (!currentCard) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        
        // Prevent default scroll if horizontal swipe
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
            e.preventDefault();
            
            // Add subtle swipe feedback
            const swipeAmount = Math.min(Math.abs(deltaX) / 100, 0.1);
            currentCard.style.transform = `translateX(${deltaX * 0.1}px) scale(${1 - swipeAmount})`;
        }
    });
    
    talentGrid.addEventListener('touchend', function(e) {
        if (!currentCard) return;
        
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - startX;
        
        // Reset card position
        currentCard.style.transform = 'translateX(0) scale(1)';
        currentCard.style.transition = 'transform 0.3s ease';
        
        // If significant swipe, trigger action
        if (Math.abs(deltaX) > 100) {
            const profileLink = currentCard.querySelector('.talent-view-profile, a[href*="talent-profile"]');
            if (profileLink) {
                // Add swipe success feedback
                currentCard.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    currentCard.style.transform = 'scale(1)';
                    profileLink.click();
                }, 150);
            }
        }
        
        setTimeout(() => {
            currentCard.style.transition = '';
        }, 300);
        
        currentCard = null;
    }, { passive: true });
}

// Add mobile-specific CSS animations
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @keyframes mobileRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes shimmer {
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }
    
    /* Mobile menu button animation */
    .mobile-menu-btn.menu-open span {
        transform: rotate(45deg);
    }
    
    .mobile-menu-btn.menu-open span::before {
        transform: rotate(90deg) translate(-8px, 0);
    }
    
    .mobile-menu-btn.menu-open span::after {
        opacity: 0;
    }
    
    /* Mobile touch feedback */
    @media (max-width: 768px) {
        .btn:active,
        .card:active {
            transform: scale(0.95);
        }
        
        /* Improve touch targets */
        .btn {
            min-height: 44px;
            min-width: 44px;
        }
        
        .mobile-menu-btn {
            min-height: 44px;
            min-width: 44px;
        }
        
        /* Mobile-specific hover effects replacement */
        .card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .card:active {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
    }
`;
document.head.appendChild(mobileStyles);