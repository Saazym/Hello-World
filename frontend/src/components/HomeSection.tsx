import { useState, useEffect } from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Star, Trophy, Users, BookOpen, Clock, Flame, Target, Check, Play, ChevronLeft, ChevronRight, MapPin, Globe, Building, Navigation, Heart, Sun, MessageCircle, ShoppingCart, Bot, Sparkles } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { AIRecommendationBot } from './AIRecommendationBot'
import { motion } from 'motion/react'
import logoImage from 'figma:asset/59574aba7471d4e7c082b728f3637a2664302b6a.png'

interface HomeSectionProps {
  onNavigate?: (page: string) => void
}

interface PrayerTime {
  name: string
  time: string
  status: 'completed' | 'current' | 'upcoming'
  next: boolean
}

interface Location {
  latitude: number
  longitude: number
  city: string
  country: string
}

const weeklyChampions = [
  {
    name: "Ahmed Hassan",
    mosque: "Al-Noor Mosque",
    achievement: "Prayer Leader",
    points: 98,
    streak: 15
  },
  {
    name: "Fatima Al-Zahra",
    mosque: "Masjid As-Salam", 
    achievement: "Quran Reader",
    points: 156,
    streak: 22
  },
  {
    name: "Omar Abdullah",
    mosque: "Islamic Center",
    achievement: "Volunteer",
    points: 89,
    streak: 8
  },
  {
    name: "Zainab Malik",
    mosque: "Baitul Mukarram",
    achievement: "Charity Helper",
    points: 134,
    streak: 12
  }
]

// Real-time statistics - Updated to reflect global Muslim community
const stats = [
  { label: "Muslims Worldwide", value: "1.8B+", icon: "🌍" },
  { label: "Active Mosques", value: "3.6M+", icon: "🕌" },
  { label: "Daily Prayers", value: "9B+", icon: "🤲" },
  { label: "Quran Readers Today", value: "847K+", icon: "📖" }
]

