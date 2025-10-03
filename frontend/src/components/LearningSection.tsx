import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { BookOpen, Play, Volume2, Star, Clock, User, Search, Filter } from 'lucide-react'
import { Input } from './ui/input'

const hadithCollections = [
  {
    name: "Sahih Bukhari",
    totalHadith: 7563,
    completed: 145,
    description: "The most authentic collection of hadith",
    category: "Authentic"
  },
  {
    name: "Sahih Muslim", 
    totalHadith: 7190,
    completed: 89,
    description: "Second most authentic hadith collection",
    category: "Authentic"
  },
  {
    name: "Sunan Abu Dawud",
    totalHadith: 5274,
    completed: 23,
    description: "Focus on legal rulings and practices",
    category: "Sunan"
  },
  {
    name: "Jami at-Tirmidhi",
    totalHadith: 3956,
    completed: 67,
    description: "Includes grading of hadith authenticity", 
    category: "Sunan"
  }
]

const prophetStories = [
  {
    title: "The Birth and Early Life",
    duration: "45 min",
    progress: 100,
    category: "Biography",
    description: "The miraculous birth and childhood of Prophet Muhammad (PBUH)"
  },
  {
    title: "The First Revelation",
    duration: "35 min", 
    progress: 80,
    category: "Revelation",
    description: "The transformative moment in Cave Hira"
  },
  {
    title: "The Hijra to Madinah",
    duration: "50 min",
    progress: 60,
    category: "Migration", 
    description: "The strategic migration that changed history"
  },
  {
    title: "The Treaty of Hudaybiyyah",
    duration: "40 min",
    progress: 0,
    category: "Diplomacy",
    description: "A lesson in patience and strategic thinking"
  }
]

const islamicLessons = [
  {
    title: "Principles of Islamic Finance",
    instructor: "Dr. Ahmed Hassan",
    level: "Intermediate",
    duration: "6 weeks", 
    enrolled: 234,
    rating: 4.8,
    description: "Learn about halal investment, Islamic banking, and financial ethics"
  },
  {
    title: "Arabic Language Fundamentals", 
    instructor: "Ustadha Fatima Ali",
    level: "Beginner",
    duration: "8 weeks",
    enrolled: 456,
    rating: 4.9,
    description: "Master Arabic alphabet, basic grammar, and Quranic vocabulary"
  },
  {
    title: "Islamic History & Civilization",
    instructor: "Prof. Omar Abdullah", 
    level: "Intermediate",
    duration: "10 weeks",
    enrolled: 189,
    rating: 4.7,
    description: "Explore the golden age of Islamic civilization and its contributions"
  }
]

const dailyLessons = [
  {
    title: "The Importance of Salah",
    ayahReference: "Al-Baqarah 2:45",
    audioLength: "12 min",
    keyPoints: ["Spiritual connection", "Discipline", "Community unity"],
    completed: false
  },
  {
    title: "Seeking Knowledge in Islam",
    ayahReference: "Taha 20:114", 
    audioLength: "15 min",
    keyPoints: ["Lifelong learning", "Divine guidance", "Practical wisdom"],
    completed: true
  },
  {
    title: "Patience in Adversity",
    ayahReference: "Al-Baqarah 2:155",
    audioLength: "18 min", 
    keyPoints: ["Trust in Allah", "Inner strength", "Spiritual growth"],
    completed: true
  }
]

