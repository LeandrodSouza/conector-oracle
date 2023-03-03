class LimitOffsetBuilder {
    constructor(limit = null, offset = null) {
      this.limit = limit;
      this.offset = offset;
    }
  
    setLimit(limit) {
      this.limit = limit;
      return this;
    }
  
    setOffset(offset) {
      this.offset = offset;
      return this;
    }
  
    build() {
      let result = '';
      if (this.limit !== null) {
        result += `FETCH FIRST ${this.limit} ROWS `;
      }
      if (this.offset !== null) {
        result += `OFFSET ${this.offset} ROWS`;
      }
      return result.trim();
    }
  }
  
  module.exports = LimitOffsetBuilder;
  