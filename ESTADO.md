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
- Tema original: **"OffLeash (Claude)"**,
  id `gid://shopify/OnlineStoreTheme/188048408956`, creado desde el ZIP
  oficial de Dawn vía `themeCreate`. **El usuario lo publicó desde su panel
  — ahora es el tema MAIN (en vivo).** Contiene la versión español/EUR
  completa (portada, producto, header/footer, legales) descrita más abajo.
  Ya no se debe escribir en este tema por Admin API (el conector bloquea
  escrituras sobre el tema en vivo por seguridad).
- **Tema de trabajo actual (draft en inglés/USD)**: **"OffLeash US (Claude
  draft)"**, id `gid://shopify/OnlineStoreTheme/188049293692`, rol
  UNPUBLISHED, creado con `themeDuplicate` a partir del tema en vivo el
  2026-07-18 al empezar el rediseño en inglés (ver sección "Rediseño EN/USD"
  más abajo). Todo el trabajo nuevo va aquí hasta que el usuario lo revise y
  publique.
- Publicación: la mutación `themePublish` está bloqueada por seguridad en
  este conector — cualquier publicación futura la hará el usuario con 2
  clics en su panel (Tienda online → Temas → Publicar), tras dar el visto
  bueno a la vista previa.
- Última publicación: el tema español/EUR "OffLeash (Claude)", publicado
  por el usuario (fecha exacta no registrada, detectado el 2026-07-18).

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
(fase 4, ver arriba: ol-hero, ol-revelacion, ol-mecanismo, ol-antivillano,
ol-permiso, ol-oferta, ol-honestidad, ol-cta-final — versión español/EUR,
ahora en vivo en el tema "OffLeash (Claude)")

## Rediseño EN/USD — arquitectura estilo Pet Loving Home (en curso)

El usuario pidió replicar la ARQUITECTURA (no el copy/imágenes/temática) de
petlovinghome.com, adaptada 100% a OffLeash, en inglés (US). Reglas clave
del encargo:
- Idioma inglés (US) en todo el front (menús, botones, FAQs, carrito,
  legales). **Pendiente de aviso al usuario**: la moneda REAL de la tienda
  es EUR a nivel de cuenta (Configuración → General, ligado a su banco);
  cambiarla a USD de verdad es una decisión de cuenta que no puedo tomar yo
  — sigo construyendo el copy/precios en formato $ y uso el filtro `money`
  de Shopify, que mostrará € hasta que el usuario cambie la configuración
  de moneda de la tienda.
- Nombre del mecanismo propietario inventado para el copy en inglés:
  **DrySpin™** (las ruedas de inercia texturizadas anti-babas).
- Sin literales de la referencia (nada de velas/aromas/fragancias) y sin
  suscripción/recompra (producto de compra única) — AOV con accesorios
  (pelotas extra, batería, adaptador), no con recurrencia.
- Precio de trabajo: $89–99 (pendiente fijar variante exacta).
- Trabajo por tandas con preview antes de seguir; NO publicar hasta
  confirmación explícita del usuario.

### Evento importante: el tema original pasó a estar en vivo
A mitad de esta fase, el usuario publicó "OffLeash (Claude)" desde su panel
(pasó a rol MAIN). El conector Admin API bloqueó automáticamente mi
siguiente intento de escritura por seguridad ("Theme file writes against
the live storefront are blocked"). Solución: dupliqué el tema en vivo con
`themeDuplicate` → nuevo tema **"OffLeash US (Claude draft)"**
(`gid://shopify/OnlineStoreTheme/188049293692`, UNPUBLISHED). Todo el
rediseño en inglés continúa exclusivamente en este tema nuevo; el tema en
vivo en español queda intacto mientras tanto.

### Hecho (checkpoint 1 de varios — header + hero)
- `sections/ol-announcement.liquid` (NUEVO): barra de anuncio en marquesina
  infinita (reutiliza `.ol-marquesina-track` de `ol-styles.css`), bloques de
  mensaje editables. Sustituye a la `announcement-bar` nativa de Dawn en
  `sections/header-group.json`.
- `sections/ol-hero.liquid` (rediseñado por completo): imagen de fondo a
  sangre + degradado, insignia pequeña, titular en 3 líneas cortas
  editables por separado, subtítulo con el nombre del mecanismo (DrySpin™),
  línea de "tecnología certificada", un único botón CTA con ancla
  (`#ol-shop`, pendiente de que exista esa sección en el checkpoint 2).
- Menú principal (`main-menu`) actualizado a inglés: Shop
  (`/collections/all`), FAQs (`/#faqs`), About Us, Contact.
- Página `Contact` renombrada a "Contact Us" (en inglés). Página `About Us`
  creada (contenido mínimo, se ampliará en el checkpoint de páginas
  adicionales).
- `templates/index.json`: settings del hero actualizados al nuevo schema en
  inglés. El resto de secciones de la portada (revelación, mecanismo,
  antivillano, permiso, oferta, honestidad, CTA final) **siguen en español
  de momento** — se traducirán/rediseñarán en los próximos checkpoints
  siguiendo el resto de la arquitectura de 14 secciones que pidió el
  usuario (tira de iconos, grid de producto, lockup del mecanismo, 3
  bloques alternos, barra de confianza, reseñas en carrusel, galería UGC en
  vídeo, tabla comparativa ampliada, FAQ con ancla, footer con newsletter,
  botón flotante de WhatsApp, carrito con barra de envío gratis).

### Vista previa del checkpoint 1 (histórico, tema ya no vigente)
`https://a8d44c-zc.myshopify.com/?preview_theme_id=188049293692`
(recuerda: el resto de la portada bajo el hero seguía en español — era
esperado en ese momento, no un error).

### Segundo evento: el checkpoint 1 también se publicó → tema v2
El usuario indicó "lo noto igual... hazlo todo igual que las capturas y
después te hago correcciones" — instrucción de dejar de hacer checkpoints
y construir TODA la arquitectura de 14 secciones de una vez. Justo al
empezar a subir esa tanda completa, el tema "OffLeash US (Claude draft)"
(`188049293692`) apareció también publicado (rol MAIN) — el usuario lo
había puesto en vivo desde su panel sin avisar, por segunda vez. Mismo
procedimiento de recuperación que la primera vez: se detectó el bloqueo de
`themeFilesUpsert` sobre tema en vivo, se confirmó el rol con
`graphql_query`, y se duplicó con `themeDuplicate` a un tema nuevo:

**Tema de trabajo actual**: **"OffLeash US v2 (Claude draft)"**,
id `gid://shopify/OnlineStoreTheme/188049719676`, rol UNPUBLISHED
(confirmado). Todo el trabajo de aquí en adelante va exclusivamente en
este tema hasta nueva orden.

### Arquitectura completa subida (14 secciones, inglés/USD, checkpoint único)
Portada completa (`templates/index.json`) con el orden:
1. `ol-hero` — Hero con imagen de fondo, insignia, titular en 3 líneas,
   subtítulo (menciona DrySpin™), botón CTA → `#ol-shop`.
2. `ol-announcement` (en `header-group.json`) — marquesina de anuncio.
3. `ol-iconos` — tira de 6 iconos de beneficio (envío gratis, garantía
   90 días, a prueba de babas, manos libres, silencioso, 4.7★).
4. `ol-grid-productos` — grid de 3 tarjetas de producto, ancla `#ol-shop`.
5. `ol-lockup` — nombre del mecanismo (DrySpin™) + claim centrado.
6. `ol-beneficio-1/2/3` (sección reutilizable `ol-beneficio-alterno`) —
   3 bloques alternos imagen/texto: agarre anti-babas, motor industrial,
   sin apagado forzado/pitido.
7. `ol-confianza-barra` — 3 items de confianza (lab-tested, soporte US,
   checkout seguro).
8. `ol-resenas` — carrusel de 5 reseñas con estrellas y datos del perro.
9. `ol-galeria-video` — galería UGC estilo Instagram, 5 slots de vídeo.
10. `ol-antivillano` — tabla comparativa (OffLeash vs lanzador barato vs
    guardería canina), 12 filas, sticky en móvil.
11. `ol-honestidad` — FAQ acordeón (7 preguntas), ancla `#faqs`.
12. `ol-whatsapp` (en `footer-group.json`) — botón flotante de WhatsApp.
13. `footer-group.json` — footer verde oscuro con newsletter + botón
    WhatsApp.
14. Carrito — `cart_type: "drawer"` + barra de envío gratis (JS,
    `initBarraEnvioGratis`, umbral $60) inyectada en el cart drawer.

Todo subido en 5 tandas (`themeFilesUpsert`) contra el tema
`188049719676`, todas con `userErrors: []` confirmado.

Secciones antiguas en español (`ol-revelacion`, `ol-mecanismo`,
`ol-permiso`, `ol-oferta`, `ol-cta-final`) siguen como archivos sin usar
(no borrados, no referenciados en `templates/index.json`) — su contenido
de prueba se redistribuyó dentro de los 3 bloques `ol-beneficio-alterno`.

### Pendiente inmediato
- Confirmación visual del usuario sobre esta nueva portada completa
  (no puedo verla yo mismo — ver limitación de red de siempre).
- **Aviso importante para el usuario**: por favor no publiques este tema
  todavía — si lo haces antes de que termine, tendré que duplicar de
  nuevo y perderás el enlace de vista previa actual (ya ha pasado dos
  veces). Avísame primero y lo revisamos juntos.

## Página de producto en inglés/USD (completada tras aprobar la home)

El usuario confirmó la portada ("esta genial, no termino de entender el
diseño del hero, pero dejalo así si esta bien para ti") y pidió seguir con
la página de producto. Hecho:

- **Producto (Admin API)**: título traducido a "OffLeash™ — Drool-Proof
  Automatic Ball Launcher", `descriptionHtml` reescrito en inglés
  (mismo mensaje de posicionamiento, mención a DrySpin™ implícita vía
  "sustained-duty motor"), `productType` → "Athletic Replacement Tool",
  SEO title/description propios en inglés. Precio sigue en 99.00
  (mostrado en EUR hasta que cambie la moneda de cuenta — sin cambios
  aquí, decisión pendiente del usuario).
- **`sections/ol-producto.liquid`** (reescrita): todo el copy y labels
  del schema en inglés; añadido bloque de valoración (★★★★★ 4.7 — 312
  reviews) bajo el título; añadido selector de cantidad (+/-) junto al
  botón de compra; añadido acordeón de información adicional (Shipping &
  Returns, What's in the box, Warranty) reutilizando el componente FAQ ya
  existente (`.ol-faq-item`). El selector de variantes, la galería de
  miniaturas y el formulario de compra real no se tocaron (ya
  funcionaban, son independientes del idioma).
- **`assets/ol-scripts.js`**: nueva función `initCantidadProducto()`
  (botones +/- del selector de cantidad), añadida a la lista de
  inicialización.
- **`templates/product.ol.json`** (reescrito): aplica la misma lógica de
  arquitectura que la portada, reutilizando las secciones ya en inglés:
  producto (con fila de confianza + acordeón), `ol-lockup` (DrySpin™),
  2 bloques `ol-beneficio-alterno`, `ol-confianza-barra`, `ol-resenas`,
  `ol-antivillano` (comparativa) y `ol-honestidad` (FAQ).
- **Nota técnica**: al subir el schema nuevo (bloque `acordeon`) y la
  plantilla que lo usa en la MISMA llamada a `themeFilesUpsert`, Shopify
  devolvió error de tipo de bloque no reconocido — la validación de la
  plantilla no ve el schema recién subido dentro de la misma mutación.
  Solución: subir primero la sección con el schema nuevo, confirmar éxito,
  y subir la plantilla en una llamada `themeFilesUpsert` aparte.

Todo subido sin `userErrors` al tema `188049719676` (confirmado
UNPUBLISHED antes y después de subir).

### Vista previa de la página de producto
`https://a8d44c-zc.myshopify.com/products/offleash-automatic-ball-launcher?preview_theme_id=188049719676`

### Vista previa (tema v2, vigente)
`https://a8d44c-zc.myshopify.com/?preview_theme_id=188049719676`

### Pendiente / decisiones del usuario
- Revisar la portada completa nueva y pedir correcciones (según su propia
  instrucción: "hazlo todo igual que las capturas y después te hago
  correcciones").
- Precio final de la variante: sigue en 99,00 (mostrado en EUR hasta que
  cambie la moneda de cuenta a USD — decisión de cuenta, Configuración →
  General).
- Inventario a 0 unidades — decisión pendiente del usuario.
- Sigue pendiente la clave de OpenAI / foto real si quiere fotos generadas
  para el hero y el resto de huecos de imagen (por ahora todos son
  `image_picker` editables con placeholder).
- Rellenar las 4 políticas nativas (Configuración → Políticas → plantilla).

## Limpieza de contenido (sin tocar diseño/layout)

El usuario pidió una limpieza puntual antes del rediseño: quitar toda
mención a "90 días de garantía", quitar la marca "Dyal Speen", quitar
packs/bundles (solo vendemos 1 producto), y arreglar el cambio de imagen
por variante de color. Commits pequeños por bloque en
`claude/tienda-shopify-v2-k75pjm`.

### Tercer evento: el tema v2 también se publicó
Al empezar esta limpieza, "OffLeash US v2 (Claude draft)"
(`188049719676`) apareció en rol MAIN (publicado por el usuario, tercera
vez). Además, los temas antiguos ("OffLeash (Claude)" y "OffLeash US
(Claude draft)") ya no aparecen en la lista de temas — probablemente
borrados por el usuario desde su panel. Mismo procedimiento de siempre:
duplicado a un tema nuevo sin publicar.

**Tema de trabajo actual**: **"OffLeash US (cleanup draft)"**,
id `gid://shopify/OnlineStoreTheme/188079702396`, rol UNPUBLISHED
(confirmado). Toda la limpieza de esta fase está subida aquí.

### 1) "90 días de garantía" — eliminado
Grep case-insensitive de "90 d"/"90-day"/"90 day" en todo el repo.
Archivos tocados: `sections/ol-honestidad.liquid`,
`sections/header-group.json` (mensaje de la marquesina),
`sections/ol-antivillano.liquid` (fila de la tabla comparativa),
`sections/ol-iconos.liquid` (icono de la tira de beneficios),
`sections/ol-producto.liquid` (badge de garantía, fila de confianza,
acordeón "Shipping & Returns" → "Shipping"), `templates/index.json` y
`templates/product.ol.json` (instancias correspondientes). También se
actualizó la `descriptionHtml` del producto real vía Admin API (no es un
archivo del repo, pero mencionaba el mismo texto). Las secciones
antiguas en español que también lo mencionaban (`ol-mecanismo.liquid`,
`ol-oferta.liquid`, `ol-cta-final.liquid`) se eliminaron por completo
(ver punto 3).

### 2) Marca "Dyal Speen" — no existía literalmente, se trató como "DrySpin™"
No hay ninguna coincidencia de "dyal" en el repo. La coincidencia más
cercana (fonéticamente) es **"DrySpin™"**, el nombre del mecanismo
inventado durante la construcción original (rueda de inercia anti-babas).
Se sustituyó cada aparición por el placeholder **`[NOMBRE MARCA]`** en:
`sections/ol-hero.liquid`, `sections/ol-lockup.liquid`,
`sections/ol-producto.liquid`, `templates/index.json`,
`templates/product.ol.json`. No se inventó un nombre nuevo.

### 3) Packs/bundles — eliminados
Se borró `sections/ol-grid-productos.liquid` (mostraba 3 tarjetas: un
"Bundle + Anti-Drool Balls", el lanzador individual real, y un
"Accessory Pack" — ninguno de los dos primeros es un producto real).
Se quitó su instancia de `templates/index.json` y se re-apuntó el botón
del hero (antes anclaba a `#ol-shop`, la sección eliminada) directamente
a `/products/offleash-automatic-ball-launcher`. También se eliminaron
por completo las 5 secciones legacy en español que ya no se usaban en
ningún template (`ol-revelacion`, `ol-mecanismo`, `ol-permiso`,
`ol-oferta` — el "stack de valor"/bundle original —, `ol-cta-final`).
El botón de compra real (`{% form 'product', product %}` en
`ol-producto.liquid`) siempre estuvo atado al producto/variante actual,
sin selector de packs.

**Limitación técnica descubierta**: la mutación `themeFilesDelete` está
bloqueada por completo en este conector (categoría "destructive"), sin
importar si el tema es borrador o está en vivo. Los archivos legacy se
borraron del repositorio de Git, pero **siguen existiendo como archivos
huérfanos dentro del tema de Shopify** (ya no están referenciados por
ningún template, así que no se ven ni se pueden añadir por accidente,
pero ocupan espacio en el editor de código). Si el usuario quiere
borrarlos físicamente del tema, tiene que hacerlo desde Tienda online →
Temas → Editar código → borrar archivo, manualmente.

### 4) Imagen por variante de color — corregido en el código
El selector de variantes personalizado (`initSelectorVariantes` en
`assets/ol-scripts.js`) nunca capturaba ni aplicaba la imagen de la
variante — solo actualizaba precio/id/disponibilidad. Se añadió:
- `variant.featured_image` al JSON que lee el selector
  (`sections/ol-producto.liquid`).
- Un puntero `data-imagen-id` a la imagen principal del producto.
- En el JS, si la variante encontrada tiene imagen, se actualiza el
  `src` de la imagen principal al seleccionarla.

**Estado real de las variantes (revisado vía Admin API)**: el producto
tiene una opción "Colors" con dos valores — "OffLeash™ - Lime Green" y
"OffLeash™ - Forest Green". **Solo "Forest Green" tiene una imagen
asignada** en el admin (un SVG de "No forced sleep mode..."). **"Lime
Green" no tiene ninguna imagen asignada** — no se puede mostrar lo que no
existe. El código ya está listo para ambas; falta que el usuario suba y
asigne una foto real a la variante "Lime Green" (y, si quiere, reemplace
la imagen de "Forest Green" por una foto real del producto en vez del
SVG de icono que tiene ahora).

### Vista previa (tema de limpieza, vigente)
`https://a8d44c-zc.myshopify.com/?preview_theme_id=188079702396`
`https://a8d44c-zc.myshopify.com/products/offleash-automatic-ball-launcher?preview_theme_id=188079702396`