export function LearningSection() {
  const [activeTab, setActiveTab] = useState("hadith")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl mb-4 text-green-900">Islamic Learning & Stories</h1>
          <p className="text-green-700 max-w-2xl mx-auto">
            Deepen your Islamic knowledge through hadith study, prophet stories, and comprehensive lessons
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto">
            <TabsTrigger value="hadith" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 sm:px-4">
              <BookOpen className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Hadith Library</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 sm:px-4">
              <User className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Prophet Stories</span>
            </TabsTrigger>
            <TabsTrigger value="lessons" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 sm:px-4">
              <Play className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Islamic Lessons</span>
            </TabsTrigger>
            <TabsTrigger value="daily" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 sm:px-4">
              <Star className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Daily Wisdom</span>
            </TabsTrigger>
          </TabsList>

          {/* Hadith Library Tab */}
          <TabsContent value="hadith">
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-900">Browse Collections</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-green-500" />
                      <Input 
                        placeholder="Search hadith..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-green-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      {hadithCollections.map((collection, index) => (
                        <div key={index} className="p-3 border border-green-200 rounded-lg hover:bg-green-50 cursor-pointer transition-colors">
                          <div className="text-green-900 text-sm mb-1">{collection.name}</div>
                          <div className="text-xs text-green-600 mb-2">{collection.description}</div>
                          <div className="flex justify-between text-xs text-green-700 mb-1">
                            <span>Progress</span>
                            <span>{collection.completed}/{collection.totalHadith}</span>
                          </div>
                          <Progress value={(collection.completed / collection.totalHadith) * 100} className="h-1" />
                          <Badge className="mt-2 bg-green-100 text-green-700 text-xs">
                            {collection.category}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-green-900">Sahih Bukhari - Book of Faith</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-green-300">
                          <Play className="w-4 h-4 mr-1" />
                          Audio
                        </Button>
                        <Button variant="outline" size="sm" className="border-green-300">
                          <Filter className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[1, 2, 3].map((hadithNum) => (
                      <div key={hadithNum} className="border-l-4 border-green-300 pl-6 py-4 bg-gradient-to-r from-green-50 to-transparent">
                        <div className="flex items-start justify-between mb-4">
                          <Badge className="bg-green-600 text-white">Hadith {hadithNum}</Badge>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Star className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Volume2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Arabic Text */}
                        <div className="text-right text-lg leading-loose text-green-900 mb-4" dir="rtl">
                          عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ
                        </div>

                        {/* Translation */}
                        <div className="text-green-900 leading-relaxed mb-3">
                          Narrated Abu Huraira: The Prophet (ﷺ) said, "Faith has sixty-odd or seventy-odd branches, 
                          the most excellent of which is the declaration that there is no god but Allah, 
                          and the humblest of which is the removal of what is injurious from the path..."
                        </div>

                        {/* Narrator Chain */}
                        <div className="text-sm text-green-600 mb-3">
                          <strong>Chain of Narration:</strong> Abu Huraira → ...
                        </div>

                        {/* Authenticity */}
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-700 text-xs">Sahih</Badge>
                          <span className="text-xs text-green-600">Reference: Bukhari 9</span>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between">
                      <Button variant="outline" className="border-green-300 text-green-700">
                        ← Previous
                      </Button>
                      <Button variant="outline" className="border-green-300 text-green-700">
                        Next →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Prophet Stories Tab */}
          <TabsContent value="stories">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prophetStories.map((story, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge className="bg-blue-100 text-blue-700 text-xs">
                        {story.category}
                      </Badge>
                      <div className="flex items-center text-xs text-green-600">
                        <Clock className="w-3 h-3 mr-1" />
                        {story.duration}
                      </div>
                    </div>
                    <CardTitle className="text-green-900 text-lg">{story.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-700 text-sm mb-4">{story.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-green-700 mb-1">
                        <span>Progress</span>
                        <span>{story.progress}%</span>
                      </div>
                      <Progress value={story.progress} className="h-2" />
                    </div>

                    <Button className={`w-full ${
                      story.progress === 0 ? 'bg-green-600 hover:bg-green-700' :
                      story.progress === 100 ? 'bg-gray-600 hover:bg-gray-700' :
                      'bg-blue-600 hover:bg-blue-700'
                    } text-white`}>
                      <Play className="w-4 h-4 mr-2" />
                      {story.progress === 0 ? 'Start Story' :
                       story.progress === 100 ? 'Review' : 'Continue'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons">
            <div className="space-y-6">
              {islamicLessons.map((lesson, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-6 items-center">
                      <div className="md:col-span-2">
                        <h3 className="text-xl text-green-900 mb-2">{lesson.title}</h3>
                        <p className="text-green-700 text-sm mb-3">{lesson.description}</p>
                        <div className="flex items-center gap-4 text-sm text-green-600">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {lesson.instructor}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {lesson.duration}
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="ml-1 text-green-900">{lesson.rating}</span>
                        </div>
                        <div className="text-sm text-green-600">{lesson.enrolled} enrolled</div>
                        <Badge className={`mt-2 ${
                          lesson.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                          lesson.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {lesson.level}
                        </Badge>
                      </div>

                      <div className="text-center">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white mb-2">
                          Enroll Now
                        </Button>
                        <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50 text-sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Daily Wisdom Tab */}
          <TabsContent value="daily">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-green-900">Today's Reflection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-sm text-green-600 mb-2">January 14, 2025</div>
                      <h3 className="text-xl text-green-900 mb-3">The Power of Gratitude</h3>
                      <div className="text-sm text-green-700 mb-3">
                        "And whoever is grateful - he is grateful for [the benefit of] himself."
                      </div>
                      <div className="text-xs text-green-600">Quran 31:12</div>
                    </div>

                    <div className="space-y-3 text-sm text-green-800">
                      <p>
                        Today's reflection focuses on the transformative power of gratitude in our daily lives. 
                        When we acknowledge Allah's blessings, we open our hearts to receive even more.
                      </p>
                      <p>
                        Gratitude shifts our perspective from what we lack to what we have been blessed with, 
                        creating a positive cycle of contentment and spiritual growth.
                      </p>
                    </div>

                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Listen to Audio (8 min)
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-900">Daily Practice</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-sm text-green-900 mb-1">Morning Dhikr</div>
                        <div className="text-xs text-green-700">Recite "SubhanAllahi wa bihamdihi" 100 times</div>
                        <Button size="sm" variant="outline" className="mt-2 border-green-300 text-green-700">
                          Start Counter
                        </Button>
                      </div>
                      
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-sm text-green-900 mb-1">Gratitude Journal</div>
                        <div className="text-xs text-green-700">Write down 3 things you're grateful for today</div>
                        <Button size="sm" variant="outline" className="mt-2 border-green-300 text-green-700">
                          Open Journal
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-900">Recent Lessons</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dailyLessons.map((lesson, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${
                        lesson.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-green-900 text-sm">{lesson.title}</h4>
                          <Badge className={`text-xs ${
                            lesson.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {lesson.completed ? 'Completed' : 'New'}
                          </Badge>
                        </div>
                        
                        <div className="text-xs text-green-600 mb-2">
                          {lesson.ayahReference} • {lesson.audioLength}
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {lesson.keyPoints.map((point, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-green-300 text-green-700">
                              {point}
                            </Badge>
                          ))}
                        </div>

                        <Button size="sm" variant={lesson.completed ? "outline" : "default"} 
                               className={lesson.completed ? "border-green-300 text-green-700" : "bg-green-600 hover:bg-green-700 text-white"}>
                          <Play className="w-3 h-3 mr-1" />
                          {lesson.completed ? 'Review' : 'Listen'}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}