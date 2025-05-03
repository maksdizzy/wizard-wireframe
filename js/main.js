// Main JavaScript file for the Application Creation Wizard

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize wizard navigation
    initWizardNavigation();
    
    // Initialize responsive behavior
    initResponsiveBehavior();
    
    // Initialize component visibility toggle
    toggleComponentVisibility();
    
    // Initialize credential fields toggle
    toggleCredentialFields();
    
    // Initialize three-dot menus
    initThreeDotMenus();
});

/**
 * Initialize mobile navigation
 */
function initMobileNav() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenuCloseButton = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.remove('hidden');
        });
    }
    
    if (mobileMenuCloseButton && mobileMenu) {
        mobileMenuCloseButton.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    }
}

/**
 * Initialize basic form validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-accent-tertiary');
                    
                    // Add error message if it doesn't exist
                    let errorMessage = field.parentNode.querySelector('.error-message');
                    if (!errorMessage) {
                        errorMessage = document.createElement('p');
                        errorMessage.className = 'text-accent-tertiary text-sm mt-1 error-message';
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.appendChild(errorMessage);
                    }
                } else {
                    field.classList.remove('border-accent-tertiary');
                    const errorMessage = field.parentNode.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
            
            if (!isValid) {
                event.preventDefault();
            }
        });
    });
}

/**
 * Initialize wizard navigation
 */
function initWizardNavigation() {
    const nextButtons = document.querySelectorAll('.wizard-next');
    const backButtons = document.querySelectorAll('.wizard-back');
    
    // Next button functionality - direct navigation to the next HTML file
    nextButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Get the href attribute and navigate to it
            const href = button.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    });
    
    // Back button functionality - direct navigation to the previous HTML file
    backButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Get the href attribute and navigate to it
            const href = button.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    });
}

/**
 * Initialize responsive behavior
 */
function initResponsiveBehavior() {
    // Handle responsive navigation
    const windowWidth = window.innerWidth;
    const wizardNav = document.querySelector('.wizard-nav');
    
    if (wizardNav) {
        if (windowWidth < 640) { // Mobile
            wizardNav.classList.add('mobile-bottom-nav');
        } else {
            wizardNav.classList.remove('mobile-bottom-nav');
        }
    }
    
    // Listen for window resize
    window.addEventListener('resize', function() {
        const currentWidth = window.innerWidth;
        
        if (wizardNav) {
            if (currentWidth < 640) { // Mobile
                wizardNav.classList.add('mobile-bottom-nav');
            } else {
                wizardNav.classList.remove('mobile-bottom-nav');
            }
        }
    });
    
    // Handle collapsible sections on mobile
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            
            if (windowWidth < 640) { // Only collapse on mobile
                content.classList.toggle('hidden');
                this.querySelector('.collapse-icon').classList.toggle('rotate-180');
            }
        });
    });
}

/**
 * Toggle component visibility based on base type selection
 */
function toggleComponentVisibility() {
    const baseTypeRadios = document.querySelectorAll('input[name="base-type"]');
    const defiComponents = document.querySelector('.defi-components');
    const communityComponents = document.querySelector('.community-components');
    
    baseTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'defi') {
                if (defiComponents) defiComponents.classList.remove('hidden');
                if (communityComponents) communityComponents.classList.add('hidden');
            } else if (this.value === 'community') {
                if (defiComponents) defiComponents.classList.add('hidden');
                if (communityComponents) communityComponents.classList.remove('hidden');
            }
        });
    });
}

/**
 * Show/hide credential fields based on component selection
 */
function toggleCredentialFields() {
    const componentCheckboxes = document.querySelectorAll('.component-checkbox');
    
    componentCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const credentialField = document.querySelector(`.credential-field[data-component="${this.value}"]`);
            
            if (credentialField) {
                if (this.checked) {
                    credentialField.classList.remove('hidden');
                } else {
                    credentialField.classList.add('hidden');
                }
            }
        });
    });
}

/**
 * Initialize three-dot menus
 */
function initThreeDotMenus() {
    const menuButtons = document.querySelectorAll('button.text-gray-400');
    
    menuButtons.forEach(button => {
        // Check if it's a three-dot menu button
        const svg = button.querySelector('svg');
        if (svg && svg.innerHTML.includes('M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z')) {
            button.addEventListener('click', function() {
                // Create a dropdown menu
                let dropdown = document.querySelector('.three-dot-dropdown');
                
                // If dropdown exists, remove it (toggle behavior)
                if (dropdown) {
                    dropdown.remove();
                    return;
                }
                
                // Create new dropdown
                dropdown = document.createElement('div');
                dropdown.className = 'three-dot-dropdown absolute right-0 mt-2 w-48 bg-dark-tertiary rounded-md shadow-lg z-10';
                
                // Add menu items
                dropdown.innerHTML = `
                    <div class="py-1">
                        <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-dark-primary">View Details</a>
                        <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-dark-primary">Edit</a>
                        <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-dark-primary">Start/Stop</a>
                        <a href="#" class="block px-4 py-2 text-sm text-accent-tertiary hover:bg-dark-primary">Delete</a>
                    </div>
                `;
                
                // Position the dropdown relative to the button
                const buttonRect = button.getBoundingClientRect();
                dropdown.style.position = 'fixed';
                dropdown.style.top = `${buttonRect.bottom + window.scrollY}px`;
                dropdown.style.right = `${window.innerWidth - buttonRect.right}px`;
                
                // Add to document
                document.body.appendChild(dropdown);
                
                // Close dropdown when clicking outside
                document.addEventListener('click', function closeDropdown(e) {
                    if (!dropdown.contains(e.target) && e.target !== button) {
                        dropdown.remove();
                        document.removeEventListener('click', closeDropdown);
                    }
                });
            });
        }
    });
}