import { useState, useRef } from 'react'
import './analisisIA.css'

type TabEntrada = 'subir' | 'pegar' | 'prompt'

interface MensajeChat {
  id: number
  origen: 'usuario' | 'ia' | 'escribiendo'
  texto: string
  esHtml?: boolean
}

interface ToastItem {
  id: number
  texto: string
}

const DEMO_KPIS = [
  { etiqueta: 'Ingresos totales', valor: '$924K', delta: '+22% vs periodo anterior', dir: 'verde' },
  { etiqueta: 'Ticket promedio', valor: '$1,380', delta: '+8.4%', dir: 'verde' },
  { etiqueta: 'Conversion', valor: '4.2%', delta: '-0.6%', dir: 'rojo' },
  { etiqueta: 'Mejor vendedor', valor: 'Ana G.', delta: '$187K en el periodo', dir: 'amarillo' },
  { etiqueta: 'Churn estimado', valor: '2.8%', delta: '+0.4% (atencion)', dir: 'rojo' },
  { etiqueta: 'NPS promedio', valor: '74', delta: '+5 puntos', dir: 'verde' },
]

const DEMO_BARRAS = [
  { nombre: 'Ana G.', valor: 187 },
  { nombre: 'Luis T.', valor: 154 },
  { nombre: 'Carla M.', valor: 172 },
  { nombre: 'Pedro R.', valor: 138 },
  { nombre: 'Sofia V.', valor: 160 },
  { nombre: 'Marcos L.', valor: 113 },
]

const DEMO_DONUT = [
  { label: 'Email', pct: 38, color: '#6d5d8c' },
  { label: 'Directo', pct: 27, color: '#4ade80' },
  { label: 'Redes', pct: 21, color: '#60a5fa' },
  { label: 'Referido', pct: 14, color: '#fbbf24' },
]

const DEMO_LINEAS: (number | null)[] = [280, 310, 260, 340, 390, 420, null, null]
const DEMO_PROYECCION: (number | null)[] = [null, null, null, null, null, 420, 455, 490]
const MESES_LINEAS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul*', 'Ago*']

const DEMO_INSIGHTS = [
  { tipo: 'tendencia', label: 'Tendencia detectada', icono: 'arriba', texto: 'Las ventas crecen un 22% interanual. El canal email es el principal motor, representando el 38% de los ingresos totales.', accion: 'Ver detalle' },
  { tipo: 'anomalia', label: 'Anomalia', icono: 'alerta', texto: 'Marzo registro una caida del 16% respecto a febrero. Correlaciona con un drop en el canal directo ese mes.', accion: 'Investigar' },
  { tipo: 'prediccion', label: 'Prediccion', icono: 'estrella', texto: 'Basado en la tendencia actual, julio podria superar $455K. El modelo tiene una confianza del 82%.', accion: 'Ver proyeccion' },
  { tipo: 'recomendacion', label: 'Recomendacion', icono: 'idea', texto: 'Invertir mas en campanas de email en la ultima semana del mes: los datos muestran un pico de conversion consistente.', accion: 'Generar plan' },
  { tipo: 'tendencia', label: 'Patron semanal', icono: 'arriba', texto: 'Las ventas caen consistentemente los domingos (-34% vs promedio semanal). Considera ajustar campanas para este dia.', accion: 'Ver datos' },
  { tipo: 'anomalia', label: 'Alerta de calidad', icono: 'alerta', texto: 'Se detectaron 47 registros con valores atipicos en la columna "monto". Pueden distorsionar los promedios.', accion: 'Revisar' },
]

const DEMO_ANOMALIAS = [
  { nivel: 'critica', titulo: 'Caida abrupta en marzo', desc: 'Las ventas del canal directo cayeron un 42% en la semana del 10-17 de marzo. No tiene correlacion historica.', badge: 'Critico' },
  { nivel: 'advertencia', titulo: 'Valores atipicos detectados', desc: '47 transacciones superan 3.2 sigma del promedio. Pueden ser datos de prueba o errores de carga.', badge: 'Atencion' },
  { nivel: 'advertencia', titulo: 'Patron de baja dominical', desc: 'Las ventas caen consistentemente los domingos. El modelo lo clasifica como comportamiento esperado pero suboptimo.', badge: 'Atencion' },
]

