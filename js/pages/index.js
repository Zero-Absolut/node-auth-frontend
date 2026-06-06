//chamada do modal

function showMessageModal(title, message) {
  document.getElementById("messageModalTitle").textContent = title;

  const messageText = document.getElementById("messageModalText");

  messageText.textContent = message;
  messageText.style.color = "#fff";

  const modal = new bootstrap.Modal(document.getElementById("messageModal"));

  modal.show();
}
//fim chamada do modal

window.addEventListener("load", async () => {
  console.log("INICIO");

  try {
    const response = await axios.get("http://127.0.0.1:8080/api/auth/me", {
      withCredentials: true,
    });

    const dataUser = response.data.data;

    console.log(dataUser);

    document.getElementById("totalSessions").textContent =
      dataUser.activeSessions;

    document.getElementById("activeSessions").textContent =
      dataUser.activeSessions;

    document.getElementById("userPsswordChange").textContent =
      dataUser.passwordsChange;

    document.getElementById("userName").textContent = dataUser.user.name;

    document.getElementById("userEmail").textContent = dataUser.user.email;

    if (dataUser.user.provider === "local" && dataUser.user.googleId) {
      document.getElementById("authProvider").textContent = "Local + Google";
      document.getElementById("authProviderProfile").textContent =
        "Local + Google";
      document.getElementById("linkedProviders").textContent = "Local + Google";

      document.getElementById("accountProtectionStatus").textContent =
        "Usuário Verificado";
    } else {
      document.getElementById("authProvider").textContent =
        dataUser.user.provider;

      document.getElementById("authProviderProfile").textContent =
        dataUser.user.provider;

      document.getElementById("linkedProviders").textContent =
        dataUser.user.provider;

      document.getElementById("linkedProviders").textContent =
        "Autenticação em dois fatores";
    }

    if (dataUser.user.isActive) {
      document.getElementById("accountStatus").innerHTML =
        '<span class="status-success">● Ativa</span>';
    } else {
      document.getElementById("accountStatus").innerHTML =
        '<span class="status-danger">● Inativa</span>';
    }

    if (dataUser.activeSessionsUser.isActive) {
      document.getElementById("sessionStatus").textContent = "Ativo";
    } else {
      document.getElementById("sessionStatus").textContent = "Inativo";
    }

    document.getElementById("sessionExpiration").textContent =
      dataUser.activeSessionsUser.expiresAt;

    document.getElementById("sessionDevice").textContent = dataUser.browser;
    document.getElementById("device").textContent = dataUser.browser;

    document.getElementById("logsCount").textContent = dataUser.logs.length;

    if (dataUser.passwords.length > 0) {
      const index = dataUser.passwords.length - 1;

      document.getElementById("passwordHistoryCount").textContent =
        "Protocolo: " + dataUser.passwords[index].createdAt;
    } else {
      document.getElementById("passwordHistoryCount").textContent =
        "Nenhuma troca de senha registrada";
    }
    let logsContainer = "";

    dataUser.logs.forEach((log) => {
      logsContainer += `
    <div class="mb-3">
      <strong>${log.description}</strong><br>
      <small>${log.createdAt}</small>
    </div>
  `;
    });

    document.getElementById("logsContainer").innerHTML = logsContainer;
    // troca de nome
    document
      .getElementById("saveNameBtn")
      .addEventListener("click", async () => {
        const newName = document.getElementById("newName").value.trim();

        if (!newName) {
          alert("Informe um nome.");
          return;
        }

        try {
          const response = await axios.put(
            "http://127.0.0.1:8080/api/auth/change-name",
            {
              name: newName,
            },
            {
              withCredentials: true,
            },
          );

          console.log(response.data);

          if (response.data.code === "NAME_UPDATED") {
            document.getElementById("userName").textContent = newName;
            document.getElementById("userNameHeader").textContent = newName;

            document.getElementById("newName").value = "";

            bootstrap.Modal.getInstance(
              document.getElementById("changeNameModal"),
            ).hide();

            showMessageModal("Sucesso", response.data.message);
          }
        } catch (err) {
          console.error(err);
        }
      });

    // troca de senha
    document
      .getElementById("changePasswordBtn")
      .addEventListener("click", async () => {
        const password = document.getElementById("newPassword").value;
        const confirmPassword =
          document.getElementById("confirmPassword").value;

        if (!password || !confirmPassword) {
          alert("Preencha todos os campos.");
          return;
        }

        if (password !== confirmPassword) {
          alert("As senhas não coincidem.");
          return;
        }

        try {
          const response = await axios.put(
            "http://127.0.0.1:8080/api/auth/change-password",
            {
              password,
            },
            {
              withCredentials: true,
            },
          );

          console.log(response.data);

          if (response.data.code === "PASSWORD_CHANGED") {
            document.getElementById("newPassword").value = "";
            document.getElementById("confirmPassword").value = "";

            bootstrap.Modal.getInstance(
              document.getElementById("changePasswordModal"),
            ).hide();

            showMessageModal("Sucesso", response.data.message);
          } else {
            showMessageModal("Erro", "Erro ao alterar senha.");
          }
        } catch (err) {
          console.error(err);

          showMessageModal(
            "Erro",
            err.response?.data?.message || "Erro interno.",
          );
        }
      });
    //excluir conta

    document
      .getElementById("deleteAccountBtn")
      .addEventListener("click", async () => {
        const confirmDelete = confirm(
          "Deseja realmente excluir sua conta? Esta ação não poderá ser desfeita.",
        );

        if (!confirmDelete) {
          return;
        }

        try {
          const response = await axios.delete(
            "http://127.0.0.1:8080/api/auth/delete-account",
            {
              withCredentials: true,
            },
          );

          alert(response.data.message || "Conta excluída com sucesso.");

          window.location.replace("/pages/login.html");
        } catch (err) {
          console.error(err);

          alert(
            err.response?.data?.message ||
              "Erro ao excluir conta. Tente novamente.",
          );
        }
      });
  } catch (error) {
    console.error(error);
    console.error("ERRO DASHBOARD:");
    console.error(error);

    window.location.href = "/pages/login.html";
  }
});
