export const resend = async (req, res) => {
  try {
    const id = req.session.preAuth?.IdUser;

    if (!id) {
      return res.status(401).json({
        success: false,

        message: "Sessão inválida.",

        code: "INVALID_SESSION",
      });
    }

    const result = await resendMail(id);

    if (!result.success) {
      const status = errorMap[result.code] || 500;

      return res.status(status).json({
        success: result.success,

        message: result.message,

        code: result.code,
      });
    }

    return res.status(200).json({
      success: true,

      message: result.message,

      code: result.code,
    });
  } catch (err) {
    console.error("Erro ao processar requisição", err);

    return res.status(500).json({
      success: false,

      message: "Erro ao processar requisição.",

      code: "INTERNAL_ERROR",
    });
  }
};
