# Documento de projeto técnico — Jogo da adivinhação de palavras

## 1. Visão geral

Este documento descreve a implementação técnica do jogo casual de adivinhação de palavras, com base no design escolhido: a direção Caderno.

A proposta é um jogo web, responsivo, sem necessidade de login, com uma experiência diária simples e acolhedora. O foco é a clareza da regra, a velocidade de partida e a sensação de progresso contínuo, sem sobrecarregar o jogador com menus ou regras complexas.

O produto principal segue a mecânica de:
- uma palavra por dia;
- 10 tentativas;
- palavras com 5 a 10 letras;
- feedback por posição e presença das letras;
- suporte a PT-BR, incluindo acentos tolerados;
- compartilhamento sem revelar a resposta;
- histórico local e arquivo de desafios antigos.

## 2. Objetivos do projeto

### 2.1 Objetivo principal
Oferecer uma experiência de jogo diário rápida, acessível e agradável, com alto potencial de retorno e compartilhamento social sem frustrar o usuário.

### 2.2 Objetivos de produto
- permitir que o jogador entenda as regras em menos de 10 segundos;
- reduzir a fricção de entrada;
- manter o jogo legível em telas pequenas e grandes;
- oferecer clareza visual sem depender só de cor;
- permitir continuar jogando sem cadastro;
- manter o conteúdo em português do Brasil, com grafia e feedback consistentes;
- preservar a sensação de diversão casual, não competitiva.

### 2.3 Critérios de sucesso do MVP
- o jogador consegue completar uma rodada sem ajuda externa;
- o fluxo de jogo permanece funcional em desktop e mobile;
- o jogo funciona sem conta e sem backend;
- as estatísticas e o arquivo de desafios funcionam localmente;
- o compartilhamento não revela a resposta;
- a interface é acessível por teclado e por tecnologias assistivas.

## 3. Direção visual selecionada: Caderno

A direção Caderno foi escolhida por oferecer a melhor combinação de:
- legibilidade;
- calma visual;
- clareza de informação;
- sensação de jogo editorial e confiável;
- adequação ao público geral e ao comportamento casual.

### 3.1 Características visuais
- fundo suave, com textura discreta e aspecto editorial;
- painel central com larga legibilidade;
- bordas finas e contraste controlado;
- paleta equilibrada entre neutro, acento e status de letras;
- foco em leitura e inteligência do feedback, não em distração visual.

### 3.2 Impacto no produto
- a curva de aprendizado é menor;
- o estado do jogo é mais legível em telas pequenas;
- a sensação de “jogo sério e bem feito” compensa a ausência de elementos super lúdicos;
- a experiência funciona bem para uso diário em conexão curta e sem fricção.

## 4. Escopo funcional

### 4.1 Funcionalidades do MVP
- página de jogo principal;
- desafio diário com word length fixo por dia;
- 10 tentativas;
- input por teclado físico e por teclado virtual;
- validação de letras e palavras;
- feedback por estado de cada letra;
- mensagem de status e instruções;
- resultado de vitória ou derrota;
- botão de compartilhamento sem spoiler;
- estatísticas locais;
- arquivo de desafios antigos;
- alternância visual entre versões de conceito, apenas em protótipo.

### 4.2 O que fica fora do MVP
- ranking global;
- login/cadastro;
- backend de persistência;
- multiplayer;
- autenticação;
- anúncios;
- analytics de terceiros;
- geração automática de palavras por IA ou por serviço externo.

## 5. Regras e lógica do jogo

### 5.1 Regras centrais
- A palavra sorteada tem 5 a 10 letras.
- O jogador possui até 10 tentativas para adivinhar.
- O tamanho da palavra varia por desafio diário.
- A entrada aceita letras maiúsculas e minúsculas.
- A comparação ignora acentos para facilitar a interação, mas a solução pode ser exibida com grafia correta.
- Cada letra recebe um estado:
  - correta: letra certa na posição certa;
  - presente: letra existe na palavra, em outra posição;
  - ausente: letra não existe na palavra.
- O jogo revela a resposta ao final da rodada, bem como o resultado em caso de derrota.

### 5.2 Regras específicas para PT-BR
- aceitar grafia com ou sem acento;
- manter consistência de caixa e normalização;
- evitar termos sensíveis, ofensivos ou ambíguos;
- priorizar palavras de uso corrente;
- separar claramente as regras de “palavra possível” e “palavra válida” no conjunto editorial.

### 5.3 Exemplo de fluxo
1. A página abre com o desafio atual.
2. O usuário digita letras ou usa o teclado virtual.
3. A tentativa é validada.
4. O sistema compara a tentativa com a solução.
5. O feedback é aplicado a cada casa do tabuleiro.
6. O jogo avança até vitória ou fim de tentativas.
7. O ajuste final mostra a palavra e oferece compartilhamento.

