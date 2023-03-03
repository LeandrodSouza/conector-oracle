const dotenv = require('dotenv');
const { connectToDatabase } = require('./app/database');
const { OracleSelect, WhereBuilder, OrderByBuilder, LimitOffsetBuilder } = require('./app/select');
const { CustomError } = require('./app/error');

dotenv.config();

const env = {
  ORACLE_DB_USER: process.env.ORACLE_DB_USER,
  ORACLE_DB_PASSWORD: process.env.ORACLE_DB_PASSWORD,
  ORACLE_DB_CONNECTION_STRING: process.env.ORACLE_DB_CONNECTION_STRING
};

(async function () {
  await connectToDatabase(env);

  const select = new OracleSelect('employees', ['employee_id', 'first_name', 'last_name'])
    .where(WhereBuilder.equals('department_id', 90))
    .orderBy(OrderByBuilder.desc('last_name'))
    .limit(LimitOffsetBuilder.limit(10))
    .offset(LimitOffsetBuilder.offset(0));

  try {
    await select.execute(env);
  } catch (err) {
    const customError = new CustomError('An error occurred while executing the SELECT statement', 500);
    console.error(customError);
  }
})();
