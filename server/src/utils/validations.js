function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{8,}$/;
  return regex.test(password);
}

function validateName(name) {
  const regex = /^[A-Za-zÀ-ÿ\s]{3,20}$/;
  return regex.test(name);
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Permite cualquier dominio
  return regex.test(email);
}

module.exports = {
  validatePassword,
  validateName,
  validateEmail,
};
