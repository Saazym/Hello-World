from fastapi import APIRouter, Depends
from typing import List
from server import db, get_current_user
from ..models import Mosque
import uuid
import math

router = APIRouter(prefix="/api/maps", tags=["maps"])

# Mock mosque data
MOCK_MOSQUES = [
    {
        "id": str(uuid.uuid4()),
        "name": "Central Mosque",
        "address": "123 Islamic Center Rd, City",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "phone": "+1-555-0123",
        "website": "https://centralmosque.org",
        "prayer_times": {
            "fajr": "5:30 AM",
            "dhuhr": "12:30 PM",
            "asr": "3:45 PM",
            "maghrib": "6:15 PM",
            "isha": "8:00 PM"
        }
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Masjid Al-Noor",
        "address": "456 Community Ave, Downtown",
        "latitude": 40.7589,
        "longitude": -73.9851,
        "phone": "+1-555-0456",
        "prayer_times": {
            "fajr": "5:25 AM",
            "dhuhr": "12:35 PM",
            "asr": "3:50 PM",
            "maghrib": "6:20 PM",
            "isha": "8:05 PM"
        }
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Islamic Cultural Center",
        "address": "789 Unity Blvd, Westside",
        "latitude": 40.6892,
        "longitude": -74.0445,
        "phone": "+1-555-0789",
        "website": "https://icc-westside.org",
        "prayer_times": {
            "fajr": "5:35 AM",
            "dhuhr": "12:25 PM",
            "asr": "3:40 PM",
            "maghrib": "6:10 PM",
            "isha": "7:55 PM"
        }
    }
]

def calculate_distance(lat1, lon1, lat2, lon2):
    """Calculate distance between two coordinates using Haversine formula"""
    R = 6371  # Earth's radius in kilometers
    
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    
    return R * c

@router.get("/mosques", response_model=List[Mosque])
async def get_nearby_mosques(
    lat: float = None, 
    lng: float = None, 
    radius: float = 10.0,
    current_user: dict = Depends(get_current_user)
):
    mosques = MOCK_MOSQUES.copy()
    
    if lat and lng:
        # Calculate distances and filter by radius
        for mosque in mosques:
            distance = calculate_distance(lat, lng, mosque["latitude"], mosque["longitude"])
            mosque["distance"] = round(distance, 2)
        
        # Filter by radius
        mosques = [m for m in mosques if m.get("distance", 0) <= radius]
        # Sort by distance
        mosques.sort(key=lambda x: x.get("distance", 0))
    
    return mosques

@router.get("/qibla-direction")
async def get_qibla_direction(lat: float, lng: float, current_user: dict = Depends(get_current_user)):
    """Calculate Qibla direction from given coordinates"""
    # Kaaba coordinates
    kaaba_lat = 21.4225
    kaaba_lng = 39.8262
    
    # Convert to radians
    lat1, lng1 = math.radians(lat), math.radians(lng)
    lat2, lng2 = math.radians(kaaba_lat), math.radians(kaaba_lng)
    
    # Calculate bearing
    dLng = lng2 - lng1
    y = math.sin(dLng) * math.cos(lat2)
    x = math.cos(lat1) * math.sin(lat2) - math.sin(lat1) * math.cos(lat2) * math.cos(dLng)
    
    bearing = math.atan2(y, x)
    bearing = math.degrees(bearing)
    bearing = (bearing + 360) % 360
    
    return {
        "qibla_direction": round(bearing, 2),
        "distance_km": round(calculate_distance(lat, lng, kaaba_lat, kaaba_lng), 2)
    }

@router.get("/prayer-times")
async def get_prayer_times(lat: float, lng: float, current_user: dict = Depends(get_current_user)):
    """Get prayer times for given location (mock data)"""
    return {
        "location": {"latitude": lat, "longitude": lng},
        "date": "2024-01-01",
        "prayer_times": {
            "fajr": "5:30 AM",
            "sunrise": "6:45 AM",
            "dhuhr": "12:30 PM",
            "asr": "3:45 PM",
            "maghrib": "6:15 PM",
            "isha": "8:00 PM"
        },
        "next_prayer": "dhuhr",
        "time_until_next": "2h 15m"
    }