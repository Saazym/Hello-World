from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
import os
from dotenv import load_dotenv
import uuid

load_dotenv()

app = FastAPI(title="MyEmaan Islamic App API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
MONGO_URL = os.getenv("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URL)
db = client.myemaan_db

# Security
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

# Pydantic models
class User(BaseModel):
    id: str
    email: str
    full_name: str
    is_active: bool = True
    created_at: datetime
    profile_picture: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    prayer_streak: int = 0
    charity_total: float = 0.0
    quran_progress: Dict[str, Any] = {}
    
class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str
    
class UserLogin(BaseModel):
    email: str
    password: str
    
class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

class QuranVerse(BaseModel):
    id: str
    surah_number: int
    verse_number: int
    arabic_text: str
    english_translation: str
    urdu_translation: Optional[str] = None
    
class Mosque(BaseModel):
    id: str
    name: str
    address: str
    latitude: float
    longitude: float
    phone: Optional[str] = None
    website: Optional[str] = None
    prayer_times: Dict[str, str] = {}
    
class CommunityPost(BaseModel):
    id: str
    user_id: str
    user_name: str
    content: str
    created_at: datetime
    likes: int = 0
    comments: List[Dict[str, Any]] = []
    
class CharityDonation(BaseModel):
    id: str
    user_id: str
    organization: str
    amount: float
    currency: str = "USD"
    created_at: datetime
    category: str
    
class DuaItem(BaseModel):
    id: str
    title: str
    arabic_text: str
    english_translation: str
    category: str
    occasion: Optional[str] = None
    
class InfluentialMuslim(BaseModel):
    id: str
    name: str
    title: str
    description: str
    image_url: Optional[str] = None
    achievements: List[str] = []
    birth_year: Optional[int] = None
    country: Optional[str] = None
    
class IslamicFinanceProduct(BaseModel):
    id: str
    name: str
    type: str  # savings, investment, loan
    description: str
    minimum_amount: float
    expected_return: Optional[float] = None
    risk_level: str
    sharia_compliant: bool = True
    
class VolunteerOpportunity(BaseModel):
    id: str
    title: str
    organization: str
    description: str
    location: str
    date: datetime
    volunteers_needed: int
    volunteers_registered: int = 0
    
class HalalProduct(BaseModel):
    id: str
    name: str
    description: str
    price: float
    category: str
    image_url: Optional[str] = None
    halal_certified: bool = True
    delivery_time: str
    
class MarriageProfile(BaseModel):
    id: str
    user_id: str
    age: int
    gender: str
    location: str
    education: str
    profession: str
    looking_for: Dict[str, Any] = {}
    bio: str
    
class EmergencyAlert(BaseModel):
    id: str
    title: str
    description: str
    severity: str  # low, medium, high, critical
    location: Optional[str] = None
    created_at: datetime
    active: bool = True

# Utility functions
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = await db.users.find_one({"email": email})
    if user is None:
        raise credentials_exception
    return user

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# Routes
@app.get("/")
async def root():
    return {"message": "MyEmaan Islamic App API"}

# Authentication routes
@app.post("/api/auth/register", response_model=Token)
async def register_user(user_data: UserCreate):
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    user_id = str(uuid.uuid4())
    hashed_password = get_password_hash(user_data.password)
    
    user_doc = {
        "id": user_id,
        "email": user_data.email,
        "hashed_password": hashed_password,
        "full_name": user_data.full_name,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "prayer_streak": 0,
        "charity_total": 0.0,
        "quran_progress": {}
    }
    
    await db.users.insert_one(user_doc)
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_data.email}, expires_delta=access_token_expires
    )
    
    # Remove password from response
    user_doc.pop("hashed_password")
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_doc
    }

@app.post("/api/auth/login", response_model=Token)
async def login_user(user_data: UserLogin):
    user = await db.users.find_one({"email": user_data.email})
    if not user or not verify_password(user_data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_data.email}, expires_delta=access_token_expires
    )
    
    # Remove password from response
    user.pop("hashed_password")
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

# User profile routes
@app.get("/api/user/profile", response_model=User)
async def get_user_profile(current_user: dict = Depends(get_current_user)):
    return current_user

@app.put("/api/user/profile")
async def update_user_profile(profile_data: dict, current_user: dict = Depends(get_current_user)):
    await db.users.update_one(
        {"id": current_user["id"]}, 
        {"$set": profile_data}
    )
    return {"message": "Profile updated successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)