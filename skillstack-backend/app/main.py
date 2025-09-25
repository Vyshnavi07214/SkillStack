from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
import crud, models, schemas
from database import SessionLocal, engine
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="SkillStack API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def init_database():
    try:
        
        models.Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
        
        db = SessionLocal()
        try:
            db.execute(text("SELECT 1"))
            logger.info("Database connection test successful")
        except Exception as e:
            logger.error(f"Database connection failed: {e}")
            raise
        finally:
            db.close()
            
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")
        raise


try:
    init_database()
except Exception as e:
    logger.error(f"Failed to initialize database: {e}")
    exit(1)

def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        logger.error(f"Database session error: {e}")
        db.rollback()
        raise
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "SkillStack API is running!", "database": "connected"}

@app.post("/api/goals/", response_model=schemas.Goal)
def create_goal(goal: schemas.GoalCreate, db: Session = Depends(get_db)):
    try:
        logger.info(f"Creating goal: {goal.dict()}")
        result = crud.create_goal(db=db, goal=goal)
        logger.info(f"Goal created successfully with ID: {result.id}")
        return result
    except Exception as e:
        logger.error(f"Error creating goal: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/api/goals/", response_model=List[schemas.Goal])
def read_goals(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    goals = crud.get_goals(db, skip=skip, limit=limit)
    return goals

@app.put("/api/goals/{goal_id}", response_model=schemas.Goal)
def update_goal(goal_id: int, goal: schemas.GoalUpdate, db: Session = Depends(get_db)):
    db_goal = crud.update_goal(db, goal_id=goal_id, goal=goal)
    if db_goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")
    return db_goal

@app.delete("/api/goals/{goal_id}")
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    success = crud.delete_goal(db, goal_id=goal_id)
    if not success:
        raise HTTPException(status_code=404, detail="Goal not found")
    return {"message": "Goal deleted successfully"}

@app.get("/api/dashboard")
def get_dashboard_data(db: Session = Depends(get_db)):
    return crud.get_dashboard_stats(db)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
