import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

interface CloudFileProps {
  onDataLoad: (data: any[]) => void;
}

const CloudFile: React.FC<CloudFileProps> = ({ onDataLoad }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const sampleUrls = [
    {
      name: 'Ventas Mensuales (Ejemplo)',
      url: 'https://raw.githubusercontent.com/datasets/investor-flow-of-funds-us/master/data/weekly.csv'
    },
    {
      name: 'Datos de Ejemplo - CSV',
      url: 'https://raw.githubusercontent.com/plotly/datasets/master/2014_apple_stock.csv'
    }
  ];

  const handleLoadFromUrl = async () => {
    if (!url.trim()) {
      setError('Por favor, ingresa una URL válida');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 30000
      });

      let data: any;
      const contentType = response.headers['content-type'] || '';

      if (contentType.includes('application/json')) {
        const text = new TextDecoder().decode(response.data);
        const jsonData = JSON.parse(text);
        data = Array.isArray(jsonData) ? jsonData : [jsonData];
      } else {
        const workbook = XLSX.read(response.data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        data = XLSX.utils.sheet_to_json(worksheet);
      }

      if (!data || data.length === 0) {
        throw new Error('No se encontraron datos en el archivo');
      }

      onDataLoad(data);
      setSuccess(`✅ Se cargaron exitosamente ${data.length} registros`);
      setIsLoading(false);
    } catch (err: any) {
      setError(`❌ Error al cargar el archivo: ${err.message}`);
      setIsLoading(false);
    }
  };

  const handleSampleUrl = (sampleUrl: string) => {
    setUrl(sampleUrl);
  };

  return (
    <div className="cloud-file">
      <div className="cloud-header">
        <h2>☁️ Cargar Excel desde la Nube</h2>
        <p>Ingresa la URL de un archivo Excel o CSV alojado en la web</p>
      </div>

      <div className="url-input-section">
        <div className="input-group">
          <label htmlFor="url-input">URL del archivo:</label>
          <div className="input-wrapper">
            <input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://ejemplo.com/datos.xlsx"
              className="url-input"
            />
            <button 
              onClick={handleLoadFromUrl}
              disabled={isLoading || !url.trim()}
              className="load-button"
            >
              {isLoading ? 'Cargando...' : 'Cargar Datos'}
            </button>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Descargando y procesando archivo...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="success">
          <p>{success}</p>
        </div>
      )}

      <div className="sample-urls">
        <h3>🔗 URLs de Ejemplo</h3>
        <p>Puedes probar estas URLs de ejemplo:</p>
        <div className="url-buttons">
          {sampleUrls.map((sample, index) => (
            <button
              key={index}
              onClick={() => handleSampleUrl(sample.url)}
              className="sample-button"
            >
              📊 {sample.name}
            </button>
          ))}
        </div>
      </div>

      <div className="instructions">
        <h3>📋 Instrucciones</h3>
        <ul>
          <li>La URL debe apuntar directamente a un archivo Excel (.xlsx, .xls) o CSV</li>
          <li>El archivo debe ser accesible públicamente sin autenticación</li>
          <li>Asegúrate de que el servidor permita CORS (Cross-Origin Resource Sharing)</li>
          <li>Para archivos de Google Drive, usa la opción "Publicar en la web"</li>
          <li>Para archivos de GitHub, usa el enlace "Raw"</li>
        </ul>
        
        <div className="tips">
          <h4>💡 Consejos:</h4>
          <ul>
            <li><strong>GitHub:</strong> Haz clic en &quot;Raw&quot; para obtener la URL directa</li>
            <li><strong>Google Drive:</strong> Comparte &gt; Publicar en la web &gt; Copiar enlace</li>
            <li><strong>Dropbox:</strong> Genera un enlace compartido y reemplaza &quot;dl=0&quot; por &quot;dl=1&quot;</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CloudFile;