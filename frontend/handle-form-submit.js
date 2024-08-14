async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target); 
  const formObject = Object.fromEntries(formData.entries());

  console.log(formObject)

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
      console.log("Form submitted successfully:", data);
      // Optionally, redirect or show a success message
    } else {
      console.error("Error submitting form:", response.statusText);
      // Optionally, show an error message
    }
  } catch (error) {
    console.error("Error:", error);
    // Optionally, show an error message
  }
}
