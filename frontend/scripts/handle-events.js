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
  const identifiers = {
    duidCookie: getCookieValue("_cq_duid"),
    pvidCookie: getCookieValue("_cq_pvid"),
    pageViewId: sessionStorage.getItem("req"),
    duid: sessionStorage.getItem("duid"),
  };

  await fetch(`/subscribe-${sessionSyncMode}-${apiVersion}-${env}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(identifiers),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("cheq-rti-response-subscribe").style.display =
        "block";
      document.getElementById("cheq-rti-request-subscribe").style.display =
        "block";
      const rtiReqContainer = document.getElementById("rti-request-container");
      const rtiResContainer = document.getElementById("rti-response-container");
      rtiReqContainer.innerHTML = JSON.stringify(data.rtiReq, null, 2);
      rtiResContainer.innerHTML = JSON.stringify(data.rtiRes, null, 2);
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
  const identifiers = {
    duidCookie: getCookieValue("_cq_duid"),
    pvidCookie: getCookieValue("_cq_pvid"),
    pageViewId: sessionStorage.getItem("req"),
    duid: sessionStorage.getItem("duid"),
  };

  try {
    const response = await fetch(
      `/formsubmit-${sessionSyncMode}-${apiVersion}-${env}`,
      {
        method: "POST",
        body: JSON.stringify({ ...(formObject || {}), ...(identifiers || {}) }),
        headers: {
          "Content-Type": "application/json",
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
      document.getElementById("rti-response-container").textContent =
        JSON.stringify(response);
    }
  } catch (error) {
    document.getElementById("rti-response-container").textContent =
      JSON.stringify(error);
  }
}

const getCookieValue = (cookieName) => {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${cookieName}=`))
    ?.split("=")[1];
};
