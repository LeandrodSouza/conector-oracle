class WhereBuilder {
    constructor(column) {
      this.column = column;
      this.operator = '=';
      this.value = null;
    }
  
    equals(value) {
      this.operator = '=';
      this.value = value;
      return this;
    }
  
    notEquals(value) {
      this.operator = '<>';
      this.value = value;
      return this;
    }
  
    greaterThan(value) {
      this.operator = '>';
      this.value = value;
      return this;
    }
  
    greaterThanOrEquals(value) {
      this.operator = '>=';
      this.value = value;
      return this;
    }
  
    lessThan(value) {
      this.operator = '<';
      this.value = value;
      return this;
    }
  
    lessThanOrEquals(value) {
      this.operator = '<=';
      this.value = value;
      return this;
    }
  
    like(value) {
      this.operator = 'LIKE';
      this.value = value;
      return this;
    }
  
    notLike(value) {
      this.operator = 'NOT LIKE';
      this.value = value;
      return this;
    }
  
    in(values) {
      this.operator = 'IN';
      this.value = values;
      return this;
    }
  
    notIn(values) {
      this.operator = 'NOT IN';
      this.value = values;
      return this;
    }
  
    between(lowerBound, upperBound) {
      this.operator = 'BETWEEN';
      this.value = [lowerBound, upperBound];
      return this;
    }
  
    build() {
      if (this.value === null) {
        throw new Error('Value is required');
      }
  
      if (Array.isArray(this.value)) {
        return `${this.column} ${this.operator} ${this.value[0]} AND ${this.value[1]}`;
      }
  
      if (typeof this.value === 'string') {
        return `${this.column} ${this.operator} '${this.value}'`;
      }
  
      return `${this.column} ${this.operator} ${this.value}`;
    }
  }
  
  module.exports = WhereBuilder;
  