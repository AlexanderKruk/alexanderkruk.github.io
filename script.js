// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery horizontal scroll controls with infinite scrolling
function initializeGallery() {
    const galleryScroll = document.getElementById('gallery-scroll');
    const galleryPrev = document.getElementById('gallery-prev');
    const galleryNext = document.getElementById('gallery-next');

    if (!galleryPrev || !galleryNext || !galleryScroll) {
        console.error('Gallery elements not found');
        return;
    }

    const originalItems = Array.from(galleryScroll.querySelectorAll('.gallery-item'));
    let isScrolling = false;
    let isInitializing = false;
    let initialized = false;
    
    // Clone items for infinite effect - create multiple copies
    function createInfiniteScroll() {
        if (originalItems.length === 0) {
            return;
        }
        
        isInitializing = true;
        
        // Clear existing content
        galleryScroll.innerHTML = '';
        
        // Create multiple copies of items for smooth infinite scrolling
        const copies = 3; // Number of copies on each side
        for (let i = 0; i < copies * 2 + 1; i++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                galleryScroll.appendChild(clone);
            });
        }
        
        // Wait for layout to be ready, then set initial position
        requestAnimationFrame(() => {
            setTimeout(() => {
                const itemWidth = getItemWidth();
                const totalWidth = itemWidth * originalItems.length;
                
                // Set scroll position without smooth behavior to avoid animation
                galleryScroll.style.scrollBehavior = 'auto';
                galleryScroll.scrollLeft = totalWidth * copies;
                
                // Re-enable smooth scrolling after positioning
                setTimeout(() => {
                    galleryScroll.style.scrollBehavior = 'smooth';
                    isInitializing = false;
                    initialized = true;
                    
                    // Add gallery image click handlers after initialization
                    addGalleryClickHandlers();
                }, 50);
            }, 200);
        });
    }
    
    function getItemWidth() {
        const items = galleryScroll.querySelectorAll('.gallery-item');
        if (items.length > 0) {
            const itemStyle = window.getComputedStyle(items[0]);
            const itemWidth = parseFloat(itemStyle.width);
            const gap = parseFloat(window.getComputedStyle(galleryScroll).gap) || 24;
            return itemWidth + gap;
        }
        return 320; // Fallback
    }
    
    function checkAndResetPosition() {
        if (isScrolling || !initialized || isInitializing) return;
        
        const itemWidth = getItemWidth();
        const totalWidth = itemWidth * originalItems.length;
        const scrollLeft = galleryScroll.scrollLeft;
        const maxScroll = galleryScroll.scrollWidth - galleryScroll.clientWidth;
        
        // Reset position when approaching boundaries
        if (scrollLeft <= totalWidth * 0.5) {
            // Near beginning - jump to equivalent position further right
            isScrolling = true;
            const currentBehavior = galleryScroll.style.scrollBehavior;
            galleryScroll.style.scrollBehavior = 'auto';
            galleryScroll.scrollLeft = scrollLeft + totalWidth * 2;
            galleryScroll.style.scrollBehavior = currentBehavior;
            setTimeout(() => { isScrolling = false; }, 50);
        } else if (scrollLeft >= maxScroll - totalWidth * 0.5) {
            // Near end - jump to equivalent position further left
            isScrolling = true;
            const currentBehavior = galleryScroll.style.scrollBehavior;
            galleryScroll.style.scrollBehavior = 'auto';
            galleryScroll.scrollLeft = scrollLeft - totalWidth * 2;
            galleryScroll.style.scrollBehavior = currentBehavior;
            setTimeout(() => { isScrolling = false; }, 50);
        }
    }
    
    function smoothScrollBy(direction) {
        if (!initialized || isInitializing) return;
        
        const itemWidth = getItemWidth();
        const scrollAmount = itemWidth;
        
        isScrolling = true;
        galleryScroll.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
        
        // Reset scrolling flag after animation
        setTimeout(() => { isScrolling = false; }, 500);
    }
    
    // Add click handlers to all gallery items (including clones)
    function addGalleryClickHandlers() {
        document.querySelectorAll('.gallery-item').forEach((item, globalIndex) => {
            const image = item.querySelector('img');
            if (image) {
                image.addEventListener('click', function(e) {
                    // Check if the click came from a gallery button
                    if (e.target.closest('.gallery-btn') || e.target.closest('.gallery-controls')) {
                        return;
                    }
                    
                    // Calculate the original index
                    const originalIndex = globalIndex % originalItems.length;
                    openImageModal(this.src, this.alt, 'gallery', originalIndex);
                });
            }
        });
    }
    
    // Button event listeners - attach immediately
    galleryPrev.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        smoothScrollBy(-1);
        return false;
    });
    
    galleryNext.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        smoothScrollBy(1);
        return false;
    });
    
    // Also prevent any mousedown/mouseup events from bubbling
    galleryPrev.addEventListener('mousedown', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    
    galleryPrev.addEventListener('mouseup', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    
    galleryNext.addEventListener('mousedown', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    
    galleryNext.addEventListener('mouseup', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    
    // Monitor scroll position and reset when needed
    let scrollTimeout;
    galleryScroll.addEventListener('scroll', () => {
        if (isInitializing) return; // Don't interfere during initialization
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            checkAndResetPosition();
        }, 150);
    });
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        if (initialized && !isInitializing) {
            initialized = false;
            createInfiniteScroll();
        }
    }, 250));
    
    // Initialize infinite scroll
    createInfiniteScroll();
}

