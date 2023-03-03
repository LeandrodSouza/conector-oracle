# Conector Oracle para Node.js

> ### Este projeto é um conector para banco de dados Oracle em Node.js, que permite executar consultas SELECT de forma mais flexível e com maior desempenho. 

A estrutura de pastas e arquivos do projeto é a seguinte:
```
- index.js
- app/
  - database/
    - index.js
  - select/
    - index.js
    - OracleSelect.js
    - WhereBuilder.js
    - OrderByBuilder.js
    - LimitOffsetBuilder.js
  - error/
    - index.js
    - CustomError.js
```

> Os arquivos e pastas são organizados da seguinte forma:

- `index.js`: arquivo principal do projeto, que exporta as classes e métodos principais do conector.

- `app/database/`: pasta que contém o arquivo `index.js`, que exporta a classe `Database`, responsável pela conexão com o banco de dados Oracle.

- `app/select/`: pasta que contém as classes responsáveis pela construção de consultas SELECT:

  - `index.js`: arquivo que exporta as classes `OracleSelect`, `WhereBuilder`, `OrderByBuilder` e `LimitOffsetBuilder`.

  - `OracleSelect.js`: classe que encapsula a lógica de construção de consultas SELECT no banco de dados Oracle.

  - `WhereBuilder.js`: classe que encapsula a lógica de construção da cláusula WHERE das consultas SELECT.

  - `OrderByBuilder.js`: classe que encapsula a lógica de construção da cláusula ORDER BY das consultas SELECT.

  - `LimitOffsetBuilder.js`: classe que encapsula a lógica de construção da cláusula LIMIT e OFFSET das consultas SELECT.

- `app/error/`: pasta que contém as classes responsáveis pelo tratamento de erros:

  - `index.js`: arquivo que exporta a classe `CustomError`.

  - `CustomError.js`: classe que encapsula a lógica de criação de erros personalizados.

> Para usar o conector Oracle em seu projeto Node.js, basta importar o arquivo `index.js` e criar uma instância da classe `OracleSelect`, passando as configurações de conexão com o banco de dados Oracle. Em seguida, você pode usar os métodos da classe `OracleSelect` para construir suas consultas SELECT.

Exemplo de uso:

```javascript
const { OracleSelect } = require('./index');

const config = {
  user: 'usuario',
  password: 'senha',
  connectString: 'localhost:1521/xe',
};

const oracleSelect = new OracleSelect(config);

const result = await oracleSelect
  .select('nome', 'email')
  .from('usuarios')
  .where('ativo = :1', true)
  .orderBy('nome')
  .limit(10)
  .offset(20)
  .execute();

console.log(result);
