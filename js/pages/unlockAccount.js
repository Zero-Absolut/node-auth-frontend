const verifyToken = async (token) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/auth/unlockAccount?token=${token}`,
      { withCredentials: true },
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);

  const token = params.get("token");

  const unlockContainer = document.getElementById("unlockContainer");

  const unlockIcon = document.getElementById("unlockIcon");

  const unlockTitle = document.getElementById("unlockTitle");

  const unlockMessage = document.getElementById("unlockMessage");

  const unlockLoader = document.getElementById("unlockLoader");

  if (!token) {
    showModal("Erro", "Token inválido.");

    return;
  }

  const response = await verifyToken(token);

  if (!response) {
    showModal("Erro", "Erro inesperado.");

    return;
  }

  const data = response.data;

  if (data.code === "ACCOUNT_UNLOCKED") {
    unlockContainer.classList.add("unlock-success");

    unlockIcon.innerHTML = "✅";

    unlockTitle.innerHTML = "Conta desbloqueada";

    unlockMessage.innerHTML =
      "Sua conta foi desbloqueada com sucesso. Redirecionando para login...";

    unlockLoader.remove();

    setTimeout(() => {
      window.location.href = "login.html";
    }, 3000);

    return;
  }

  if (data.code === "TOKEN_EXPIRED") {
    unlockContainer.classList.add("unlock-error");

    unlockIcon.innerHTML = "⏳";

    unlockTitle.innerHTML = "Token expirado";

    unlockMessage.innerHTML = "Seu link expirou. Solicite um novo desbloqueio.";

    unlockLoader.remove();

    return;
  }

  unlockContainer.classList.add("unlock-error");

  unlockIcon.innerHTML = "⚠️";

  unlockTitle.innerHTML = "Não foi possível validar";

  unlockMessage.innerHTML = data.message;

  unlockLoader.remove();
});