## 6. Arquitetura técnica

### 6.1 Estilo arquitetural
A solução é implementada em front-end puro, com separação entre:
- estrutura HTML;
- estilos CSS;
- interações em JavaScript;
- armazenamento local no navegador.

Essa arquitetura é recomendada porque reduz a fricção do MVP, facilita o protótipo e mantém a solução acessível a qualquer ambiente web.

### 6.2 Camadas da aplicação

#### Camada de apresentação
Responsável por renderizar o tabuleiro, o teclado, as mensagens e os painéis de ação.

#### Camada de regra de negócio
Responsável por:
- verificar se a tentativa tem o tamanho correto;
- comparar letra por letra;
- decidir estados corretos/presentes/ausentes;
- controlar o flow de vitória/derrota;
- encerrar a rodada;
- salvar resultado localmente.

#### Camada de persistência
Usa localStorage para guardar:
- estatísticas do usuário;
- lista de desafios já jogados;
- histórico de sessões;
- último estado de jogo, se necessário.

#### Camada de acessibilidade
Garante que:
- o foco seja visível;
- o status do jogo seja anunciado por leitores de tela;
- a interface funcione por teclado;
- feedback textual esteja presente além de cor.

## 7. Stack recomendada

### 7.1 Front-end
- HTML5
- CSS3
- JavaScript ES2023
- localStorage

### 7.2 Não é necessário no MVP
- framework front-end
- backend
- banco de dados
- CMS
- autenticação
- Node.js como requisito principal

### 7.3 Quando evoluir o produto
- serviço de palavras e calendário editorial;
- backend para sincronização de estatísticas;
- API para compartilhar resultados;
- autenticação para ranking ou perfil;
- integração com PWA para instalar como app.

## 8. Estrutura de arquivos sugerida

- index.html
- styles.css
- app.js
- assets/
  - icons/
  - fonts/
- data/
  - words.json
  - puzzles.json
- docs/
  - PRD.md
  - TECHNICAL.md

### 8.1 Organização lógica
- HTML: estrutura e semântica da interface;
- CSS: tokens de design, tema Caderno, responsividade, estados visuais;
- JS: regras do jogo, renderização do tabuleiro, interação do teclado, persistência local.

## 9. Modelo de dados

### 9.1 Estrutura de palavra do desafio
- id
- date
- word
- length
- difficulty
- language
- status

### 9.2 Estrutura de sessão local
- activePuzzle
- currentGuess
- guesses
- isFinished
- hasWon
- stats

### 9.3 Estrutura de estatísticas
- played
- wins
- streak
- bestStreak
- completedPuzzles

### 9.4 Exemplo de representação
- palavra: JANELA
- tamanho: 6
- tentativas: 10
- estado do jogo: finalizado
- resultado: vitória

## 10. Componentes da interface

### 10.1 Cabeçalho
- marca visual do jogo;
- título do desafio;
- data do dia;
- contexto de sem conta.

### 10.2 Painel do jogo
- legenda com os estados das letras;
- tabuleiro de tentativas;
- status da rodada.

### 10.3 Teclado
- letras principais e ações auxiliares;
- botão de enviar;
- botão de apagar;
- comportamentos acessíveis por teclado.

### 10.4 Ações complementares
- Estatísticas
- Arquivo
- Compartilhar

### 10.5 Modal de diálogo
- usado para estatísticas, arquivo e compartilhamento;
- deve ser focável e fechável por teclado;
- deve manter um fechamento claro e previsível.

## 11. Estados da interface

### 11.1 Estado inicial
- tabuleiro vazio;
- mensagem de instrução;
- letras prontas para input.

### 11.2 Estado de digitação
- letras aparecem em sequência;
- progresso do tamanho da palavra atualizado;
- validação visual parcial em tempo real.

### 11.3 Estado de tentativa enviada
- tabuleiro recebe feedback por letra;
- teclado atualizado com estados;
- mensagem indica que a tentativa foi registrada.

### 11.4 Estado de vitória
- as letras corretas permanecem destacadas;
- botões de compartilhamento aparecem;
- mensagem confirma a vitória;
- resultado é salvo.

### 11.5 Estado de derrota
- a palavra revela a resposta;
- o botão de compartilhar continua disponível;
- o resultado é salvo e a rodada fecha.

### 11.6 Estado de sessão finalizada
- o input fica bloqueado;
- o jogo permanece em estado de leitura;
- os finais acontecem sem resets involuntários.

## 12. Lógica de comparação de letras

A lógica central deve seguir um algoritmo simples e transparente.

### 12.1 Alfabeto e normalização
- converter para maiúsculas;
- remover acentos para comparação interna;
- manter a grafia final a partir da solução original para exibição.

