import React from 'react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h1>📊 Dashboard Analítico</h1>
      </div>
      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => onTabChange('dashboard')}
        >
          📈 Dashboard
        </button>
        <button
          className={`nav-tab ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => onTabChange('upload')}
        >
          📁 Subir Excel
        </button>
        <button
          className={`nav-tab ${activeTab === 'cloud' ? 'active' : ''}`}
          onClick={() => onTabChange('cloud')}
        >
          ☁️ Excel en la Nube
        </button>
      </div>
    </nav>
  );
};

export default Navigation;