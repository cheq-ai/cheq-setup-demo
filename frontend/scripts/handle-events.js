async function handleSubscribe(event, sessionSyncMode, apiVersion, env) {
  if (typeof hideCodeContainers === "function") hideCodeContainers();

  const requestId = sessionStorage.getItem("req");

  fetch(`/subscribe-${sessionSyncMode}-${apiVersion}-${env}`, {
    method: "GET",
    headers: {
      "User-Agent": navigator.userAgent,
      cookie:
        document.cookie
          ?.split("; ")
          .find((part) => part.startsWith("_cheq_rti=")) || undefined,
      "request-id": requestId,
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
  if (typeof hideCodeContainers === "function") hideCodeContainers();

  const requestId = sessionStorage.getItem("req");
  const duid = sessionStorage.getItem("duid");

  const identifiers = {
    duidCookie: getCookieValue("_cq_duid"),
    pvidCookie: getCookieValue("_cq_pvid"),
    pageViewId: requestId,
    duid: duid,
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
      const rtiReqHeadersContainer = document.getElementById(
        "rti-request-headers-container"
      );
      const rtiReqContainer = document.getElementById("rti-request-container");
      const rtiResContainer = document.getElementById("rti-response-container");

      document.getElementById(
        "cheq-rti-request-headers-subscribe"
      ).style.display = "block";
      document.getElementById("cheq-rti-request-subscribe").style.display =
        "block";
      document.getElementById("cheq-rti-response-subscribe").style.display =
        "block";

      rtiReqHeadersContainer.innerHTML = JSON.stringify(
        data.rtiReqHeaders,
        null,
        2
      );
      rtiReqContainer.innerHTML = JSON.stringify(data.rtiReq, null, 2);
      rtiResContainer.innerHTML = JSON.stringify(data.rtiRes, null, 2);
    });
}

async function handleSubmit(event, sessionSyncMode, apiVersion, env) {
  event.preventDefault();
  if (typeof hideCodeContainers === "function") hideCodeContainers();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());
  const requestId = sessionStorage.getItem("req");

  formObject["request-id"] = requestId;

  try {
    const response = await fetch(
      `/formsubmit-${sessionSyncMode}-${apiVersion}`,
      {
        method: "POST",
        body: JSON.stringify(formObject),
        headers: {
          "Content-Type": "application/json",
          "User-Agent": navigator.userAgent,
          "request-id": requestId,
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
  if (typeof hideCodeContainers === "function") hideCodeContainers();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());

  const requestId = sessionStorage.getItem("req");
  const duid = sessionStorage.getItem("duid");

  const identifiers = {
    duidCookie: getCookieValue("_cq_duid"),
    pvidCookie: getCookieValue("_cq_pvid"),
    pageViewId: requestId,
    duid: duid,
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

      document.getElementById("cheq-rti-request-headers-subscribe").display =
        "block";
      document.getElementById("rti-request-headers-container").textContent =
        JSON.stringify(data.slpReqHeaders, null, 2);
      document.getElementById("rti-request-container").textContent =
        JSON.stringify(data.slpReq, null, 2);
      document.getElementById("rti-response-container").textContent =
        JSON.stringify(data.slpRes, null, 2);
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
