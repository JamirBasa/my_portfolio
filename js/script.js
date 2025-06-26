document.addEventListener('DOMContentLoaded', function() {
    // Dark mode functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle dark mode
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save user preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.querySelector('.nav-links').classList.toggle('active');
            
            // Toggle the icon between hamburger and X
            const menuIcon = mobileMenuToggle.querySelector('i');
            if (menuIcon.classList.contains('fa-bars')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.querySelector('.nav-links').classList.remove('active');
                
                // Reset icon to hamburger
                const menuIcon = mobileMenuToggle.querySelector('i');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }
    
    // Education toggle functionality
    const educationBtn = document.getElementById('education-btn');
    const educationContent = document.getElementById('education-content');
    
    if (educationBtn && educationContent) {
        educationBtn.addEventListener('click', () => {
            educationBtn.classList.toggle('active');
            educationContent.classList.toggle('show');
        });
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (carousel && items.length > 0) {
        let currentIndex = 0;
        const itemCount = items.length;
        
        // Set initial position
        updateCarousel();
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        });
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            updateCarousel();
        });
        
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Auto-advance carousel every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        }, 5000);
    }

    // Modal functionality
    const modal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');
    
    // Project details (in a real scenario, this could come from a database)
    const projects = [
        {
            title: "DentalFinder",
            description: "DentalFinder is a platform for service provider and customer to create a seamless booking experience wherein they manage bookings and book an appointment. The project was built using HTML, CSS, PHP and JavaScript.",
            image: "./projects/DentalCare.png"
        },
        {
            title: "Texify",
            description: "Texify is a program wherein users can convert their image into text. It also has a text to speech funtionality. The project was built using Python.",
            image: "./projects/Texify.png"
        }
    ];
    
    // Add click event to each project image
    document.querySelectorAll('.carousel-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            if (projects[index]) {
                modalImage.src = projects[index].image;
                modalTitle.textContent = projects[index].title;
                modalDescription.textContent = projects[index].description;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        });
    });
    
    // Close modal when clicking the X
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal when clicking outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
    
    // Enhanced contact form submission with AJAX
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the submit button
            const submitBtn = contactForm.querySelector('.submit-btn');
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Send AJAX request
            fetch('process_contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Show response message
                formResponse.textContent = data.message;
                formResponse.className = 'form-response ' + (data.success ? 'success' : 'error');
                
                // Reset form if successful
                if (data.success) {
                    contactForm.reset();
                }
                
                // Hide loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Scroll to response message
                formResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide success message after 5 seconds
                if (data.success) {
                    setTimeout(() => {
                        formResponse.style.display = 'none';
                    }, 5000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formResponse.textContent = 'An unexpected error occurred. Please try again later.';
                formResponse.className = 'form-response error';
                
                // Hide loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            });
        });
    }
});
