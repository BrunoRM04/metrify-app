import { useMemo, useState } from 'react'
import './configuracion.css'

type EstiloIA = 'conciso' | 'detallado' | 'narrativo'
type ToastCfg = { id: number; texto: string }

function IconoPerfil() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
}
function IconoPreferencias() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" /></svg>
}
function IconoIA() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>
}
function IconoSistema() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
}
function IconoGuardar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
}
function IconoUpload() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
}
function IconoCheck() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
}

export function ConfiguracionVista() {
  const [toasts, setToasts] = useState<ToastCfg[]>([])

  const [nombre, setNombre] = useState('Maria Garcia')
  const [empresa, setEmpresa] = useState('Acme Corp.')
  const [idioma, setIdioma] = useState('Español')
  const [moneda, setMoneda] = useState('UYU — Peso uruguayo')
  const [fechaFormato, setFechaFormato] = useState('DD/MM/YY')
  const [numeroFormato, setNumeroFormato] = useState('1.000,00')
  const [estiloIA, setEstiloIA] = useState<EstiloIA>('conciso')
  const [nivelTecnico, setNivelTecnico] = useState(3)
  const [focoNegocio, setFocoNegocio] = useState('SaaS / Tech')

  const [memoriaContextual, setMemoriaContextual] = useState(true)
  const [modoOscuro, setModoOscuro] = useState(true)
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifPush, setNotifPush] = useState(false)
  const [frecuenciaReportes, setFrecuenciaReportes] = useState('Semanal')
  const [dosFA, setDosFA] = useState(true)
  const [cierreAuto, setCierreAuto] = useState(false)

  const iniciales = useMemo(() => {
    const partes = nombre.trim().split(' ').filter(Boolean)
    const valor = partes.map((p) => p[0]).join('').toUpperCase().slice(0, 2)
    return valor || '?'
  }, [nombre])

  function mostrarToast(texto: string) {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, texto }])
    window.setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
  }

  function guardarTodo() {
    mostrarToast('Cambios guardados correctamente')
  }

  return (
    <div className="cfg">
      <main className="cfg__main">
        <div className="cfg__topbar">
          <div>
            <div className="cfg__topbar-eyebrow"><span className="cfg__pulse" />Configuracion del sistema</div>
            <h1 className="cfg__topbar-h1">Tu <span>experiencia</span>, a tu medida.</h1>
            <p className="cfg__topbar-sub">Personaliza cada aspecto de la plataforma. Los cambios se aplican en tiempo real.</p>
          </div>
          <div className="cfg__badge-version">v2.4.1 · Produccion</div>
        </div>

        <section className="cfg__section">
          <div className="cfg__section-head">
            <div className="cfg__section-icon"><IconoPerfil /></div>
            <div><div className="cfg__section-label">Perfil</div><div className="cfg__section-desc">Tu identidad en la plataforma</div></div>
          </div>

          <div className="cfg__card">
            <div className="cfg__avatar-row">
              <div className="cfg__avatar" title="Cambiar foto">
                <span>{iniciales}</span>
                <div className="cfg__avatar-overlay"><IconoUpload /></div>
              </div>
              <div>
                <div className="cfg__avatar-name">Foto de perfil</div>
                <div className="cfg__avatar-hint">PNG, JPG · max 2MB</div>
                <button type="button" className="cfg__upload-btn" onClick={() => mostrarToast('Selector de imagen abierto')}>
                  <IconoUpload />
                  Subir imagen
                </button>
              </div>
            </div>

            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoPerfil /></div><div><div className="cfg__row-name">Nombre completo</div><div className="cfg__row-hint">Aparece en informes y exports</div></div></div>
              <div className="cfg__row-right"><input className="cfg__input" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" /></div>
            </div>

            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoSistema /></div><div><div className="cfg__row-name">Empresa</div><div className="cfg__row-hint">Nombre de tu organizacion</div></div></div>
              <div className="cfg__row-right"><input className="cfg__input" value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Tu empresa" /></div>
            </div>

            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoSistema /></div><div><div className="cfg__row-name">Logo de empresa</div><div className="cfg__row-hint">Aparece en cabeceras de informes</div></div></div>
              <div className="cfg__row-right"><button type="button" className="cfg__upload-btn" onClick={() => mostrarToast('Selector de logo abierto')}><IconoUpload />Subir logo</button></div>
            </div>
          </div>
        </section>

        <section className="cfg__section">
          <div className="cfg__section-head">
            <div className="cfg__section-icon"><IconoPreferencias /></div>
            <div><div className="cfg__section-label">Preferencias</div><div className="cfg__section-desc">Idioma, moneda y formatos regionales</div></div>
          </div>

          <div className="cfg__card">
            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoPreferencias /></div><div><div className="cfg__row-name">Idioma de interfaz</div><div className="cfg__row-hint">Aplicado en toda la plataforma</div></div></div>
              <div className="cfg__row-right"><select className="cfg__select" value={idioma} onChange={(e) => setIdioma(e.target.value)}><option>Español</option><option>English</option><option>Português</option><option>Français</option></select></div>
            </div>

            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoSistema /></div><div><div className="cfg__row-name">Moneda</div><div className="cfg__row-hint">Para reportes financieros y KPIs</div></div></div>
              <div className="cfg__row-right"><select className="cfg__select" value={moneda} onChange={(e) => setMoneda(e.target.value)}><option>USD — Dolar</option><option>UYU — Peso uruguayo</option><option>EUR — Euro</option><option>ARS — Peso argentino</option><option>BRL — Real brasileño</option></select></div>
            </div>

            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoSistema /></div><div><div className="cfg__row-name">Formato de fecha</div><div className="cfg__row-hint">Como se muestran las fechas</div></div></div>
              <div className="cfg__row-right"><div className="cfg__seg">{['DD/MM/YY', 'MM/DD/YY', 'YYYY-MM-DD'].map((f) => <button key={f} type="button" className={`cfg__seg-btn ${fechaFormato === f ? 'cfg__seg-btn--active' : ''}`} onClick={() => setFechaFormato(f)}>{f}</button>)}</div></div>
            </div>

            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoSistema /></div><div><div className="cfg__row-name">Formato numerico</div><div className="cfg__row-hint">Separador decimal y de miles</div></div></div>
              <div className="cfg__row-right"><div className="cfg__seg">{['1.000,00', '1,000.00'].map((f) => <button key={f} type="button" className={`cfg__seg-btn ${numeroFormato === f ? 'cfg__seg-btn--active' : ''}`} onClick={() => setNumeroFormato(f)}>{f}</button>)}</div></div>
            </div>
          </div>
        </section>

        <section className="cfg__section">
          <div className="cfg__section-head">
            <div className="cfg__section-icon"><IconoIA /></div>
            <div><div className="cfg__section-label">Inteligencia IA</div><div className="cfg__section-desc">Ajusta el comportamiento del asistente</div></div>
          </div>

          <div className="cfg__card">
            <div className="cfg__radio-group">
              <div className="cfg__radio-title">Estilo de respuestas</div>
              <button type="button" className={`cfg__radio-option ${estiloIA === 'conciso' ? 'cfg__radio-option--checked' : ''}`} onClick={() => setEstiloIA('conciso')}>
                <div className="cfg__radio-left"><div className="cfg__radio-indicator" /><div><div className="cfg__radio-text-name">Conciso</div><div className="cfg__radio-text-desc">Respuestas breves, directas al punto</div></div></div>
                <span className="cfg__radio-tag">Recomendado</span>
              </button>
              <button type="button" className={`cfg__radio-option ${estiloIA === 'detallado' ? 'cfg__radio-option--checked' : ''}`} onClick={() => setEstiloIA('detallado')}>
                <div className="cfg__radio-left"><div className="cfg__radio-indicator" /><div><div className="cfg__radio-text-name">Detallado</div><div className="cfg__radio-text-desc">Explicaciones completas con contexto</div></div></div>
              </button>
              <button type="button" className={`cfg__radio-option ${estiloIA === 'narrativo' ? 'cfg__radio-option--checked' : ''}`} onClick={() => setEstiloIA('narrativo')}>
                <div className="cfg__radio-left"><div className="cfg__radio-indicator" /><div><div className="cfg__radio-text-name">Narrativo</div><div className="cfg__radio-text-desc">Tono conversacional y fluido</div></div></div>
                <span className="cfg__radio-tag cfg__radio-tag--new">Nuevo</span>
              </button>
            </div>

            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoPreferencias /></div><div><div className="cfg__row-name">Nivel tecnico</div><div className="cfg__row-hint">Complejidad del lenguaje usado</div></div></div>
              <div className="cfg__row-right"><div className="cfg__slider-wrap"><input className="cfg__slider" type="range" min={1} max={5} value={nivelTecnico} onChange={(e) => setNivelTecnico(Number(e.target.value))} /><span className="cfg__slider-val">{nivelTecnico}</span></div></div>
            </div>

            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoSistema /></div><div><div className="cfg__row-name">Foco de negocio</div><div className="cfg__row-hint">Area principal de tu empresa</div></div></div>
              <div className="cfg__row-right"><select className="cfg__select" value={focoNegocio} onChange={(e) => setFocoNegocio(e.target.value)}><option>E-commerce</option><option>SaaS / Tech</option><option>Retail</option><option>Finanzas</option><option>Salud</option><option>Educacion</option><option>Otro</option></select></div>
            </div>

            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoSistema /></div><div><div className="cfg__row-name">Memoria contextual</div><div className="cfg__row-hint">La IA recuerda el contexto entre sesiones</div></div></div>
              <div className="cfg__row-right"><label className="cfg__toggle"><input type="checkbox" checked={memoriaContextual} onChange={(e) => setMemoriaContextual(e.target.checked)} /><span className="cfg__toggle-track" /></label></div>
            </div>
          </div>
        </section>

        <section className="cfg__section">
          <div className="cfg__section-head">
            <div className="cfg__section-icon"><IconoSistema /></div>
            <div><div className="cfg__section-label">Sistema</div><div className="cfg__section-desc">Apariencia, notificaciones y seguridad</div></div>
          </div>

          <div className="cfg__card">
            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoSistema /></div><div><div className="cfg__row-name">Modo oscuro</div><div className="cfg__row-hint">Interfaz de alto contraste nocturno</div></div></div>
              <div className="cfg__row-right"><label className="cfg__toggle"><input type="checkbox" checked={modoOscuro} onChange={(e) => setModoOscuro(e.target.checked)} /><span className="cfg__toggle-track" /></label></div>
            </div>
            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoSistema /></div><div><div className="cfg__row-name">Notificaciones por email</div><div className="cfg__row-hint">Alertas, reportes y actualizaciones</div></div></div>
              <div className="cfg__row-right"><label className="cfg__toggle"><input type="checkbox" checked={notifEmail} onChange={(e) => setNotifEmail(e.target.checked)} /><span className="cfg__toggle-track" /></label></div>
            </div>
            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoSistema /></div><div><div className="cfg__row-name">Notificaciones push</div><div className="cfg__row-hint">Alertas en tiempo real en el navegador</div></div></div>
              <div className="cfg__row-right"><label className="cfg__toggle"><input type="checkbox" checked={notifPush} onChange={(e) => setNotifPush(e.target.checked)} /><span className="cfg__toggle-track" /></label></div>
            </div>
            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoSistema /></div><div><div className="cfg__row-name">Frecuencia de reportes</div><div className="cfg__row-hint">Resumen automatico de metricas</div></div></div>
              <div className="cfg__row-right"><div className="cfg__seg">{['Diario', 'Semanal', 'Mensual'].map((f) => <button key={f} type="button" className={`cfg__seg-btn ${frecuenciaReportes === f ? 'cfg__seg-btn--active' : ''}`} onClick={() => setFrecuenciaReportes(f)}>{f}</button>)}</div></div>
            </div>
            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoSistema /></div><div><div className="cfg__row-name">Autenticacion 2FA</div><div className="cfg__row-hint">Doble factor de seguridad</div></div></div>
              <div className="cfg__row-right"><label className="cfg__toggle"><input type="checkbox" checked={dosFA} onChange={(e) => setDosFA(e.target.checked)} /><span className="cfg__toggle-track" /></label></div>
            </div>
            <div className="cfg__row">
              <div className="cfg__row-left"><div className="cfg__row-icon"><IconoSistema /></div><div><div className="cfg__row-name">Cierre de sesion automatico</div><div className="cfg__row-hint">Inactividad por mas de 30 min</div></div></div>
              <div className="cfg__row-right"><label className="cfg__toggle"><input type="checkbox" checked={cierreAuto} onChange={(e) => setCierreAuto(e.target.checked)} /><span className="cfg__toggle-track" /></label></div>
            </div>
          </div>
        </section>

        <div className="cfg__banner">
          <div className="cfg__banner-icon">*</div>
          <div>
            <div className="cfg__banner-title"><span>Personalizo</span> la experiencia.</div>
            <div className="cfg__banner-sub">Cada ajuste que haces se guarda en tu perfil y se aplica en toda la plataforma, en todos tus dispositivos.</div>
          </div>
          <button type="button" className="cfg__save-btn" style={{ width: 'auto', whiteSpace: 'nowrap', padding: '11px 22px' }} onClick={guardarTodo}>
            <IconoGuardar />
            Guardar todo
          </button>
        </div>
      </main>

      <div className="cfg__toast-area">
        {toasts.map((t) => (
          <div key={t.id} className="cfg__toast"><IconoCheck />{t.texto}</div>
        ))}
      </div>
    </div>
  )
}
