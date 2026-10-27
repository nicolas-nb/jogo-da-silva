# jogo-da-silva

## Testes

Execute a suíte automatizada com Node.js 20 ou superior:

```sh
npm test
```

Os testes usam o runner nativo do Node e não exigem instalação de dependências.

Consulte [docs/TESTES.md](docs/TESTES.md) para conhecer a cobertura, as limitações atuais e o roteiro de validação manual no navegador.

Para executar os cenários integrados com um painel visual, inicie `python3 -m http.server 8000` na raiz e abra [tests/test-runner.html](tests/test-runner.html).