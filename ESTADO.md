# Estado del proyecto — OffLeash (Mi tienda)

- Tienda: a8d44c-zc.myshopify.com
- Carpeta del proyecto: raíz de este repositorio
- Entorno: Node v22.22.2, npm 10.9.7 — OK. Shopify CLI 4.5.2 instalado.
- **Nota técnica importante**: este proyecto corre en un entorno remoto en la
  nube (no en el ordenador del usuario). El login OAuth del Shopify CLI
  (`shopify theme list` / `shopify store auth`, que necesitan
  `accounts.shopify.com`) está bloqueado por la política de red del entorno.
  En su lugar, TODA la conexión con la tienda (leer/escribir producto, crear
  y editar el tema) se hace a través del conector Shopify (MCP) ya
  autenticado con esta tienda — herramientas `mcp__Shopify__*`
  (`graphql_query`, `graphql_mutation`, `search_products`, `get-product`,
  etc.). No se necesita ningún login adicional del usuario para esto.
- Tema de trabajo creado en Shopify: **"OffLeash (Claude)"**,
  id `gid://shopify/OnlineStoreTheme/188048408956`, rol UNPUBLISHED,
  creado desde el ZIP oficial de Dawn
  (`https://github.com/Shopify/dawn/archive/refs/heads/main.zip`, descargado
  directamente por los servidores de Shopify vía `themeCreate`).
- Publicación: la mutación `themePublish` está bloqueada por seguridad en
  este conector — la publicación final la hará el usuario con 2 clics en su
  panel (Tienda online → Temas → Publicar), tras dar el visto bueno a la
  vista previa. Encaja con la regla de la skill de pedir confirmación antes
  de publicar.
- Última publicación: (pendiente — tema completo listo en UNPUBLISHED, en
  espera del visto bueno del usuario. Publicar requiere 2 clics del usuario
  en su panel porque `themePublish` está bloqueado por seguridad en el
  conector Admin API usado en este entorno; ver nota de fase 6 más abajo)

## Producto encontrado en la sonda inicial (fase 1)

- id: `gid://shopify/Product/16054984245628`
- handle: `offleash™-automatic-ball-launcher`
- título: "OffLeash™ Automatic Ball Launcher"
- descripción: (vacía)
- imágenes: (ninguna subida)
- precio: 0.00 EUR (variante única "Default Title", sin definir)
- Interpretación: es un producto "cáscara" — solo tiene el nombre. Es un
  lanzador automático de pelotas para perros (categoría pet-tech /
  accesorios para mascotas). No hay fotos que descargar ni descripción que
  leer, así que el estilo de la fase 3 se propone a partir del nombre y la
  categoría, y probablemente haga falta generar fotos con IA (fase 3b).

## Fases completadas
- [x] 0 Entorno
- [x] 1 Conexión + sondeo
- [x] 2 Proyecto (tema base Dawn creado en Shopify)
- [x] 3 Brief en un mensaje (mensaje 2 enviado y respondido con material real)
- [ ] 3b Fotos IA (pendiente: falta clave OpenAI y/o el archivo de la foto real)
- [x] 4 Construcción (portada completa subida al tema)
- [x] 5 Producto y páginas
- [ ] 6 Publicación

## Fase 5 — producto, header/footer, legales

### Producto (vía Admin API, sin pedir nada al usuario)
- Título reescrito: "OffLeash™ — Lanzador Automático de Pelotas a Prueba de Babas".
- Descripción del catálogo reescrita en HTML con el mensaje de posicionamiento.
- SEO title/description propios.
- Handle limpiado: `offleash-automatic-ball-launcher` (antes tenía el símbolo
  ™, con redirección automática desde el handle viejo).
- Categoría (`productType`): "Herramienta de sustitución atlética" (nunca
  "juguete", tal y como pide el brief).
- Precio de la variante puesto a 99,00 € (coincide con la oferta de la
  portada).
- `templateSuffix` asignado a `"ol"` → la página de producto ya usa
  `templates/product.ol.json` en cuanto el tema se publique; con
  `?preview_theme_id=` ya se ve ahora.
