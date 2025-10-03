from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..server import db, get_current_user
from ..models import CommunityPost
import uuid
from datetime import datetime, timedelta
import random

router = APIRouter(prefix="/api/community", tags=["community"])

# Mock community posts
MOCK_POSTS = [
    {
        "id": str(uuid.uuid4()),
        "user_id": str(uuid.uuid4()),
        "user_name": "Ahmed Hassan",
        "content": "Subhan'Allah! Just witnessed the most beautiful sunset after Maghrib prayer. Alhamdulillah for these blessed moments.",
        "created_at": datetime.utcnow() - timedelta(hours=2),
        "likes": 24,
        "comments": [
            {"user": "Fatima Ali", "content": "Allahu Akbar! Such a beautiful reminder.", "time": "1h ago"},
            {"user": "Omar Khan", "content": "Jazak Allah khair for sharing this.", "time": "45m ago"}
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "user_id": str(uuid.uuid4()),
        "user_name": "Sister Aisha",
        "content": "Reminder: Tonight is the night of power (Laylat al-Qadr). Let's make the most of these blessed hours with dhikr and dua.",
        "created_at": datetime.utcnow() - timedelta(hours=5),
        "likes": 67,
        "comments": [
            {"user": "Yusuf Ahmed", "content": "Barakallahu feeki sister! Important reminder.", "time": "3h ago"},
            {"user": "Khadija Omar", "content": "May Allah accept our duas tonight. Ameen!", "time": "2h ago"},
            {"user": "Ibrahim Said", "content": "Allahu A'lam. Thank you for the reminder.", "time": "1h ago"}
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "user_id": str(uuid.uuid4()),
        "user_name": "Brother Bilal",
        "content": "Completed my first Quran recitation this month! Alhamdulillah. The journey has been so spiritually rewarding.",
        "created_at": datetime.utcnow() - timedelta(hours=8),
        "likes": 89,
        "comments": [
            {"user": "Mariam Khalil", "content": "Masha'Allah! May Allah increase you in knowledge.", "time": "6h ago"},
            {"user": "Hassan Ali", "content": "Congratulations brother! An inspiration to us all.", "time": "5h ago"}
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "user_id": str(uuid.uuid4()),
        "user_name": "Ustadha Zaynab",
        "content": "Beautiful hadith to reflect on: 'The believer is not one who eats his fill while his neighbor goes hungry.' - Prophet Muhammad (PBUH)",
        "created_at": datetime.utcnow() - timedelta(hours=12),
        "likes": 156,
        "comments": [
            {"user": "Ali Rahman", "content": "SubhanAllah! Such wisdom in these words.", "time": "10h ago"},
            {"user": "Leila Mansour", "content": "This reminds me to check on my elderly neighbor.", "time": "8h ago"},
            {"user": "Tariq Farouk", "content": "Jazakallahu khayran for this beautiful reminder.", "time": "6h ago"}
        ]
    }
]

@router.get("/posts", response_model=List[CommunityPost])
async def get_community_posts(skip: int = 0, limit: int = 10, current_user: dict = Depends(get_current_user)):
    # In a real app, this would fetch from database with pagination
    return MOCK_POSTS[skip:skip + limit]

@router.post("/posts")
async def create_post(content: str, current_user: dict = Depends(get_current_user)):
    post_id = str(uuid.uuid4())
    post_data = {
        "id": post_id,
        "user_id": current_user["id"],
        "user_name": current_user["full_name"],
        "content": content,
        "created_at": datetime.utcnow(),
        "likes": 0,
        "comments": []
    }
    
    # In a real app, save to database
    MOCK_POSTS.insert(0, post_data)
    
    return {"message": "Post created successfully", "post_id": post_id}

@router.post("/posts/{post_id}/like")
async def like_post(post_id: str, current_user: dict = Depends(get_current_user)):
    # Find post and increment likes
    for post in MOCK_POSTS:
        if post["id"] == post_id:
            post["likes"] += 1
            return {"message": "Post liked", "likes": post["likes"]}
    
    raise HTTPException(status_code=404, detail="Post not found")

@router.post("/posts/{post_id}/comment")
async def add_comment(post_id: str, comment_content: str, current_user: dict = Depends(get_current_user)):
    # Find post and add comment
    for post in MOCK_POSTS:
        if post["id"] == post_id:
            comment = {
                "user": current_user["full_name"],
                "content": comment_content,
                "time": "now"
            }
            post["comments"].append(comment)
            return {"message": "Comment added", "comment": comment}
    
    raise HTTPException(status_code=404, detail="Post not found")

@router.get("/events")
async def get_community_events(current_user: dict = Depends(get_current_user)):
    events = [
        {
            "id": str(uuid.uuid4()),
            "title": "Friday Jumu'ah Prayer",
            "description": "Weekly congregational prayer and khutbah",
            "date": datetime.utcnow() + timedelta(days=2),
            "location": "Central Mosque",
            "attendees": 156
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Islamic Finance Workshop",
            "description": "Learn about halal investment and banking",
            "date": datetime.utcnow() + timedelta(days=5),
            "location": "Community Center",
            "attendees": 23
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Quran Study Circle",
            "description": "Weekly Tafsir discussion",
            "date": datetime.utcnow() + timedelta(days=3),
            "location": "Masjid Al-Noor",
            "attendees": 34
        }
    ]
    return events

@router.get("/groups")
async def get_community_groups(current_user: dict = Depends(get_current_user)):
    groups = [
        {
            "id": str(uuid.uuid4()),
            "name": "Young Muslims Network",
            "description": "Community for Muslim youth aged 18-35",
            "members": 234,
            "category": "Youth"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Sisters Study Circle",
            "description": "Islamic education and sisterhood",
            "members": 89,
            "category": "Education"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Business Professionals",
            "description": "Networking for Muslim entrepreneurs",
            "members": 156,
            "category": "Professional"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Family Support Network",
            "description": "Support and resources for Muslim families",
            "members": 67,
            "category": "Family"
        }
    ]
    return groups