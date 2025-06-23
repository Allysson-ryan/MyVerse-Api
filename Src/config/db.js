const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🎲 Conectado ao MongoDB"))
  .catch((err) => console.error("❌ Erro ao conectar MongoDB:", err));