- **Pendiente de decisión del usuario, NO la tomé yo**: el inventario está a
  0 unidades (heredado del producto vacío), así que el botón de compra
  saldrá como "Agotado por ahora" hasta que el usuario indique cuántas
  unidades tiene — es una decisión de negocio real, no algo que deba
  inventar.

### Página de producto (`sections/ol-producto.liquid` + `templates/product.ol.json`)
Galería con miniaturas clicables, precio dinámico, formulario de compra real
(`{% form 'product' %}`), selector de variantes con JS (actualiza id, precio
y estado agotado — funciona con 1 variante o varias), fila de confianza
editable, insignia de garantía, intro + características + "qué incluye" +
descripción del catálogo. Debajo se reutilizan secciones de la portada:
mecanismo (anti-babas), comparativa honesta, oferta con stack, testimonios y
FAQ — cumple el checklist completo de la fase 5.

### Header y footer (edité los JSON de configuración, no toqué el Liquid de Dawn)
- `sections/header-group.json`: barra de anuncio con "🛡 El Reto de la Baba:
  90 días o te devolvemos todo" sobre fondo verde oscuro (scheme-3).
- `sections/footer-group.json`: footer en verde oscuro (scheme-3) con bloque
  de marca (tagline + descripción + redes) y menú "Legal".
- `config/settings_data.json`: `brand_headline`/`brand_description` globales
  rellenados con el tagline y posicionamiento — así el bloque de marca del
  footer de Dawn ya sale con contenido real.
- No toqué `sections/header.liquid` ni `sections/footer.liquid` (el Liquid
  de Dawn): no hizo falta, todo se resolvió con configuración + esquemas de
  color ya alineados a la marca en la fase 4. El logo sigue siendo el nombre
  de la tienda en texto porque no hay archivo de logo — pendiente si el
  usuario quiere subir uno.

### Favicon
`assets/ol-favicon.svg` (aro dorado + punto crema sobre verde bosque,
monograma simple) enlazado en `layout/theme.liquid` como respaldo cuando
`settings.favicon` está vacío (que es el caso ahora). Si el usuario sube un
favicon PNG propio desde el editor, ese tiene prioridad automáticamente.

### Páginas legales
- Creadas por Admin API (`pageCreate`), publicadas y enlazadas ya en el menú
  "footer": **Aviso Legal** (`/pages/aviso-legal`) y **Política de Cookies**
  (`/pages/politica-de-cookies`). Contenido base con placeholders `[...]`
  para NIF/nombre legal/email — avisar al usuario de que lo revise o lo pase
  a su gestoría antes de operar en serio (regla de la skill).
- **Pendiente, es la única tarea que de verdad requiere el panel del
  usuario** (Shopify no deja crear las 4 políticas nativas por la Admin API
  pública): Configuración → Políticas → "Crear a partir de plantilla" en
  Privacidad, Términos, Devoluciones y Envíos. El footer de Dawn ya las
  enlaza automáticamente en cuanto existan (`show_policy` ya está activado).

## Fase 6 — publicación

- Tema de trabajo (UNPUBLISHED): `gid://shopify/OnlineStoreTheme/188048408956`.
  Enlace de previsualización de la portada:
  `https://a8d44c-zc.myshopify.com/?preview_theme_id=188048408956`.
  Página de producto: `https://a8d44c-zc.myshopify.com/products/offleash-automatic-ball-launcher?preview_theme_id=188048408956`.
- **Auto-revisión (regla de oro nº 7): NO ha sido posible desde este
  entorno.** Los tres niveles de la escalera de la fase 6 fallan aquí:
  1) sin navegador para capturar; 2) `shopify theme dev` no funciona porque
  el login de CLI está bloqueado por la política de red (ver nota técnica al
  principio de este archivo); 3) toca pedir al usuario una captura — ya se
  le ha pedido en el chat. Toda la validación real hecha ha sido del lado de
  Shopify: cada `themeFilesUpsert` y cada mutación de producto se comprobó
  sin `userErrors`.
- **Publicar en vivo**: la mutación `themePublish` está bloqueada por
  seguridad en el conector Admin API de este entorno (mensaje del propio
  conector: "Theme file writes ... writes that target the live/MAIN theme
  are blocked" y publicación explícitamente en la lista de mutaciones
  peligrosas bloqueadas). Cuando el usuario dé el visto bueno a la vista
  previa, la publicación la hace él mismo en 2 clics: **Tienda online →
  Temas → en el tema "OffLeash (Claude)" → ⋯ → Publicar.**

