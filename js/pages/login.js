const showModal = (title, message) => {
  document.getElementById("feedbackModalTitle").innerHTML = title;

  document.getElementById("feedbackModalMessage").innerHTML = message;

  const modal = new bootstrap.Modal(document.getElementById("feedbackModal"));

  modal.show();
};

const apiLogin = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      data,
      {
        withCredentials: true,
      },
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (!loginForm) return;

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // LIMPA ERROS ANTIGOS
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("loginError").innerHTML = "";

    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    const responseApi = await apiLogin(data);

    console.log(responseApi.data);

    //conta nao ativa
    if (responseApi.data.code === "ACCOUNT_NOT_ACTIVE") {
      showModal("Conta não ativada", responseApi.data.message);

      setTimeout(() => {
        window.location.href =
          "http://127.0.0.1:5500/pages/verify-account.html";
      }, 3000);

      return;
    }

    //conta bloqueada
    if (responseApi.data.code === "ACCOUNT_BLOCKED") {
      showModal("Erro", responseApi.data.message);

      setTimeout(() => {
        window.location.href = "http://127.0.0.1:5500/pages/blocked.html";
      }, 6000);

      return;
    }

    // 2fa

    if (responseApi.data.code === "TWO_FACTOR_REQUIRED") {
      showModal("Sucesso", responseApi.data.message);

      setTimeout(() => {
        window.location.href = "http://127.0.0.1:5500/pages/verify2fa.html";
      }, 3000);

      return;
    }

    // login invalido
    if (
      responseApi.data.code === "INVALID_CREDENTIALS" ||
      responseApi.data.code === "USER_NOT_FOUND"
    ) {
      let failedAttempts =
        parseInt(responseApi.data.failed_login_attempts) || 0;

      document.getElementById("emailError").innerHTML =
        responseApi.data.message;

      document.getElementById("loginError").innerHTML =
        "Tentativas restantes de login: " + (5 - failedAttempts);

      return;
    }

    //erro de email
    if (responseApi.data.code === "EMAIL_NOT_SENT") {
      showModal("Erro", responseApi.data.message);

      return;
    }
    // erro servidor
    if (
      responseApi.data.code === "DATABASE_ACCESS_ERROR" ||
      responseApi.data.code === "INTERNAL_ERROR"
    ) {
      showModal("Erro interno", "Falha ao processar sua solicitação.");

      return;
    }
  });
});
