// Premium loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Create loading overlay
    const loadingHTML = `
        <div id="loading-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.5s ease;
        ">
            <div style="text-align: center;">
                <div style="
                    width: 60px;
                    height: 60px;
                    border: 2px solid rgba(201, 169, 97, 0.2);
                    border-top-color: #c9a961;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                "></div>
                <p style="color: #c9a961; font-size: 14px; letter-spacing: 0.1em; opacity: 0.8;">LOADING EXCELLENCE</p>
            </div>
        </div>
        <style>
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        </style>
    `;

    // Add loading overlay
    document.body.insertAdjacentHTML('afterbegin', loadingHTML);

    // Remove loading overlay when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            const overlay = document.getElementById('loading-overlay');
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 500);
        }, 800);
    });
});

// Smooth page transitions
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href && !link.target && !link.href.includes('#')) {
        e.preventDefault();
        const href = link.href;
        
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    }
});