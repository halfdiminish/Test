document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.querySelector('.main-image img');
    // Swatches now control both frame color and lens type
    const colorSwatches = document.querySelectorAll('.color-swatches .swatch'); 
    const purchaseForm = document.querySelector('.purchase-form');
    const priceDisplay = document.querySelector('.add-to-cart-btn');

    // =================================================================
    // NEW: PAYMENT LINK MAPPING for Sunglasses
    // Key format: "FRAMECOLOR-LENSCOLOR" (e.g., "black-iceblue")
    // NOTE: These are placeholder links. Replace with real Stripe links.
    // =================================================================
    const PAYMENT_LINKS = {
        'black-mirroredblue': 'https://buy.stripe.com/9B6fZggSDbRK9FtdbT6g80c', 
        'black-iceblue': 'https://buy.stripe.com/eVq3cu9qb1d618X8VD6g80d',
        'white-darkgrey': 'https://buy.stripe.com/cNi8wO8m76xq9Ft0p76g80e',
        'white-fireorange': 'https://buy.stripe.com/9B66oGeKv5tm5pd1tb6g80f',
        'clear-fireorange': 'https://buy.stripe.com/00w4gy59V092bNB7Rz6g80g',
        'clear-mirroredblue': 'https://buy.stripe.com/00w4gy59V092bNB7Rz6g80g'
    };
    // =================================================================
    
    // --- STATE VARIABLES ---
    // Default selection: Black frame, Mirrored Blue lens
    let currentColor = 'black'; 
    let currentLens = 'mirroredblue'; 
    let currentPrice = 45.99; // Base price for sunglasses

    // Helper function to update the main image
    function updateMainImage(imageSrc, imageAlt) {
        mainImage.src = imageSrc;
        mainImage.alt = imageAlt;
    }

    // 1. Color Swatch Switching (Updates image and current state)
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // A. Update Active State
            colorSwatches.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // B. Get New Image/Alt Data and update Main Image
            const newImageSrc = this.getAttribute('data-image-src');
            const newColor = this.getAttribute('data-frame-color');
            const newLens = this.getAttribute('data-lens-color');
            const newImageAlt = `HALF-DIMINISH Sunglasses - ${newColor} Frame, ${newLens} Lens`;
            updateMainImage(newImageSrc, newImageAlt);
            
            // C. UPDATE CURRENT STATE variables
            currentColor = newColor;
            currentLens = newLens;
        });
    });

    // 2. Pricing Logic (Set initial price and keep it static)
    priceDisplay.textContent = `Buy Now - $${currentPrice.toFixed(2)}`;


    // 3. Form Submission Logic: Look up link and redirect
    purchaseForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop the form from submitting normally
        
        // 1. Construct the key based on user selection
        const selectedKey = `${currentColor}-${currentLens}`;
        
        // 2. Look up the corresponding Stripe link
        const stripeLink = PAYMENT_LINKS[selectedKey];

        if (stripeLink) {
            // 3. Redirect the user to the Stripe link
            window.location.href = stripeLink;
        } else {
            // Error handling
            alert(`Error: Payment link not found for ${currentColor} frame, ${currentLens} lens. Please choose a valid combination.`);
        }
    });

    // Ensure the default active swatch matches the default state
    const defaultSwatch = document.querySelector('.swatch.active');
    if (defaultSwatch) {
        currentColor = defaultSwatch.getAttribute('data-frame-color');
        currentLens = defaultSwatch.getAttribute('data-lens-color');
    }
});