import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

import { Brain, TrendingUp, Target, Bot, Calendar, Timer, Award, BarChart3, Activity, Settings, MessageSquare, Zap, Heart, Users, Trophy, Star, CheckCircle, Circle, AlertTriangle, Lightbulb, BookOpen, Shield, Flame, Eye, Coffee, Cigarette, X, Check, Clock } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart, RadialBarChart, RadialBar } from 'recharts'

// Mock user data
const userData = {
  name: "Ahmad Hassan",
  age: 28,
  ageGroup: "young_adult", // child, teen, young_adult, adult, senior
  joinDate: "2022-03-15",
  totalPoints: 105000,
  currentStreak: 15,
  iqLevel: 125,
  brainEngagement: 73,
  lifestyleScore: 82
}

// Age-specific IQ categories
const ageGroups = {
  child: { label: "Children (8-12)", color: "#ff6b9d", icon: "🧒" },
  teen: { label: "Teenagers (13-17)", color: "#4ecdc4", icon: "🧑‍🎓" },
  young_adult: { label: "Young Adults (18-29)", color: "#45b7d1", icon: "👨‍💼" },
  adult: { label: "Adults (30-49)", color: "#96ceb4", icon: "👩‍💻" },
  senior: { label: "Seniors (50+)", color: "#feca57", icon: "👴" }
}

// Weekly IQ test data
const iqTestHistory = [
  { week: "Week 1", score: 118, brainEngagement: 68, date: "2024-01-01" },
  { week: "Week 2", score: 121, brainEngagement: 71, date: "2024-01-08" },
  { week: "Week 3", score: 119, brainEngagement: 69, date: "2024-01-15" },
  { week: "Week 4", score: 125, brainEngagement: 73, date: "2024-01-22" },
  { week: "Week 5", score: 123, brainEngagement: 75, date: "2024-01-29" }
]

// Brain analysis data
const brainAnalysis = {
  logicalReasoning: 78,
  spatialIntelligence: 82,
  verbalComprehension: 71,
  workingMemory: 76,
  processingSpeed: 69,
  overallEngagement: 73,
  recommendations: [
    "Focus on verbal comprehension exercises",
    "Practice speed reading to improve processing speed",
    "Try spatial puzzles and 3D visualization",
    "Regular meditation enhances working memory"
  ]
}

// Personalized bot recommendations
const botRecommendations = {
  strengths: [
    "Excellent spatial intelligence - great for engineering/architecture tasks",
    "Strong logical reasoning - perfect for problem-solving roles",
    "High consistency in learning patterns",
    "Good memory retention for Islamic teachings"
  ],
  weaknesses: [
    "Processing speed could be improved with practice",
    "Verbal comprehension needs attention",
    "Tendency to overthink simple problems",
    "Could benefit from more social learning"
  ],
  personalizedTips: [
    "Schedule IQ practice sessions during your peak hours (9-11 AM)",
    "Join study groups to improve verbal skills",
    "Use spaced repetition for Quran memorization",
    "Take breaks every 45 minutes during intense study"
  ]
}

// Habit tracking data
const habits = [
  { name: "Smoking", type: "negative", current: 3, target: 0, unit: "cigarettes/day", progress: 70, color: "#ef4444" },
  { name: "Social Media", type: "negative", current: 4, target: 2, unit: "hours/day", progress: 50, color: "#f97316" },
  { name: "Exercise", type: "positive", current: 4, target: 5, unit: "days/week", progress: 80, color: "#22c55e" },
  { name: "Quran Reading", type: "positive", current: 20, target: 30, unit: "minutes/day", progress: 67, color: "#3b82f6" }
]

// Lifestyle analysis
const lifestyleData = [
  { category: "Physical Health", score: 78, color: "#22c55e" },
  { category: "Mental Wellness", score: 85, color: "#3b82f6" },
  { category: "Spiritual Growth", score: 92, color: "#8b5cf6" },
  { category: "Social Connection", score: 70, color: "#f59e0b" },
  { category: "Work-Life Balance", score: 74, color: "#ef4444" }
]

