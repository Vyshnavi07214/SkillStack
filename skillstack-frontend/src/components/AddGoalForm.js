import React, { useState } from 'react';
import { createGoal } from '../services/api';

const AddGoalForm = ({ onGoalAdded }) => {
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

  const resourceTypes = ['course', 'video', 'article', 'book', 'tutorial'];
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
      setMessage('✅ Learning goal added successfully!');
      setFormData({
        skill_name: '',
        resource_type: 'course',
        platform: '',
        progress_status: 'started',
        hours_spent: 0,
        notes: '',
        difficulty_rating: 1
      });
      if (onGoalAdded) onGoalAdded();
    } catch (error) {
      setMessage('❌ Error adding goal. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>🎯 Add New Learning Goal</h2>
      
      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="skill_name">Skill Name *</label>
          <input
            type="text"
            id="skill_name"
            name="skill_name"
            value={formData.skill_name}
            onChange={handleChange}
            placeholder="e.g., React.js, Machine Learning, Python"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="resource_type">Resource Type *</label>
            <select
              id="resource_type"
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
            <label htmlFor="platform">Platform *</label>
            <select
              id="platform"
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
            <label htmlFor="progress_status">Initial Status</label>
            <select
              id="progress_status"
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
            <label htmlFor="difficulty_rating">Difficulty (1-5)</label>
            <select
              id="difficulty_rating"
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
          <label htmlFor="hours_spent">Hours Spent</label>
          <input
            type="number"
            id="hours_spent"
            name="hours_spent"
            value={formData.hours_spent}
            onChange={handleChange}
            min="0"
            step="0.5"
            placeholder="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Add your notes, key learnings, or progress updates..."
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding Goal...' : '➕ Add Learning Goal'}
        </button>
      </form>
    </div>
  );
};

export default AddGoalForm;
