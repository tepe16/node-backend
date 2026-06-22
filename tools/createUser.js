const bcrypt = require('bcryptjs');

const username = 'userbaru';
const email = 'superadmin@smkyabujah.sch.id';
const passwordPlain = 'admin123'; // ganti sesuai password yang diinginkan
const role = 'admin'; // bisa "admin" atau "user"

// Generate bcrypt hash
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(passwordPlain, salt);

// Buat SQL insert
const sql = `INSERT INTO users (username, email, password, role) 
VALUES ('${username}', '${email}', '${hash}', '${role}');`;

console.log('=== SQL untuk insert user baru ===');
console.log(sql);
