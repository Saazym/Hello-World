from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

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