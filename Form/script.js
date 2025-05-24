document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input, textarea, select');
    const clock = document.getElementById('clock');

    // Clock logic
    const updateClock = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clock.textContent = `${hours}:${minutes}:${seconds}`;
    };
    setInterval(updateClock, 1000);
    updateClock(); // initial call

    // Form validation
    const showError = (input, message) => {
        input.style.borderColor = 'red';
        if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-msg')) {
            const error = document.createElement('div');
            error.classList.add('error-msg');
            error.style.color = 'red';
            error.style.fontSize = '12px';
            error.textContent = message;
            input.after(error);
        }
    };

    const clearError = (input) => {
        input.style.borderColor = '#ffd70099';
        if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-msg')) {
            input.nextElementSibling.remove();
        }
    };

    const validate = () => {
        let isValid = true;
        inputs.forEach(input => {
            clearError(input);
            if (input.hasAttribute('required') && !input.value.trim()) {
                showError(input, 'This field is required.');
                isValid = false;
            }

            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    showError(input, 'Invalid email format.');
                    isValid = false;
                }
            }

            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^[0-9]{10,15}$/;
                if (!phoneRegex.test(input.value)) {
                    showError(input, 'Enter a valid phone number.');
                    isValid = false;
                }
            }
        });
        return isValid;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validate()) {
            alert('Support request submitted successfully!');
            form.reset();
        }
    });

    inputs.forEach(input => {
        input.addEventListener('input', () => clearError(input));
    });
});
