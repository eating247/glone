const mysql = require('mysql2');

console.log('Attempting to connect to MySQL...');
console.log('Host: 127.0.0.1');
console.log('Port: 3306');
console.log('User: appuser');
console.log('Database: gmail_clone');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'appuser',
  password: 'apppass',
  database: 'gmail_clone',
  debug: false,
  acquireTimeout: 60000,
  timeout: 60000
});

connection.connect((err) => {
  if (err) {
    console.error('Connection failed:');
    console.error('Code:', err.code);
    console.error('errno:', err.errno);
    console.error('sqlState:', err.sqlState);
    console.error('sqlMessage:', err.sqlMessage);
    return;
  }
  console.log('✅ Connection successful!');
  connection.end();
});
