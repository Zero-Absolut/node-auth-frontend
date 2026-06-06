window.addEventListener("load", async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8080/api/auth/me", {
      withCredentials: true,
    });

    if (response.status === 200) {
      window.location.href = "/index.html";

      return;
    }

    window.location.href = "/pages/login.html";
  } catch (error) {
    console.error(error);

    window.location.href = "/pages/login.html";
  }
});
