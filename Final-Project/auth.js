// auth.js - Handles authentication for login and signup pages

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'login.html') {
        initLogin();
    } else if (currentPage === 'signup.html') {
        initSignup();
    }
});

function initLogin() {
    const form = document.getElementById('login-form');
    const forgotLink = document.getElementById('forgot-password');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Demo authentication - accept any email/password
        if (email && password) {
            // Simulate login success
            showToast('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                // Store user session (demo)
                localStorage.setItem('aqua_user', JSON.stringify({
                    name: email.split('@')[0],
                    role: 'student',
                    id: email.split('@')[0].toLowerCase().replace(/\s/g, '_')
                }));
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showToast('Please fill in all fields', 'error');
        }
    });

    forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Password reset not implemented in demo', 'info');
    });
}

function initSignup() {
    const form = document.getElementById('signup-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm').value;
        const role = document.getElementById('signup-role').value;

        if (!name || !email || !password || !confirmPassword) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return;
        }

        // Demo signup - always successful
        showToast('Account created successfully! Redirecting to login...', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
}

function showToast(message, type = 'info') {
    const container = document.createElement('div');
    container.className = 'toast-container';
    container.innerHTML = `<div class="toast ${type}">${message}</div>`;
    document.body.appendChild(container);

    setTimeout(() => {
        const toast = container.querySelector('.toast');
        toast.classList.add('fading-out');
        toast.addEventListener('transitionend', () => container.remove());
    }, 3000);
}
