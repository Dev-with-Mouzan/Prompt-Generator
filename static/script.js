// ===========================
// DOM ELEMENTS
// ===========================
const form = document.getElementById('promptForm');
const submitBtn = document.getElementById('submitBtn');
const resultsSection = document.getElementById('resultsSection');
const promptOutput = document.getElementById('promptOutput');
const copyBtn = document.getElementById('copyBtn');

// ===========================
// FORM SUBMISSION
// ===========================
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Hide previous results
    resultsSection.classList.add('hidden');

    try {
        // Submit form
        const response = await fetch('/generate-prompt', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to generate prompt');
        }

        const data = await response.json();

        // Display results
        if (data.error) {
            promptOutput.textContent = `Error: ${data.error}`;
            promptOutput.style.color = '#ef4444';
        } else {
            promptOutput.textContent = data.prompt;
            promptOutput.style.color = 'var(--text-primary)';
        }

        // Show results section with animation
        resultsSection.classList.remove('hidden');

        // Randomly update stat bars for flair
        const progressBars = document.querySelectorAll('.stat-progress');
        progressBars.forEach(bar => {
            const randomWidth = 60 + Math.random() * 35;
            bar.style.width = `${randomWidth}%`;
        });

        // Smooth scroll to results
        setTimeout(() => {
            resultsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 100);

    } catch (error) {
        console.error('Error:', error);
        promptOutput.textContent = `Error: ${error.message}`;
        promptOutput.style.color = '#ef4444';
        resultsSection.classList.remove('hidden');
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// ===========================
// COPY TO CLIPBOARD
// ===========================
copyBtn.addEventListener('click', async () => {
    const text = promptOutput.textContent;

    try {
        await navigator.clipboard.writeText(text);

        // Show success feedback
        const originalHTML = copyBtn.innerHTML;
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Copied!</span>
        `;

        // Reset after 2 seconds
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = originalHTML;
        }, 2000);

    } catch (error) {
        console.error('Failed to copy:', error);
        alert('Failed to copy to clipboard');
    }
});

// ===========================
// FORM VALIDATION
// ===========================
const requiredInputs = form.querySelectorAll('[required]');

requiredInputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
    });

    input.addEventListener('input', () => {
        if (input.validity.valid) {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        }
    });
});

// ===========================
// SMOOTH ANIMATIONS
// ===========================
// Add stagger animation to form groups
const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach((group, index) => {
    group.style.animation = `fadeInUp 0.6s ease ${0.1 + index * 0.05}s backwards`;
});

// ===========================
// KEYBOARD SHORTCUTS
// ===========================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        form.requestSubmit();
    }

    // Ctrl/Cmd + C when results are visible to copy
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !resultsSection.classList.contains('hidden')) {
        const selection = window.getSelection();
        if (!selection.toString()) {
            e.preventDefault();
            copyBtn.click();
        }
    }
});

// ===========================
// FORM RESET ON REFRESH
// ===========================
window.addEventListener('load', () => {
    form.reset();
});

// ===========================
// UTILITY FUNCTIONS
// ===========================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
