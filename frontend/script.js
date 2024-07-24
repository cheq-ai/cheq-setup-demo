document.addEventListener('DOMContentLoaded', () => {
    fetch('/api')
      .then(response => response.text())
      .then(data => {
        document.getElementById('backend-message').textContent = data;
      });
  });
  