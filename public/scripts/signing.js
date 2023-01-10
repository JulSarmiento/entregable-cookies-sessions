document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    const response = await fetch("/api/session/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.get("username"),
      }),
    });

    const { status, message } = await response.json();

    if( !status ) {
      alert(message);
      return;
    }

    window.location.href = "/public";
  });