const islamicInfluencersData = {
  local: [
    {
      id: 1,
      name: "Sheikh Ahmed Rahman",
      title: "Local Mosque Imam",
      thumbnail: "https://images.unsplash.com/photo-1547807277-7fa9b944effe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtdXNsaW0lMjBicm90aGVyJTIwbWFuJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU4MTI2Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      videoTitle: "Friday Khutbah: Building Community",
      duration: "18:45",
      views: "2.3K",
      category: "Local"
    },
    {
      id: 2,
      name: "Ustadh Kareem Ali",
      title: "Youth Islamic Teacher",
      thumbnail: "https://images.unsplash.com/photo-1705320941669-4909d97cb5cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtdXNsaW0lMjBtZW4lMjBjb21tdW5pdHklMjBwcmF5ZXJ8ZW58MXx8fHwxNzU4MTI2NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      videoTitle: "Islamic Values for Modern Youth",
      duration: "12:30",
      views: "1.8K",
      category: "Local"
    },
    {
      id: 3,
      name: "Sister Aisha Mohammad",
      title: "Women's Islamic Circle",
      thumbnail: "https://images.unsplash.com/photo-1683828936774-73fc3aafd6d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHxtdXNsaW0lMjBjb21tdW5pdHklMjBpbmRpYSUyMGJyb3RoZXJzJTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1ODEyNjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      videoTitle: "Motherhood in Islam: Tips",
      duration: "25:15",
      views: "3.1K",
      category: "Local"
    }
  ],
  district: [
    {
      id: 4,
      name: "Dr. Rashid Hassan",
      title: "District Islamic Scholar",
      thumbnail: "https://images.unsplash.com/photo-1547807277-7fa9b944effe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtdXNsaW0lMjBicm90aGVyJTIwbWFuJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU4MTI2Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      videoTitle: "Fiqh Explained: Daily Issues",
      duration: "35:20",
      views: "15.7K",
      category: "District"
    },
    {
      id: 5,
      name: "Imam Yusuf Ibrahim",
      title: "Regional Conference Speaker",
      thumbnail: "https://images.unsplash.com/photo-1705320941669-4909d97cb5cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtdXNsaW0lMjBtZW4lMjBjb21tdW5pdHklMjBwcmF5ZXJ8ZW58MXx8fHwxNzU4MTI2NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      videoTitle: "Community Service: Islamic Duty",
      duration: "28:40",
      views: "8.9K",
      category: "District"
    },
    {
      id: 6,
      name: "Sheikh Mohammad Farooq",
      title: "Hadith Expert",
      thumbnail: "https://images.unsplash.com/photo-1683828936774-73fc3aafd6d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHxtdXNsaW0lMjBjb21tdW5pdHklMjBpbmRpYSUyMGJyb3RoZXJzJTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1ODEyNjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      videoTitle: "Beautiful Hadith About Patience",
      duration: "22:15",
      views: "12.4K",
      category: "District"
    }
  ],
  national: [
    {
      id: 7,
      name: "Dr. Zakir Naik",
      title: "Islamic Research Foundation",
      thumbnail: "https://images.unsplash.com/photo-1547807277-7fa9b944effe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtdXNsaW0lMjBicm90aGVyJTIwbWFuJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU4MTI2Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      videoTitle: "Comparative Religion Study",
      duration: "45:30",
      views: "89.2K",
      category: "National"
    },
    {
      id: 8,
      name: "Maulana Wahiduddin Khan",
      title: "Islamic Thinker & Author",
      thumbnail: "https://images.unsplash.com/photo-1705320941669-4909d97cb5cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtdXNsaW0lMjBtZW4lMjBjb21tdW5pdHklMjBwcmF5ZXJ8ZW58MXx8fHwxNzU4MTI2NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      videoTitle: "Islam and Modern Science",
      duration: "38:15",
      views: "67.5K",
      category: "National"
    },
    {
      id: 9,
      name: "Dr. A.P.J. Abdul Kalam",
      title: "Former President of India",
      thumbnail: "https://images.unsplash.com/photo-1683828936774-73fc3aafd6d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHxtdXNsaW0lMjBjb21tdW5pdHklMjBpbmRpYSUyMGJyb3RoZXJzJTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1ODEyNjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      videoTitle: "Dreams, Knowledge & Faith",
      duration: "32:20",
      views: "156K",
      category: "National"
    }
  ],
  international: [
    {
      id: 10,
      name: "Sheikh Yasir Qadhi",
      title: "International Islamic Scholar",
      thumbnail: "https://images.unsplash.com/photo-1547807277-7fa9b944effe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtdXNsaW0lMjBicm90aGVyJTIwbWFuJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU4MTI2Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      videoTitle: "Understanding Islamic Finance",
      duration: "52:30",
      views: "425K",
      category: "International"
    },
    {
      id: 11,
      name: "Ustadh Nouman Ali Khan",
      title: "Bayyinah Institute",
      thumbnail: "https://images.unsplash.com/photo-1705320941669-4909d97cb5cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtdXNsaW0lMjBtZW4lMjBjb21tdW5pdHklMjBwcmF5ZXJ8ZW58MXx8fHwxNzU4MTI2NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      videoTitle: "Miracle of Quran Analysis",
      duration: "1:15:45",
      views: "789K",
      category: "International"
    },
    {
      id: 12,
      name: "Mufti Menk",
      title: "Grand Mufti of Zimbabwe",
      thumbnail: "https://images.unsplash.com/photo-1683828936774-73fc3aafd6d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHxtdXNsaW0lMjBjb21tdW5pdHklMjBpbmRpYSUyMGJyb3RoZXJzJTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1ODEyNjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      videoTitle: "Hope in Times of Trial",
      duration: "28:30",
      views: "1.2M",
      category: "International"
    }
  ]
}