### Lista de pendientes para el usuario (checklist)
- ⬜ Ver la vista previa y confirmar que el diseño encaja (o pedir cambios).
- ⬜ Rellenar las 4 políticas nativas (Configuración → Políticas → plantilla).
- ⬜ Revisar/completar los datos de Aviso Legal y Política de Cookies
  (NIF, nombre legal, email de contacto).
- ⬜ Decidir cuántas unidades hay en stock (ahora mismo el botón de compra
  sale como "Agotado" porque el inventario está a 0).
- ⬜ Si quiere fotos generadas con IA: mandar la foto real del producto como
  archivo adjunto + la clave de OpenAI.
- ⬜ Cuando esté conforme: publicar el tema (2 clics, arriba).

## Vista previa (fase 4 completada)

- URL: `https://a8d44c-zc.myshopify.com/?preview_theme_id=188048408956`
- **No he podido verla yo mismo**: este entorno en la nube no tiene acceso de
  red al dominio de la tienda (ni por curl ni por WebFetch — bloqueado por la
  política de red / protección de la tienda nueva). Toda la validación que he
  podido hacer es en el servidor de Shopify: la subida de cada archivo se
  validó sin `userErrors` (JSON de schema válido, nombres de sección ≤25
  caracteres, valores de `range` alineados al paso, sin `default` en
  ajustes `url`, contrato ROOT PADDING FIX respetado). Cuando lleguemos a la
  fase 6 le pediré al usuario una captura o confirmación visual, ya que no
  puedo auto-revisar como manda la regla de oro nº 7.
- La tienda es nueva y probablemente tiene la contraseña de "tienda en
  construcción" activada (Tienda online → Preferencias, para quitarla o ver
  la contraseña).

## Secciones creadas (fase 4)

Prefijo `ol-` (OffLeash). Todas con textos, imágenes, tamaños de letra,
alineación y espaciado editables desde el editor de Shopify (contrato de la
fase 4 cumplido: ROOT PADDING FIX aplicado, sin defaults en settings `url`,
`newline_to_br` en textareas, `image_picker` con respaldo en placeholder CSS
ya que no hay fotos propias todavía).

1. `sections/ol-hero.liquid` — Hero de reconocimiento/disonancia: hook
   "Si corres con tu perro para cansarlo, estás empeorándolo."
2. `sections/ol-revelacion.liquid` — Revelación/absolución biológica +
   cita destacada con el tagline.
3. `sections/ol-mecanismo.liquid` — "A prueba de babas": comparador
   antes/después (slider arrastrable) + 3 tarjetas de prueba (ruedas
   anti-babas, resistencia industrial, no castra el juego).
4. `sections/ol-antivillano.liquid` — Tabla comparativa honesta vs PetSafe,
   iFetch y clones genéricos.
5. `sections/ol-permiso.liquid` — Transformación antes→después (culpa→
   permiso) + 3 testimonios.
6. `sections/ol-oferta.liquid` — Stack de valor (6 elementos, ~300€ →
   99€) + tarjeta de garantía "El Reto de la Baba".
7. `sections/ol-honestidad.liquid` — FAQ acordeón con las 7 objeciones
   principales del Messaging Framework.
8. `sections/ol-cta-final.liquid` — Cierre con tagline y CTA dorado.

Archivos de soporte: `assets/ol-styles.css` (tokens de marca: verde bosque
`#1B4332`, crema `#FAF7F0`, dorado `#C6A15B`; reveals on scroll, comparador
deslizante, acordeón FAQ, marquesina), `assets/ol-scripts.js` (mismo
comportamiento), `templates/index.json` (monta la portada con las 8
secciones y contenido real ya redactado, no genérico).

`config/settings_data.json`: esquemas de color de Dawn realineados a la
marca (scheme-1/2 claros crema+verde, scheme-3 verde oscuro, scheme-4
dorado) y `type_header_font` a `assistant_n7` (negrita) — así el carrito,
buscador y demás partes nativas de Dawn visten los colores de la marca.

