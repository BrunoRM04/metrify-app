import { useMemo, useState } from 'react'
import './reportes.css'

type TipoReporte = 'ejecutivo' | 'financiero' | 'ventas' | 'marketing' | 'rendimiento'
type TabReporte = 'todos' | TipoReporte

type Reporte = {
  id: number
  tipo: TipoReporte
  nombre: string
  desc: string
  fecha: string
  estado: 'listo' | 'generando'
  badge: string
  badgeTipo: '' | 'nuevo' | 'ia'
  ia: boolean
  periodo: string
  paginas: number
}

type ToastItem = { id: number; texto: string }

const reportesIniciales: Reporte[] = [
  { id: 1, tipo: 'ejecutivo', nombre: 'Reporte Ejecutivo Q1 2025', desc: 'Resumen estrategico de desempeno organizacional, KPIs clave y proyecciones del primer trimestre.', fecha: 'Hace 2 dias', estado: 'listo', badge: 'Nuevo', badgeTipo: 'nuevo', ia: true, periodo: 'Q1 2025', paginas: 12 },
  { id: 2, tipo: 'financiero', nombre: 'Balance Financiero Mayo 2025', desc: 'Estado de resultados, flujo de caja, comparativas mensuales y analisis de margenes.', fecha: 'Hace 5 dias', estado: 'listo', badge: 'IA', badgeTipo: 'ia', ia: true, periodo: 'Mayo 2025', paginas: 18 },
  { id: 3, tipo: 'ventas', nombre: 'Ventas por Canal - Semestre 1', desc: 'Desglose de ingresos por canal, producto y region con comparativa al semestre anterior.', fecha: 'Hace 1 semana', estado: 'listo', badge: 'PDF', badgeTipo: '', ia: false, periodo: 'S1 2025', paginas: 9 },
  { id: 4, tipo: 'marketing', nombre: 'Campana Digital Abril-Mayo', desc: 'ROI por campana, alcance en redes, conversiones y costo por adquisicion acumulado.', fecha: 'Hace 9 dias', estado: 'listo', badge: 'IA', badgeTipo: 'ia', ia: true, periodo: 'Abr-May 2025', paginas: 14 },
  { id: 5, tipo: 'rendimiento', nombre: 'Performance Equipo TI - Mayo', desc: 'Velocidad de entrega, incidencias, uptime de sistemas y metricas de ciclo de desarrollo.', fecha: 'Ayer', estado: 'listo', badge: 'Nuevo', badgeTipo: 'nuevo', ia: true, periodo: 'Mayo 2025', paginas: 11 },
  { id: 6, tipo: 'ejecutivo', nombre: 'Reporte Ejecutivo Q4 2024', desc: 'Cierre anual con resultados consolidados, logros estrategicos y objetivos para 2025.', fecha: 'Hace 3 meses', estado: 'listo', badge: 'Historico', badgeTipo: '', ia: false, periodo: 'Q4 2024', paginas: 22 },
]

const colorTipo: Record<TipoReporte, string> = {
  ejecutivo: '#6d5d8c',
  financiero: '#4ade80',
  ventas: '#f87171',
  marketing: '#fbbf24',
  rendimiento: '#60a5fa',
}

function IconoCuadricula() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
}
function IconoEjecutivo() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
}
function IconoFinanciero() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
}
function IconoVentas() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
}
function IconoMarketing() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
}
function IconoRendimiento() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></svg>
}
function IconoCalendario() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
}
function IconoDescargar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
}
function IconoImagen() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
}
function IconoVolver() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
}
function IconoProgramar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
}
function IconoMas() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
}
function IconoIa() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 8v4l3 3" /><circle cx="18" cy="5" r="3" /></svg>
}
function IconoLinea() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></svg>
}
function IconoSube() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15" /></svg>
}
function IconoBaja() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
}
function IconoEstable() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
}

function iconoTipo(tipo: TipoReporte) {
  if (tipo === 'ejecutivo') return <IconoEjecutivo />
  if (tipo === 'financiero') return <IconoFinanciero />
  if (tipo === 'ventas') return <IconoVentas />
  if (tipo === 'marketing') return <IconoMarketing />
  return <IconoRendimiento />
}

