# PRD — Jogo casual de adivinhação de palavras

## 1. Visão geral

Este produto consiste em um jogo casual de adivinhação de palavras em português brasileiro, com foco em partidas rápidas, regras simples e retorno diário. O objetivo é oferecer uma experiência lúdica, fácil de aprender, acessível e agradável em web, sem necessidade de cadastro ou login.

## 2. Problema a resolver

O público-alvo busca experiências rápidas de entretenimento em dispositivos móveis e desktop, com baixa fricção de entrada e um loop de jogo claro. O jogo deve ser simples o bastante para ser entendido em segundos, mas com o suficiente para gerar curiosidade e repetição.

## 3. Objetivo do produto

Criar um jogo diário de adivinhação de palavras que permita:
- jogar em poucos segundos;
- entender a regra sem tutorial extenso;
- completar uma partida em poucos minutos;
- voltar no dia seguinte para repetir a rotina;
- compartilhar resultados sem expor a resposta;
- manter uma estética clara, acessível e amigável.

## 4. Usuários

### 4.1 Usuário principal
- pessoas que gostam de jogos casuais;
- jogadores que querem uma experiência rápida e não competitiva;
- usuários que acessam a web em navegador, sem necessidade de instalação.

### 4.2 Contexto de uso
- em deslocamento;
- em intervalos curtos;
- em aparelhos móveis e desktops;
- em sessões de 1 a 5 minutos.

## 5. Requisitos funcionais

### 5.1 Gameplay
- O jogo deve apresentar uma palavra diária com tamanho variando entre 5 e 10 letras.
- O jogador deve ter até 10 tentativas para descobrir a palavra.
- Cada tentativa deve ser comparada com a solução e receber feedback por letra.
- A interface deve indicar se a letra está:
  - correta e na posição correta;
  - correta, mas em outra posição;
  - ausente.
- O game deve manter uma mensagem clara de vitória, derrota ou tentativa em andamento.
- Ao final da rodada, a solução deve ser exibida.

### 5.2 Entrada e interface
- O jogo deve aceitar digitação por teclado físico e por teclado visual na tela.
- O jogador deve poder apagar letras e enviar a tentativa com teclado ou botão.
- A interface deve funcionar em desktop e mobile.
- O layout deve seguir uma linguagem visual clara, com foco em legibilidade.

### 5.3 Acessibilidade
- todas as ações devem ser operáveis por teclado;
- o foco deve ser visível em todos os elementos interativos;
- o feedback visual não deve depender somente da cor;
- o estado da rodada deve ser anunciado por leitor de tela;
- o contraste deve ser adequado para o conteúdo textual.

### 5.4 Persistência local
- o jogo deve guardar estatísticas no navegador;
- o jogador deve ter acesso ao arquivo de desafios anteriores;
- o histórico deve funcionar sem autenticação.

### 5.5 Compartilhamento
- o usuário deve poder compartilhar um resultado sem revelar a resposta;
- a mensagem de compartilhamento deve ser curta e legível;
- o compartilhamento deve ser opcional.

## 6. Requisitos não funcionais

### 6.1 Usabilidade
- a regra deve ser entendida em menos de 10 segundos;
- o fluxo deve exigir o mínimo de cliques;
- o tabuleiro deve ser legível em telas pequenas.

### 6.2 Performance
- a interface deve carregar rapidamente;
- a lógica do jogo deve ser leve e responsiva;
- não deve haver atrasos perceptíveis na interação.

### 6.3 Manutenibilidade
- a lógica deve ser modular e fácil de alterar;
- a estrutura HTML, CSS e JS deve estar organizada;
- regras editoriais e UI devem poder evoluir sem quebrar o jogo.

## 7. Regras de conteúdo

- as palavras devem ser em português brasileiro;
- a dificuldade deve priorizar palavras conhecidas e acessíveis;
- palavras de uso duvidoso, ofensivas ou excessivamente regionais devem ser evitadas;
- o acento deve ser aceito com ou sem marca gráfica;
- a solução final deve ser exibida corretamente, mesmo quando o jogador digitar sem acento.

## 8. Critério de sucesso

O produto será considerado adequado para o MVP quando:
- o jogador consegue iniciar, jogar e finalizar uma rodada sem ajuda externa;
- o desafio é compreensível em poucos segundos;
- o jogo funciona bem em dispositivos móveis e desktop;
- o compartilhamento e o histórico funcionam apropriadamente;
- a acessibilidade básica está presente;
- o produto transmite sensação de jogo casual, sem fricção ou excesso de complexidade.

## 9. Escopo do MVP

### Incluído
- desafio diário;
- tabuleiro com 10 tentativas;
- regras de envio e validação;
- feedback por letra;
- compartilhamento sem spoiler;
- estatísticas locais;
- arquivo de desafios antigos;
- suporte a teclado e mobile.

### Excluído
- ranking global;
- login;
- backend;
- multiplayer;
- anúncios;
- monetização no MVP.

## 10. Entregáveis esperados

- interface funcional do jogo;
- lógica de palavras, tentativas e feedback;
- persistência local;
- documentação técnica e de produto;
- validação de acessibilidade e usabilidade.
