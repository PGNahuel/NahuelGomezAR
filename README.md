# Sitio de Nahuel Gómez

Los artículos se escriben en `public/articules/*.md`. Cada archivo debe tener una entrada única en `src/tablecontent.json` con ID, título, descripción y nombre de archivo. El build comprueba que ambos listados coincidan.

## Desarrollo

```sh
npm install
npm run dev
```

## Comprobar el fallback de iOS

En Safari para iPhone/iPad el sitio reemplaza sus capas `position: fixed` por
capas absolutas sincronizadas con `visualViewport`. Para probar exactamente esa
ruta sin tener un dispositivo Apple, abrir cualquier página local con
`?ios-fixed-fallback=1`, por ejemplo:

```text
http://localhost:5173/articulos/observability/?ios-fixed-fallback=1
```

Desplazar el artículo, abrir/cerrar ambos menús móviles, y comprobar el banner
destacado, el indicador de lectura y el botón «Volver». Probar además rotación y
el teclado en un iPhone/iPad real: todos deben permanecer anclados al viewport.

## Publicación

```sh
npm run build
```

El comando construye React y genera en `dist/` la portada, `/sobre-mi/` y una página HTML completa por artículo en `/articulos/<id>/`. También genera `sitemap.xml`, `schema.jsonld`, `llms.txt`, `.htaccess` para Hostinger/LiteSpeed, `404.html` y copia el CV. Se debe publicar **el contenido completo de `dist/`, incluidos los archivos ocultos**. No se deben publicar los archivos de la raíz del repositorio en lugar de `dist/`.

Las URL anteriores `/?id=<id>` se redirigen con HTTP 301 mediante `.htaccess`. Al agregar o quitar un artículo, se actualizan automáticamente las páginas, el sitemap, `llms.txt` y esas redirecciones.

Para comprobar el HTML sin ejecutar JavaScript:

```sh
curl -s https://nahuelgomez.ar/articulos/personal-experience/ | grep 'Mi pasado profesional'
```

Después de publicar, enviar `https://nahuelgomez.ar/sitemap.xml` a Google Search Console y revisar la inspección de URLs. `npm run lint` revisa el código propio; los archivos JavaScript de terceros en `public/` quedan excluidos.
