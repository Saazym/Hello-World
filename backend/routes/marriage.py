from fastapi import APIRouter, Depends, HTTPException
from typing import List
from server import db, get_current_user
from ..models import MarriageProfile
import uuid
from datetime import datetime

router = APIRouter(prefix="/api/marriage", tags=["marriage"])

# Mock marriage profiles (anonymized)
MARRIAGE_PROFILES = [
    {
        "id": str(uuid.uuid4()),
        "user_id": str(uuid.uuid4()),
        "age": 28,
        "gender": "male",
        "location": "New York, NY",
        "education": "Master's in Engineering",
        "profession": "Software Engineer",
        "height": "5'10\"",
        "sect": "Sunni",
        "religiosity": "Practicing",
        "looking_for": {
            "age_range": "22-30",
            "education_level": "Bachelor's or higher",
            "location_preference": "USA/Canada",
            "sect": "Sunni"
        },
        "bio": "Practicing Muslim seeking a life partner for marriage. I value family, education, and spiritual growth.",
        "interests": ["Technology", "Travel", "Islamic Studies", "Sports"],
        "languages": ["English", "Arabic", "Urdu"],
        "verified": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "user_id": str(uuid.uuid4()),
        "age": 25,
        "gender": "female",
        "location": "Toronto, ON",
        "education": "Bachelor's in Medicine",
        "profession": "Medical Student",
        "height": "5'5\"",
        "sect": "Sunni",
        "religiosity": "Very Practicing",
        "looking_for": {
            "age_range": "25-35",
            "education_level": "Bachelor's or higher",
            "location_preference": "Canada/USA",
            "sect": "Sunni"
        },
        "bio": "Dedicated to my faith and career in medicine. Looking for someone who shares similar values and goals.",
        "interests": ["Medicine", "Volunteering", "Reading", "Islamic History"],
        "languages": ["English", "French", "Arabic"],
        "verified": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "user_id": str(uuid.uuid4()),
        "age": 32,
        "gender": "male",
        "location": "London, UK",
        "education": "MBA in Finance",
        "profession": "Islamic Banking Specialist",
        "height": "6'0\"",
        "sect": "Sunni",
        "religiosity": "Practicing",
        "looking_for": {
            "age_range": "24-32",
            "education_level": "Bachelor's or higher",
            "location_preference": "UK/Europe",
            "sect": "Any"
        },
        "bio": "Working in Islamic finance, passionate about halal lifestyle. Seeking a partner for spiritual and worldly journey.",
        "interests": ["Finance", "Travel", "Photography", "Community Service"],
        "languages": ["English", "Arabic", "French"],
        "verified": True,
        "created_at": datetime.utcnow()
    }
]

@router.get("/profiles")
async def get_marriage_profiles(
    gender: str = None,
    min_age: int = None,
    max_age: int = None,
    location: str = None,
    current_user: dict = Depends(get_current_user)
):
    profiles = MARRIAGE_PROFILES.copy()
    
    # Filter profiles
    if gender:
        profiles = [p for p in profiles if p["gender"] == gender]
    
    if min_age:
        profiles = [p for p in profiles if p["age"] >= min_age]
        
    if max_age:
        profiles = [p for p in profiles if p["age"] <= max_age]
        
    if location:
        profiles = [p for p in profiles if location.lower() in p["location"].lower()]
    
    # Remove sensitive information and own profile
    filtered_profiles = []
    for profile in profiles:
        if profile["user_id"] != current_user["id"]:
            # Remove sensitive info for privacy
            safe_profile = profile.copy()
            safe_profile.pop("user_id", None)
            filtered_profiles.append(safe_profile)
    
    return filtered_profiles[:20]  # Limit to 20 profiles

