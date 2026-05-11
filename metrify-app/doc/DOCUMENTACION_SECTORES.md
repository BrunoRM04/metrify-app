# Documentacion Completa de Sectores - Metrify

## 1. Vision general de la aplicacion

Metrify esta organizada por sectores (vistas funcionales) que cubren un flujo de analitica de extremo a extremo:

1. Inicio: resumen ejecutivo y monitoreo rapido.
2. Proyectos: gestion de espacios de trabajo por caso de analisis.
3. Analisis IA: motor guiado para procesar datos y producir hallazgos.
4. Dashboards (Paneles): construccion y edicion de visualizaciones interactivas.
5. Reportes: produccion, consulta y exportacion de reportes formales.
6. Plantillas: aceleracion de trabajo mediante modelos reutilizables.
7. Biblioteca: repositorio para guardar, versionar y reutilizar activos.
8. Configuracion: personalizacion de perfil, IA, sistema y preferencias.

En conjunto, el producto permite pasar de datos crudos a decisiones accionables, con una experiencia orientada a productividad y reutilizacion.

---

## 2. Sector Inicio

### 2.1 Que hace

Inicio funciona como panel de mando general del usuario. Su objetivo es mostrar el estado actual del entorno sin obligar a navegar por cada modulo.

### 2.2 Que ofrece

- Saludo contextual y fecha actual.
- KPIs de alto nivel:
  - Proyectos activos.
  - Dashboards disponibles.
  - Reportes generados.
  - Alertas activas.
- Resumen de ultimos proyectos con porcentaje de avance.
- Dashboards recientes con actividad semanal sintetizada.
- Bloque de insights IA pre-digeridos.
- Alertas importantes priorizadas.
- Feed de actividad reciente por usuario/sistema.

### 2.3 Que debe hacer el usuario aqui

- Revisar rapidamente estado operativo del trabajo.
- Detectar riesgos urgentes (alertas, anomalias, falta de actividad).
- Decidir a que sector entrar segun prioridad:
  - Proyectos si hay que ejecutar trabajo.
  - Dashboards si hay que ajustar visualizacion.
  - Reportes si hay que comunicar resultados.

### 2.4 Valor de negocio

Inicio reduce el tiempo de orientacion inicial de cada sesion y ayuda a priorizar accion inmediata.

---

## 3. Sector Proyectos

### 3.1 Que hace

Proyectos gestiona workspaces analiticos. Cada proyecto agrupa contexto, archivos, datasets, KPIs, graficas, insights, chat y reportes en una unidad de trabajo.

### 3.2 Que ofrece

- Busqueda por nombre/descripcion.
- Filtros por estado (todos, activos, archivados).
- Alta de nuevo proyecto via modal.
- Acciones por proyecto:
  - Duplicar.
  - Compartir.
  - Archivar/activar.
  - Eliminar.
- Tarjetas con:
  - Etiquetas.
  - Progreso.
  - Archivos.
  - Fecha de actualizacion.
  - Miembros.

### 3.3 Workspace interno del proyecto

Cada proyecto tiene pestanas funcionales:

- Archivos: listado y zona de carga.
- Datasets: catalogo de tablas y estructura.
- KPIs: indicadores clave del caso.
- Graficas: visualizacion rapida de series.
- Insights: hallazgos automatizados.
- Chat: preguntas sobre datos con asistente IA.
- Reportes: descargas de reportes del proyecto.
- Historial: traza de eventos y cambios.

### 3.4 Que debe hacer el usuario aqui

- Crear proyectos por objetivo de negocio o periodo.
- Mantener orden mediante etiquetas y estados.
- Usar el workspace para consolidar todo el ciclo analitico.
- Archivar lo cerrado para mantener foco en lo activo.

### 3.5 Valor de negocio

Proyectos evita dispersion de informacion y mejora trazabilidad de decisiones por caso.

---

## 4. Sector Analisis IA

### 4.1 Que hace

Analisis IA es el sector de procesamiento inteligente de datos. Permite ingresar informacion y obtener una salida completa: KPIs, visualizaciones, insights, anomalias, predicciones y conversacion contextual.

### 4.2 Que ofrece

#### Entrada de informacion en 3 modos

- Subir archivo (drag and drop o selector): CSV, XLSX, XLS, JSON, TSV.
- Pegar datos en texto.
- Escribir prompt analitico.

#### Flujo de ejecucion

- Validacion inicial.
- Barra de progreso con pasos de procesamiento.
- Resultado estructurado en bloques.

#### Bloques de salida

- KPIs detectados automaticamente.
- Graficas generadas:
  - Barras.
  - Donut de distribucion.
  - Linea con proyeccion.
- Insights automáticos por tipo:
  - Tendencia.
  - Anomalia.
  - Prediccion.
  - Recomendacion.
- Lista de anomalias con criticidad.
- Predicciones con nivel de confianza.
- Chat con los datos ya analizados (Q&A contextual).

#### Acciones auxiliares

- Limpiar sesion.
- Exportar analisis.
- Cargar ejemplo de datos.
- Sugerencias de consulta rapida en chat.

### 4.3 Que debe hacer el usuario aqui

- Ingresar datos confiables y estructurados.
- Validar si los hallazgos IA coinciden con el contexto del negocio.
- Usar el chat para profundizar en dudas concretas.
- Exportar resultados cuando la narrativa este validada.

### 4.4 Valor de negocio

Este sector reduce drásticamente el tiempo de analisis exploratorio y acelera la deteccion de oportunidades/riesgos.

---

## 5. Sector Dashboards (Paneles)

### 5.1 Que hace

Dashboards permite crear, editar y compartir tableros visuales para monitoreo continuo. Combina galeria de tableros con editor avanzado de widgets.

### 5.2 Que ofrece

#### Galeria de dashboards

