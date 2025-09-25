# SKILLSTACK
SkillStack is a  full-stack web application which works as a personal skill-building tracker for courses, tutorials, and certifications. This system enables users to track their learning journey, set goals, monitor progress, and gain insights through AI-powered recommendations.

SETUP STEPS 

1.Prerequisites
Node.js 14.0.0+ with npm
Python 3.7.0+
Git for version control
VS Code 

2. Project Structure Setup

# Create main project directory
mkdir skillstack-project
cd skillstack-project

# Create backend and frontend folders
mkdir skillstack-backend
mkdir skillstack-frontend

3. Backend Setup (FastAPI)
   
# Navigate to backend directory
cd skillstack-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment

# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi==0.104.1
pip install uvicorn==0.24.0
pip install sqlalchemy==2.0.23
pip install pydantic==2.5.0
pip install python-multipart==0.0.6

# Create requirements.txt
pip freeze > requirements.txt
Create backend files:

main.py - FastAPI application 

models.py - SQLAlchemy database models

schemas.py - Pydantic validation models

crud.py - Database CRUD operations

database.py - Database configuration

Start backend server:


python main.py
Backend runs on: http://localhost:8000

4. Frontend Setup (React)

# Navigate to frontend directory
cd skillstack-frontend

# Create React app structure manually
npm init -y

# Install React dependencies
npm install react@18.2.0 react-dom@18.2.0 react-scripts@5.0.1
npm install axios@1.1.2
npm install @testing-library/react@13.3.0
npm install @testing-library/jest-dom@5.16.4
npm install @testing-library/user-event@13.5.0
Create frontend files:

public/index.html - HTML template

src/index.js - React entry point

src/App.js - Main application component

src/App.css - Application styles

src/services/api.js - API service layer

src/components/ folder with all React components

Start frontend server:

npm start
Frontend runs on: http://localhost:3000

5. Database Initialization
The SQLite database (skillstack.db) is automatically created when you first run the backend server. Check for successful initialization in the terminal logs.


FEATURES


1. Learning Goal Management
➕ Add New Skills

Skill name input with validation

Resource type selection (Course, Video, Article, Book, Tutorial, Certification)

Platform selection (Udemy, YouTube, Coursera, edX, Pluralsight, LinkedIn Learning, Skillshare, FreeCodeCamp, Khan Academy, Other)

Initial progress status (Started, In Progress, Completed)

Difficulty rating (1-5 stars)

Hours spent tracking with decimal precision

Rich text notes for learning objectives

2. Progress Tracking & Management
📊 Visual Progress Indicators

Color-coded progress bars (25% Started, 75% In Progress, 100% Completed)

Real-time progress updates

✏️ Progress Updates

Modal form for editing existing skills

Status change tracking with timestamps


🔍 Advanced Filtering

Filter by status (All, Started, In Progress, Completed)

Search and sort capabilities

Category-based filtering

3. Analytics Dashboard
📈 Statistics Overview

Total skills count with growth indicators

Completion rate percentage

Total hours learned with monthly breakdown

Learning streak counter 

📊 Category Analysis

Resource type distribution (Course, Video, Article breakdown)

Platform usage statistics

Difficulty level analysis

Time allocation insights


4. AI-Powered Features

🎯 Personalized Suggestions

Skill recommendations based on learning history

Complementary skill identification

Learning path optimization


5. Predictive Analytics
🔮 Mastery Predictions

Skill completion date estimation

Learning pace analysis

📊 Pattern Recognition

Learning behavior analysis

Progress pattern insights


6. Timeline & Calendar Views
📅 Calendar Interface

Monthly activity heatmap

Daily activity indicators

Activity level color coding (None, Low, Medium, High)

