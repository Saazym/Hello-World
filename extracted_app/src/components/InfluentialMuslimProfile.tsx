import { useState } from 'react'
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
  Calendar, Target, Zap, Heart, Shield, Award, ArrowLeft,
  Globe, Play, ExternalLink, RefreshCw, Filter, User,
  BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon,
  AlertCircle, Lightbulb, Download, Share
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadialBarChart, RadialBar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts'
import { toast } from "sonner@2.0.3"

// Mock current user data for comparison
const currentUserData = {
  name: "Ahmad Hassan",
  iqLevel: 125,
  lifestyle: {
    wakeupTime: "6:00 AM",
    sleepTime: "11:30 PM",
    prayerConsistency: 85,
    quranDaily: 45,
    physicalActivity: 30,
    studyTime: 180,
    familyTime: 90,
    communityWork: 60
  },
  brainDevelopment: {
    memoryRetention: 73,
    analyticalThinking: 78,
    linguisticIntelligence: 71,
    emotionalIntelligence: 82,
    creativeProblemSolving: 76
  },
  emaanDevelopment: {
    dhikrDaily: 90,
    islamicStudy: 120,
    charitableActions: 70,
    communityService: 65,
    spiritualReflection: 75
  }
}

interface InfluentialMuslimProfileProps {
  muslim: any
  onBack: () => void
}

