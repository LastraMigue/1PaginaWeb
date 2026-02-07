# 🖥️ Web de Montaje y Venta de PCs Gaming

Proyecto de una **Single Page Application simulada** para el montaje y venta de ordenadores de sobremesa, con estética **Gamer / Tech profesional** y totalmente responsive.

---

## 1. Prompt Principal – Desarrollo del Proyecto

### Rol
Actúa como un **Desarrollador Web Senior (Full Stack)** y **experto en UI/UX**.

### Objetivo
Crear una **página web completa, moderna y responsiva**, simulando una SPA, orientada al **montaje personalizado y venta de PCs de sobremesa**.

### Requisitos Técnicos

- **Stack**
  - HTML5  
  - CSS3  
  - JavaScript (Vanilla)  
  - Sin frameworks ni librerías externas

- **Diseño**
  - Estética **Gamer / Tech profesional**
  - Fondo oscuro con acentos neón
  - Tipografías modernas
  - Totalmente **Responsive** (móvil, tablet y escritorio)

- **Imágenes**
  - Uso de **placeholders dinámicos**  
    Ejemplo: `https://via.placeholder.com/300x200?text=GPU+RTX`
  - Texto descriptivo para simular componentes reales

- **Animaciones**
  - Transiciones suaves en hover (CSS Transitions)
  - Animaciones de entrada:
    - Fade-in
    - Slide-up
  - Activadas al cargar o hacer scroll

### Estructura y Contenido

- **Identidad**
  - Nombre comercial llamativo  
  _(Ej: NexusBuilds, CoreMaster o uno original)_
  - Título / Eslogan impactante

- **Header y Navegación**
  - Menú **Sticky**
  - Menú desplegable con categorías:
    - CPU
    - GPU
    - RAM
    - Almacenamiento
    - Fuente
    - Caja

#### Sección Hero (Inicio)
- Introducción breve y persuasiva
- Botones **CTA** claros y visibles

#### Sección: *El Olimpo del Hardware*
Ranking de **3–4 configuraciones predefinidas**:

- Gama Entrada
- Gama Media
- Gama Alta / Ultra Entusiasta

Cada tarjeta debe incluir:
- Imagen
- Lista de especificaciones
- Precio
- Puntuaciones visuales:
  - Rendimiento (1–10)
  - Relación Calidad-Precio

#### Sección: *Configurador Maestro*
Configurador de PC personalizado con lógica en tiempo real.

**Base de datos simulada (JavaScript / JSON):**
- Mínimo 3 opciones por componente:
  - Procesador
  - Gráfica
  - RAM
  - Almacenamiento
  - Fuente
  - Caja

**Interfaz:**
- Selectores o tarjetas seleccionables
- Imagen + nombre + precio por componente

**Lógica dinámica:**
- Precio total actualizado en tiempo real
- Puntuación de rendimiento estimada
- Barra **Calidad–Precio (0–100)**:
  - Cambio de color y tamaño según resultado

#### Creatividad Adicional
Añadir **al menos una funcionalidad extra**, por ejemplo:
- Exportar presupuesto a PDF
- Modo Oscuro / Claro
- Comparador de FPS simulado
- Soporte técnico con IA simulada

---

## 2. Prompt Secundario – Correcciones y Mejoras

### Problemas Detectados

- Al cargar la página, **el scroll baja automáticamente al final**
- El contenido inicial no está correctamente alineado
- El logotipo invade el espacio del texto

### Cambios Solicitados

- Evitar cualquier **scroll automático** al cargar la web  
  → La página debe comenzar **siempre desde arriba**

- Centrar mejor el bloque:
  - Título **“Construye tu leyenda”**
  - Texto introductorio

- Desplazar el **logotipo hacia la derecha**
  - Sin que se superponga con el texto
  - Manteniendo una separación clara y estable
  - Sin que los elementos se monten al redimensionar la pantalla

---

## 3. Prompt Terciario – Ajustes Finales y Reglas de Funcionamiento

### Gestión de Enlaces

