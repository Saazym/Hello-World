#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for MyEmaan Islamic App
Tests all API endpoints with authentication and data validation
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Configuration
BASE_URL = "http://localhost:8001"
API_BASE = f"{BASE_URL}/api"

class APITester:
    def __init__(self):
        self.session = requests.Session()
        self.access_token = None
        self.user_data = None
        self.test_results = []
        
    def log_test(self, test_name, success, details="", response_data=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        if not success and response_data:
            print(f"   Response: {response_data}")
        print()
        
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details,
            "response": response_data
        })
    
    def test_root_endpoint(self):
        """Test root endpoint"""
        try:
            response = self.session.get(BASE_URL)
            if response.status_code == 200 and "MyEmaan Islamic App API" in response.text:
                self.log_test("Root Endpoint", True, "API is accessible")
                return True
            else:
                self.log_test("Root Endpoint", False, f"Status: {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Root Endpoint", False, f"Connection error: {str(e)}")
            return False
    
    def test_user_registration(self):
        """Test user registration"""
        try:
            # Generate unique test data
            test_email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
            test_data = {
                "email": test_email,
                "password": "SecurePassword123!",
                "full_name": "Ahmad Hassan"
            }
            
            response = self.session.post(f"{API_BASE}/auth/register", json=test_data)
            
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and "user" in data:
                    self.access_token = data["access_token"]
                    self.user_data = data["user"]
                    self.session.headers.update({"Authorization": f"Bearer {self.access_token}"})
                    self.log_test("User Registration", True, f"User registered: {test_email}")
                    return True
                else:
                    self.log_test("User Registration", False, "Missing token or user data", data)
                    return False
            else:
                self.log_test("User Registration", False, f"Status: {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("User Registration", False, f"Error: {str(e)}")
            return False
    
    def test_user_login(self):
        """Test user login with existing credentials"""
        if not self.user_data:
            self.log_test("User Login", False, "No user data available for login test")
            return False
            
        try:
            login_data = {
                "email": self.user_data["email"],
                "password": "SecurePassword123!"
            }
            
            response = self.session.post(f"{API_BASE}/auth/login", json=login_data)
            
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data:
                    self.log_test("User Login", True, "Login successful")
                    return True
                else:
                    self.log_test("User Login", False, "Missing access token", data)
                    return False
            else:
                self.log_test("User Login", False, f"Status: {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("User Login", False, f"Error: {str(e)}")
            return False
    
    def test_user_profile(self):
        """Test user profile endpoints"""
        if not self.access_token:
            self.log_test("User Profile GET", False, "No access token available")
            return False
            
        try:
            # Test GET profile
            response = self.session.get(f"{API_BASE}/user/profile")
            
            if response.status_code == 200:
                profile_data = response.json()
                if "email" in profile_data and "full_name" in profile_data:
                    self.log_test("User Profile GET", True, "Profile retrieved successfully")
                    
                    # Test PUT profile update
                    update_data = {"bio": "Updated bio for testing", "location": "Test City"}
                    update_response = self.session.put(f"{API_BASE}/user/profile", json=update_data)
                    
                    if update_response.status_code == 200:
                        self.log_test("User Profile UPDATE", True, "Profile updated successfully")
                        return True
                    else:
                        self.log_test("User Profile UPDATE", False, f"Status: {update_response.status_code}", update_response.text)
                        return False
                else:
                    self.log_test("User Profile GET", False, "Missing profile fields", profile_data)
                    return False
            else:
                self.log_test("User Profile GET", False, f"Status: {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("User Profile", False, f"Error: {str(e)}")
            return False
    
    def test_quran_endpoints(self):
        """Test Quran API endpoints"""
        if not self.access_token:
            self.log_test("Quran API", False, "No access token available")
            return False
            
        try:
            # Test get verses
            response = self.session.get(f"{API_BASE}/quran/verses")
            if response.status_code == 200:
                verses = response.json()
                if isinstance(verses, list) and len(verses) > 0:
                    verse_id = verses[0]["id"]
                    self.log_test("Quran Verses", True, f"Retrieved {len(verses)} verses")
                    
                    # Test get surahs
                    surahs_response = self.session.get(f"{API_BASE}/quran/surahs")
                    if surahs_response.status_code == 200:
                        surahs = surahs_response.json()
                        self.log_test("Quran Surahs", True, f"Retrieved {len(surahs)} surahs")
                        
                        # Test bookmark verse
                        bookmark_response = self.session.post(f"{API_BASE}/quran/bookmark", json={"verse_id": verse_id})
                        if bookmark_response.status_code == 200:
                            self.log_test("Quran Bookmark", True, "Verse bookmarked successfully")
                            
                            # Test get bookmarks
                            bookmarks_response = self.session.get(f"{API_BASE}/quran/bookmarks")
                            if bookmarks_response.status_code == 200:
                                self.log_test("Quran Bookmarks GET", True, "Bookmarks retrieved")
                                
                                # Test progress update
                                progress_response = self.session.post(f"{API_BASE}/quran/progress", json={"surah": 1, "verse": 5})
                                if progress_response.status_code == 200:
                                    self.log_test("Quran Progress", True, "Progress updated")
                                    return True
                                else:
                                    self.log_test("Quran Progress", False, f"Status: {progress_response.status_code}")
                            else:
                                self.log_test("Quran Bookmarks GET", False, f"Status: {bookmarks_response.status_code}")
                        else:
                            self.log_test("Quran Bookmark", False, f"Status: {bookmark_response.status_code}")
                    else:
                        self.log_test("Quran Surahs", False, f"Status: {surahs_response.status_code}")
                else:
                    self.log_test("Quran Verses", False, "No verses returned", verses)
            else:
                self.log_test("Quran Verses", False, f"Status: {response.status_code}", response.text)
            return False
        except Exception as e:
            self.log_test("Quran API", False, f"Error: {str(e)}")
            return False
    
    def test_maps_endpoints(self):
        """Test Maps API endpoints"""
        if not self.access_token:
            self.log_test("Maps API", False, "No access token available")
            return False
            
        try:
            # Test get mosques
            response = self.session.get(f"{API_BASE}/maps/mosques")
            if response.status_code == 200:
                mosques = response.json()
                if isinstance(mosques, list):
                    self.log_test("Maps Mosques", True, f"Retrieved {len(mosques)} mosques")
                    
                    # Test mosques with location
                    location_response = self.session.get(f"{API_BASE}/maps/mosques?lat=40.7128&lng=-74.0060&radius=5")
                    if location_response.status_code == 200:
                        self.log_test("Maps Mosques with Location", True, "Location-based search works")
                        
                        # Test Qibla direction
                        qibla_response = self.session.get(f"{API_BASE}/maps/qibla-direction?lat=40.7128&lng=-74.0060")
                        if qibla_response.status_code == 200:
                            qibla_data = qibla_response.json()
                            if "qibla_direction" in qibla_data:
                                self.log_test("Maps Qibla Direction", True, f"Qibla direction: {qibla_data['qibla_direction']}°")
                                
                                # Test prayer times
                                prayer_response = self.session.get(f"{API_BASE}/maps/prayer-times?lat=40.7128&lng=-74.0060")
                                if prayer_response.status_code == 200:
                                    prayer_data = prayer_response.json()
                                    if "prayer_times" in prayer_data:
                                        self.log_test("Maps Prayer Times", True, "Prayer times retrieved")
                                        return True
                                    else:
                                        self.log_test("Maps Prayer Times", False, "Missing prayer times", prayer_data)
                                else:
                                    self.log_test("Maps Prayer Times", False, f"Status: {prayer_response.status_code}")
                            else:
                                self.log_test("Maps Qibla Direction", False, "Missing qibla direction", qibla_data)
                        else:
                            self.log_test("Maps Qibla Direction", False, f"Status: {qibla_response.status_code}")
                    else:
                        self.log_test("Maps Mosques with Location", False, f"Status: {location_response.status_code}")
                else:
                    self.log_test("Maps Mosques", False, "Invalid response format", mosques)
            else:
                self.log_test("Maps Mosques", False, f"Status: {response.status_code}", response.text)
            return False
        except Exception as e:
            self.log_test("Maps API", False, f"Error: {str(e)}")
            return False
    
    def test_community_endpoints(self):
        """Test Community API endpoints"""
        if not self.access_token:
            self.log_test("Community API", False, "No access token available")
            return False
            
        try:
            # Test get posts
            response = self.session.get(f"{API_BASE}/community/posts")
            if response.status_code == 200:
                posts = response.json()
                if isinstance(posts, list):
                    self.log_test("Community Posts GET", True, f"Retrieved {len(posts)} posts")
                    
                    # Test create post
                    create_response = self.session.post(f"{API_BASE}/community/posts", json={"content": "Test post from API testing"})
                    if create_response.status_code == 200:
                        create_data = create_response.json()
                        if "post_id" in create_data:
                            post_id = create_data["post_id"]
                            self.log_test("Community Post CREATE", True, "Post created successfully")
                            
                            # Test like post
                            like_response = self.session.post(f"{API_BASE}/community/posts/{post_id}/like")
                            if like_response.status_code == 200:
                                self.log_test("Community Post LIKE", True, "Post liked successfully")
                                
                                # Test add comment
                                comment_response = self.session.post(f"{API_BASE}/community/posts/{post_id}/comment", 
                                                                   json={"comment_content": "Test comment"})
                                if comment_response.status_code == 200:
                                    self.log_test("Community Post COMMENT", True, "Comment added successfully")
                                    
                                    # Test get events
                                    events_response = self.session.get(f"{API_BASE}/community/events")
                                    if events_response.status_code == 200:
                                        self.log_test("Community Events", True, "Events retrieved")
                                        
                                        # Test get groups
                                        groups_response = self.session.get(f"{API_BASE}/community/groups")
                                        if groups_response.status_code == 200:
                                            self.log_test("Community Groups", True, "Groups retrieved")
                                            return True
                                        else:
                                            self.log_test("Community Groups", False, f"Status: {groups_response.status_code}")
                                    else:
                                        self.log_test("Community Events", False, f"Status: {events_response.status_code}")
                                else:
                                    self.log_test("Community Post COMMENT", False, f"Status: {comment_response.status_code}")
                            else:
                                self.log_test("Community Post LIKE", False, f"Status: {like_response.status_code}")
                        else:
                            self.log_test("Community Post CREATE", False, "Missing post_id", create_data)
                    else:
                        self.log_test("Community Post CREATE", False, f"Status: {create_response.status_code}")
                else:
                    self.log_test("Community Posts GET", False, "Invalid response format", posts)
            else:
                self.log_test("Community Posts GET", False, f"Status: {response.status_code}", response.text)
            return False
        except Exception as e:
            self.log_test("Community API", False, f"Error: {str(e)}")
            return False
    
    def test_charity_endpoints(self):
        """Test Charity API endpoints"""
        if not self.access_token:
            self.log_test("Charity API", False, "No access token available")
            return False
            
        try:
            # Test get organizations
            response = self.session.get(f"{API_BASE}/charity/organizations")
            if response.status_code == 200:
                orgs = response.json()
                if isinstance(orgs, list) and len(orgs) > 0:
                    org_id = orgs[0]["id"]
                    self.log_test("Charity Organizations", True, f"Retrieved {len(orgs)} organizations")
                    
                    # Test make donation
                    donation_response = self.session.post(f"{API_BASE}/charity/donate", 
                                                        json={"organization_id": org_id, "amount": 50.0})
                    if donation_response.status_code == 200:
                        self.log_test("Charity Donation", True, "Donation processed successfully")
                        
                        # Test get donations
                        donations_response = self.session.get(f"{API_BASE}/charity/donations")
                        if donations_response.status_code == 200:
                            self.log_test("Charity Donations GET", True, "User donations retrieved")
                            
                            # Test get stats
                            stats_response = self.session.get(f"{API_BASE}/charity/stats")
                            if stats_response.status_code == 200:
                                self.log_test("Charity Stats", True, "Charity stats retrieved")
                                
                                # Test zakat calculator
                                zakat_response = self.session.get(f"{API_BASE}/charity/zakat-calculator?savings=10000&gold=2000")
                                if zakat_response.status_code == 200:
                                    zakat_data = zakat_response.json()
                                    if "zakat_due" in zakat_data:
                                        self.log_test("Charity Zakat Calculator", True, f"Zakat calculated: ${zakat_data['zakat_due']}")
                                        
                                        # Test leaderboard
                                        leaderboard_response = self.session.get(f"{API_BASE}/charity/leaderboard")
                                        if leaderboard_response.status_code == 200:
                                            self.log_test("Charity Leaderboard", True, "Leaderboard retrieved")
                                            return True
                                        else:
                                            self.log_test("Charity Leaderboard", False, f"Status: {leaderboard_response.status_code}")
                                    else:
                                        self.log_test("Charity Zakat Calculator", False, "Missing zakat calculation", zakat_data)
                                else:
                                    self.log_test("Charity Zakat Calculator", False, f"Status: {zakat_response.status_code}")
                            else:
                                self.log_test("Charity Stats", False, f"Status: {stats_response.status_code}")
                        else:
                            self.log_test("Charity Donations GET", False, f"Status: {donations_response.status_code}")
                    else:
                        self.log_test("Charity Donation", False, f"Status: {donation_response.status_code}")
                else:
                    self.log_test("Charity Organizations", False, "No organizations returned", orgs)
            else:
                self.log_test("Charity Organizations", False, f"Status: {response.status_code}", response.text)
            return False
        except Exception as e:
            self.log_test("Charity API", False, f"Error: {str(e)}")
            return False
    
    def test_duas_endpoints(self):
        """Test Duas API endpoints"""
        if not self.access_token:
            self.log_test("Duas API", False, "No access token available")
            return False
            
        try:
            # Test get duas
            response = self.session.get(f"{API_BASE}/duas/")
            if response.status_code == 200:
                duas = response.json()
                if isinstance(duas, list) and len(duas) > 0:
                    dua_id = duas[0]["id"]
                    self.log_test("Duas GET", True, f"Retrieved {len(duas)} duas")
                    
                    # Test get categories
                    categories_response = self.session.get(f"{API_BASE}/duas/categories")
                    if categories_response.status_code == 200:
                        self.log_test("Duas Categories", True, "Categories retrieved")
                        
                        # Test favorite dua
                        favorite_response = self.session.post(f"{API_BASE}/duas/favorite", json={"dua_id": dua_id})
                        if favorite_response.status_code == 200:
                            self.log_test("Duas Favorite", True, "Dua favorited successfully")
                            
                            # Test get favorites
                            favorites_response = self.session.get(f"{API_BASE}/duas/favorites")
                            if favorites_response.status_code == 200:
                                self.log_test("Duas Favorites GET", True, "Favorite duas retrieved")
                                
                                # Test daily reminder
                                reminder_response = self.session.get(f"{API_BASE}/duas/daily-reminder")
                                if reminder_response.status_code == 200:
                                    self.log_test("Duas Daily Reminder", True, "Daily reminder retrieved")
                                    return True
                                else:
                                    self.log_test("Duas Daily Reminder", False, f"Status: {reminder_response.status_code}")
                            else:
                                self.log_test("Duas Favorites GET", False, f"Status: {favorites_response.status_code}")
                        else:
                            self.log_test("Duas Favorite", False, f"Status: {favorite_response.status_code}")
                    else:
                        self.log_test("Duas Categories", False, f"Status: {categories_response.status_code}")
                else:
                    self.log_test("Duas GET", False, "No duas returned", duas)
            else:
                self.log_test("Duas GET", False, f"Status: {response.status_code}", response.text)
            return False
        except Exception as e:
            self.log_test("Duas API", False, f"Error: {str(e)}")
            return False
    
    def test_islamic_finance_endpoints(self):
        """Test Islamic Finance API endpoints"""
        if not self.access_token:
            self.log_test("Islamic Finance API", False, "No access token available")
            return False
            
        try:
            # Test get products
            response = self.session.get(f"{API_BASE}/islamic-finance/products")
            if response.status_code == 200:
                products = response.json()
                if isinstance(products, list) and len(products) > 0:
                    product_id = products[0]["id"]
                    self.log_test("Islamic Finance Products", True, f"Retrieved {len(products)} products")
                    
                    # Test halal stocks
                    stocks_response = self.session.get(f"{API_BASE}/islamic-finance/halal-stocks")
                    if stocks_response.status_code == 200:
                        self.log_test("Islamic Finance Halal Stocks", True, "Halal stocks retrieved")
                        
                        # Test investment calculator
                        calc_response = self.session.get(f"{API_BASE}/islamic-finance/investment-calculator?principal=10000&return_rate=5&years=10")
                        if calc_response.status_code == 200:
                            calc_data = calc_response.json()
                            if "final_amount" in calc_data:
                                self.log_test("Islamic Finance Calculator", True, f"Investment calculated: ${calc_data['final_amount']}")
                                
                                # Test market news
                                news_response = self.session.get(f"{API_BASE}/islamic-finance/market-news")
                                if news_response.status_code == 200:
                                    self.log_test("Islamic Finance News", True, "Market news retrieved")
                                    
                                    # Test add to portfolio
                                    portfolio_add_response = self.session.post(f"{API_BASE}/islamic-finance/portfolio/add", 
                                                                             json={"product_id": product_id, "amount": 1000})
                                    if portfolio_add_response.status_code == 200:
                                        self.log_test("Islamic Finance Portfolio Add", True, "Investment added to portfolio")
                                        
                                        # Test get portfolio
                                        portfolio_response = self.session.get(f"{API_BASE}/islamic-finance/portfolio")
                                        if portfolio_response.status_code == 200:
                                            self.log_test("Islamic Finance Portfolio GET", True, "Portfolio retrieved")
                                            return True
                                        else:
                                            self.log_test("Islamic Finance Portfolio GET", False, f"Status: {portfolio_response.status_code}")
                                    else:
                                        self.log_test("Islamic Finance Portfolio Add", False, f"Status: {portfolio_add_response.status_code}")
                                else:
                                    self.log_test("Islamic Finance News", False, f"Status: {news_response.status_code}")
                            else:
                                self.log_test("Islamic Finance Calculator", False, "Missing calculation result", calc_data)
                        else:
                            self.log_test("Islamic Finance Calculator", False, f"Status: {calc_response.status_code}")
                    else:
                        self.log_test("Islamic Finance Halal Stocks", False, f"Status: {stocks_response.status_code}")
                else:
                    self.log_test("Islamic Finance Products", False, "No products returned", products)
            else:
                self.log_test("Islamic Finance Products", False, f"Status: {response.status_code}", response.text)
            return False
        except Exception as e:
            self.log_test("Islamic Finance API", False, f"Error: {str(e)}")
            return False
    
    def test_volunteer_endpoints(self):
        """Test Volunteer API endpoints"""
        if not self.access_token:
            self.log_test("Volunteer API", False, "No access token available")
            return False
            
        try:
            # Test get opportunities
            response = self.session.get(f"{API_BASE}/volunteer/opportunities")
            if response.status_code == 200:
                opportunities = response.json()
                if isinstance(opportunities, list) and len(opportunities) > 0:
                    opp_id = opportunities[0]["id"]
                    self.log_test("Volunteer Opportunities", True, f"Retrieved {len(opportunities)} opportunities")
                    
                    # Test register for opportunity
                    register_response = self.session.post(f"{API_BASE}/volunteer/register/{opp_id}")
                    if register_response.status_code == 200:
                        self.log_test("Volunteer Register", True, "Registered for opportunity")
                        
                        # Test get registrations
                        registrations_response = self.session.get(f"{API_BASE}/volunteer/my-registrations")
                        if registrations_response.status_code == 200:
                            self.log_test("Volunteer Registrations", True, "User registrations retrieved")
                            
                            # Test get categories
                            categories_response = self.session.get(f"{API_BASE}/volunteer/categories")
                            if categories_response.status_code == 200:
                                self.log_test("Volunteer Categories", True, "Categories retrieved")
                                
                                # Test get stats
                                stats_response = self.session.get(f"{API_BASE}/volunteer/stats")
                                if stats_response.status_code == 200:
                                    self.log_test("Volunteer Stats", True, "Volunteer stats retrieved")
                                    
                                    # Test create opportunity
                                    create_data = {
                                        "title": "Test Volunteer Opportunity",
                                        "organization": "Test Organization",
                                        "description": "Test description",
                                        "location": "Test Location",
                                        "date": datetime.utcnow().isoformat(),
                                        "volunteers_needed": 5
                                    }
                                    create_response = self.session.post(f"{API_BASE}/volunteer/create", json=create_data)
                                    if create_response.status_code == 200:
                                        self.log_test("Volunteer Create", True, "Opportunity created successfully")
                                        return True
                                    else:
                                        self.log_test("Volunteer Create", False, f"Status: {create_response.status_code}")
                                else:
                                    self.log_test("Volunteer Stats", False, f"Status: {stats_response.status_code}")
                            else:
                                self.log_test("Volunteer Categories", False, f"Status: {categories_response.status_code}")
                        else:
                            self.log_test("Volunteer Registrations", False, f"Status: {registrations_response.status_code}")
                    else:
                        self.log_test("Volunteer Register", False, f"Status: {register_response.status_code}")
                else:
                    self.log_test("Volunteer Opportunities", False, "No opportunities returned", opportunities)
            else:
                self.log_test("Volunteer Opportunities", False, f"Status: {response.status_code}", response.text)
            return False
        except Exception as e:
            self.log_test("Volunteer API", False, f"Error: {str(e)}")
            return False
    
    def test_marriage_endpoints(self):
        """Test Marriage API endpoints"""
        if not self.access_token:
            self.log_test("Marriage API", False, "No access token available")
            return False
            
        try:
            # Test get profiles
            response = self.session.get(f"{API_BASE}/marriage/profiles")
            if response.status_code == 200:
                profiles = response.json()
                if isinstance(profiles, list):
                    self.log_test("Marriage Profiles GET", True, f"Retrieved {len(profiles)} profiles")
                    
                    # Test create profile
                    profile_data = {
                        "age": 28,
                        "gender": "male",
                        "location": "Test City",
                        "education": "Bachelor's Degree",
                        "profession": "Software Engineer",
                        "bio": "Test profile for API testing"
                    }
                    create_response = self.session.post(f"{API_BASE}/marriage/profile", json=profile_data)
                    if create_response.status_code == 200:
                        self.log_test("Marriage Profile CREATE", True, "Profile created successfully")
                        
                        # Test get my profile
                        my_profile_response = self.session.get(f"{API_BASE}/marriage/profile/me")
                        if my_profile_response.status_code == 200:
                            self.log_test("Marriage Profile GET Mine", True, "User profile retrieved")
                            
                            # Test update profile
                            update_data = {"bio": "Updated bio for testing"}
                            update_response = self.session.put(f"{API_BASE}/marriage/profile/me", json=update_data)
                            if update_response.status_code == 200:
                                self.log_test("Marriage Profile UPDATE", True, "Profile updated successfully")
                                
                                # Test express interest (if profiles exist)
                                if len(profiles) > 0:
                                    profile_id = profiles[0]["id"]
                                    interest_response = self.session.post(f"{API_BASE}/marriage/interest/{profile_id}")
                                    if interest_response.status_code == 200:
                                        self.log_test("Marriage Interest", True, "Interest expressed successfully")
                                        
                                        # Test get received interests
                                        interests_response = self.session.get(f"{API_BASE}/marriage/interests/received")
                                        if interests_response.status_code == 200:
                                            self.log_test("Marriage Interests Received", True, "Received interests retrieved")
                                            
                                            # Test compatibility check
                                            compatibility_response = self.session.get(f"{API_BASE}/marriage/compatibility/{profile_id}")
                                            if compatibility_response.status_code == 200:
                                                self.log_test("Marriage Compatibility", True, "Compatibility calculated")
                                                
                                                # Test success stories
                                                stories_response = self.session.get(f"{API_BASE}/marriage/success-stories")
                                                if stories_response.status_code == 200:
                                                    self.log_test("Marriage Success Stories", True, "Success stories retrieved")
                                                    return True
                                                else:
                                                    self.log_test("Marriage Success Stories", False, f"Status: {stories_response.status_code}")
                                            else:
                                                self.log_test("Marriage Compatibility", False, f"Status: {compatibility_response.status_code}")
                                        else:
                                            self.log_test("Marriage Interests Received", False, f"Status: {interests_response.status_code}")
                                    else:
                                        self.log_test("Marriage Interest", False, f"Status: {interest_response.status_code}")
                                else:
                                    self.log_test("Marriage Interest", True, "Skipped - no profiles available for interest")
                                    return True
                            else:
                                self.log_test("Marriage Profile UPDATE", False, f"Status: {update_response.status_code}")
                        else:
                            self.log_test("Marriage Profile GET Mine", False, f"Status: {my_profile_response.status_code}")
                    else:
                        self.log_test("Marriage Profile CREATE", False, f"Status: {create_response.status_code}")
                else:
                    self.log_test("Marriage Profiles GET", False, "Invalid response format", profiles)
            else:
                self.log_test("Marriage Profiles GET", False, f"Status: {response.status_code}", response.text)
            return False
        except Exception as e:
            self.log_test("Marriage API", False, f"Error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting MyEmaan Islamic App Backend API Tests")
        print("=" * 60)
        
        # Basic connectivity
        if not self.test_root_endpoint():
            print("❌ Cannot connect to backend. Stopping tests.")
            return False
        
        # Authentication tests
        if not self.test_user_registration():
            print("❌ User registration failed. Stopping tests.")
            return False
            
        self.test_user_login()
        self.test_user_profile()
        
        # Feature tests
        self.test_quran_endpoints()
        self.test_maps_endpoints()
        self.test_community_endpoints()
        self.test_charity_endpoints()
        self.test_duas_endpoints()
        self.test_islamic_finance_endpoints()
        self.test_volunteer_endpoints()
        self.test_marriage_endpoints()
        
        # Summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        failed = total - passed
        
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"📈 Success Rate: {(passed/total*100):.1f}%")
        
        if failed > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"   ❌ {result['test']}: {result['details']}")
        
        return failed == 0

if __name__ == "__main__":
    tester = APITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)