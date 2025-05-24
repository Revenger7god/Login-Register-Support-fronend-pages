document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('registerForm');
  const registerBtn = document.getElementById('registerBtn');

  // Input fields
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const ageInput = document.getElementById('age');
  const passwordInput = document.getElementById('password');

  // Error message containers
  const usernameError = document.getElementById('usernameError');
  const emailError = document.getElementById('emailError');
  const ageError = document.getElementById('ageError');
  const passwordError = document.getElementById('passwordError');
  
  // Success message container
  const successMessage = document.getElementById('successMessage');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password strength: min 8 chars, includes at least 1 letter and 1 number
  function isPasswordStrong(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  }

  function clearErrors() {
    usernameError.textContent = "";
    emailError.textContent = "";
    ageError.textContent = "";
    passwordError.textContent = "";
    successMessage.style.display = "none";
  }

  function validateForm() {
    let isValid = true;
    clearErrors();

    // Username validation
    if (!usernameInput.value.trim()) {
      usernameError.textContent = "Username is required.";
      isValid = false;
    }

    // Email validation
    if (!emailInput.value.trim()) {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // Age validation
    const ageVal = Number(ageInput.value);
    if (!ageInput.value.trim()) {
      ageError.textContent = "Age is required.";
      isValid = false;
    } else if (isNaN(ageVal) || ageVal < 13 || ageVal > 120) {
      ageError.textContent = "Age must be a number between 13 and 120.";
      isValid = false;
    }

    // Password validation
    if (!passwordInput.value) {
      passwordError.textContent = "Password is required.";
      isValid = false;
    } else if (!isPasswordStrong(passwordInput.value)) {
      passwordError.textContent = "Password must be at least 8 characters and include letters and numbers.";
      isValid = false;
    }

    return isValid;
  }

  async function mockSubmit(data) {
    // Simulates sending data to a server with 1.5 second delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1500);
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Disable button and clear previous success
    registerBtn.disabled = true;
    successMessage.style.display = "none";
    registerBtn.textContent = "Registering...";

    const formData = {
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      age: Number(ageInput.value.trim()),
      password: passwordInput.value,
    };

    try {
      const response = await mockSubmit(formData);

      if (response.success) {
        successMessage.style.display = "block";
        form.reset();
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error(error);
    }

    registerBtn.disabled = false;
    registerBtn.textContent = "Register & Join Us";
  });
});