- Tabs de organizacion: todos, favoritos, compartidos.
- Cards con preview visual y estado (en vivo/estatico).
- Acciones por dashboard:
  - Duplicar.
  - Compartir link.
  - Exportar.
  - Eliminar.
- Alta de dashboard nuevo con seleccion de plantilla base.

#### Editor de dashboard

- Topbar de edicion con nombre y metadatos.
- Filtros (periodo, region) con chips activos.
- Herramientas:
  - Pantalla completa.
  - Exportar PNG/PDF.
  - Compartir.
  - Agregar widget.

#### Motor de widgets

- Tipos soportados:
  - KPI.
  - Barras.
  - Lineas.
  - Donut.
  - Heatmap.
  - Tabla.
  - Gauge.
- Reordenamiento por drag and drop.
- Eliminacion/edicion de widgets.
- Zona dedicada para agregar nuevos widgets.

### 5.3 Que debe hacer el usuario aqui

- Construir dashboards orientados a decisiones (no solo estetica).
- Mantener tableros con un numero razonable de widgets.
- Usar filtros para segmentar lectura por contexto.
- Exportar versiones para stakeholders cuando sea necesario.

### 5.4 Valor de negocio

Dashboards centraliza monitoreo operativo y ejecutivo en una capa visual accionable.

---

## 6. Sector Reportes

### 6.1 Que hace

Reportes se enfoca en la comunicacion formal de resultados. Convierte datos y visuales en documentos listos para compartir con equipos y direccion.

### 6.2 Que ofrece

- Catalogo de reportes por tipo:
  - Ejecutivo.
  - Financiero.
  - Ventas.
  - Marketing.
  - Rendimiento.
- KPIs agregados del modulo (totales, pendientes, IA).
- Filtros por periodo y estado.
- Cards de reportes con metadata, badges y accesos de exportacion.
- Modal para generar nuevo reporte (tipo, periodo, IA).

### 6.3 Vista detalle de reporte

- Cabecera con acciones:
  - Volver.
  - Comparativa.
  - Exportar imagen.
  - Exportar PDF.
- Bloque de resumen IA (si aplica).
- Grid analitico con widgets:
  - KPIs.
  - Evolucion temporal.
  - Distribuciones.
  - Tablas de detalle.
  - Historico comparable.

### 6.4 Que debe hacer el usuario aqui

- Estandarizar formato de reportes por audiencia.
- Validar coherencia entre resumen IA y datos reales.
- Programar/crear reportes en momentos de corte de negocio.
- Exportar en formato adecuado al canal de comunicacion.

### 6.5 Valor de negocio

Reportes mejora la narrativa ejecutiva y la consistencia de comunicacion entre areas.

---

## 7. Sector Plantillas

### 7.1 Que hace

Plantillas acelera la construccion de soluciones analiticas predefinidas por caso de uso. Su foco es velocidad de puesta en marcha.

### 7.2 Que ofrece

#### Catalogo de templates

- Filtros por categoria:
  - E-commerce.
  - Ventas.
  - Call Center.
  - CRM.
  - Finanzas.
  - RRHH.
  - Marketing.
- Busqueda por nombre/descripcion/categoria.
- Seccion featured con template recomendado.
- Cards con:
  - Usos.
  - Tiempo estimado.
  - Formatos compatibles.
  - Componentes incluidos.

#### Onboarding en 3 pasos

1. Elegir template.
2. Subir archivo de datos.
3. Generar dashboard automaticamente.

#### Proceso asistido

- Validacion de archivo.
- Mapeo de columnas.
- Generacion de widgets/graficos.
- Aplicacion de resumen IA.
- Confirmacion final con estadisticas de resultado.

### 7.3 Que debe hacer el usuario aqui

- Elegir plantilla segun objetivo real de negocio.
- Subir datos con estructura minima consistente.
- Verificar salida generada antes de compartir.
- Repetir flujo para acelerar nuevos casos similares.

### 7.4 Valor de negocio

Reduce el time-to-value para usuarios no tecnicos y estandariza soluciones reutilizables.

---

## 8. Sector Biblioteca

### 8.1 Que hace

Biblioteca es el repositorio de activos analiticos. Permite almacenar, clasificar, versionar, exportar e importar recursos reutilizables.

### 8.2 Que ofrece

#### Gestion de recursos

- Tipos de recurso:
  - Dashboard.
  - KPI.
  - Grafico.
  - Reporte.
  - Prompt IA.
  - Layout.
- Filtro por tipo y busqueda por texto.
- Vista en grid o lista.
- Sidebar con etiquetas y uso de almacenamiento.

#### Operacion masiva

- Modo seleccion multiple.
- Acciones masivas:
  - Duplicar.
  - Exportar.
  - Eliminar.

#### Detalle del recurso

- Metadatos completos.
- Historial de uso.
- Versionado y restauracion.
- Recursos relacionados.
- Acciones rapidas de reutilizacion.

#### Modales operativos

- Guardar nuevo recurso.
- Exportar (JSON/CSV/PDF/XLSX).
- Importar desde archivo.

### 8.3 Que debe hacer el usuario aqui

- Guardar activos con nombres y etiquetas claras.
- Reutilizar componentes para evitar trabajo duplicado.
- Mantener limpieza mediante eliminacion/versionado.
- Exportar/importar para movilidad entre entornos.

### 8.4 Valor de negocio

Biblioteca transforma trabajo puntual en capital analitico acumulable.

---

## 9. Sector Configuracion

### 9.1 Que hace

Configuracion centraliza preferencias personales, parametros de IA y ajustes de sistema para adaptar Metrify al contexto del usuario/organizacion.

### 9.2 Que ofrece

#### Bloque Perfil

- Foto de perfil.
- Nombre completo.
- Empresa.
- Logo de empresa.

#### Bloque Preferencias

- Idioma de interfaz.
- Moneda.
- Formato de fecha.
- Formato numerico.

