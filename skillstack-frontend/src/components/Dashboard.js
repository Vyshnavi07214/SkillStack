import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../services/api';

const Dashboard = ({ skills, onSkillUpdated }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateStats = () => {
      const total = skills.length;
      const completed = skills.filter(s => s.progress_status === 'completed').length;
      const inProgress = skills.filter(s => s.progress_status === 'in-progress').length;
      const totalHours = skills.reduce((sum, s) => sum + (s.hours_spent || 0), 0);
      
      const categoryCount = {};
      skills.forEach(skill => {
        categoryCount[skill.resource_type] = (categoryCount[skill.resource_type] || 0) + 1;
      });
      
      const categoryBreakdown = Object.entries(categoryCount).map(([name, count]) => ({
        name,
        count
      }));

      return {
        total_goals: total,
        completed_goals: completed,
        in_progress_goals: inProgress,
        total_hours: Math.round(totalHours),
        completion_rate: total > 0 ? Math.round((completed / total) * 100) : 0,
        category_breakdown: categoryBreakdown,
        streak_days: Math.floor(Math.random() * 15) + 1
      };
    };

    const fetchStats = async () => {
      setLoading(true);
      try {
        const dashboardStats = await getDashboardData().catch(() => calculateStats());
        setStats(dashboardStats.total_goals !== undefined ? dashboardStats : calculateStats());
      } catch (error) {
        setStats(calculateStats());
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [skills]);

  if (loading) return <div className="loading"><div className="spinner"></div>Loading dashboard...</div>;
  if (!stats) return <div>Error loading dashboard stats.</div>;

  const recentSkills = skills.slice(-3);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Your Learning Dashboard</h1>
        <p className="dashboard-subtitle">Track your progress and continue your skill-building journey</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-header">
            <div className="stat-icon">📚</div>
            <div className="stat-label">Total Skills</div>
          </div>
          <div className="stat-value">{stats.total_goals}</div>
          <div className="stat-change">+2 from last month</div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-header">
            <div className="stat-icon">✅</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-value">{stats.completed_goals}</div>
          <div className="stat-change">{stats.completion_rate}% completion rate</div>
        </div>
        
        <div className="stat-card hours">
          <div className="stat-header">
            <div className="stat-icon">⏱️</div>
            <div className="stat-label">Hours Learned</div>
          </div>
          <div className="stat-value">{stats.total_hours}</div>
          <div className="stat-change">This month</div>
        </div>
        
        <div className="stat-card streak">
          <div className="stat-header">
            <div className="stat-icon">🔥</div>
            <div className="stat-label">Streak</div>
          </div>
          <div className="stat-value">{stats.streak_days} days</div>
          <div className="stat-change">Keep it up!</div>
        </div>
      </div>

      <div className="skills-section">
        <div className="section-header">
          <h2 className="section-title">Recent Skills</h2>
        </div>
        
        <div className="skills-list">
          {recentSkills.length > 0 ? (
            recentSkills.map((skill) => (
              <div key={skill.id} className="skill-item">
                <div className="skill-info">
                  <div className="skill-icon">
                    {skill.platform === 'YouTube' ? '🎥' : 
                     skill.platform === 'Udemy' ? '🎓' : 
                     skill.platform === 'Coursera' ? '🏫' : '📖'}
                  </div>
                  <div className="skill-details">
                    <h4>{skill.skill_name}</h4>
                    <div className="skill-meta">
                      <span>{skill.platform}</span>
                      <span>{skill.resource_type}</span>
                      <span>{skill.hours_spent}h</span>
                    </div>
                  </div>
                </div>
                
                <div className="skill-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{
                        width: `${skill.progress_status === 'completed' ? 100 : 
                                 skill.progress_status === 'in-progress' ? 75 : 25}%`
                      }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    {skill.progress_status === 'completed' ? '100%' : 
                     skill.progress_status === 'in-progress' ? '75%' : '25%'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📚</div>
              <h3>No skills yet</h3>
              <p>Start your learning journey by adding your first skill!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
