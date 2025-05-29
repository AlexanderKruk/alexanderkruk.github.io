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

// Gallery horizontal scroll controls
const galleryScroll = document.getElementById('gallery-scroll');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');

if (galleryPrev && galleryNext && galleryScroll) {
    const scrollAmount = 320; // Width of gallery item + gap

    galleryPrev.addEventListener('click', () => {
        galleryScroll.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    galleryNext.addEventListener('click', () => {
        galleryScroll.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update button states based on scroll position
    function updateGalleryButtons() {
        const scrollLeft = galleryScroll.scrollLeft;
        const maxScroll = galleryScroll.scrollWidth - galleryScroll.clientWidth;

        galleryPrev.style.opacity = scrollLeft <= 0 ? '0.5' : '1';
        galleryNext.style.opacity = scrollLeft >= maxScroll ? '0.5' : '1';
    }

    galleryScroll.addEventListener('scroll', updateGalleryButtons);
    updateGalleryButtons(); // Initial state
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

// Smooth reveal animations for text elements
function animateText() {
    const textElements = document.querySelectorAll('.work-description, .about-description p');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split(' ').forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            element.appendChild(span);
        });
    });
}

// Trigger text animation when elements come into view
const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const spans = entry.target.querySelectorAll('span');
            spans.forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
            textObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Initialize text animations after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateText();
    
    document.querySelectorAll('.work-description, .about-description').forEach(element => {
        textObserver.observe(element);
    });
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

// Add click handlers to gallery images
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    const image = item.querySelector('img');
    
    if (image) {
        image.addEventListener('click', function() {
            openImageModal(this.src, this.alt, 'gallery', index);
        });
    }
}); 