#### Bloque Inteligencia IA

- Estilo de respuestas:
  - Conciso.
  - Detallado.
  - Narrativo.
- Nivel tecnico (slider).
- Foco de negocio.
- Memoria contextual activable.

#### Bloque Sistema

- Modo oscuro.
- Notificaciones por email.
- Notificaciones push.
- Frecuencia de reportes.
- 2FA.
- Cierre de sesion automatico.

#### Acciones transversales

- Boton de guardado general.
- Toasts de confirmacion.
- Banner de estado de personalizacion.

### 9.3 Que debe hacer el usuario aqui

- Definir defaults coherentes para su operacion diaria.
- Ajustar IA segun perfil del equipo (ejecutivo vs tecnico).
- Configurar seguridad y notificaciones segun criticidad del negocio.
- Confirmar guardado luego de cambios importantes.

### 9.4 Valor de negocio

Mejora adopcion y consistencia de uso al alinear la plataforma con el contexto real del usuario.

---

## 10. Flujo recomendado de uso entre sectores

Un flujo recomendado en produccion es el siguiente:

1. Inicio: detectar prioridad del dia.
2. Proyectos: abrir/crear el caso de trabajo.
3. Analisis IA: procesar datos y generar hallazgos.
4. Dashboards: ajustar visuales para monitoreo continuo.
5. Reportes: consolidar narrativa para stakeholders.
6. Biblioteca: guardar activos reutilizables.
7. Configuracion: afinar parametros de experiencia/seguridad.

Este flujo asegura continuidad entre exploracion, construccion, comunicacion y reutilizacion.

---

## 11. Recomendaciones operativas por equipo

### 11.1 Para perfiles de negocio

- Priorizar Inicio, Reportes y Dashboards.
- Usar Plantillas para acelerar.
- Consultar Analisis IA por preguntas puntuales.

### 11.2 Para perfiles analiticos

- Trabajar desde Proyectos y Analisis IA.
- Consolidar salida en Dashboards.
- Versionar y guardar en Biblioteca.

### 11.3 Para liderazgo/management

- Consumir principalmente Inicio y Reportes.
- Definir estandares de nombres/etiquetas en Biblioteca.
- Exigir frecuencia y formato de reportes desde Configuracion.

---

## 12. Buenas practicas de uso

- Mantener nomenclatura consistente en proyectos y recursos.
- Evitar duplicados innecesarios; usar Biblioteca para reutilizar.
- Validar resultados IA con criterio de negocio antes de publicar.
- Archivar lo cerrado para preservar foco en activos.
- Configurar seguridad (2FA y cierre automatico) en entornos productivos.

---

## 13. Conexiones y flujos de datos entre sectores (Referencia Backend)

Esta seccion documenta las conexiones explicitas e implicitas entre sectores, los datos que fluyen entre ellos, y las relaciones de backend requeridas para soportar la integracion.

### 13.1 Mapa de conexiones general

```
                        ┌─────────────────┐
                        │   CONFIGURACION │ (aplica a todos)
                        └─────────────────┘
                                ▲
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────▼────┐   ┌──────▼──────┐  ┌────▼──────┐
        │   INICIO   │───│  PROYECTOS  │──│BIBLIOTECA │
        │   (hub)    │   └──────┬──────┘  └────▲──────┘
        └───────┬────┘          │              │
                │      ┌────────┼──────────────┘
                │      │        │
        ┌───────▼──────▼─┐ ┌────▼────────┐
        │  ANALISIS IA   │ │ PLANTILLAS  │
        │  (motor)       │ └─────────────┘
        └───────┬────────┘
                │
        ┌───────▼──────────┐
        │  DASHBOARDS/     │
        │  PANELES         │
        └───────┬──────────┘
                │
        ┌───────▼──────┐
        │  REPORTES    │
        │  (salida)    │
        └──────────────┘
```

### 13.2 Conexiones por sector

#### 13.2.1 INICIO (Hub Agregador)

**Conexiones de entrada (consume datos de):**
- Proyectos: lista de proyectos activos, estado, progreso, miembros
- Dashboards: lista de dashboards recientes, actualizacion, estado
- Reportes: conteo de reportes, ultimos generados
- Analisis IA: ultimos analisis realizados, insights destacados
- Alertas del sistema: eventos criticos, avisos

**Flujos de datos:**
| Origen | Tipo de dato | Frecuencia | Uso en Inicio |
|--------|---|---|---|
| Proyectos | proyecto_id, nombre, descripcion, avance, estado, etiquetas, fecha_actualizacion | Real-time/Cache | Tarjeta resumen con progreso |
| Dashboards | dashboard_id, nombre, widgets_count, fecha_actualizacion, es_compartido | Real-time | Lista de dashboards recientes |
| Reportes | reporte_id, nombre, tipo, fecha_creacion, periodo | Consulta ON-DEMAND | KPI total de reportes |
| Analisis IA | analisis_id, proyecto_id, kpis[], insights[], fecha | Real-time | Bloque de insights destacados |
| Alertas | alerta_id, nivel, mensaje, fecha, leida | Real-time | Feed de alertas priorizadas |

**Operaciones backend:**
- GET /api/dashboard/inicio (retorna consolidado de todos los datos)
- GET /api/proyectos?limit=5&orderby=actualizacion (ultimos activos)
- GET /api/dashboards?limit=5&orderby=actualizacion (ultimos)
- GET /api/reportes?limit=10 (ultimos reportes)
- GET /api/alertas?leida=false&orden=critico (alertas no leidas)

**Modelos de base de datos necesarios:**
- users_preferencias (para filtros personalizados de inicio)
- alertas (id, usuario_id, tipo, nivel, mensaje, fecha, leida)
- actividad_usuario (id, usuario_id, accion, entidad_tipo, entidad_id, fecha)

---

