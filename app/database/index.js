const oracledb = require('oracledb');

async function connectToDatabase(env) {
  try {
    await oracledb.createPool({
      user: env.ORACLE_DB_USER,
      password: env.ORACLE_DB_PASSWORD,
      connectString: env.ORACLE_DB_CONNECTION_STRING,
      poolMax: 10,
      poolMin: 2,
      poolIncrement: 2,
      poolTimeout: 60
    });
    console.log('Connected to Oracle Database');
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  connectToDatabase
};