@router.post("/profile")
async def create_marriage_profile(
    profile_data: dict,
    current_user: dict = Depends(get_current_user)
):
    # Check if user already has a profile
    existing_profile = None
    for profile in MARRIAGE_PROFILES:
        if profile["user_id"] == current_user["id"]:
            existing_profile = profile
            break
    
    if existing_profile:
        raise HTTPException(status_code=400, detail="Profile already exists")
    
    profile_id = str(uuid.uuid4())
    new_profile = {
        "id": profile_id,
        "user_id": current_user["id"],
        "created_at": datetime.utcnow(),
        "verified": False,
        **profile_data
    }
    
    MARRIAGE_PROFILES.append(new_profile)
    
    return {
        "message": "Marriage profile created successfully",
        "profile_id": profile_id
    }

@router.get("/profile/me")
async def get_my_marriage_profile(current_user: dict = Depends(get_current_user)):
    for profile in MARRIAGE_PROFILES:
        if profile["user_id"] == current_user["id"]:
            return profile
    
    raise HTTPException(status_code=404, detail="Profile not found")

@router.put("/profile/me")
async def update_marriage_profile(
    profile_data: dict,
    current_user: dict = Depends(get_current_user)
):
    for i, profile in enumerate(MARRIAGE_PROFILES):
        if profile["user_id"] == current_user["id"]:
            MARRIAGE_PROFILES[i].update(profile_data)
            MARRIAGE_PROFILES[i]["updated_at"] = datetime.utcnow()
            return {"message": "Profile updated successfully"}
    
    raise HTTPException(status_code=404, detail="Profile not found")

@router.post("/interest/{profile_id}")
async def express_interest(profile_id: str, current_user: dict = Depends(get_current_user)):
    # Find the profile
    target_profile = None
    for profile in MARRIAGE_PROFILES:
        if profile["id"] == profile_id:
            target_profile = profile
            break
    
    if not target_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    # Create interest record
    interest_id = str(uuid.uuid4())
    interest_data = {
        "id": interest_id,
        "from_user": current_user["id"],
        "to_profile": profile_id,
        "status": "pending",
        "created_at": datetime.utcnow()
    }
    
    return {
        "message": "Interest expressed successfully",
        "interest_id": interest_id
    }

@router.get("/interests/received")
async def get_received_interests(current_user: dict = Depends(get_current_user)):
    # Mock received interests
    interests = [
        {
            "id": str(uuid.uuid4()),
            "from_profile": {
                "age": 29,
                "location": "Boston, MA",
                "profession": "Teacher",
                "education": "Master's in Education"
            },
            "status": "pending",
            "received_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "from_profile": {
                "age": 27,
                "location": "Chicago, IL",
                "profession": "Nurse",
                "education": "Bachelor's in Nursing"
            },
            "status": "pending",
            "received_at": datetime.utcnow()
        }
    ]
    return interests

@router.get("/compatibility/{profile_id}")
async def check_compatibility(profile_id: str, current_user: dict = Depends(get_current_user)):
    # Mock compatibility calculation
    compatibility_score = {
        "overall_score": 87,
        "factors": {
            "religious_compatibility": 92,
            "location_proximity": 78,
            "age_compatibility": 95,
            "education_level": 85,
            "shared_interests": 80
        },
        "strengths": [
            "Similar religious values",
            "Compatible age range",
            "Shared educational background"
        ],
        "considerations": [
            "Different locations - may require relocation",
            "Different professional backgrounds"
        ]
    }
    return compatibility_score

@router.get("/success-stories")
async def get_success_stories(current_user: dict = Depends(get_current_user)):
    stories = [
        {
            "id": str(uuid.uuid4()),
            "couple_names": "Ahmad & Fatima",
            "wedding_date": "2023-12-15",
            "story": "We met through MyEmaan's marriage portal and found that we shared the same values and life goals. Alhamdulillah!",
            "location": "Toronto, Canada",
            "years_married": 1
        },
        {
            "id": str(uuid.uuid4()),
            "couple_names": "Omar & Zainab",
            "wedding_date": "2023-08-20",
            "story": "The compatibility matching helped us realize we were perfect for each other. May Allah bless all seeking righteous spouses.",
            "location": "London, UK",
            "years_married": 1
        }
    ]
    return stories