#### 13.2.2 PROYECTOS (Centro de Organizacion)

**Conexiones de entrada:**
- Plantillas: estructura inicial para crear proyecto
- Biblioteca: activos guardados del proyecto (dashboards, reportes previos)

**Conexiones de salida:**
- Analisis IA: archivos/datasets del proyecto como fuente de datos
- Dashboards: contexto del proyecto, filtros basados en proyecto
- Reportes: datos del proyecto, datasets, contexto
- Biblioteca: guardar activos generados en el proyecto

**Flujos de datos internos del proyecto:**
| Tab/Seccion | Tipo de dato | Backend |
|---|---|---|
| Archivos | archivo_id, nombre, size, tipo, fecha_carga, usuario_id | tabla: proyecto_archivos |
| Datasets | dataset_id, nombre, columnas[], tipo, registros_count, fecha_creacion | tabla: proyecto_datasets |
| KPIs | kpi_id, nombre, formula, valor, delta, fecha_calculo | tabla: proyecto_kpis |
| Graficas | grafica_id, tipo_widget, nombre, config_json, fecha_creacion | tabla: proyecto_graficas |
| Insights | insight_id, tipo, descripcion, confianza, fecha | tabla: proyecto_insights |
| Chat | mensaje_id, autor, texto, fecha, referencia_dato_id | tabla: proyecto_chat_mensajes |
| Reportes | reporte_id, nombre, tipo, estado, fecha_creacion | tabla: proyecto_reportes |
| Historial | evento_id, usuario_id, accion, tabla_afectada, fecha | tabla: proyecto_historial |

**Operaciones backend críticas:**
- POST /api/proyectos (crear proyecto, opcionalmente desde plantilla)
- GET /api/proyectos/{id} (obtener detalle completo)
- GET /api/proyectos/{id}/archivos (listar archivos)
- POST /api/proyectos/{id}/archivos (cargar archivo)
- GET /api/proyectos/{id}/datasets (listar datasets)
- GET /api/proyectos/{id}/workspace (obtener todas las pestañas consolidadas)
- PATCH /api/proyectos/{id} (editar proyecto: nombre, descripcion, etiquetas)
- DELETE /api/proyectos/{id} (eliminar o archivar proyecto)

**Modelos de base de datos necesarios:**
```
tabla: proyectos
  - id (PK)
  - usuario_id (FK)
  - nombre
  - descripcion
  - estado (activo/archivado)
  - etiquetas (JSON array o tabla separada)
  - avance (porcentaje)
  - fecha_creacion
  - fecha_actualizacion
  - plantilla_origen_id (FK, nullable)

tabla: proyecto_archivos
  - id (PK)
  - proyecto_id (FK)
  - nombre
  - size
  - tipo_mime
  - ruta_almacenamiento
  - usuario_carga_id (FK)
  - fecha_carga

tabla: proyecto_miembros
  - id (PK)
  - proyecto_id (FK)
  - usuario_id (FK)
  - rol (visor/editor/admin)
  - fecha_agregado

tabla: proyecto_datasets
  - id (PK)
  - proyecto_id (FK)
  - archivo_id (FK, nullable)
  - nombre
  - estructura_json (columnas, tipos)
  - registros_count
  - fecha_creacion

tabla: proyecto_historial
  - id (PK)
  - proyecto_id (FK)
  - usuario_id (FK)
  - accion
  - tabla_afectada
  - registro_id_afectado
  - cambios_json
  - fecha
```

---

#### 13.2.3 ANALISIS IA (Motor de Procesamiento)

**Conexiones de entrada:**
- Proyectos: archivos/datasets del proyecto
- Plantillas: prompts predefinidos (opcional)
- Configuracion: nivel tecnico, estilo respuestas, memoria contextual

**Conexiones de salida:**
- Proyectos: guardar KPIs, insights, graficas generadas en el proyecto
- Dashboards: widgets generados automaticamente
- Reportes: datos y insights para incluir en reporte
- Biblioteca: guardar analisis completo para reutilizar
- Chat: respuestas en tiempo real

**Flujos de datos principales:**
| Entrada | Procesamiento | Salida |
|---|---|---|
| archivo (CSV/XLSX/JSON) o texto | Validacion → Deteccion esquema → Calculos → IA | KPIs, graficas, insights, anomalias |
| prompt analitico | Parsing → Contexto datos → LLM → Respuesta | Texto estructurado en chat |
| pregunta en chat (Q&A) | Query datos → Contexto IA → LLM | Respuesta contextualizada + tabla opcional |

**Operaciones backend críticas:**
- POST /api/analisis-ia/procesar (iniciar analisis con archivo/texto/prompt)
- GET /api/analisis-ia/{id}/estado (obtener progreso: leyendo, detectando, calculando...)
- GET /api/analisis-ia/{id}/resultado (obtener resultado completo)
- POST /api/analisis-ia/{id}/chat (enviar pregunta de chat)
- GET /api/analisis-ia/{id}/chat (obtener historial chat)
- POST /api/analisis-ia/{id}/exportar (exportar analisis en JSON/PDF)
- POST /api/analisis-ia/{id}/guardar-biblioteca (guardar en biblioteca)

