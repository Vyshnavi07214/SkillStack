from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class GoalBase(BaseModel):
    skill_name: str
    resource_type: str
    platform: str
    progress_status: Optional[str] = "started"
    hours_spent: Optional[float] = 0.0
    notes: Optional[str] = ""
    difficulty_rating: Optional[int] = 1

class GoalCreate(GoalBase): pass
class GoalUpdate(BaseModel):
    skill_name: Optional[str] = None
    resource_type: Optional[str] = None
    platform: Optional[str] = None
    progress_status: Optional[str] = None
    hours_spent: Optional[float] = None
    notes: Optional[str] = None
    difficulty_rating: Optional[int] = None

class Goal(GoalBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
