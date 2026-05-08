import { useEffect, useMemo, useState } from 'react'
import './paneles.css'

type TabPaneles = 'todos' | 'favoritos' | 'compartidos'
type PlantillaPanel = 'ventas' | 'operaciones'
type TipoWidget = 'kpi' | 'barras' | 'lineas' | 'donut' | 'heatmap' | 'tabla' | 'gauge'

type Dashboard = {
  id: number
  nombre: string
  descripcion: string
  widgets: number
  actualizado: string
  vivo: boolean
  favorito: boolean
  compartido: boolean
}

type ToastItem = {
  id: number
  texto: string
}

type WidgetDef = {
  tipo: TipoWidget
  label: string
  desc: string
}

type WidgetItem = {
  id: string
  tipo: TipoWidget
  span: 3 | 4 | 6 | 8 | 12
  data: Record<string, unknown>
}

const dashboardsIniciales: Dashboard[] = [
  { id: 1, nombre: 'Ventas por region', descripcion: 'Ingresos, conversion y ticket promedio por canal y zona geografica.', widgets: 8, actualizado: 'Hoy', vivo: true, favorito: true, compartido: true },
  { id: 2, nombre: 'Retencion de clientes', descripcion: 'Churn rate, NPS y cohortes mensuales de actividad de usuarios.', widgets: 6, actualizado: 'Ayer', vivo: false, favorito: false, compartido: false },
  { id: 3, nombre: 'Rendimiento mensual', descripcion: 'KPIs consolidados del mes: ingresos, costos, margen y crecimiento.', widgets: 9, actualizado: 'Hace 2d', vivo: false, favorito: true, compartido: true },
  { id: 4, nombre: 'Embudo de conversion', descripcion: 'Analisis del funnel completo desde visita hasta compra recurrente.', widgets: 5, actualizado: 'Hace 3d', vivo: false, favorito: false, compartido: false },
]

const widgetDefs: WidgetDef[] = [
  { tipo: 'kpi', label: 'KPI', desc: 'Metrica con delta' },
  { tipo: 'barras', label: 'Barras', desc: 'Comparativa por categorias' },
  { tipo: 'lineas', label: 'Lineas', desc: 'Tendencias en el tiempo' },
  { tipo: 'donut', label: 'Torta/Donut', desc: 'Distribucion porcentual' },
  { tipo: 'heatmap', label: 'Heatmap', desc: 'Actividad por dia/hora' },
  { tipo: 'tabla', label: 'Tabla', desc: 'Datos en filas y columnas' },
  { tipo: 'gauge', label: 'Gauge', desc: 'Indicador circular de meta' },
]