**Modelos de base de datos necesarios:**
```
tabla: analisis_ia
  - id (PK)
  - usuario_id (FK)
  - proyecto_id (FK, nullable)
  - tipo_entrada (archivo/texto/prompt)
  - archivo_id (FK, nullable)
  - texto_entrada
  - prompt_entrada
  - estado (procesando/completado/error)
  - fecha_inicio
  - fecha_fin
  - tiempo_procesamiento_ms
  - metadata_json

tabla: analisis_ia_kpis
  - id (PK)
  - analisis_id (FK)
  - nombre
  - valor
  - tipo_dato
  - delta_valor (nullable)
  - delta_porcentaje (nullable)
  - fecha_calculo

tabla: analisis_ia_graficas
  - id (PK)
  - analisis_id (FK)
  - tipo (barras/lineas/donut/etc)
  - titulo
  - datos_json
  - config_json

tabla: analisis_ia_insights
  - id (PK)
  - analisis_id (FK)
  - tipo (tendencia/anomalia/prediccion/recomendacion)
  - titulo
  - descripcion
  - confianza_pct
  - datos_soporte_json

tabla: analisis_ia_anomalias
  - id (PK)
  - analisis_id (FK)
  - titulo
  - descripcion
  - nivel_criticidad (critica/advertencia/info)
  - registros_afectados_count

tabla: analisis_ia_predicciones
  - id (PK)
  - analisis_id (FK)
  - metrica_predicha
  - valor_predicho
  - confianza_pct
  - periodo_prediccion

tabla: analisis_ia_chat
  - id (PK)
  - analisis_id (FK)
  - usuario_id (FK)
  - rol (usuario/ia)
  - mensaje
  - tabla_referencia_json (nullable, si la respuesta incluye tabla)
  - fecha
```

---

#### 13.2.4 DASHBOARDS/PANELES (Capa Visual)

**Conexiones de entrada:**
- Analisis IA: datos y widgets generados automaticamente
- Proyectos: datos del proyecto, filtros
- Plantillas: estructura base y widgets
- Biblioteca: widgets/layouts guardados

**Conexiones de salida:**
- Reportes: widgets y visualizaciones para incluir
- Biblioteca: guardar dashboard completo
- Proyectos: dashboard asociado al proyecto

**Flujos de datos:**
| Componente | Tipo de dato | Origen | Destino |
|---|---|---|---|
| Widget KPI | label, valor, delta, direccion | IA o manual | Canvas grid |
| Widget Grafica | tipo, titulo, datos, config | IA o BD | Canvas grid |
| Filtro global | periodo, region, parametros | Usuario | Todos los widgets |
| Widget Heatmap | matriz actividad, dias/horas | BD proyecto | Canvas grid |
| Widget Tabla | columnas, filas, ordenamiento | Dataset proyecto | Canvas grid |

**Operaciones backend críticas:**
- GET /api/dashboards (lista de dashboards del usuario)
- POST /api/dashboards (crear nuevo dashboard)
- GET /api/dashboards/{id} (obtener dashboard con widgets)
- PATCH /api/dashboards/{id} (actualizar nombre/metadata)
- POST /api/dashboards/{id}/widgets (agregar widget)
- PATCH /api/dashboards/{id}/widgets/{widget_id} (editar widget: posicion, tamaño, data)
- DELETE /api/dashboards/{id}/widgets/{widget_id} (eliminar widget)
- POST /api/dashboards/{id}/compartir (compartir dashboard)
- POST /api/dashboards/{id}/exportar (exportar a PNG/PDF)

**Modelos de base de datos necesarios:**
```
tabla: dashboards
  - id (PK)
  - usuario_id (FK)
  - proyecto_id (FK, nullable)
  - nombre
  - descripcion
  - es_favorito
  - es_compartido
  - es_en_vivo
  - layout_config_json (rows, columns)
  - filtros_activos_json
  - fecha_creacion
  - fecha_actualizacion

tabla: dashboard_widgets
  - id (PK)
  - dashboard_id (FK)
  - tipo (kpi/barras/lineas/donut/heatmap/tabla/gauge)
  - titulo
  - posicion_row
  - posicion_col
  - span_ancho (3/4/6/8/12)
  - span_alto (variable o default)
  - config_json (parametros especificos del tipo)
  - fuente_datos_json (tabla, columnas, filtros)
  - datos_json (resultado en cache)
  - fecha_creacion
  - fecha_ultimo_refresco

tabla: dashboard_compartir
  - id (PK)
  - dashboard_id (FK)
  - usuario_compartido_id (FK)
  - rol_acceso (visor/editor)
  - fecha_comparticion

tabla: dashboard_filtros_globales
  - id (PK)
  - dashboard_id (FK)
  - nombre_filtro
  - tipo (fecha/seleccion/rango)
  - valores_activos_json
  - fecha_aplicacion
```

---

#### 13.2.5 REPORTES (Capa de Comunicacion)

**Conexiones de entrada:**
- Dashboards: widgets y visualizaciones
- Analisis IA: insights, resumen, predicciones
- Proyectos: contexto, datos
- Configuracion: formato, frecuencia, preferencias

**Conexiones de salida:**
- Biblioteca: guardar reporte como activo
- Usuarios/Email: distribucion de reportes (opcional)

**Flujos de datos:**
| Componente | Origen | Tipo | Transformacion |
|---|---|---|---|
| Resumen IA | Analisis IA | Texto narrativo | Formato ejecutivo |
| Widgets | Dashboards | Graficas, KPIs | Exportacion a imagen/PDF |
| Datos detalle | Proyectos datasets | Tablas | Incluir en reporte |
| Metadatos | Proyectos | Titulo, periodo, autor | Cabecera y pie |

**Operaciones backend críticas:**
- GET /api/reportes (lista de reportes)
- POST /api/reportes (crear nuevo reporte, seleccionar tipo/periodo/IA)
- GET /api/reportes/{id} (obtener reporte completo)
- PATCH /api/reportes/{id} (editar reporte)
- DELETE /api/reportes/{id} (eliminar reporte)
- POST /api/reportes/{id}/exportar (exportar a PDF/imagen/ZIP)
- POST /api/reportes/{id}/compartir (compartir por email/link)
- POST /api/reportes/generar-periodico (generacion automatica de reportes)

