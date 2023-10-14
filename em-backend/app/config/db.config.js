const fs = require('fs');

module.exports = {
  HOST: 'em-platypus.mysql.database.azure.com',
  USER: 'admin_em',
  PASSWORD: 'em-platypus2023',
  DB: 'budgerigar',
  PORT: '3306',
  SSL: {
    ca: fs.readFileSync(require.resolve('./cloud-db-cert.txt')),
  },
};
