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
- Última publicación: (pendiente)

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
- [ ] 3 Brief en un mensaje (mensaje 2 — en curso)
- [ ] 3b Fotos IA
- [ ] 4 Construcción
- [ ] 5 Producto y páginas
- [ ] 6 Publicación

## Decisiones de diseño
(se rellena tras la respuesta del usuario al mensaje 2)

## Secciones creadas
(se rellena en la fase 4)
