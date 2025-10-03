from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..server import db, get_current_user
from ..models import QuranVerse
import uuid
from datetime import datetime

router = APIRouter(prefix="/api/quran", tags=["quran"])

# Mock Quran data
MOCK_QURAN_DATA = [
    {
        "id": str(uuid.uuid4()),
        "surah_number": 1,
        "verse_number": 1,
        "arabic_text": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        "english_translation": "In the name of Allah, the Most Gracious, the Most Merciful.",
        "urdu_translation": "اللہ کے نام سے جو بہت مہربان، نہایت رحم والا ہے"
    },
    {
        "id": str(uuid.uuid4()),
        "surah_number": 1,
        "verse_number": 2,
        "arabic_text": "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
        "english_translation": "All praise is due to Allah, Lord of all the worlds.",
        "urdu_translation": "تمام تعریف اللہ کے لیے ہے جو تمام جہانوں کا پالنے والا ہے"
    },
    {
        "id": str(uuid.uuid4()),
        "surah_number": 2,
        "verse_number": 1,
        "arabic_text": "الٓمٓ",
        "english_translation": "Alif Lam Meem.",
        "urdu_translation": "الف لام میم"
    }
]

@router.get("/verses", response_model=List[QuranVerse])
async def get_quran_verses(surah: int = None, current_user: dict = Depends(get_current_user)):
    if surah:
        return [v for v in MOCK_QURAN_DATA if v["surah_number"] == surah]
    return MOCK_QURAN_DATA[:10]  # Return first 10 verses

@router.get("/surahs")
async def get_surahs(current_user: dict = Depends(get_current_user)):
    return [
        {"number": 1, "name": "Al-Fatihah", "english_name": "The Opening", "verses": 7},
        {"number": 2, "name": "Al-Baqarah", "english_name": "The Cow", "verses": 286},
        {"number": 3, "name": "Al-Imran", "english_name": "The Family of Imran", "verses": 200},
        {"number": 4, "name": "An-Nisa", "english_name": "The Women", "verses": 176},
        {"number": 5, "name": "Al-Ma'idah", "english_name": "The Table", "verses": 120}
    ]

@router.post("/bookmark")
async def bookmark_verse(verse_id: str, current_user: dict = Depends(get_current_user)):
    # Update user's bookmarks
    await db.users.update_one(
        {"id": current_user["id"]},
        {"$addToSet": {"bookmarked_verses": verse_id}}
    )
    return {"message": "Verse bookmarked successfully"}

@router.get("/bookmarks")
async def get_bookmarks(current_user: dict = Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["id"]})
    bookmarked_ids = user.get("bookmarked_verses", [])
    bookmarked_verses = [v for v in MOCK_QURAN_DATA if v["id"] in bookmarked_ids]
    return bookmarked_verses

@router.post("/progress")
async def update_reading_progress(surah: int, verse: int, current_user: dict = Depends(get_current_user)):
    progress_data = {
        f"quran_progress.surah_{surah}": verse,
        "last_read": datetime.utcnow()
    }
    
    await db.users.update_one(
        {"id": current_user["id"]},
        {"$set": progress_data}
    )
    return {"message": "Reading progress updated"}