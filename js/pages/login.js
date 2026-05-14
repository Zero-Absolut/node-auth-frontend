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

    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    const resposnseApi = await apiLogin(data);

    if (
      !resposnseApi.data.success &&
      resposnseApi.data.code !== "ACCOUNT_NOT_ACTIVE"
    ) {
      document.getElementById("emailError").innerHTML =
        resposnseApi.data.message;

      return;
    }
    if (resposnseApi.data.code === "ACCOUNT_NOT_ACTIVE") {
      window.location.href = "http://127.0.0.1:5500/pages/verify-account.html";

      return;
    }

    if (resposnseApi.data.code === "TWO_FACTOR_REQUIRED") {
      showModal("Sucesso", resposnseApi.data.message);
      window.location.href = "http://127.0.0.1:5500/pages/verify2fa.html";
    }
  });
});
