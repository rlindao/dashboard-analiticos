import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface FileUploadProps {
  onDataLoad: (data: any[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoad }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
      setError('Por favor, selecciona un archivo Excel válido (.xlsx, .xls, .csv)');
      return;
    }

    setIsLoading(true);
    setError(null);

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        onDataLoad(jsonData);
        setIsLoading(false);
      } catch (err) {
        setError('Error al procesar el archivo. Asegúrate de que sea un Excel válido.');
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Error al leer el archivo');
      setIsLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    
    if (file) {
      const input = document.createElement('input');
      input.type = 'file';
      input.files = event.dataTransfer.files;
      input.onchange = (e) => handleFileUpload(e as any);
      input.click();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="file-upload">
      <div className="upload-header">
        <h2>📁 Subir Archivo Excel</h2>
        <p>Arrastra tu archivo aquí o haz clic para seleccionarlo</p>
      </div>

      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="drop-content">
          <div className="upload-icon">📊</div>
          <h3>Arrastra tu archivo Excel aquí</h3>
          <p>o</p>
          <label className="upload-button">
            Selecciona un archivo
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
          <p className="file-types">Archivos soportados: .xlsx, .xls, .csv</p>
        </div>
      </div>

      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Procesando archivo...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>❌ {error}</p>
        </div>
      )}

      <div className="instructions">
        <h3>📋 Instrucciones</h3>
        <ul>
          <li>Selecciona un archivo Excel o CSV desde tu computadora</li>
          <li>El archivo debe tener una estructura de tabla con encabezados</li>
          <li>Los datos numéricos se usarán para generar gráficos automáticamente</li>
          <li>El máximo de tamaño recomendado es 10MB</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;