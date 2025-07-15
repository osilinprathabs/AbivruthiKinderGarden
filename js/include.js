// Function to include HTML files
function includeHTML(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            
            // Re-initialize any scripts that need to run after content is loaded
            if (typeof initializePageScripts === 'function') {
                initializePageScripts();
            }
        })
        .catch(error => {
            console.error('Error loading HTML file:', error);
        });
}

// Function to set active navigation based on current page
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Include header and footer
    includeHTML('header-placeholder', 'header.html');
    includeHTML('footer-placeholder', 'footer.html');
    
    // Set active navigation after a short delay to ensure content is loaded
    setTimeout(setActiveNavigation, 100);
});

// Function to reinitialize scripts after content is loaded
function initializePageScripts() {
    // Re-initialize any scripts that need to run after header/footer is loaded
    if (typeof $ !== 'undefined') {
        // Re-initialize any jQuery plugins if needed
        if ($.fn.wow) {
            new WOW().init();
        }
    }
} 