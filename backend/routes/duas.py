from fastapi import APIRouter, Depends
from typing import List
from server import db, get_current_user
from ..models import DuaItem
import uuid

router = APIRouter(prefix="/api/duas", tags=["duas"])

# Mock duas data
MOCK_DUAS = [
    {
        "id": str(uuid.uuid4()),
        "title": "Dua before eating",
        "arabic_text": "بِسْمِ اللَّهِ",
        "english_translation": "In the name of Allah",
        "category": "daily",
        "occasion": "before_eating"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Dua after eating",
        "arabic_text": "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
        "english_translation": "All praise is due to Allah who has fed me this and provided it for me without any might or power on my part",
        "category": "daily",
        "occasion": "after_eating"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Morning Dhikr",
        "arabic_text": "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
        "english_translation": "We have entered the morning and the sovereignty belongs to Allah",
        "category": "morning",
        "occasion": "morning"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Evening Dhikr",
        "arabic_text": "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
        "english_translation": "We have entered the evening and the sovereignty belongs to Allah",
        "category": "evening",
        "occasion": "evening"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Dua for Protection",
        "arabic_text": "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        "english_translation": "I seek refuge in the perfect words of Allah from the evil of what He has created",
        "category": "protection",
        "occasion": "anytime"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Dua for Forgiveness",
        "arabic_text": "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا",
        "english_translation": "Our Lord, forgive us our sins and our excesses in our affairs",
        "category": "forgiveness",
        "occasion": "anytime"
    }
]

@router.get("/", response_model=List[DuaItem])
async def get_duas(category: str = None, current_user: dict = Depends(get_current_user)):
    duas = MOCK_DUAS
    if category:
        duas = [dua for dua in duas if dua["category"] == category]
    return duas

@router.get("/categories")
async def get_dua_categories(current_user: dict = Depends(get_current_user)):
    categories = [
        {"name": "daily", "label": "Daily Duas", "count": 15},
        {"name": "morning", "label": "Morning Dhikr", "count": 8},
        {"name": "evening", "label": "Evening Dhikr", "count": 7},
        {"name": "protection", "label": "Protection", "count": 12},
        {"name": "forgiveness", "label": "Forgiveness", "count": 9},
        {"name": "travel", "label": "Travel", "count": 5},
        {"name": "illness", "label": "Illness", "count": 6}
    ]
    return categories

@router.post("/favorite")
async def favorite_dua(dua_id: str, current_user: dict = Depends(get_current_user)):
    await db.users.update_one(
        {"id": current_user["id"]},
        {"$addToSet": {"favorite_duas": dua_id}}
    )
    return {"message": "Dua added to favorites"}

@router.get("/favorites")
async def get_favorite_duas(current_user: dict = Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["id"]})
    favorite_ids = user.get("favorite_duas", [])
    favorite_duas = [dua for dua in MOCK_DUAS if dua["id"] in favorite_ids]
    return favorite_duas

@router.get("/daily-reminder")
async def get_daily_dua_reminder(current_user: dict = Depends(get_current_user)):
    import random
    from datetime import datetime
    
    # Get a random dua for daily reminder
    daily_dua = random.choice(MOCK_DUAS)
    
    return {
        "date": datetime.utcnow().strftime("%Y-%m-%d"),
        "dua": daily_dua,
        "message": "Today's recommended dua for reflection"
    }