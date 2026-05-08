import { IconoCarpeta, IconoPanel, IconoRobot } from '../../componentes/iconosNavegacion'
import './inicio.css'

type TarjetaKpi = {
  etiqueta: string
  valor: string
  detalle: string
}

type ItemProgreso = {
  nombre: string
  avance: number
}

type ItemPanel = {
  nombre: string
  momento: string
}

type ItemInsight = {
  etiqueta: string
  texto: string
}

type ItemAlerta = {
  titulo: string
  detalle: string
}

type ItemActividad = {
  iniciales: string
  descripcion: string
  tiempo: string
}

function IconoCalendario() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="6" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 4v4M16 4v4M4 10h16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function IconoTendencia() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 16l6-6 4 4 6-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 8h6v6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconoAlerta() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4l8 14H4l8-14z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12 9v4M12 16h.01" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function IconoActividad() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h4l2-4 4 8 2-4h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const tarjetasKpi: TarjetaKpi[] = [
  { etiqueta: 'Proyectos activos', valor: '4', detalle: '1 nuevo esta semana' },
  { etiqueta: 'Dashboards', valor: '12', detalle: '3 actualizados hoy' },
  { etiqueta: 'Reportes generados', valor: '87', detalle: '+14% vs mes anterior' },
  { etiqueta: 'Alertas activas', valor: '3', detalle: 'Requieren atencion' },
]

const proyectos: ItemProgreso[] = [
  { nombre: 'Analisis Q2 2026', avance: 78 },
  { nombre: 'Migracion data lake', avance: 45 },
  { nombre: 'Dashboard ventas', avance: 60 },
  { nombre: 'Modelo prediccion', avance: 22 },
]

const paneles: ItemPanel[] = [
  { nombre: 'Ventas por region', momento: 'Hoy' },
  { nombre: 'Retencion de clientes', momento: 'Ayer' },
  { nombre: 'Rendimiento mensual', momento: 'Hace 2d' },
  { nombre: 'Embudo conversion', momento: 'Hace 3d' },
]

const insightsIa: ItemInsight[] = [
  {
    etiqueta: 'Tendencia detectada',
    texto: 'Las ventas en la region norte subieron 18% en los ultimos 7 dias, por encima del promedio historico.',
  },
  {
    etiqueta: 'Anomalia identificada',
    texto: 'El proyecto Migracion data lake lleva 3 dias sin actividad. Puede afectar la fecha de entrega estimada.',
  },
  {
    etiqueta: 'Recomendacion',
    texto: 'Conviene revisar el modelo de prediccion: los datos de entrada cambiaron esta semana.',
  },
]

const alertas: ItemAlerta[] = [
  { titulo: 'Fallo en pipeline de datos', detalle: 'Proyecto: Analisis Q2 · Hace 40 min' },
  { titulo: 'Reporte semanal pendiente', detalle: 'Vence hoy a las 18:00' },
  { titulo: 'Nueva plantilla disponible', detalle: 'Plantilla de embudo Q3 lista para usar' },
]

const actividades: ItemActividad[] = [
  { iniciales: 'TU', descripcion: 'Actualizaste el dashboard Ventas por region', tiempo: 'Hace 12 min' },
  { iniciales: 'ML', descripcion: 'M. Lopez genero el reporte de retencion', tiempo: 'Hace 1 hora' },
  { iniciales: 'CP', descripcion: 'C. Perez abrio el proyecto Modelo prediccion', tiempo: 'Hace 3 horas' },
  { iniciales: 'IA', descripcion: 'IA detecto anomalia en data lake y genero alerta', tiempo: 'Hace 5 horas' },
]

