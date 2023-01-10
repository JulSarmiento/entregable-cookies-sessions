document.getElementById("signout-btn").addEventListener("click", async () => {
  const response = await fetch("/api/session/logout");
  const { status, message } = await response.json();

  if (!status) {
    alert(message);
    return;
  }

  window.location.href = "/public/logout.html";
});
