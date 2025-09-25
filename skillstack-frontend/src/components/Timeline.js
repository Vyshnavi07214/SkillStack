import React from 'react';

const Timeline = ({ skills }) => {
  const groupSkillsByDate = () => {
    const grouped = {};
    skills.forEach(skill => {
      const date = new Date(skill.created_at).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(skill);
    });
    return Object.entries(grouped).sort((a, b) => new Date(b[0]) - new Date(a[0]));
  };

  const timelineData = groupSkillsByDate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Learning Timeline</h1>
        <p className="dashboard-subtitle">Track your learning activities over time</p>
      </div>

      <div style={{ position: 'relative', paddingLeft: '2rem', marginTop: '2rem' }}>
        <div style={{
          position: 'absolute',
          left: '0.75rem',
          top: 0,
          height: '100%',
          width: '2px',
          background: '#e2e8f0'
        }}></div>
        
        {timelineData.length > 0 ? (
          timelineData.map(([date, dateSkills]) => (
            <div key={date} style={{ position: 'relative', paddingBottom: '2rem' }}>
              <div style={{
                position: 'absolute',
                left: '-1.75rem',
                top: '0.5rem',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#3182ce',
                border: '3px solid white',
                boxShadow: '0 0 0 3px #e2e8f0'
              }}></div>
              
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <h3>{new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</h3>
                  <span>{dateSkills.length} skill{dateSkills.length !== 1 ? 's' : ''}</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {dateSkills.map(skill => (
                    <div key={skill.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: '#f7fafc',
                      borderRadius: '8px'
                    }}>
                      <div style={{ fontSize: '1.5rem' }}>
                        {skill.platform === 'YouTube' ? '🎥' : 
                         skill.platform === 'Udemy' ? '🎓' : 
                         skill.platform === 'Coursera' ? '🏫' : '📖'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4>{skill.skill_name}</h4>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#718096' }}>
                          <span>{skill.platform}</span>
                          <span>{skill.resource_type}</span>
                          <span>{skill.progress_status}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold' }}>{skill.hours_spent}h</div>
                        <div style={{ fontSize: '0.75rem', color: '#718096' }}>Hours</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📅</div>
            <h3>No learning activities yet</h3>
            <p>Start adding skills to see your learning timeline!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
