const feedbackModalElement = document.getElementById("feedbackModal");

const feedbackModal = new bootstrap.Modal(feedbackModalElement);

const showModal = (title, message) => {
  document.getElementById("feedbackModalTitle").textContent = title;

  document.getElementById("feedbackModalMessage").textContent = message;

  feedbackModal.show();
};

const unlockAccount = async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8080/api/auth/unlockAccount",

      {
        email: data,
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
  const unlockForm = document.getElementById("unlockForm");

  if (!unlockForm) return;

  unlockForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    if (!email) {
      showModal("Erro", "Digite seu e-mail");

      return;
    }

    const response = await unlockAccount(email);

    if (!response.data.success) {
      showModal("Erro", response.data.message);

      return;
    }

    showModal("Sucesso", response.data.message);

    setTimeout(() => {
      window.location.href = "http://127.0.0.1:5500/pages/login.html";
    }, 2500);
  });
});
