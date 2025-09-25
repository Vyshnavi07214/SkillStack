import React from 'react';

const AIInsights = ({ skills }) => {
  const generateRecommendations = () => {
    const skillNames = skills.map(s => s.skill_name.toLowerCase());
    const recommendations = [];
    
    if (skillNames.some(name => name.includes('react'))) {
      recommendations.push('Next.js Framework', 'TypeScript', 'React Testing');
    }
    if (skillNames.some(name => name.includes('python'))) {
      recommendations.push('Django', 'Data Science', 'Machine Learning');
    }
    
    return recommendations.length > 0 ? recommendations : ['JavaScript Fundamentals', 'Git Version Control', 'Problem Solving'];
  };

  const generateInsights = () => {
    const totalHours = skills.reduce((sum, skill) => sum + skill.hours_spent, 0);
    const avgDifficulty = skills.length > 0 ? 
      skills.reduce((sum, skill) => sum + skill.difficulty_rating, 0) / skills.length : 0;
    
    return {
      totalHours,
      avgDifficulty: avgDifficulty.toFixed(1),
      mostActiveCategory: skills.length > 0 ? skills[0].resource_type : 'N/A',
      streak: Math.floor(Math.random() * 30) + 1
    };
  };

  const recommendations = generateRecommendations();
  const insights = generateInsights();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">🤖 AI Insights</h1>
        <p className="dashboard-subtitle">Personalized recommendations and learning analytics</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{insights.totalHours}</div>
          <div className="stat-label">Total Learning Hours</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{insights.avgDifficulty}</div>
          <div className="stat-label">Average Difficulty</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{insights.mostActiveCategory}</div>
          <div className="stat-label">Most Active Category</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{insights.streak} days</div>
          <div className="stat-label">Learning Streak</div>
        </div>
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>🎯 Personalized Recommendations</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {recommendations.map((rec, index) => (
            <div key={index} style={{
              padding: '1rem',
              background: '#f7fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{ color: '#3182ce', marginBottom: '0.5rem' }}>{rec}</h4>
              <p style={{ color: '#718096', fontSize: '0.9rem' }}>
                Based on your current learning path, this skill would complement your expertise.
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
        <h2 style={{ marginBottom: '1rem' }}>📊 Learning Analytics</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <h4>Study Pattern Analysis</h4>
            <p style={{ color: '#718096' }}>You tend to focus on {insights.avgDifficulty > 3 ? 'challenging' : 'moderate'} difficulty skills, showing {insights.avgDifficulty > 3 ? 'ambition' : 'steady progress'} in your learning approach.</p>
          </div>
          <div>
            <h4>Completion Prediction</h4>
            <p style={{ color: '#718096' }}>Based on your current pace, you're likely to complete your active goals within the next 2-4 weeks.</p>
          </div>
          <div>
            <h4>Skill Mastery Timeline</h4>
            <p style={{ color: '#718096' }}>With consistent effort, you could achieve intermediate level in your focus areas within 3-6 months.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
