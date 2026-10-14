# Invitación web · Almuerzo de grado

Invitación virtual al almuerzo de celebración del grado de David Caicedo Samboni,
Ingeniero Mecatrónico y Especialista en IA.

Sitio estático (HTML, CSS y JS sin dependencias), listo para GitHub Pages desde la rama `main` (carpeta raíz).

## Estructura

```
index.html
assets/
  css/styles.css     Estilos: papel animado, dorado y marcos
  js/main.js         Configuración (WhatsApp, lugar, fecha límite...) y cuenta regresiva
  img/               Ícono plateado, nombre dorado y papel azul (exportados del diseño impreso)
.nojekyll            Evita que GitHub Pages procese el sitio con Jekyll
```

## Editar datos

Todo lo editable está en el objeto `CONFIG` al inicio de `assets/js/main.js`.
Mientras falte un dato, la página lo marca con un recuadro punteado.

## Probar en local

```sh
python3 -m http.server 8080
# abrir http://localhost:8080
```
