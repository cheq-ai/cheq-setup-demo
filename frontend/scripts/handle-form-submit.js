async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/form-submit", {
      method: "POST",
      body: JSON.stringify(formObject),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      document.getElementById('response').textContent = JSON.stringify(data, null, 2);
    } else {
      console.error("Error submitting form:", response.statusText);
      document.getElementById("response").textContent = JSON.stringify(response);
    }
  } catch (error) {
    document.getElementById("response").textContent = JSON.stringify(error);
  }
}