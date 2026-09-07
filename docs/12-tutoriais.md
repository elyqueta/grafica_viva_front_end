# 12 — Tutoriais (`/tutoriais`)

# Estado

Status: PENDING — A CONFIRMAR ANTES DE EXECUTAR

---

## Nota importante

Esta secção **não fazia parte de nenhuma instrução anterior** sobre o
âmbito do site da Gráfica Viva (ver `docs/01`, ponto 7). Foi pedida no
briefing mestre mais recente, mas não há confirmação de que a Gráfica
Viva pretende mesmo uma área de tutoriais públicos.

**Não executar este bloco sem confirmação explícita do utilizador.** Se
confirmado, prosseguir com o âmbito abaixo. Se não fizer sentido para o
negócio, marcar este documento como `DESCARTADO` e não criar as rotas.

## Objectivo (se confirmado)

Criar uma área de conteúdo educativo simples, coerente com o tom da
marca, por exemplo "como preparar um ficheiro para impressão" ou "como
escolher o papel certo" (tema que já existe como post de blog, cuidado
para não duplicar conteúdo entre blog e tutoriais).

## Âmbito (se confirmado)

1. Criar `app/data/tutorials.ts`.
2. Criar `app/tutoriais/page.tsx`, com o mesmo cuidado de composição
   editorial pedido para o blog.
3. Cada tutorial com: título, imagem, descrição, categoria, duração
   estimada, passos numerados (reaproveitar padrão visual de
   `ServicosProcesso.tsx` para listas de passos numerados).

## Critérios de aceitação

- Confirmação do utilizador registada neste documento antes de qualquer
  código.
- Se implementado, sem sobreposição de conteúdo com `/blog`.

## Resultado da implementação

_(preencher apenas se este bloco for confirmado e executado)_

- Confirmação do utilizador:
- O que foi alterado:
- Ficheiros alterados:
