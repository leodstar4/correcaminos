# Correcaminos — Plataforma B2B de Logística Agrícola

> Conectamos productores del campo con compradores directamente. Sin intermediarios abusivos. Puebla & CDMX, México.

---

## Descripción del Proyecto

**Correcaminos** es una plataforma de logística sostenible que elimina la asimetría de poder entre productores agrícolas y compradores (restaurantes, hoteles, tiendas) en la región Puebla–CDMX. El coyote tradicional captura hasta el 70 % del valor; Correcaminos devuelve ese margen al productor mediante:

- Conexión directa productor → comprador sin intermediarios
- Rutas logísticas optimizadas con flota propia (Hub Logístico Móvil)
- Precios justos referenciados a datos reales del SNIIM
- Blockchain de trazabilidad y certificaciones de calidad
- Financiamiento social y silos comunitarios con secado

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | React 19 + Vite 8 |
| Estilos | Tailwind CSS 3 (paleta personalizada) |
| Animaciones | Framer Motion 12 |
| Gráficos | Chart.js + react-chartjs-2 |
| Mapas | react-leaflet + Leaflet + OSRM (rutas reales) |
| Estado global | Zustand (con persistencia en localStorage) |
| Routing | React Router DOM v7 |
| Notificaciones | react-hot-toast |
| Utilidades | lucide-react, date-fns |

---

## Estructura del Proyecto

```
correcaminos/
├── public/
│   ├── logo.jpeg              — Logo roadrunner (campo + ciudad)
│   └── favicon.svg
├── src/
│   ├── store/
│   │   └── useSimulationStore.js      — Zustand: GPS, chat, velocidad, métricas
│   ├── components/
│   │   ├── charts/
│   │   │   ├── DashboardProductorCharts.jsx   — 4 gráficos del productor
│   │   │   └── DashboardCompradorCharts.jsx   — 4 gráficos del comprador
│   │   ├── OrderTrackerMap.jsx        — Mapa Leaflet + rutas OSRM + camión animado
│   │   ├── ChatPanel.jsx              — Chat flotante comprador↔productor
│   │   ├── SimulationControls.jsx     — Toggle Normal/Rápido/Pausado
│   │   ├── ToastNotificationSystem.jsx — Notificaciones automáticas en tiempo real
│   │   ├── SimuladorPrecioJusto.jsx   — Calculadora con precios SNIIM reales
│   │   ├── CalculadoraGanancia.jsx    — Widget de ganancia neta
│   │   ├── SimuladorCapacidad.jsx     — Barra de capacidad de envío
│   │   ├── WidgetAhorro.jsx           — Ahorro acumulado vs coyotes
│   │   ├── CalculadoraPedido.jsx      — Optimizador de pedido por presupuesto
│   │   ├── HistorialAhorro.jsx        — Historial con export CSV
│   │   ├── PreciosSNIIM.jsx           — Precios oficiales SNIIM en tiempo real
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── ValueProps.jsx
│   │   ├── Problematica.jsx
│   │   ├── ImpactCounters.jsx
│   │   ├── Testimonials.jsx
│   │   ├── CTABanner.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Landing.jsx                — Página de marketing (/)
│   │   ├── DashboardProductor.jsx     — Panel del productor (/productor)
│   │   ├── DashboardComprador.jsx     — Panel del comprador (/comprador)
│   │   └── ProductorProfile.jsx       — Perfil detallado (/productor-profile/:id)
│   ├── hooks/
│   │   └── usePreciosSNIIM.jsx        — Hook para precios reales del SNIIM
│   ├── data/
│   │   ├── mockProducts.js            — Productos y perfiles de productores
│   │   └── mockStats.js               — Estadísticas y KPIs RBM
│   ├── App.jsx                        — Router + Toaster global
│   ├── index.css                      — Sistema de diseño Tailwind
│   └── main.jsx
├── index.html
└── package.json
```

---

## Rutas de la Aplicación

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Landing | Marketing: problemática, cómo funciona, impacto, testimonios |
| `/productor` | Dashboard Productor | Gestión de cosechas, pedidos, pagos y métricas |
| `/comprador` | Dashboard Comprador | Explorar productos, pedidos, facturación y análisis |
| `/productor-profile/:id` | Perfil Productor | Galería, certificaciones, productos y calificación |

---

## Paleta de Colores

| Token | Hex | Uso |
|---|---|---|
| `green-primary` | `#2A6B4F` | Color principal de marca |
| `teal-brand` | `#1A8A7B` | Acento secundario |
| `orange-brand` | `#E07B20` | CTAs y alertas |
| `cream` | `#F5F0E8` | Fondo cálido |
| `earth-tan` | `#8A7560` | Texto secundario |
| `earth-dark` | `#1C1C1C` | Texto principal |

---

## Funcionalidades por Dashboard

### Panel Productor (`/productor`)

**Mi Cosecha**
- Tarjeta de ingresos semanales con comparativa vs semana anterior
- Estadísticas: cosechas activas, en revisión, ventas totales
- Botón "Simulador Precio Justo" — modal con precios SNIIM reales vs coyote vs Correcaminos
- Calculadora de Ganancia Neta (widget inline con sliders)
- Simulador de Capacidad — barra de progreso con alertas de sobrecarga
- 4 gráficos interactivos: Ingresos Semanales, Volumen Mensual, Proyección de Cosecha, Distribución de Ventas
- Grid de publicaciones activas con modal de nueva cosecha

**Pedidos Activos**
- Mapa en tiempo real con rutas OSRM y camión 🚚 animado
- Cards de pedidos con aceptar/rechazar/marcar enviado
- Resumen: pendientes, preparando, en tránsito

**Historial de Ventas** — Tabla con totales y calificación promedio

**Mis Pagos** — Resumen depositado/por cobrar, cuenta bancaria verificada, movimientos

**Precios Mercado** — Componente SNIIM con datos reales

**Soporte** — WhatsApp, email, teléfono + FAQ con acordeón

**Mensajes** — Acceso al chat flotante comprador↔productor

---

### Panel Comprador (`/comprador`)

**Explorar Productos**
- Widget de ahorro acumulado (con count-up animation)
- Botón "Calculadora de Pedido Óptimo" — modal que maximiza presupuesto por tipo de negocio
- 4 gráficos: Gasto Mensual, Ahorro vs Coyotes (Grouped Bar), Tendencia de Precios, Categorías
- Historial de ahorro con filtros y exportación CSV
- Buscador + filtros por categoría y estado
- Grid de tarjetas de producto con carrito

**Productores** — Grid con perfil, rating, especialidad y link a perfil detallado

**Precios SNIIM** — Datos oficiales en tiempo real

**Mis Pedidos** — Filtros por estado + mapa de rastreo en tiempo real

**Favoritos** — Productores y productos guardados

**Facturación** — Datos fiscales (CFDI) + descarga de facturas

**Soporte** — FAQ + canales de contacto

---

## Sistema de Simulación en Tiempo Real

El store Zustand (`useSimulationStore`) controla el estado global de simulación:

### Velocidades de Simulación

| Modo | Ícono | Toast | Tick del camión |
|---|---|---|---|
| Normal | 🐢 | cada 30 s | cada 2 s |
| Rápido | ⚡ | cada 8 s | cada 0.5 s |
| Pausado | ⏸️ | desactivado | detenido |

### Datos persistidos en localStorage
- Velocidad de simulación seleccionada
- Conversaciones de chat (historial completo)
- Ahorro acumulado del comprador

---

## Mapa con Rutas Reales

El componente `OrderTrackerMap` usa:

- **OpenStreetMap** como tile layer (sin API key)
- **OSRM API pública** para calcular rutas reales en carretera:
  ```
  GET https://router.project-osrm.org/route/v1/driving/{lng},{lat};{lng},{lat}?overview=full&geometries=geojson
  ```
- **Fallback**: línea recta punteada si OSRM no responde
- **Coordenadas reales** de 10 puntos: 7 productores (Tepeaca, Los Reyes, Cholula, Libres, Oriental, Atlixco, El Seco) + 3 destinos (Col. Juárez CDMX, Angelópolis, Puebla Norte)
- **Animación**: el marcador 🚚 interpola su posición entre los puntos de la ruta cada tick

---

## Chat Comprador ↔ Productor

- Panel flotante en esquina inferior derecha (sin interferir con el layout)
- Lista de conversaciones con badge de no leídos
- Respuestas automáticas simuladas con delay aleatorio 1.5–3 s
- Quick replies predefinidas: disponibilidad, precio bulk, tiempos, forma de pago
- Persistencia completa en Zustand + localStorage

---

## Precios SNIIM

El hook `usePreciosSNIIM` consume datos reales del Sistema Nacional de Información e Integración de Mercados:

- Fallback a 16 productos con precios por defecto si la API no está disponible
- Cilantro cotizado por manojo (unidad nativa SNIIM), resto en kg
- Los simuladores **siempre** usan estos precios reales — nunca valores inventados
- `precio_coyote = precio_SNIIM × 0.5` (el coyote paga aprox. la mitad)
- `precio_correcaminos = precio_SNIIM × 0.9` (descuento de intermediación)

---

## Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/leodstar4/correcaminos.git
cd correcaminos

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev
# → http://localhost:5173

# Build de producción
npm run build
```

---

## KPIs del Proyecto (Marco RBM 2026)

| Nivel | Indicador | Meta | Fecha |
|---|---|---|---|
| Actividades | Rutas optimizadas | 100% | Ago 2026 |
| Productos | Toneladas/mes movilizadas | 12 ton/mes | Dic 2026 |
| Efectos | Aumento ganancia neta productor | +35% | Q1 2027 |
| Impacto | Agricultores sin quema | 100% zero burn | Dic 2026 |

---

## Despliegue

El proyecto está desplegado en **Netlify** con routing configurado para SPA (todas las rutas apuntan a `index.html`).

---

## Equipo

Desarrollado como proyecto de impacto social para productores agrícolas de la Sierra Norte y Valles de Puebla, México.

> *"El coyote se queda con el 70 %. Con Correcaminos, yo me quedo con el 70 %."*
> — Don Aurelio Méndez, productor de maíz criollo, Tepeaca, Pue.