## Enlaces de la portada (pendiente de handle limpio)

Los botones de la portada apuntan a `/products/offleash-automatic-ball-launcher`.
El producto real tiene ahora el handle `offleash™-automatic-ball-launcher`
(con el símbolo ™, heredado del título). **Pendiente en fase 5**: renombrar
el handle del producto a la versión limpia para que estos enlaces funcionen,
o actualizarlos si se decide mantener el handle actual.

## Brief de marca (recibido del usuario tras el mensaje 2)

El usuario mandó una foto real del producto (pegada en el chat, sin ruta de
archivo accesible — pendiente de que la reenvíe como adjunto si se quiere usar
como referencia para generar fotos con IA) y 5 documentos PDF de estrategia de
marketing ya cerrada (Positioning, Big Idea, Offer Strategy, Messaging
Framework, Competitor Analysis) para un lanzador automático de pelotas de
gama alta. Es un caso EXCEPCIONALMENTE completo: la estrategia de marca ya
está hecha por profesionales. La tienda debe ejecutar fielmente este brief,
no inventar uno propio.

### Producto real (visto en foto)
Carcasa trapezoidal, verde bosque oscuro mate en la mitad superior, panel
frontal blanco/crudo en la mitad inferior, separados por una fina línea
dorada/latón. Puerto circular de lanzamiento con aro de luz blanca. Wordmark
"OffLeash" en blanco sobre el verde. Pelotas de tenis amarillo-verdosas de
serie. Estética premium-industrial, nada de plástico barato de juguete.

### Posicionamiento (no negociable — usar literal en el copy)
- Categoría: **"herramienta de sustitución atlética"** — **NUNCA "juguete"**.
- Beneficiario del mensaje: **el dueño** (alivio/permiso), no el perro
  (diversión). Se vende "un dueño absuelto", no "un perro cansado".
- Frase de posicionamiento: "No es un juguete que lanza la pelota por ti. Es
  la herramienta que por fin cansa a tu perro de verdad —a prueba de babas,
  sin castrar su juego— para que tú puedas sentarte, sin culpa, en tu propia
  casa."
- Arquetipo de marca: el Sabio Aliado (mitad autoridad biológica, mitad
  amigo cómplice que pasó por lo mismo).

### Big Idea / narrativa
- Idea rectora: **"La Trampa del Agotamiento"** — cansas a tu perro con lo
  único que lo hace más incansable (correr con él activa su instinto de caza
  y lo satura de cortisol; lo convierte en un súper-atleta imparable).
- Tagline: **"El botón de apagado, sin culpa."**
- Gran promesa: "Cánsalo de verdad en 20 minutos al día — sin mover un
  brazo, sin culpa, sin crear un monstruo."
- Arco narrativo maestro (usar en el orden de la portada):
  1. Reconocimiento (escena del sofá/súper-atleta)
  2. Revelación / absolución (no es culpa tuya, es biología — cortisol/prey
     drive)
  3. Mecanismo (el antídoto: bucle de persecución asíncrono, a prueba de
     babas, silencioso, sin límite)
  4. Estado después / permiso (te sientas en tu sofá, lo ves saciado de
     verdad, sin culpa)
  5. Oferta (stack + garantía)

### Los 4 pilares de mensaje (rotar, cada sección apoya en ≥1)
1. **Absolución** (emocional dominante): "No es tu culpa; nadie te dijo que
   correr más lo empeora."
2. **Permiso** (deseo): "Por fin puedes sentarte en tu propio sofá."
3. **Mecanismo/Prueba** (racional): ruedas de inercia texturizadas que
   tragan la baba, motor de grado industrial.
4. **Anti-villano** (diferenciación): "No es otro lanzador que se atasca,
   asusta o se apaga a los 15 min."
Secuencia canónica: Absolución → Permiso → Mecanismo/Prueba → Anti-villano
→ Oferta.

### Prueba ancla (héroe visual)
"A prueba de babas": demo visual de una pelota empapada de lodo/saliva
procesada sin fallo. Debe ser LA imagen/sección más memorable de la tienda.
Garantía asociada: **"El Reto de la Baba"** (90 días) — si el motor se
atasca una vez, devolución íntegra y se queda con las pelotas.