const widgetsIniciales: WidgetItem[] = [
  { id: 'w1', tipo: 'kpi', span: 3, data: { label: 'Ingresos', valor: '$924K', delta: '+22%', dir: 'verde', mini: [40, 55, 50, 70, 62, 80, 75] } },
  { id: 'w2', tipo: 'kpi', span: 3, data: { label: 'Conversion', valor: '4.2%', delta: '-0.6%', dir: 'rojo', mini: [60, 55, 50, 48, 45, 42, 42] } },
  { id: 'w3', tipo: 'kpi', span: 3, data: { label: 'Ticket prom.', valor: '$1,380', delta: '+8.4%', dir: 'verde', mini: [50, 60, 58, 68, 70, 78, 80] } },
  { id: 'w4', tipo: 'kpi', span: 3, data: { label: 'NPS', valor: '74', delta: '+5 pts', dir: 'verde', mini: [55, 58, 62, 65, 68, 72, 74] } },
  { id: 'w5', tipo: 'barras', span: 8, data: { titulo: 'Ventas por vendedor', etqs: ['Ana G.', 'Luis T.', 'Carla M.', 'Pedro R.', 'Sofia V.', 'Marcos L.'], vals: [187, 154, 172, 138, 160, 113] } },
  { id: 'w6', tipo: 'donut', span: 4, data: { titulo: 'Canales', segmentos: [{ l: 'Email', p: 38, c: '#6d5d8c' }, { l: 'Directo', p: 27, c: '#4ade80' }, { l: 'Redes', p: 21, c: '#60a5fa' }, { l: 'Referido', p: 14, c: '#fbbf24' }] } },
  { id: 'w7', tipo: 'lineas', span: 12, data: { titulo: 'Evolucion mensual de ingresos', etqs: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'], vals: [280, 310, 260, 340, 390, 420] } },
  { id: 'w8', tipo: 'gauge', span: 4, data: { titulo: 'Meta mensual', pct: 78, label: '78%', sub: '$720K / $924K' } },
  { id: 'w9', tipo: 'heatmap', span: 8, data: { titulo: 'Actividad semanal' } },
  { id: 'w10', tipo: 'tabla', span: 12, data: { titulo: 'Top vendedores' } },
]

const filtrosPeriodo = ['Hoy', 'Esta semana', 'Este mes', 'Q2 2026', 'Ano']
const filtrosRegion = ['Todas', 'Norte', 'Sur', 'Este']

function previewHeights(id: number) {
  const presets = [
    [30, 55, 45, 70, 60, 90, 75],
    [65, 40, 80, 50, 70, 45, 88],
    [50, 60, 40, 75, 55, 82, 68],
    [40, 70, 55, 65, 80, 50, 72],
  ]
  return presets[(id - 1) % presets.length]
}

function badgeTabla(tipo: 'verde' | 'rojo' | 'amarillo', texto: string) {
  return <span className={`paneles__tabla-badge paneles__tabla-badge--${tipo}`}>{texto}</span>
}

function IconoDashboard() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="4" rx="1.3" /><rect x="13" y="10" width="7" height="10" rx="1.3" /><rect x="4" y="13" width="7" height="7" rx="1.5" /></svg>
}
function IconoEstrella() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01z" /></svg>
}
function IconoCompartir() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>
}
function IconoImportar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
}
function IconoMas() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
}
function IconoCalendario() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="4" y="6" width="16" height="14" rx="2" /><path d="M8 4v4M16 4v4M4 10h16" /></svg>
}
function IconoGrafica() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 17v-5M12 17V7M17 17v-8" /></svg>
}
function IconoPuntos() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>
}
function IconoDuplicar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M4 16V4h12" /></svg>
}
function IconoExportar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
}
function IconoEliminar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /></svg>
}
function IconoVolver() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
}
function IconoFiltros() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
}
function IconoPantalla() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" /></svg>
}
function IconoImagen() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
}
function IconoPdf() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><path d="M7 4h7l4 4v12H7z" /><path d="M14 4v4h4" /><path d="M10 13h5M10 16h5" strokeLinecap="round" /></svg>
}
function IconoEditar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" /></svg>
}
function IconoKpi() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 16l6-6 4 4 6-6" /><path d="M14 8h6v6" /></svg>
}
function IconoLinea() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 16l6-6 4 4 6-6" /></svg>
}
function IconoDonut() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></svg>
}
function IconoHeatmap() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="4" height="4" rx="1" /><rect x="10" y="3" width="4" height="4" rx="1" /><rect x="17" y="3" width="4" height="4" rx="1" /><rect x="3" y="10" width="4" height="4" rx="1" /><rect x="10" y="10" width="4" height="4" rx="1" /><rect x="17" y="10" width="4" height="4" rx="1" /><rect x="3" y="17" width="4" height="4" rx="1" /><rect x="10" y="17" width="4" height="4" rx="1" /><rect x="17" y="17" width="4" height="4" rx="1" /></svg>
}
function IconoTabla() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></svg>
}
function IconoGauge() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M5.6 5.6A9 9 0 1 1 4 12" /><path d="M12 12l3.5-3.5" /></svg>
}
function IconoSube() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 15l-6-6-6 6" /></svg>
}
function IconoBaja() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
}

function iconoWidget(tipo: TipoWidget) {
  if (tipo === 'kpi') return <IconoKpi />
  if (tipo === 'barras') return <IconoGrafica />
  if (tipo === 'lineas') return <IconoLinea />
  if (tipo === 'donut') return <IconoDonut />
  if (tipo === 'heatmap') return <IconoHeatmap />
  if (tipo === 'tabla') return <IconoTabla />
  return <IconoGauge />
}

function filasTablaDemo() {
  return [
    ['Ana Garcia', '$187K', '41', 'Email', badgeTabla('verde', '+22%')],
    ['Carla Mendez', '$172K', '38', 'Email', badgeTabla('verde', '+14%')],
    ['Luis Torres', '$154K', '34', 'Directo', badgeTabla('amarillo', '+3%')],
    ['Sofia Vargas', '$160K', '36', 'Redes', badgeTabla('verde', '+18%')],
    ['Pedro Ruiz', '$138K', '30', 'Email', badgeTabla('rojo', '-6%')],
  ]
}

