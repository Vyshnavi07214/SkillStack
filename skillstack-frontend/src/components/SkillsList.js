import React, { useState } from 'react';
import { deleteGoal, updateGoal } from '../services/api';

const SkillsList = ({ skills, onSkillUpdated }) => {
  const [filter, setFilter] = useState('all');
  const [editingSkill, setEditingSkill] = useState(null);
  const [updateData, setUpdateData] = useState({});

  const filteredSkills = skills.filter(skill => {
    if (filter === 'all') return true;
    return skill.progress_status === filter;
  });

  const handleDelete = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteGoal(skillId);
        onSkillUpdated();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  const handleUpdateProgress = async (skillId) => {
    try {
      await updateGoal(skillId, updateData);
      setEditingSkill(null);
      setUpdateData({});
      onSkillUpdated();
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Skills ({skills.length})</h1>
        <p className="dashboard-subtitle">Manage and track your learning goals</p>
      </div>

      <div className="filter-tabs" style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
        {['all', 'started', 'in-progress', 'completed'].map(status => (
          <button
            key={status}
            className={`btn ${filter === status ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter(status)}
          >
            {status === 'all' ? 'All' : status.replace('-', ' ')} 
            ({status === 'all' ? skills.length : skills.filter(s => s.progress_status === status).length})
          </button>
        ))}
      </div>

      <div className="skills-list">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
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
                    <span>{'⭐'.repeat(skill.difficulty_rating)}</span>
                  </div>
                  {skill.notes && (
                    <p className="skill-notes">{skill.notes.substring(0, 100)}...</p>
                  )}
                </div>
              </div>
              
              <div className="skill-progress">
                <span className={`status-badge status-${skill.progress_status}`}>
                  {skill.progress_status === 'started' ? '📝' : 
                   skill.progress_status === 'in-progress' ? '🚀' : '✅'} 
                  {skill.progress_status.replace('-', ' ')}
                </span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${skill.progress_status === 'completed' ? 100 : 
                                      skill.progress_status === 'in-progress' ? 75 : 25}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="skill-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingSkill(skill.id);
                    setUpdateData({
                      progress_status: skill.progress_status,
                      hours_spent: skill.hours_spent,
                      notes: skill.notes
                    });
                  }}
                >
                  ✏️ Update
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(skill.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <h3>No skills found</h3>
            <p>Start your learning journey by adding your first skill!</p>
          </div>
        )}
      </div>

      {editingSkill && (
        <div className="modal-overlay" onClick={() => setEditingSkill(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Update Progress</h3>
              <button className="close-btn" onClick={() => setEditingSkill(null)}>&times;</button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label className="form-label">Status</label>
                <select 
                  className="form-select"
                  value={updateData.progress_status || ''}
                  onChange={(e) => setUpdateData({...updateData, progress_status: e.target.value})}
                >
                  <option value="started">📝 Started</option>
                  <option value="in-progress">🚀 In Progress</option>
                  <option value="completed">✅ Completed</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Hours Spent</label>
                <input 
                  type="number"
                  className="form-input"
                  value={updateData.hours_spent || ''}
                  onChange={(e) => setUpdateData({...updateData, hours_spent: parseFloat(e.target.value)})}
                  step="0.5"
                  min="0"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea 
                  className="form-textarea"
                  rows="3"
                  value={updateData.notes || ''}
                  onChange={(e) => setUpdateData({...updateData, notes: e.target.value})}
                  placeholder="Add your progress notes..."
                />
              </div>
              
              <div className="form-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleUpdateProgress(editingSkill)}
                >
                  💾 Save Changes
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setEditingSkill(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsList;