**Modelos de base de datos necesarios:**
```
tabla: reportes
  - id (PK)
  - usuario_id (FK)
  - proyecto_id (FK, nullable)
  - tipo (ejecutivo/financiero/ventas/marketing/rendimiento/custom)
  - nombre
  - descripcion
  - periodo_inicio
  - periodo_fin
  - incluir_resumen_ia
  - estado (borrador/completado/enviado)
  - fecha_creacion
  - fecha_generacion
  - fecha_ultimo_envio

tabla: reporte_bloques
  - id (PK)
  - reporte_id (FK)
  - posicion_orden
  - tipo_bloque (titulo/kpi/grafica/tabla/texto/resumen_ia/comparativa)
  - contenido_json (datos especificos del bloque)
  - widget_id (FK, nullable, si viene de dashboard)
  - insight_id (FK, nullable, si viene de analisis_ia)

tabla: reporte_comparativas
  - id (PK)
  - reporte_id (FK)
  - periodo_1_inicio
  - periodo_1_fin
  - periodo_2_inicio
  - periodo_2_fin
  - metricas_comparar_json

tabla: reporte_distribucion
  - id (PK)
  - reporte_id (FK)
  - destinatario_email
  - frecuencia (unica/diaria/semanal/mensual)
  - proxima_fecha_envio
  - estado_ultimo_envio
  - fecha_creacion
```

---

#### 13.2.6 PLANTILLAS (Acelerador)

**Conexiones de entrada:**
- Biblioteca: plantillas guardadas previamente

**Conexiones de salida:**
- Proyectos: crear proyecto basado en plantilla
- Dashboards: crear dashboard desde plantilla
- Analisis IA: prompts predefinidos (opcional)

**Flujos de datos:**
| Elemento | Uso | Backend |
|---|---|---|
| Template estructura | Base para nuevo proyecto | template_estructura_json |
| Template dashboard | Base para nuevo dashboard | dashboard_widgets blueprint |
| Template dataset mapping | Mapeo de columnas automatico | columnas_mapeo_json |
| Template prompts IA | Preguntas sugeridas | prompts_recomendados_json |

**Operaciones backend críticas:**
- GET /api/plantillas (lista de plantillas publicas)
- GET /api/plantillas?categoria=ventas (filtrar por categoria)
- GET /api/plantillas/{id} (obtener detalle plantilla)
- POST /api/plantillas/{id}/usar (crear proyecto/dashboard desde plantilla)
- POST /api/plantillas/{id}/mapear-columnas (detectar y mapear columnas de archivo)

**Modelos de base de datos necesarios:**
```
tabla: plantillas
  - id (PK)
  - nombre
  - categoria
  - descripcion
  - tiempo_estimado_minutos
  - iconografia_json
  - estructura_proyecto_json (esquema base)
  - estructura_dashboard_json (widgets blueprint)
  - es_publica
  - fecha_creacion
  - descargas_count
  - rating_promedio

tabla: plantillas_formatos_soportados
  - id (PK)
  - plantilla_id (FK)
  - tipo_archivo (csv/xlsx/json/tsv)

tabla: plantillas_componentes
  - id (PK)
  - plantilla_id (FK)
  - tipo_componente (dataset/dashboard/reporte/kpi)
  - descripcion
  - orden

tabla: plantillas_mapeo_columnas
  - id (PK)
  - plantilla_id (FK)
  - columna_esperada
  - tipo_dato_esperado
  - valores_ejemplo_json
  - es_requerida
```

---

#### 13.2.7 BIBLIOTECA (Repositorio de Activos)

**Conexiones de entrada (consume y almacena de):**
- Proyectos: archivos, datasets
- Analisis IA: analisis completos
- Dashboards: dashboards completos
- Reportes: reportes completos
- KPIs, Graficas, Prompts IA: activos individuales

**Conexiones de salida (proporciona a):**
- Todos los sectores: reutilizacion de activos

**Flujos de datos:**
| Tipo recurso | Origen | Operacion | Destino potencial |
|---|---|---|---|
| Dashboard | Paneles | Guardar | Reutilizar en otro proyecto |
| Grafica | Analisis IA | Guardar | Agregar a otros dashboards |
| Reporte | Reportes | Guardar | Crear variantes, reutilizar estructura |
| KPI | Analisis IA | Guardar | Incluir en dashboards/reportes |
| Prompt IA | Analisis IA | Guardar | Reutilizar para analisis similares |
| Dataset | Proyectos | Guardar | Referencia cruzada entre proyectos |

**Operaciones backend críticas:**
- GET /api/biblioteca (lista de recursos del usuario)
- GET /api/biblioteca?tipo=dashboard (filtrar por tipo)
- GET /api/biblioteca/{id} (obtener recurso detallado)
- POST /api/biblioteca (guardar nuevo recurso desde cualquier sector)
- PATCH /api/biblioteca/{id} (actualizar metadata: nombre, etiquetas, descripcion)
- DELETE /api/biblioteca/{id} (eliminar recurso)
- POST /api/biblioteca/{id}/versionar (crear nueva version)
- GET /api/biblioteca/{id}/historial-versiones (obtener todas las versiones)
- POST /api/biblioteca/{id}/restaurar-version (volver a version anterior)
- POST /api/biblioteca/{id}/duplicar (crear copia de recurso)
- POST /api/biblioteca/{id}/exportar (exportar a JSON/ZIP)
- POST /api/biblioteca/importar (importar recurso desde archivo)
- GET /api/biblioteca/buscar?q=texto (busqueda full-text)