export function ReportesVista() {
  const [tabActual, setTabActual] = useState<TabReporte>('todos')
  const [chipsPeriodo, setChipsPeriodo] = useState<string[]>(['Este mes'])
  const [chipsEstado, setChipsEstado] = useState<string[]>(['Todos'])
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [reporteDetalle, setReporteDetalle] = useState<Reporte | null>(null)

  const reportesVisibles = useMemo(() => {
    return tabActual === 'todos' ? reportesIniciales : reportesIniciales.filter((item) => item.tipo === tabActual)
  }, [tabActual])

  function mostrarToast(texto: string) {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, texto }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id))
    }, 3200)
  }

  function toggleChip(grupo: 'periodo' | 'estado', valor: string) {
    const setter = grupo === 'periodo' ? setChipsPeriodo : setChipsEstado
    setter((prev) => (prev.includes(valor) ? prev.filter((item) => item !== valor) : [...prev, valor]))
  }

  function renderCardReporte(reporte: Reporte, index: number) {
    const color = colorTipo[reporte.tipo]
    return (
      <article key={reporte.id} className="reportes__card" style={{ animationDelay: `${index * 0.06}s` }} onClick={() => setReporteDetalle(reporte)}>
        <div className="reportes__preview">
          <div className="reportes__preview-doc reportes__preview-doc--back">
            <span className="reportes__preview-line reportes__preview-line--larga" />
            <span className="reportes__preview-line reportes__preview-line--corta" />
            <span className="reportes__preview-line reportes__preview-line--larga" />
          </div>
          <div className="reportes__preview-doc">
            <span className="reportes__preview-line reportes__preview-line--destacada" />
            <span className="reportes__preview-line reportes__preview-line--larga" />
            <span className="reportes__preview-line reportes__preview-line--corta" />
            <span className="reportes__preview-line reportes__preview-line--larga" />
            <span className="reportes__preview-line reportes__preview-line--corta" />
          </div>
          {reporte.badge && <span className={`reportes__card-badge reportes__card-badge--${reporte.badgeTipo}`}>{reporte.badge}</span>}
          <span className="reportes__tipo-icon" style={{ background: `color-mix(in srgb, ${color} 20%, transparent)`, color }}>
            {iconoTipo(reporte.tipo)}
          </span>
        </div>
        <div className="reportes__card-body">
          <h3 className="reportes__card-nombre">{reporte.nombre}</h3>
          <p className="reportes__card-desc">{reporte.desc}</p>
          <div className="reportes__card-pie">
            <span className="reportes__meta"><IconoCalendario />{reporte.fecha} · {reporte.paginas} pag.</span>
            <div onClick={(event) => event.stopPropagation()}>
              <button type="button" className="reportes__btn-icono" title="Exportar PDF" onClick={() => mostrarToast('PDF exportado')}><IconoDescargar /></button>
              <button type="button" className="reportes__btn-icono" title="Exportar imagen" onClick={() => mostrarToast('Imagen exportada')}><IconoImagen /></button>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <div className="reportes">
      <header className="reportes__topbar">
        <div>
          <div className="reportes__eyebrow">
            <span className="reportes__dot" />
            Reportes
          </div>
          <h1 className="reportes__titulo">Centro de <span>Reportes</span></h1>
          <p className="reportes__subtitulo">Documentos listos para presentar. Generacion automatica con resumen IA.</p>
        </div>
        <div className="reportes__acciones">
          <button type="button" className="reportes__btn reportes__btn--ghost" onClick={() => setModalAbierto(true)}>
            <IconoProgramar />
            Programar
          </button>
          <button type="button" className="reportes__btn reportes__btn--primario" onClick={() => setModalAbierto(true)}>
            <IconoMas />
            Nuevo Reporte
          </button>
        </div>
      </header>

      {!reporteDetalle && (
        <>
          <section className="reportes__stats">
            <article className="reportes__stat" style={{ animationDelay: '.05s' }}>
              <p className="reportes__stat-label">Total generados</p>
              <p className="reportes__stat-valor">148</p>
              <p className="reportes__stat-delta reportes__stat-delta--verde"><IconoSube />+12 este mes</p>
            </article>
            <article className="reportes__stat" style={{ animationDelay: '.1s' }}>
              <p className="reportes__stat-label">Exportados PDF</p>
              <p className="reportes__stat-valor">87</p>
              <p className="reportes__stat-delta reportes__stat-delta--verde"><IconoSube />+5 hoy</p>
            </article>
            <article className="reportes__stat" style={{ animationDelay: '.15s' }}>
              <p className="reportes__stat-label">Con resumen IA</p>
              <p className="reportes__stat-valor">63</p>
              <p className="reportes__stat-delta reportes__stat-delta--amarillo"><IconoEstable />Sin cambios</p>
            </article>
            <article className="reportes__stat" style={{ animationDelay: '.2s' }}>
              <p className="reportes__stat-label">Pendientes</p>
              <p className="reportes__stat-valor">4</p>
              <p className="reportes__stat-delta reportes__stat-delta--rojo"><IconoBaja />+2 nuevos</p>
            </article>
          </section>

          <section className="reportes__tabs">
            <button type="button" className={`reportes__tab ${tabActual === 'todos' ? 'reportes__tab--activa' : ''}`} onClick={() => setTabActual('todos')}><IconoCuadricula />Todos</button>
            <button type="button" className={`reportes__tab ${tabActual === 'ejecutivo' ? 'reportes__tab--activa' : ''}`} onClick={() => setTabActual('ejecutivo')}><IconoEjecutivo />Ejecutivo</button>
            <button type="button" className={`reportes__tab ${tabActual === 'financiero' ? 'reportes__tab--activa' : ''}`} onClick={() => setTabActual('financiero')}><IconoFinanciero />Financiero</button>
            <button type="button" className={`reportes__tab ${tabActual === 'ventas' ? 'reportes__tab--activa' : ''}`} onClick={() => setTabActual('ventas')}><IconoVentas />Ventas</button>
            <button type="button" className={`reportes__tab ${tabActual === 'marketing' ? 'reportes__tab--activa' : ''}`} onClick={() => setTabActual('marketing')}><IconoMarketing />Marketing</button>
            <button type="button" className={`reportes__tab ${tabActual === 'rendimiento' ? 'reportes__tab--activa' : ''}`} onClick={() => setTabActual('rendimiento')}><IconoRendimiento />Rendimiento</button>
          </section>

          <section className="reportes__filtros">
            <span className="reportes__filtros-label">Periodo</span>
            {['Este mes', 'Trimestre', 'Semestre', 'Anual'].map((item) => (
              <button key={item} type="button" className={`reportes__chip ${chipsPeriodo.includes(item) ? 'reportes__chip--activo' : ''}`} onClick={() => toggleChip('periodo', item)}>{item}</button>
            ))}
            <span className="reportes__filtros-sep" />
            <span className="reportes__filtros-label">Estado</span>
            {['Todos', 'Listos', 'Generando'].map((item) => (
              <button key={item} type="button" className={`reportes__chip ${chipsEstado.includes(item) ? 'reportes__chip--activo' : ''}`} onClick={() => toggleChip('estado', item)}>{item}</button>
            ))}
          </section>

          <section className="reportes__grid">
            {reportesVisibles.map(renderCardReporte)}
          </section>
        </>
      )}

      {reporteDetalle && (
        <section className="reportes__detalle reportes__detalle--visible">
          <div className="reportes__detalle-topbar">
            <button type="button" className="reportes__btn reportes__btn--ghost" onClick={() => setReporteDetalle(null)}><IconoVolver />Volver</button>
            <div>
              <h2 className="reportes__detalle-titulo">{reporteDetalle.nombre}</h2>
              <p className="reportes__detalle-meta">{reporteDetalle.tipo.charAt(0).toUpperCase() + reporteDetalle.tipo.slice(1)} · {reporteDetalle.periodo} · {reporteDetalle.paginas} paginas</p>
            </div>
            <div className="reportes__detalle-tools">
              <button type="button" className="reportes__btn reportes__btn--ghost" onClick={() => mostrarToast('Comparativa generada')}><IconoLinea />Comparativa</button>
              <button type="button" className="reportes__btn reportes__btn--secundario" onClick={() => mostrarToast('Imagen exportada')}><IconoImagen />Imagen</button>
              <button type="button" className="reportes__btn reportes__btn--primario" onClick={() => mostrarToast('PDF descargado')}><IconoDescargar />Exportar PDF</button>
            </div>
          </div>

          {reporteDetalle.ia && (
            <article className="reportes__ia">
              <div className="reportes__ia-head">
                <div className="reportes__ia-icono"><IconoIa /></div>
                <div>
                  <div className="reportes__ia-titulo">Resumen IA Automatico</div>
                  <div className="reportes__ia-sub">Generado por analisis de datos · {reporteDetalle.fecha}</div>
                </div>
              </div>
              <p className="reportes__ia-texto">El periodo analizado muestra una tendencia positiva en los indicadores principales con un desempeno por encima del promedio historico. Se identificaron oportunidades de mejora en tres areas clave.</p>
              <ul className="reportes__ia-lista">
                <li>Los ingresos crecieron un 14% respecto al periodo anterior, superando la proyeccion inicial del 9%.</li>
                <li>El indice de retencion de clientes se mantuvo estable en 87%, con mejora en el segmento enterprise.</li>
                <li>Se detectaron anomalias menores en los costos operativos del area de logistica que requieren atencion.</li>
              </ul>
            </article>
          )}

          <div className="reportes__detalle-grid">
            <article className="reportes__widget reportes__widget--w3">
              <div className="reportes__widget-head"><span className="reportes__widget-titulo">Ingresos</span></div>
              <div className="reportes__widget-body">
                <p className="reportes__kpi-valor">$2.4M</p>
                <p className="reportes__kpi-delta reportes__kpi-delta--verde"><IconoSube />+14% vs anterior</p>
                <div className="reportes__mini-chart">{[40, 55, 48, 62, 58, 70, 65, 80, 72, 88, 82, 95].map((h, i, a) => <span key={h + i} className={`reportes__mini-bar ${i === a.length - 1 ? 'reportes__mini-bar--destacada' : ''}`} style={{ height: `${h}%` }} />)}</div>
              </div>
            </article>

            <article className="reportes__widget reportes__widget--w3">
              <div className="reportes__widget-head"><span className="reportes__widget-titulo">Clientes</span></div>
              <div className="reportes__widget-body">
                <p className="reportes__kpi-valor">1,284</p>
                <p className="reportes__kpi-delta reportes__kpi-delta--verde"><IconoSube />+87 nuevos</p>
                <div className="reportes__mini-chart">{[55, 60, 58, 65, 70, 68, 75, 72, 80, 78, 85, 90].map((h, i, a) => <span key={h + i} className={`reportes__mini-bar ${i === a.length - 1 ? 'reportes__mini-bar--destacada' : ''}`} style={{ height: `${h}%` }} />)}</div>
              </div>
            </article>

            <article className="reportes__widget reportes__widget--w3">
              <div className="reportes__widget-head"><span className="reportes__widget-titulo">Retencion</span></div>
              <div className="reportes__widget-body">
                <p className="reportes__kpi-valor">87%</p>
                <p className="reportes__kpi-delta reportes__kpi-delta--amarillo"><IconoEstable />Estable</p>
                <div className="reportes__progreso"><div className="reportes__progreso-fill" style={{ width: '87%' }} /></div>
              </div>
            </article>

            <article className="reportes__widget reportes__widget--w3">
              <div className="reportes__widget-head"><span className="reportes__widget-titulo">NPS</span></div>
              <div className="reportes__widget-body">
                <p className="reportes__kpi-valor">72</p>
                <p className="reportes__kpi-delta reportes__kpi-delta--verde"><IconoSube />+5 puntos</p>
                <div className="reportes__progreso"><div className="reportes__progreso-fill" style={{ width: '72%' }} /></div>
              </div>
            </article>

            <article className="reportes__widget reportes__widget--w8">
              <div className="reportes__widget-head"><span className="reportes__widget-titulo">Evolucion mensual</span></div>
              <div className="reportes__widget-body">
                <svg className="reportes__svg" viewBox="0 0 420 120">
                  <defs>
                    <linearGradient id="reportes-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6d5d8c" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6d5d8c" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,90 L60,75 L120,80 L180,55 L240,60 L300,40 L360,30 L420,15" fill="none" stroke="#6d5d8c" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M0,90 L60,75 L120,80 L180,55 L240,60 L300,40 L360,30 L420,15 L420,120 L0,120 Z" fill="url(#reportes-grad)" />
                  <path d="M0,95 L60,85 L120,88 L180,75 L240,78 L300,65 L360,58 L420,50" fill="none" stroke="color-mix(in srgb,#6d5d8c 40%,transparent)" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" />
                  {[0, 60, 120, 180, 240, 300, 360, 420].map((x, idx) => <circle key={x} cx={x} cy={[90, 75, 80, 55, 60, 40, 30, 15][idx]} r="3" fill="#6d5d8c" />)}
                </svg>
                <div className="reportes__etiquetas-x"><span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span><span>Ago</span></div>
              </div>
            </article>

            <article className="reportes__widget reportes__widget--w4">
              <div className="reportes__widget-head"><span className="reportes__widget-titulo">Distribucion</span></div>
              <div className="reportes__widget-body">
                <div className="reportes__donut-wrap">
                  <svg viewBox="0 0 80 80" width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="40" cy="40" r="28" fill="none" stroke="color-mix(in srgb,#6d5d8c 20%,transparent)" strokeWidth="14" />
                    <circle cx="40" cy="40" r="28" fill="none" stroke="#6d5d8c" strokeWidth="14" strokeDasharray={`${0.42 * 176} 176`} />
                    <circle cx="40" cy="40" r="28" fill="none" stroke="#4ade80" strokeWidth="14" strokeDasharray={`${0.28 * 176} 176`} strokeDashoffset={-(0.42 * 176)} />
                    <circle cx="40" cy="40" r="28" fill="none" stroke="#fbbf24" strokeWidth="14" strokeDasharray={`${0.18 * 176} 176`} strokeDashoffset={-((0.42 + 0.28) * 176)} />
                    <circle cx="40" cy="40" r="28" fill="none" stroke="#60a5fa" strokeWidth="14" strokeDasharray={`${0.12 * 176} 176`} strokeDashoffset={-((0.42 + 0.28 + 0.18) * 176)} />
                  </svg>
                  <div className="reportes__donut-leyenda">
                    <span className="reportes__donut-item"><span className="reportes__donut-dot" style={{ background: '#6d5d8c' }} />Producto A 42%</span>
                    <span className="reportes__donut-item"><span className="reportes__donut-dot" style={{ background: '#4ade80' }} />Producto B 28%</span>
                    <span className="reportes__donut-item"><span className="reportes__donut-dot" style={{ background: '#fbbf24' }} />Producto C 18%</span>
                    <span className="reportes__donut-item"><span className="reportes__donut-dot" style={{ background: '#60a5fa' }} />Otros 12%</span>
                  </div>
                </div>
              </div>
            </article>

            <article className="reportes__widget reportes__widget--w12">
              <div className="reportes__widget-head"><span className="reportes__widget-titulo">Detalle por area</span></div>
              <div className="reportes__widget-body">
                <div className="reportes__tabla-wrap">
                  <table className="reportes__tabla">
                    <thead><tr><th>Area</th><th>Ingresos</th><th>Variacion</th><th>Meta</th><th>Estado</th></tr></thead>
                    <tbody>
                      <tr><td>Ventas Directas</td><td>$980K</td><td className="reportes__kpi-delta--verde">+18%</td><td>95%</td><td><span className="reportes__badge reportes__badge--verde">En meta</span></td></tr>
                      <tr><td>Canal Digital</td><td>$640K</td><td className="reportes__kpi-delta--verde">+22%</td><td>108%</td><td><span className="reportes__badge reportes__badge--verde">Superado</span></td></tr>
                      <tr><td>Distribuidores</td><td>$480K</td><td className="reportes__kpi-delta--amarillo">+4%</td><td>78%</td><td><span className="reportes__badge reportes__badge--amarillo">Revisar</span></td></tr>
                      <tr><td>Exportaciones</td><td>$300K</td><td className="reportes__kpi-delta--rojo">-6%</td><td>62%</td><td><span className="reportes__badge reportes__badge--rojo">Bajo meta</span></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            <article className="reportes__widget reportes__widget--w12">
              <div className="reportes__widget-head"><span className="reportes__widget-titulo">Historico de reportes similares</span></div>
              <div className="reportes__widget-body">
                <div className="reportes__tabla-wrap">
                  <table className="reportes__tabla">
                    <thead><tr><th>Periodo</th><th>Ingresos</th><th>Clientes</th><th>NPS</th><th>Acciones</th></tr></thead>
                    <tbody>
                      {[
                        ['Q4 2024', '$2.1M', '1,197', '67'],
                        ['Q3 2024', '$1.9M', '1,090', '65'],
                        ['Q2 2024', '$1.7M', '980', '61'],
                        ['Q1 2024', '$1.5M', '892', '58'],
                      ].map((fila) => (
                        <tr key={fila[0]}>
                          <td>{fila[0]}</td><td>{fila[1]}</td><td>{fila[2]}</td><td>{fila[3]}</td>
                          <td><button type="button" className="reportes__btn reportes__btn--ghost" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => mostrarToast('PDF descargado')}>PDF</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {modalAbierto && (
        <div className="reportes__overlay" onClick={() => setModalAbierto(false)}>
          <div className="reportes__modal" onClick={(event) => event.stopPropagation()}>
            <h2 className="reportes__modal-titulo">Nuevo Reporte</h2>
            <p className="reportes__modal-sub">Configura el tipo y periodo para la generacion automatica.</p>
            <div className="reportes__campo">
              <label className="reportes__campo-label" htmlFor="reporte-nombre">Nombre del reporte</label>
              <input id="reporte-nombre" className="reportes__campo-input" type="text" placeholder="Ej: Reporte Ejecutivo Q2 2025" />
            </div>
            <div className="reportes__campo">
              <label className="reportes__campo-label" htmlFor="reporte-tipo">Tipo</label>
              <select id="reporte-tipo" className="reportes__campo-select">
                <option>Ejecutivo</option>
                <option>Financiero</option>
                <option>Ventas</option>
                <option>Marketing</option>
                <option>Rendimiento</option>
              </select>
            </div>
            <div className="reportes__campo">
              <label className="reportes__campo-label" htmlFor="reporte-periodo">Periodo</label>
              <select id="reporte-periodo" className="reportes__campo-select">
                <option>Este mes</option>
                <option>Trimestre actual</option>
                <option>Semestre actual</option>
                <option>Ano actual</option>
                <option>Personalizado</option>
              </select>
            </div>
            <div className="reportes__campo">
              <label className="reportes__campo-label" htmlFor="reporte-ia">Incluir resumen IA</label>
              <select id="reporte-ia" className="reportes__campo-select">
                <option>Si, con analisis automatico</option>
                <option>No, solo datos</option>
              </select>
            </div>
            <div className="reportes__modal-footer">
              <button type="button" className="reportes__btn reportes__btn--ghost" onClick={() => setModalAbierto(false)}>Cancelar</button>
              <button type="button" className="reportes__btn reportes__btn--primario" onClick={() => { setModalAbierto(false); mostrarToast('Reporte en generacion - recibiras notificacion al terminar') }}>
                <IconoProgramar />
                Generar Reporte
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="reportes__toasts">
        {toasts.map((toast) => (
          <div key={toast.id} className="reportes__toast">{toast.texto}</div>
        ))}
      </div>
    </div>
  )
}
