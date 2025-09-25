import React, { useState } from 'react';
import ProgressTracker from './ProgressTracker';
import { deleteGoal } from '../services/api';

const GoalList = ({ goals, onGoalUpdated }) => {
  const [filter, setFilter] = useState('all');
  const [editingGoal, setEditingGoal] = useState(null);

  const filteredGoals = goals.filter(goal => {
    if (filter === 'all') return true;
    return goal.progress_status === filter;
  });

  const handleDelete = async (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await deleteGoal(goalId);
        onGoalUpdated();
      } catch (error) {
        console.error('Error deleting goal:', error);
        alert('Error deleting goal. Please try again.');
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'started': return '📝';
      case 'in-progress': return '🚀';
      case 'completed': return '✅';
      default: return '📝';
    }
  };

  const getDifficultyStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'YouTube': '🎥',
      'Udemy': '🎓',
      'Coursera': '🏫',
      'edX': '📚',
      'Pluralsight': '💻',
      'LinkedIn Learning': '💼',
      'Skillshare': '🎨',
      'FreeCodeCamp': '👨‍💻',
      'Khan Academy': '🧮'
    };
    return icons[platform] || '📖';
  };

  return (
    <div className="goals-container">
      <div className="goals-header">
        <h2>📚 My Learning Goals ({goals.length})</h2>
        
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({goals.length})
          </button>
          <button 
            className={filter === 'started' ? 'active' : ''}
            onClick={() => setFilter('started')}
          >
            Started ({goals.filter(g => g.progress_status === 'started').length})
          </button>
          <button 
            className={filter === 'in-progress' ? 'active' : ''}
            onClick={() => setFilter('in-progress')}
          >
            In Progress ({goals.filter(g => g.progress_status === 'in-progress').length})
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed ({goals.filter(g => g.progress_status === 'completed').length})
          </button>
        </div>
      </div>

      {filteredGoals.length === 0 ? (
        <div className="empty-state">
          <h3>No goals found</h3>
          <p>
            {filter === 'all' 
              ? "Start your learning journey by adding your first goal!" 
              : `No goals with status "${filter}"`
            }
          </p>
        </div>
      ) : (
        <div className="goals-grid">
          {filteredGoals.map(goal => (
            <div key={goal.id} className="goal-card">
              <div className="goal-header">
                <div className="goal-title-section">
                  <h3 className="goal-title">
                    {getPlatformIcon(goal.platform)} {goal.skill_name}
                  </h3>
                  <span className={`status-badge status-${goal.progress_status}`}>
                    {getStatusIcon(goal.progress_status)} {goal.progress_status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <div className="goal-meta">
                <div className="meta-item">
                  <div className="meta-label">Resource Type</div>
                  <div className="meta-value">{goal.resource_type}</div>
                </div>
                <div className="meta-item">
                  <div className="meta-label">Platform</div>
                  <div className="meta-value">{goal.platform}</div>
                </div>
                <div className="meta-item">
                  <div className="meta-label">Hours Spent</div>
                  <div className="meta-value">{goal.hours_spent}h</div>
                </div>
                <div className="meta-item">
                  <div className="meta-label">Difficulty</div>
                  <div className="meta-value">{getDifficultyStars(goal.difficulty_rating)}</div>
                </div>
              </div>

              {goal.notes && (
                <div className="goal-notes">
                  <h4>📝 Notes:</h4>
                  <p>{goal.notes}</p>
                </div>
              )}

              <div className="goal-dates">
                <small>
                  Created: {new Date(goal.created_at).toLocaleDateString()} | 
                  Updated: {new Date(goal.updated_at).toLocaleDateString()}
                </small>
              </div>

              <div className="goal-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setEditingGoal(goal)}
                >
                  ✏️ Update Progress
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(goal.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingGoal && (
        <ProgressTracker
          goal={editingGoal}
          onClose={() => setEditingGoal(null)}
          onUpdate={() => {
            setEditingGoal(null);
            onGoalUpdated();
          }}
        />
      )}
    </div>
  );
};

export default GoalList;
