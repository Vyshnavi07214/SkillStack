from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    skill_name = Column(String(200), nullable=False, index=True)  
    resource_type = Column(String(50), nullable=False)          
    platform = Column(String(100), nullable=False)            
    progress_status = Column(String(20), default="started", nullable=False)
    hours_spent = Column(Float, default=0.0, nullable=False)
    notes = Column(Text, default="")
    difficulty_rating = Column(Integer, default=1, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    def __repr__(self):
        return f"<Goal(id={self.id}, skill_name='{self.skill_name}', status='{self.progress_status}')>"
