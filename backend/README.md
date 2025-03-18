# Easy Creche API

## Passo a passo para contribuir com a api

- Faça um Fork da aplicaçao.
- Faça as instalações de dependencias:

```bash
    composer install
```
```bash
    npm install
```

- Na sua aplicação, no diretório `backend`, copie o arquivo `.env.example` para o arquivo `.env`

```bash
    cp .env.example .env
```

- Após isto, gere a key da aplicação com:

```bash
    php artisan key:generate
```

- Após, siga o passo a passo para configuração do docker (na pasta .docker)

- Após isto, a aplicação deve estar disponível na porta 8084 em localhost:
    - http://localhost:8084/api

- Para verificar se tudo está correto, pode ser enviada uma requisição do tipo `GET` para o endpoint `/`, que deve retornar:

```json
{
    "healthcheck": true
}
```

## Passo a passo para contribuir:

```bash
    git checkout main
```

- Gere uma branch a partir da main com um nome breve e descritivo:

```bash
    git checkout -b "NOME_DA_BRANCH"
```

- Com isto, você já estará trabalhando na sua branch.
- Após realizar seu código, execute na raiz de `backend`:

```bash
    git add .
```
```bash
    git commit -m "Uma breve descrição do que foi feito"
```
```bash
    git push NOME_DA_BRANCH main
```

- Com isto, você terá enviado seu código para o github. Lá, será possível criar uma Pull Request para a branch main, que deverá ser aprovada e feito o merge caso esteja funcional.
### **NÃO ESQUEÇA DE COMITAR SEU CÓDIGO PARA O REPOSITÓRIO E CRIAR A PULL REQUEST!!**