**Modelos de base de datos necesarios:**
```
tabla: biblioteca_recursos
  - id (PK)
  - usuario_id (FK)
  - tipo (dashboard/kpi/grafica/reporte/prompt_ia/layout/dataset)
  - nombre
  - descripcion
  - etiquetas (JSON array)
  - contenido_json (el activo serializado)
  - formato_exportacion
  - es_publico
  - fecha_creacion
  - fecha_actualizacion
  - descargas_count
  - rating_usuario

tabla: biblioteca_versiones
  - id (PK)
  - recurso_id (FK)
  - numero_version
  - contenido_json (snapshot del activo)
  - cambios_resumen
  - usuario_id (FK)
  - fecha_version
  - es_version_actual

tabla: biblioteca_uso
  - id (PK)
  - recurso_id (FK)
  - usuario_id (FK)
  - entidad_tipo_referencia (proyecto/dashboard/reporte)
  - entidad_id_referencia (FK)
  - fecha_ultimo_uso
  - cantidad_usos_total

tabla: biblioteca_compartir
  - id (PK)
  - recurso_id (FK)
  - usuario_compartido_id (FK)
  - rol_acceso (visor/editor)
  - fecha_comparticion

tabla: biblioteca_etiquetas
  - id (PK)
  - nombre_etiqueta
  - usuario_id (FK)
  - fecha_creacion
```

---

#### 13.2.8 CONFIGURACION (Personalizacion Global)

**Conexiones de salida (aplica preferencias a):**
- Todos los sectores: idioma, moneda, formato, tema
- Analisis IA: estilo respuestas, nivel tecnico, memoria contextual
- Notificaciones: frecuencia, canales

**Flujos de datos:**
| Bloque | Configuracion | Afecta a |
|---|---|---|
| Perfil | Foto, nombre, empresa, logo | Todos los sectores (identidad) |
| Preferencias | Idioma, moneda, fecha, numero | Todos (formateo de valores) |
| IA | Estilo respuestas, nivel tecnico, foco negocio | Analisis IA, Chat |
| Sistema | Modo oscuro, notificaciones, 2FA, cierre automatico | Todos (UX/Seguridad) |

**Operaciones backend críticas:**
- GET /api/configuracion/usuario (obtener todas las preferencias)
- PATCH /api/configuracion/perfil (actualizar perfil)
- PATCH /api/configuracion/preferencias (actualizar preferencias)
- PATCH /api/configuracion/ia (actualizar parametros IA)
- PATCH /api/configuracion/sistema (actualizar sistema)
- POST /api/configuracion/habilitar-2fa (activar autenticacion 2FA)
- POST /api/configuracion/cambiar-contrasena (cambiar password)
- POST /api/configuracion/exportar-datos (GDPR: descargar datos personales)
- POST /api/configuracion/eliminar-cuenta (GDPR: eliminar cuenta)

**Modelos de base de datos necesarios:**
```
tabla: usuarios
  - id (PK)
  - email (UNIQUE)
  - hash_contrasena
  - nombre_completo
  - foto_url
  - empresa
  - logo_empresa_url
  - estado_activo
  - fecha_creacion
  - fecha_ultimo_login
  - fecha_ultimo_logout

tabla: usuarios_preferencias
  - id (PK)
  - usuario_id (FK, UNIQUE)
  - idioma
  - moneda
  - formato_fecha
  - formato_numero
  - tema (claro/oscuro)
  - notificaciones_email_activas
  - notificaciones_push_activas
  - frecuencia_reportes (diaria/semanal/mensual)
  - cierre_sesion_automatico_minutos
  - 2fa_activado
  - 2fa_metodo (sms/app/email)

tabla: usuarios_ia_preferencias
  - id (PK)
  - usuario_id (FK, UNIQUE)
  - estilo_respuestas (conciso/detallado/narrativo)
  - nivel_tecnico (1-10 slider)
  - foco_negocio (texto)
  - memoria_contextual_activa
  - max_mensajes_contexto

tabla: usuarios_sesiones
  - id (PK)
  - usuario_id (FK)
  - token_sesion (JWT o similar)
  - ip_origen
  - user_agent
  - fecha_inicio
  - fecha_expiracion
  - fecha_ultimo_uso
  - activa

tabla: usuarios_actividad_auditoria
  - id (PK)
  - usuario_id (FK)
  - accion (login/logout/cambio_config/export/delete)
  - ip
  - user_agent
  - resultado (exitoso/error)
  - mensaje_error (nullable)
  - fecha
```

---

### 13.3 Matriz de dependencias entre sectores

Esta matriz muestra qué sectores dependen de cuáles:

```
          I  P  IA D  R  PL B  C
Inicio    -  ✓  ✓  ✓  ✓  -  ✓  -
Proyectos ✓  -  ✓  ✓  ✓  ✓  ✓  ✓
AnalisisIA ✓  ✓  -  ✓  ✓  ✓  ✓  ✓
Dashboards ✓  ✓  ✓  -  ✓  ✓  ✓  ✓
Reportes  ✓  ✓  ✓  ✓  -  ✓  ✓  ✓
Plantillas ✓  ✓  ✓  ✓  ✓  -  ✓  ✓
Biblioteca ✓  ✓  ✓  ✓  ✓  ✓  -  ✓
Configuracion ✓  ✓  ✓  ✓  ✓  ✓  ✓  -

Leyenda:
I=Inicio, P=Proyectos, IA=AnalisisIA, D=Dashboards, R=Reportes, PL=Plantillas, B=Biblioteca, C=Configuracion
✓ = dependencia/conexion
```

---

### 13.4 Tablas transversales (necesarias en todos los casos)

