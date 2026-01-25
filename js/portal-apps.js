// Trevor's Arcade - Apps Page
const PORTAL_TOKEN_KEY = 'trevor_arcade_token';

// Check authentication
function isPortalAuthenticated() {
    return !!sessionStorage.getItem(PORTAL_TOKEN_KEY);
}

// Redirect if not authenticated
if (!isPortalAuthenticated()) {
    window.location.href = '/portal.html';
}

// ============================================
// APP CONFIGURATION - Edit this array to add/remove apps
// ============================================
const APPS = [
    {
        name: 'Rob Air',
        icon: '✈️',
        url: 'https://robair.xyz',
        color: 'teal'
    },
    {
        name: 'RPG Goals',
        icon: '🎮',
        url: '#', // TBD
        color: 'purple'
    }
];
// ============================================

// Render apps grid
function renderApps() {
    const grid = document.getElementById('apps-grid');

    if (APPS.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">No apps configured yet</p>';
        return;
    }

    APPS.forEach(app => {
        const tile = document.createElement('a');
        tile.href = app.url;
        tile.target = '_blank';
        tile.rel = 'noopener noreferrer';
        tile.className = 'arcade-tile';
        if (app.color) {
            tile.dataset.color = app.color;
        }

        tile.innerHTML = `
            <div class="tile-icon">${app.icon}</div>
            <div class="tile-name">${app.name}</div>
        `;

        grid.appendChild(tile);
    });
}

// Handle logout
document.getElementById('logout-btn').addEventListener('click', () => {
    sessionStorage.removeItem(PORTAL_TOKEN_KEY);
    window.location.href = '/';
});

// Handle ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        sessionStorage.removeItem(PORTAL_TOKEN_KEY);
        window.location.href = '/';
    }
});

// Initialize
renderApps();
