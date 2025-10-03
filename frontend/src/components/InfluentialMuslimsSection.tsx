import image_6ba09718dcaeefd1e8a2ae7f18e7c9ec71493c00 from 'figma:asset/6ba09718dcaeefd1e8a2ae7f18e7c9ec71493c00.png';
import image_6eca03affde232b289aa9191c947d3e502813b08 from 'figma:asset/6eca03affde232b289aa9191c947d3e502813b08.png';
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { 
  Brain, Star, Trophy, TrendingUp, Clock, Moon, Sun, Utensils, 
  BookOpen, DollarSign, Copy, CheckCircle, Users, Activity, 
  Calendar, Target, Zap, Heart, Shield, Award, ArrowRight,
  Globe, Play, ExternalLink, RefreshCw, Filter, User
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts'

// Mock data for top 100 influential Muslims
const influentialMuslims = [
  {
    id: 1,
    name: "Dr. Zakir Naik",
    title: "Islamic Scholar & Speaker",
    country: "India/Malaysia",
    category: "Scholar",
    image: image_6eca03affde232b289aa9191c947d3e502813b08,
    iqLevel: 150,
    influence: 95,
    followers: "25M+",
    specialization: "Comparative Religion & Da'wah",
    lifestyle: {
      wakeupTime: "4:00 AM",
      sleepTime: "11:00 PM",
      prayerConsistency: 100,
      quranDaily: 120, // minutes
      physicalActivity: 60, // minutes
      studyTime: 480, // 8 hours
      familyTime: 120,
      communityWork: 180
    },
    brainDevelopment: {
      memoryRetention: 98,
      analyticalThinking: 95,
      linguisticIntelligence: 99,
      emotionalIntelligence: 92,
      creativeProblemSolving: 89
    },
    emaanDevelopment: {
      dhikrDaily: 300, // minutes
      islamicStudy: 360,
      charitableActions: 95,
      communityService: 88,
      spiritualReflection: 90
    },
    financialGuidance: [
      "Invest in halal stocks and Islamic bonds",
      "Avoid interest-based investments completely",
      "Focus on real estate and gold as stable investments",
      "Always give 2.5% Zakat on savings annually",
      "Engage in ethical business practices"
    ],
    dailySchedule: [
      { time: "4:00 AM", activity: "Tahajjud & Fajr Prayer" },
      { time: "5:00 AM", activity: "Quran Recitation & Tafsir Study" },
      { time: "7:00 AM", activity: "Physical Exercise" },
      { time: "8:00 AM", activity: "Breakfast & Family Time" },
      { time: "9:00 AM", activity: "Research & Writing" },
      { time: "12:30 PM", activity: "Dhuhr Prayer & Lunch" },
      { time: "2:00 PM", activity: "Lectures & Da'wah Work" },
      { time: "3:30 PM", activity: "Asr Prayer" },
      { time: "4:00 PM", activity: "Community Meetings" },
      { time: "6:30 PM", activity: "Maghrib Prayer & Reflection" },
      { time: "7:30 PM", activity: "Dinner & Family Time" },
      { time: "8:00 PM", activity: "Isha Prayer" },
      { time: "9:00 PM", activity: "Reading & Personal Study" },
      { time: "11:00 PM", activity: "Sleep" }
    ]
  },
  {
    id: 2,
    name: "Mufti Menk",
    title: "Islamic Scholar & Motivational Speaker",
    country: "Zimbabwe",
    category: "Scholar",
    image: "https://images.unsplash.com/photo-1756412066323-a336d2becc10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBNdXNsaW0lMjBsZWFkZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTkxNzQwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    iqLevel: 145,
    influence: 93,
    followers: "15M+",
    specialization: "Islamic Guidance & Motivation",
    lifestyle: {
      wakeupTime: "4:30 AM",
      sleepTime: "10:30 PM",
      prayerConsistency: 100,
      quranDaily: 90,
      physicalActivity: 45,
      studyTime: 420,
      familyTime: 150,
      communityWork: 240
    },
    brainDevelopment: {
      memoryRetention: 94,
      analyticalThinking: 90,
      linguisticIntelligence: 96,
      emotionalIntelligence: 98,
      creativeProblemSolving: 91
    },
    emaanDevelopment: {
      dhikrDaily: 240,
      islamicStudy: 300,
      charitableActions: 92,
      communityService: 95,
      spiritualReflection: 94
    },
    financialGuidance: [
      "Prioritize halal income over maximum profit",
      "Build emergency fund covering 6 months expenses",
      "Invest in Islamic mutual funds and Sukuk",
      "Support Islamic microfinance initiatives",
      "Practice regular Sadaqah beyond Zakat"
    ],
    dailySchedule: [
      { time: "4:30 AM", activity: "Tahajjud & Morning Prayers" },
      { time: "5:30 AM", activity: "Quran & Hadith Study" },
      { time: "7:00 AM", activity: "Morning Walk & Exercise" },
      { time: "8:00 AM", activity: "Family Breakfast" },
      { time: "9:30 AM", activity: "Content Creation & Writing" },
      { time: "12:30 PM", activity: "Dhuhr & Lunch Break" },
      { time: "2:00 PM", activity: "Counseling & Guidance Sessions" },
      { time: "4:00 PM", activity: "Asr Prayer & Community Work" },
      { time: "6:30 PM", activity: "Maghrib & Family Time" },
      { time: "8:00 PM", activity: "Isha & Evening Programs" },
      { time: "9:30 PM", activity: "Personal Reflection" },
      { time: "10:30 PM", activity: "Sleep" }
    ]
  },
  {
    id: 3,
    name: "Dr. Yasir Qadhi",
    title: "Islamic Theologian & Academic",
    country: "USA",
    category: "Academic",
    image: image_6ba09718dcaeefd1e8a2ae7f18e7c9ec71493c00,
    iqLevel: 152,
    influence: 89,
    followers: "8M+",
    specialization: "Islamic Theology & Academic Research",
    lifestyle: {
      wakeupTime: "5:00 AM",
      sleepTime: "11:30 PM",
      prayerConsistency: 100,
      quranDaily: 105,
      physicalActivity: 40,
      studyTime: 540,
      familyTime: 120,
      communityWork: 150
    },
    brainDevelopment: {
      memoryRetention: 97,
      analyticalThinking: 99,
      linguisticIntelligence: 98,
      emotionalIntelligence: 88,
      creativeProblemSolving: 94
    },
    emaanDevelopment: {
      dhikrDaily: 180,
      islamicStudy: 420,
      charitableActions: 87,
      communityService: 85,
      spiritualReflection: 92
    },
    financialGuidance: [
      "Diversify investments across halal sectors",
      "Focus on education and skill development",
      "Establish Islamic educational endowments",
      "Support scholarly research financially",
      "Maintain transparency in all transactions"
    ],
    dailySchedule: [
      { time: "5:00 AM", activity: "Fajr Prayer & Dhikr" },
      { time: "6:00 AM", activity: "Academic Research" },
      { time: "8:00 AM", activity: "Family Breakfast" },
      { time: "9:00 AM", activity: "Teaching & Lectures" },
      { time: "12:30 PM", activity: "Dhuhr Prayer & Lunch" },
      { time: "2:00 PM", activity: "Writing & Publications" },
      { time: "3:30 PM", activity: "Asr Prayer" },
      { time: "4:00 PM", activity: "Student Consultations" },
      { time: "6:30 PM", activity: "Maghrib Prayer" },
      { time: "7:00 PM", activity: "Dinner & Family Time" },
      { time: "8:30 PM", activity: "Isha Prayer & Evening Study" },
      { time: "10:30 PM", activity: "Personal Reading" },
      { time: "11:30 PM", activity: "Sleep" }
    ]
  },
  {
    id: 4,
    name: "Dr. Ingrid Mattson",
    title: "Islamic Scholar & Educator",
    country: "Canada",
    category: "Academic",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1c5?w=300&h=300&fit=crop&crop=face",
    iqLevel: 148,
    influence: 85,
    followers: "3M+",
    specialization: "Islamic Studies & Gender Issues",
    lifestyle: {
      wakeupTime: "5:30 AM",
      sleepTime: "11:00 PM",
      prayerConsistency: 100,
      quranDaily: 90,
      physicalActivity: 45,
      studyTime: 480,
      familyTime: 180,
      communityWork: 120
    },
    brainDevelopment: {
      memoryRetention: 92,
      analyticalThinking: 96,
      linguisticIntelligence: 97,
      emotionalIntelligence: 94,
      creativeProblemSolving: 89
    },
    emaanDevelopment: {
      dhikrDaily: 200,
      islamicStudy: 300,
      charitableActions: 90,
      communityService: 92,
      spiritualReflection: 88
    },
    financialGuidance: [
      "Invest in women's education initiatives",
      "Support Islamic educational institutions",
      "Practice ethical consumption and spending",
      "Create endowments for future generations",
      "Balance career and family financial responsibilities"
    ],
    dailySchedule: [
      { time: "5:30 AM", activity: "Fajr Prayer & Morning Dhikr" },
      { time: "6:30 AM", activity: "Quran Study & Reflection" },
      { time: "8:00 AM", activity: "Family Breakfast & Morning Routine" },
      { time: "9:00 AM", activity: "Academic Research & Writing" },
      { time: "12:30 PM", activity: "Dhuhr Prayer & Lunch" },
      { time: "1:30 PM", activity: "Teaching & Student Consultations" },
      { time: "3:30 PM", activity: "Asr Prayer" },
      { time: "4:00 PM", activity: "Community Outreach Work" },
      { time: "6:30 PM", activity: "Maghrib Prayer & Family Time" },
      { time: "7:30 PM", activity: "Dinner & Personal Time" },
      { time: "8:30 PM", activity: "Isha Prayer & Evening Study" },
      { time: "10:00 PM", activity: "Reading & Preparation for Next Day" },
      { time: "11:00 PM", activity: "Sleep" }
    ]
  },
  {
    id: 5,
    name: "Hamza Yusuf",
    title: "Islamic Scholar & Educator",
    country: "USA",
    category: "Scholar",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=300&fit=crop&crop=face",
    iqLevel: 155,
    influence: 91,
    followers: "12M+",
    specialization: "Classical Islamic Texts & Philosophy",
    lifestyle: {
      wakeupTime: "4:45 AM",
      sleepTime: "10:45 PM",
      prayerConsistency: 100,
      quranDaily: 150,
      physicalActivity: 30,
      studyTime: 600,
      familyTime: 120,
      communityWork: 180
    },
    brainDevelopment: {
      memoryRetention: 99,
      analyticalThinking: 97,
      linguisticIntelligence: 99,
      emotionalIntelligence: 91,
      creativeProblemSolving: 93
    },
    emaanDevelopment: {
      dhikrDaily: 360,
      islamicStudy: 480,
      charitableActions: 88,
      communityService: 86,
      spiritualReflection: 95
    },
    financialGuidance: [
      "Invest in authentic Islamic education",
      "Support traditional Islamic arts and sciences",
      "Focus on long-term sustainable investments",
      "Avoid speculative and high-risk ventures",
      "Maintain simplicity in lifestyle despite wealth"
    ],
    dailySchedule: [
      { time: "4:45 AM", activity: "Tahajjud & Fajr Prayers" },
      { time: "5:30 AM", activity: "Quran Memorization & Review" },
      { time: "7:00 AM", activity: "Light Exercise & Fresh Air" },
      { time: "8:00 AM", activity: "Breakfast & Family Time" },
      { time: "9:00 AM", activity: "Classical Text Study & Research" },
      { time: "12:30 PM", activity: "Dhuhr Prayer & Lunch Break" },
      { time: "2:00 PM", activity: "Writing & Content Creation" },
      { time: "3:30 PM", activity: "Asr Prayer" },
      { time: "4:00 PM", activity: "Teaching & Lectures" },
      { time: "6:30 PM", activity: "Maghrib Prayer & Reflection" },
      { time: "7:30 PM", activity: "Dinner & Family Discussion" },
      { time: "8:30 PM", activity: "Isha Prayer & Evening Programs" },
      { time: "9:30 PM", activity: "Personal Study & Reading" },
      { time: "10:45 PM", activity: "Sleep" }
    ]
  }
  // Add more influential Muslims here... (up to 100)
]

const categories = [
  { id: 'all', label: 'All Categories', icon: Globe },
  { id: 'scholar', label: 'Scholars', icon: BookOpen },
  { id: 'academic', label: 'Academics', icon: Trophy },
  { id: 'entrepreneur', label: 'Entrepreneurs', icon: TrendingUp },
  { id: 'activist', label: 'Activists', icon: Heart },
  { id: 'artist', label: 'Artists', icon: Star }
]

interface InfluentialMuslimsSectionProps {
  onNavigate?: (page: string, data?: any) => void
}

export function InfluentialMuslimsSection({ onNavigate }: InfluentialMuslimsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isRotating, setIsRotating] = useState(true)

  // Auto-rotate through influential Muslims
  useEffect(() => {
    if (!isRotating) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % influentialMuslims.length)
    }, 4000) // Rotate every 4 seconds

    return () => clearInterval(interval)
  }, [isRotating])

  const filteredMuslims = selectedCategory === 'all' 
    ? influentialMuslims 
    : influentialMuslims.filter(muslim => muslim.category.toLowerCase() === selectedCategory)

  const navigateToProfile = (muslim: any) => {
    if (onNavigate) {
      onNavigate('influential-profile', { muslim })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4 text-indigo-900">🌟 Top 100 Influential Muslims</h1>
          <p className="text-indigo-800 max-w-3xl mx-auto text-sm md:text-base px-4">
            Discover the world's most influential Muslim leaders, scholars, and changemakers. Learn from their lifestyles, habits, and wisdom.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? 'bg-indigo-600 text-white' : 'text-indigo-700 border-indigo-300'}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            )
          })}
        </div>

        {/* Auto-rotating Featured Section */}
        <Card className="mb-8 overflow-hidden bg-white/80 backdrop-blur-sm border-indigo-200">
          <CardContent className="p-0">
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-white/20 text-white border-white/30">
                    Featured Personality #{currentIndex + 1}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsRotating(!isRotating)}
                    className="text-white hover:bg-white/20"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl md:text-3xl mb-2">{influentialMuslims[currentIndex].name}</h2>
                    <p className="text-xl opacity-90 mb-2">{influentialMuslims[currentIndex].title}</p>
                    <p className="opacity-80 mb-4">{influentialMuslims[currentIndex].country}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{influentialMuslims[currentIndex].iqLevel}</div>
                        <div className="text-sm opacity-80">IQ Level</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{influentialMuslims[currentIndex].influence}%</div>
                        <div className="text-sm opacity-80">Influence</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{influentialMuslims[currentIndex].followers}</div>
                        <div className="text-sm opacity-80">Followers</div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => navigateToProfile(influentialMuslims[currentIndex])}
                      className="bg-white text-indigo-600 hover:bg-white/90"
                    >
                      <User className="w-4 h-4 mr-2" />
                      View Full Profile
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                        <ImageWithFallback
                          src={influentialMuslims[currentIndex].image}
                          alt={influentialMuslims[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-amber-800" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid of All Influential Muslims */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredMuslims.map((muslim) => (
            <Card 
              key={muslim.id}
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-indigo-200"
              onClick={() => navigateToProfile(muslim)}
            >
              <CardContent className="p-4">
                <div className="relative mb-3">
                  <div className="w-full aspect-square rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={muslim.image}
                      alt={muslim.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-indigo-600 text-white text-xs">
                    #{muslim.id}
                  </Badge>
                </div>
                
                <h3 className="font-medium text-indigo-900 mb-1 text-sm line-clamp-2">{muslim.name}</h3>
                <p className="text-xs text-indigo-600 mb-2 line-clamp-1">{muslim.title}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Brain className="w-3 h-3 text-purple-500" />
                    <span>{muslim.iqLevel}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500" />
                    <span>{muslim.influence}%</span>
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-gray-600">{muslim.country}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none">
            <CardContent className="p-6">
              <h3 className="text-xl mb-2">Learn from the Best</h3>
              <p className="mb-4 opacity-90">
                Compare your lifestyle with these influential Muslims and adopt their proven habits for success.
              </p>
              <Button 
                variant="secondary"
                onClick={() => onNavigate?.('profile')}
                className="bg-white text-indigo-600 hover:bg-white/90"
              >
                <Target className="w-4 h-4 mr-2" />
                Compare Your Lifestyle
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}