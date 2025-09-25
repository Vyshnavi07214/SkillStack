import React, { useState } from 'react';
import { updateGoal } from '../services/api';

const ProgressTracker = ({ goal, onClose, onUpdate }) => {
  const [progress_status, setProgressStatus] = useState(goal.progress_status);
  const [hours_spent, setHoursSpent] = useState(goal.hours_spent);
  const [notes, setNotes] = useState(goal.notes || '');
  const [difficulty_rating, setDifficultyRating] = useState(goal.difficulty_rating);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await updateGoal(goal.id, {
        progress_status,
        hours_spent,
        notes,
        difficulty_rating
      });
      setMessage('✅ Progress updated successfully!');
      setTimeout(() => {
        if (onUpdate) onUpdate();
      }, 1000);
    } catch (error) {
      setMessage('❌ Error updating progress. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="progress-tracker-overlay" onClick={handleOverlayClick}>
      <div className="progress-tracker-modal">
        <div className="modal-header">
          <h2>✏️ Update Progress</h2>
          <button className="close-btn" onClick={onClose} type="button">&times;</button>
        </div>
        
        <div className="goal-info">
          <h3>{goal.skill_name}</h3>
          <p>{goal.platform} • {goal.resource_type}</p>
        </div>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Progress Status</label>
            <select 
              value={progress_status} 
              onChange={(e) => setProgressStatus(e.target.value)}
            >
              <option value="started">📝 Started</option>
              <option value="in-progress">🚀 In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Hours Spent</label>
              <input 
                type="number" 
                value={hours_spent} 
                onChange={(e) => setHoursSpent(parseFloat(e.target.value) || 0)}
                min="0" 
                step="0.5" 
              />
            </div>

            <div className="form-group">
              <label>Difficulty (1-5)</label>
              <select 
                value={difficulty_rating} 
                onChange={(e) => setDifficultyRating(parseInt(e.target.value))}
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
            <label>Notes</label>
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              placeholder="Add your progress notes, key learnings, or updates..."
            />
          </div>

          <div className="progress-actions">
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? 'Saving...' : '💾 Save Progress'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgressTracker;
