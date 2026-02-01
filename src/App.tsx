import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import FileUpload from './components/FileUpload';
import CloudFile from './components/CloudFile';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState<any[]>([]);

  const handleDataLoad = (newData: any[]) => {
    setData(newData);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard data={data} />;
      case 'upload':
        return <FileUpload onDataLoad={handleDataLoad} />;
      case 'cloud':
        return <CloudFile onDataLoad={handleDataLoad} />;
      default:
        return <Dashboard data={data} />;
    }
  };

  return (
    <div className="App">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