- **Footer**
  - Todos los enlaces de la parte inferior **NO deben funcionar**
  - **Únicamente** deben estar activos los enlaces del apartado **“Enlaces rápidos”**
  - El resto de enlaces:
    - No deben redirigir
    - No deben lanzar errores
    - No deben ejecutar ninguna acción

### Cambios de Texto Obligatorios

- Sustituir el texto:
  - `Call of duty` → **Call of Duty: Black Ops 6**
- Sustituir el texto:
  - `Exportar PDF` → **Exportar TXT**

### Reglas del Configurador (Lógica Obligatoria)

- **Selección completa obligatoria**
  - Todos los componentes deben estar seleccionados para:
    - Comprar el PC
    - Exportar el archivo TXT
    - Mostrar la puntuación de rendimiento
    - Calcular y mostrar la barra Calidad–Precio

- **Restricciones**
  - No se permiten resultados parciales
  - No se permiten cálculos incompletos
  - No se permite exportación sin selección total

- **Feedback al usuario**
  - Botones de acción deshabilitados si falta algún componente
  - Mensaje visual claro indicando qué falta por seleccionar

### Ajustes Visuales de Inicio

- **Logotipo principal**
  - Reubicar el logotipo:
    - Ligeramente más **a la izquierda**
    - Ligeramente más **arriba**
  - Condiciones:
    - No debe solaparse con el texto
    - No debe montarse con el título **“Construye tu leyenda”**
    - Debe mantenerse estable en todos los tamaños de pantalla

---

## 4. Prompt Cuarto – Gestión de Imágenes

### Origen de las Imágenes

- Todas las imágenes de la web deben cargarse únicamente desde la carpeta `/img`.
- No se deben usar placeholders ni enlaces externos.

### Sustitución

- Reemplazar todas las imágenes actuales por las correspondientes dentro de `img`.
- Usar los nombres de archivo como referencia para asociarlas correctamente.

### Estandarización

- Todas las imágenes deben tener un **tamaño uniforme** acorde al diseño.
- Deben mantener proporciones correctas (sin deformaciones).

---

## 5. Prompt Quinto – Actualizaciones de Contenido y Placa Base

### Imágenes de Juegos
- Actualizar las imágenes de:
  - **VALORANT**
  - **FORTNITE**
  - **APEX**
- Usar las imágenes correspondientes que ya existen en la carpeta `/IMAGENES`.

### Sección Contacto
Actualizar los datos de contacto con la siguiente información:

- **Correo:** miguelangelkiuren@alumnos.ilerna.com  
- **Teléfono:** +34 601 76 48 42  
- **Dirección:** Sevilla, España

### Configurador – Placa Base

- Añadir una nueva categoría obligatoria:
  - **Placa Base**

- Generar **3 opciones**:
  - Gama baja
  - Gama media
  - Gama alta

- Cada placa base debe incluir:
  - Imagen
  - Nombre
  - Precio
  - Puntuación de rendimiento

- La placa base debe:
  - Ser obligatoria para comprar
  - Ser obligatoria para exportar TXT
  - Afectar al rendimiento total y a la barra Calidad–Precio

### Equipos Preconfigurados

- Integrar la **Placa Base** en:
  - Todos los ordenadores preconfigurados
  - Las listas de especificaciones visibles

---

## 6. Prompt Sexto – Actualización y Ajuste de Imágenes

### Sustitución de Imágenes

- Actualizar nuevamente las imágenes de:
  - **FORTNITE**
  - **VALORANT**
  - **APEX**
- Usar las imágenes ubicadas en la ruta:
  - `PaginaWebPC/img`

- Actualizar también las imágenes correspondientes a:
  - **Placa Base**

- Las imágenes ya cuentan con nombres descriptivos:
  - Usarlos como referencia directa
  - Asociarlas correctamente a su contenido

### Ajuste de Tamaño

- Ajustar estas imágenes al **mismo tamaño** que el resto de imágenes de su sección.
- Mantener proporciones correctas, sin deformaciones.
- Asegurar coherencia visual dentro de cada sección.
