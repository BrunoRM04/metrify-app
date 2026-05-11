import { useMemo, useState } from 'react'
import './biblioteca.css'

type TipoRecurso = 'dashboard' | 'kpi' | 'grafico' | 'reporte' | 'prompt' | 'layout'
type TipoFiltro = 'todos' | TipoRecurso
type VistaModo = 'grid' | 'lista'
type ModalActiva = 'guardar' | 'exportar' | 'importar' | null
type FormatoExport = 'JSON' | 'CSV' | 'PDF' | 'XLSX'

type Recurso = {
  id: number
  tipo: TipoRecurso
  nombre: string
  desc: string
  fecha: string
  usos: number
  etiqueta: string
  bars: number[]
}

type ToastItem = {
  id: number
  texto: string
}

const TIPO_META: Record<TipoRecurso, { color: string; label: string }> = {
  dashboard: { color: '#6d5d8c', label: 'Dashboard' },
  kpi: { color: '#4ade80', label: 'KPI' },
  grafico: { color: '#fbbf24', label: 'Grafico' },
  reporte: { color: '#60a5fa', label: 'Reporte' },
  prompt: { color: '#f87171', label: 'Prompt IA' },
  layout: { color: '#60a5fa', label: 'Layout' },
}

const LISTA_BASE: Recurso[] = [
  { id: 1, tipo: 'dashboard', nombre: 'Dashboard Ventas Q2 2025', desc: 'KPIs de ventas, embudo, top productos y comparativa mensual.', fecha: 'Hace 1 dia', usos: 14, etiqueta: 'Ventas', bars: [40, 55, 60, 72, 68, 80, 75, 90] },
  { id: 2, tipo: 'kpi', nombre: 'Tasa de Conversion Leads', desc: 'KPI de conversion por canal con semaforo automatico y delta semanal.', fecha: 'Hace 2 dias', usos: 8, etiqueta: 'Marketing', bars: [50, 60, 55, 65, 70, 68, 78, 82] },
  { id: 3, tipo: 'grafico', nombre: 'Grafico Ingresos Mensual', desc: 'Linea de ingresos acumulados con proyeccion y banda de confianza.', fecha: 'Hace 3 dias', usos: 22, etiqueta: 'Finanzas', bars: [30, 45, 40, 55, 50, 65, 60, 78] },
  { id: 4, tipo: 'reporte', nombre: 'Reporte Ejecutivo Template', desc: 'Reporte en 12 paginas con resumen IA, tablas y comparativas YoY.', fecha: 'Hace 4 dias', usos: 6, etiqueta: 'Personal', bars: [60, 65, 62, 70, 68, 75, 80, 85] },
  { id: 5, tipo: 'prompt', nombre: 'Analisis de Anomalias IA', desc: 'Prompt para detectar outliers en metricas de negocio y explicarlos.', fecha: 'Hace 5 dias', usos: 31, etiqueta: 'Personal', bars: [45, 50, 48, 60, 55, 68, 72, 80] },
  { id: 6, tipo: 'dashboard', nombre: 'CRM 360 Vista Clientes', desc: 'Segmentacion, LTV, churn y ciclo de vida del cliente en un panel.', fecha: 'Hace 6 dias', usos: 10, etiqueta: 'Ventas', bars: [35, 42, 50, 48, 58, 55, 65, 70] },
  { id: 7, tipo: 'kpi', nombre: 'NPS Acumulado', desc: 'Net Promoter Score mensual con detractores, pasivos y promotores.', fecha: 'Hace 1 semana', usos: 5, etiqueta: 'Operaciones', bars: [55, 58, 62, 60, 70, 68, 75, 80] },
  { id: 8, tipo: 'grafico', nombre: 'Heatmap Actividad Usuarios', desc: 'Mapa de calor de acciones por dia y hora en la plataforma.', fecha: 'Hace 1 semana', usos: 9, etiqueta: 'Marketing', bars: [40, 48, 45, 55, 60, 58, 68, 72] },
  { id: 9, tipo: 'reporte', nombre: 'Balance Financiero Mensual', desc: 'P y L, flujo de caja y EBITDA para reuniones de directorio.', fecha: 'Hace 2 semanas', usos: 4, etiqueta: 'Finanzas', bars: [50, 55, 52, 60, 58, 65, 70, 75] },
  { id: 10, tipo: 'layout', nombre: 'Layout 4 Columnas Analytics', desc: 'Grilla de 12 columnas con zonas para metricas y graficos.', fecha: 'Hace 2 semanas', usos: 7, etiqueta: 'Personal', bars: [45, 52, 50, 60, 55, 65, 62, 70] },
  { id: 11, tipo: 'prompt', nombre: 'Resumen Ejecutivo Automatico', desc: 'Prompt que genera resumen en 3 parrafos de cualquier set de metricas.', fecha: 'Hace 3 semanas', usos: 18, etiqueta: 'Personal', bars: [38, 45, 42, 52, 50, 60, 58, 68] },
  { id: 12, tipo: 'grafico', nombre: 'Donut Distribucion Ventas', desc: 'Grafico de dona por canal, producto y region con leyenda.', fecha: 'Hace 1 mes', usos: 12, etiqueta: 'Ventas', bars: [42, 50, 48, 58, 55, 65, 62, 72] },
]

