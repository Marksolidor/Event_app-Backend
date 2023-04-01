const jwt = require("jsonwebtoken");

const validateToken = async (tokenLocal) => {
  try {
    const validate = await jwt.verify(
      tokenLocal,
      process.env.JWT_SECRET,
      (err, payload) => {
        if (err) {
          throw new Error("Token no valido", err);
        }
        return payload;
      }
    );
    return validate;
  } catch (e) {
    return e;
  }
};

module.exports = { validateToken };