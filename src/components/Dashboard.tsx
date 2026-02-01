import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface DashboardProps {
  data: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [repositoryData, setRepositoryData] = useState<any[]>([]);

  useEffect(() => {
    loadRepositoryData();
  }, []);

  const loadRepositoryData = async () => {
    try {
      const localDataUrl = '/datos-ejemplo.csv';
      
      const response = await axios.get(localDataUrl);
      const csv = response.data;
      const workbook = XLSX.read(csv, { type: 'string' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      setRepositoryData(jsonData);
    } catch (error) {
      console.log('Usando datos de ejemplo estáticos...');
      const exampleData = [
        { mes: 'Enero', ventas: 15000, costos: 8000, ganancias: 7000, productos_vendidos: 120 },
        { mes: 'Febrero', ventas: 18000, costos: 9000, ganancias: 9000, productos_vendidos: 145 },
        { mes: 'Marzo', ventas: 22000, costos: 10000, ganancias: 12000, productos_vendidos: 180 },
        { mes: 'Abril', ventas: 19000, costos: 9500, ganancias: 9500, productos_vendidos: 155 },
        { mes: 'Mayo', ventas: 25000, costos: 11000, ganancias: 14000, productos_vendidos: 200 },
        { mes: 'Junio', ventas: 28000, costos: 12000, ganancias: 16000, productos_vendidos: 225 },
      ];
      setRepositoryData(exampleData);
    }
  };

  const displayData = data.length > 0 ? data : repositoryData;

  if (!displayData || displayData.length === 0) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>📊 Dashboard Analítico</h2>
          <p>No hay datos disponibles. Por favor, carga un archivo Excel.</p>
        </div>
      </div>
    );
  }

  const columns = Object.keys(displayData[0]);
  const numericColumns = columns.filter(col => 
    typeof displayData[0][col] === 'number' || 
    !isNaN(Number(displayData[0][col]))
  );

  const barChartData = {
    labels: displayData.map((row, index) => row[columns[0]] || `Fila ${index + 1}`),
    datasets: numericColumns.slice(0, 3).map((col, index) => ({
      label: col,
      data: displayData.map(row => Number(row[col]) || 0),
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'][index],
    })),
  };

  const pieChartData = {
    labels: numericColumns.slice(0, 4),
    datasets: [{
      data: numericColumns.slice(0, 4).map(col => 
        displayData.reduce((sum, row) => sum + (Number(row[col]) || 0), 0)
      ),
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
    }],
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 Dashboard Analítico</h2>
        <p>Visualización de datos: {displayData.length} registros</p>
      </div>

      <div className="stats-grid">
        {numericColumns.slice(0, 4).map(col => {
          const total = displayData.reduce((sum, row) => sum + (Number(row[col]) || 0), 0);
          const average = total / displayData.length;
          return (
            <div key={col} className="stat-card">
              <h3>{col}</h3>
              <p className="stat-value">{total.toLocaleString()}</p>
              <p className="stat-avg">Promedio: {average.toFixed(2)}</p>
            </div>
          );
        })}
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>📊 Gráfico de Barras</h3>
          <Bar data={barChartData} />
        </div>

        <div className="chart-container">
          <h3>🥧 Gráfico Circular</h3>
          <Pie data={pieChartData} />
        </div>
      </div>

      <div className="data-table">
        <h3>📋 Datos Completos</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayData.slice(0, 10).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map(col => (
                    <td key={col}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {displayData.length > 10 && (
          <p className="table-note">Mostrando primeros 10 registros de {displayData.length} totales</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;