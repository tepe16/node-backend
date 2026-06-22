const bcrypt = require('bcryptjs');
const readline = require('readline');

// CLI prompt biar bisa input password langsung
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Masukkan password yang ingin di-hash: ', passwordPlain => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(passwordPlain, salt);

  console.log('\n=== Hash Password Bcrypt ===');
  console.log(hash);

  console.log('\n=== SQL Insert Contoh ===');
  console.log(
    `INSERT INTO users (username, email, password, role) VALUES ('username','email@example.com','${hash}','user');`
  );

  rl.close();
});
