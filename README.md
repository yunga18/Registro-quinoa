# Quinua Ruta

App instalable para registrar rutas de venta de pan de quinua, tiendas, fotos, inventario, cobros, gastos y reportes Excel.

Precio base inicial: $0,80 por funda. Puedes cambiarlo en Ajustes, guardar un precio habitual por tienda y usar varios precios en una visita.

## 1. Probarla en tu PC

1. Descomprime el ZIP.
2. Abre la carpeta `QuinuaRuta` en Visual Studio Code.
3. Instala Node.js desde https://nodejs.org/. Esta versión se probó con Node.js 24.
4. Abre una terminal dentro de esa carpeta y ejecuta:

```bash
npm start
```

5. Abre http://localhost:5173/ en tu navegador. Mantén abierta la terminal mientras la pruebas. Para detenerla usa Ctrl+C.

Los archivos necesarios para ejecutar la app ya están incluidos. `npm start` no necesita instalar dependencias. Usa un servidor local: abrir `index.html` con doble clic no prepara la instalación ni el modo sin conexión.

## 2. Qué archivo editar

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Título, descripción, iconos y estructura base de la página. |
| `style.css` | Colores, tamaños, espaciado y diseño para celular y PC. |
| `app.mjs` | Pantallas, formularios, botones, fotos y guardado de registros. La mayor parte del texto visible está aquí. |
| `domain.mjs` | Inventario, precios, cobros, saldos y validaciones. |
| `report.mjs` | Contenido, hojas, formato y fotografías del Excel. |
| `manifest.webmanifest` | Nombre, iconos y configuración de la app instalable. |
| `sw-template.js` | Plantilla del funcionamiento sin conexión. |
| `build.mjs` | Genera `app.js` y actualiza la versión del modo sin conexión. |
| `app.js` | Archivo generado que ejecuta el navegador. Edita las fuentes `.mjs` y vuelve a generarlo. |
| `sw.js` | Archivo generado para abrir la app sin conexión. |
| `favicon.svg`, `icon-192.png`, `icon-512.png` | Iconos de navegador e instalación. |
| `tests.mjs`, `ui-check.mjs`, `sw-check.mjs` | Pruebas de cálculos, formularios, Excel y rutas para GitHub. |

Antes de modificar código, instala las dependencias una vez:

```bash
npm ci
```

Después de editar cualquiera de los archivos de la app, ejecuta:

```bash
npm run build
```

Este comando genera el JavaScript y cambia la versión del caché para que la actualización también llegue a los celulares que ya instalaron la app. Hazlo aunque solo hayas cambiado el CSS, el HTML o los iconos.

Para comprobar los cálculos y el flujo de registro:

```bash
npm test
```

Para verlo en tu PC:

```bash
npm start
```

Si Windows indica que no puede ejecutar `npm.ps1`, usa la terminal **Símbolo del sistema / Command Prompt** de Visual Studio Code, o escribe `npm.cmd` en lugar de `npm`.

## 3. Publicarla en GitHub Pages

La copia incluida ya está compilada: puedes publicarla tal como está, sin ejecutar comandos.

1. Crea un repositorio en tu cuenta de GitHub; por ejemplo, `Registro-quinoa`.
2. Sube el **contenido de la carpeta `QuinuaRuta`**, para que `index.html` quede en la raíz del repositorio. No subas solo el ZIP ni una carpeta adicional por encima de los archivos.
3. Conserva el archivo vacío `.nojekyll`. No subas `node_modules`.
4. Entra a **Settings → Pages** del repositorio.
5. En **Source**, elige **Deploy from a branch**.
6. Selecciona la rama que contiene los archivos, normalmente **main**, y la carpeta **/(root)**.
7. Pulsa **Save** y espera a que GitHub muestre el enlace publicado.

Documentación oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Para este repositorio `yunga18/Registro-quinoa`, el enlace esperado de Pages es `https://yunga18.github.io/Registro-quinoa/`. El enlace definitivo lo muestra GitHub en Pages.

Al editar después, ejecuta `npm run build` y sube los archivos modificados junto con `app.js` y `sw.js`. Puedes subir todos los archivos del proyecto, excepto `node_modules`.

## 4. Instalarla en tu Android y compartirla

