import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { X, Bot, TrendingUp, Users, Target, Sparkles, MessageCircle, ChevronRight, Star, Trophy, BookOpen, MapPin, Heart, GraduationCap, ShoppingCart, DollarSign, UserPlus, HandHeart, AlertTriangle, Sun, Play, Info, Compass, ArrowRight, Gift, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import logoImage from 'figma:asset/59574aba7471d4e7c082b728f3637a2664302b6a.png'

interface AIRecommendationBotProps {
  isVisible: boolean
  onClose: () => void
  onNavigate?: (page: string) => void
}

const appGuides = [
  {
    id: 'welcome',
    title: 'Welcome to My Emaan!',
    description: "I'm your AI guide. Let me show you how this revolutionary Islamic platform connects 1.8 billion Muslims worldwide!",
    features: [
      'Complete Islamic ecosystem with 15+ features',
      'Real-time connection to 3.6M+ mosques globally', 
      'Join 847K+ daily Quran readers worldwide',
      'AI-powered IQ development & habit formation'
    ],
    cta: 'Start Exploring',
    nextStep: 'core-features'
  },
  {
    id: 'core-features',
    title: '📚 Next-Gen Islamic Features',
    description: "Experience cutting-edge Islamic technology designed for modern Muslims:",
    features: [
      '🕌 AI-powered Quran Reader with 15+ translations & study tools',
      '🗺️ Find 3.6M+ mosques worldwide with real-time prayer times',
      '👥 Connect with global Muslim community (1.8B+ users)',
      '🎓 Comprehensive Islamic learning with personalized AI coaching'
    ],
    cta: 'Explore Quran Reader',
    nextStep: 'spiritual-tools',
    action: 'quran'
  },
  {
    id: 'spiritual-tools', 
    title: '🤲 AI-Enhanced Spiritual Growth',
    description: "Revolutionary spiritual development tools powered by artificial intelligence:",
    features: [
      '☀️ Smart duas system with AI-powered dhikr recommendations',
      '❤️ Advanced charity tracking with global impact visualization',
      '🔥 Gamified prayer streaks with family & community challenges',
      '🧠 IQ development tracking through Islamic learning patterns'
    ],
    cta: 'View Daily Duas',
    nextStep: 'community-services',
    action: 'duas'
  },
  {
    id: 'community-services',
    title: '🤝 Global Islamic Community Hub',
    description: "Access comprehensive Islamic services connecting Muslims worldwide:",
    features: [
      '💍 AI-matched halal marriage portal with family tree integration',
      '🛒 Certified halal supermarket with 10-minute global delivery',
      '🤲 Smart volunteer coordination with skill-based matching',
      '🚨 Real-time emergency network covering 195+ countries'
    ],
    cta: 'Join Volunteer Hub', 
    nextStep: 'influential-muslims',
    action: 'volunteer'
  },
  {
    id: 'influential-muslims',
    title: '🏆 Top 100 Influential Muslims',
    description: "Learn from history's greatest Muslim minds and modern Islamic leaders:",
    features: [
      '📚 Detailed profiles of 100 most influential Muslims in history',
      '🧠 Copy successful habits, routines, and IQ development strategies',
      '📊 Lifestyle analysis and brain development tracking systems',
      '💡 AI-powered guidance based on successful Muslim role models'
    ],
    cta: 'Meet Influential Muslims',
    nextStep: 'finance-lifestyle',
    action: 'influential-muslims'
  },
  {
    id: 'finance-lifestyle',
    title: '💰 Sharia-Compliant Finance Hub',
    description: "Revolutionary Islamic finance management with global market integration:",
    features: [
      '💹 Real-time halal investment tracking across 50+ global markets',
      '📈 AI-powered Sharia-compliant sharemarket recommendations',
      '🏪 Verified halal marketplace with blockchain authentication',
      '🧮 Smart zakat calculator with automatic charity distribution'
    ],
    cta: 'Explore Islamic Finance',
    nextStep: 'ai-assistance',
    action: 'finance'
  },
  {
    id: 'ai-assistance', 
    title: '🤖 Advanced Islamic AI Intelligence',
    description: "Next-generation AI trained on 1,400+ years of Islamic knowledge:",
    features: [
      '💬 Multilingual Imam AI with Quran, Hadith & Fiqh expertise',
      '🎯 Personalized IQ development plans based on Islamic principles',
      '📊 Advanced analytics predicting spiritual growth patterns',
      '🔮 AI recommendations connecting you with global Muslim community'
    ],
    cta: 'Ask Imam Now',
    nextStep: 'get-started',
    action: 'imam-chat'
  },
  {
    id: 'get-started',
    title: '🚀 Begin Your Global Islamic Journey',
    description: "Join 1.8 billion Muslims and unlock your spiritual & intellectual potential:",
    features: [
      '1️⃣ Start with AI-enhanced Quran reading for habit formation',
      '2️⃣ Connect with global Muslim community and local events', 
      '3️⃣ Track IQ development through Islamic learning patterns',
      '4️⃣ Learn from Top 100 Influential Muslims throughout history'
    ],
    cta: 'Begin Journey',
    nextStep: 'welcome',
    action: 'quran',
    isCompleting: true
  }
]

const quickTips = [
  "💡 Tip: Use AI prayer analytics to optimize your spiritual routine for higher IQ development",
  "🏆 Tip: Study habits of Top 100 Influential Muslims to accelerate personal growth",
  "📚 Tip: Join global Quran study groups with 847K+ daily readers worldwide", 
  "💰 Tip: Use blockchain-verified halal finance tracking for transparent zakat management",
  "🤝 Tip: Connect with 3.6M+ mosques globally through smart volunteer matching system",
  "🧠 Tip: Your current IQ score can increase through structured Islamic learning patterns",
  "🌍 Tip: Real-time connection to 1.8B Muslims worldwide for instant community support"
]

const userProgress = {
  prayerStreak: 7,
  totalPoints: 1250,
  currentIQ: 127,
  weeklyRank: 8,
  charitableGiving: 2150,
  quranReadingDays: 5,
  communityEngagement: 75,
  influentialMuslimsStudied: 3,
  completedGuides: 0
}

export function AIRecommendationBot({ isVisible, onClose, onNavigate }: AIRecommendationBotProps) {
  const [currentGuide, setCurrentGuide] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const [isGuideMode, setIsGuideMode] = useState(true)
  const [currentTip, setCurrentTip] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimationStep(1)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  // Auto-cycle through tips when not in guide mode
  useEffect(() => {
    if (isVisible && !isGuideMode) {
      const interval = setInterval(() => {
        setCurrentTip(prev => (prev + 1) % quickTips.length)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [isVisible, isGuideMode])

  const currentGuideData = appGuides[currentGuide]

  const handleNext = () => {
    if (currentGuideData.action && onNavigate) {
      onNavigate(currentGuideData.action)
      onClose()
      return
    }
    
    const nextIndex = appGuides.findIndex(guide => guide.id === currentGuideData.nextStep)
    if (nextIndex !== -1) {
      setCurrentGuide(nextIndex)
    }
  }

  const handleSkipToPersonalized = () => {
    setIsGuideMode(false)
    setShowDetails(false)
  }

  const handleBackToGuide = () => {
    setIsGuideMode(true)
    setCurrentGuide(0)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Bot Container */}
          <motion.div
            initial={{ scale: 0, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden"
          >
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <Bot className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <div className="flex items-center gap-2">
                        <img 
                          src={logoImage} 
                          alt="My Emaan Logo" 
                          className="h-6 w-auto object-contain filter brightness-0 invert"
                        />
                        <CardTitle className="text-lg">My Emaan AI Guide</CardTitle>
                      </div>
                      <div className="text-emerald-100 text-sm flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        {isGuideMode ? 'App Tutorial Mode' : 'Personalized Assistant'}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0 max-h-[60vh] overflow-y-auto">
                {isGuideMode ? (
                  <div className="p-6 space-y-4">
                    {/* Guide Progress */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-1">
                        {appGuides.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentGuide ? 'bg-emerald-600' : 
                              index < currentGuide ? 'bg-emerald-400' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                        {currentGuide + 1} of {appGuides.length}
                      </Badge>
                    </div>

                    {/* Current Guide Content */}
                    <motion.div
                      key={currentGuide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="bg-white rounded-lg p-4 border border-emerald-200">
                        <h3 className="text-lg font-bold text-emerald-900 mb-2">
                          {currentGuideData.title}
                        </h3>
                        <p className="text-gray-700 text-sm mb-4">
                          {currentGuideData.description}
                        </p>
                        
                        <div className="space-y-2">
                          {currentGuideData.features.map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <Sparkles className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                              {feature}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex gap-2">
                        {/* Primary Action Button (CTA or Go to Feature) */}
                        <Button
                          className={`flex-1 text-white ${
                            currentGuideData.isCompleting 
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700' 
                              : 'bg-emerald-600 hover:bg-emerald-700'
                          }`}
                          onClick={handleNext}
                        >
                          {currentGuideData.isCompleting ? (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              {currentGuideData.cta}
                            </>
                          ) : (
                            <>
                              {currentGuideData.cta}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                        
                        {/* Next Guide Button - Always show except on last page */}
                        {!currentGuideData.isCompleting && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              const nextIndex = appGuides.findIndex(guide => guide.id === currentGuideData.nextStep)
                              if (nextIndex !== -1) {
                                setCurrentGuide(nextIndex)
                              }
                            }}
                            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                          >
                            Next
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        )}
                        
                        {/* Back Button */}
                        {currentGuide > 0 && (
                          <Button
                            variant="outline"
                            onClick={() => setCurrentGuide(currentGuide - 1)}
                            className="border-emerald-300 text-emerald-700"
                          >
                            Back
                          </Button>
                        )}
                      </div>

                      {/* Quick Skip Option */}
                      <div className="text-center pt-2 border-t border-gray-200">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSkipToPersonalized}
                          className="text-gray-500 hover:text-emerald-600"
                        >
                          Skip tutorial - Get personalized tips
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
                    {/* Personalized Mode */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-emerald-900 flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-600" />
                        Your Progress & Tips
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBackToGuide}
                        className="text-emerald-700"
                      >
                        <Compass className="w-4 h-4 mr-1" />
                        Guide
                      </Button>
                    </div>

                    {/* Progress Summary */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: animationStep >= 1 ? 1 : 0, y: animationStep >= 1 ? 0 : 20 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white rounded-lg p-4 border border-emerald-200"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span className="font-medium text-emerald-900">Your Progress</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-500">🔥</span>
                          <div>
                            <div className="font-medium text-gray-900">{userProgress.prayerStreak} days</div>
                            <div className="text-gray-600">Prayer streak</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-500">🧠</span>
                          <div>
                            <div className="font-medium text-gray-900">IQ {userProgress.currentIQ}</div>
                            <div className="text-gray-600">Above average</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-500">⭐</span>
                          <div>
                            <div className="font-medium text-gray-900">{userProgress.totalPoints}</div>
                            <div className="text-gray-600">Total points</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-amber-600">🏆</span>
                          <div>
                            <div className="font-medium text-gray-900">{userProgress.influentialMuslimsStudied}/100</div>
                            <div className="text-gray-600">Muslims studied</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Rotating Tips */}
                    <motion.div
                      key={currentTip}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-gradient-to-br from-white to-emerald-50 rounded-lg p-4 border border-emerald-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Gift className="w-4 h-4 text-amber-600" />
                        <span className="font-medium text-emerald-900">Smart Tip</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {quickTips[currentTip]}
                      </p>
                    </motion.div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigate?.('imam-chat')}
                        className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Ask Imam
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigate?.('community')}
                        className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      >
                        <Users className="w-4 h-4 mr-1" />
                        Community
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}