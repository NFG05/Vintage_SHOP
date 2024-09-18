document.addEventListener('DOMContentLoaded', () => {
    const pageWrapper = document.getElementById('page-wrapper');
    const cart = document.getElementById('cart');
    const cartButton = document.getElementById('cart-button');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    let total = 0;
    let itemCount = 0;

    // Parallax effect
    window.addEventListener('scroll', () => {
        const parallaxSections = document.querySelectorAll('.parallax');
        parallaxSections.forEach(section => {
            const scrollPosition = window.pageYOffset;
            section.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    });

    // Cart open/close functionality
    cartButton.addEventListener('click', () => {
        cart.classList.add('open');
        pageWrapper.classList.add('cart-open');
    });

    closeCart.addEventListener('click', () => {
        cart.classList.remove('open');
        pageWrapper.classList.remove('cart-open');
    });

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const productName = product.querySelector('h3').textContent;
            const productPrice = parseFloat(product.querySelector('p').textContent.slice(1));
            const productImage = product.querySelector('img').src;

            addToCart(productName, productPrice, productImage);

            // Animate the button
            button.classList.add('added');
            button.textContent = '¡Añadido!';
            setTimeout(() => {
                button.classList.remove('added');
                button.textContent = 'Añadir al Carrito';
            }, 1000);

            // Animate the product
            product.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                product.style.animation = '';
            }, 500);
        });
    });

    function addToCart(name, price, image) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${image}" alt="${name}">
            <div class="item-details">
                <span>${name}</span>
                <span>$${price.toFixed(2)}</span>
            </div>
            <button class="remove-item">Quitar</button>
        `;
        cartItems.appendChild(listItem);

        total += price;
        itemCount++;
        updateCart();

        // Add event listener to remove item
        listItem.querySelector('.remove-item').addEventListener('click', () => removeFromCart(listItem, price));
    }

    function removeFromCart(item, price) {
        cartItems.removeChild(item);
        total -= price;
        itemCount--;
        updateCart();
    }

    function updateCart() {
        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = itemCount;
        cartButton.classList.add('updated');
        setTimeout(() => {
            cartButton.classList.remove('updated');
        }, 300);
    }

    // Contact form animation
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactForm.classList.add('submitted');
        setTimeout(() => {
            contactForm.reset();
            contactForm.classList.remove('submitted');
        }, 3000);
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.product, #contact-form, h2');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('in-view');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Stagger animation for products
    const productSections = document.querySelectorAll('.product-section');
    productSections.forEach(section => {
        const products = section.querySelectorAll('.product');
        products.forEach((product, index) => {
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            const delay = index % 4 * 100; // Stagger effect for each row
            setTimeout(() => {
                product.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }, delay);
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});