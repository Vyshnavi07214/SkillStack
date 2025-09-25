import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import SkillsList from './components/SkillsList';
import AddSkillForm from './components/AddSkillForm';
import Timeline from './components/Timeline';
import AIInsights from './components/AIInsights';
import { getAllGoals } from './services/api';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const data = await getAllGoals();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSkillAdded = () => {
    fetchSkills();
    setShowAddForm(false);
    setCurrentView('skills');
  };

  const handleSkillUpdated = () => {
    fetchSkills();
  };

  const renderContent = () => {
    if (currentView === 'home') {
      return (
        <>
          <div className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">Master Your Skills with<br />SkillStack</h1>
              <p className="hero-subtitle">
                Track your learning journey, set goals, and watch your skills grow. 
                The ultimate platform for personal development and continuous learning.
              </p>
              <div className="hero-buttons">
                <button 
                  className="hero-btn primary"
                  onClick={() => setShowAddForm(true)}
                >
                  📚 Start Learning
                </button>
                <button 
                  className="hero-btn secondary"
                  onClick={() => setCurrentView('dashboard')}
                >
                  📊 View Dashboard
                </button>
              </div>
            </div>
          </div>

          <div className="features-section">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h3>Track Progress</h3>
                <p>Monitor your learning journey with detailed analytics</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Stay Motivated</h3>
                <p>Set goals and celebrate achievements along the way</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏆</div>
                <h3>Achieve Goals</h3>
                <p>Turn learning into measurable skill improvements</p>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (currentView === 'dashboard') {
      return <Dashboard skills={skills} onSkillUpdated={handleSkillUpdated} />;
    }

    if (currentView === 'skills') {
      return <SkillsList skills={skills} onSkillUpdated={handleSkillUpdated} />;
    }

    if (currentView === 'timeline') {
      return <Timeline skills={skills} />;
    }

    if (currentView === 'insights') {
      return <AIInsights skills={skills} />;
    }

    return null;
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="app-logo">
          <span></span>
          <span>SkillStack</span>
        </div>
        
        <nav className="nav-menu">
          <div 
            className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentView('home')}
          >
            <span>🏠</span>
            <span>Home</span>
          </div>
          <div 
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            <span>📊</span>
            <span>Dashboard</span>
          </div>
          <div 
            className={`nav-item ${currentView === 'skills' ? 'active' : ''}`}
            onClick={() => setCurrentView('skills')}
          >
            <span>📚</span>
            <span>Skills</span>
          </div>
          <div 
            className={`nav-item ${currentView === 'timeline' ? 'active' : ''}`}
            onClick={() => setCurrentView('timeline')}
          >
            <span>📅</span>
            <span>Timeline</span>
          </div>
          <div 
            className={`nav-item ${currentView === 'insights' ? 'active' : ''}`}
            onClick={() => setCurrentView('insights')}
          >
            <span>🤖</span>
            <span>AI Insights</span>
          </div>
        </nav>

        <button 
          className="add-skill-btn"
          onClick={() => setShowAddForm(true)}
        >
          ➕ Add Skill
        </button>
      </header>

      <main className="main-content">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            Loading...
          </div>
        )}
        
        {renderContent()}
      </main>

      {showAddForm && (
        <AddSkillForm
          onClose={() => setShowAddForm(false)}
          onSkillAdded={handleSkillAdded}
        />
      )}
    </div>
  );
}

export default App;
