document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('#app');

    const routes = {
        '/': '<h1>Home</h1><p>Welcome to the Home page.</p>',
        '/about': '<h1>About</h1><p>Welcome to the About page.</p>',
        '/contact': '<h1>Contact</h1><p>Welcome to the Contact page.</p>',
    };

    function navigateTo(url) {
        history.pushState(null, null, url);
        render();
    }

    function render() {
        const path = window.location.pathname;
        app.innerHTML = routes[path] || '<h1>404</h1><p>Page not found.</p>';
    }

    document.querySelectorAll('[data-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(e.target.href);
        });
    });


});