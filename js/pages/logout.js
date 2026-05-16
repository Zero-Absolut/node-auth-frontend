const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );

    alert(response.data.message);

    window.location.href = "http://127.0.0.1:5500/pages/login.html";
  } catch (err) {
    console.error(err);

    alert(err.response?.data?.message || "Erro ao realizar logout.");
  }
});
