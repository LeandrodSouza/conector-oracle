class OracleSelect {
  constructor(tableName, columns = ['*']) {
    this.tableName = tableName;
    this.columns = columns;
    this.whereClause = null;
    this.orderByClause = null;
    this.rowNumClause = null;
    this.limitClause = null;
    this.cache = null;
  }

  where(condition) {
    this.whereClause = `WHERE ${condition.build()}`;
    return this;
  }

  orderBy(orderByBuilder) {
    this.orderByClause = `ORDER BY ${orderByBuilder.build()}`;
    return this;
  }

  rowNum(rowNum) {
    if (rowNum < 0) {
      throw new Error('Invalid row number');
    }
    this.rowNumClause = `AND ROWNUM >= ${rowNum + 1}`;
    return this;
  }

  limit(limit) {
    this.limitClause = `FETCH FIRST ${limit} ROWS ONLY`;
    return this;
  }

  async execute(env) {
    const { ORACLE_DB_USER, ORACLE_DB_PASSWORD, ORACLE_DB_CONNECTION_STRING } = env;

    if (this.cache) {
      const result = this.cache.get(this.getCacheKey());
      if (result) {
        return result;
      }
    }

    let conn;

    try {
      conn = await oracledb.getConnection({
        user: ORACLE_DB_USER,
        password: ORACLE_DB_PASSWORD,
        connectString: ORACLE_DB_CONNECTION_STRING
      });

      const query = `SELECT ${this.columns.join(', ')} FROM ${this.tableName} ${this.whereClause || ''} ${this.orderByClause || ''} ${this.rowNumClause || ''} ${this.limitClause || ''}`;
      const result = await conn.execute(query);

      if (this.cache) {
        this.cache.set(this.getCacheKey(), result);
      }

      console.log(result);
      return result;
    } catch (err) {
      const customError = new CustomError('An error occurred while executing the SELECT statement', 500);
      console.error(customError);
      throw customError;
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  useCache(cache, cacheKeyGenerator) {
    this.cache = cache;
    this.cacheKeyGenerator = cacheKeyGenerator;
    return this;
  }

  getCacheKey() {
    return this.cacheKeyGenerator(this.tableName, this.columns, this.whereClause, this.orderByClause, this.rowNumClause, this.limitClause);
  }
}

module.exports = OracleSelect;
