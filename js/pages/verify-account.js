const showModal = (title, message) => {
  document.getElementById("feedbackModalTitle").innerHTML = title;

  document.getElementById("feedbackModalMessage").innerHTML = message;

  const modal = new bootstrap.Modal(document.getElementById("feedbackModal"));

  modal.show();
};

const resendToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/resend",

      {},

      {
        withCredentials: true,
      },
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

const verifyToken = async (token) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/auth/activate-account?token=${token}`,

      { withCredentials: true },
    );

    return response;
  } catch (error) {
    return error.response;
  }
};
document.addEventListener(
  "DOMContentLoaded",

  async function () {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (token) {
      const response = await verifyToken(token);

      if (!response) {
        showModal("Erro", "Erro inesperado.");

        return;
      }

      if (!response.data.success) {
        showModal("Erro", response.data.message);

        return;
      }

      showModal("Sucesso", response.data.message);

      setTimeout(() => {
        window.location.href = "login.html";
      }, 3000);
    }
    const resendBtn = document.getElementById("resendTokenBtn");

    if (!resendBtn) return;

    resendBtn.addEventListener(
      "click",

      async function () {
        const response = await resendToken();

        if (!response) {
          showModal("Erro", "Erro inesperado.");

          return;
        }

        if (!response.data.success) {
          showModal("Erro", response.data.message);

          return;
        }

        showModal("Sucesso", response.data.message);
      },
    );
  },
);
