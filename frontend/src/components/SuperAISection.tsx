import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'
import { Input } from './ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  MessageCircle, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Brain, 
  Heart, 
  MapPin, 
  Star, 
  ExternalLink,
  Mic,
  Camera,
  Paperclip,
  Settings,
  Zap,
  Globe,
  Shield,
  Moon,
  Sun,
  ChevronUp,
  Plus,
  Search
} from 'lucide-react'
import { PageHeader } from './PageHeader'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  recommendations?: ProfileRecommendation[]
  localGuides?: LocalGuide[]
  isStreaming?: boolean
}

interface ProfileRecommendation {
  name: string
  title: string
  expertise: string[]
  iq: number
  location: string
  image: string
  rating: number
  specialization: string
}

interface LocalGuide {
  name: string
  role: string
  location: string
  expertise: string
  contact: string
  mosque: string
}

const exampleQuestions = [
  {
    question: "What is the Islamic perspective on modern investment strategies?",
    category: "Islamic Finance",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-500"
  },
  {
    question: "How can I balance my career ambitions with Islamic values?",
    category: "Career Guidance", 
    icon: Brain,
    color: "from-purple-500 to-blue-500"
  },
  {
    question: "What are the deeper meanings behind Surah Al-Fatiha?",
    category: "Quran Study",
    icon: BookOpen,
    color: "from-amber-500 to-orange-500"
  },
  {
    question: "How do I find a righteous spouse according to Islamic guidelines?",
    category: "Marriage",
    icon: Heart,
    color: "from-pink-500 to-rose-500"
  },
  {
    question: "What are the best Islamic educational resources for children?",
    category: "Education",
    icon: Users,
    color: "from-cyan-500 to-blue-500"
  },
  {
    question: "How should I plan my Hajj pilgrimage?",
    category: "Pilgrimage",
    icon: Globe,
    color: "from-green-500 to-emerald-500"
  }
]

const sampleProfileRecommendations: ProfileRecommendation[] = [
  {
    name: "Dr. Yasir Qadhi",
    title: "Islamic Scholar & Dean",
    expertise: ["Quranic Studies", "Islamic Theology", "Modern Issues"],
    iq: 142,
    location: "Texas, USA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    specialization: "Contemporary Islamic Issues"
  },
  {
    name: "Ustadh Nouman Ali Khan",
    title: "Quran Teacher & Linguist",
    expertise: ["Arabic Language", "Tafseer", "Youth Guidance"],
    iq: 138,
    location: "Texas, USA", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    specialization: "Quranic Arabic & Interpretation"
  }
]

const sampleLocalGuides: LocalGuide[] = [
  {
    name: "Imam Abdullah Rahman",
    role: "Head Imam",
    location: "Delhi Central Mosque",
    expertise: "Quranic Studies & Life Guidance",
    contact: "+91-9876543210",
    mosque: "Jama Masjid Delhi"
  },
  {
    name: "Dr. Fatima Sheikh", 
    role: "Islamic Counselor",
    location: "Mumbai Islamic Center",
    expertise: "Marriage Counseling & Family Issues",
    contact: "+91-8765432109",
    mosque: "Haji Ali Dargah"
  }
]