// Growth journey data
const growthJourney = [
  { month: "Mar 2022", iq: 110, lifestyle: 65, spirituality: 70 },
  { month: "Jun 2022", iq: 112, lifestyle: 68, spirituality: 75 },
  { month: "Sep 2022", iq: 115, lifestyle: 72, spirituality: 80 },
  { month: "Dec 2022", iq: 118, lifestyle: 75, spirituality: 85 },
  { month: "Mar 2023", iq: 120, lifestyle: 78, spirituality: 88 },
  { month: "Jun 2023", iq: 122, lifestyle: 80, spirituality: 90 },
  { month: "Sep 2023", iq: 124, lifestyle: 82, spirituality: 92 },
  { month: "Dec 2023", iq: 125, lifestyle: 82, spirituality: 92 }
]

// Achievement system
const achievements = [
  { id: 1, title: "IQ Genius", description: "Reached IQ level 125+", icon: "🧠", earned: true, rarity: "legendary" },
  { id: 2, title: "Habit Master", description: "Successfully broke 2 negative habits", icon: "💪", earned: true, rarity: "epic" },
  { id: 3, title: "Consistent Learner", description: "Completed 10 weekly IQ tests", icon: "📚", earned: true, rarity: "rare" },
  { id: 4, title: "Brain Optimizer", description: "Achieved 80+ brain engagement", icon: "⚡", earned: false, progress: 91, rarity: "epic" },
  { id: 5, title: "Lifestyle Champion", description: "Maintained 90+ lifestyle score for 3 months", icon: "🏆", earned: false, progress: 67, rarity: "legendary" }
]

