import React, { useState } from 'react';
import { createGoal } from '../services/api';

const AddSkillForm = ({ onClose, onSkillAdded }) => {
  const [formData, setFormData] = useState({
    skill_name: '',
    resource_type: 'course',
    platform: '',
    progress_status: 'started',
    hours_spent: 0,
    notes: '',
    difficulty_rating: 1
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const resourceTypes = ['course', 'video', 'article', 'book', 'tutorial', 'certification'];
  const platforms = [
    'Udemy', 'YouTube', 'Coursera', 'edX', 'Pluralsight', 
    'LinkedIn Learning', 'Skillshare', 'FreeCodeCamp', 'Khan Academy', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await createGoal(formData);
      setMessage('✅ Skill added successfully!');
      
      setTimeout(() => {
        if (onSkillAdded) onSkillAdded();
      }, 1500);
    } catch (error) {
      setMessage('❌ Error adding skill. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">🎯 Add New Skill Goal</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-content">
          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Skill Name *</label>
              <input
                type="text"
                className="form-input"
                name="skill_name"
                value={formData.skill_name}
                onChange={handleChange}
                placeholder="e.g., React.js, Machine Learning, Python"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Resource Type *</label>
                <select
                  className="form-select"
                  name="resource_type"
                  value={formData.resource_type}
                  onChange={handleChange}
                  required
                >
                  {resourceTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Platform *</label>
                <select
                  className="form-select"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Platform</option>
                  {platforms.map(platform => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Initial Status</label>
                <select
                  className="form-select"
                  name="progress_status"
                  value={formData.progress_status}
                  onChange={handleChange}
                >
                  <option value="started">📝 Started</option>
                  <option value="in-progress">🚀 In Progress</option>
                  <option value="completed">✅ Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Difficulty (1-5)</label>
                <select
                  className="form-select"
                  name="difficulty_rating"
                  value={formData.difficulty_rating}
                  onChange={handleChange}
                >
                  <option value={1}>1 - Very Easy</option>
                  <option value={2}>2 - Easy</option>
                  <option value={3}>3 - Medium</option>
                  <option value={4}>4 - Hard</option>
                  <option value={5}>5 - Very Hard</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Initial Hours Spent</label>
              <input
                type="number"
                className="form-input"
                name="hours_spent"
                value={formData.hours_spent}
                onChange={handleChange}
                min="0"
                step="0.5"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea
                className="form-textarea"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Add your notes, goals, or key learnings..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? '🔄 Adding...' : '➕ Add Skill Goal'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSkillForm;
