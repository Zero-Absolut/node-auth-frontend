const oldPasswords = await PasswordHistories.findAll({
  where: {
    userId: user.id,
  },

  order: [["createdAt", "DESC"]],

  limit: 5,
});

for (const oldPassword of oldPasswords) {
  const isSamePassword = await bcrypt.compare(
    newPassword,
    oldPassword.passwordHash,
  );

  if (isSamePassword) {
    return {
      success: false,
      message: "Senha já utilizada anteriormente.",
      code: "PASSWORD_ALREADY_USED",
    };
  }
}