```
tabla: usuarios (ver Configuracion)

tabla: auditoria_acciones
  - id (PK)
  - usuario_id (FK)
  - accion (crear/editar/eliminar/compartir)
  - entidad_tipo (proyecto/dashboard/reporte/analisis)
  - entidad_id
  - fecha_hora
  - ip_origen
  - cambios_json (nullable, diff de cambios)

tabla: comparticiones
  - id (PK)
  - usuario_propietario_id (FK)
  - usuario_receptor_id (FK)
  - entidad_tipo (proyecto/dashboard/reporte)
  - entidad_id
  - rol_acceso (visor/editor/admin)
  - fecha_comparticion
  - fecha_expiracion (nullable, para links publicos temporales)
  - comentario (nullable)

tabla: comentarios
  - id (PK)
  - usuario_id (FK)
  - entidad_tipo (dashboard/reporte/analisis)
  - entidad_id
  - texto
  - es_resuelto
  - fecha_creacion
  - fecha_resolucion (nullable)

tabla: notificaciones
  - id (PK)
  - usuario_id (FK)
  - tipo (nueva_comparticion/reporte_completado/alerta_sistema/comentario)
  - titulo
  - descripcion
  - entidad_tipo (nullable)
  - entidad_id (nullable)
  - url_accion (nullable)
  - leida
  - fecha_creacion
  - fecha_lectura (nullable)

tabla: errores_sistema
  - id (PK)
  - usuario_id (FK, nullable)
  - tipo_error (validation/processing/api/database)
  - mensaje_error
  - stack_trace
  - contexto_json (entidad_tipo, entidad_id, etc)
  - fecha
  - resuelta (para seguimiento)
```

---

### 13.5 Relaciones clave de base de datos (Diagrama ER conceptual)

```
usuarios
  ├─ 1:N ─→ proyectos
  │         ├─ 1:N ─→ proyecto_archivos
  │         ├─ 1:N ─→ proyecto_datasets
  │         ├─ 1:N ─→ proyecto_kpis
  │         ├─ 1:N ─→ proyecto_historial
  │         └─ N:M ─→ usuarios (miembros via proyecto_miembros)
  │
  ├─ 1:N ─→ analisis_ia
  │         ├─ 1:N ─→ analisis_ia_kpis
  │         ├─ 1:N ─→ analisis_ia_graficas
  │         ├─ 1:N ─→ analisis_ia_insights
  │         ├─ 1:N ─→ analisis_ia_anomalias
  │         └─ 1:N ─→ analisis_ia_chat
  │
  ├─ 1:N ─→ dashboards
  │         ├─ 1:N ─→ dashboard_widgets
  │         ├─ 1:N ─→ dashboard_compartir
  │         └─ 1:N ─→ dashboard_filtros_globales
  │
  ├─ 1:N ─→ reportes
  │         ├─ 1:N ─→ reporte_bloques
  │         ├─ 1:N ─→ reporte_comparativas
  │         └─ 1:N ─→ reporte_distribucion
  │
  ├─ 1:N ─→ biblioteca_recursos
  │         ├─ 1:N ─→ biblioteca_versiones
  │         ├─ 1:N ─→ biblioteca_uso
  │         ├─ 1:N ─→ biblioteca_compartir
  │         └─ 1:N ─→ biblioteca_etiquetas
  │
  ├─ 1:1 ─→ usuarios_preferencias
  ├─ 1:1 ─→ usuarios_ia_preferencias
  ├─ 1:N ─→ usuarios_sesiones
  └─ 1:N ─→ usuarios_actividad_auditoria

plantillas
  ├─ 1:N ─→ plantillas_formatos_soportados
  ├─ 1:N ─→ plantillas_componentes
  └─ 1:N ─→ plantillas_mapeo_columnas
```

---

### 13.6 Operaciones comunes entre sectores (Patrones de API)

Estas operaciones se repiten en varios sectores y deben tener un patrón consistente:

**Crear recurso:**
```
POST /api/{sector}/{recurso}
Request: { nombre, descripcion, etiquetas?, ... }
Response: { id, nombre, ... }
```

**Listar recursos:**
```
GET /api/{sector}/{recurso}?limit=20&offset=0&orderby=actualizacion&filtro=activo
Response: { items: [...], total, pagina }
```

**Obtener detalle:**
```
GET /api/{sector}/{recurso}/{id}
Response: { id, nombre, ... datos completos ... }
```

**Actualizar:**
```
PATCH /api/{sector}/{recurso}/{id}
Request: { campo1, campo2 }
Response: { id, ... }
```

**Eliminar:**
```
DELETE /api/{sector}/{recurso}/{id}
Response: { mensaje: "Eliminado" }
```

**Compartir:**
```
POST /api/{sector}/{recurso}/{id}/compartir
Request: { usuario_id, rol_acceso }
Response: { id, usuario_id, rol_acceso }
```

**Guardar en biblioteca:**
```
POST /api/biblioteca
Request: { tipo, nombre, contenido_json, etiquetas }
Response: { id, ... }
```

---

### 13.7 Estrategia de caching y sincronizacion recomendada

**Datos que deben estar en cache (Redis/MemCache):**
- Dashboards activos con sus widgets (invalidar en PATCH)
- Proyectos activos del usuario (invalidar en PATCH)
- Ultimos analisis IA (invalida al completar nuevo)
- Configuracion del usuario (invalida al PATCH)
- Plantillas publicas (cache largo, invalida cada 24h)

**Datos que deben actualizarse en tiempo real (WebSocket/SSE):**
- Progreso de analisis IA (estado del procesamiento)
- Notificaciones nuevas
- Cambios en dashboards compartidos (por otros usuarios)
- Alertas criticas

**Datos que pueden ser asincronos (Colas/Jobs):**
- Exportacion de reportes (PDF/Excel)
- Generacion periodica de reportes
- Refresco de datos en dashboards en vivo
- Procesamiento de archivos grandes en Analisis IA

---

## 14. Resumen final

Cada sector de Metrify tiene un rol definido y complementario:

- Inicio orienta.
- Proyectos organiza.
- Analisis IA descubre.
- Dashboards visualiza.
- Reportes comunica.
- Plantillas acelera.
- Biblioteca preserva y reutiliza.
- Configuracion adapta.

La plataforma entrega su maximo valor cuando se usa como sistema integrado y no como modulos aislados. El diseño del backend debe reflejar estas conexiones mediante relaciones claras de base de datos, APIs cohesivas, y mecanismos robustos de sincronizacion y cache.