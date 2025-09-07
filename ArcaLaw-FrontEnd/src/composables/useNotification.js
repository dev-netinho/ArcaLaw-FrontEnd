/**
 * @param {string} message A mensagem a ser exibida.
 * @param {'success' | 'error' | 'loading'} type O tipo de notificação, que define sua cor.
 * @param {number} duration A duração em milissegundos que a notificação ficará na tela.
 */
export function showToast(message, type = 'loading', duration = 4000) {
    const containerId = 'notification-container';
    let container = document.getElementById(containerId);

    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.className = 'notification-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`; 
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');

        toast.addEventListener('animationend', () => {
            toast.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        });
    }, duration);
}

// Loader functions
/*const loaderOverlay = document.getElementById('loader-overlay');

export function showLoader() {
    if (loaderOverlay) {
        loaderOverlay.classList.remove('hidden');
    }
}

export function hideLoader() {
    if (loaderOverlay) {
        loaderOverlay.classList.add('hidden');
    }
}*/

/*  <div id="loader-overlay" class="loader-overlay hidden">
        <div class="loader"></div> 
    </div> */ 

/*
.loader-overlay {
    position: fixed; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; 
    transition: opacity 0.3s ease;
    opacity: 1;
}

.loader-overlay.hidden {
    opacity: 0;
    pointer-events: none; 
} */ 