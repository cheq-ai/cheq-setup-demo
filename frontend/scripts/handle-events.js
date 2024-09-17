async function handleSubscribe(event, sessionSyncMode, apiVersion) {
  fetch(`/subscribe-${sessionSyncMode}-${apiVersion}`, {
    method: "GET",
    headers: {
      "User-Agent": navigator.userAgent,
      "cookie": document.cookie?.split('; ').find(part => part.startsWith('_cheq_rti=')) || undefined,
      "Request-Id": sessionStorage.getItem("RequestId")
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("cheq-rti-response-subscribe").style.display = "block";
      const rtiResContainer = document.getElementById("rti-response-container");
      rtiResContainer.innerHTML = JSON.stringify(data, null, 2);
    });
}

async function handleSubmit(event, sessionSyncMode) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());
  formObject["RequestId"] = sessionStorage.getItem("RequestId");

  try {
    const response = await fetch(`/form-submit-${sessionSyncMode}`, {
      method: "POST",
      body: JSON.stringify(formObject),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": navigator.userAgent,
        "cookie": document.cookie?.split('; ').find(part => part.startsWith('_cheq_rti=')) || undefined,
      },
    });

    if (response.ok) {
      const data = await response.json();

      document.getElementById("response").textContent = JSON.stringify(data,null,2);
    } else {
      console.error("Error submitting form:", response.statusText);
      document.getElementById("response").textContent = JSON.stringify(response);
    }
  } catch (error) {
    document.getElementById("response").textContent = JSON.stringify(error);
  }
}