1. Abre el enlace de GitHub Pages en Chrome con conexión.
2. En el menú ⋮, elige **Instalar aplicación** o **Agregar a pantalla de inicio**.
3. Abre la app, agrega tus tiendas e inicia tu ruta.

Cada compañero puede usar el mismo enlace desde su propio celular. Los registros se guardan en el navegador de cada dispositivo; no hay cuentas de usuario ni sincronización entre celulares. Cada persona puede cambiar su nombre en Ajustes y descargar su propio Excel.

El archivo Excel incluye las fotografías dentro de la hoja Evidencias, además de resumen, visitas, precios, inventario, contabilidad y movimientos de dinero.

## 5. Llevar tus registros actuales al nuevo enlace

Los registros no se copian automáticamente al cambiar de dirección web.

1. En la app actual, entra a **Reportes → Descargar copia**.
2. Abre la nueva app de GitHub Pages en el mismo celular.
3. En **Reportes → Restaurar copia**, selecciona el archivo JSON descargado.
4. Revisa la cantidad de rutas, visitas y tiendas y confirma la restauración.

La restauración reemplaza los registros que haya en la nueva app. Usa una copia por persona; no compartas tu archivo de respaldo si quieres conservar separados los registros de tu compañero.

Descarga copias de seguridad periódicamente. Los datos permanecen en el almacenamiento del navegador y pueden perderse al borrarlo, cambiar de dispositivo o desinstalar la app con sus datos. La copia JSON conserva todas las fotografías y registros; el Excel es el reporte para tu jefe.

## 6. Cómo cuadran las cantidades y el dinero

- Fundas nuevas esperadas = salida + recargas − vendidas − cortesías − nuevas entregadas por cambio.
- Las caducadas retiradas y su conteo al regreso se llevan por separado.
- Venta = suma de cada cantidad multiplicada por su precio real.
- Un cobro de una deuda anterior aumenta el dinero recibido; no crea una nueva venta.
- Efectivo esperado = efectivo inicial + cobros en efectivo − gastos en efectivo.
- Las transferencias se muestran por separado.
- Los importes se calculan en centavos enteros para evitar errores de redondeo.
- Si conoces el costo por funda, configúralo antes de iniciar la ruta. El margen estimado descuenta el costo de vendidas, cortesías y reposiciones, más los gastos. Las caducadas retiradas no se descuentan otra vez porque el costo del cambio ya se registró.

Puedes corregir visitas y anular cobros o gastos mientras la ruta esté abierta. Revisa los registros antes de cerrarla.

## Dependencias

ExcelJS genera los archivos Excel con imágenes; Lucide aporta los iconos y esbuild prepara el JavaScript para el navegador. Se incluyen las versiones en `package-lock.json` y las licencias principales en `LICENSES.txt`.

## Productos y puntos de entrega

Al iniciar o recargar una ruta, cuenta las fundas de quinoa de sal, dulce, chocolate, leche y galletas por separado. Cada línea de venta tiene su tipo y precio. Cortesías, nuevas por cambio y caducadas retiradas se anotan por tipo, independientemente. El cierre pide un conteo físico por tipo y explica diferencias aunque el total general coincida. Los registros antiguos se conservan como «Sin clasificar».

«Registrar entrega aquí» solicita la ubicación del celular. Elige una tienda existente o guarda un nuevo punto, con nombre opcional. Revisa la precisión del GPS y ajusta el pin en el mapa antes de guardar. No se registra ubicación en segundo plano. La sección Mapa permite filtrar una fecha o ver todas las entregas; cada pin abre su detalle y un enlace a Google Maps.

El GPS requiere HTTPS (GitHub Pages) o localhost y permiso del navegador. Sin permiso puedes elegir una tienda. Los formularios, fotos, cantidades y coordenadas se guardan localmente y funcionan sin conexión después de preparar la app; el mapa de calles necesita internet. Leaflet 1.9.4 se carga desde unpkg con integridad SRI únicamente al abrir un mapa. Los mapas usan OpenStreetMap con atribución visible y sin descarga masiva ni caché de mapas en el service worker.

El Excel añade Entregas por tipo, Inventario por tipo y coordenadas/enlaces de ubicación en Visitas. Las copias JSON incluyen también productos y ubicaciones y aceptan copias de la versión anterior.
