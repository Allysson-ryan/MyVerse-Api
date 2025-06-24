const express = require("express");
const passport = require("passport");
const router = express.Router();
const reviewController = require("./Controllers/reviewController");
const wishlistController = require("./Controllers/wishlistController");
const categoryController = require("./Controllers/categoryController");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./Model/UserModel");
const authMiddleware = require("./middleware/authMiddleware");

router.get("/reviews", authMiddleware, reviewController.getAllReviews);
router.get(
  "/reviews/latest",
  authMiddleware,
  reviewController.getLatestReviews
);
router.post("/reviews", authMiddleware, reviewController.createReview);
router.get("/reviews/:id", authMiddleware, reviewController.getReviewById);
router.put("/reviews/:id", authMiddleware, reviewController.updateReview);
router.delete("/reviews/:id", authMiddleware, reviewController.deleteReview);

router.get("/wishlist", authMiddleware, wishlistController.getWishlist);
router.post("/wishlist", authMiddleware, wishlistController.createWishlist);
router.put("/wishlist/:id", authMiddleware, wishlistController.updateWishlist);
router.delete(
  "/wishlist/:id",
  authMiddleware,
  wishlistController.deleteWishlist
);

router.get("/categories", authMiddleware, categoryController.getCategories);
router.post("/categories", authMiddleware, categoryController.createCategory);
router.put(
  "/categories/:id",
  authMiddleware,
  categoryController.updateCategory
);
router.delete(
  "/categories/:id",
  authMiddleware,
  categoryController.deleteCategory
);

//teste cors
router.get("/ping", (req, res) => {
  res.json({ message: "API funcionando com CORS ✅" });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, nome: req.user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.redirect(`${process.env.FRONTEND_REDIRECT_URL}?token=${token}`);
  }
);

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.senha)
      return res.status(401).json({ error: "Credenciais inválidas." });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch)
      return res.status(401).json({ error: "Credenciais inválidas." });

    const token = jwt.sign(
      { id: user._id, nome: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ id: user._id, nome: user.name, token });
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

router.post("/register", async (req, res) => {
  const name = req.body.name?.trim();
  const email = req.body.email?.trim().toLowerCase();
  const senha = req.body.senha;

  try {
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(409).json({ error: "Email já cadastrado." });
    }

    const hashed = await bcrypt.hash(senha, 10);
    const user = await User.create({ name, email, senha: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({ token });
  } catch (err) {
    console.error("Erro ao registrar:", err);

    if (err.code === 11000) {
      return res.status(409).json({ error: "Email já cadastrado." });
    }

    return res.status(500).json({ error: "Erro ao registrar usuário." });
  }
});

module.exports = router;
