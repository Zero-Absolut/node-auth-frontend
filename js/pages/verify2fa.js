const feedbackModalElement = document.getElementById("feedbackModal");

const feedbackModal = new bootstrap.Modal(feedbackModalElement);

function showModal(title, message) {
  document.getElementById("feedbackModalTitle").textContent = title;

  document.getElementById("feedbackModalMessage").textContent = message;

  feedbackModal.show();
}

const verify2fa = async (code) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8080/api/auth/verify-2fa",

      {
        code: code,
      },

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
  const form = document.getElementById("verifyForm");

  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const code = document.getElementById("code").value.trim();

    if (!code) {
      showModal("Erro", "Digite o código de verificação.");

      return;
    }

    const responseApi = await verify2fa(code);
    console.log(responseApi);
    if (!responseApi) {
      showModal("Erro", "Erro inesperado.");

      return;
    }

    if (!responseApi.data.success) {
      showModal("Erro", responseApi.data.message);

      return;
    }

    if (responseApi.data.success) {
      setTimeout(() => {
        window.location.href = "http://127.0.0.1:5500/index.html";
      }, 2500);
    }
  });

  const resendBtn = document.getElementById("resendTokenBtn");

  if (resendBtn) {
    resendBtn.addEventListener("click", async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8080/api/auth/resend-2fa",
          {},
          {
            withCredentials: true,
          },
        );

        showModal(
          response.data.success ? "Sucesso" : "Erro",
          response.data.message,
        );
      } catch (error) {
        console.error(error);
        showModal("Erro", "Falha ao reenviar código.");
      }
    });
  }
});
