const showModal = (title, message) => {
  document.getElementById("feedbackModalTitle").innerHTML = title;

  document.getElementById("feedbackModalMessage").innerHTML = message;

  const modal = new bootstrap.Modal(document.getElementById("feedbackModal"));

  modal.show();
};

const verifyEmail = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/forgot-password",
      { email },
      { withCredentials: true },
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const forgotPassForm = document.getElementById("forgotPasswordForm");

  if (!forgotPassForm) return;

  forgotPassForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;

    if (!email) {
      showModal("Erro", "Necessário informar o e-mail");

      return;
    }

    const response = await verifyEmail(email);

    if (!response) {
      showModal("Erro", "Erro inesperado");

      return;
    }

    if (!response.data.success) {
      showModal("Erro", response.data.message);

      return;
    }

    forgotPassForm.classList.add("d-none");

    document.getElementById("returnLogin").classList.add("d-none");

    document.getElementById("successState").classList.remove("d-none");
  });
});
