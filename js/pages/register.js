const showModal = (title, message) => {
  document.getElementById("feedbackModalTitle").innerHTML = title;

  document.getElementById("feedbackModalMessage").innerHTML = message;

  const modal = new bootstrap.Modal(document.getElementById("feedbackModal"));

  modal.show();
};

const apiRegister = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",

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

document.addEventListener(
  "DOMContentLoaded",

  function () {
    const formRegister = document.getElementById("registerForm");

    if (!formRegister) return;

    formRegister.addEventListener(
      "submit",

      async function (e) {
        e.preventDefault();

        const data = {
          name: document.getElementById("name").value,

          email: document.getElementById("email").value,

          password: document.getElementById("password").value,

          confirmPassword: document.getElementById("confirmPassword").value,
        };

        const apiResponse = await apiRegister(data);

        console.log(apiResponse.data);

        if (!apiResponse) {
          showModal("Erro", "Erro inesperado.");

          return;
        }

        // erro de formulario
        let messageErrors = "";

        if (apiResponse.data.errors) {
          apiResponse.data.errors.forEach((errors) => {
            messageErrors += `
            • ${errors.msg}<br>
            `;
          });

          showModal("Erro", messageErrors);

          return;
        }

        // erro de usuario exixtente
        if (apiResponse.data.code === "USER_ALREADY_EXISTS") {
          showModal("Erro", apiResponse.data.message);

          return;
        }

        // erro de falha do envio de email
        if (apiResponse.data.code === "USER_CREATED_EMAIL_FAILED") {
          showModal("Atenção", apiResponse.data.message);

          return;
        }

        // erro da base de dads
        if (apiResponse.data.code === "DATABASE_ACCESS_ERROR") {
          showModal("Erro interno", apiResponse.data.message);

          return;
        }

        // erro servidor
        if (apiResponse.data.code === "INTERNAL_ERROR") {
          showModal("Erro interno", apiResponse.data.message);

          return;
        }

        // cadastro
        if (apiResponse.data.success) {
          showModal("Sucesso", apiResponse.data.message);

          setTimeout(() => {
            window.location.href = "http://127.0.0.1:5500/pages/login.html";
          }, 2500);

          return;
        }
      },
    );
  },
);