// Prayer time calculation based on location (simplified Islamic calculation)
const calculatePrayerTimes = (location: Location, date: Date): PrayerTime[] => {
  const { latitude, longitude } = location
  
  // Simplified calculation - in real app would use proper Islamic calculation methods
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
  const solarDeclination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * Math.PI / 180)
  
  // Calculate sun times (simplified)
  const timeZoneOffset = date.getTimezoneOffset() / 60
  const noon = 12 - timeZoneOffset - (longitude / 15)
  
  // Calculate prayer times (approximate)
  const fajrTime = noon - 6.5
  const dhuhrTime = noon + 0.5
  const asrTime = noon + 4
  const maghribTime = noon + 6.5
  const ishaTime = noon + 8
  
  const formatTime = (time: number) => {
    const hours = Math.floor(time)
    const minutes = Math.floor((time - hours) * 60)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }
  
  const currentHour = date.getHours() + date.getMinutes() / 60
  
  const prayers = [
    { name: "Fajr", time: formatTime(fajrTime), rawTime: fajrTime },
    { name: "Dhuhr", time: formatTime(dhuhrTime), rawTime: dhuhrTime },
    { name: "Asr", time: formatTime(asrTime), rawTime: asrTime },
    { name: "Maghrib", time: formatTime(maghribTime), rawTime: maghribTime },
    { name: "Isha", time: formatTime(ishaTime), rawTime: ishaTime },
  ]
  
  // Determine current prayer status
  let nextPrayerIndex = prayers.findIndex(p => p.rawTime > currentHour)
  if (nextPrayerIndex === -1) nextPrayerIndex = 0 // Next day Fajr
  
  return prayers.map((prayer, index) => ({
    name: prayer.name,
    time: prayer.time,
    status: index < nextPrayerIndex ? 'completed' : 
            index === nextPrayerIndex ? 'current' : 'upcoming',
    next: index === nextPrayerIndex
  })) as PrayerTime[]
}