// Initialize gallery when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGallery);
} else {
    initializeGallery();
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attributes
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Hide/show scroll indicator based on scroll position
function handleScrollIndicator() {
    const heroScroll = document.querySelector('.hero-scroll');
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (heroScroll) {
        if (scrollPosition > 50) {
            // Hide when scrolling down
            heroScroll.style.opacity = '0';
            heroScroll.style.visibility = 'hidden';
            heroScroll.style.transform = 'translateX(-50%) translateY(20px)';
        } else {
            // Show when at the top
            heroScroll.style.opacity = '1';
            heroScroll.style.visibility = 'visible';
            heroScroll.style.transform = 'translateX(-50%) translateY(0)';
        }
    }
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(248, 246, 240, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(74, 144, 164, 0.1)';
    } else {
        nav.style.background = 'rgba(248, 246, 240, 0.95)';
        nav.style.boxShadow = 'none';
    }
    
    // Handle scroll indicator visibility
    handleScrollIndicator();
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#4CAF50';
            break;
        case 'error':
            notification.style.background = '#f44336';
            break;
        default:
            notification.style.background = '#2196F3';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Featured work image overlay interactions
document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', function() {
        const workTitle = this.closest('.featured-item').querySelector('.work-title').textContent;
        showNotification(`Opening details for "${workTitle}"`, 'info');
    });
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
});

// Add mobile navigation styles
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 767px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(248, 246, 240, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 3rem;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
        
        .nav-menu.active {
            display: flex;
            transform: translateX(0);
        }
        
        .nav-toggle.active .bar:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active .bar:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .nav-link {
            font-size: 1.2rem;
            margin: 1rem 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Parallax effect
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
    
    // Navbar background
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(248, 246, 240, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(74, 144, 164, 0.1)';
    } else {
        nav.style.background = 'rgba(248, 246, 240, 0.95)';
        nav.style.boxShadow = 'none';
    }
    
    // Handle scroll indicator visibility
    handleScrollIndicator();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Image Modal Functionality
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

// Store image collections and current state
let currentCollection = [];
let currentIndex = 0;
let currentSection = '';

// Create image collections
const featuredWorksImages = [];
const galleryImages = [];

// Populate featured works collection
document.querySelectorAll('.featured-item').forEach((item, index) => {
    const image = item.querySelector('.featured-image img');
    if (image) {
        featuredWorksImages.push({
            src: image.src.replace(/w=\d+&h=\d+/, 'w=1200&h=1200'),
            alt: image.alt,
            index: index
        });
    }
});

// Populate gallery collection
document.querySelectorAll('.gallery-item img').forEach((image, index) => {
    galleryImages.push({
        src: image.src.replace(/w=\d+&h=\d+/, 'w=1200&h=1200'),
        alt: image.alt,
        index: index
    });
});

// Function to open modal with carousel
function openImageModal(imageSrc, altText, section, index) {
    currentSection = section;
    currentIndex = index;
    currentCollection = section === 'featured' ? featuredWorksImages : galleryImages;
    
    updateModalImage();
    updateNavigationButtons();
    
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to update modal image
function updateModalImage() {
    if (currentCollection[currentIndex]) {
        modalImage.src = currentCollection[currentIndex].src;
        modalImage.alt = currentCollection[currentIndex].alt;
    }
}

// Function to update navigation buttons state
function updateNavigationButtons() {
    // Always enable buttons for infinite loop navigation
    modalPrev.disabled = false;
    modalNext.disabled = false;
    
    // Show/hide buttons based on collection size
    if (currentCollection.length <= 1) {
        modalPrev.style.display = 'none';
        modalNext.style.display = 'none';
    } else {
        modalPrev.style.display = 'flex';
        modalNext.style.display = 'flex';
    }
}

// Function to navigate to previous image
function goToPreviousImage() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        // Loop to last image when at first image
        currentIndex = currentCollection.length - 1;
    }
    updateModalImage();
    updateNavigationButtons();
}

// Function to navigate to next image
function goToNextImage() {
    if (currentIndex < currentCollection.length - 1) {
        currentIndex++;
    } else {
        // Loop to first image when at last image
        currentIndex = 0;
    }
    updateModalImage();
    updateNavigationButtons();
}

// Function to close modal
function closeImageModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
        modalImage.src = '';
        modalImage.alt = '';
        currentCollection = [];
        currentIndex = 0;
        currentSection = '';
    }, 300);
}

// Event listeners
modalClose.addEventListener('click', closeImageModal);
modalPrev.addEventListener('click', goToPreviousImage);
modalNext.addEventListener('click', goToNextImage);

// Close modal when clicking outside the image
imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal || e.target.classList.contains('modal-overlay')) {
        closeImageModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (imageModal.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                closeImageModal();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                goToPreviousImage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                goToNextImage();
                break;
        }
    }
});

// Add click handlers to featured works images
document.querySelectorAll('.featured-item').forEach((item, index) => {
    const image = item.querySelector('.featured-image img');
    
    if (image) {
        image.addEventListener('click', function() {
            openImageModal(this.src, this.alt, 'featured', index);
        });
    }
});

// Gallery click handlers are now managed within the infinite scroll function 