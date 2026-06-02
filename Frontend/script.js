const form = document.getElementById('promptForm');
const submitBtn = document.getElementById('submitBtn');
const promptOutput = document.getElementById('promptOutput');
const copyBtn = document.getElementById('copyBtn');

marked.use({
    breaks: true,
    gfm: true
});

let rawPromptData = '';

function showEmptyState() {
    promptOutput.innerHTML = `
        <div class="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <p class="empty-title">No prompt generated yet</p>
            <p class="empty-hint">Fill out the form and click <strong>Generate Prompt</strong></p>
        </div>`;
}

function showLoading() {
    promptOutput.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <span>Generating your prompt…</span>
        </div>`;
}

function showError(message) {
    promptOutput.innerHTML = `
        <div class="empty-state" style="color: #ef4444;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <p class="empty-title">Error</p>
            <p class="empty-hint">${message}</p>
        </div>`;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    submitBtn.textContent = 'Generating…';
    submitBtn.disabled = true;

    showLoading();

    try {
        const response = await fetch('/generate-prompt', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Server returned an error.');
        }

        const data = await response.json();

        if (data.error) {
            showError(data.error);
            rawPromptData = '';
        } else {
            rawPromptData = data.prompt;
            promptOutput.innerHTML = marked.parse(data.prompt);
        }
    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
        rawPromptData = '';
    } finally {
        submitBtn.textContent = 'Generate Prompt';
        submitBtn.disabled = false;
    }
});

copyBtn.addEventListener('click', async () => {
    if (!rawPromptData) return;

    try {
        await navigator.clipboard.writeText(rawPromptData);

        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Copied!</span>`;

        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
        }, 2000);
    } catch (error) {
        console.error('Failed to copy', error);
    }
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
        localStorage.setItem('theme', 'dark');
    }
});