const DEMO_PREDICCIONES = [
  { etiqueta: 'Ingresos julio', valor: '$455K', conf: '82%', sub: 'Basado en tendencia de 6 meses' },
  { etiqueta: 'Ingresos agosto', valor: '$490K', conf: '74%', sub: 'Crecimiento proyectado +7.7%' },
  { etiqueta: 'Churn prox. mes', valor: '3.1%', conf: '69%', sub: 'Leve incremento estimado' },
  { etiqueta: 'Mejor canal', valor: 'Email', conf: '91%', sub: 'Mantiene liderazgo proyectado' },
]

const MENSAJE_INICIAL: MensajeChat = {
  id: 0,
  origen: 'ia',
  texto: 'Analice <span class="analisis-ia__highlight">6 meses de datos de ventas</span> con <span class="analisis-ia__num">18 variables</span>. Ya tengo los KPIs, graficas e insights listos. ¿Que quieres saber?',
  esHtml: true,
}

const RESPUESTAS_CHAT: Record<string, { texto: string; tabla?: string[][] }> = {
  vendedor: {
    texto: '<span class="analisis-ia__highlight">Ana Garcia</span> lidero el periodo con <span class="analisis-ia__num">$187K</span> en ventas totales, seguida por Carla Mendez con $172K. El diferencial fue su canal email, que convirtio un 38% mas que el promedio del equipo.',
    tabla: [['Vendedor', 'Ventas', 'Canal top'], ['Ana Garcia', '$187K', 'Email'], ['Carla Mendez', '$172K', 'Email'], ['Luis Torres', '$154K', 'Directo']],
  },
  marzo: {
    texto: 'Marzo tuvo una caida del <span class="analisis-ia__num">16%</span> respecto a febrero. El analisis correlacional senala una caida del 42% en el <span class="analisis-ia__highlight">canal directo</span> esa semana. ¿Quieres que genere el detalle completo?',
  },
  canal: {
    texto: '<span class="analisis-ia__highlight">Email</span> es el canal dominante con el <span class="analisis-ia__num">38%</span> de los ingresos totales. Le sigue Directo (27%) y Redes Sociales (21%). El canal email tambien tiene la mejor tasa de conversion: <span class="analisis-ia__num">5.1%</span>.',
    tabla: [['Canal', 'Participacion', 'Conversion'], ['Email', '38%', '5.1%'], ['Directo', '27%', '3.8%'], ['Redes', '21%', '2.4%'], ['Referido', '14%', '4.7%']],
  },
  conclusion: {
    texto: '<span class="analisis-ia__highlight">Conclusion ejecutiva</span>: El periodo muestra una tendencia de crecimiento solida (+22%). El canal email es el mayor activo. Riesgo principal: churn en aumento (2.8%) y la caida de marzo sin explicacion clara. Recomiendo reforzar retencion y auditar el canal directo antes de julio.',
  },
}

const PASOS_ANALISIS = [
  'Leyendo estructura del archivo...',
  'Detectando columnas y tipos de datos...',
  'Calculando metricas clave...',
  'Generando visualizaciones...',
  'Identificando anomalias...',
  'Calculando predicciones...',
  'Redactando insights...',
  'Finalizando analisis...',
]

