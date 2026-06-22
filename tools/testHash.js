const bcrypt = require('bcryptjs');

const hash = '$2b$10$u7w7HEiQ2ZGkJtZnPKm9YOb0WtrmshprFqVb3Kqf3bZ0Q8cXxq5iW'; // dari database
const password = '123456'; // password yang dicoba login

console.log(bcrypt.compareSync(password, hash)); // true = cocok, false = salah
