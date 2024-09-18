document.addEventListener('DOMContentLoaded', () => {
    const mainTitle = document.getElementById('main-title');
    const text = mainTitle.textContent;
    mainTitle.textContent = '';

    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.opacity = '0';
        span.style.transition = `opacity 0.5s ease ${i * 0.1}s`;
        mainTitle.appendChild(span);
    }

    setTimeout(() => {
        const spans = mainTitle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.opacity = '1';
        });
    }, 100);
});