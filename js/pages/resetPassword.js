const showModal = (title, message) => {
  document.getElementById("feedbackModalTitle").innerHTML = title;

  document.getElementById("feedbackModalMessage").innerHTML = message;

  const modal = new bootstrap.Modal(document.getElementById("feedbackModal"));

  modal.show();
};

const verifyToken = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/reset-password",
      data,
      { withCredentials: true },
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const resetPasswordForm = document.getElementById("resetPasswordForm");

  if (!resetPasswordForm) return;

  resetPasswordForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);

    const data = {
      token: params.get("token"),
      password: document.getElementById("password").value.trim(),
      confirmPassword: document.getElementById("confirmPassword").value.trim(),
    };

    const response = await verifyToken(data);

    if (!response) {
      showModal("Erro", "Erro inesperado.");

      return;
    }

    if (!response.data.success && response.data.errors) {
      const errors = response.data.errors;
      let errosList = "";

      errors.forEach((error) => {
        errosList += `${error.msg}<br>`;
      });
      showModal("Erro", errosList);

      return;
    }
    if (!response.data.success) {
      document.getElementById("passwordError").innerHTML =
        response.data.message;
    }

    if (response.data.success) {
      showModal("Sucesso", response.data.message);

      setTimeout(() => {
        window.location.href = "http://127.0.0.1:5500/pages/login.html";
      }, 2500);
    }
  });
});
