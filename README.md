---

# Nome do Projeto

## Descrição do Projeto
Desafio abbiamo de uma api em arquitetura orientada a eventos onde controlo ordem de compra de produto
## Passos para Rodar o Projeto Localmente
1. **Clone o repositório:**
    ```bash
    git clone https://github.com/HelioHD/desafio-abbiamo
    ```
2. **Navegue até o diretório do projeto:**
    ```bash
    cd seu-projeto
    ```
3. **Instale as dependências:**
    ```bash
    npm install
    ```
4. Rode o docker compose up -d 
     ```bash
    docker compose up -d
    ```
5. Baixe o mongodb e mongodb compass, use esse link:
     ```bash
    https://www.mongodb.com/try/download/community
    ```
6. **Inicie a aplicação:**
    ```bash
    npm start
    ```
7. **Abra o insomnia em:**
    ```
    POST http://localhost:3000/orders
    ```

## Link do Deploy
Infelizmente pela correria entre o trabalho atual com esse desafio não deu para ir a fundo para o deploy em produção

## Justificativa das Escolhas Técnicas
### Mensageria
Eu escolhi o kafka por conta da facilidade de experiências anteriores.

---
