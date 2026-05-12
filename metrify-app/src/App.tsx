import { type ReactNode, useEffect, useState } from 'react'
import {
  IconoAjustes,
  IconoBiblioteca,
  IconoCarpeta,
  IconoInicio,
  IconoPanel,
  IconoPlantilla,
  IconoReporte,
  IconoRobot,
} from './componentes/iconosNavegacion'
import { InicioVista } from './secciones/inicio/InicioVista'
import { AnalisisIAVista } from './secciones/analisisIA/AnalisisIAVista'
import { PanelesVista } from './secciones/paneles/PanelesVista'
import { PlantillasVista } from './secciones/plantillas/PlantillasVista'
import { ProyectosVista } from './secciones/proyectos/ProyectosVista'
import { ReportesVista } from './secciones/reportes/ReportesVista'
import { BibliotecaVista } from './secciones/biblioteca/BibliotecaVista'
import { ConfiguracionVista } from './secciones/configuracion/ConfiguracionVista'
import './App.css'

type ItemMenu = {
  id: string
  etiqueta: string
  icono: ReactNode
  contador?: string
  destacado?: boolean
}

function App() {
  const [itemActivo, setItemActivo] = useState('inicio')

  const grupoPrincipal: ItemMenu[] = [
    { id: 'inicio', etiqueta: 'Inicio', icono: <IconoInicio /> },
    { id: 'proyectos', etiqueta: 'Proyectos', icono: <IconoCarpeta />, contador: '4' },
  ]

  const grupoAnalisis: ItemMenu[] = [
    { id: 'analisis-ia', etiqueta: 'Analisis IA', icono: <IconoRobot />, destacado: true },
    { id: 'paneles', etiqueta: 'Dashboards', icono: <IconoPanel /> },
    { id: 'reportes', etiqueta: 'Reportes', icono: <IconoReporte /> },
  ]

  const grupoRecursos: ItemMenu[] = [
    { id: 'plantillas', etiqueta: 'Plantillas', icono: <IconoPlantilla /> },
    { id: 'biblioteca', etiqueta: 'Biblioteca', icono: <IconoBiblioteca /> },
    { id: 'configuracion', etiqueta: 'Configuracion', icono: <IconoAjustes /> },
  ]

  useEffect(() => {
    const etiquetaPorSector: Record<string, string> = {
      inicio: 'Inicio',
      proyectos: 'Proyectos',
      'analisis-ia': 'Analisis IA',
      paneles: 'Dashboards',
      reportes: 'Reportes',
      plantillas: 'Plantillas',
      biblioteca: 'Biblioteca',
      configuracion: 'Configuracion',
    }

    const etiquetaActiva = etiquetaPorSector[itemActivo] ?? 'Metrify App'

    document.title = `${etiquetaActiva} - Metrify App`
  }, [itemActivo])

  useEffect(() => {
    fetch('http://localhost:3001/api/usuarios')
      .then((res) => res.json())
      .then((data) => console.log('Usuarios desde backend:', data))
      .catch((error) => console.error('No se pudo conectar con el backend:', error))
  }, [])


  const renderizarItem = (item: ItemMenu) => {
    const activo = itemActivo === item.id

    return (
      <button
        key={item.id}
        type="button"
        className={`inicio-panel__item ${activo ? 'inicio-panel__item--activo' : ''}`}
        onClick={() => setItemActivo(item.id)}
      >
        <span className="inicio-panel__icono">{item.icono}</span>
        <span className="inicio-panel__texto-item">{item.etiqueta}</span>
        {item.contador && <span className="inicio-panel__insignia">{item.contador}</span>}
        {item.destacado && <span className="inicio-panel__insignia inicio-panel__insignia--destacada">IA</span>}
      </button>
    )
  }

  return (
    <main className="inicio-panel">
      <aside className="inicio-panel__barra-lateral" aria-label="Menu de gestion">
        <div className="inicio-panel__marca">
          <div className="inicio-panel__marca-icono" aria-hidden="true">
            M
          </div>
          <p className="inicio-panel__marca-texto">
            metri<span>fy</span>
          </p>
        </div>

        <nav className="inicio-panel__navegacion">
          {grupoPrincipal.map(renderizarItem)}
          {grupoAnalisis.map(renderizarItem)}
          {grupoRecursos.map(renderizarItem)}
        </nav>

        <div className="inicio-panel__usuario">
          <div className="inicio-panel__avatar" aria-hidden="true">
            JR
          </div>
          <div className="inicio-panel__datos-usuario">
            <p className="inicio-panel__nombre-usuario">Juan Rodriguez</p>
            <p className="inicio-panel__rol-usuario">Admin Pro</p>
          </div>
          <button type="button" className="inicio-panel__boton-opciones" aria-label="Opciones de usuario">
            ...
          </button>
        </div>
      </aside>
      <section className="inicio-panel__espacio">
        {itemActivo === 'inicio' && <InicioVista />}
        {itemActivo === 'proyectos' && <ProyectosVista />}
        {itemActivo === 'analisis-ia' && <AnalisisIAVista />}
        {itemActivo === 'paneles' && <PanelesVista />}
        {itemActivo === 'reportes' && <ReportesVista />}
        {itemActivo === 'plantillas' && <PlantillasVista />}
        {itemActivo === 'biblioteca' && <BibliotecaVista />}
        {itemActivo === 'configuracion' && <ConfiguracionVista />}
        {itemActivo !== 'inicio' && itemActivo !== 'proyectos' && itemActivo !== 'analisis-ia' && itemActivo !== 'paneles' && itemActivo !== 'reportes' && itemActivo !== 'plantillas' && itemActivo !== 'biblioteca' && itemActivo !== 'configuracion' && (
          <div className="inicio-panel__placeholder">Seccion en preparacion.</div>
        )}
      </section>
    </main>
  )
}

export default App
