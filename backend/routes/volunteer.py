from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..server import db, get_current_user
from ..models import VolunteerOpportunity
import uuid
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/volunteer", tags=["volunteer"])

# Mock volunteer opportunities
VOLUNTEER_OPPORTUNITIES = [
    {
        "id": str(uuid.uuid4()),
        "title": "Community Iftar Preparation",
        "organization": "Central Mosque",
        "description": "Help prepare and serve iftar meals for community members during Ramadan",
        "location": "Community Center Hall",
        "date": datetime.utcnow() + timedelta(days=5),
        "duration": "4 hours",
        "volunteers_needed": 20,
        "volunteers_registered": 12,
        "skills_required": ["Food preparation", "Serving", "Setup/Cleanup"],
        "category": "community",
        "contact_person": "Sister Amina",
        "contact_phone": "+1-555-0123"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Islamic School Teaching Assistant",
        "organization": "Al-Noor Islamic Academy",
        "description": "Assist teachers with weekend Islamic classes for children aged 6-12",
        "location": "Al-Noor Islamic Academy",
        "date": datetime.utcnow() + timedelta(days=3),
        "duration": "6 hours (recurring)",
        "volunteers_needed": 8,
        "volunteers_registered": 5,
        "skills_required": ["Teaching", "Child care", "Arabic knowledge (basic)"],
        "category": "education",
        "contact_person": "Ustadh Omar",
        "contact_phone": "+1-555-0456"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Homeless Shelter Food Distribution",
        "organization": "Islamic Relief Local Chapter",
        "description": "Distribute hot meals and care packages to homeless individuals",
        "location": "Downtown Shelter",
        "date": datetime.utcnow() + timedelta(days=2),
        "duration": "3 hours",
        "volunteers_needed": 15,
        "volunteers_registered": 18,
        "skills_required": ["Food handling", "Communication", "Physical stamina"],
        "category": "humanitarian",
        "contact_person": "Brother Yusuf",
        "contact_phone": "+1-555-0789"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Elderly Care Visit Program",
        "organization": "Muslim Community Services",
        "description": "Visit elderly community members, provide companionship and basic assistance",
        "location": "Various homes in the community",
        "date": datetime.utcnow() + timedelta(days=7),
        "duration": "2 hours (flexible)",
        "volunteers_needed": 10,
        "volunteers_registered": 6,
        "skills_required": ["Compassion", "Good listener", "Transportation"],
        "category": "elderly_care",
        "contact_person": "Sister Khadija",
        "contact_phone": "+1-555-0321"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Mosque Cleaning and Maintenance",
        "organization": "Masjid Al-Taqwa",
        "description": "General cleaning, gardening, and light maintenance work around the mosque",
        "location": "Masjid Al-Taqwa",
        "date": datetime.utcnow() + timedelta(days=1),
        "duration": "4 hours",
        "volunteers_needed": 12,
        "volunteers_registered": 9,
        "skills_required": ["Physical work", "Basic maintenance", "Teamwork"],
        "category": "maintenance",
        "contact_person": "Brother Ahmad",
        "contact_phone": "+1-555-0654"
    }
]

@router.get("/opportunities", response_model=List[VolunteerOpportunity])
async def get_volunteer_opportunities(
    category: str = None,
    location: str = None,
    current_user: dict = Depends(get_current_user)
):
    opportunities = VOLUNTEER_OPPORTUNITIES.copy()
    
    if category:
        opportunities = [opp for opp in opportunities if opp["category"] == category]
    
    if location:
        opportunities = [opp for opp in opportunities if location.lower() in opp["location"].lower()]
    
    return opportunities

@router.post("/register/{opportunity_id}")
async def register_for_volunteer_opportunity(
    opportunity_id: str,
    current_user: dict = Depends(get_current_user)
):
    # Find the opportunity
    opportunity = None
    for opp in VOLUNTEER_OPPORTUNITIES:
        if opp["id"] == opportunity_id:
            opportunity = opp
            break
    
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    
    if opportunity["volunteers_registered"] >= opportunity["volunteers_needed"]:
        raise HTTPException(status_code=400, detail="This opportunity is full")
    
    # Register user
    opportunity["volunteers_registered"] += 1
    
    # In real app, save to database
    registration_data = {
        "id": str(uuid.uuid4()),
        "user_id": current_user["id"],
        "opportunity_id": opportunity_id,
        "registered_at": datetime.utcnow(),
        "status": "confirmed"
    }
    
    return {
        "message": "Successfully registered for volunteer opportunity",
        "registration_id": registration_data["id"],
        "opportunity_title": opportunity["title"]
    }

@router.get("/my-registrations")
async def get_my_volunteer_registrations(current_user: dict = Depends(get_current_user)):
    # Mock user registrations
    registrations = [
        {
            "registration_id": str(uuid.uuid4()),
            "opportunity": {
                "title": "Community Iftar Preparation",
                "organization": "Central Mosque",
                "date": datetime.utcnow() + timedelta(days=5),
                "location": "Community Center Hall"
            },
            "status": "confirmed",
            "registered_at": datetime.utcnow() - timedelta(days=2)
        },
        {
            "registration_id": str(uuid.uuid4()),
            "opportunity": {
                "title": "Elderly Care Visit Program",
                "organization": "Muslim Community Services",
                "date": datetime.utcnow() + timedelta(days=7),
                "location": "Various homes in the community"
            },
            "status": "confirmed",
            "registered_at": datetime.utcnow() - timedelta(days=5)
        }
    ]
    return registrations

@router.get("/categories")
async def get_volunteer_categories(current_user: dict = Depends(get_current_user)):
    categories = [
        {"name": "community", "label": "Community Service", "count": 12, "icon": "users"},
        {"name": "education", "label": "Education", "count": 8, "icon": "book"},
        {"name": "humanitarian", "label": "Humanitarian Aid", "count": 15, "icon": "heart"},
        {"name": "elderly_care", "label": "Elderly Care", "count": 6, "icon": "user-heart"},
        {"name": "maintenance", "label": "Mosque Maintenance", "count": 4, "icon": "wrench"},
        {"name": "youth", "label": "Youth Programs", "count": 9, "icon": "sparkles"}
    ]
    return categories

@router.get("/stats")
async def get_volunteer_stats(current_user: dict = Depends(get_current_user)):
    return {
        "hours_volunteered": 45,
        "opportunities_joined": 12,
        "organizations_helped": 5,
        "impact_score": 89,
        "ranking": "Gold Volunteer",
        "next_milestone": 100,
        "recent_activities": [
            {"activity": "Helped at Community Iftar", "date": "2024-01-10", "hours": 4},
            {"activity": "Taught at Islamic School", "date": "2024-01-08", "hours": 6},
            {"activity": "Mosque Cleaning", "date": "2024-01-05", "hours": 3}
        ]
    }

@router.post("/create")
async def create_volunteer_opportunity(
    opportunity_data: dict,
    current_user: dict = Depends(get_current_user)
):
    # Only allow certain users to create opportunities (e.g., organization admins)
    opportunity_id = str(uuid.uuid4())
    
    new_opportunity = {
        "id": opportunity_id,
        "created_by": current_user["id"],
        "created_at": datetime.utcnow(),
        **opportunity_data
    }
    
    # In real app, save to database
    VOLUNTEER_OPPORTUNITIES.append(new_opportunity)
    
    return {
        "message": "Volunteer opportunity created successfully",
        "opportunity_id": opportunity_id
    }