// Services Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.service-slide');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Function to show a specific slide
    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        
        // Update carousel track position
        if (carouselTrack) {
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // Update active slide class
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Next slide function
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoplay();
            setTimeout(() => {
                startAutoplay(); // Restart autoplay after manual selection
            }, 100);
        });
    });
    
    // Auto-play functionality
    let autoplayTimer;
    
    function startAutoplay() {
        autoplayTimer = setInterval(nextSlide, 6000); // Change slide every 6 seconds
    }
    
    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }
    
    // Initialize carousel first
    showSlide(0);
    
    // Start autoplay after initialization
    setTimeout(() => {
        startAutoplay();
    }, 1000); // Wait 1 second before starting auto-slide
    
    // Pause autoplay on hover
    const servicesCarousel = document.querySelector('.services-carousel');
    if (servicesCarousel) {
        servicesCarousel.addEventListener('mouseenter', stopAutoplay);
        servicesCarousel.addEventListener('mouseleave', startAutoplay);
    }
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (servicesCarousel) {
        servicesCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        servicesCarousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > swipeThreshold) {
            // Swipe right - go to previous slide
            showSlide(currentSlide - 1);
            stopAutoplay();
            setTimeout(() => {
                startAutoplay(); // Restart autoplay after manual swipe
            }, 100);
        } else if (swipeDistance < -swipeThreshold) {
            // Swipe left - go to next slide
            showSlide(currentSlide + 1);
            stopAutoplay();
            setTimeout(() => {
                startAutoplay(); // Restart autoplay after manual swipe
            }, 100);
        }
    }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)';
        navbar.style.backdropFilter = 'none';
    }
});

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = this.querySelector('i');
        
        // Toggle current FAQ
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            icon.style.transform = 'rotate(0deg)';
            faqItem.style.backgroundColor = '';
        } else {
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                otherAnswer.style.display = 'none';
            });
            document.querySelectorAll('.faq-question i').forEach(otherIcon => {
                otherIcon.style.transform = 'rotate(0deg)';
            });
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.style.backgroundColor = '';
            });
            
            // Open current FAQ
            answer.style.display = 'block';
            icon.style.transform = 'rotate(180deg)';
            faqItem.style.backgroundColor = '#f8f9fa';
        }
    });
});

// Contact form handling moved to contact.html page

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .feature-item, .team-member, .value-item, .area-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('loading');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run on page load

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/[0-9]+/, target);
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/[0-9]+/, Math.floor(current));
            }
        }, 20);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(statsSection);
}

// Lazy loading for images (if you add images later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Add loading animation to page elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.hero-content, .service-card, .feature-item');
    
    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('loading');
        }, index * 100);
    });
});

// Phone number formatting removed - accepting any format

// Add smooth reveal animation for sections
function revealSections() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize section reveal
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealSections);
revealSections(); // Run on page load

// Add click effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyles = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Performance optimization - debounce scroll events
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
window.addEventListener('scroll', debounce(function() {
    animateOnScroll();
    revealSections();
}, 10));

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Add focus management for accessibility
function manageFocus() {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('.modal'); // If you add modals later
    
    if (modal) {
        const focusableContent = modal.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
}

// Initialize focus management
manageFocus();

// Map functionality
function initializeMap() {
    const mapContainer = document.querySelector('.map-container');
    const mapOverlay = document.querySelector('.map-overlay');
    
    if (mapContainer && mapOverlay) {
        // Add click event to show map overlay information
        mapContainer.addEventListener('click', function() {
            mapOverlay.style.opacity = '1';
            mapOverlay.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                mapOverlay.style.opacity = '0.95';
                mapOverlay.style.transform = 'scale(1)';
            }, 200);
        });
        
        // Add hover effect for map container
        mapContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
        });
        
        mapContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    }
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', initializeMap);

// Add loading state for map iframe
function handleMapLoading() {
    const mapIframe = document.querySelector('.map-container iframe');
    
    if (mapIframe) {
        // Add loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 400px; background: #f8f9fa; border-radius: 15px;">
                <div style="text-align: center; color: #666;">
                    <i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 1rem; color: #3498db;"></i>
                    <p>Loading map...</p>
                </div>
            </div>
        `;
        
        mapIframe.parentNode.insertBefore(loadingIndicator, mapIframe);
        
        mapIframe.addEventListener('load', function() {
            loadingIndicator.remove();
            mapIframe.style.opacity = '1';
        });
        
        mapIframe.style.opacity = '0';
        mapIframe.style.transition = 'opacity 0.5s ease';
    }
}

// Initialize map loading handler
handleMapLoading();

// Add directions functionality
function handleDirections() {
    const directionsBtn = document.querySelector('a[href*="maps.google.com"]');
    
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function(e) {
            // Add analytics tracking if needed
            console.log('Directions button clicked');
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Initialize directions handler
handleDirections();

// Add coverage area animations
function animateCoverageCards() {
    const coverageCards = document.querySelectorAll('.coverage-card');
    
    coverageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.5s ease';
        }, index * 100);
    });
}

// Trigger coverage area animations when section is visible
const coverageSection = document.querySelector('.coverage-area');
if (coverageSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCoverageCards();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(coverageSection);
}

// Add location info animations
function animateLocationInfo() {
    const locationItems = document.querySelectorAll('.location-item');
    
    locationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
            item.style.transition = 'all 0.5s ease';
        }, index * 150);
    });
}

// Trigger location info animations when section is visible
const locationSection = document.querySelector('.location-section');
if (locationSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateLocationInfo();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(locationSection);
}

// Add geolocation functionality (optional)
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                // You can use this to show distance or customize directions
                console.log('User location:', userLat, userLng);
                
                // Optional: Add distance calculation to business location
                const businessLat = 17.4065174; // Approximate Secunderabad coordinates
                const businessLng = 78.4977841;
                
                const distance = calculateDistance(userLat, userLng, businessLat, businessLng);
                console.log('Distance to business:', distance, 'km');
            },
            function(error) {
                console.log('Location access denied or unavailable');
            }
        );
    }
}

// Distance calculation function
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

// Initialize geolocation (optional - only if user wants to see distance)
// getUserLocation();

// Add service worker for offline functionality (basic)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}

console.log('Sri Venkateswara Borewells - Website loaded successfully!');