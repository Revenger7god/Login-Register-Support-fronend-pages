// forget-password.js

document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submit');

  submitBtn.addEventListener('click', () => {
    const username = document.getElementById('Username').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!username || !email) {
      alert("Please fill in both username and email.");
      return;
    }

    // Simulate sending reset link
    alert("Password reset link has been sent to your email!");

    // Optional: Redirect to confirmation page after 2 seconds
    setTimeout(() => {
      window.location.href = "/reset/reset-sent.html"; // update if needed
    }, 2000);
  });
});