### 12.2 Verificação por posição
Para cada posição:
- se a letra da tentativa for igual à da solução, marca como correta;
- se não for igual, mas a letra aparecer na solução em qualquer posição, marca como presente;
- se não aparecer, marca como ausente.

### 12.3 Regras para letras repetidas
A regra recomendada para o MVP é a marcação conduzida pela contagem por posição. Isso mantém a lógica previsível e reduz confusão para o jogador. O algoritmo deve limitar a quantidade de letras marcadas ao número real de ocorrências na solução.

## 13. Acessibilidade e qualidade de uso

### 13.1 Critérios de acessibilidade
- suporte total ao teclado por teclado físico e virtual;
- foco visível em todos os elementos interativos;
- contraste mínimo demonstrado por paleta consistente;
- não depender só de cor para sinalizar estados;
- uso de texto e ícones explicativos;
- leitura por leitor de tela com mensagens de status;
- redução de movimento apoiada por media query.

### 13.2 Elementos essenciais
- status do jogo em live region;
- rótulos associados a botões;
- áreas clicáveis com tamanho mínimo adequado;
- ordem lógica de tabulação;
- modal com foco inicial e saída por Esc.

## 14. Persistência local

### 14.1 localStorage
Usar localStorage para guardar:
- histórico de partidas;
- estatísticas;
- arquivos de desafios concluídos;
- último desafio aguardando nova rodada.

### 14.2 Limites
- localStorage é local ao navegador, não sincroniza entre dispositivos;
- dados podem ser limpos ao limpar cookies ou histórico;
- não deve ser usado para dados pessoais sensíveis.

## 15. Compatibilidade e testes

### 15.1 Navegadores e plataformas
- Chrome e Edge modernos;
- Firefox;
- Safari em contexto web moderno;
- mobile em navegador responsivo.

### 15.2 Testes recomendados
- teste de layout em desktop e mobile;
- teste de teclado completo;
- teste de leitor de tela básico;
- teste de acentos e letras repetidas;
- teste de estado de vitória e derrota;
- teste de compartilhamento sem spoiler;
- teste de fechamento de modal e foco.

## 16. Riscos e mitigação

### 16.1 Risco: palavras muito difíceis
Mitigação: priorizar palavras comuns, familiares, com grau de dificuldade moderado.

### 16.2 Risco: confusão na regra de letras repetidas
Mitigação: manter feedback explícito e padronizar a lógica da comparação.

### 16.3 Risco: baixa retenção
Mitigação: manter o jogo diário, simples e compartilhável.

### 16.4 Risco: fricção na primeira jogada
Mitigação: colocar instruções curtas e fluxo sem conta ou cadastro.

### 16.5 Risco: acessibilidade insuficiente
Mitigação: testar navegação por teclado e feedback textual antes do launch.

## 17. Plano de implementação

### Fase 1 — estrutura do jogo
- montar layout base da página;
- criar tabuleiro de 10 linhas;
- implementar teclado virtual e físico;
- definir estados visuais para cada letra.

### Fase 2 — lógica principal
- definir linhas, colunas e tamanho de palavra;
- implementar entrada, validação e comparação;
- criar lógica de vitória/derrota;
- adicionar mensagens de status.

### Fase 3 — persistência e experiência diária
- salvar estatísticas no navegador;
- implementar arquivo de desafios antigos;
- carregar o jogo atual corretamente;
- verificar eventos de reinício e persistência.

### Fase 4 — refinamento
- ajustar espaçamento e responsividade;
- validar leitura em mobile;
- checar foco, teclado e leitores de tela;
- revisar microinterações e messaging.

### Fase 5 — release interno
- validar com usuários de teste;
- checar clareza da regra;
- coletar feedback de usabilidade;
- ajustar a lista editorial e a dificuldade.

## 18. Critério de entrega do MVP

A implementação deve estar pronta quando:
- uma pessoa consegue iniciar e completar uma rodada sem instruções externas;
- o jogo pode ser jogado em desktop e mobile;
- as palavras e regras ficam consistentes em PT-BR;
- o histórico e as estatísticas funcionam localmente;
- a interface atende às metas básicas de acessibilidade;
- o fluxo de compartilhamento não expõe a resposta;
- as ações do jogo são previsíveis e estáveis.

## 19. Conclusão

A solução técnica recomendada para este produto é uma web app leve, sem backend no MVP, com arquitetura simples e forte foco em usabilidade, acessibilidade e clareza. O uso do design Caderno reforça a legibilidade, a sensação de serenidade e o tom editorial que o jogo precisa para agradar ao público casual.

Essa abordagem reduz risco de implementação, acelera a validação de produto e abre caminho para evoluções futuras como backend, autenticação, ranking e conteúdo em escala.