### Oferta / precio
- Producto core ~$99. Stack de valor con pack de pelotas anti-babas ($29),
  protocolo "Auto-Recarga en 7 Días" ($49), guía "La Trampa del Agotamiento"
  ($39), adaptador CA + batería ($25), garantía extendida "A Prueba de Vida
  Canina" ($59). Valor total del stack ~$300 → precio hoy ~$89–99 (ancla
  ≥3:1).
- Ancla de precio: comparar contra guardería canina (~$700/mes), no contra
  otros lanzadores.
- Garantías de refuerzo: tranquilidad canina (ruido), agotamiento a 30 días
  (resultado), durabilidad 12–24 meses.
- Honestidad radical (diferencial de confianza, usar tal cual): las razas de
  pastoreo pueden plantarse frente al cañón; auto-recargar requiere un breve
  entrenamiento (protocolo de 7 días).

### Léxico
- ✅ Usar: descanso, culpa, por fin, permiso, sin destrozarte, botón de
  apagado, de verdad cansado, recuperar (tu sofá/noches/casa), a prueba de
  babas, súper-atleta imparable, para ti, herramienta.
- ⛔ Prohibido: "haz más con tu perro", "aventura", "juguete", montañas o
  frisbees al atardecer, "tu perro se lo merece", listas de features como
  gancho principal, "diversión sin fin".
- Tono: cómplice, absolutorio, honesto sobre límites, con autoridad
  biológica al desmontar la culpa. Escenas domésticas reales (sofá, Zoom,
  alfombra) — NUNCA imaginería aspiracional-atlética.

### Competencia (para la sección anti-villano / comparativa, sin nombrarlos
de forma agresiva salvo comparativa explícita si se pide)
- PetSafe (~$150-170): modo-reposo forzado a 30 min que "castra" el juego,
  sensor que asusta. Grieta a explotar: "sin modo-reposo que apaga la
  diversión".
- iFetch (~$115-140): pelotas mini, vende bola anti-babas aparte (admite que
  no traga baba). Grieta: "sin comprar una bola aparte".
- Clones $40-90 (AFP, Franklin, genéricos): "basura de plástico", se atascan
  en minutos. Usarlos como villano de contraste, no competir en precio.

### Estilo visual derivado (decisión de diseño ya tomada — no volver a
preguntar)
- Paleta: verde bosque oscuro mate (dominante, ~#1B4332), blanco roto/crudo
  cálido (paneles y fondo, NO blanco clínico), dorado/latón apagado como
  acento de línea (~#C6A15B). Sin verde lima ni colores infantiles.
- Tipografía: sans-serif de titulares gruesa y **seria/confiada** (no
  redondeada ni juguetona) — refleja "herramienta industrial", no "juguete".
  Cuerpo de texto sans limpio.
- Fotografía: escenas domésticas reales (sofá, salón, alfombra, Zoom de
  fondo) — nunca postales de aventura al atardecer. El producto siempre
  fotografiado con seriedad de electrodoméstico premium, no de juguete.
- Estructura de portada (arco de la Big Idea, ver arriba): 1) hero de
  reconocimiento/disonancia ("Si corres con tu perro para cansarlo, estás
  empeorándolo") 2) revelación/absolución con autoridad biológica 3)
  mecanismo + demo anti-babas (sección héroe) 4) anti-villano/comparativa
  honesta 5) permiso/testimonios (estado después) 6) oferta con stack de
  valor + Reto de la Baba 7) honestidad radical / FAQ 8) CTA final.

### Pendiente del usuario (una sola cosa, no bloqueante)
- La foto que pegó en el chat no tiene archivo accesible para mí — si quiere
  que genere más fotos (ambiente, detalle, macro anti-babas) fieles a la
  suya, que la reenvíe como archivo adjunto. Mientras tanto, construyo la
  estructura y el copy completos; los huecos de imagen quedan como
  `image_picker` editables.
- Clave de OpenAI: aún no la dio. Sigue en pie la oferta de generarlas si la
  manda; si no, construyo con huecos editables.

## Secciones creadas
(se rellena en la fase 4)