export function ProfileSection() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null)
  const [isTestActive, setIsTestActive] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [testAnswers, setTestAnswers] = useState<number[]>([])
  const [showBrainAnalysis, setShowBrainAnalysis] = useState(false)

  // Sample IQ test questions
  const iqQuestions = [
    {
      question: "If all Bloops are Razzles and all Razzles are Lazzles, then all Bloops are definitely Lazzles?",
      options: ["True", "False"],
      correct: 0
    },
    {
      question: "What number comes next in the sequence: 2, 6, 12, 20, ?",
      options: ["24", "28", "30", "32"],
      correct: 2
    },
    {
      question: "Which word doesn't belong: Apple, Orange, Banana, Carrot, Grape",
      options: ["Apple", "Orange", "Carrot", "Grape"],
      correct: 2
    }
  ]

  const startIQTest = () => {
    setIsTestActive(true)
    setCurrentQuestion(0)
    setTestAnswers([])
  }

  const answerQuestion = (answerIndex: number) => {
    const newAnswers = [...testAnswers, answerIndex]
    setTestAnswers(newAnswers)
    
    if (currentQuestion < iqQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Test complete
      setIsTestActive(false)
      setShowBrainAnalysis(true)
    }
  }

  const rarityColors = {
    common: "bg-gray-100 text-gray-700 border-gray-300",
    rare: "bg-blue-100 text-blue-700 border-blue-300",
    epic: "bg-purple-100 text-purple-700 border-purple-300",
    legendary: "bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-orange-300"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4 text-indigo-900">🧠 Intelligent Profile Hub</h1>
          <p className="text-indigo-800 max-w-3xl mx-auto text-sm md:text-base px-4">
            Comprehensive IQ tracking, personalized development, habit transformation, and lifestyle optimization
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="overview" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <Activity className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-indigo-600" />
              <span className="leading-tight">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="iq-test" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <Brain className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-purple-600" />
              <span className="leading-tight">IQ Tests</span>
            </TabsTrigger>
            <TabsTrigger value="ai-bot" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <Bot className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-pink-600" />
              <span className="leading-tight">AI Coach</span>
            </TabsTrigger>
            <TabsTrigger value="habits" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <Target className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-green-600" />
              <span className="leading-tight">Habits</span>
            </TabsTrigger>
            <TabsTrigger value="lifestyle" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-blue-600" />
              <span className="leading-tight">Lifestyle</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <Trophy className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-amber-600" />
              <span className="leading-tight">Awards</span>
            </TabsTrigger>
            <TabsTrigger value="full-program" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <BookOpen className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-teal-600" />
              <span className="leading-tight">Program</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Profile Overview */}
              <div className="lg:col-span-1 space-y-4 md:space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                  <CardContent className="p-4 md:p-6 text-center">
                    <Avatar className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-indigo-400 to-purple-400">
                      <AvatarFallback className="text-white text-lg md:text-xl">AH</AvatarFallback>
                    </Avatar>
                    <h2 className="text-lg md:text-xl text-indigo-900 mb-1">{userData.name}</h2>
                    <p className="text-indigo-600 text-sm mb-3 md:mb-4">
                      {ageGroups[userData.ageGroup].icon} {ageGroups[userData.ageGroup].label}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="text-center p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg text-white">
                        <Brain className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1" />
                        <div className="text-lg md:text-2xl font-bold">{userData.iqLevel}</div>
                        <div className="text-xs opacity-90">IQ Level</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg text-white">
                        <Zap className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1" />
                        <div className="text-lg md:text-2xl font-bold">{userData.brainEngagement}%</div>
                        <div className="text-xs opacity-90">Brain Power</div>
                      </div>
                    </div>

                    <Badge className="bg-indigo-600 text-white mb-3 md:mb-4">
                      Genius Level - Top 2%
                    </Badge>
                    
                    <div className="text-left">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-indigo-700">Overall Development</span>
                        <span className="text-indigo-900">{userData.lifestyleScore}%</span>
                      </div>
                      <Progress value={userData.lifestyleScore} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-indigo-900 flex items-center text-base md:text-lg">
                      <BarChart3 className="w-4 h-4 md:w-5 md:h-5 mr-2 text-indigo-600" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-700 text-sm">Learning Streak</span>
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-900">{userData.currentStreak} days</span>
                          <Flame className="w-4 h-4 text-orange-500" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-700 text-sm">Tests Completed</span>
                        <span className="text-indigo-900">24 tests</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-700 text-sm">Habits Improved</span>
                        <span className="text-indigo-900">3 positive</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-700 text-sm">Member Since</span>
                        <span className="text-indigo-900">Mar 2022</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts and Analytics */}
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                {/* Growth Journey Chart */}
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-indigo-900 flex items-center text-base md:text-lg">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-2 text-green-600" />
                      Growth Journey Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={growthJourney}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="iq" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="IQ Level" />
                        <Area type="monotone" dataKey="lifestyle" stackId="2" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} name="Lifestyle Score" />
                        <Area type="monotone" dataKey="spirituality" stackId="3" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Spiritual Growth" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Brain Engagement Breakdown */}
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-indigo-900 flex items-center text-base md:text-lg">
                      <Brain className="w-4 h-4 md:w-5 md:h-5 mr-2 text-purple-600" />
                      Brain Engagement Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        {Object.entries(brainAnalysis).filter(([key]) => key !== 'overallEngagement' && key !== 'recommendations').map(([area, score]) => (
                          <div key={area}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-indigo-700 capitalize">
                                {area.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <span className="text-indigo-900">{score}%</span>
                            </div>
                            <Progress value={score} className="h-2" />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="text-2xl font-bold">{brainAnalysis.overallEngagement}%</div>
                              <div className="text-xs opacity-90">Overall</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Weekly IQ Progress */}
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-indigo-900 flex items-center text-base md:text-lg">
                      <BarChart3 className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600" />
                      Weekly IQ Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={iqTestHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} name="IQ Score" />
                        <Line type="monotone" dataKey="brainEngagement" stroke="#06b6d4" strokeWidth={2} name="Brain Engagement %" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* IQ Test Tab */}
          <TabsContent value="iq-test">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Test Interface */}
              <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-900 flex items-center text-base md:text-lg">
                    <Brain className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Weekly IQ Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!isTestActive ? (
                    <div className="text-center space-y-4">
                      <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                        <Brain className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                        <h3 className="text-lg text-purple-900 mb-2">Ready for Your Weekly Test?</h3>
                        <p className="text-purple-700 text-sm mb-4">
                          Tailored for {ageGroups[userData.ageGroup].label.toLowerCase()}. 
                          This test adapts to your age group and previous performance.
                        </p>
                        <div className="text-xs text-purple-600 mb-4">
                          ⏱️ Duration: ~10 minutes | 📊 Questions: 15 | 🎯 Difficulty: Adaptive
                        </div>
                        <Button onClick={startIQTest} className="bg-purple-600 hover:bg-purple-700 text-white">
                          <Timer className="w-4 h-4 mr-2" />
                          Start IQ Test
                        </Button>
                      </div>
                      
                      <div className="text-left p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-blue-900 mb-2 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2" />
                          Test Categories for Your Age Group
                        </h4>
                        <div className="space-y-2 text-sm text-blue-700">
                          <div>• Logical Reasoning & Pattern Recognition</div>
                          <div>• Spatial Intelligence & 3D Visualization</div>
                          <div>• Working Memory & Information Processing</div>
                          <div>• Verbal Comprehension & Language Skills</div>
                          <div>• Mathematical Problem Solving</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg text-purple-900">Question {currentQuestion + 1} of {iqQuestions.length}</h3>
                        <div className="text-sm text-purple-600">
                          ⏱️ {Math.floor(Math.random() * 60) + 30}s remaining
                        </div>
                      </div>
                      
                      <Progress value={(currentQuestion / iqQuestions.length) * 100} className="h-2 mb-4" />
                      
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <p className="text-purple-900 mb-4">{iqQuestions[currentQuestion].question}</p>
                        <div className="space-y-2">
                          {iqQuestions[currentQuestion].options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="w-full text-left justify-start"
                              onClick={() => answerQuestion(index)}
                            >
                              {String.fromCharCode(65 + index)}. {option}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Test History & Brain Analysis */}
              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-900 text-base md:text-lg">Test History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {iqTestHistory.map((test, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <div>
                            <div className="text-sm text-purple-900">{test.week}</div>
                            <div className="text-xs text-purple-600">{test.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-purple-900 font-medium">IQ: {test.score}</div>
                            <div className="text-xs text-purple-600">Engagement: {test.brainEngagement}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Brain Analysis Modal */}
                {showBrainAnalysis && (
                  <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-900 flex items-center text-base md:text-lg">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Latest Brain Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-900 mb-1">Score: 125</div>
                          <div className="text-sm text-green-700">73% Brain Engagement</div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-900">Brain Regions Activated:</h4>
                          <div className="text-xs text-gray-600 space-y-1">
                            <div>🧠 Prefrontal Cortex: 78% (Logic & Reasoning)</div>
                            <div>🎯 Parietal Lobe: 69% (Spatial Processing)</div>
                            <div>💭 Temporal Lobe: 71% (Memory & Language)</div>
                            <div>⚡ Neural Speed: 76% (Processing Speed)</div>
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setShowBrainAnalysis(false)}
                          className="w-full"
                        >
                          Close Analysis
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Age-Specific Programs */}
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-900 flex items-center text-base md:text-lg">
                      <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      {ageGroups[userData.ageGroup].label} Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                        <h4 className="text-sm font-medium text-indigo-900 mb-2">This Week's Focus</h4>
                        <div className="text-xs text-indigo-700 space-y-1">
                          <div>• Spatial reasoning exercises</div>
                          <div>• Memory palace techniques</div>
                          <div>• Speed reading practice</div>
                          <div>• Islamic knowledge integration</div>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full text-indigo-700 border-indigo-300 hover:bg-indigo-50"
                        onClick={() => setActiveTab('full-program')}
                      >
                        <Target className="w-4 h-4 mr-2" />
                        View Full Program
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* AI Coach Tab */}
          <TabsContent value="ai-bot">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
                <CardHeader>
                  <CardTitle className="text-pink-900 flex items-center text-base md:text-lg">
                    <Bot className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    AI Personal Development Coach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg border border-pink-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center mr-3">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-pink-900 font-medium">Aisha - Your AI Coach</h3>
                      </div>
                      <p className="text-pink-700 text-sm mb-3">
                        Based on your IQ profile and behavioral patterns, I've prepared personalized recommendations for your growth journey.
                      </p>
                      <Badge className="bg-pink-100 text-pink-700 text-xs">
                        Last updated: 2 hours ago
                      </Badge>
                    </div>

                    {/* Chat Interface */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      <div className="flex">
                        <div className="bg-pink-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm text-pink-800">
                            Your spatial intelligence scores are exceptional! Consider exploring architecture or engineering fields to leverage this strength.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm text-gray-800">
                            What specific exercises can help improve my processing speed?
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="bg-pink-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm text-pink-800">
                            Try these daily: 1) Speed reading exercises, 2) Mental math drills, 3) Reaction time games, 4) Mindfulness meditation for 10 minutes.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Ask me anything about your development..."
                        className="flex-1 px-3 py-2 border border-pink-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                      <Button size="sm" className="bg-pink-600 hover:bg-pink-700 text-white">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {/* Strengths */}
                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-900 flex items-center text-base md:text-lg">
                      <Star className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Your Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {botRecommendations.strengths.map((strength, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-green-800">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Areas for Improvement */}
                <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-900 flex items-center text-base md:text-lg">
                      <Target className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Growth Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {botRecommendations.weaknesses.map((weakness, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-orange-50 rounded-lg">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-orange-800">{weakness}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Personalized Tips */}
                <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900 flex items-center text-base md:text-lg">
                      <Lightbulb className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Personalized Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {botRecommendations.personalizedTips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
                          <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-blue-800">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Habits Tab */}
          <TabsContent value="habits">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900 flex items-center text-base md:text-lg">
                    <Target className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Habit Transformation System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {habits.map((habit, index) => (
                      <div key={index} className="p-4 border rounded-lg" style={{ borderColor: habit.color + '40' }}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {habit.type === 'negative' ? (
                              <X className="w-4 h-4" style={{ color: habit.color }} />
                            ) : (
                              <Check className="w-4 h-4" style={{ color: habit.color }} />
                            )}
                            <span className="font-medium text-gray-900">{habit.name}</span>
                          </div>
                          <Badge 
                            className="text-xs"
                            style={{ 
                              backgroundColor: habit.color + '20', 
                              color: habit.color,
                              border: `1px solid ${habit.color}40`
                            }}
                          >
                            {habit.progress}% Progress
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Current: {habit.current} {habit.unit}</span>
                          <span>Target: {habit.target} {habit.unit}</span>
                        </div>
                        
                        <Progress value={habit.progress} className="h-2" />
                        
                        {habit.name === "Smoking" && (
                          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                            💡 Tip: Replace smoking with 5-minute breathing exercises. You're doing great!
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {/* Habit Breaking Program */}
                <Card className="bg-white/80 backdrop-blur-sm border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-900 flex items-center text-base md:text-lg">
                      <Shield className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Breaking Negative Habits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Cigarette className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium text-red-900">Smoking Cessation Program</span>
                        </div>
                        <div className="text-xs text-red-700 space-y-1">
                          <div>• Day 1-3: Reduce by 50%</div>
                          <div>• Day 4-7: Switch to alternatives</div>
                          <div>• Week 2: Complete elimination</div>
                          <div>• Week 3+: Maintenance & rewards</div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Coffee className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-medium text-orange-900">Screen Time Management</span>
                        </div>
                        <div className="text-xs text-orange-700 space-y-1">
                          <div>• Set specific usage windows</div>
                          <div>• Use app timers and limits</div>
                          <div>• Replace with productive activities</div>
                          <div>• Weekly digital detox days</div>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full text-red-700 border-red-300">
                        <Target className="w-4 h-4 mr-2" />
                        Join Support Group
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Habit Rewards */}
                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-900 flex items-center text-base md:text-lg">
                      <Award className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Habit Rewards System
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                        <Trophy className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <div className="text-lg font-bold text-green-900">275 Points</div>
                        <div className="text-xs text-green-700">Earned this week</div>
                      </div>
                      
                      <div className="text-xs text-gray-600 space-y-2">
                        <div className="flex justify-between">
                          <span>🚭 Smoking reduction: Day 5</span>
                          <span className="text-green-600">+50 pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>🏃‍♂️ Exercise consistency</span>
                          <span className="text-green-600">+30 pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>📖 Daily Quran reading</span>
                          <span className="text-green-600">+25 pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>📱 Screen time goal met</span>
                          <span className="text-green-600">+20 pts</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Lifestyle Tab */}
          <TabsContent value="lifestyle">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center text-base md:text-lg">
                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Lifestyle Analysis Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-900 mb-1">Overall Score: 82%</div>
                      <div className="text-sm text-blue-700">Excellent lifestyle balance</div>
                    </div>
                    
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={lifestyleData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="score"
                        >
                          {lifestyleData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    
                    <div className="space-y-2">
                      {lifestyleData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-sm text-gray-700">{item.category}</span>
                          </div>
                          <span className="text-sm font-medium" style={{ color: item.color }}>
                            {item.score}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {/* Detailed Performance */}
                <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-900 flex items-center text-base md:text-lg">
                      <Activity className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Detailed Performance Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="text-sm font-medium text-green-900 mb-2">🏆 Top Performing Areas</h4>
                        <div className="text-xs text-green-700 space-y-1">
                          <div>• Spiritual Growth: 92% (Excellent prayer consistency)</div>
                          <div>• Mental Wellness: 85% (Strong emotional intelligence)</div>
                          <div>• Physical Health: 78% (Regular exercise routine)</div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <h4 className="text-sm font-medium text-orange-900 mb-2">⚠️ Areas Needing Attention</h4>
                        <div className="text-xs text-orange-700 space-y-1">
                          <div>• Social Connection: 70% (Limited community engagement)</div>
                          <div>• Work-Life Balance: 74% (Occasional stress spikes)</div>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-900 mb-2">📈 Recent Improvements</h4>
                        <div className="text-xs text-blue-700 space-y-1">
                          <div>• Sleep quality improved by 15%</div>
                          <div>• Stress levels reduced by 20%</div>
                          <div>• Islamic learning time increased by 30%</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-900 flex items-center text-base md:text-lg">
                      <Lightbulb className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Lifestyle Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2 p-2 bg-indigo-50 rounded-lg">
                        <Users className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium text-indigo-900">Social Connection</span>
                          <p className="text-xs text-indigo-700">Join community events at your mosque or Islamic center</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2 p-2 bg-indigo-50 rounded-lg">
                        <Heart className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium text-indigo-900">Stress Management</span>
                          <p className="text-xs text-indigo-700">Practice dhikr during work breaks for better balance</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2 p-2 bg-indigo-50 rounded-lg">
                        <BookOpen className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium text-indigo-900">Learning Schedule</span>
                          <p className="text-xs text-indigo-700">Dedicate 30 minutes before Fajr for Islamic studies</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`hover:shadow-lg transition-all duration-300 ${
                    achievement.earned 
                      ? rarityColors[achievement.rarity] 
                      : 'bg-white/80 backdrop-blur-sm border-gray-200'
                  }`}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="text-3xl md:text-4xl">{achievement.icon}</div>
                      <div className="flex flex-col items-end gap-1">
                        {achievement.earned && (
                          <Badge className="bg-green-100 text-green-700 text-xs">Earned!</Badge>
                        )}
                        <Badge 
                          className={`text-xs capitalize ${rarityColors[achievement.rarity]}`}
                        >
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="text-base md:text-lg text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-gray-700 text-sm mb-3 md:mb-4">{achievement.description}</p>
                    
                    {!achievement.earned && achievement.progress && (
                      <div>
                        <div className="flex justify-between text-sm text-gray-700 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Achievement Stats */}
            <Card className="mt-6 md:mt-8 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-indigo-900 flex items-center text-base md:text-lg">
                  <Trophy className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Achievement Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-900">3</div>
                    <div className="text-xs text-orange-700">Earned</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-900">2</div>
                    <div className="text-xs text-indigo-700">In Progress</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-900">1</div>
                    <div className="text-xs text-purple-700">Legendary</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-900">60%</div>
                    <div className="text-xs text-green-700">Completion</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Full Program Tab */}
          <TabsContent value="full-program">
            <div className="space-y-6">
              {/* Program Overview */}
              <Card className="bg-white/80 backdrop-blur-sm border-teal-200">
                <CardHeader>
                  <CardTitle className="text-teal-900 flex items-center text-base md:text-lg">
                    <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Comprehensive Development Program
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg">
                      <Brain className="w-8 h-8 mx-auto mb-2 text-teal-600" />
                      <div className="text-lg font-bold text-teal-900">12 Weeks</div>
                      <div className="text-sm text-teal-700">IQ Enhancement</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                      <Target className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <div className="text-lg font-bold text-purple-900">8 Habits</div>
                      <div className="text-sm text-purple-700">Transformation</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                      <Trophy className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="text-lg font-bold text-blue-900">5 Levels</div>
                      <div className="text-sm text-blue-700">Achievement</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Program */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-900 flex items-center text-base md:text-lg">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      This Week's Focus
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg">
                        <h4 className="font-medium text-teal-900 mb-2">Week 5: Spatial Intelligence Mastery</h4>
                        <div className="space-y-2 text-sm text-teal-700">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>3D visualization exercises (15 min daily)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Circle className="w-4 h-4 text-gray-400" />
                            <span>Mental rotation practice</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Circle className="w-4 h-4 text-gray-400" />
                            <span>Geometry-based problem solving</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Circle className="w-4 h-4 text-gray-400" />
                            <span>Islamic geometric patterns study</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-teal-700">Progress this week</span>
                        <span className="font-medium text-teal-900">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-900 flex items-center text-base md:text-lg">
                      <Target className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Habit Transformation Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { habit: "Smoking Reduction", current: "3/day", target: "0/day", progress: 70, color: "red" },
                        { habit: "Screen Time Control", current: "4h/day", target: "2h/day", progress: 50, color: "orange" },
                        { habit: "Exercise Increase", current: "4 days", target: "5 days", progress: 80, color: "green" },
                        { habit: "Quran Reading", current: "20 min", target: "30 min", progress: 67, color: "blue" }
                      ].map((habit, index) => (
                        <div key={index} className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-purple-900 text-sm">{habit.habit}</span>
                            <Badge className={`bg-${habit.color}-100 text-${habit.color}-700 text-xs`}>
                              {habit.progress}%
                            </Badge>
                          </div>
                          <div className="text-xs text-purple-700 mb-2">
                            {habit.current} → {habit.target}
                          </div>
                          <Progress value={habit.progress} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 12-Week Roadmap */}
              <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-indigo-900 flex items-center text-base md:text-lg">
                    <BarChart3 className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    12-Week Development Roadmap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        phase: "Foundation (Weeks 1-4)",
                        focus: "Basic cognitive training",
                        skills: ["Memory palace technique", "Speed reading basics", "Logical reasoning", "Islamic mindfulness"],
                        status: "completed"
                      },
                      {
                        phase: "Enhancement (Weeks 5-8)",
                        focus: "Advanced skill development",
                        skills: ["Spatial intelligence", "Pattern recognition", "Critical thinking", "Habit formation"],
                        status: "current"
                      },
                      {
                        phase: "Mastery (Weeks 9-12)",
                        focus: "Integration & optimization",
                        skills: ["Complex problem solving", "Creative thinking", "Leadership skills", "Teaching others"],
                        status: "upcoming"
                      }
                    ].map((phase, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${
                        phase.status === 'completed' ? 'bg-green-50 border-green-200' :
                        phase.status === 'current' ? 'bg-indigo-50 border-indigo-200' :
                        'bg-gray-50 border-gray-200'
                      }`}>
                        <div className={`font-medium mb-2 ${
                          phase.status === 'completed' ? 'text-green-900' :
                          phase.status === 'current' ? 'text-indigo-900' :
                          'text-gray-700'
                        }`}>
                          {phase.phase}
                        </div>
                        <div className={`text-sm mb-3 ${
                          phase.status === 'completed' ? 'text-green-700' :
                          phase.status === 'current' ? 'text-indigo-700' :
                          'text-gray-600'
                        }`}>
                          {phase.focus}
                        </div>
                        <div className="space-y-1">
                          {phase.skills.map((skill, skillIndex) => (
                            <div key={skillIndex} className={`text-xs flex items-center gap-2 ${
                              phase.status === 'completed' ? 'text-green-600' :
                              phase.status === 'current' ? 'text-indigo-600' :
                              'text-gray-500'
                            }`}>
                              {phase.status === 'completed' ? 
                                <CheckCircle className="w-3 h-3" /> :
                                phase.status === 'current' ? 
                                <Circle className="w-3 h-3" /> :
                                <Clock className="w-3 h-3" />
                              }
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
                <CardHeader>
                  <CardTitle className="text-pink-900 flex items-center text-base md:text-lg">
                    <Bot className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Personalized AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-pink-900">Optimization Suggestions</h4>
                      <div className="space-y-2">
                        {[
                          "Schedule IQ practice during peak hours (9-11 AM)",
                          "Combine spatial exercises with Islamic geometry",
                          "Use Arabic vocabulary for memory training",
                          "Practice dhikr during mental breaks"
                        ].map((suggestion, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-pink-50 rounded-lg">
                            <Lightbulb className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-pink-700">{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-pink-900">Next Level Preparation</h4>
                      <div className="space-y-2">
                        {[
                          "Maintain current spatial scores for 2 weeks",
                          "Improve processing speed by 10%",
                          "Complete all weekly targets consistently",
                          "Start peer mentoring in week 10"
                        ].map((preparation, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-pink-50 rounded-lg">
                            <Star className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-pink-700">{preparation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}