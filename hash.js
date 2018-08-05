const bcrypt = require("bcrypt");

async function run() {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  console.log(salt);
  console.log(hashed);
}

run();