export function PanelesVista() {
  const [tabActiva, setTabActiva] = useState<TabPaneles>('todos')
  const [dashboards, setDashboards] = useState(dashboardsIniciales)
  const [dashboardActivoId, setDashboardActivoId] = useState<number | null>(null)
  const [dropdownAbierto, setDropdownAbierto] = useState<number | null>(null)
  const [filtrosVisibles, setFiltrosVisibles] = useState(false)
  const [filtrosPeriodoActivos, setFiltrosPeriodoActivos] = useState<string[]>(['Esta semana'])
  const [filtrosRegionActivos, setFiltrosRegionActivos] = useState<string[]>(['Todas'])
  const [widgetsActivos, setWidgetsActivos] = useState(widgetsIniciales)
  const [arrastreWidgetId, setArrastreWidgetId] = useState<string | null>(null)
  const [dragOverWidgetId, setDragOverWidgetId] = useState<string | null>(null)
  const [pickerAbierto, setPickerAbierto] = useState(false)
  const [nuevoAbierto, setNuevoAbierto] = useState(false)
  const [fullscreenAbierto, setFullscreenAbierto] = useState(false)
  const [nombreNuevo, setNombreNuevo] = useState('')
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<PlantillaPanel>('ventas')
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [nextWidgetId, setNextWidgetId] = useState(20)

  const dashboardActivo = dashboards.find((item) => item.id === dashboardActivoId) ?? null

  const dashboardsFiltrados = useMemo(() => {
    return dashboards.filter((item) => {
      if (tabActiva === 'favoritos') return item.favorito
      if (tabActiva === 'compartidos') return item.compartido
      return true
    })
  }, [dashboards, tabActiva])

  useEffect(() => {
    const cerrar = () => setDropdownAbierto(null)
    window.addEventListener('click', cerrar)
    return () => window.removeEventListener('click', cerrar)
  }, [])

  function mostrarToast(texto: string) {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, texto }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id))
    }, 3200)
  }

  function abrirEditor(id: number) {
    const seleccionado = dashboards.find((item) => item.id === id)
    if (!seleccionado) return
    setDashboardActivoId(id)
    setDropdownAbierto(null)
    setWidgetsActivos(widgetsIniciales)
  }

  function volverGaleria() {
    setDashboardActivoId(null)
    setFullscreenAbierto(false)
  }

  function toggleDropdown(event: React.MouseEvent, id: number) {
    event.stopPropagation()
    setDropdownAbierto((prev) => (prev === id ? null : id))
  }

  function accionDropdown(accion: 'duplicar' | 'compartir' | 'exportar' | 'eliminar', id: number) {
    const actual = dashboards.find((item) => item.id === id)
    if (!actual) return

    if (accion === 'duplicar') {
      const clon = { ...actual, id: Date.now(), nombre: `${actual.nombre} copia`, actualizado: 'Ahora' }
      setDashboards((prev) => [clon, ...prev])
      mostrarToast(`"${actual.nombre}" duplicado.`)
    }

    if (accion === 'compartir') {
      mostrarToast(`Link de "${actual.nombre}" copiado.`)
    }

    if (accion === 'exportar') {
      mostrarToast(`Exportando "${actual.nombre}"...`)
    }

    if (accion === 'eliminar') {
      setDashboards((prev) => prev.filter((item) => item.id !== id))
      if (dashboardActivoId === id) setDashboardActivoId(null)
      mostrarToast(`"${actual.nombre}" eliminado.`)
    }

    setDropdownAbierto(null)
  }

  function toggleFiltro(grupo: 'periodo' | 'region', valor: string) {
    const setter = grupo === 'periodo' ? setFiltrosPeriodoActivos : setFiltrosRegionActivos
    setter((prev) => (prev.includes(valor) ? prev.filter((item) => item !== valor) : [...prev, valor]))
    mostrarToast('Filtro aplicado. Actualizando datos...')
  }

  function eliminarWidget(id: string) {
    setWidgetsActivos((prev) => prev.filter((item) => item.id !== id))
    mostrarToast('Widget eliminado.')
  }

  function editarWidget() {
    mostrarToast('Editando widget. Panel de propiedades en construccion.')
  }

  function agregarWidget(tipo: TipoWidget) {
    const nuevoId = `w${nextWidgetId + 1}`
    setNextWidgetId((prev) => prev + 1)
    const spans: Record<TipoWidget, 3 | 4 | 6 | 8 | 12> = {
      kpi: 3,
      barras: 8,
      lineas: 12,
      donut: 4,
      heatmap: 8,
      tabla: 12,
      gauge: 4,
    }

    const dataPorTipo: Record<TipoWidget, Record<string, unknown>> = {
      kpi: { label: 'Nuevo KPI', valor: '—', delta: '+0%', dir: 'verde', mini: [40, 50, 45, 60, 55, 70, 65] },
      barras: { titulo: 'Nuevo grafico de barras', etqs: ['A', 'B', 'C', 'D', 'E'], vals: [60, 80, 55, 75, 90] },
      lineas: { titulo: 'Nuevo grafico de lineas', etqs: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'], vals: [300, 340, 280, 390, 420, 460] },
      donut: { titulo: 'Nueva distribucion', segmentos: [{ l: 'A', p: 40, c: '#6d5d8c' }, { l: 'B', p: 35, c: '#4ade80' }, { l: 'C', p: 25, c: '#60a5fa' }] },
      heatmap: { titulo: 'Nuevo heatmap' },
      tabla: { titulo: 'Nueva tabla' },
      gauge: { titulo: 'Nuevo gauge', pct: 65, label: '65%', sub: 'Meta no definida' },
    }

    setWidgetsActivos((prev) => [...prev, { id: nuevoId, tipo, span: spans[tipo], data: dataPorTipo[tipo] }])
    setPickerAbierto(false)
    mostrarToast(`Widget "${widgetDefs.find((item) => item.tipo === tipo)?.label}" anadido al dashboard.`)
  }

  function onDragStartWidget(id: string) {
    setArrastreWidgetId(id)
  }

  function onDropWidget(destinoId: string) {
    if (!arrastreWidgetId || arrastreWidgetId === destinoId) {
      setDragOverWidgetId(null)
      return
    }

    setWidgetsActivos((prev) => {
      const origenIndex = prev.findIndex((item) => item.id === arrastreWidgetId)
      const destinoIndex = prev.findIndex((item) => item.id === destinoId)
      if (origenIndex === -1 || destinoIndex === -1) return prev
      const copia = [...prev]
      const [movido] = copia.splice(origenIndex, 1)
      copia.splice(destinoIndex, 0, movido)
      return copia
    })

    setDragOverWidgetId(null)
    mostrarToast('Widget reordenado.')
  }

  function exportarDashboard(formato: 'PNG' | 'PDF') {
    mostrarToast(`Exportando "${dashboardActivo?.nombre}" como ${formato}...`)
  }

  function compartirLink() {
    mostrarToast('Link copiado al portapapeles.')
  }

  function crearDashboard() {
    const nombre = nombreNuevo.trim() || 'Dashboard sin nombre'
    const nuevo: Dashboard = {
      id: Date.now(),
      nombre,
      descripcion: `Nuevo dashboard · plantilla ${plantillaSeleccionada}.`,
      widgets: 0,
      actualizado: 'Ahora',
      vivo: false,
      favorito: false,
      compartido: false,
    }
    setDashboards((prev) => [nuevo, ...prev])
    setNombreNuevo('')
    setNuevoAbierto(false)
    mostrarToast(`Dashboard "${nombre}" creado.`)
  }

  function renderBarrasWidget(widget: WidgetItem) {
    const etqs = widget.data.etqs as string[]
    const vals = widget.data.vals as number[]
    const width = 400
    const height = 100
    const max = Math.max(...vals)
    const barWidth = (width - 20 - (vals.length - 1) * 6) / vals.length

    return (
      <>
        <svg className="paneles__svg" viewBox={`0 0 ${width} ${height}`}>
          {vals.map((valor, index) => {
            const altura = (valor / max) * 88
            const x = 10 + index * (barWidth + 6)
            return (
              <g key={`${widget.id}-${etqs[index]}`}>
                <rect
                  x={x}
                  y={height - altura}
                  width={barWidth}
                  height={altura}
                  rx="3"
                  fill={index === 0 ? '#fff' : 'var(--color-acento)'}
                  opacity={index === 0 ? 1 : 0.65}
                />
                <text
                  x={x + barWidth / 2}
                  y={height - altura - 3}
                  textAnchor="middle"
                  fontSize="8"
                  fill="color-mix(in srgb, var(--color-claro) 52%, transparent)"
                  fontFamily="Sora"
                >
                  ${valor}K
                </text>
              </g>
            )
          })}
        </svg>
        <div className="paneles__etiquetas-x">
          {etqs.map((item) => <span key={item}>{item}</span>)}
        </div>
      </>
    )
  }

  function renderLineasWidget(widget: WidgetItem) {
    const etqs = widget.data.etqs as string[]
    const vals = widget.data.vals as number[]
    const width = 680
    const height = 90
    const pad = 14
    const min = Math.min(...vals) - 20
    const max = Math.max(...vals) + 20
    const xStep = (width - pad * 2) / (vals.length - 1)
    const scaleY = (value: number) => height - pad - ((value - min) / (max - min)) * (height - pad * 2)
    const points = vals.map((value, index) => [pad + index * xStep, scaleY(value)] as const)
    const areaPoints = [[pad, height - pad], ...points, [pad + (vals.length - 1) * xStep, height - pad]]

    return (
      <>
        <svg className="paneles__svg" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id={`grad-${widget.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-acento)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-acento)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={areaPoints.map((point) => point.join(',')).join(' ')} fill={`url(#grad-${widget.id})`} />
          <polyline points={points.map((point) => point.join(',')).join(' ')} fill="none" stroke="var(--color-acento)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((point, index) => (
            <circle key={`${widget.id}-${index}`} cx={point[0]} cy={point[1]} r="3" fill="var(--color-acento)" stroke="var(--color-base)" strokeWidth="1.5" />
          ))}
        </svg>
        <div className="paneles__etiquetas-x">
          {etqs.map((item) => <span key={item}>{item}</span>)}
        </div>
      </>
    )
  }

  function renderDonutWidget(widget: WidgetItem) {
    const segmentos = widget.data.segmentos as Array<{ l: string; p: number; c: string }>
    const cx = 50
    const cy = 50
    const r = 36
    const stroke = 13
    const circum = 2 * Math.PI * r
    let offset = 0

    return (
      <div className="paneles__donut">
        <svg className="paneles__svg" viewBox="0 0 100 100" width="100" height="100">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="color-mix(in srgb, var(--color-acento) 35%, transparent)" strokeWidth={stroke} />
          {segmentos.map((segmento) => {
            const len = (segmento.p / 100) * circum
            const dashOffset = -offset + circum * 0.25
            offset += len
            return (
              <circle
                key={segmento.l}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={segmento.c}
                strokeWidth={stroke}
                strokeDasharray={`${len} ${circum - len}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
            )
          })}
        </svg>
        <div className="paneles__donut-leyenda">
          {segmentos.map((segmento) => (
            <div key={segmento.l} className="paneles__donut-item">
              <span className="paneles__donut-dot" style={{ background: segmento.c }} />
              <span>{segmento.l} <strong>{segmento.p}%</strong></span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  function renderGaugeWidget(widget: WidgetItem) {
    const pct = widget.data.pct as number
    const label = widget.data.label as string
    const sub = widget.data.sub as string
    const cx = 60
    const cy = 60
    const r = 48
    const fillAngle = Math.PI * (pct / 100)
    const x1 = cx - r
    const y1 = cy
    const x2 = cx + r * Math.cos(Math.PI + fillAngle)
    const y2 = cy + r * Math.sin(Math.PI + fillAngle)

    return (
      <div className="paneles__gauge">
        <svg viewBox="0 0 120 70" width="160">
          <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="color-mix(in srgb, var(--color-acento) 35%, transparent)" strokeWidth="10" strokeLinecap="round" />
          <path d={`M ${x1} ${y1} A ${r} ${r} 0 ${fillAngle > Math.PI ? 1 : 0} 1 ${x2} ${y2}`} fill="none" stroke="var(--color-acento)" strokeWidth="10" strokeLinecap="round" />
        </svg>
        <p className="paneles__gauge-label">{label}</p>
        <p className="paneles__gauge-sub">{sub}</p>
      </div>
    )
  }

  function renderWidget(widget: WidgetItem) {
    const className = `paneles__widget paneles__widget--w${widget.span}${dragOverWidgetId === widget.id ? ' paneles__widget--drag-over' : ''}`

    return (
      <article
        key={widget.id}
        className={className}
        draggable
        onDragStart={() => onDragStartWidget(widget.id)}
        onDragOver={(event) => { event.preventDefault(); setDragOverWidgetId(widget.id) }}
        onDragLeave={() => setDragOverWidgetId((prev) => (prev === widget.id ? null : prev))}
        onDrop={() => onDropWidget(widget.id)}
      >
        <div className="paneles__widget-head">
          <span className="paneles__widget-titulo">{String(widget.data.titulo ?? widget.data.label)}</span>
          <div className="paneles__widget-acciones">
            <button type="button" className="paneles__accion-widget" title="Editar" onClick={editarWidget}><IconoEditar /></button>
            <button type="button" className="paneles__accion-widget" title="Eliminar" onClick={() => eliminarWidget(widget.id)}><IconoEliminar /></button>
          </div>
        </div>
        <div className="paneles__widget-body">
          {widget.tipo === 'kpi' && (
            <>
              <p className="paneles__kpi-valor">{String(widget.data.valor)}</p>
              <p className={`paneles__kpi-delta paneles__kpi-delta--${String(widget.data.dir)}`}>
                {String(widget.data.dir) === 'rojo' ? <IconoBaja /> : <IconoSube />}
                {String(widget.data.delta)}
              </p>
              <div className="paneles__mini-chart">
                {(widget.data.mini as number[]).map((valor, index, arr) => (
                  <span
                    key={`${widget.id}-${index}`}
                    className={`paneles__mini-bar ${index === arr.length - 1 ? 'paneles__mini-bar--destacada' : ''}`}
                    style={{ height: `${valor}%` }}
                  />
                ))}
              </div>
            </>
          )}
          {widget.tipo === 'barras' && renderBarrasWidget(widget)}
          {widget.tipo === 'lineas' && renderLineasWidget(widget)}
          {widget.tipo === 'donut' && renderDonutWidget(widget)}
          {widget.tipo === 'heatmap' && (
            <>
              <div className="paneles__heatmap-dias">
                {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((dia) => <span key={dia} className="paneles__heatmap-dia">{dia}</span>)}
              </div>
              <div className="paneles__heatmap-grid">
                {Array.from({ length: 35 }, (_, index) => {
                  const intensidad = ((index * 17) % 80) + 10
                  return <span key={`${widget.id}-${index}`} className="paneles__heatmap-cell" style={{ background: `color-mix(in srgb, var(--color-acento) ${intensidad}%, transparent)` }} />
                })}
              </div>
              <p className="paneles__heatmap-nota">Ultimas 5 semanas · Eventos por dia</p>
            </>
          )}
          {widget.tipo === 'tabla' && (
            <div className="paneles__tabla-wrap">
              <table className="paneles__tabla">
                <thead>
                  <tr>
                    <th>Vendedor</th>
                    <th>Ingresos</th>
                    <th>Cierres</th>
                    <th>Canal top</th>
                    <th>Vs anterior</th>
                  </tr>
                </thead>
                <tbody>
                  {filasTablaDemo().map((fila, index) => (
                    <tr key={`${widget.id}-${index}`}>
                      {fila.map((celda, celdaIndex) => <td key={`${widget.id}-${index}-${celdaIndex}`}>{celda}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {widget.tipo === 'gauge' && renderGaugeWidget(widget)}
        </div>
      </article>
    )
  }

  return (
    <div className="paneles">
      <header className="paneles__topbar">
        <div>
          <div className="paneles__eyebrow"><span className="paneles__dot" />Centro de visualizacion</div>
          <h1 className="paneles__titulo">Dash<span>boards</span></h1>
          <p className="paneles__subtitulo">Crea, edita y comparte dashboards interactivos. Todos tus datos, al instante.</p>
        </div>
        <div className="paneles__acciones-superiores">
          <button type="button" className="paneles__btn paneles__btn--secundario" onClick={() => mostrarToast('Importando dashboard...')}>
            <IconoImportar />
            Importar
          </button>
          <button type="button" className="paneles__btn paneles__btn--primario" onClick={() => setNuevoAbierto(true)}>
            <IconoMas />
            Nuevo dashboard
          </button>
        </div>
      </header>

      <div className="paneles__tabs">
        <button type="button" className={`paneles__tab ${tabActiva === 'todos' ? 'paneles__tab--activa' : ''}`} onClick={() => setTabActiva('todos')}>
          <IconoDashboard />
          Todos
          <span className="paneles__tab-badge">{dashboardsFiltrados.length}</span>
        </button>
        <button type="button" className={`paneles__tab ${tabActiva === 'favoritos' ? 'paneles__tab--activa' : ''}`} onClick={() => setTabActiva('favoritos')}>
          <IconoEstrella />
          Favoritos
        </button>
        <button type="button" className={`paneles__tab ${tabActiva === 'compartidos' ? 'paneles__tab--activa' : ''}`} onClick={() => setTabActiva('compartidos')}>
          <IconoCompartir />
          Compartidos
        </button>
      </div>

      {!dashboardActivo && (
        <section className="paneles__galeria">
          {dashboardsFiltrados.length === 0 && <p className="paneles__vacio">No hay dashboards en esta categoria.</p>}
          {dashboardsFiltrados.map((dashboard, index) => (
            <article key={dashboard.id} className="paneles__card" style={{ animationDelay: `${index * 55}ms` }} onClick={() => abrirEditor(dashboard.id)}>
              <div className="paneles__card-preview">
                {previewHeights(dashboard.id).map((altura, previewIndex) => (
                  <span
                    key={`${dashboard.id}-${previewIndex}`}
                    className={`paneles__card-barra ${previewIndex === 5 ? 'paneles__card-barra--destacada' : ''}`}
                    style={{ height: `${altura}%` }}
                  />
                ))}
                <span className={`paneles__card-badge ${dashboard.vivo ? 'paneles__card-badge--vivo' : ''}`}>
                  {dashboard.vivo ? 'En vivo' : 'Estatico'}
                </span>
              </div>
              <div className="paneles__card-body">
                <p className="paneles__card-nombre">{dashboard.nombre}</p>
                <p className="paneles__card-desc">{dashboard.descripcion}</p>
                <div className="paneles__card-pie">
                  <span className="paneles__card-meta"><IconoCalendario />{dashboard.actualizado}</span>
                  <span className="paneles__card-meta"><IconoGrafica />{dashboard.widgets} widgets</span>
                  <div className="paneles__card-acciones" onClick={(event) => event.stopPropagation()}>
                    <div className="paneles__relativo">
                      <button type="button" className="paneles__btn-icono" title="Mas opciones" onClick={(event) => toggleDropdown(event, dashboard.id)}>
                        <IconoPuntos />
                      </button>
                      {dropdownAbierto === dashboard.id && (
                        <div className="paneles__dropdown">
                          <button type="button" className="paneles__dd-item" onClick={() => accionDropdown('duplicar', dashboard.id)}><IconoDuplicar />Duplicar</button>
                          <button type="button" className="paneles__dd-item" onClick={() => accionDropdown('compartir', dashboard.id)}><IconoCompartir />Compartir link</button>
                          <button type="button" className="paneles__dd-item" onClick={() => accionDropdown('exportar', dashboard.id)}><IconoExportar />Exportar</button>
                          <div className="paneles__dd-separador" />
                          <button type="button" className="paneles__dd-item paneles__dd-item--peligro" onClick={() => accionDropdown('eliminar', dashboard.id)}><IconoEliminar />Eliminar</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {dashboardActivo && (
        <section className="paneles__editor">
          <div className="paneles__editor-topbar">
            <button type="button" className="paneles__retroceso" onClick={volverGaleria}><IconoVolver /></button>
            <div>
              <p className="paneles__editor-nombre">{dashboardActivo.nombre}</p>
              <p className="paneles__editor-meta">{widgetsActivos.length} widgets · Actualizado {dashboardActivo.actualizado}</p>
            </div>
            <div className="paneles__editor-tools">
              <button type="button" className="paneles__btn paneles__btn--ghost" onClick={() => setFiltrosVisibles((prev) => !prev)}><IconoFiltros />Filtros</button>
              <button type="button" className="paneles__btn paneles__btn--ghost" onClick={() => setFullscreenAbierto(true)}><IconoPantalla />Pantalla completa</button>
              <button type="button" className="paneles__btn paneles__btn--secundario" onClick={() => exportarDashboard('PNG')}><IconoImagen />PNG</button>
              <button type="button" className="paneles__btn paneles__btn--secundario" onClick={() => exportarDashboard('PDF')}><IconoPdf />PDF</button>
              <button type="button" className="paneles__btn paneles__btn--secundario" onClick={compartirLink}><IconoCompartir />Compartir</button>
              <button type="button" className="paneles__btn paneles__btn--primario" onClick={() => setPickerAbierto(true)}><IconoMas />Agregar widget</button>
            </div>
          </div>

          {filtrosVisibles && (
            <div className="paneles__filtros">
              <span className="paneles__filtros-label">Periodo</span>
              {filtrosPeriodo.map((filtro) => (
                <button key={filtro} type="button" className={`paneles__chip ${filtrosPeriodoActivos.includes(filtro) ? 'paneles__chip--activo' : ''}`} onClick={() => toggleFiltro('periodo', filtro)}>{filtro}</button>
              ))}
              <span className="paneles__filtros-separador" />
              <span className="paneles__filtros-label">Region</span>
              {filtrosRegion.map((filtro) => (
                <button key={filtro} type="button" className={`paneles__chip ${filtrosRegionActivos.includes(filtro) ? 'paneles__chip--activo' : ''}`} onClick={() => toggleFiltro('region', filtro)}>{filtro}</button>
              ))}
            </div>
          )}

          <div className="paneles__widgets">
            {widgetsActivos.map(renderWidget)}
            <button type="button" className="paneles__zona-agregar" onClick={() => setPickerAbierto(true)}>
              <div className="paneles__zona-agregar-icono"><IconoMas /></div>
              <p className="paneles__zona-agregar-titulo">Agregar widget</p>
              <p className="paneles__zona-agregar-sub">Haz clic para anadir KPI, grafica, tabla u otro tipo de visualizacion.</p>
            </button>
          </div>
        </section>
      )}

      {pickerAbierto && (
        <div className="paneles__overlay" onClick={() => setPickerAbierto(false)}>
          <div className="paneles__modal" onClick={(event) => event.stopPropagation()}>
            <p className="paneles__modal-titulo">Agregar widget</p>
            <p className="paneles__modal-sub">Elige el tipo de visualizacion que deseas anadir al dashboard.</p>
            <div className="paneles__picker">
              {widgetDefs.map((widget) => (
                <button key={widget.tipo} type="button" className="paneles__picker-item" onClick={() => agregarWidget(widget.tipo)}>
                  <span className="paneles__picker-icono">{iconoWidget(widget.tipo)}</span>
                  <p className="paneles__picker-nombre">{widget.label}</p>
                  <p className="paneles__picker-desc">{widget.desc}</p>
                </button>
              ))}
            </div>
            <div className="paneles__modal-footer">
              <button type="button" className="paneles__btn paneles__btn--secundario" onClick={() => setPickerAbierto(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {nuevoAbierto && (
        <div className="paneles__overlay" onClick={() => setNuevoAbierto(false)}>
          <div className="paneles__modal" onClick={(event) => event.stopPropagation()}>
            <p className="paneles__modal-titulo">Nuevo dashboard</p>
            <p className="paneles__modal-sub">Dale un nombre y elige una plantilla de inicio.</p>
            <div className="paneles__campo">
              <label className="paneles__campo-label" htmlFor="paneles-nuevo-nombre">Nombre</label>
              <input id="paneles-nuevo-nombre" className="paneles__campo-input" value={nombreNuevo} onChange={(event) => setNombreNuevo(event.target.value)} placeholder="Ej. Dashboard de ventas Q3" />
            </div>
            <div className="paneles__plantillas">
              <button type="button" className={`paneles__modal-plantilla ${plantillaSeleccionada === 'ventas' ? 'paneles__modal-plantilla--activa' : ''}`} onClick={() => setPlantillaSeleccionada('ventas')}>
                <span className="paneles__picker-icono"><IconoGrafica /></span>
                <span>
                  <p className="paneles__picker-nombre">Ventas</p>
                  <p className="paneles__picker-desc">KPIs + barras + tabla de vendedores</p>
                </span>
              </button>
              <button type="button" className={`paneles__modal-plantilla ${plantillaSeleccionada === 'operaciones' ? 'paneles__modal-plantilla--activa' : ''}`} onClick={() => setPlantillaSeleccionada('operaciones')}>
                <span className="paneles__picker-icono"><IconoGauge /></span>
                <span>
                  <p className="paneles__picker-nombre">Operaciones</p>
                  <p className="paneles__picker-desc">Gauge + lineas + heatmap</p>
                </span>
              </button>
            </div>
            <div className="paneles__modal-footer">
              <button type="button" className="paneles__btn paneles__btn--secundario" onClick={() => setNuevoAbierto(false)}>Cancelar</button>
              <button type="button" className="paneles__btn paneles__btn--primario" onClick={crearDashboard}>Crear dashboard</button>
            </div>
          </div>
        </div>
      )}

      {fullscreenAbierto && dashboardActivo && (
        <div className="paneles__fs">
          <div className="paneles__fs-head">
            <button type="button" className="paneles__retroceso" onClick={() => setFullscreenAbierto(false)}><IconoVolver /></button>
            <p className="paneles__fs-titulo">{dashboardActivo.nombre}</p>
            <button type="button" className="paneles__btn paneles__btn--ghost" onClick={() => setFullscreenAbierto(false)}><IconoPantalla />Salir</button>
          </div>
          <div className="paneles__fs-contenido">
            <div className="paneles__widgets">
              {widgetsActivos.map(renderWidget)}
            </div>
          </div>
        </div>
      )}

      <div className="paneles__toasts">
        {toasts.map((toast) => <div key={toast.id} className="paneles__toast">{toast.texto}</div>)}
      </div>
    </div>
  )
}
