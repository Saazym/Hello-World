import { useState, useEffect } from 'react'

const tickerItems = [
  "🕌 Ramadan preparation classes starting Feb 15th at Al-Noor Center",
  "📚 New Quran study circle every Thursday 7PM - All welcome",
  "🤝 Community food drive this Saturday 9AM - Volunteers needed",  
  "📖 Youth Islamic history competition registration now open",
  "🌙 Special night prayers during last 10 nights of Rajab",
  "💡 Financial literacy workshop for families next Sunday",
  "🎓 Arabic language classes for beginners starting monthly",
  "🕊️ Interfaith dialogue session scheduled for Jan 25th"
]

export function RunningTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerItems.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white py-4 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="space-y-3">
          {/* Line 1: Title */}
          <div className="flex justify-center">
            <div className="bg-emerald-600 px-4 py-2 rounded-md text-sm font-medium">
              📢 Community Updates
            </div>
          </div>
          
          {/* Line 2: Current Ticker Item - Clear and Separated */}
          <div className="text-center">
            <div className="text-emerald-100 text-sm leading-relaxed px-4 py-2 bg-emerald-700/30 rounded-lg mx-auto max-w-4xl">
              {tickerItems[currentIndex]}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}