// Lightbox functionality for blog images
document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox elements
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    
    const lightboxContainer = document.createElement('div');
    lightboxContainer.className = 'lightbox-container';
    
    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close image preview');
    
    // Add elements to DOM
    lightboxContainer.appendChild(lightboxImage);
    lightboxContainer.appendChild(closeButton);
    lightboxOverlay.appendChild(lightboxContainer);
    document.body.appendChild(lightboxOverlay);
    
    // Get all images that should be enlargeable
    const enlargeableImages = document.querySelectorAll('.article-image, .gallery-item img');
    
    // Add click event to each image
    enlargeableImages.forEach(img => {
        img.classList.add('enlargeable');
        img.setAttribute('title', 'Click to enlarge');
        img.addEventListener('click', function() {
            lightboxImage.src = this.src;
            lightboxImage.alt = this.alt || 'Enlarged image';
            
            // Add animation class
            setTimeout(() => {
                lightboxOverlay.classList.add('active');
            }, 10);
            
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        });
    });
    
    // Close lightbox when clicking close button or overlay
    closeButton.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });
    
    // Close lightbox on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightboxOverlay.classList.contains('active')) return;
        
        if (e.key === 'ArrowRight') {
            navigateImages('next');
        } else if (e.key === 'ArrowLeft') {
            navigateImages('prev');
        }
    });
    
    // Track current image for navigation
    let currentImageIndex = 0;
    const allImages = Array.from(enlargeableImages);
    
    function navigateImages(direction) {
        if (direction === 'next') {
            currentImageIndex = (currentImageIndex + 1) % allImages.length;
        } else {
            currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        }
        
        lightboxImage.src = allImages[currentImageIndex].src;
        lightboxImage.alt = allImages[currentImageIndex].alt || 'Enlarged image';
    }
    
    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        setTimeout(() => {
            document.body.style.overflow = ''; // Restore scrolling
        }, 300);
    }
});