// Default location (Bangalore, India)
const DEFAULT_LOCATION: Location = {
  latitude: 12.9716,
  longitude: 77.5946,
  city: "Bangalore",
  country: "India"
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [location, setLocation] = useState<Location>(DEFAULT_LOCATION)
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([])
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null)
  const [timeUntilNext, setTimeUntilNext] = useState("")
  const [currentVideoIndices, setCurrentVideoIndices] = useState({
    local: 0,
    district: 0,
    national: 0,
    international: 0
  })
  const [locationError, setLocationError] = useState<string | null>(null)
  const [showAIBot, setShowAIBot] = useState(false)
  const [botNotificationCount, setBotNotificationCount] = useState(3)
  const [userIQ, setUserIQ] = useState(127) // User's current IQ score
  const [realTimeStats, setRealTimeStats] = useState(stats)

  // Shuffle videos function
  const shuffleVideo = (category: 'local' | 'district' | 'national' | 'international') => {
    setCurrentVideoIndices(prev => ({
      ...prev,
      [category]: (prev[category] + 1) % islamicInfluencersData[category].length
    }))
  }

  // Auto-shuffle videos every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const categories: Array<'local' | 'district' | 'national' | 'international'> = ['local', 'district', 'national', 'international']
      const randomCategory = categories[Math.floor(Math.random() * categories.length)]
      shuffleVideo(randomCategory)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Show AI bot after 10 seconds of being on home page
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAIBot(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  // Update real-time statistics every minute
  useEffect(() => {
    const updateStats = () => {
      setRealTimeStats(prevStats => 
        prevStats.map(stat => {
          if (stat.label === "Daily Prayers") {
            // Increment prayers by random amount (simulating real-time updates)
            const currentValue = parseFloat(stat.value.replace(/[B+]/g, ''))
            const increment = Math.random() * 0.001 // Small increment
            return { ...stat, value: `${(currentValue + increment).toFixed(1)}B+` }
          } else if (stat.label === "Quran Readers Today") {
            const currentValue = parseFloat(stat.value.replace(/[K+]/g, ''))
            const increment = Math.floor(Math.random() * 5) + 1 // 1-5 new readers
            return { ...stat, value: `${Math.floor(currentValue + increment)}K+` }
          }
          return stat
        })
      )
    }

    const interval = setInterval(updateStats, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          
          try {
            // Try to get city name using reverse geocoding (simplified)
            // In real app, you'd use a proper geocoding service
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            const data = await response.json()
            
            setLocation({
              latitude,
              longitude,
              city: data.city || data.locality || "Unknown City",
              country: data.countryName || "Unknown Country"
            })
          } catch (error) {
            // If geocoding fails, use coordinates
            setLocation({
              latitude,
              longitude,
              city: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
              country: "Unknown"
            })
          }
        },
        (error) => {
          setLocationError("Location access denied. Using default location (Bangalore).")
          console.log("Location error:", error.message)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      )
    } else {
      setLocationError("Geolocation not supported. Using default location (Bangalore).")
    }
  }, [])

  // Calculate prayer times when location or date changes
  useEffect(() => {
    const prayers = calculatePrayerTimes(location, currentTime)
    setPrayerTimes(prayers)
    
    const next = prayers.find(p => p.next) || prayers[0] // If no next prayer today, use Fajr tomorrow
    setNextPrayer(next)
  }, [location, currentTime])

  // Update current time and countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      
      if (nextPrayer) {
        const [hours, minutes] = nextPrayer.time.split(':').map(Number)
        const prayerTime = new Date()
        prayerTime.setHours(hours, minutes, 0, 0)
        
        // If prayer time has passed, it's for tomorrow
        if (prayerTime < now) {
          prayerTime.setDate(prayerTime.getDate() + 1)
        }
        
        const diff = prayerTime.getTime() - now.getTime()
        const hoursLeft = Math.floor(diff / (1000 * 60 * 60))
        const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        
        if (hoursLeft >= 0 && minutesLeft >= 0) {
          setTimeUntilNext(`${hoursLeft}h ${minutesLeft}m`)
        } else {
          // Recalculate prayer times if we've passed into a new prayer time
          const prayers = calculatePrayerTimes(location, now)
          setPrayerTimes(prayers)
          const next = prayers.find(p => p.next) || prayers[0]
          setNextPrayer(next)
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [nextPrayer, location])

  const getCurrentVideo = (category: 'local' | 'district' | 'national' | 'international') => {
    return islamicInfluencersData[category][currentVideoIndices[category]]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 text-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-emerald-600 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-emerald-600 transform rotate-45"></div>
        <div className="absolute bottom-32 left-1/3 w-16 h-16 border-2 border-emerald-600 rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 md:px-6 md:py-20">
        {/* User Dashboard Section - Mobile First */}
        <div className="mb-8 md:hidden">
          <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Assalamu Alaikum, Ahmed</h2>
                <p className="text-sm text-gray-600">Keep up your amazing streak! 🔥</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs px-2 py-0.5">
                    🧠 IQ: {userIQ}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs px-2 py-0.5">
                    🎯 Above Average
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600">7</div>
                <div className="text-xs text-gray-500">Day Streak</div>
              </div>
            </div>
            
            {/* Points and Streak */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg p-3 text-white text-center">
                <Flame className="w-5 h-5 mx-auto mb-1" />
                <div className="text-lg font-bold">35</div>
                <div className="text-xs opacity-90">Prayer Streak</div>
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-3 text-white text-center">
                <Star className="w-5 h-5 mx-auto mb-1" />
                <div className="text-lg font-bold">1,250</div>
                <div className="text-xs opacity-90">Total Points</div>
              </div>
            </div>

            {/* Islamic Influencers - 4 Tile Layout */}
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-3 border border-purple-200 mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">Islamic Influencers</span>
                </div>
                <Badge className="bg-purple-600 text-white text-xs">Live</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {/* Local */}
                <div className="relative cursor-pointer" onClick={() => shuffleVideo('local')}>
                  <ImageWithFallback
                    src={getCurrentVideo('local').thumbnail}
                    alt={getCurrentVideo('local').name}
                    className="w-full h-16 object-cover rounded"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1 py-0.5 rounded flex items-center">
                    <Navigation className="w-2 h-2 mr-1" />
                    Local
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                    {getCurrentVideo('local').views}
                  </div>
                  <div className="mt-1 text-xs font-medium text-purple-800 truncate">{getCurrentVideo('local').name}</div>
                </div>

                {/* District */}
                <div className="relative cursor-pointer" onClick={() => shuffleVideo('district')}>
                  <ImageWithFallback
                    src={getCurrentVideo('district').thumbnail}
                    alt={getCurrentVideo('district').name}
                    className="w-full h-16 object-cover rounded"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-1 left-1 bg-green-600 text-white text-xs px-1 py-0.5 rounded flex items-center">
                    <Building className="w-2 h-2 mr-1" />
                    District
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                    {getCurrentVideo('district').views}
                  </div>
                  <div className="mt-1 text-xs font-medium text-purple-800 truncate">{getCurrentVideo('district').name}</div>
                </div>

                {/* National */}
                <div className="relative cursor-pointer" onClick={() => shuffleVideo('national')}>
                  <ImageWithFallback
                    src={getCurrentVideo('national').thumbnail}
                    alt={getCurrentVideo('national').name}
                    className="w-full h-16 object-cover rounded"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-1 left-1 bg-amber-600 text-white text-xs px-1 py-0.5 rounded flex items-center">
                    <Star className="w-2 h-2 mr-1" />
                    National
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                    {getCurrentVideo('national').views}
                  </div>
                  <div className="mt-1 text-xs font-medium text-purple-800 truncate">{getCurrentVideo('national').name}</div>
                </div>

                {/* International */}
                <div className="relative cursor-pointer" onClick={() => shuffleVideo('international')}>
                  <ImageWithFallback
                    src={getCurrentVideo('international').thumbnail}
                    alt={getCurrentVideo('international').name}
                    className="w-full h-16 object-cover rounded"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-1 left-1 bg-red-600 text-white text-xs px-1 py-0.5 rounded flex items-center">
                    <Globe className="w-2 h-2 mr-1" />
                    Global
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                    {getCurrentVideo('international').views}
                  </div>
                  <div className="mt-1 text-xs font-medium text-purple-800 truncate">{getCurrentVideo('international').name}</div>
                </div>
              </div>
            </div>

            {/* Top Influential Muslims Tab */}
            <div 
              className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg p-3 border border-amber-200 cursor-pointer hover:from-amber-200 hover:to-yellow-200 transition-all duration-200"
              onClick={() => onNavigate?.('influential-muslims')}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">Top 100 Influential Muslims</span>
                </div>
                <Badge className="bg-amber-600 text-white text-xs">Explore</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">1</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-amber-900">Prophet Muhammad (PBUH)</div>
                    <div className="text-xs text-amber-700">The Final Messenger</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-amber-800">IQ: ∞</div>
                  <div className="text-xs text-amber-600">Wisdom Level</div>
                </div>
              </div>
              
              <div className="mt-2 flex items-center gap-1">
                <div className="flex -space-x-1">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full border border-white text-xs flex items-center justify-center text-white font-bold">
                      {i+1}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-amber-700 ml-1">+97 more influential Muslims</span>
              </div>
            </div>
          </div>

          {/* Prayer Status - Mobile with Live Time and Location */}
          <div className="mt-4 bg-white rounded-xl p-4 border border-emerald-200 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Today's Prayers</h3>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <div className="text-xs text-gray-500">
                  {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Location Display */}
            <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center text-xs text-blue-800">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="font-medium">{location.city}, {location.country}</span>
                {locationError && (
                  <span className="ml-2 text-orange-600">({locationError.split('.')[0]})</span>
                )}
              </div>
            </div>
            
            {nextPrayer && (
              <div className="mb-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
                <div className="text-xs text-amber-800">
                  Next Prayer: <span className="font-medium">{nextPrayer.name}</span> in {timeUntilNext}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-5 gap-2">
              {prayerTimes.map((prayer, index) => (
                <div key={index} className="text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 ${
                    prayer.status === 'completed' ? 'bg-green-500 text-white' :
                    prayer.status === 'current' ? 'bg-amber-500 text-white animate-pulse' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {prayer.status === 'completed' ? (
                      <Check className="w-4 h-4" />
                    ) : prayer.status === 'current' ? (
                      <Clock className="w-3 h-3" />
                    ) : (
                      <Target className="w-3 h-3" />
                    )}
                  </div>
                  <div className={`text-xs ${
                    prayer.status === 'current' ? 'text-amber-600 font-medium' : 'text-gray-600'
                  }`}>{prayer.name}</div>
                  <div className={`text-xs ${
                    prayer.status === 'current' ? 'text-amber-500 font-medium' : 'text-gray-500'
                  }`}>{prayer.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Section - Desktop */}
        <div className="text-center mb-16 hidden md:block">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full p-4 border-4 border-emerald-300 shadow-2xl flex items-center justify-center">
              <img 
                src={logoImage} 
                alt="My Emaan Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent font-bold">
            My Emaan
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Strengthening the Ummah through Technology, Unity, and Faith
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-4 py-2">
              ✨ Connect with your Community
            </Badge>
            <Badge className="bg-teal-100 text-teal-800 border-teal-200 px-4 py-2">
              📿 Track Your Spiritual Journey
            </Badge>
            <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
              🤝 Make a Difference Together
            </Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
              onClick={() => onNavigate?.('quran')}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Start Reading Quran
            </Button>
            <Button 
              variant="outline" 
              className="border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white px-8 py-3"
              onClick={() => onNavigate?.('community')}
            >
              <Users className="w-5 h-5 mr-2" />
              Find Local Events
            </Button>
          </div>
        </div>

        {/* Quick Action Cards - Mobile - 4 Features */}
        <div className="grid grid-cols-2 gap-4 mb-6 md:hidden">
          <Button 
            className="h-20 flex flex-col items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg"
            onClick={() => onNavigate?.('quran')}
          >
            <BookOpen className="w-6 h-6 mb-1" />
            <span className="text-xs">Quran Reader</span>
          </Button>
          <Button 
            className="h-20 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg"
            onClick={() => onNavigate?.('maps')}
          >
            <MapPin className="w-6 h-6 mb-1" />
            <span className="text-xs">Find Mosques</span>
          </Button>
          <Button 
            className="h-20 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg"
            onClick={() => onNavigate?.('community')}
          >
            <Users className="w-6 h-6 mb-1" />
            <span className="text-xs">Community</span>
          </Button>
          <Button 
            className="h-20 flex flex-col items-center justify-center bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-lg"
            onClick={() => onNavigate?.('charity')}
          >
            <Heart className="w-6 h-6 mb-1" />
            <span className="text-xs">Charity Track</span>
          </Button>
        </div>

        {/* Community Stats - Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-16">
          {realTimeStats.map((stat, index) => (
            <Card key={index} className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
              <CardContent className="p-4 md:p-6 text-center relative z-10">
                <div className="text-3xl md:text-4xl mb-2">{stat.icon}</div>
                <div className="text-xl md:text-2xl font-bold text-emerald-600 mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
                {(stat.label === "Daily Prayers" || stat.label === "Quran Readers Today") && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600">Live</span>
                  </div>
                )}
              </CardContent>
              {/* Subtle animation background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>

        {/* Weekly Champions - Desktop */}
        <div className="hidden md:block mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">🏆 Weekly Champions</h2>
            <p className="text-gray-600">Top contributors to our Islamic community</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weeklyChampions.map((champion, index) => (
              <Card key={index} className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                    index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                    index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-800' :
                    'bg-gradient-to-r from-emerald-500 to-emerald-700'
                  }`}>
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{champion.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{champion.mosque}</p>
                  <Badge className="bg-emerald-100 text-emerald-800 text-xs mb-3">
                    {champion.achievement}
                  </Badge>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span>{champion.points} pts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>{champion.streak}d</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 md:p-12 text-white mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Strengthen Your Faith Journey?</h2>
          <p className="text-lg md:text-xl mb-6 text-emerald-100">
            Join thousands of Muslims building stronger communities through technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-emerald-600 hover:bg-emerald-50 px-8"
              onClick={() => onNavigate?.('community')}
            >
              <Users className="w-5 h-5 mr-2" />
              Join Community
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent px-8"
              onClick={() => onNavigate?.('quran')}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Start Reading
            </Button>
          </div>
        </div>
      </div>

      {/* AI Recommendation Bot */}
      <AIRecommendationBot 
        isVisible={showAIBot} 
        onClose={() => setShowAIBot(false)}
        onNavigate={onNavigate}
      />
    </div>
  )
}