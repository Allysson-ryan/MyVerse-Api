const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Token não fornecido ou mal formatado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("🔐 Erro na autenticação:", error.message);
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}

module.exports = authMiddleware;
