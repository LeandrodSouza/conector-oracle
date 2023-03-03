class OrderByBuilder {
    constructor(column) {
      this.column = column;
      this.order = 'ASC';
    }
  
    asc() {
      this.order = 'ASC';
      return this;
    }
  
    desc() {
      this.order = 'DESC';
      return this;
    }
  
    build() {
      return `${this.column} ${this.order}`;
    }
  }
  
  module.exports = OrderByBuilder;
  