export function InicioVista() {
  const hoy = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="inicio">
      <header className="inicio__topbar">
        <div>
          <h1 className="inicio__titulo">Buen dia, <span className="inicio__acento">Juan</span></h1>
          <p className="inicio__subtitulo">Resumen de tu espacio · {hoy}</p>
        </div>
      </header>

      <section className="inicio__kpi-cuadricula" aria-label="Resumen de indicadores">
        {tarjetasKpi.map((kpi) => (
          <article key={kpi.etiqueta} className="inicio__kpi">
            <span className="inicio__kpi-punto" aria-hidden="true" />
            <p className="inicio__kpi-etiqueta">{kpi.etiqueta}</p>
            <p className="inicio__kpi-valor">{kpi.valor}</p>
            <p className="inicio__kpi-detalle">{kpi.detalle}</p>
          </article>
        ))}
      </section>

      <div className="inicio__fila">
        <article className="inicio__tarjeta">
          <div className="inicio__tarjeta-titulo">
            <span className="inicio__icono"><IconoCarpeta /></span>
            <h2 className="inicio__tarjeta-texto">Ultimos proyectos</h2>
            <span className="inicio__insignia">4</span>
          </div>
          <div className="inicio__lista">
            {proyectos.map((proyecto) => (
              <div key={proyecto.nombre} className="inicio__item-lista">
                <p className="inicio__item-nombre">{proyecto.nombre}</p>
                <div className="inicio__barra" role="img" aria-label={`${proyecto.avance}% completado`}>
                  <span className="inicio__barra-relleno" style={{ width: `${proyecto.avance}%` }} />
                </div>
                <span className="inicio__item-meta">{proyecto.avance}%</span>
              </div>
            ))}
          </div>
        </article>

        <article className="inicio__tarjeta">
          <div className="inicio__tarjeta-titulo">
            <span className="inicio__icono"><IconoPanel /></span>
            <h2 className="inicio__tarjeta-texto">Dashboards recientes</h2>
          </div>
          <div className="inicio__lista">
            {paneles.map((panel) => (
              <div key={panel.nombre} className="inicio__item-lista inicio__item-lista--compacto">
                <span className="inicio__icono inicio__icono--item"><IconoTendencia /></span>
                <p className="inicio__item-nombre">{panel.nombre}</p>
                <span className="inicio__etiqueta">{panel.momento}</span>
              </div>
            ))}
          </div>

          <div className="inicio__grafica" aria-label="Actividad semanal">
            {[30, 55, 45, 70, 60, 90, 75].map((altura, indice) => (
              <span
                key={indice}
                className={`inicio__grafica-barra ${indice === 5 ? 'inicio__grafica-barra--activa' : ''}`}
                style={{ height: `${altura}%` }}
              />
            ))}
          </div>
          <div className="inicio__grafica-etiquetas">
            <span>L</span>
            <span>M</span>
            <span>X</span>
            <span>J</span>
            <span>V</span>
            <span>S</span>
            <span>D</span>
          </div>
        </article>
      </div>

      <article className="inicio__tarjeta inicio__tarjeta--ia">
        <div className="inicio__tarjeta-titulo">
          <span className="inicio__icono"><IconoRobot /></span>
          <h2 className="inicio__tarjeta-texto">Insights de IA</h2>
          <span className="inicio__insignia">IA</span>
        </div>
        <div className="inicio__cuadricula-insights">
          {insightsIa.map((insight) => (
            <article key={insight.etiqueta} className="inicio__insight">
              <p className="inicio__insight-etiqueta">{insight.etiqueta}</p>
              <p className="inicio__insight-texto">{insight.texto}</p>
            </article>
          ))}
        </div>
      </article>

      <div className="inicio__fila">
        <article className="inicio__tarjeta">
          <div className="inicio__tarjeta-titulo">
            <span className="inicio__icono"><IconoAlerta /></span>
            <h2 className="inicio__tarjeta-texto">Alertas importantes</h2>
            <span className="inicio__insignia">3</span>
          </div>
          <div className="inicio__lista-alertas">
            {alertas.map((alerta) => (
              <div key={alerta.titulo} className="inicio__alerta">
                <span className="inicio__icono inicio__icono--item"><IconoCalendario /></span>
                <div>
                  <p className="inicio__alerta-titulo">{alerta.titulo}</p>
                  <p className="inicio__alerta-detalle">{alerta.detalle}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="inicio__tarjeta">
          <div className="inicio__tarjeta-titulo">
            <span className="inicio__icono"><IconoActividad /></span>
            <h2 className="inicio__tarjeta-texto">Actividad reciente</h2>
          </div>
          <div className="inicio__lista-actividad">
            {actividades.map((actividad) => (
              <article key={actividad.descripcion} className="inicio__actividad">
                <span className="inicio__avatar">{actividad.iniciales}</span>
                <div className="inicio__actividad-cuerpo">
                  <p className="inicio__actividad-texto">{actividad.descripcion}</p>
                  <p className="inicio__actividad-tiempo">{actividad.tiempo}</p>
                </div>
              </article>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}