function IconoTodo() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
}
function IconoDashboard() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>
}
function IconoKpi() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></svg>
}
function IconoGrafico() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
}
function IconoReporte() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
}
function IconoPrompt() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
}
function IconoLayout() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
}
function IconoBuscar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
}
function IconoHora() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
}
function IconoMas() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
}
function IconoVolver() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
}
function IconoCheck() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
}
function IconoReciclar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" /></svg>
}
function IconoDuplicar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
}
function IconoUpload() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
}
function IconoOrdenar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
}

function iconoTipo(tipo: TipoFiltro) {
  if (tipo === 'todos') return <IconoTodo />
  if (tipo === 'dashboard') return <IconoDashboard />
  if (tipo === 'kpi') return <IconoKpi />
  if (tipo === 'grafico') return <IconoGrafico />
  if (tipo === 'reporte') return <IconoReporte />
  if (tipo === 'prompt') return <IconoPrompt />
  return <IconoLayout />
}

function etiquetaTipo(tipo: TipoFiltro) {
  if (tipo === 'todos') return 'Todo'
  return TIPO_META[tipo].label
}

function formatTamano(id: number) {
  return `${(1.4 + id * 0.67).toFixed(1)}MB`
}

function PreviewRecurso({ recurso }: { recurso: Recurso }) {
  if (recurso.tipo === 'dashboard') {
    return (
      <div className="prev-dashboard">
        <div className="prev-d-blk"><div className="prev-d-num">KPI</div><div className="prev-d-ln a" /><div className="prev-d-ln" /></div>
        <div className="prev-d-blk"><div className="prev-d-num">KPI</div><div className="prev-d-ln a" /></div>
        <div className="prev-d-blk" style={{ gridColumn: 'span 2' }}>
          <div className="prev-d-bars">{recurso.bars.map((h, i) => <div key={`${recurso.id}-${h}-${i}`} className={`prev-d-b ${i === recurso.bars.length - 1 ? 'h' : ''}`} style={{ height: `${h}%` }} />)}</div>
        </div>
      </div>
    )
  }

  if (recurso.tipo === 'kpi') {
    const valor = Math.round(recurso.bars[recurso.bars.length - 1])
    return (
      <div className="prev-kpi">
        <div className="prev-kpi__num" style={{ color: TIPO_META.kpi.color }}>{valor}%</div>
        <div className="prev-kpi__bar"><div className="prev-kpi__fill" style={{ width: `${valor}%`, background: TIPO_META.kpi.color }} /></div>
      </div>
    )
  }

  if (recurso.tipo === 'grafico') {
    return <div className="prev-grafico">{recurso.bars.map((h, i) => <div key={`${recurso.id}-${h}-${i}`} className={`prev-g-b ${i === recurso.bars.length - 1 ? 'h' : ''}`} style={{ height: `${h}%` }} />)}</div>
  }

  if (recurso.tipo === 'reporte') {
    return <div className="prev-reporte"><div className="prev-rep-doc"><div className="prev-rep-ln a" /><div className="prev-rep-ln" /><div className="prev-rep-ln" /><div className="prev-rep-ln" style={{ width: '50%' }} /></div></div>
  }

  if (recurso.tipo === 'prompt') {
    return <div className="prev-prompt"><div className="prev-p-ln a" /><div className="prev-p-ln b" /><div className="prev-p-ln c" /><div className="prev-p-ln b" /><span className="prev-p-cursor" /></div>
  }

  return <div className="prev-layout"><div className="prev-l-blk tall" /><div className="prev-l-blk" /><div className="prev-l-blk" /></div>
}

