import { useMemo, useRef, useState } from 'react'
import './plantillas.css'

type CategoriaPlantilla = 'todos' | 'ecommerce' | 'ventas' | 'callcenter' | 'crm' | 'finanzas' | 'rrhh' | 'marketing'
type PasoOnboarding = 1 | 2 | 3

type Plantilla = {
  id: number
  cat: Exclude<CategoriaPlantilla, 'todos'>
  nombre: string
  desc: string
  usos: string
  tiempo: string
  formatos: string[]
  widgets: number
  kpis: number
  graficos: number
  includes: string[]
  color: string
  badge: string
  badgeColor: string
  bars: number[]
}

type ToastItem = { id: number; texto: string }

type ArchivoSeleccionado = { nombre: string; sizeKb: number }

const templates: Plantilla[] = [
  { id: 0, cat: 'ecommerce', nombre: 'E-commerce Analytics Pro', desc: 'Ventas, conversion, abandono de carrito y productos top. El mas completo para tiendas online.', usos: '2.4K', tiempo: '30 seg', formatos: ['CSV', 'XLSX', 'JSON'], widgets: 14, kpis: 8, graficos: 6, includes: ['Ventas diarias', 'Tasa de conversion', 'Carrito abandonado', 'Top productos', 'Clientes nuevos', 'Canal de adquisicion'], color: '#6d5d8c', badge: 'Popular', badgeColor: '#6d5d8c', bars: [40, 55, 48, 70, 60, 82, 75, 90] },
  { id: 1, cat: 'ventas', nombre: 'Pipeline de Ventas', desc: 'Seguimiento de oportunidades, embudo de conversion, rendimiento por vendedor y forecast mensual.', usos: '1.8K', tiempo: '25 seg', formatos: ['CSV', 'XLSX'], widgets: 11, kpis: 6, graficos: 5, includes: ['Embudo de ventas', 'Forecast', 'Rendimiento equipo', 'Ciclo de venta', 'Oportunidades abiertas', 'Tasa de cierre'], color: '#f87171', badge: 'Nuevo', badgeColor: '#4ade80', bars: [30, 45, 55, 48, 65, 60, 78, 72] },
  { id: 2, cat: 'callcenter', nombre: 'Call Center Dashboard', desc: 'Volumen de llamadas, tiempos de atencion, CSAT, agentes en linea y resolucion en primer contacto.', usos: '980', tiempo: '20 seg', formatos: ['CSV', 'XLSX', 'TXT'], widgets: 9, kpis: 7, graficos: 4, includes: ['Llamadas por hora', 'Tiempo promedio', 'CSAT', 'Agentes activos', 'FCR', 'Abandonos'], color: '#fbbf24', badge: '', badgeColor: '', bars: [60, 70, 65, 80, 75, 88, 82, 78] },
  { id: 3, cat: 'crm', nombre: 'CRM y Clientes 360', desc: 'Vista completa del cliente: interacciones, valor de vida, segmentacion, churn y etapas del ciclo.', usos: '1.2K', tiempo: '35 seg', formatos: ['CSV', 'XLSX', 'JSON'], widgets: 13, kpis: 7, graficos: 6, includes: ['Segmentacion', 'LTV', 'Churn rate', 'Interacciones', 'NPS', 'Retencion'], color: '#60a5fa', badge: '', badgeColor: '', bars: [50, 58, 62, 70, 68, 75, 80, 85] },
  { id: 4, cat: 'finanzas', nombre: 'Finanzas Ejecutivas', desc: 'P&L, flujo de caja, margenes, EBITDA, comparativa presupuestal y alertas automaticas.', usos: '1.5K', tiempo: '40 seg', formatos: ['XLSX', 'CSV'], widgets: 15, kpis: 9, graficos: 7, includes: ['P&L mensual', 'Flujo de caja', 'EBITDA', 'Margenes', 'Presupuesto vs real', 'Alertas'], color: '#4ade80', badge: 'Premium', badgeColor: '#fbbf24', bars: [45, 50, 55, 48, 62, 58, 70, 75] },
  { id: 5, cat: 'rrhh', nombre: 'RRHH y Personas', desc: 'Headcount, ausentismo, rotacion, desempeno, satisfaccion y costos de nomina por area.', usos: '760', tiempo: '30 seg', formatos: ['CSV', 'XLSX'], widgets: 10, kpis: 6, graficos: 5, includes: ['Headcount', 'Rotacion', 'Ausentismo', 'Desempeno', 'Nomina', 'Capacitacion'], color: '#f87171', badge: '', badgeColor: '', bars: [55, 60, 58, 65, 62, 70, 68, 72] },
  { id: 6, cat: 'marketing', nombre: 'Marketing 360', desc: 'ROI por canal, CAC, leads por fuente, conversion de campanas y metricas de redes sociales.', usos: '1.1K', tiempo: '28 seg', formatos: ['CSV', 'XLSX', 'JSON'], widgets: 12, kpis: 8, graficos: 6, includes: ['ROI por canal', 'CAC', 'Leads', 'Campanas', 'Redes sociales', 'Conversion'], color: '#fbbf24', badge: '', badgeColor: '', bars: [35, 50, 45, 60, 55, 68, 72, 80] },
]

