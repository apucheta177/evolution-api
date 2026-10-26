# 🐾 Puzzles

App web de acertijos para jugar solo/a en el celular. Sin anuncios, sin cuentas, sin vueltas. Pensada para instalarse como "app" desde el navegador (Agregar a pantalla de inicio).

## Juegos

1. **Meowdoku** — un gatito 🐾 por fila, por columna y por región de color; dos gatitos no pueden tocarse (ni en diagonal). Generador propio con solución única garantizada (partición de regiones + reparación automática hasta converger), 3 tamaños (6×6, 7×7, 8×8).
2. **Criptograma** — cada letra del abecedario representa siempre otra letra; hay que descifrar la frase con el teclado en pantalla. Banco de frases originales.
3. **Sopa de Letras** — generador de grillas por tema (gatos, comida, animales, naturaleza, ciudad), con selección de palabras tocando la primera y la última letra.
4. **Crucigrama** — un puñado de mini-crucigramas armados a mano, con pistas horizontales y verticales.
5. **Frase Oculta** — una frase cifrada arriba, y abajo varias pistas (definiciones cortas); al acertar cada palabra se revelan sus letras en la frase de arriba, hasta completarla entera.

## Cómo correrla

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Build como página única (para compartir un link jugable)

```bash
npm run build:artifact
```

Genera `dist-artifact/index.html`, un único archivo autocontenido que se puede subir a cualquier hosting estático.

## Instalarla como app en el celular

Si la servís desde algún hosting (no desde el build de artifact, que no incluye los íconos), el navegador va a ofrecer "Agregar a pantalla de inicio" gracias al `manifest.json` — queda con ícono propio y abre sin la barra del navegador, como una app nativa.
