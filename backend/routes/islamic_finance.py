from fastapi import APIRouter, Depends
from typing import List
from server import db, get_current_user
from models import IslamicFinanceProduct
import uuid
from datetime import datetime

router = APIRouter(prefix="/api/islamic-finance", tags=["islamic-finance"])

# Mock Islamic finance products
FINANCE_PRODUCTS = [
    {
        "id": str(uuid.uuid4()),
        "name": "Sharia Compliant Savings Account",
        "type": "savings",
        "description": "Profit-sharing savings account based on Mudarabah principles",
        "minimum_amount": 100.0,
        "expected_return": 3.5,
        "risk_level": "Low",
        "sharia_compliant": True,
        "features": ["No interest (Riba)", "Profit sharing", "Sharia Board approved"],
        "bank": "Al-Baraka Islamic Bank"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Sukuk Investment Fund",
        "type": "investment",
        "description": "Investment in Islamic bonds (Sukuk) portfolio",
        "minimum_amount": 1000.0,
        "expected_return": 6.2,
        "risk_level": "Medium",
        "sharia_compliant": True,
        "features": ["Asset-backed securities", "Regular profit distribution", "Diversified portfolio"],
        "bank": "Dubai Islamic Bank"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Murabaha Home Finance",
        "type": "financing",
        "description": "Home financing based on Murabaha (cost-plus) structure",
        "minimum_amount": 50000.0,
        "expected_return": None,
        "risk_level": "Low",
        "sharia_compliant": True,
        "features": ["No interest", "Asset ownership transfer", "Flexible repayment"],
        "bank": "Kuwait Finance House"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Halal Stock Investment",
        "type": "investment",
        "description": "Investment in Sharia-compliant stocks and equities",
        "minimum_amount": 500.0,
        "expected_return": 8.5,
        "risk_level": "High",
        "sharia_compliant": True,
        "features": ["Sharia-screened stocks", "Regular monitoring", "Zakat calculation"],
        "bank": "Al-Rajhi Bank"
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Commodity Murabaha",
        "type": "investment",
        "description": "Short-term investment in commodities using Murabaha",
        "minimum_amount": 10000.0,
        "expected_return": 4.8,
        "risk_level": "Medium",
        "sharia_compliant": True,
        "features": ["Short-term", "Commodity-backed", "Competitive returns"],
        "bank": "Maybank Islamic"
    }
]

@router.get("/products", response_model=List[IslamicFinanceProduct])
async def get_finance_products(type: str = None, current_user: dict = Depends(get_current_user)):
    products = FINANCE_PRODUCTS
    if type:
        products = [product for product in products if product["type"] == type]
    return products

@router.get("/halal-stocks")
async def get_halal_stocks(current_user: dict = Depends(get_current_user)):
    stocks = [
        {
            "symbol": "AAPL",
            "company": "Apple Inc.",
            "price": 175.43,
            "change": 2.1,
            "change_percent": 1.21,
            "halal_status": "Compliant",
            "sector": "Technology",
            "market_cap": "2.8T"
        },
        {
            "symbol": "MSFT",
            "company": "Microsoft Corporation",
            "price": 378.85,
            "change": -1.5,
            "change_percent": -0.39,
            "halal_status": "Compliant",
            "sector": "Technology",
            "market_cap": "2.8T"
        },
        {
            "symbol": "AMZN",
            "company": "Amazon.com Inc.",
            "price": 143.22,
            "change": 0.8,
            "change_percent": 0.56,
            "halal_status": "Under Review",
            "sector": "E-commerce",
            "market_cap": "1.5T"
        },
        {
            "symbol": "TSLA",
            "company": "Tesla Inc.",
            "price": 248.50,
            "change": 5.2,
            "change_percent": 2.14,
            "halal_status": "Compliant",
            "sector": "Automotive",
            "market_cap": "790B"
        }
    ]
    return stocks

@router.get("/investment-calculator")
async def investment_calculator(
    principal: float,
    return_rate: float,
    years: int,
    current_user: dict = Depends(get_current_user)
):
    # Simple compound return calculation (halal profit sharing)
    final_amount = principal * ((1 + return_rate / 100) ** years)
    total_return = final_amount - principal
    
    # Calculate recommended zakat
    zakat_due = final_amount * 0.025 if final_amount >= 4340 else 0
    
    return {
        "principal": principal,
        "return_rate": return_rate,
        "years": years,
        "final_amount": round(final_amount, 2),
        "total_return": round(total_return, 2),
        "zakat_due": round(zakat_due, 2),
        "monthly_contribution": round(principal / (years * 12), 2)
    }

@router.get("/market-news")
async def get_islamic_finance_news(current_user: dict = Depends(get_current_user)):
    news = [
        {
            "title": "Global Sukuk Market Reaches $200 Billion",
            "summary": "The Islamic bond market continues to show strong growth worldwide",
            "date": "2024-01-15",
            "source": "Islamic Finance News",
            "category": "Market Update"
        },
        {
            "title": "New Sharia-Compliant ETF Launched",
            "summary": "A new exchange-traded fund focusing on halal investments debuts",
            "date": "2024-01-14",
            "source": "Financial Times",
            "category": "Product Launch"
        },
        {
            "title": "Islamic Banking Adoption Increases 15%",
            "summary": "More consumers are choosing Sharia-compliant banking options",
            "date": "2024-01-13",
            "source": "Reuters",
            "category": "Industry Trends"
        }
    ]
    return news

@router.post("/portfolio/add")
async def add_to_portfolio(
    product_id: str,
    amount: float,
    current_user: dict = Depends(get_current_user)
):
    # In a real app, this would handle actual investment
    portfolio_item = {
        "id": str(uuid.uuid4()),
        "product_id": product_id,
        "amount": amount,
        "date_invested": datetime.utcnow(),
        "user_id": current_user["id"]
    }
    
    return {
        "message": "Investment added to portfolio",
        "investment_id": portfolio_item["id"]
    }

@router.get("/portfolio")
async def get_user_portfolio(current_user: dict = Depends(get_current_user)):
    # Mock portfolio data
    portfolio = [
        {
            "product_name": "Sharia Compliant Savings",
            "amount_invested": 5000.0,
            "current_value": 5175.0,
            "return_percent": 3.5,
            "date_invested": "2023-12-01"
        },
        {
            "product_name": "Sukuk Investment Fund",
            "amount_invested": 10000.0,
            "current_value": 10620.0,
            "return_percent": 6.2,
            "date_invested": "2023-11-15"
        }
    ]
    
    total_invested = sum(item["amount_invested"] for item in portfolio)
    total_current = sum(item["current_value"] for item in portfolio)
    total_return = total_current - total_invested
    
    return {
        "portfolio": portfolio,
        "summary": {
            "total_invested": total_invested,
            "current_value": total_current,
            "total_return": total_return,
            "return_percent": (total_return / total_invested * 100) if total_invested > 0 else 0
        }
    }