const pasosProcesando = [
  'Leyendo y validando archivo',
  'Detectando columnas y tipos de datos',
  'Mapeando datos al template',
  'Generando widgets y graficos',
  'Aplicando resumen IA automatico',
]

function IconoBuscar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
}
function IconoFlecha() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
}
function IconoVolver() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
}
function IconoUpload() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
}
function IconoArchivo() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
}
function IconoCerrar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
}
function IconoCheck() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
}
function IconoUsuarios() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
}
function IconoTiempo() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
}
function IconoGrid() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
}
function IconoTienda() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
}
function IconoVentas() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
}
function IconoCall() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.4 19.79 19.79 0 0 1 1.61 4.82 2 2 0 0 1 3.6 2.62h3a2 2 0 0 1 2 1.72" /></svg>
}
function IconoCrm() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
}
function IconoFinanzas() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
}
function IconoRrhh() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
}
function IconoMarketing() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
}

function iconoCat(cat: CategoriaPlantilla) {
  if (cat === 'todos') return <IconoGrid />
  if (cat === 'ecommerce') return <IconoTienda />
  if (cat === 'ventas') return <IconoVentas />
  if (cat === 'callcenter') return <IconoCall />
  if (cat === 'crm') return <IconoCrm />
  if (cat === 'finanzas') return <IconoFinanzas />
  if (cat === 'rrhh') return <IconoRrhh />
  return <IconoMarketing />
}

function labelCat(cat: CategoriaPlantilla) {
  if (cat === 'ecommerce') return 'E-commerce'
  if (cat === 'callcenter') return 'Call Center'
  if (cat === 'rrhh') return 'RRHH'
  if (cat === 'crm') return 'CRM'
  if (cat === 'todos') return 'Todos'
  return cat.charAt(0).toUpperCase() + cat.slice(1)
}