export function SuperAISection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Assalamu Alaikum! 🌟 I'm your Super AI Guide, powered by advanced Islamic knowledge. I can help you with Quranic studies, career guidance, life decisions, Islamic finance, marriage advice, and much more. What would you like to explore today?",
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleExampleQuestion = (question: string) => {
    setInputValue(question)
    handleSendMessage(question)
    setShowQuickActions(false)
  }

  const generateAIResponse = (question: string): { content: string, recommendations?: ProfileRecommendation[], localGuides?: LocalGuide[] } => {
    const lowerQuestion = question.toLowerCase()
    
    if (lowerQuestion.includes('investment') || lowerQuestion.includes('finance') || lowerQuestion.includes('halal')) {
      return {
        content: "🏦 **Islamic Finance Guidance**\n\nIn Islamic finance, investments must be Sharia-compliant, avoiding riba (interest), gharar (excessive uncertainty), and haram activities.\n\n**✨ Recommended Investment Options:**\n• **Sukuk bonds** - Islamic alternative to conventional bonds\n• **Halal stocks** - Companies following Islamic principles\n• **Real estate** - Tangible assets with intrinsic value\n• **Gold and commodities** - Traditional Islamic investments\n• **Islamic mutual funds** - Professionally managed halal portfolios\n\n**🎯 Key Principle:** Wealth should be earned through legitimate trade and shared risk, not guaranteed returns. Always consult with Islamic finance scholars for complex decisions.\n\n**💡 Pro Tip:** Consider diversifying across multiple halal investment vehicles to minimize risk while staying within Islamic guidelines.",
        recommendations: sampleProfileRecommendations.filter(p => p.expertise.includes("Islamic Finance") || p.specialization.includes("Finance")),
        localGuides: sampleLocalGuides.filter(g => g.expertise.includes("Finance"))
      }
    }
    
    if (lowerQuestion.includes('career') || lowerQuestion.includes('job') || lowerQuestion.includes('work')) {
      return {
        content: "💼 **Islamic Career Development**\n\nBalancing career with Islamic values requires intentional choices and strategic planning.\n\n**🌟 Core Principles:**\n• **Halal income** - Ensure your work doesn't involve haram activities\n• **Trustworthiness** - Excel in your role with honesty and integrity\n• **Time management** - Prioritize prayers and family obligations\n• **Ethical conduct** - Treat colleagues with justice and kindness\n• **Continuous learning** - Islam encourages knowledge acquisition\n\n**🚀 Career Growth Strategies:**\n• Set clear intentions (niyyah) for earning to support family and community\n• Network within Muslim professional communities\n• Seek mentors who embody Islamic work ethics\n• Consider careers that directly benefit the ummah\n• Develop skills that serve both worldly and spiritual goals\n\n**🎯 Remember:** Success is measured not just by worldly achievement, but by adherence to Islamic principles and positive impact on society.",
        recommendations: [
          {
            name: "Ahmad Hassan",
            title: "CEO & Islamic Leadership Coach",
            expertise: ["Leadership", "Career Development", "Islamic Business Ethics"],
            iq: 135,
            location: "London, UK",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
            rating: 4.7,
            specialization: "Islamic Professional Development"
          }
        ],
        localGuides: [
          {
            name: "Ustadh Omar Malik",
            role: "Career Counselor",
            location: "Bangalore Tech Hub",
            expertise: "IT Career Guidance & Islamic Work Ethics",
            contact: "+91-7654321098",
            mosque: "Bangalore Central Mosque"
          }
        ]
      }
    }
    
    if (lowerQuestion.includes('quran') || lowerQuestion.includes('surah') || lowerQuestion.includes('tafseer')) {
      return {
        content: "📖 **Quranic Studies & Wisdom**\n\nStudying the Quran deeply enriches our spiritual journey and provides guidance for all aspects of life.\n\n**🌟 Surah Al-Fatiha Deep Insights:**\n• **\"Al-Hamdulillahi Rabbil Alameen\"** - Gratitude opens the heart to divine guidance\n• **\"Ar-Rahman Ar-Raheem\"** - Allah's mercy encompasses all creation\n• **\"Maliki Yawm-id-Deen\"** - Accountability shapes our daily choices\n• **\"Iyyaka na'budu wa iyyaka nasta'een\"** - Complete dependence on Allah\n• **\"Ihdinas-siratal mustaqeem\"** - Seeking the straight path daily\n\n**📚 Effective Study Methodology:**\n• Learn Arabic to understand original meanings\n• Study multiple tafseer (commentaries) from renowned scholars\n• Reflect on practical applications in modern life\n• Join Quran study circles in your community\n• Connect verses to your personal experiences\n• Use technology tools for enhanced learning\n\n**💡 The Quran is a comprehensive guide for personal, social, economic, and spiritual development.**",
        recommendations: sampleProfileRecommendations,
        localGuides: sampleLocalGuides.filter(g => g.expertise.includes("Quranic"))
      }
    }
    
    if (lowerQuestion.includes('marriage') || lowerQuestion.includes('spouse') || lowerQuestion.includes('relationship')) {
      return {
        content: "💕 **Islamic Marriage Guidance**\n\nFinding a righteous spouse is half of one's deen. Here's comprehensive guidance for this blessed journey.\n\n**🌟 Islamic Marriage Principles:**\n• **Character over beauty** - Prioritize taqwa (God-consciousness)\n• **Compatibility** - Shared values, goals, and Islamic commitment\n• **Family involvement** - Seek guidance from parents and elders\n• **Proper conduct** - No dating, proper introduction and chaperoned meetings\n• **Istikhara** - Seek Allah's guidance through prayer\n\n**🚩 Red Flags to Avoid:**\n• Inconsistent prayer habits or lack of Islamic foundation\n• Disrespectful to parents or family members\n• Excessive materialistic focus\n• Unwilling to learn or grow in Islamic knowledge\n• History of inappropriate relationships\n\n**✅ Green Flags to Seek:**\n• Strong Islamic foundation and regular worship\n• Good relationship with family and community\n• Clear professional or educational goals\n• Active community involvement and service\n• Emotional maturity and communication skills\n\n**🎯 Remember:** Marriage is worship when conducted according to Islamic guidelines and can be a path to spiritual growth.",
        recommendations: [
          {
            name: "Sister Aisha Mohamed",
            title: "Islamic Marriage Counselor",
            expertise: ["Marriage Guidance", "Family Counseling", "Islamic Psychology"],
            iq: 140,
            location: "Dubai, UAE",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            rating: 4.9,
            specialization: "Islamic Marriage & Relationships"
          }
        ],
        localGuides: sampleLocalGuides.filter(g => g.expertise.includes("Marriage") || g.expertise.includes("Family"))
      }
    }
    
    // Default response
    return {
      content: "🌟 **Islamic Guidance & Wisdom**\n\nAlhamdulillah, that's a thoughtful question! Islamic guidance encompasses all aspects of life, providing comprehensive solutions for modern challenges.\n\n**📚 General Islamic Principles:**\n• **Consult the Quran and Sunnah** first for divine guidance\n• **Seek knowledge** from qualified Islamic scholars and authentic sources\n• **Make dua** and perform istikhara for important life decisions\n• **Consider the broader impact** on your deen, family, and community\n• **Choose the path** that brings you closer to Allah SWT\n• **Apply Islamic values** in all personal and professional dealings\n\n**🤝 How I Can Help:**\n• Provide detailed Islamic perspectives on complex issues\n• Connect you with relevant scholars and experts\n• Suggest local Islamic guides and resources\n• Offer practical advice based on Quran and Sunnah\n• Help you navigate modern challenges with Islamic wisdom\n\n**💡 Would you like me to elaborate on any specific aspect? I can also connect you with relevant scholars and local guides based on your location and specific needs.**",
      recommendations: sampleProfileRecommendations.slice(0, 1),
      localGuides: sampleLocalGuides.slice(0, 1)
    }
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim()
    if (!text) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time with streaming effect
    setTimeout(() => {
      const aiResponse = generateAIResponse(text)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        recommendations: aiResponse.recommendations,
        localGuides: aiResponse.localGuides
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900' 
        : 'bg-gradient-to-br from-emerald-50 via-white to-teal-50'
    }`}>
      {/* Futuristic Header */}
      <div className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-700' 
          : 'bg-white/80 border-emerald-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-20 animate-pulse"></div>
              </div>
              <div className="min-w-0">
                <h1 className={`text-xl font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  Super AI Guide
                </h1>
                <p className={`text-sm truncate ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                  Powered by Islamic Intelligence
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-shrink-0">
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none px-3 py-1 hidden sm:flex">
                <Zap className="w-3 h-3 mr-1" />
                Premium AI
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`rounded-full ${isDarkMode ? 'text-white' : 'text-slate-600'}`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-full ${isDarkMode ? 'text-white' : 'text-slate-600'}`}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className={isDarkMode ? 'bg-slate-900 border-slate-700' : ''}>
                  <SheetHeader>
                    <SheetTitle className={isDarkMode ? 'text-white' : ''}>AI Settings</SheetTitle>
                    <SheetDescription className={isDarkMode ? 'text-slate-400' : ''}>
                      Customize your AI experience
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className={`text-sm ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                        Dark Mode
                      </label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                      >
                        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <label className={`text-sm ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                        Quick Actions
                      </label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowQuickActions(!showQuickActions)}
                      >
                        {showQuickActions ? 'Hide' : 'Show'}
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Chat Area */}
          <div className="xl:col-span-3 space-y-6 min-w-0">
            {/* Enhanced Input Area - Moved to Top */}
            <Card className={`border-0 shadow-xl overflow-hidden ${
              isDarkMode 
                ? 'bg-slate-800/80 backdrop-blur-xl' 
                : 'bg-white/80 backdrop-blur-xl'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`rounded-full ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`rounded-full ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 relative min-w-0">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask me anything about Islam, career, life guidance..."
                      className={`pl-4 pr-12 py-3 rounded-xl border-0 shadow-lg transition-all duration-300 focus:shadow-xl w-full ${
                        isDarkMode 
                          ? 'bg-slate-700/50 backdrop-blur-xl text-white placeholder-slate-400' 
                          : 'bg-white/90 backdrop-blur-xl'
                      }`}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full ${
                        isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 sm:px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            {showQuickActions && messages.length <= 1 && (
              <Card className={`border-0 shadow-xl transition-all duration-300 overflow-hidden ${
                isDarkMode 
                  ? 'bg-slate-800/50 backdrop-blur-xl' 
                  : 'bg-white/70 backdrop-blur-xl'
              }`}>
                <CardHeader className="pb-4">
                  <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    <MessageCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">Quick Start Questions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {exampleQuestions.map((example, index) => {
                      const Icon = example.icon
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          className={`p-4 h-auto text-left justify-start border-0 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl overflow-hidden ${
                            isDarkMode 
                              ? 'bg-slate-700/50 backdrop-blur-xl hover:bg-slate-600/50 text-white' 
                              : 'bg-white/60 backdrop-blur-xl hover:bg-white/80'
                          }`}
                          onClick={() => handleExampleQuestion(example.question)}
                        >
                          <div className="flex items-start gap-3 w-full min-w-0">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${example.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm leading-relaxed line-clamp-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                {example.question}
                              </div>
                              <Badge variant="secondary" className="mt-2 text-xs">
                                {example.category}
                              </Badge>
                            </div>
                          </div>
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Chat Messages */}
            <Card className={`border-0 shadow-xl overflow-hidden ${
              isDarkMode 
                ? 'bg-slate-800/50 backdrop-blur-xl' 
                : 'bg-white/70 backdrop-blur-xl'
            }`}>
              <CardContent className="p-0">
                <div className="h-[500px] overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-6 space-y-6">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex items-start gap-4 max-w-[85%] min-w-0 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <Avatar className={`w-10 h-10 shadow-lg flex-shrink-0 ${message.type === 'user' ? 'ring-2 ring-emerald-500' : 'ring-2 ring-teal-500'}`}>
                              <AvatarFallback className={
                                message.type === 'user' 
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                                  : 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                              }>
                                {message.type === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`relative p-4 rounded-2xl shadow-lg transition-all duration-300 min-w-0 ${
                              message.type === 'user' 
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                                : isDarkMode 
                                  ? 'bg-slate-700/80 backdrop-blur-xl text-white' 
                                  : 'bg-white/90 backdrop-blur-xl text-slate-800'
                            }`}>
                              <div className="whitespace-pre-wrap leading-relaxed text-sm break-words">
                                {message.content}
                              </div>
                              <div className={`text-xs mt-3 ${
                                message.type === 'user' 
                                  ? 'text-emerald-100' 
                                  : isDarkMode 
                                    ? 'text-slate-400' 
                                    : 'text-slate-500'
                              }`}>
                                {message.timestamp.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Profile Recommendations */}
                      {messages[messages.length - 1]?.recommendations && (
                        <div className="mt-8">
                          <h4 className={`font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            <Users className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <span className="truncate">Recommended Scholars & Experts</span>
                          </h4>
                          <div className="space-y-4">
                            {messages[messages.length - 1].recommendations?.map((profile, index) => (
                              <Card key={index} className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] overflow-hidden ${
                                isDarkMode ? 'bg-slate-700/50 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'
                              }`}>
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-4 min-w-0">
                                    <ImageWithFallback
                                      src={profile.image}
                                      alt={profile.name}
                                      className="w-16 h-16 rounded-xl object-cover shadow-lg ring-2 ring-emerald-500/20 flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0 flex-1">
                                          <h5 className={`font-semibold truncate ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                            {profile.name}
                                          </h5>
                                          <p className={`text-sm truncate ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                            {profile.title}
                                          </p>
                                          <p className="text-xs text-emerald-500 font-medium truncate">
                                            {profile.specialization}
                                          </p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                          <div className="flex items-center gap-1">
                                            <Brain className="w-4 h-4 text-purple-500" />
                                            <span className="font-semibold text-purple-500 text-sm">IQ {profile.iq}</span>
                                          </div>
                                          <div className="flex items-center gap-1 mt-1">
                                            <Star className="w-3 h-3 text-amber-400 fill-current" />
                                            <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                              {profile.rating}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2 mt-2">
                                        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                        <span className={`text-xs truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                          {profile.location}
                                        </span>
                                      </div>
                                      <div className="flex flex-wrap gap-2 mt-3">
                                        {profile.expertise.map((skill, skillIndex) => (
                                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                                            {skill}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <Button 
                                      size="sm" 
                                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg hover:shadow-xl flex-shrink-0"
                                    >
                                      <ExternalLink className="w-3 h-3 mr-1" />
                                      <span className="hidden sm:inline">View Profile</span>
                                      <span className="sm:hidden">View</span>
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Local Guides */}
                      {messages[messages.length - 1]?.localGuides && (
                        <div className="mt-8">
                          <h4 className={`font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            <MapPin className="w-5 h-5 text-teal-500 flex-shrink-0" />
                            <span className="truncate">Local Islamic Guides</span>
                          </h4>
                          <div className="space-y-4">
                            {messages[messages.length - 1].localGuides?.map((guide, index) => (
                              <Card key={index} className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] overflow-hidden ${
                                isDarkMode ? 'bg-slate-700/50 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'
                              }`}>
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between gap-4 min-w-0">
                                    <div className="flex-1 min-w-0">
                                      <h5 className={`font-semibold truncate ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                        {guide.name}
                                      </h5>
                                      <p className="text-sm text-teal-500 font-medium truncate">{guide.role}</p>
                                      <p className={`text-xs truncate ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                        {guide.expertise}
                                      </p>
                                      <div className={`flex items-center gap-4 mt-2 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                        <span className="truncate">📍 {guide.location}</span>
                                        <span className="truncate">🕌 {guide.mosque}</span>
                                      </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                      <Button 
                                        size="sm" 
                                        className="bg-gradient-to-r from-teal-500 to-blue-500 text-white border-0 shadow-lg hover:shadow-xl mb-2"
                                      >
                                        Contact
                                      </Button>
                                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                        {guide.contact}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-10 h-10 ring-2 ring-teal-500 flex-shrink-0">
                              <AvatarFallback className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                                <Bot className="w-5 h-5" />
                              </AvatarFallback>
                            </Avatar>
                            <div className={`p-4 rounded-2xl shadow-lg ${
                              isDarkMode ? 'bg-slate-700/80 backdrop-blur-xl' : 'bg-white/90 backdrop-blur-xl'
                            }`}>
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>


          </div>

          {/* Sidebar */}
          <div className="space-y-6 min-w-0">
            {/* AI Status */}
            <Card className={`border-0 shadow-xl overflow-hidden ${
              isDarkMode 
                ? 'bg-slate-800/50 backdrop-blur-xl' 
                : 'bg-white/70 backdrop-blur-xl'
            }`}>
              <CardHeader className="pb-3">
                <CardTitle className={`text-sm ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  AI Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 min-w-0">
                    <span className={`text-xs truncate ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      Response Quality
                    </span>
                    <Badge className="bg-green-500 text-white flex-shrink-0 text-xs">Excellent</Badge>
                  </div>
                  <div className="flex items-center justify-between gap-2 min-w-0">
                    <span className={`text-xs truncate ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      Knowledge Base
                    </span>
                    <Badge className="bg-blue-500 text-white flex-shrink-0 text-xs">Updated</Badge>
                  </div>
                  <div className="flex items-center justify-between gap-2 min-w-0">
                    <span className={`text-xs truncate ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      Islamic Accuracy
                    </span>
                    <Badge className="bg-emerald-500 text-white flex-shrink-0 text-xs">Verified</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className={`border-0 shadow-xl overflow-hidden ${
              isDarkMode 
                ? 'bg-slate-800/50 backdrop-blur-xl' 
                : 'bg-white/70 backdrop-blur-xl'
            }`}>
              <CardHeader className="pb-3">
                <CardTitle className={`text-sm ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full justify-start text-xs ${
                      isDarkMode 
                        ? 'border-slate-600 text-white hover:bg-slate-700' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Search className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Search Hadiths</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full justify-start text-xs ${
                      isDarkMode 
                        ? 'border-slate-600 text-white hover:bg-slate-700' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Quran Study</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full justify-start text-xs ${
                      isDarkMode 
                        ? 'border-slate-600 text-white hover:bg-slate-700' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Find Scholars</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full justify-start text-xs ${
                      isDarkMode 
                        ? 'border-slate-600 text-white hover:bg-slate-700' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Prayer Times</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}