export function BibliotecaVista() {
  const [recursos, setRecursos] = useState<Recurso[]>(LISTA_BASE)
  const [tipoActual, setTipoActual] = useState<TipoFiltro>('todos')
  const [vista, setVista] = useState<VistaModo>('grid')
  const [busqueda, setBusqueda] = useState('')
  const [modoSeleccion, setModoSeleccion] = useState(false)
  const [seleccionados, setSeleccionados] = useState<Set<number>>(new Set())
  const [detalleId, setDetalleId] = useState<number | null>(null)
  const [modalActiva, setModalActiva] = useState<ModalActiva>(null)
  const [formatoExport, setFormatoExport] = useState<FormatoExport>('JSON')
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [nombreNuevo, setNombreNuevo] = useState('')
  const [tipoNuevo, setTipoNuevo] = useState<TipoRecurso>('dashboard')
  const [etiquetaNueva, setEtiquetaNueva] = useState('Personal')

  const tipos: TipoFiltro[] = ['todos', 'dashboard', 'kpi', 'grafico', 'reporte', 'prompt', 'layout']

  const listaFiltrada = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    const porTipo = tipoActual === 'todos' ? recursos : recursos.filter((r) => r.tipo === tipoActual)
    if (!q) return porTipo
    return porTipo.filter((r) => r.nombre.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q) || r.etiqueta.toLowerCase().includes(q))
  }, [busqueda, recursos, tipoActual])

  const recursoDetalle = useMemo(() => recursos.find((r) => r.id === detalleId) ?? null, [detalleId, recursos])

  function mostrarToast(texto: string) {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, texto }])
    window.setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500)
  }

  function toggleSeleccion(id: number) {
    setSeleccionados((prev) => {
      const nuevo = new Set(prev)
      if (nuevo.has(id)) nuevo.delete(id)
      else nuevo.add(id)
      return nuevo
    })
  }

  function activarSeleccionMultiple() {
    setModoSeleccion((prev) => !prev)
    setSeleccionados(new Set())
  }

  function cancelarSeleccion() {
    setModoSeleccion(false)
    setSeleccionados(new Set())
  }

  function accionSeleccion(accion: 'duplicar' | 'exportar' | 'eliminar') {
    const total = seleccionados.size
    if (!total) {
      mostrarToast('Selecciona al menos un recurso')
      return
    }

    if (accion === 'eliminar') {
      setRecursos((prev) => prev.filter((r) => !seleccionados.has(r.id)))
      mostrarToast(`${total} recurso(s) eliminado(s)`)
      cancelarSeleccion()
      return
    }

    if (accion === 'duplicar') {
      setRecursos((prev) => {
        const maxId = prev.reduce((acc, item) => Math.max(acc, item.id), 0)
        const nuevos = prev.filter((r) => seleccionados.has(r.id)).map((r, idx) => ({ ...r, id: maxId + idx + 1, nombre: `${r.nombre} (copia)`, fecha: 'Ahora', usos: 0 }))
        return [...nuevos, ...prev]
      })
      mostrarToast(`${total} recurso(s) duplicado(s)`)
      cancelarSeleccion()
      return
    }

    mostrarToast(`${total} recurso(s) exportado(s)`)
    cancelarSeleccion()
  }

  function clickCard(id: number) {
    if (modoSeleccion) {
      toggleSeleccion(id)
      return
    }
    setDetalleId(id)
  }

  function guardarRecurso() {
    const nombreFinal = nombreNuevo.trim() || `Nuevo ${TIPO_META[tipoNuevo].label}`
    setRecursos((prev) => {
      const maxId = prev.reduce((acc, item) => Math.max(acc, item.id), 0)
      return [{
        id: maxId + 1,
        tipo: tipoNuevo,
        nombre: nombreFinal,
        desc: `Recurso guardado en categoria ${etiquetaNueva}. Listo para reutilizar.`,
        fecha: 'Ahora',
        usos: 0,
        etiqueta: etiquetaNueva,
        bars: [36, 45, 52, 61, 58, 66, 72, 79],
      }, ...prev]
    })
    setModalActiva(null)
    setNombreNuevo('')
    mostrarToast('Recurso guardado en la biblioteca')
  }

  function confirmarExport() {
    setModalActiva(null)
    mostrarToast(`Exportado como ${formatoExport}`)
  }

  function confirmarImport() {
    setModalActiva(null)
    setRecursos((prev) => {
      const maxId = prev.reduce((acc, item) => Math.max(acc, item.id), 0)
      return [{
        id: maxId + 1,
        tipo: 'dashboard',
        nombre: 'Recurso importado',
        desc: 'Importado desde archivo JSON.',
        fecha: 'Ahora',
        usos: 0,
        etiqueta: 'Personal',
        bars: [30, 44, 47, 53, 60, 66, 70, 76],
      }, ...prev]
    })
    mostrarToast('Recurso importado correctamente')
  }

  return (
    <div className="bib">
      <header className="bib__topbar">
        <div>
          <div className="bib__eyebrow"><span className="bib__dot" />Biblioteca</div>
          <h1 className="bib__titulo">Tu trabajo, siempre <span>reutilizable</span></h1>
          <p className="bib__subtitulo">Dashboards, KPIs, graficos, reportes, prompts y layouts guardados en un lugar.</p>
        </div>
        <div className="bib__acciones">
          <button type="button" className="bib__btn bib__btn--ghost" onClick={() => setModalActiva('importar')}><IconoUpload />Importar</button>
          <button type="button" className="bib__btn bib__btn--primario" onClick={() => setModalActiva('guardar')}><IconoMas />Guardar recurso</button>
        </div>
      </header>

      <div className="bib__body">
        <aside className="bib__sidebar">
          <div className="bib__sidebar-section">
            <p className="bib__sidebar-titulo">Tipo de recurso</p>
            {tipos.map((tipo) => {
              const count = tipo === 'todos' ? recursos.length : recursos.filter((r) => r.tipo === tipo).length
              return (
                <button key={tipo} type="button" className={`bib__nav-item ${tipoActual === tipo ? 'bib__nav-item--activo' : ''}`} onClick={() => setTipoActual(tipo)}>
                  {iconoTipo(tipo)}
                  {etiquetaTipo(tipo)}
                  <span className="bib__nav-count">{count}</span>
                </button>
              )
            })}
          </div>

          <div className="bib__sidebar-sep" />

          <div className="bib__sidebar-section">
            <p className="bib__sidebar-titulo">Etiquetas</p>
            <div className="bib__etiquetas">
              <button type="button" className="bib__etiqueta"><span className="bib__etiqueta-dot" style={{ background: '#6d5d8c' }} />Personal</button>
              <button type="button" className="bib__etiqueta"><span className="bib__etiqueta-dot" style={{ background: '#4ade80' }} />Ventas</button>
              <button type="button" className="bib__etiqueta"><span className="bib__etiqueta-dot" style={{ background: '#fbbf24' }} />Finanzas</button>
              <button type="button" className="bib__etiqueta"><span className="bib__etiqueta-dot" style={{ background: '#60a5fa' }} />Marketing</button>
              <button type="button" className="bib__etiqueta"><span className="bib__etiqueta-dot" style={{ background: '#f87171' }} />Operaciones</button>
            </div>
          </div>

          <div className="bib__sidebar-sep" />

          <div className="bib__sidebar-section">
            <div className="bib__storage">
              <div className="bib__storage-top"><span className="bib__storage-label">Almacenamiento</span><span className="bib__storage-val">380 MB</span></div>
              <div className="bib__storage-bar"><div className="bib__storage-fill" style={{ width: '38%' }} /></div>
              <div className="bib__storage-sub">de 1 GB usado · 38%</div>
            </div>
          </div>
        </aside>

        <div className="bib__contenido">
          {!recursoDetalle && (
            <>
              <div className="bib__toolbar">
                <div className="bib__search">
                  <span className="bib__search-icon"><IconoBuscar /></span>
                  <input className="bib__search-input" placeholder="Buscar en biblioteca..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                </div>

                <button type="button" className="bib__sort" onClick={() => mostrarToast('Orden cambiado')}><IconoOrdenar />Recientes</button>

                <div className="bib__vista-btns">
                  <button type="button" className={`bib__vista-btn ${vista === 'grid' ? 'bib__vista-btn--activo' : ''}`} onClick={() => setVista('grid')} title="Mosaico"><IconoTodo /></button>
                  <button type="button" className={`bib__vista-btn ${vista === 'lista' ? 'bib__vista-btn--activo' : ''}`} onClick={() => setVista('lista')} title="Lista"><IconoOrdenar /></button>
                </div>

                <button type="button" className="bib__btn-icono" title="Seleccion multiple" onClick={activarSeleccionMultiple}><IconoCheck /></button>
              </div>

              <div className={`bib__sel-bar ${modoSeleccion ? 'bib__sel-bar--visible' : ''}`}>
                <span className="bib__sel-label"><span>{seleccionados.size}</span> seleccionados</span>
                <button type="button" className="bib__btn bib__btn--ghost" onClick={() => accionSeleccion('duplicar')}><IconoDuplicar />Duplicar</button>
                <button type="button" className="bib__btn bib__btn--ghost" onClick={() => accionSeleccion('exportar')}><IconoUpload />Exportar</button>
                <button type="button" className="bib__btn bib__btn--peligro" onClick={() => accionSeleccion('eliminar')}><IconoReporte />Eliminar</button>
                <button type="button" className="bib__btn bib__btn--ghost" onClick={cancelarSeleccion}>Cancelar</button>
              </div>

              <section className={`bib__grid ${vista === 'lista' ? 'bib__grid--lista' : ''}`}>
                {listaFiltrada.length === 0 && (
                  <div className="bib__vacio">
                    <div className="bib__vacio-icono"><IconoTodo /></div>
                    <h3 className="bib__vacio-titulo">Sin resultados</h3>
                    <p className="bib__vacio-sub">No hay recursos que coincidan con este filtro.</p>
                  </div>
                )}

                {listaFiltrada.map((r, i) => {
                  const meta = TIPO_META[r.tipo]
                  const seleccionada = seleccionados.has(r.id)
                  return (
                    <article key={r.id} className={`bib-card ${seleccionada ? 'bib-card--seleccionada' : ''}`} style={{ animationDelay: `${i * 0.05}s` }} onClick={() => clickCard(r.id)}>
                      <button type="button" className="bib-card__chk" onClick={(e) => { e.stopPropagation(); toggleSeleccion(r.id) }}><IconoCheck /></button>

                      <div className="bib-card__preview" style={{ background: `color-mix(in srgb, ${meta.color} 8%, transparent)` }}>
                        <PreviewRecurso recurso={r} />
                        <span className="bib-card__tipo" style={{ background: `color-mix(in srgb, ${meta.color} 14%, transparent)`, color: meta.color, border: `1px solid color-mix(in srgb, ${meta.color} 32%, transparent)` }}>{meta.label}</span>
                      </div>

                      <div className="bib-card__body">
                        <h3 className="bib-card__nombre">{r.nombre}</h3>
                        <p className="bib-card__desc">{r.desc}</p>
                        <div className="bib-card__pie">
                          <span className="bib-card__fecha"><IconoHora />{r.fecha} · {r.usos} usos</span>
                          <div className="bib-card__acciones" onClick={(e) => e.stopPropagation()}>
                            <button type="button" className="bib-card__accion" title="Reutilizar" onClick={() => mostrarToast('Recurso reutilizado')}><IconoReciclar /></button>
                            <button type="button" className="bib-card__accion" title="Duplicar" onClick={() => mostrarToast('Recurso duplicado')}><IconoDuplicar /></button>
                            <button type="button" className="bib-card__accion" title="Exportar" onClick={() => setModalActiva('exportar')}><IconoUpload /></button>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </section>
            </>
          )}

          {recursoDetalle && (
            <section className="bib__detalle bib__detalle--visible">
              <div className="det__topbar">
                <button type="button" className="bib__btn bib__btn--ghost" onClick={() => setDetalleId(null)}><IconoVolver />Biblioteca</button>
                <div className="det__icono" style={{ background: `color-mix(in srgb, ${TIPO_META[recursoDetalle.tipo].color} 22%, transparent)` }}>{iconoTipo(recursoDetalle.tipo)}</div>
                <div>
                  <h2 className="det__titulo">{recursoDetalle.nombre}</h2>
                  <p className="det__meta">{TIPO_META[recursoDetalle.tipo].label} · {recursoDetalle.etiqueta} · {recursoDetalle.fecha} · {recursoDetalle.usos} usos</p>
                </div>
                <div className="det__acciones">
                  <button type="button" className="bib__btn bib__btn--ghost" onClick={() => mostrarToast('Recurso duplicado')}><IconoDuplicar />Duplicar</button>
                  <button type="button" className="bib__btn bib__btn--secundario" onClick={() => setModalActiva('exportar')}><IconoUpload />Exportar</button>
                  <button type="button" className="bib__btn bib__btn--primario" onClick={() => mostrarToast('Recurso aplicado al panel')}><IconoReciclar />Reutilizar</button>
                </div>
              </div>

              <div className="det__grid">
                <article className="det__widget det__widget--w4">
                  <div className="det__widget-head"><span className="det__widget-titulo">Usos totales</span></div>
                  <div className="det__widget-body">
                    <p className="kpi__val">{recursoDetalle.usos}</p>
                    <div className="kpi__del d--verde">+3 esta semana</div>
                    <div className="mini-chart">{recursoDetalle.bars.map((h, i) => <div key={`${recursoDetalle.id}-${h}-${i}`} className={`mini-bar ${i === recursoDetalle.bars.length - 1 ? 'h' : ''}`} style={{ height: `${h}%` }} />)}</div>
                  </div>
                </article>

                <article className="det__widget det__widget--w4">
                  <div className="det__widget-head"><span className="det__widget-titulo">Tamano</span></div>
                  <div className="det__widget-body">
                    <p className="kpi__val">{formatTamano(recursoDetalle.id)}</p>
                    <div className="kpi__del d--amarillo">Ultima modificacion {recursoDetalle.fecha}</div>
                  </div>
                </article>

                <article className="det__widget det__widget--w4">
                  <div className="det__widget-head"><span className="det__widget-titulo">Tipo</span></div>
                  <div className="det__widget-body" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 4 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `color-mix(in srgb, ${TIPO_META[recursoDetalle.tipo].color} 18%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: TIPO_META[recursoDetalle.tipo].color, flexShrink: 0 }}>{iconoTipo(recursoDetalle.tipo)}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>{TIPO_META[recursoDetalle.tipo].label}</div>
                      <div style={{ fontSize: 11, color: 'color-mix(in srgb, var(--color-claro) 45%, transparent)' }}>{recursoDetalle.etiqueta}</div>
                    </div>
                  </div>
                </article>

                <article className="det__widget det__widget--w8">
                  <div className="det__widget-head"><span className="det__widget-titulo">Historial de uso</span></div>
                  <div className="det__widget-body">
                    <svg viewBox="0 0 400 100" width="100%" style={{ overflow: 'visible', display: 'block' }}>
                      <defs>
                        <linearGradient id="bib-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6d5d8c" stopOpacity=".4" />
                          <stop offset="100%" stopColor="#6d5d8c" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,80 L57,65 L114,70 L171,48 L228,55 L285,35 L342,25 L400,12" fill="none" stroke="#6d5d8c" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M0,80 L57,65 L114,70 L171,48 L228,55 L285,35 L342,25 L400,12 L400,100 L0,100Z" fill="url(#bib-grad)" />
                    </svg>
                  </div>
                </article>

                <article className="det__widget det__widget--w12">
                  <div className="det__widget-head"><span className="det__widget-titulo">Historial de versiones</span></div>
                  <div className="det__widget-body">
                    <div className="bib__tabla-wrap">
                      <table className="bib__tabla">
                        <thead>
                          <tr><th>Version</th><th>Fecha</th><th>Cambios</th><th>Autor</th><th>Estado</th><th /></tr>
                        </thead>
                        <tbody>
                          <tr><td style={{ fontWeight: 700 }}>v3.0</td><td>{recursoDetalle.fecha}</td><td>Actualizacion de metricas y nuevo grafico de barras</td><td>Vos</td><td><span className="bib__badge bib__badge--v">Actual</span></td><td><button type="button" className="bib__btn bib__btn--ghost" style={{ padding: '3px 10px', fontSize: 10 }} onClick={() => mostrarToast('Version activa')}>Activa</button></td></tr>
                          <tr><td>v2.1</td><td>Hace 3 semanas</td><td>Correccion de filtros y ajuste de paleta</td><td>Vos</td><td><span className="bib__badge bib__badge--a">Anterior</span></td><td><button type="button" className="bib__btn bib__btn--ghost" style={{ padding: '3px 10px', fontSize: 10 }} onClick={() => mostrarToast('Restaurando v2.1...')}>Restaurar</button></td></tr>
                          <tr><td>v2.0</td><td>Hace 2 meses</td><td>Rediseno completo del layout y nuevos KPIs</td><td>Vos</td><td><span className="bib__badge bib__badge--a">Anterior</span></td><td><button type="button" className="bib__btn bib__btn--ghost" style={{ padding: '3px 10px', fontSize: 10 }} onClick={() => mostrarToast('Restaurando v2.0...')}>Restaurar</button></td></tr>
                          <tr><td>v1.0</td><td>Hace 4 meses</td><td>Version inicial</td><td>Vos</td><td><span className="bib__badge bib__badge--b">Archivado</span></td><td><button type="button" className="bib__btn bib__btn--ghost" style={{ padding: '3px 10px', fontSize: 10 }} onClick={() => mostrarToast('Restaurando v1.0...')}>Restaurar</button></td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </article>

                <article className="det__widget det__widget--w6">
                  <div className="det__widget-head"><span className="det__widget-titulo">Descripcion</span></div>
                  <div className="det__widget-body">
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: 'color-mix(in srgb, var(--color-claro) 78%, transparent)' }}>{recursoDetalle.desc}</p>
                    <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: `color-mix(in srgb, ${TIPO_META[recursoDetalle.tipo].color} 14%, transparent)`, color: TIPO_META[recursoDetalle.tipo].color, border: `1px solid color-mix(in srgb, ${TIPO_META[recursoDetalle.tipo].color} 30%, transparent)` }}>{recursoDetalle.etiqueta}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: 'color-mix(in srgb, var(--color-acento) 14%, transparent)', color: 'color-mix(in srgb, var(--color-claro) 70%, transparent)', border: '1px solid color-mix(in srgb, var(--color-acento) 30%, transparent)' }}>{TIPO_META[recursoDetalle.tipo].label}</span>
                    </div>
                  </div>
                </article>

                <article className="det__widget det__widget--w6">
                  <div className="det__widget-head"><span className="det__widget-titulo">Recursos relacionados</span></div>
                  <div className="det__widget-body">
                    {recursos.filter((x) => x.tipo === recursoDetalle.tipo && x.id !== recursoDetalle.id).slice(0, 3).map((x) => (
                      <div key={x.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid color-mix(in srgb, var(--color-acento) 18%, transparent)', cursor: 'pointer' }} onClick={() => setDetalleId(x.id)}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: `color-mix(in srgb, ${TIPO_META[x.tipo].color} 16%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: TIPO_META[x.tipo].color }}>{iconoTipo(x.tipo)}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{x.nombre}</div>
                          <div style={{ fontSize: 10, color: 'color-mix(in srgb, var(--color-claro) 42%, transparent)' }}>{x.fecha}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </section>
          )}
        </div>
      </div>

      <div className={`bib__overlay ${modalActiva === 'guardar' ? 'bib__overlay--visible' : ''}`} onClick={() => setModalActiva(null)}>
        <div className="bib__modal" onClick={(e) => e.stopPropagation()}>
          <h2 className="bib__modal-titulo">Guardar recurso</h2>
          <p className="bib__modal-sub">Agrega un elemento a tu biblioteca para reutilizarlo cuando quieras.</p>
          <div className="bib__campo">
            <label className="bib__campo-label">Nombre</label>
            <input className="bib__campo-input" value={nombreNuevo} onChange={(e) => setNombreNuevo(e.target.value)} placeholder="Ej: Dashboard Ventas Q2" />
          </div>
          <div className="bib__campo">
            <label className="bib__campo-label">Tipo</label>
            <select className="bib__campo-select" value={tipoNuevo} onChange={(e) => setTipoNuevo(e.target.value as TipoRecurso)}>
              <option value="dashboard">Dashboard</option><option value="kpi">KPI</option><option value="grafico">Grafico</option><option value="reporte">Reporte</option><option value="prompt">Prompt IA</option><option value="layout">Layout</option>
            </select>
          </div>
          <div className="bib__campo">
            <label className="bib__campo-label">Etiqueta</label>
            <select className="bib__campo-select" value={etiquetaNueva} onChange={(e) => setEtiquetaNueva(e.target.value)}>
              <option>Personal</option><option>Ventas</option><option>Finanzas</option><option>Marketing</option><option>Operaciones</option>
            </select>
          </div>
          <div className="bib__modal-footer">
            <button type="button" className="bib__btn bib__btn--ghost" onClick={() => setModalActiva(null)}>Cancelar</button>
            <button type="button" className="bib__btn bib__btn--primario" onClick={guardarRecurso}><IconoReporte />Guardar</button>
          </div>
        </div>
      </div>

      <div className={`bib__overlay ${modalActiva === 'exportar' ? 'bib__overlay--visible' : ''}`} onClick={() => setModalActiva(null)}>
        <div className="bib__modal" onClick={(e) => e.stopPropagation()}>
          <h2 className="bib__modal-titulo">Exportar recurso</h2>
          <p className="bib__modal-sub">Elegi el formato de exportacion.</p>
          <div className="bib__export-opts">
            {(['JSON', 'CSV', 'PDF', 'XLSX'] as FormatoExport[]).map((fmt) => (
              <button key={fmt} type="button" className={`bib__export-opt ${formatoExport === fmt ? 'bib__export-opt--sel' : ''}`} onClick={() => setFormatoExport(fmt)}><IconoReporte />{fmt}</button>
            ))}
          </div>
          <div className="bib__modal-footer">
            <button type="button" className="bib__btn bib__btn--ghost" onClick={() => setModalActiva(null)}>Cancelar</button>
            <button type="button" className="bib__btn bib__btn--primario" onClick={confirmarExport}><IconoUpload />Exportar</button>
          </div>
        </div>
      </div>

      <div className={`bib__overlay ${modalActiva === 'importar' ? 'bib__overlay--visible' : ''}`} onClick={() => setModalActiva(null)}>
        <div className="bib__modal" onClick={(e) => e.stopPropagation()}>
          <h2 className="bib__modal-titulo">Importar recurso</h2>
          <p className="bib__modal-sub">Subi un archivo JSON previamente exportado desde Metrify.</p>
          <div className="bib__import-drop" onClick={() => mostrarToast('Archivo seleccionado')}>
            <div className="bib__import-icon"><IconoUpload /></div>
            <p className="bib__import-titulo">Solta el archivo aca</p>
            <p className="bib__import-sub">o hace click · Solo .json</p>
          </div>
          <div className="bib__modal-footer">
            <button type="button" className="bib__btn bib__btn--ghost" onClick={() => setModalActiva(null)}>Cancelar</button>
            <button type="button" className="bib__btn bib__btn--primario" onClick={confirmarImport}>Importar</button>
          </div>
        </div>
      </div>

      <div className="bib__toasts">
        {toasts.map((toast) => <div key={toast.id} className="bib__toast">{toast.texto}</div>)}
      </div>
    </div>
  )
}