export function PlantillasVista() {
  const [catActual, setCatActual] = useState<CategoriaPlantilla>('todos')
  const [busqueda, setBusqueda] = useState('')
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [enOnboarding, setEnOnboarding] = useState(false)
  const [templateElegido, setTemplateElegido] = useState<Plantilla | null>(null)
  const [pasoActual, setPasoActual] = useState<PasoOnboarding>(1)
  const [archivoSel, setArchivoSel] = useState<ArchivoSeleccionado | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [estadoProceso, setEstadoProceso] = useState<Array<'pendiente' | 'activo' | 'done'>>(['activo', 'pendiente', 'pendiente', 'pendiente', 'pendiente'])
  const [listo, setListo] = useState(false)

  const fileRef = useRef<HTMLInputElement>(null)
  const timersRef = useRef<number[]>([])

  const listaFiltrada = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    const base = catActual === 'todos' ? templates : templates.filter((item) => item.cat === catActual)
    if (!q) return base
    return base.filter((item) => item.nombre.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q))
  }, [busqueda, catActual])

  function mostrarToast(texto: string) {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, texto }])
    window.setTimeout(() => setToasts((prev) => prev.filter((item) => item.id !== id)), 3500)
  }

  function iniciarOnboarding(id: number) {
    const tpl = templates.find((item) => item.id === id)
    if (!tpl) return
    setTemplateElegido(tpl)
    setPasoActual(1)
    setArchivoSel(null)
    setDragOver(false)
    setEstadoProceso(['activo', 'pendiente', 'pendiente', 'pendiente', 'pendiente'])
    setListo(false)
    setEnOnboarding(true)
  }

  function volverCatalogo() {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
    setEnOnboarding(false)
    setTemplateElegido(null)
    setPasoActual(1)
    setArchivoSel(null)
    setListo(false)
    setEstadoProceso(['activo', 'pendiente', 'pendiente', 'pendiente', 'pendiente'])
  }

  function seleccionarArchivo(file?: File | null) {
    if (!file) return
    setArchivoSel({ nombre: file.name, sizeKb: file.size / 1024 })
  }

  function quitarArchivo() {
    setArchivoSel(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  function irPaso(nuevoPaso: PasoOnboarding) {
    setPasoActual(nuevoPaso)
  }

  function iniciarGeneracion() {
    setPasoActual(3)
    setListo(false)
    setEstadoProceso(['activo', 'pendiente', 'pendiente', 'pendiente', 'pendiente'])

    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []

    const tiempos = [700, 1300, 1000, 1200, 900]
    let acumulado = 0

    tiempos.forEach((ms, index) => {
      acumulado += ms
      const timer = window.setTimeout(() => {
        setEstadoProceso((prev) => prev.map((_estado, i) => {
          if (i < index + 1) return 'done'
          if (i === index + 1) return 'activo'
          return 'pendiente'
        }))
      }, acumulado)
      timersRef.current.push(timer)
    })

    const finTimer = window.setTimeout(() => {
      setEstadoProceso(['done', 'done', 'done', 'done', 'done'])
      setListo(true)
      if (templateElegido) {
        mostrarToast(`Dashboard "${templateElegido.nombre}" creado con exito`)
      }
    }, acumulado + 400)
    timersRef.current.push(finTimer)
  }

  if (!templateElegido) {
    // no-op
  }

  return (
    <div className="plantillas">
      <header className="plantillas__topbar">
        <div>
          <div className="plantillas__eyebrow"><span className="plantillas__dot" />Templates</div>
          <h1 className="plantillas__titulo">Plantillas <span>listas</span> para usar</h1>
          <p className="plantillas__subtitulo">Elegi, subi tu archivo y Metrify arma todo. Sin configurar nada.</p>
        </div>
      </header>

      {!enOnboarding && (
        <>
          <div className="plantillas__search-wrap">
            <div className="plantillas__search">
              <span className="plantillas__search-icon"><IconoBuscar /></span>
              <input className="plantillas__input" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar templates..." />
            </div>
          </div>

          <div className="plantillas__cats">
            {(['todos', 'ecommerce', 'ventas', 'callcenter', 'crm', 'finanzas', 'rrhh', 'marketing'] as CategoriaPlantilla[]).map((cat) => {
              const count = cat === 'todos' ? templates.length : templates.filter((item) => item.cat === cat).length
              return (
                <button key={cat} type="button" className={`plantillas__cat ${catActual === cat ? 'plantillas__cat--activa' : ''}`} onClick={() => setCatActual(cat)}>
                  {iconoCat(cat)}
                  {labelCat(cat)}
                  {cat === 'todos' && <span className="plantillas__cat-count">{count}</span>}
                </button>
              )
            })}
          </div>

          <section className="plantillas__featured">
            <div className="plantillas__featured-icon"><IconoTienda /></div>
            <div className="plantillas__featured-body">
              <div className="plantillas__featured-label">Mas usado esta semana</div>
              <h2 className="plantillas__featured-titulo">E-commerce Analytics Pro</h2>
              <p className="plantillas__featured-desc">Dashboard completo con ventas, conversion, abandono de carrito, productos top y evolucion de ingresos. Listo en 30 segundos.</p>
              <div className="plantillas__featured-tags">
                <span className="plantillas__tag">Ventas</span>
                <span className="plantillas__tag">Conversion</span>
                <span className="plantillas__tag">Productos</span>
                <span className="plantillas__tag">Retencion</span>
                <span className="plantillas__tag">CSV / XLSX</span>
              </div>
            </div>
            <div className="plantillas__featured-acciones">
              <button type="button" className="plantillas__btn plantillas__btn--primario" onClick={() => iniciarOnboarding(0)}>
                <IconoFlecha />
                Usar ahora
              </button>
              <span className="plantillas__featured-meta">2.4K usos · Actualizado hace 3 dias</span>
            </div>
          </section>

          <section className="plantillas__grid">
            {listaFiltrada.map((t, i) => (
              <article key={t.id} className="plantillas__card" style={{ animationDelay: `${i * 0.07}s` }} onClick={() => iniciarOnboarding(t.id)}>
                <div className="plantillas__preview">
                  <div className="plantillas__mini-dash">
                    <div className="plantillas__mini-widget plantillas__mini-widget--wide">
                      <div className="plantillas__mini-num">{t.kpis} KPIs</div>
                      <span className="plantillas__mini-line plantillas__mini-line--accent plantillas__mini-line--s" />
                      <span className="plantillas__mini-line plantillas__mini-line--l" />
                    </div>
                    <div className="plantillas__mini-widget">
                      <span className="plantillas__mini-line plantillas__mini-line--accent plantillas__mini-line--m" />
                      <span className="plantillas__mini-line plantillas__mini-line--s" />
                    </div>
                    <div className="plantillas__mini-widget plantillas__mini-widget--wide">
                      <div className="plantillas__mini-bars">
                        {t.bars.map((h, idx) => <span key={`${t.id}-${h}-${idx}`} className={`plantillas__mini-bar ${idx === t.bars.length - 1 ? 'plantillas__mini-bar--high' : ''}`} style={{ height: `${h}%` }} />)}
                      </div>
                    </div>
                    <div className="plantillas__mini-widget">
                      <span className="plantillas__mini-line plantillas__mini-line--l" />
                      <span className="plantillas__mini-line plantillas__mini-line--s" />
                      <span className="plantillas__mini-line plantillas__mini-line--m" />
                    </div>
                  </div>
                  {t.badge && <span className="plantillas__badge" style={{ background: `color-mix(in srgb, ${t.badgeColor} 15%, transparent)`, color: t.badgeColor, border: `1px solid color-mix(in srgb, ${t.badgeColor} 40%, transparent)` }}>{t.badge}</span>}
                  <span className="plantillas__tipo-icon" style={{ background: `color-mix(in srgb, ${t.color} 20%, transparent)`, color: t.color }}>{iconoCat(t.cat)}</span>
                </div>

                <div className="plantillas__card-body">
                  <div className="plantillas__cat-pill" style={{ color: t.color }}>
                    {iconoCat(t.cat)}
                    {labelCat(t.cat)}
                  </div>
                  <h3 className="plantillas__nombre">{t.nombre}</h3>
                  <p className="plantillas__desc">{t.desc}</p>
                  <div className="plantillas__footer">
                    <div className="plantillas__stats">
                      <span className="plantillas__stat"><IconoUsuarios />{t.usos}</span>
                      <span className="plantillas__stat"><IconoTiempo />{t.tiempo}</span>
                    </div>
                    <button type="button" className="plantillas__usar" onClick={(e) => { e.stopPropagation(); iniciarOnboarding(t.id) }}>
                      Usar
                      <IconoFlecha />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </>
      )}

      {enOnboarding && templateElegido && (
        <section className="plantillas__onboarding plantillas__onboarding--visible">
          <div className="plantillas__ob-topbar">
            <button type="button" className="plantillas__btn plantillas__btn--ghost" onClick={volverCatalogo}><IconoVolver />Templates</button>
            <div>
              <h2 className="plantillas__ob-titulo">{templateElegido.nombre}</h2>
              <p className="plantillas__ob-meta">Categoria: {labelCat(templateElegido.cat)} · {templateElegido.widgets} widgets · {templateElegido.tiempo} para armar</p>
            </div>
          </div>

          <div className="plantillas__pasos">
            <div className={`plantillas__paso ${pasoActual === 1 ? 'plantillas__paso--activo' : pasoActual > 1 ? 'plantillas__paso--done' : ''}`}>
              <div className="plantillas__paso-num">{pasoActual > 1 ? '✓' : '1'}</div>
              <span className="plantillas__paso-label">Elegi template</span>
            </div>
            <div className={`plantillas__paso-linea ${pasoActual > 1 ? 'plantillas__paso-linea--done' : ''}`} />
            <div className={`plantillas__paso ${pasoActual === 2 ? 'plantillas__paso--activo' : pasoActual > 2 ? 'plantillas__paso--done' : ''}`}>
              <div className="plantillas__paso-num">{pasoActual > 2 ? '✓' : '2'}</div>
              <span className="plantillas__paso-label">Subi archivo</span>
            </div>
            <div className={`plantillas__paso-linea ${pasoActual > 2 ? 'plantillas__paso-linea--done' : ''}`} />
            <div className={`plantillas__paso ${pasoActual === 3 ? 'plantillas__paso--activo' : ''}`}>
              <div className="plantillas__paso-num">3</div>
              <span className="plantillas__paso-label">Listo</span>
            </div>
          </div>

          <div className={`plantillas__step ${pasoActual === 1 ? 'plantillas__step--visible' : ''}`}>
            <div className="plantillas__elegido">
              <div className="plantillas__elegido-icon" style={{ background: `color-mix(in srgb, ${templateElegido.color} 80%, #1a1a2e)` }}>{iconoCat(templateElegido.cat)}</div>
              <div className="plantillas__elegido-info">
                <h3 className="plantillas__elegido-titulo">{templateElegido.nombre}</h3>
                <p className="plantillas__elegido-desc">{templateElegido.desc}</p>
                <div className="plantillas__includes">{templateElegido.includes.map((inc) => <span key={inc} className="plantillas__include">{inc}</span>)}</div>
              </div>
            </div>

            <div className="plantillas__resumen">
              <div className="plantillas__resumen-item"><div className="plantillas__resumen-num">{templateElegido.widgets}</div><div className="plantillas__resumen-label">Widgets</div></div>
              <div className="plantillas__resumen-item"><div className="plantillas__resumen-num">{templateElegido.kpis}</div><div className="plantillas__resumen-label">KPIs</div></div>
              <div className="plantillas__resumen-item"><div className="plantillas__resumen-num">{templateElegido.graficos}</div><div className="plantillas__resumen-label">Graficos</div></div>
            </div>

            <div className="plantillas__pie">
              <button type="button" className="plantillas__btn plantillas__btn--ghost" onClick={volverCatalogo}>Cancelar</button>
              <button type="button" className="plantillas__btn plantillas__btn--primario" onClick={() => irPaso(2)}>
                Continuar
                <IconoFlecha />
              </button>
            </div>
          </div>

          <div className={`plantillas__step ${pasoActual === 2 ? 'plantillas__step--visible' : ''}`}>
            <div
              className={`plantillas__upload ${dragOver ? 'plantillas__upload--drag' : ''}`}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragOver(false)
                seleccionarArchivo(e.dataTransfer.files?.[0])
              }}
            >
              <div className="plantillas__upload-icon"><IconoUpload /></div>
              <h3 className="plantillas__upload-titulo">Solta tu archivo aca</h3>
              <p className="plantillas__upload-sub">o hace click para seleccionarlo desde tu computadora.<br />Metrify detecta automaticamente las columnas.</p>
              <div className="plantillas__upload-formatos">
                {templateElegido.formatos.map((f) => <span key={f} className="plantillas__fmt">.{f.toLowerCase()}</span>)}
              </div>
              <input
                ref={fileRef}
                type="file"
                style={{ display: 'none' }}
                accept=".csv,.xlsx,.xls,.json,.txt"
                onChange={(e) => seleccionarArchivo(e.target.files?.[0])}
              />
            </div>

            <div className={`plantillas__archivo ${archivoSel ? 'plantillas__archivo--visible' : ''}`}>
              <div className="plantillas__archivo-icono"><IconoArchivo /></div>
              <div>
                <div className="plantillas__archivo-nombre">{archivoSel?.nombre}</div>
                <div className="plantillas__archivo-size">{archivoSel ? (archivoSel.sizeKb < 1024 ? `${archivoSel.sizeKb.toFixed(1)} KB` : `${(archivoSel.sizeKb / 1024).toFixed(2)} MB`) : ''}</div>
              </div>
              <button type="button" className="plantillas__archivo-quitar" onClick={quitarArchivo}><IconoCerrar /></button>
            </div>

            <div className="plantillas__pie">
              <button type="button" className="plantillas__btn plantillas__btn--ghost" onClick={() => irPaso(1)}><IconoVolver />Atras</button>
              <button type="button" className="plantillas__btn plantillas__btn--primario" onClick={iniciarGeneracion} style={!archivoSel ? { opacity: 0.5, pointerEvents: 'none' } : undefined}>
                <IconoArchivo />
                Generar dashboard
              </button>
            </div>
          </div>

          <div className={`plantillas__step ${pasoActual === 3 ? 'plantillas__step--visible' : ''}`}>
            {!listo && (
              <div className="plantillas__procesando">
                <div className="plantillas__spinner" />
                <h3 className="plantillas__proc-titulo">Armando tu dashboard...</h3>
                <p className="plantillas__proc-sub">Metrify esta analizando tu archivo y configurando todo automaticamente.</p>
                <div className="plantillas__proc-lista">
                  {pasosProcesando.map((texto, idx) => (
                    <div key={texto} className={`plantillas__proc-item ${estadoProceso[idx] === 'activo' ? 'plantillas__proc-item--activo' : ''} ${estadoProceso[idx] === 'done' ? 'plantillas__proc-item--done' : ''}`}>
                      <span className="plantillas__proc-dot" />
                      {texto}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {listo && (
              <div className="plantillas__listo">
                <div className="plantillas__listo-check"><IconoCheck /></div>
                <h2 className="plantillas__listo-titulo">Tu dashboard esta listo</h2>
                <p className="plantillas__listo-sub">Metrify armo <strong>{templateElegido.widgets} widgets</strong> con tus datos.<br />Todo configurado automaticamente.</p>

                <div className="plantillas__listo-stats">
                  <div className="plantillas__listo-stat" style={{ animationDelay: '.05s' }}><div className="plantillas__listo-num">{templateElegido.widgets}</div><div className="plantillas__listo-label">Widgets</div></div>
                  <div className="plantillas__listo-stat" style={{ animationDelay: '.1s' }}><div className="plantillas__listo-num">{templateElegido.kpis}</div><div className="plantillas__listo-label">KPIs</div></div>
                  <div className="plantillas__listo-stat" style={{ animationDelay: '.15s' }}><div className="plantillas__listo-num">{templateElegido.graficos}</div><div className="plantillas__listo-label">Graficos</div></div>
                </div>

                <div className="plantillas__acciones-final">
                  <button type="button" className="plantillas__btn plantillas__btn--ghost" onClick={volverCatalogo}><IconoVolver />Volver a templates</button>
                  <button type="button" className="plantillas__btn plantillas__btn--primario" onClick={() => { mostrarToast('Abriendo dashboard...'); window.setTimeout(volverCatalogo, 1200) }}><IconoFlecha />Abrir dashboard</button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="plantillas__toasts">
        {toasts.map((toast) => <div key={toast.id} className="plantillas__toast">{toast.texto}</div>)}
      </div>
    </div>
  )
}
