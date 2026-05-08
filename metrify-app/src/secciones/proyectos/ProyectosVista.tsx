import { useEffect, useMemo, useState } from 'react'
import './proyectos.css'

type EstadoProyecto = 'activo' | 'archivado'

type Proyecto = {
  id: number
  nombre: string
  descripcion: string
  avance: number
  estado: EstadoProyecto
  etiquetas: string[]
  miembros: string[]
  archivos: number
  fecha: string
}

type Mensaje = {
  id: number
  autor: 'ia' | 'usuario'
  texto: string
}

type Notificacion = {
  id: number
  texto: string
}

const proyectosIniciales: Proyecto[] = [
  {
    id: 1,
    nombre: 'Analisis Q2 2026',
    descripcion: 'Analisis de ventas y metricas clave del segundo trimestre.',
    avance: 78,
    estado: 'activo',
    etiquetas: ['activo', 'ventas'],
    miembros: ['JR', 'ML', 'CP'],
    archivos: 5,
    fecha: 'Actualizado hoy',
  },
  {
    id: 2,
    nombre: 'Migracion data lake',
    descripcion: 'Proceso de migracion y validacion de datos hacia el nuevo data lake.',
    avance: 45,
    estado: 'activo',
    etiquetas: ['activo', 'datos'],
    miembros: ['JR', 'CP'],
    archivos: 3,
    fecha: 'Actualizado ayer',
  },
  {
    id: 3,
    nombre: 'Dashboard ventas',
    descripcion: 'Creacion y mantenimiento del dashboard de ventas por region.',
    avance: 60,
    estado: 'activo',
    etiquetas: ['activo', 'dashboard'],
    miembros: ['ML'],
    archivos: 2,
    fecha: 'Hace 2 dias',
  },
  {
    id: 4,
    nombre: 'Modelo prediccion',
    descripcion: 'Desarrollo del modelo de prediccion de demanda del proximo semestre.',
    avance: 22,
    estado: 'activo',
    etiquetas: ['activo', 'ia'],
    miembros: ['JR', 'ML', 'CP', 'AR'],
    archivos: 7,
    fecha: 'Hace 3 dias',
  },
]

const respuestasIa = [
  'Segun el analisis, la region norte lidero el Q2 en ingresos totales.',
  'El ticket promedio subio frente al trimestre anterior en el segmento B2B.',
  'Detecte valores faltantes en clientes activos. Conviene limpieza de datos.',
  'La tasa de conversion bajo levemente, pero email sigue siendo el canal mas fuerte.',
]

