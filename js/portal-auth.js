// Portal Authentication
const PORTAL_TOKEN_KEY = 'trevor_arcade_token';

// Check if already authenticated
function isPortalAuthenticated() {
    return !!sessionStorage.getItem(PORTAL_TOKEN_KEY);
}

// If already authenticated, redirect to apps
if (isPortalAuthenticated()) {
    window.location.href = '/portal-apps.html';
}

// Handle ESC key to return to main site
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.location.href = '/';
    }
});

// Handle form submission
document.getElementById('portal-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const accessCode = document.getElementById('access-code').value;
    const messageEl = document.getElementById('message');
    const container = document.querySelector('.terminal-container');
    const button = document.querySelector('.pixel-button');

    if (!accessCode) {
        messageEl.className = 'error';
        messageEl.textContent = '>> NO CODE ENTERED <<';
        return;
    }

    // Disable button during request
    button.disabled = true;
    button.textContent = '[ VERIFYING... ]';
    button.classList.add('loading');

    try {
        const response = await fetch('/api/auth/portal-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: accessCode })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            // Success!
            sessionStorage.setItem(PORTAL_TOKEN_KEY, data.token);
            messageEl.className = 'success';
            messageEl.textContent = '>> ACCESS GRANTED <<';
            button.textContent = '[ ENTERING... ]';

            // Redirect after brief delay for effect
            setTimeout(() => {
                window.location.href = '/portal-apps.html';
            }, 800);
        } else {
            // Error - shake screen
            container.classList.add('shake');
            setTimeout(() => container.classList.remove('shake'), 500);

            messageEl.className = 'error';
            messageEl.textContent = '>> ' + (data.error || 'ACCESS DENIED') + ' <<';
            document.getElementById('access-code').value = '';
            document.getElementById('access-code').focus();

            button.disabled = false;
            button.textContent = '[ AUTHENTICATE ]';
            button.classList.remove('loading');
        }
    } catch (error) {
        container.classList.add('shake');
        setTimeout(() => container.classList.remove('shake'), 500);

        messageEl.className = 'error';
        messageEl.textContent = '>> CONNECTION ERROR <<';

        button.disabled = false;
        button.textContent = '[ AUTHENTICATE ]';
        button.classList.remove('loading');
    }
});

// Focus input on page load
document.getElementById('access-code').focus();
