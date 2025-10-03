from fastapi import APIRouter, Depends, HTTPException
from typing import List
from server import db, get_current_user
from models import CharityDonation
import uuid
from datetime import datetime, timedelta
import random

router = APIRouter(prefix="/api/charity", tags=["charity"])

# Mock charity organizations
CHARITY_ORGANIZATIONS = [
    {
        "id": str(uuid.uuid4()),
        "name": "Islamic Relief Worldwide",
        "description": "Providing humanitarian aid globally",
        "category": "humanitarian",
        "image_url": "https://example.com/islamic-relief.jpg",
        "verified": True,
        "total_raised": 2500000,
        "projects": [
            {"name": "Emergency Relief Fund", "target": 100000, "raised": 75000},
            {"name": "Clean Water Initiative", "target": 50000, "raised": 32000},
            {"name": "Education Support", "target": 75000, "raised": 45000}
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Local Masjid Fund",
        "description": "Supporting our community mosque operations",
        "category": "community",
        "verified": True,
        "total_raised": 85000,
        "projects": [
            {"name": "Mosque Maintenance", "target": 25000, "raised": 18000},
            {"name": "Youth Programs", "target": 15000, "raised": 12000}
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Orphan Care Foundation",
        "description": "Caring for orphaned children worldwide",
        "category": "children",
        "verified": True,
        "total_raised": 450000,
        "projects": [
            {"name": "Orphan Sponsorship", "target": 200000, "raised": 156000},
            {"name": "Education Fund", "target": 100000, "raised": 78000}
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Zakat Foundation",
        "description": "Distributing zakat to those in need",
        "category": "zakat",
        "verified": True,
        "total_raised": 890000,
        "projects": [
            {"name": "Local Zakat Distribution", "target": 50000, "raised": 34000},
            {"name": "International Aid", "target": 150000, "raised": 89000}
        ]
    }
]

@router.get("/organizations")
async def get_charity_organizations(category: str = None, current_user: dict = Depends(get_current_user)):
    organizations = CHARITY_ORGANIZATIONS
    if category:
        organizations = [org for org in organizations if org["category"] == category]
    return organizations

@router.post("/donate")
async def make_donation(
    organization_id: str, 
    amount: float, 
    project_name: str = None,
    current_user: dict = Depends(get_current_user)
):
    # Find organization
    organization = None
    for org in CHARITY_ORGANIZATIONS:
        if org["id"] == organization_id:
            organization = org
            break
    
    if not organization:
        raise HTTPException(status_code=404, detail="Organization not found")
    
    # Create donation record
    donation_id = str(uuid.uuid4())
    donation_data = {
        "id": donation_id,
        "user_id": current_user["id"],
        "organization": organization["name"],
        "project": project_name,
        "amount": amount,
        "currency": "USD",
        "created_at": datetime.utcnow(),
        "category": organization["category"]
    }
    
    # Update user's charity total
    await db.users.update_one(
        {"id": current_user["id"]},
        {"$inc": {"charity_total": amount}}
    )
    
    # In real app, process payment and save donation
    return {
        "message": "Donation successful",
        "donation_id": donation_id,
        "amount": amount,
        "organization": organization["name"]
    }

@router.get("/donations", response_model=List[CharityDonation])
async def get_user_donations(current_user: dict = Depends(get_current_user)):
    # Mock user donations
    donations = [
        {
            "id": str(uuid.uuid4()),
            "user_id": current_user["id"],
            "organization": "Islamic Relief Worldwide",
            "amount": 100.0,
            "currency": "USD",
            "created_at": datetime.utcnow() - timedelta(days=5),
            "category": "humanitarian"
        },
        {
            "id": str(uuid.uuid4()),
            "user_id": current_user["id"],
            "organization": "Local Masjid Fund",
            "amount": 50.0,
            "currency": "USD",
            "created_at": datetime.utcnow() - timedelta(days=15),
            "category": "community"
        }
    ]
    return donations

@router.get("/stats")
async def get_charity_stats(current_user: dict = Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["id"]})
    total_donated = user.get("charity_total", 0)
    
    return {
        "total_donated": total_donated,
        "donations_count": 12,  # Mock data
        "organizations_supported": 4,
        "this_month": 150.0,
        "streak_days": 30,
        "rank": "Gold Donor",
        "next_milestone": 1000.0
    }

@router.get("/zakat-calculator")
async def calculate_zakat(
    savings: float = 0,
    gold: float = 0,
    silver: float = 0,
    business_assets: float = 0,
    current_user: dict = Depends(get_current_user)
):
    # Simplified zakat calculation
    total_wealth = savings + gold + silver + business_assets
    nisab_threshold = 4340  # Current nisab value (approximate)
    
    if total_wealth >= nisab_threshold:
        zakat_due = total_wealth * 0.025  # 2.5%
        return {
            "total_wealth": total_wealth,
            "nisab_threshold": nisab_threshold,
            "zakat_due": round(zakat_due, 2),
            "eligible": True
        }
    else:
        return {
            "total_wealth": total_wealth,
            "nisab_threshold": nisab_threshold,
            "zakat_due": 0,
            "eligible": False,
            "shortfall": nisab_threshold - total_wealth
        }

@router.get("/leaderboard")
async def get_charity_leaderboard(current_user: dict = Depends(get_current_user)):
    # Mock leaderboard data
    leaderboard = [
        {"rank": 1, "name": "Anonymous Donor", "amount": 5000, "donations": 45},
        {"rank": 2, "name": "Sister Khadija", "amount": 3500, "donations": 28},
        {"rank": 3, "name": "Brother Ahmad", "amount": 2800, "donations": 22},
        {"rank": 4, "name": "You", "amount": 1200, "donations": 12},
        {"rank": 5, "name": "Brother Yusuf", "amount": 950, "donations": 18}
    ]
    return leaderboard