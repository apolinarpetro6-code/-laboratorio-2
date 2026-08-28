# Sistema de Notas - Laboratorio 2

Sistema web profesional para gestión de notas de estudiantes con base de datos en Supabase.

## 🚀 Características

- ✨ Interfaz web moderna y responsive
- 📊 Cálculo automático de promedios
- 🎯 Determinación de estado (Aprobado/Reprobado)
- 💾 Almacenamiento en base de datos Supabase
- 📚 Historial de estudiantes
- 🎨 Diseño profesional con animaciones
- 📱 Compatible con móvil y escritorio

## 📋 Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Cuenta en Supabase (gratis)
- Conexión a internet

## 🔧 Configuración

### 1. Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto llamado `laboratorio-2`
3. En el SQL Editor, ejecuta este código:

```sql
CREATE TABLE IF NOT EXISTS estudiantes (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    nota1 FLOAT8 NOT NULL CHECK (nota1 >= 0 AND nota1 <= 5),
    nota2 FLOAT8 NOT NULL CHECK (nota2 >= 0 AND nota2 <= 5),
    nota3 FLOAT8 NOT NULL CHECK (nota3 >= 0 AND nota3 <= 5),
    promedio FLOAT8 NOT NULL,
    estado TEXT NOT NULL,
    fecha_creacion TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE estudiantes ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Permitir inserciones públicas" 
ON estudiantes FOR INSERT 
WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Permitir lecturas públicas" 
ON estudiantes FOR SELECT 
USING (true);
```

### 2. Configurar credenciales

Abre el archivo `app.js` y reemplaza estas líneas con tus credenciales de Supabase:

```javascript
const SUPABASE_URL = 'tu-url-de-supabase';
const SUPABASE_KEY = 'tu-anon-key';
```

Puedes obtener estas credenciales en:
- Settings > API > Project URL
- Settings > API > anon / public key

## 🎮 Uso

### Versión Web (Recomendada)

1. Abre el archivo `index.html` en tu navegador
2. Completa el formulario con:
   - Nombre del estudiante
   - Nota 1 (0.0 - 5.0)
   - Nota 2 (0.0 - 5.0)
   - Nota 3 (0.0 - 5.0)
3. Haz clic en "Calcular y Guardar"
4. El sistema mostrará el resultado y lo guardará en la base de datos
5. El historial se actualizará automáticamente

### Versión Python (Local)

```bash
python mini_reporte.py "Nombre del Estudiante" 4.0 5.0 4.5
```

O modo interactivo:
```bash
python mini_reporte.py
```

## 📁 Estructura del Proyecto

```
laboratorio-2/
├── index.html              # Interfaz web principal
├── app.js                  # Lógica JavaScript y conexión Supabase
├── estilos_modernos.css    # Estilos CSS modernos
├── mini_reporte.py         # Script Python original
├── plantilla.html          # Plantilla HTML original
├── estilos.css             # Estilos CSS original
├── setup_supabase.py       # Script para configurar Supabase
├── README.md               # Este archivo
└── .gitignore              # Archivos ignorados por Git
```

## 🎨 Características del Diseño

- **Gradientes modernos**: Colores vibrantes y profesionales
- **Animaciones suaves**: Transiciones elegantes
- **Responsive**: Se adapta a cualquier dispositivo
- **Barra de progreso**: Visualización del promedio
- **Indicadores de estado**: Colores para aprobado/reprobado
- **Historial interactivo**: Registro de todos los estudiantes

## 🔒 Seguridad

- Las políticas de RLS (Row Level Security) de Supabase protegen los datos
- Validación de entrada en frontend y backend
- Notas restringidas entre 0.0 y 5.0

## 🚀 Despliegue

### GitHub Pages

1. Sube el repositorio a GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main`
4. Tu aplicación estará disponible en: `https://tu-usuario.github.io/laboratorio-2/`

## 📊 Funcionamiento

1. **Ingreso de datos**: Usuario completa el formulario
2. **Validación**: Sistema verifica que los datos sean correctos
3. **Cálculo**: Se calcula el promedio de las 3 notas
4. **Determinación**: Se establece si está aprobado (promedio >= 3.0)
5. **Almacenamiento**: Datos se guardan en Supabase
6. **Visualización**: Resultado se muestra en tiempo real
7. **Historial**: Registro se añade al historial

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Supabase (PostgreSQL)
- **Scripting**: Python 3
- **Despliegue**: GitHub Pages

## 💡 Tips

- Para desarrollo local, usa la versión web abriendo `index.html`
- Para producción, despliega en GitHub Pages
- El historial se carga automáticamente al iniciar
- Puedes limpiar el historial con el botón "Limpiar Todo"

## 📝 Notas

- Las notas deben estar entre 0.0 y 5.0
- El promedio >= 3.0 se considera APROBADO
- El promedio < 3.0 se considera REPROBADO
- Todos los datos se almacenan en la nube (Supabase)

## 🤝 Contribuciones

Este proyecto fue desarrollado como Laboratorio 2 para el curso de programación.

---

💖 Desarrollado con amor - Laboratorio 2