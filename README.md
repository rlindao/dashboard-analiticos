# 📊 Dashboard Analítico de Datos

Un dashboard interactivo para visualizar datos de archivos Excel con múltiples opciones de carga.

## 🚀 Características

- 📁 **Subir archivos locales**: Carga archivos Excel (.xlsx, .xls) y CSV directamente desde tu computadora
- ☁️ **Cargar desde la nube**: Ingresa la URL de un archivo Excel/CSV alojado en la web
- 📊 **Visualizaciones automáticas**: Genera gráficos de barras, circulares y estadísticas automáticamente
- 📋 **Vista de datos tabular**: Consulta todos los datos en formato de tabla
- 📱 **Responsive design**: Funciona perfectamente en desktop y móviles
- 🎨 **Interfaz moderna**: Diseño atractivo con animaciones y transiciones suaves

## 🛠️ Tecnologías

- **React 19** con TypeScript
- **Chart.js** para visualizaciones
- **XLSX** para leer archivos Excel
- **Axios** para solicitudes HTTP
- **GitHub Pages** para despliegue

## 📦 Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/[TU-USERNAME]/dashboard-analitico.git
cd dashboard-analitico
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 🚀 Despliegue en GitHub Pages

### Configuración inicial

1. Cambia `[TU-USERNAME]` en `package.json` por tu nombre de usuario de GitHub:
```json
"homepage": "https://[TU-USERNAME].github.io/dashboard-analitico"
```

2. Asegúrate de tener habilitados GitHub Pages en tu repositorio:
   - Ve a Settings > Pages en tu repositorio
   - Selecciona "GitHub Actions" o "Deploy from a branch"

3. Despliega la aplicación:
```bash
npm run deploy
```

La aplicación estará disponible en: `https://[TU-USERNAME].github.io/dashboard-analitico`

## 📖 Uso

### 1. Datos del Repositorio
Al iniciar, el dashboard carga automáticamente un archivo CSV de ejemplo con datos de ventas mensuales.

### 2. Subir Archivo Local
- Haz clic en "📁 Subir Excel"
- Arrastra un archivo Excel/CSV o haz clic para seleccionarlo
- El sistema procesará el archivo y generará visualizaciones automáticamente

### 3. Cargar desde la Nube
- Haz clic en "☁️ Excel en la Nube"
- Ingresa la URL directa del archivo Excel/CSV
- Puedes usar las URLs de ejemplo para probar la funcionalidad

### 4. Visualización de Datos
- **Dashboard principal**: Muestra estadísticas, gráficos y tabla de datos
- **Gráfico de barras**: Compara valores numéricos
- **Gráfico circular**: Muestra proporciones de los datos
- **Tabla completa**: Vista detallada de todos los registros

## 🔧 Formatos Soportados

- **Excel**: .xlsx, .xls
- **CSV**: .csv
- **JSON** (desde URLs)

## 💡 Consejos para URLs en la Nube

### GitHub
- Usa el enlace "Raw" para obtener la URL directa
- Ejemplo: `https://raw.githubusercontent.com/user/repo/main/data.csv`

### Google Drive
1. Comparte el archivo > Publicar en la web
2. Copia el enlace generado
3. Asegúrate de que sea un enlace público

### Dropbox
- Genera un enlace compartido
- Reemplaza `dl=0` con `dl=1` al final del enlace

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork este repositorio
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🌟 Demo

Puedes ver una demostración en vivo del dashboard en:
`https://[TU-USERNAME].github.io/dashboard-analitico`

---

Creado con ❤️ usando React y Chart.js
