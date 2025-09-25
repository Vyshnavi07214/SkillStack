from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import func
import models, schemas
import logging

logger = logging.getLogger(__name__)

def create_goal(db: Session, goal: schemas.GoalCreate):
    try:
       
        if not goal.skill_name or not goal.skill_name.strip():
            raise ValueError("Skill name cannot be empty")
        
        if not goal.platform:
            raise ValueError("Platform must be selected")
            
    
        db_goal = models.Goal(**goal.dict())
        
    
        db.add(db_goal)
        db.commit()
        db.refresh(db_goal)
        
        logger.info(f"Successfully created goal: {db_goal.id}")
        return db_goal
        
    except SQLAlchemyError as e:
        logger.error(f"Database error creating goal: {e}")
        db.rollback()
        raise
    except ValueError as e:
        logger.error(f"Validation error creating goal: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error creating goal: {e}")
        db.rollback()
        raise


def get_goals(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Goal).offset(skip).limit(limit).all()

def get_goal(db: Session, goal_id: int):
    return db.query(models.Goal).filter(models.Goal.id == goal_id).first()

def update_goal(db: Session, goal_id: int, goal: schemas.GoalUpdate):
    db_goal = db.query(models.Goal).filter(models.Goal.id == goal_id).first()
    if db_goal:
        update_data = goal.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_goal, field, value)
        db.commit()
        db.refresh(db_goal)
    return db_goal

def delete_goal(db: Session, goal_id: int):
    db_goal = db.query(models.Goal).filter(models.Goal.id == goal_id).first()
    if db_goal:
        db.delete(db_goal)
        db.commit()
        return True
    return False

def get_dashboard_stats(db: Session):
    total_goals = db.query(models.Goal).count()
    completed_goals = db.query(models.Goal).filter(models.Goal.progress_status == "completed").count()
    in_progress_goals = db.query(models.Goal).filter(models.Goal.progress_status == "in-progress").count()
    total_hours = db.query(func.sum(models.Goal.hours_spent)).scalar() or 0
    category_stats = db.query(models.Goal.resource_type, func.count(models.Goal.id).label('count')).group_by(models.Goal.resource_type).all()
    return {
        "total_goals": total_goals,
        "completed_goals": completed_goals,
        "in_progress_goals": in_progress_goals,
        "total_hours": total_hours,
        "completion_rate": (completed_goals / total_goals * 100) if total_goals > 0 else 0,
        "category_breakdown": [{"name": cat, "count": count} for cat, count in category_stats]
    }
