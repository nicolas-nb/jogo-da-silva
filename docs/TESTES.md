# Guia da bateria de testes

## Objetivo

Este guia explica como instalar os pré-requisitos, executar e interpretar os testes do Jogo da Silva, além de registrar a cobertura atual e os passos recomendados para validar a aplicação antes de uma entrega.

A suíte automatizada é intencionalmente leve: usa o runner `node:test` e as asserções nativas do Node.js, sem bibliotecas de teste ou dependências para instalar.

## Pré-requisitos

- Node.js 20 ou superior.
- npm, incluído nas distribuições atuais do Node.js.
- Navegador moderno apenas para a verificação manual da interface.

Não é necessário executar `npm install`: o projeto não possui dependências npm externas.

Confira as versões disponíveis:

```sh
node --version
npm --version
```

## Executar a suíte

Na raiz do projeto, rode:

```sh
npm test
```

O comando executa `node --test`, que descobre os arquivos `*.test.mjs` dentro de `tests/`. O processo termina com código `0` quando todos os testes passam e diferente de `0` quando ocorre uma falha.

Para executar somente os testes das regras do jogo:

```sh
node --test tests/game-logic.test.mjs
```

Para executar somente as verificações de estrutura da página:

```sh
node --test tests/app-script.test.mjs
```

## Painel visual no navegador

Para acompanhar cenários de interface e interação sem ler a saída do terminal, inicie o servidor local na raiz do projeto:

```sh
python3 -m http.server 8000
```

Abra `http://localhost:8000/tests/test-runner.html` e selecione **Executar bateria**. O painel informa o progresso, a duração, a quantidade de aprovações/falhas e a mensagem de cada cenário que falhar. A execução limpa o armazenamento local do mesmo domínio para iniciar cada cenário com dados isolados.

Essa bateria no navegador cobre oito cenários: normalização PT-BR, feedback, letras repetidas, vocabulário diário, rejeição de palpite inválido, persistência após recarregar, vitória com estatísticas e compartilhamento sem spoiler. Ela importa as mesmas regras de `game-logic.mjs` usadas pelo jogo.

Para interromper o servidor, use `Ctrl+C` no terminal em que ele está rodando.

## O que está coberto

### Regras do jogo — `tests/game-logic.test.mjs`

- normalização de maiúsculas, minúsculas, acentos e cedilha;
- classificação de letras corretas, presentes em outra posição e ausentes;
- limite de ocorrências de letras repetidas na palavra-resposta;
- equivalência de respostas com e sem acento;
- erro explícito quando tentativa e resposta têm comprimentos diferentes;
- tamanho de todas as palavras diárias dentro do intervalo de 5 a 10 letras;
- presença de cada palavra diária no conjunto de palpites aceitos;
- escolha diária determinística durante um mesmo dia no horário local.

As regras são exportadas por `game-logic.mjs`; a página de jogo importa esse mesmo módulo, evitando manter uma segunda implementação usada apenas pelos testes.

### Estrutura da aplicação — `tests/app-script.test.mjs`

- existência do script principal como módulo e validação sintática de seu corpo;
- presença do anúncio de estado com `role="status"` e `aria-live="polite"`;
- presença dos botões de estatísticas, arquivo e compartilhamento.

Essas verificações são testes de estrutura, não substituem testes de navegador ou uma auditoria completa de acessibilidade.

## Verificação manual adicional no navegador

Mesmo com o painel automatizado, ainda vale conferir manualmente visual, teclado real, foco e comportamento em dispositivos/tamanhos diferentes. Inicie um servidor estático na raiz do projeto:

```sh
python3 -m http.server 8000
```

Abra `http://localhost:8000/index.html` e confira:

1. A página carrega sem erros no console e mostra 10 linhas de tentativas.
2. Teclado físico e teclado na tela aceitam letras; Backspace/apagar e Enter/enviar funcionam.
3. Uma tentativa com tamanho incompleto não é enviada.
4. Uma sequência fora do vocabulário de teste é recusada com uma mensagem compreensível.
5. Uma tentativa válida mostra pistas e atualiza o teclado.
6. Recarregar a página mantém o progresso do desafio diário.
7. Uma vitória e o esgotamento das 10 tentativas encerram a rodada e revelam a solução.
8. Estatísticas são atualizadas após o resultado final.
9. O compartilhamento não inclui o texto da palavra-resposta.
10. Arquivo, fechamento de diálogos, foco visível e layout em viewport móvel funcionam.

Para interromper o servidor, use `Ctrl+C` no terminal em que ele está rodando.

## Como interpretar falhas

- `not ok` identifica o teste que falhou; leia a mensagem e o diff da asserção no terminal.
- Falhas em `game-logic.test.mjs` normalmente indicam regressões em regras ou conteúdo lexical.
- Falhas em `app-script.test.mjs` indicam mudança na estrutura da página ou script que precisa ser revisada junto com os seletores/contratos testados.
- Se o servidor iniciar, mas a página não funcionar, confirme que foi iniciado na raiz do projeto e verifique erros no console do navegador.
- O navegador pode requisitar `/favicon.ico` e receber `404` se o projeto não fornecer favicon; isso é independente dos testes e do carregamento do jogo.

## Limites atuais da cobertura

- Os fluxos de navegador são executados pelo painel `tests/test-runner.html`; eles não fazem parte do comando `npm test`, que roda apenas a suíte Node.
- Não há teste automatizado de tecnologias assistivas, contraste, leitor de tela, viewport responsivo ou comportamento de diálogos.
- A lista de palavras válidas é pequena e editorial; os testes confirmam coerência estrutural, não correção ortográfica ou adequação cultural de cada entrada.
- As estatísticas e o arquivo dependem de armazenamento local e precisam de testes de integração próprios para cenários de recarga, dias diferentes, armazenamento indisponível e repetição de desafios.
- Os dados do navegador devem ser limpos entre verificações manuais quando um teste depender de um estado inicial limpo. No console do navegador, use `localStorage.clear()` e recarregue a página.

## Práticas para mudanças futuras

- Ao alterar uma regra, primeiro acrescente ou ajuste um teste em `tests/game-logic.test.mjs` e depois execute `npm test`.
- Mantenha as regras de domínio em `game-logic.mjs` sem dependência do DOM para facilitar testes determinísticos.
- Ao mudar IDs ou semântica importantes da interface, atualize as verificações de contrato em `tests/app-script.test.mjs` e valide a interação real no navegador.
- Ao adicionar dependências, documente a instalação e os comandos correspondentes neste guia e no `package.json`.
- Antes de publicar, execute `npm test` e complete a lista de verificação manual acima em desktop e celular.

## Resultado de referência

Na última execução registrada durante a criação deste guia, `npm test` concluiu com **10 testes aprovados e nenhuma falha**. Rode novamente o comando após qualquer alteração; este número descreve aquela execução, não garante o estado de execuções futuras.