function IconoBuscar() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M21 21l-4.35-4.35" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function IconoFiltro() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16M7 12h10M10 18h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function IconoMas() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconoArchivo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function IconoFlechaAtras() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12H5M12 19l-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconoEnviar() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 2L11 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 2L15 22l-4-9-9-4 20-7Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export function ProyectosVista() {
  const [proyectos, setProyectos] = useState(proyectosIniciales)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState<'todos' | 'activos' | 'archivados'>('todos')
  const [proyectoActivoId, setProyectoActivoId] = useState<number | null>(null)
  const [pestanaWorkspace, setPestanaWorkspace] = useState('archivos')
  const [menuProyectoAbierto, setMenuProyectoAbierto] = useState<number | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [nombreNuevo, setNombreNuevo] = useState('')
  const [descripcionNueva, setDescripcionNueva] = useState('')
  const [etiquetasNuevas, setEtiquetasNuevas] = useState('')
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { id: 1, autor: 'ia', texto: 'Hola, soy tu asistente. Puedes preguntarme por tus datos del proyecto.' },
    { id: 2, autor: 'ia', texto: 'Ejemplo: cual fue la region con mas ventas esta semana.' },
  ])
  const [entradaChat, setEntradaChat] = useState('')
  const [respuestaIndice, setRespuestaIndice] = useState(0)
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([])

  const proyectoActivo = proyectos.find((proyecto) => proyecto.id === proyectoActivoId) ?? null

  const proyectosFiltrados = useMemo(() => {
    const valor = busqueda.trim().toLowerCase()

    return proyectos.filter((proyecto) => {
      const coincideFiltro =
        filtro === 'todos' ||
        (filtro === 'activos' && proyecto.estado === 'activo') ||
        (filtro === 'archivados' && proyecto.estado === 'archivado')

      const coincideBusqueda =
        !valor ||
        proyecto.nombre.toLowerCase().includes(valor) ||
        proyecto.descripcion.toLowerCase().includes(valor)

      return coincideFiltro && coincideBusqueda
    })
  }, [proyectos, busqueda, filtro])

  useEffect(() => {
    const onClick = () => setMenuProyectoAbierto(null)
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const mostrarNotificacion = (texto: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    setNotificaciones((actual) => [...actual, { id, texto }])
    window.setTimeout(() => {
      setNotificaciones((actual) => actual.filter((item) => item.id !== id))
    }, 3000)
  }

  const crearProyecto = () => {
    const nombre = nombreNuevo.trim()
    if (!nombre) {
      mostrarNotificacion('Ingresa un nombre para crear el proyecto.')
      return
    }

    const etiquetasParseadas = etiquetasNuevas
      .split(',')
      .map((etiqueta) => etiqueta.trim().toLowerCase())
      .filter((etiqueta) => etiqueta.length > 0)

    const nuevoProyecto: Proyecto = {
      id: Date.now(),
      nombre,
      descripcion: descripcionNueva.trim() || 'Sin descripcion.',
      avance: 0,
      estado: 'activo',
      etiquetas: ['activo', ...etiquetasParseadas],
      miembros: ['JR'],
      archivos: 0,
      fecha: 'Recien creado',
    }

    setProyectos((actual) => [nuevoProyecto, ...actual])
    setNombreNuevo('')
    setDescripcionNueva('')
    setEtiquetasNuevas('')
    setModalVisible(false)
    mostrarNotificacion(`Proyecto ${nombre} creado.`)
  }

  const ejecutarAccionProyecto = (accion: 'duplicar' | 'archivar' | 'eliminar' | 'compartir', proyecto: Proyecto) => {
    if (accion === 'duplicar') {
      const copia: Proyecto = {
        ...proyecto,
        id: Date.now(),
        nombre: `${proyecto.nombre} copia`,
        fecha: 'Duplicado hace unos segundos',
      }
      setProyectos((actual) => [copia, ...actual])
      mostrarNotificacion(`Proyecto ${proyecto.nombre} duplicado.`)
      return
    }

    if (accion === 'archivar') {
      setProyectos((actual) =>
        actual.map((item) =>
          item.id === proyecto.id
            ? { ...item, estado: item.estado === 'archivado' ? 'activo' : 'archivado' }
            : item,
        ),
      )
      mostrarNotificacion(`Proyecto ${proyecto.nombre} actualizado.`)
      return
    }

    if (accion === 'eliminar') {
      setProyectos((actual) => actual.filter((item) => item.id !== proyecto.id))
      if (proyectoActivoId === proyecto.id) {
        setProyectoActivoId(null)
      }
      mostrarNotificacion(`Proyecto ${proyecto.nombre} eliminado.`)
      return
    }

    mostrarNotificacion(`Enlace para ${proyecto.nombre} copiado.`)
  }

  const enviarMensaje = () => {
    const texto = entradaChat.trim()
    if (!texto) {
      return
    }

    const nuevoMensajeUsuario: Mensaje = {
      id: Date.now(),
      autor: 'usuario',
      texto,
    }

    const nuevoMensajeIa: Mensaje = {
      id: Date.now() + 1,
      autor: 'ia',
      texto: respuestasIa[respuestaIndice % respuestasIa.length],
    }

    setEntradaChat('')
    setRespuestaIndice((valor) => valor + 1)
    setMensajes((actual) => [...actual, nuevoMensajeUsuario, nuevoMensajeIa])
  }

  const cabeceraWorkspace = proyectoActivo ? (
    <div className="proyectos__workspace-cabecera">
      <button
        type="button"
        className="proyectos__workspace-volver"
        onClick={() => setProyectoActivoId(null)}
        aria-label="Volver al listado"
      >
        <IconoFlechaAtras />
      </button>
      <div>
        <h3 className="proyectos__workspace-titulo">{proyectoActivo.nombre}</h3>
        <p className="proyectos__workspace-meta">
          {proyectoActivo.avance}% completado · {proyectoActivo.archivos} archivos · {proyectoActivo.miembros.length} miembros
        </p>
      </div>
    </div>
  ) : null

  return (
    <section className="proyectos" aria-label="Vista de proyectos">
      <header className="proyectos__topbar">
        <div>
          <h2 className="proyectos__titulo">Proyectos</h2>
          <p className="proyectos__subtitulo">Gestiona tus workspaces de analisis</p>
        </div>

        <label className="proyectos__buscador" aria-label="Buscar proyectos">
          <span className="proyectos__buscador-icono"><IconoBuscar /></span>
          <input
            type="search"
            placeholder="Buscar proyectos..."
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </label>

        <div className="proyectos__acciones-topbar">
          <button type="button" className="proyectos__boton proyectos__boton--secundario" onClick={() => mostrarNotificacion('Filtros aplicados')}>
            <IconoFiltro /> Filtrar
          </button>
          <button type="button" className="proyectos__boton proyectos__boton--primario" onClick={() => setModalVisible(true)}>
            <IconoMas /> Nuevo proyecto
          </button>
        </div>
      </header>

      <div className="proyectos__tabs">
        <button
          type="button"
          className={`proyectos__tab ${filtro === 'todos' ? 'proyectos__tab--activa' : ''}`}
          onClick={() => setFiltro('todos')}
        >
          Todos
        </button>
        <button
          type="button"
          className={`proyectos__tab ${filtro === 'activos' ? 'proyectos__tab--activa' : ''}`}
          onClick={() => setFiltro('activos')}
        >
          Activos
        </button>
        <button
          type="button"
          className={`proyectos__tab ${filtro === 'archivados' ? 'proyectos__tab--activa' : ''}`}
          onClick={() => setFiltro('archivados')}
        >
          Archivados
        </button>
      </div>

      <div className="proyectos__contenido">
        {!proyectoActivo && (
          <div className="proyectos__cuadricula">
            {proyectosFiltrados.length === 0 ? (
              <p className="proyectos__vacio">No se encontraron proyectos con esos filtros.</p>
            ) : (
              proyectosFiltrados.map((proyecto) => (
                <article
                  key={proyecto.id}
                  className={`proyectos__tarjeta ${proyecto.estado === 'archivado' ? 'proyectos__tarjeta--archivada' : ''}`}
                  onClick={() => setProyectoActivoId(proyecto.id)}
                >
                  <div className="proyectos__tarjeta-barra" />
                  <div className="proyectos__tarjeta-cuerpo">
                    <div className="proyectos__tarjeta-cabecera">
                      <span className="proyectos__tarjeta-icono"><IconoArchivo /></span>

                      <div className="proyectos__tarjeta-etiquetas">
                        {proyecto.etiquetas.map((etiqueta) => (
                          <span key={etiqueta} className="proyectos__chip">{etiqueta}</span>
                        ))}
                      </div>

                      <div className="proyectos__menu-contenedor" onClick={(evento) => evento.stopPropagation()}>
                        <button
                          type="button"
                          className="proyectos__menu-boton"
                          aria-label="Acciones del proyecto"
                          onClick={(evento) => {
                            evento.stopPropagation()
                            setMenuProyectoAbierto((actual) => (actual === proyecto.id ? null : proyecto.id))
                          }}
                        >
                          ...
                        </button>

                        <div className={`proyectos__dropdown ${menuProyectoAbierto === proyecto.id ? 'proyectos__dropdown--visible' : ''}`}>
                          <button type="button" onClick={() => ejecutarAccionProyecto('duplicar', proyecto)}>Duplicar</button>
                          <button type="button" onClick={() => ejecutarAccionProyecto('compartir', proyecto)}>Compartir</button>
                          <button type="button" onClick={() => ejecutarAccionProyecto('archivar', proyecto)}>
                            {proyecto.estado === 'archivado' ? 'Activar' : 'Archivar'}
                          </button>
                          <button type="button" className="proyectos__dropdown-peligro" onClick={() => ejecutarAccionProyecto('eliminar', proyecto)}>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="proyectos__tarjeta-nombre">{proyecto.nombre}</p>
                    <p className="proyectos__tarjeta-descripcion">{proyecto.descripcion}</p>

                    <div className="proyectos__progreso">
                      <div className="proyectos__progreso-cabecera">
                        <span>Avance</span>
                        <span>{proyecto.avance}%</span>
                      </div>
                      <div className="proyectos__progreso-fondo">
                        <span className="proyectos__progreso-relleno" style={{ width: `${proyecto.avance}%` }} />
                      </div>
                    </div>

                    <div className="proyectos__tarjeta-pie">
                      <p className="proyectos__meta">{proyecto.archivos} archivos</p>
                      <p className="proyectos__meta">{proyecto.fecha}</p>
                      <div className="proyectos__miembros">
                        {proyecto.miembros.map((miembro) => (
                          <span key={`${proyecto.id}-${miembro}`} className="proyectos__miembro">{miembro}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        )}

        {proyectoActivo && (
          <div className="proyectos__workspace">
            {cabeceraWorkspace}

            <div className="proyectos__workspace-tabs">
              {['archivos', 'datasets', 'kpis', 'graficas', 'insights', 'chat', 'reportes', 'historial'].map((pestana) => (
                <button
                  key={pestana}
                  type="button"
                  className={`proyectos__workspace-tab ${pestanaWorkspace === pestana ? 'proyectos__workspace-tab--activa' : ''}`}
                  onClick={() => setPestanaWorkspace(pestana)}
                >
                  {pestana}
                </button>
              ))}
            </div>

            {pestanaWorkspace === 'archivos' && (
              <div className="proyectos__panel-columna">
                <div className="proyectos__lista-simple">
                  {['ventas_q2_2026.csv', 'metricas_equipo.xlsx', 'informe_preliminar.pdf', 'api_response_junio.json'].map((archivo) => (
                    <div key={archivo} className="proyectos__fila-simple">
                      <span className="proyectos__archivo-ext">{archivo.split('.').pop()}</span>
                      <div>
                        <p className="proyectos__fila-titulo">{archivo}</p>
                        <p className="proyectos__fila-sub">Subido recientemente</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="proyectos__zona-carga" onClick={() => mostrarNotificacion('Selecciona un archivo para subir')}>
                  Arrastra archivos aqui o haz clic para subir
                </button>
              </div>
            )}

            {pestanaWorkspace === 'datasets' && (
              <div className="proyectos__cuadricula-secundaria">
                {['Ventas regionales', 'Clientes activos', 'Inventario live', 'Campanas marketing'].map((dataset) => (
                  <article key={dataset} className="proyectos__bloque">
                    <p className="proyectos__fila-titulo">{dataset}</p>
                    <p className="proyectos__fila-sub">12,000 filas · 18 columnas</p>
                  </article>
                ))}
              </div>
            )}

            {pestanaWorkspace === 'kpis' && (
              <div className="proyectos__cuadricula-secundaria">
                {[
                  ['Ingresos totales', '$842K'],
                  ['Ticket promedio', '$1,240'],
                  ['Tasa conversion', '3.8%'],
                  ['NPS', '72'],
                ].map(([nombre, valor]) => (
                  <article key={nombre} className="proyectos__bloque">
                    <p className="proyectos__fila-sub">{nombre}</p>
                    <p className="proyectos__kpi-valor">{valor}</p>
                  </article>
                ))}
              </div>
            )}

            {pestanaWorkspace === 'graficas' && (
              <article className="proyectos__bloque">
                <p className="proyectos__fila-titulo">Ventas semanales</p>
                <div className="proyectos__barras">
                  {[40, 62, 55, 80, 72, 94, 68].map((valor, indice) => (
                    <span
                      key={indice}
                      className={`proyectos__barra ${indice === 5 ? 'proyectos__barra--activa' : ''}`}
                      style={{ height: `${valor}%` }}
                    />
                  ))}
                </div>
              </article>
            )}

            {pestanaWorkspace === 'insights' && (
              <div className="proyectos__cuadricula-secundaria">
                {[
                  'Las ventas en el norte crecieron por encima del promedio historico.',
                  'Hay baja actividad en migracion data lake durante los ultimos 3 dias.',
                  'Conviene revisar calidad de datos en clientes activos.',
                ].map((insight) => (
                  <article key={insight} className="proyectos__bloque proyectos__bloque--acento">
                    <p className="proyectos__fila-sub">Insight IA</p>
                    <p className="proyectos__fila-titulo">{insight}</p>
                  </article>
                ))}
              </div>
            )}

            {pestanaWorkspace === 'chat' && (
              <div className="proyectos__chat">
                <div className="proyectos__chat-mensajes">
                  {mensajes.map((mensaje) => (
                    <div
                      key={mensaje.id}
                      className={`proyectos__chat-mensaje ${mensaje.autor === 'usuario' ? 'proyectos__chat-mensaje--usuario' : ''}`}
                    >
                      <span className="proyectos__chat-avatar">{mensaje.autor === 'usuario' ? 'JR' : 'IA'}</span>
                      <p className="proyectos__chat-burbuja">{mensaje.texto}</p>
                    </div>
                  ))}
                </div>
                <div className="proyectos__chat-input">
                  <input
                    type="text"
                    placeholder="Pregunta sobre tus datos..."
                    value={entradaChat}
                    onChange={(evento) => setEntradaChat(evento.target.value)}
                    onKeyDown={(evento) => {
                      if (evento.key === 'Enter') {
                        enviarMensaje()
                      }
                    }}
                  />
                  <button type="button" onClick={enviarMensaje} aria-label="Enviar">
                    <IconoEnviar />
                  </button>
                </div>
              </div>
            )}

            {pestanaWorkspace === 'reportes' && (
              <div className="proyectos__lista-simple">
                {['Reporte ejecutivo Q2', 'Analisis cohortes mayo', 'Dashboard semanal'].map((reporte) => (
                  <article key={reporte} className="proyectos__fila-simple">
                    <span className="proyectos__archivo-ext">PDF</span>
                    <div>
                      <p className="proyectos__fila-titulo">{reporte}</p>
                      <p className="proyectos__fila-sub">Generado recientemente</p>
                    </div>
                    <button type="button" className="proyectos__boton proyectos__boton--secundario" onClick={() => mostrarNotificacion('Descargando reporte')}>
                      Descargar
                    </button>
                  </article>
                ))}
              </div>
            )}

            {pestanaWorkspace === 'historial' && (
              <div className="proyectos__lista-simple">
                {[
                  'Deteccion de anomalia en pipeline de datos',
                  'Archivo ventas_q2_2026.csv procesado',
                  'KPI de ingresos actualizado con datos nuevos',
                ].map((evento) => (
                  <div key={evento} className="proyectos__fila-simple">
                    <span className="proyectos__punto" />
                    <div>
                      <p className="proyectos__fila-titulo">{evento}</p>
                      <p className="proyectos__fila-sub">Hace unas horas</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {modalVisible && (
        <div className="proyectos__overlay" onClick={() => setModalVisible(false)}>
          <div className="proyectos__modal" onClick={(evento) => evento.stopPropagation()}>
            <h3 className="proyectos__modal-titulo">Nuevo proyecto</h3>
            <label className="proyectos__campo">
              <span>Nombre</span>
              <input type="text" value={nombreNuevo} onChange={(evento) => setNombreNuevo(evento.target.value)} placeholder="Ej. Analisis Q3 2026" />
            </label>
            <label className="proyectos__campo">
              <span>Descripcion</span>
              <textarea value={descripcionNueva} onChange={(evento) => setDescripcionNueva(evento.target.value)} placeholder="Describe el objetivo principal" />
            </label>
            <label className="proyectos__campo">
              <span>Etiquetas</span>
              <input type="text" value={etiquetasNuevas} onChange={(evento) => setEtiquetasNuevas(evento.target.value)} placeholder="ventas, prediccion" />
            </label>
            <div className="proyectos__modal-acciones">
              <button type="button" className="proyectos__boton proyectos__boton--secundario" onClick={() => setModalVisible(false)}>
                Cancelar
              </button>
              <button type="button" className="proyectos__boton proyectos__boton--primario" onClick={crearProyecto}>
                Crear proyecto
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="proyectos__toasts">
        {notificaciones.map((notificacion) => (
          <article key={notificacion.id} className="proyectos__toast">
            {notificacion.texto}
          </article>
        ))}
      </div>
    </section>
  )
}