export function AnalisisIAVista() {
  const [tabEntrada, setTabEntrada] = useState<TabEntrada>('subir')
  const [arrastrando, setArrastrando] = useState(false)
  const [analizando, setAnalizando] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [pasoActual, setPasoActual] = useState('')
  const [resultadosVisibles, setResultadosVisibles] = useState(false)
  const [estadoVacio, setEstadoVacio] = useState(true)
  const [textoPegar, setTextoPegar] = useState('')
  const [textoPrompt, setTextoPrompt] = useState('')
  const [mensajesChat, setMensajesChat] = useState<MensajeChat[]>([MENSAJE_INICIAL])
  const [inputChat, setInputChat] = useState('')
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatMensajesRef = useRef<HTMLDivElement>(null)
  const resultadosRef = useRef<HTMLDivElement>(null)
  const contadorToast = useRef(0)
  const contadorMensaje = useRef(1)

  function mostrarToast(texto: string) {
    const id = ++contadorToast.current
    setToasts(prev => [...prev, { id, texto }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200)
  }

  function iniciarAnalisis() {
    setEstadoVacio(false)
    setResultadosVisibles(false)
    setAnalizando(true)
    setProgreso(0)

    let pct = 0
    let pasoIdx = 0
    const intervalo = setInterval(() => {
      pct = Math.min(pct + 13, 95)
      setProgreso(pct)
      setPasoActual(PASOS_ANALISIS[pasoIdx % PASOS_ANALISIS.length])
      pasoIdx++
    }, 280)

    setTimeout(() => {
      clearInterval(intervalo)
      setProgreso(100)
      setPasoActual('¡Analisis completo!')
      setTimeout(() => {
        setAnalizando(false)
        setResultadosVisibles(true)
        setMensajesChat([MENSAJE_INICIAL])
        mostrarToast('Analisis completo. 6 insights detectados.')
        setTimeout(() => {
          resultadosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }, 500)
    }, 2400)
  }

  function procesarArchivo(nombre: string) {
    mostrarToast(`"${nombre}" cargado. Iniciando analisis...`)
    iniciarAnalisis()
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setArrastrando(false)
    const file = e.dataTransfer.files[0]
    if (file) procesarArchivo(file.name)
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) procesarArchivo(e.target.files[0].name)
  }

  function analizarDesde(origen: 'pegar' | 'prompt') {
    const valor = origen === 'pegar' ? textoPegar : textoPrompt
    if (!valor.trim()) {
      mostrarToast('Por favor ingresa datos o un prompt primero.')
      return
    }
    iniciarAnalisis()
  }

  function cargarEjemplo() {
    setTextoPegar(`Vendedor,Mes,Canal,Ventas,Unidades\nAna Garcia,Enero,Email,38200,31\nLuis Torres,Enero,Directo,29800,24\nCarla Mendez,Enero,Email,41500,33\nPedro Ruiz,Enero,Redes,22100,18`)
    mostrarToast('Datos de ejemplo cargados.')
  }

  function limpiarTodo() {
    setResultadosVisibles(false)
    setEstadoVacio(true)
    setTextoPegar('')
    setTextoPrompt('')
    mostrarToast('Todo limpiado. Listo para un nuevo analisis.')
  }

  function exportar() {
    if (!resultadosVisibles) {
      mostrarToast('No hay resultados para exportar aun.')
      return
    }
    mostrarToast('Exportando analisis completo a PDF...')
  }

  function enviarChat(textoForzado?: string) {
    const txt = textoForzado ?? inputChat.trim()
    if (!txt) return
    setInputChat('')

    const idUsuario = ++contadorMensaje.current
    const idEscribiendo = ++contadorMensaje.current

    setMensajesChat(prev => [
      ...prev,
      { id: idUsuario, origen: 'usuario', texto: txt },
      { id: idEscribiendo, origen: 'escribiendo', texto: '' },
    ])

    setTimeout(() => {
      if (chatMensajesRef.current) chatMensajesRef.current.scrollTop = chatMensajesRef.current.scrollHeight
    }, 50)

    setTimeout(() => {
      const key = Object.keys(RESPUESTAS_CHAT).find(k => txt.toLowerCase().includes(k))
      const resp = key ? RESPUESTAS_CHAT[key] : null
      const textoResp = resp
        ? resp.texto
        : 'Revisando los datos... Encontre un patron correlacionado con las campanas de los lunes. ¿Quieres que profundice en alguna dimension especifica?'

      let tablaHtml = ''
      if (resp?.tabla) {
        const [cabecera, ...filas] = resp.tabla
        tablaHtml = `<table class="analisis-ia__mini-tabla"><thead><tr>${cabecera.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${filas.map(f => `<tr>${f.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`
      }

      setMensajesChat(prev => [
        ...prev.filter(m => m.id !== idEscribiendo),
        { id: ++contadorMensaje.current, origen: 'ia', texto: textoResp + tablaHtml, esHtml: true },
      ])

      setTimeout(() => {
        if (chatMensajesRef.current) chatMensajesRef.current.scrollTop = chatMensajesRef.current.scrollHeight
      }, 50)
    }, 900)
  }

  function renderChartBarras() {
    const W = 360, H = 120, pad = 10
    const max = Math.max(...DEMO_BARRAS.map(d => d.valor))
    const barW = (W - pad * 2 - (DEMO_BARRAS.length - 1) * 6) / DEMO_BARRAS.length
    return (
      <>
        <svg className="analisis-ia__chart-svg" viewBox={`0 0 ${W} ${H}`}>
          {DEMO_BARRAS.map((d, i) => {
            const h = (d.valor / max) * (H - 20)
            const x = pad + i * (barW + 6)
            const y = H - h - 2
            return (
              <g key={d.nombre}>
                <rect x={x} y={y} width={barW} height={h} rx="4"
                  fill={i === 0 ? '#ffffff' : 'var(--color-acento)'}
                  opacity={i === 0 ? 1 : 0.65}
                />
                <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="9"
                  fill="color-mix(in srgb, var(--color-claro) 55%, transparent)"
                  fontFamily="Sora">${d.valor}K</text>
              </g>
            )
          })}
        </svg>
        <div className="analisis-ia__chart-etiquetas">
          {DEMO_BARRAS.map(d => <span key={d.nombre}>{d.nombre.split(' ')[0]}</span>)}
        </div>
      </>
    )
  }

  function renderChartDonut() {
    const cx = 50, cy = 50, r = 38, strokeW = 14
    const circum = 2 * Math.PI * r
    let offset = 0
    return (
      <div className="analisis-ia__donut-envoltorio">
        <svg viewBox="0 0 100 100" width="110" height="110">
          <circle cx={cx} cy={cy} r={r} fill="none"
            stroke="color-mix(in srgb, var(--color-acento) 35%, transparent)"
            strokeWidth={strokeW} />
          {DEMO_DONUT.map(d => {
            const len = (d.pct / 100) * circum
            const dashOffset = -offset + circum * 0.25
            const seg = (
              <circle key={d.label} cx={cx} cy={cy} r={r} fill="none"
                stroke={d.color} strokeWidth={strokeW}
                strokeDasharray={`${len} ${circum - len}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="round" />
            )
            offset += len
            return seg
          })}
        </svg>
        <div className="analisis-ia__donut-leyenda">
          {DEMO_DONUT.map(d => (
            <div key={d.label} className="analisis-ia__donut-leyenda-item">
              <div className="analisis-ia__donut-punto" style={{ background: d.color }} />
              <span>{d.label} <strong>{d.pct}%</strong></span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  function renderChartLineas() {
    const W = 680, H = 110, pad = 20
    const todosVals = [...DEMO_LINEAS, ...DEMO_PROYECCION].filter((v): v is number => v !== null)
    const minV = Math.min(...todosVals) - 30
    const maxV = Math.max(...todosVals) + 30
    const xStep = (W - pad * 2) / (MESES_LINEAS.length - 1)
    const scaleY = (v: number) => H - pad - ((v - minV) / (maxV - minV)) * (H - pad * 2)

    const realPts = DEMO_LINEAS.map((v, i) => v !== null ? [pad + i * xStep, scaleY(v)] as [number, number] : null).filter((p): p is [number, number] => p !== null)
    const projPts = DEMO_PROYECCION.map((v, i) => v !== null ? [pad + i * xStep, scaleY(v)] as [number, number] : null).filter((p): p is [number, number] => p !== null)

    const areaRealPts = [
      [realPts[0][0], H - pad],
      ...realPts,
      [realPts[realPts.length - 1][0], H - pad],
    ].map(p => p.join(',')).join(' ')

    return (
      <>
        <svg className="analisis-ia__chart-svg" viewBox={`0 0 ${W} ${H}`}>
          <defs>
            <linearGradient id="gradLineas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-acento)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--color-acento)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={areaRealPts} fill="url(#gradLineas)" />
          <polyline points={realPts.map(p => p.join(',')).join(' ')} fill="none"
            stroke="var(--color-acento)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={projPts.map(p => p.join(',')).join(' ')} fill="none"
            stroke="var(--color-azul)" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" strokeLinejoin="round" />
          {realPts.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="3.5"
              fill="var(--color-acento)" stroke="var(--color-base)" strokeWidth="1.5" />
          ))}
          {projPts.slice(1).map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="3.5"
              fill="var(--color-azul)" stroke="var(--color-base)" strokeWidth="1.5" opacity="0.8" />
          ))}
        </svg>
        <div className="analisis-ia__chart-etiquetas">
          {MESES_LINEAS.map(m => <span key={m}>{m}</span>)}
        </div>
      </>
    )
  }

  return (
    <div className="analisis-ia">
      {/* Topbar */}
      <header className="analisis-ia__topbar">
        <div className="analisis-ia__topbar-izq">
          <span className="analisis-ia__eyebrow">
            <span className="analisis-ia__eyebrow-punto" />
            Motor de analisis activo
          </span>
          <h1 className="analisis-ia__titulo">Analisis <span className="analisis-ia__acento">IA</span></h1>
          <p className="analisis-ia__subtitulo">
            Sube tus datos y deja que la IA haga el trabajo. Metricas, graficas, insights y predicciones en segundos.
          </p>
        </div>
        <div className="analisis-ia__topbar-acciones">
          <button type="button" className="analisis-ia__btn analisis-ia__btn--secundario" onClick={limpiarTodo}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
            </svg>
            Limpiar
          </button>
          <button type="button" className="analisis-ia__btn analisis-ia__btn--primario" onClick={exportar}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Exportar analisis
          </button>
        </div>
      </header>

      <div className="analisis-ia__contenido">

        {/* Zona de entrada */}
        <div className="analisis-ia__zona-entrada">
          <div className="analisis-ia__zona-tabs">
            <button type="button"
              className={`analisis-ia__zona-tab ${tabEntrada === 'subir' ? 'analisis-ia__zona-tab--activa' : ''}`}
              onClick={() => setTabEntrada('subir')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Subir archivo
            </button>
            <button type="button"
              className={`analisis-ia__zona-tab ${tabEntrada === 'pegar' ? 'analisis-ia__zona-tab--activa' : ''}`}
              onClick={() => setTabEntrada('pegar')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <rect x="8" y="2" width="8" height="4" rx="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              </svg>
              Pegar datos
            </button>
            <button type="button"
              className={`analisis-ia__zona-tab ${tabEntrada === 'prompt' ? 'analisis-ia__zona-tab--activa' : ''}`}
              onClick={() => setTabEntrada('prompt')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Escribir prompt
            </button>
          </div>

          {/* Panel subir */}
          {tabEntrada === 'subir' && (
            <div
              className={`analisis-ia__drop ${arrastrando ? 'analisis-ia__drop--arrastrando' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setArrastrando(true) }}
              onDragLeave={() => setArrastrando(false)}
              onDrop={handleDrop}
            >
              <div className="analisis-ia__drop-icono">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M8 13h8M12 17V9" />
                </svg>
              </div>
              <p className="analisis-ia__drop-titulo">Arrastra tu archivo aqui</p>
              <p className="analisis-ia__drop-sub">o haz clic para seleccionar desde tu equipo</p>
              <div className="analisis-ia__drop-formatos">
                {['CSV', 'XLSX', 'XLS', 'JSON', 'TSV'].map(f => (
                  <span key={f} className="analisis-ia__formato-chip">{f}</span>
                ))}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls,.json,.tsv"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />
            </div>
          )}

          {/* Panel pegar */}
          {tabEntrada === 'pegar' && (
            <>
              <textarea
                className="analisis-ia__textarea"
                value={textoPegar}
                onChange={e => setTextoPegar(e.target.value)}
                placeholder={`Pega aqui tus datos. Pueden ser filas de una tabla, CSV, JSON o cualquier formato tabular.\n\nEjemplo:\nVendedor,Mes,Ventas\nAna Garcia,Enero,42000`}
              />
              <div className="analisis-ia__zona-footer">
                <div className="analisis-ia__zona-sugerencias">
                  <button type="button" className="analisis-ia__zona-sug" onClick={cargarEjemplo}>
                    Cargar datos de ejemplo
                  </button>
                </div>
                <button type="button" className="analisis-ia__btn analisis-ia__btn--primario" onClick={() => analizarDesde('pegar')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                  Analizar datos
                </button>
              </div>
            </>
          )}

          {/* Panel prompt */}
          {tabEntrada === 'prompt' && (
            <>
              <textarea
                className="analisis-ia__textarea"
                value={textoPrompt}
                onChange={e => setTextoPrompt(e.target.value)}
                placeholder={`Describe que quieres analizar o pide un analisis especifico.\n\nEjemplos:\n• Analiza las ventas del ultimo trimestre y dime que producto tuvo el mejor margen.\n• Muestra los 5 mejores clientes por ingreso y predice su comportamiento.`}
              />
              <div className="analisis-ia__zona-footer">
                <div className="analisis-ia__zona-sugerencias">
                  {['¿Mejor vendedor?', '¿Por que cayo marzo?', 'Dashboard completo', 'Detectar anomalias'].map(s => (
                    <button key={s} type="button" className="analisis-ia__zona-sug" onClick={() => setTextoPrompt(s)}>{s}</button>
                  ))}
                </div>
                <button type="button" className="analisis-ia__btn analisis-ia__btn--primario" onClick={() => analizarDesde('prompt')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                  Ejecutar analisis
                </button>
              </div>
            </>
          )}
        </div>

        {/* Barra de progreso */}
        {analizando && (
          <div className="analisis-ia__cargando">
            <div className="analisis-ia__spinner" />
            <div>
              <p className="analisis-ia__cargando-texto">IA analizando tus datos</p>
              <p className="analisis-ia__cargando-paso">{pasoActual}</p>
            </div>
            <div className="analisis-ia__barra-fondo">
              <div className="analisis-ia__barra-relleno" style={{ width: `${progreso}%` }} />
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {estadoVacio && !analizando && (
          <div className="analisis-ia__vacio">
            <div className="analisis-ia__vacio-orbe">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M12 3v3" />
                <rect x="5" y="7" width="14" height="12" rx="3" />
                <circle cx="9.5" cy="12.5" r="1" fill="currentColor" />
                <circle cx="14.5" cy="12.5" r="1" fill="currentColor" />
                <path d="M9 19c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2" />
              </svg>
            </div>
            <p className="analisis-ia__vacio-titulo">La IA esta lista</p>
            <p className="analisis-ia__vacio-sub">
              Sube un archivo, pega datos o escribe un prompt. El analisis completo aparecera aqui automaticamente.
            </p>
            <button type="button" className="analisis-ia__btn analisis-ia__btn--primario"
              onClick={() => { mostrarToast('Cargando analisis de demostracion...'); iniciarAnalisis() }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
              Ver demostracion
            </button>
          </div>
        )}

        {/* Resultados */}
        {resultadosVisibles && (
          <div className="analisis-ia__resultados" ref={resultadosRef}>

            {/* KPIs */}
            <div className="analisis-ia__seccion">
              <p className="analisis-ia__seccion-titulo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M4 16l6-6 4 4 6-6" /><path d="M14 8h6v6" />
                </svg>
                KPIs detectados automaticamente
              </p>
              <div className="analisis-ia__kpis-fila">
                {DEMO_KPIS.map((k, i) => (
                  <div key={k.etiqueta} className="analisis-ia__kpi" style={{ animationDelay: `${i * 60}ms` }}>
                    <p className="analisis-ia__kpi-etiqueta">{k.etiqueta}</p>
                    <p className="analisis-ia__kpi-valor">{k.valor}</p>
                    <p className={`analisis-ia__kpi-delta analisis-ia__kpi-delta--${k.dir}`}>
                      {k.dir === 'verde' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M18 15l-6-6-6 6" />
                        </svg>
                      )}
                      {k.dir === 'rojo' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      )}
                      {k.dir === 'amarillo' && (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l2.4 4.9L20 9l-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5L4 9l5.6-1.1z" />
                        </svg>
                      )}
                      {k.delta}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gráficas */}
            <div className="analisis-ia__seccion">
              <p className="analisis-ia__seccion-titulo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 17v-5M12 17V7M17 17v-8" />
                </svg>
                Visualizaciones generadas
              </p>
              <div className="analisis-ia__graficas-fila">
                <div className="analisis-ia__grafica-tarjeta">
                  <p className="analisis-ia__grafica-titulo">Ventas por vendedor</p>
                  <p className="analisis-ia__grafica-sub">Ingresos totales · Enero–Junio 2026</p>
                  {renderChartBarras()}
                </div>
                <div className="analisis-ia__grafica-tarjeta">
                  <p className="analisis-ia__grafica-titulo">Distribucion por canal</p>
                  <p className="analisis-ia__grafica-sub">Participacion en ventas totales</p>
                  {renderChartDonut()}
                </div>
              </div>
              <div className="analisis-ia__grafica-tarjeta analisis-ia__grafica-tarjeta--ancha">
                <p className="analisis-ia__grafica-titulo">Evolucion mensual de ingresos</p>
                <p className="analisis-ia__grafica-sub">Con proyeccion para los proximos 2 meses</p>
                {renderChartLineas()}
              </div>
            </div>

            {/* Insights */}
            <div className="analisis-ia__seccion">
              <p className="analisis-ia__seccion-titulo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6-5 7v2H10v-2c-2.5-1-5-3.5-5-7a7 7 0 0 1 7-7z" />
                  <path d="M10 21h4" />
                </svg>
                Insights automaticos
              </p>
              <div className="analisis-ia__insights-cuadricula">
                {DEMO_INSIGHTS.map((ins, i) => (
                  <div key={i} className={`analisis-ia__insight analisis-ia__insight--${ins.tipo}`} style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="analisis-ia__insight-franja" />
                    <div className="analisis-ia__insight-encabezado">
                      <div className="analisis-ia__insight-icono">
                        {ins.icono === 'arriba' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 15l-6-6-6 6" /></svg>}
                        {ins.icono === 'alerta' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 4l8 14H4l8-14z" /><path d="M12 9v4M12 16h.01" /></svg>}
                        {ins.icono === 'estrella' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01z" /></svg>}
                        {ins.icono === 'idea' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6-5 7v2H10v-2c-2.5-1-5-3.5-5-7a7 7 0 0 1 7-7z" /><path d="M10 21h4" /></svg>}
                      </div>
                      <span className="analisis-ia__insight-tipo">{ins.label}</span>
                    </div>
                    <p className="analisis-ia__insight-texto">{ins.texto}</p>
                    <button type="button" className="analisis-ia__insight-accion"
                      onClick={() => mostrarToast(`Accion: ${ins.accion}`)}>
                      {ins.accion} →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Anomalías */}
            <div className="analisis-ia__seccion">
              <p className="analisis-ia__seccion-titulo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M12 4l8 14H4l8-14z" /><path d="M12 9v4M12 16h.01" />
                </svg>
                Anomalias detectadas
              </p>
              <div className="analisis-ia__anomalias">
                {DEMO_ANOMALIAS.map((a, i) => (
                  <div key={i} className={`analisis-ia__anomalia analisis-ia__anomalia--${a.nivel}`}>
                    <div className="analisis-ia__anomalia-icono">
                      {a.nivel === 'critica' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 4l8 14H4l8-14z" /><path d="M12 9v4M12 16h.01" /></svg>}
                      {a.nivel === 'advertencia' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></svg>}
                    </div>
                    <div>
                      <p className="analisis-ia__anomalia-titulo">{a.titulo}</p>
                      <p className="analisis-ia__anomalia-desc">{a.desc}</p>
                    </div>
                    <span className="analisis-ia__anomalia-badge">{a.badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Predicciones */}
            <div className="analisis-ia__seccion">
              <p className="analisis-ia__seccion-titulo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Predicciones basicas
              </p>
              <div className="analisis-ia__predicciones-fila">
                {DEMO_PREDICCIONES.map((p, i) => (
                  <div key={p.etiqueta} className="analisis-ia__prediccion" style={{ animationDelay: `${i * 70}ms` }}>
                    <div className="analisis-ia__prediccion-encabezado">
                      <span className="analisis-ia__prediccion-etiqueta">{p.etiqueta}</span>
                      <span className="analisis-ia__prediccion-conf">{p.conf}</span>
                    </div>
                    <p className="analisis-ia__prediccion-valor">{p.valor}</p>
                    <p className="analisis-ia__prediccion-mini">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01z" />
                      </svg>
                      {p.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="analisis-ia__seccion">
              <p className="analisis-ia__seccion-titulo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Chat con tus datos
              </p>
              <div className="analisis-ia__chat">
                <div className="analisis-ia__chat-cabecera">
                  <span className="analisis-ia__chat-punto" />
                  <span className="analisis-ia__chat-cabecera-titulo">Pregunta cualquier cosa sobre tu analisis</span>
                  <span className="analisis-ia__chat-cabecera-sub">Modelo activo</span>
                </div>
                <div className="analisis-ia__chat-mensajes" ref={chatMensajesRef}>
                  {mensajesChat.map(m => (
                    <div key={m.id} className={`analisis-ia__mensaje ${m.origen === 'usuario' ? 'analisis-ia__mensaje--usuario' : 'analisis-ia__mensaje--ia'}`}>
                      <div className="analisis-ia__mensaje-avatar">
                        {m.origen === 'usuario' ? 'JR' : 'IA'}
                      </div>
                      {m.origen === 'escribiendo' ? (
                        <div className="analisis-ia__mensaje-burbuja">
                          <div className="analisis-ia__escribiendo">
                            <span /><span /><span />
                          </div>
                        </div>
                      ) : m.esHtml ? (
                        <div className="analisis-ia__mensaje-burbuja"
                          dangerouslySetInnerHTML={{ __html: m.texto }} />
                      ) : (
                        <div className="analisis-ia__mensaje-burbuja">{m.texto}</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="analisis-ia__chat-sugerencias">
                  {['¿Que vendedor tuvo mas ventas?', '¿Por que cayo marzo?', '¿Mejor canal?', 'Conclusion ejecutiva'].map(s => (
                    <button key={s} type="button" className="analisis-ia__chat-sug" onClick={() => enviarChat(s)}>{s}</button>
                  ))}
                </div>
                <div className="analisis-ia__chat-entrada">
                  <input
                    type="text"
                    value={inputChat}
                    onChange={e => setInputChat(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && enviarChat()}
                    placeholder="Pregunta sobre tus datos..."
                  />
                  <button type="button" className="analisis-ia__chat-enviar" onClick={() => enviarChat()}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Toasts */}
      <div className="analisis-ia__toasts">
        {toasts.map(t => (
          <div key={t.id} className="analisis-ia__toast">{t.texto}</div>
        ))}
      </div>
    </div>
  )
}
