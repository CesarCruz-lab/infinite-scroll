# Infinite scroll
Sessão de posts requisitados conforme a tela chega ao fim.

Os posts são chamados de uma [API fake](https://jsonplaceholder.typicode.com).

__Como fazer requisição dos dados:__

* Url e configurações e pedido
```js
const url = 'https://jsonplaceholder.typicode.com/posts&_limit=5$_page=1'
const config = {
    method: 'GET',
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
    },
    cache: 'no-cache' // Opcional
}
```

* Obtendo os dados

```js
fetch(url, config)
    .then(response => response.json())
    .then(res => console.log(res))
    .catch(error => console.log(error)) // Em caso de erro
```
