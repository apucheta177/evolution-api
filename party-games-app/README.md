# 🎉 Previa Épica

App web para jugar minijuegos de previa/juntada con amigos, pasando un solo celular de mano en mano. Mobile-first, colores de fiesta, botones grandes para usar de noche con poca luz.

## Cómo correrla

```bash
npm install
npm run dev
```

Abrí la URL que te muestra la terminal en el celular (o en el navegador de la compu) y jugá.

Para build de producción:

```bash
npm run build
npm run preview
```

## Los 12 juegos

1. El Impostor
2. La Frente
3. ¿Quién es más probable?
4. Verdad o Reto
5. Ronda de Tragos
6. Trivia Exprés
7. Dígalo con Mímica
8. Nunca Nunca
9. Encadenados
10. Encuesta Secreta
11. Dibujá y Adiviná
12. Ranking del Grupo

Cada uno tiene modo **Light** (para cualquier grupo) y **Picante** (sube el tono, para adultos), seleccionable desde el menú principal.

Los juegos con consecuencia por perder (Impostor, La Frente, Verdad o Reto, Trivia, Encadenados, Nunca Nunca) usan por defecto un reto gracioso sin alcohol, con la opción de cambiarlo por un trago si el grupo lo prefiere.

## Contenido

Todo el contenido de texto (categorías, preguntas, frases, cartas) vive en `src/data/*.ts`, separado de la lógica de los juegos en `src/games/*.tsx`, para poder editarlo fácil.

## Modo multi-dispositivo

Por ahora la app está pensada 100% para el modo "pasar el celular de mano en mano". El modo multi-dispositivo (cada jugador desde su propio celular) queda como mejora futura.
