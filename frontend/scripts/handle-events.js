async function handleSubscribe(event, sessionSyncMode, apiVersion, env) {
  fetch(`/subscribe-${sessionSyncMode}-${apiVersion}-${env}`, {
    method: "GET",
    headers: {
      "User-Agent": navigator.userAgent,
      cookie:
        document.cookie
          ?.split("; ")
          .find((part) => part.startsWith("_cheq_rti=")) || undefined,
      "Request-Id": sessionStorage.getItem("RequestId"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("cheq-rti-response-subscribe").style.display =
        "block";
      const rtiResContainer = document.getElementById("rti-response-container");
      rtiResContainer.innerHTML = JSON.stringify(data, null, 2);
    });
}

async function handleSubscribeV4(event, sessionSyncMode, apiVersion, env) {
  const headers = {
    "user-agent": navigator.userAgent,
    duidCookie: getCookieValue("_cq_duid"),
    pvidCookie: getCookieValue("_cq_pvid"),
    pageViewId: sessionStorage.getItem("req"),
    clientUserId: sessionStorage.getItem("v4cuid"),
  };

  fetch(`/subscribe-${sessionSyncMode}-${apiVersion}-${env}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("cheq-rti-response-subscribe").style.display =
        "block";
      const rtiResContainer = document.getElementById("rti-response-container");
      rtiResContainer.innerHTML = JSON.stringify(data, null, 2);
    });
}

async function handleSubmit(event, sessionSyncMode, apiVersion, env) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());
  formObject["RequestId"] = sessionStorage.getItem("RequestId");

  try {
    const response = await fetch(
      `/formsubmit-${sessionSyncMode}-${apiVersion}`,
      {
        method: "POST",
        body: JSON.stringify(formObject),
        headers: {
          "Content-Type": "application/json",
          "User-Agent": navigator.userAgent,
          cookie:
            document.cookie
              ?.split("; ")
              .find((part) => part.startsWith("_cheq_rti=")) || undefined,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      document.getElementById("event-response-el").textContent = JSON.stringify(
        data,
        null,
        2
      );
    } else {
      console.error("Error submitting form:", response.statusText);
      document.getElementById("response").textContent =
        JSON.stringify(response);
    }
  } catch (error) {
    document.getElementById("response").textContent = JSON.stringify(error);
  }
}

async function handleSubmitV4(event, sessionSyncMode, apiVersion, env) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());


  try {
    const response = await fetch(
      `/formsubmit-${sessionSyncMode}-${apiVersion}-${env}`,
      {
        method: "POST",
        body: JSON.stringify(formObject),
        headers: {
          "user-agent": navigator.userAgent,
          duidCookie: getCookieValue("_cq_duid"),
          pvidCookie: getCookieValue("_cq_pvid"),
          pageViewId: sessionStorage.getItem("req"),
          clientUserId: sessionStorage.getItem("v4cuid"),
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      document.getElementById("event-response-el").textContent = JSON.stringify(
        data,
        null,
        2
      );
    } else {
      console.error("Error submitting form:", response.statusText);
      document.getElementById("response").textContent =
        JSON.stringify(response);
    }
  } catch (error) {
    document.getElementById("response").textContent = JSON.stringify(error);
  }
}

const getCookieValue = (cookieName) => {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${cookieName}=`))
    ?.split("=")[1];
};