export function InfluentialMuslimProfile({ muslim, onBack }: InfluentialMuslimProfileProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [copiedItems, setCopiedItems] = useState<string[]>([])

  if (!muslim) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-indigo-900 mb-4">Profile not found</h2>
          <Button onClick={onBack} className="bg-indigo-600 text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const copyToProfile = (type: string, data: any) => {
    // Simulate copying data to user profile
    setCopiedItems([...copiedItems, type])
    toast(`${type} copied to your profile successfully!`, {
      description: "You can now follow this routine in your personal development plan.",
      duration: 3000
    })
  }

  const calculateImprovementPotential = () => {
    const userAvg = Object.values(currentUserData.brainDevelopment).reduce((a, b) => a + b, 0) / 5
    const muslimAvg = Object.values(muslim.brainDevelopment).reduce((a, b) => a + b, 0) / 5
    return Math.round(muslimAvg - userAvg)
  }

  // Comparison data for charts
  const comparisonData = [
    {
      category: "Memory Retention",
      user: currentUserData.brainDevelopment.memoryRetention,
      influencer: muslim.brainDevelopment.memoryRetention
    },
    {
      category: "Analytical Thinking",
      user: currentUserData.brainDevelopment.analyticalThinking,
      influencer: muslim.brainDevelopment.analyticalThinking
    },
    {
      category: "Linguistic Intelligence",
      user: currentUserData.brainDevelopment.linguisticIntelligence,
      influencer: muslim.brainDevelopment.linguisticIntelligence
    },
    {
      category: "Emotional Intelligence",
      user: currentUserData.brainDevelopment.emotionalIntelligence,
      influencer: muslim.brainDevelopment.emotionalIntelligence
    },
    {
      category: "Problem Solving",
      user: currentUserData.brainDevelopment.creativeProblemSolving,
      influencer: muslim.brainDevelopment.creativeProblemSolving
    }
  ]

  const lifestyleComparisonData = [
    {
      category: "Quran Daily",
      user: currentUserData.lifestyle.quranDaily,
      influencer: muslim.lifestyle.quranDaily,
      unit: "minutes"
    },
    {
      category: "Study Time",
      user: currentUserData.lifestyle.studyTime,
      influencer: muslim.lifestyle.studyTime,
      unit: "minutes"
    },
    {
      category: "Physical Activity",
      user: currentUserData.lifestyle.physicalActivity,
      influencer: muslim.lifestyle.physicalActivity,
      unit: "minutes"
    },
    {
      category: "Community Work",
      user: currentUserData.lifestyle.communityWork,
      influencer: muslim.lifestyle.communityWork,
      unit: "minutes"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header with Back Button */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-indigo-700 hover:bg-indigo-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
        </div>

        {/* Profile Hero Section */}
        <Card className="mb-8 overflow-hidden bg-white/80 backdrop-blur-sm border-indigo-200">
          <CardContent className="p-0">
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                  <div className="lg:col-span-1 flex justify-center lg:justify-start">
                    <div className="relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                        <ImageWithFallback
                          src={muslim.image}
                          alt={muslim.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-amber-800" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 text-center lg:text-left">
                    <h1 className="text-3xl md:text-4xl mb-2">{muslim.name}</h1>
                    <p className="text-xl opacity-90 mb-2">{muslim.title}</p>
                    <p className="opacity-80 mb-4">{muslim.specialization}</p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        {muslim.country}
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30">
                        {muslim.category}
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30">
                        Rank #{muslim.id}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <div className="grid grid-cols-1 gap-4 text-center">
                      <div className="bg-white/20 rounded-lg p-4">
                        <div className="text-3xl font-bold">{muslim.iqLevel}</div>
                        <div className="text-sm opacity-80">IQ Level</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4">
                        <div className="text-3xl font-bold">{muslim.influence}%</div>
                        <div className="text-sm opacity-80">Global Influence</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="overview" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-2 md:p-3">
              <User className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-indigo-600" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="lifestyle" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-2 md:p-3">
              <Activity className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-green-600" />
              <span>Lifestyle</span>
            </TabsTrigger>
            <TabsTrigger value="brain" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-2 md:p-3">
              <Brain className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-purple-600" />
              <span>Brain Dev</span>
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-2 md:p-3">
              <BarChart3 className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-blue-600" />
              <span>Compare</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-2 md:p-3">
              <DollarSign className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-amber-600" />
              <span>Financial</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Performance Overview */}
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-900 flex items-center">
                      <Trophy className="w-5 h-5 mr-2" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                        <div className="text-2xl font-bold text-purple-900">{muslim.iqLevel}</div>
                        <div className="text-sm text-purple-700">IQ Level</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Star className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <div className="text-2xl font-bold text-blue-900">{muslim.influence}%</div>
                        <div className="text-sm text-blue-700">Global Influence</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <div className="text-2xl font-bold text-green-900">{muslim.followers}</div>
                        <div className="text-sm text-green-700">Followers</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Schedule */}
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-indigo-900 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Daily Schedule
                    </CardTitle>
                    <Button 
                      size="sm" 
                      onClick={() => copyToProfile('Daily Schedule', muslim.dailySchedule)}
                      className={copiedItems.includes('Daily Schedule') ? 'bg-green-600' : 'bg-indigo-600'}
                    >
                      {copiedItems.includes('Daily Schedule') ? (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      ) : (
                        <Copy className="w-4 h-4 mr-2" />
                      )}
                      Copy Schedule
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {muslim.dailySchedule.map((item: any, index: number) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-indigo-50 rounded-lg">
                          <div className="text-sm font-medium text-indigo-900 min-w-[80px]">
                            {item.time}
                          </div>
                          <div className="text-sm text-indigo-700 flex-1">
                            {item.activity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Key Stats */}
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-900 text-lg">Key Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-700 text-sm">Wake Up Time</span>
                        <Badge variant="outline" className="border-indigo-300 text-indigo-700">
                          {muslim.lifestyle.wakeupTime}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-700 text-sm">Sleep Time</span>
                        <Badge variant="outline" className="border-indigo-300 text-indigo-700">
                          {muslim.lifestyle.sleepTime}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-700 text-sm">Prayer Consistency</span>
                        <Badge className="bg-green-100 text-green-700">
                          {muslim.lifestyle.prayerConsistency}%
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-700 text-sm">Daily Quran</span>
                        <Badge variant="outline" className="border-indigo-300 text-indigo-700">
                          {muslim.lifestyle.quranDaily} min
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-900 text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => copyToProfile('Sleep Cycle', { wakeup: muslim.lifestyle.wakeupTime, sleep: muslim.lifestyle.sleepTime })}
                      >
                        <Moon className="w-4 h-4 mr-2" />
                        Copy Sleep Cycle
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => copyToProfile('Study Routine', { studyTime: muslim.lifestyle.studyTime })}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Copy Study Routine
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => copyToProfile('Exercise Plan', { physicalActivity: muslim.lifestyle.physicalActivity })}
                      >
                        <Activity className="w-4 h-4 mr-2" />
                        Copy Exercise Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Lifestyle Tab */}
          <TabsContent value="lifestyle">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-indigo-900 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Lifestyle Breakdown
                  </CardTitle>
                  <Button 
                    size="sm"
                    onClick={() => copyToProfile('Complete Lifestyle', muslim.lifestyle)}
                    className="bg-indigo-600 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Copy All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(muslim.lifestyle).map(([key, value]) => {
                      if (key === 'wakeupTime' || key === 'sleepTime') return null
                      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                      const isTime = typeof value === 'number' && !key.includes('Consistency')
                      const displayValue = isTime ? `${value} minutes` : `${value}${key.includes('Consistency') ? '%' : ''}`
                      
                      return (
                        <div key={key}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-indigo-700">{label}</span>
                            <span className="text-indigo-900">{displayValue}</span>
                          </div>
                          <Progress value={isTime ? Math.min((value as number) / 5, 100) : (value as number)} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-indigo-900 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Emaan Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(muslim.emaanDevelopment).map(([key, value]) => {
                      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                      const isTime = typeof value === 'number' && (key.includes('dhikr') || key.includes('Study'))
                      const displayValue = isTime ? `${value} minutes` : `${value}%`
                      
                      return (
                        <div key={key}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-indigo-700">{label}</span>
                            <span className="text-indigo-900">{displayValue}</span>
                          </div>
                          <Progress value={isTime ? Math.min((value as number) / 5, 100) : (value as number)} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    variant="outline"
                    onClick={() => copyToProfile('Emaan Development Plan', muslim.emaanDevelopment)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Emaan Development Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Brain Development Tab */}
          <TabsContent value="brain">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-indigo-900 flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Cognitive Abilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="influencer" fill="#8b5cf6" name={muslim.name} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-indigo-900 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Brain Development Plan
                  </CardTitle>
                  <Button 
                    size="sm"
                    onClick={() => copyToProfile('Brain Development', muslim.brainDevelopment)}
                    className="bg-purple-600 text-white"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Plan
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(muslim.brainDevelopment).map(([key, value]) => {
                      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                      
                      return (
                        <div key={key}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-purple-700">{label}</span>
                            <span className="text-purple-900">{value}%</span>
                          </div>
                          <Progress value={value as number} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="text-purple-900 font-medium mb-2 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Recommended Focus Areas
                    </h4>
                    <div className="text-sm text-purple-700 space-y-1">
                      <div>• Daily memory exercises and Quran memorization</div>
                      <div>• Critical thinking through Islamic jurisprudence</div>
                      <div>• Multilingual development (Arabic, English, etc.)</div>
                      <div>• Emotional intelligence through community service</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="compare">
            <div className="space-y-6">
              {/* Improvement Potential Alert */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl text-blue-900 mb-2">Your Improvement Potential</h3>
                      <p className="text-blue-700 mb-4">
                        By following {muslim.name}'s routines, you could potentially improve your overall performance by <strong>{calculateImprovementPotential()}%</strong>.
                      </p>
                      <Button className="bg-blue-600 text-white">
                        <Target className="w-4 h-4 mr-2" />
                        Start Improvement Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Comparison Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-900 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Cognitive Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="user" fill="#06b6d4" name="Your Score" />
                        <Bar dataKey="influencer" fill="#8b5cf6" name={muslim.name} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-900 flex items-center">
                      <LineChartIcon className="w-5 h-5 mr-2" />
                      Lifestyle Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={lifestyleComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip formatter={(value, name) => [`${value} minutes`, name]} />
                        <Bar dataKey="user" fill="#10b981" name="Your Time" />
                        <Bar dataKey="influencer" fill="#f59e0b" name={`${muslim.name}'s Time`} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Action Plan */}
              <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-indigo-900 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Personalized Action Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-indigo-900">Areas to Improve</h4>
                      {comparisonData.map((item, index) => {
                        const gap = item.influencer - item.user
                        if (gap > 10) {
                          return (
                            <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                              <div>
                                <div className="text-sm font-medium text-orange-900">{item.category}</div>
                                <div className="text-xs text-orange-700">Gap: {gap} points</div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-indigo-900">Your Strengths</h4>
                      {comparisonData.map((item, index) => {
                        const gap = item.influencer - item.user
                        if (gap <= 10) {
                          return (
                            <div key={index} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <div>
                                <div className="text-sm font-medium text-green-900">{item.category}</div>
                                <div className="text-xs text-green-700">Strong performance</div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Guidance Tab */}
          <TabsContent value="financial">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-indigo-900 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Halal Wealth Principles
                  </CardTitle>
                  <Button 
                    size="sm"
                    onClick={() => copyToProfile('Financial Guidance', muslim.financialGuidance)}
                    className="bg-amber-600 text-white"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Guidelines
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {muslim.financialGuidance.map((guidance: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="text-sm text-amber-800">{guidance}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-indigo-900 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Islamic Finance Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="text-green-900 font-medium mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Recommended Actions
                      </h4>
                      <div className="text-sm text-green-700 space-y-2">
                        <div>✓ Open Islamic banking account</div>
                        <div>✓ Invest in Shariah-compliant funds</div>
                        <div>✓ Calculate and pay Zakat regularly</div>
                        <div>✓ Avoid interest-based transactions</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="text-red-900 font-medium mb-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Avoid These Practices
                      </h4>
                      <div className="text-sm text-red-700 space-y-2">
                        <div>✗ Conventional banking with interest</div>
                        <div>✗ Gambling or speculative investments</div>
                        <div>✗ Businesses dealing in haram products</div>
                        <div>✗ Excessive debt without necessity</div>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-indigo-600 text-white"
                      onClick={() => copyToProfile('Complete Financial Plan', {
                        principles: muslim.financialGuidance,
                        recommendations: "Islamic finance guidelines"
                      })}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Get Complete Financial Plan
                    </Button>
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