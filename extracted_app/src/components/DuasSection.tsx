import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Sun, Moon, Star, Play, Volume2, Plus, Minus, RotateCcw, Award } from 'lucide-react'

const dailyDuas = [
  {
    time: "Morning",
    icon: Sun,
    duas: [
      {
        title: "Morning Dhikr",
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
        transliteration: "Asbahna wa asbahal-mulku lillah",
        translation: "We have reached the morning and at this very time the whole kingdom belongs to Allah.",
        category: "Protection",
        completed: true
      },
      {
        title: "Seeking Forgiveness",
        arabic: "أَسْتَغْفِرُ اللهَ الْعَظِيمَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
        transliteration: "Astaghfirullaha-l-azeem alladhi la ilaha illa huwa-l-hayyu-l-qayyum wa atubu ilayh",
        translation: "I seek forgiveness from Allah the Mighty, whom there is none worthy of worship except Him, the Living, the Eternal, and I repent to Him.",
        category: "Forgiveness",
        completed: false
      }
    ]
  },
  {
    time: "Evening", 
    icon: Moon,
    duas: [
      {
        title: "Evening Protection",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
        transliteration: "Amsayna wa amsal-mulku lillah",
        translation: "We have reached the evening and at this very time the whole kingdom belongs to Allah.",
        category: "Protection",
        completed: false
      },
      {
        title: "Seeking Allah's Protection",
        arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
        transliteration: "Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilaykal-maseer",
        translation: "O Allah, by Your leave we have reached the evening and by Your leave we have reached the morning, by Your leave we live and die and unto You is our resurrection.",
        category: "Protection",
        completed: false
      }
    ]
  }
]

const dhikrCounters = [
  {
    name: "SubhanAllah",
    arabic: "سُبْحَانَ اللهِ",
    target: 33,
    current: 15,
    reward: "Glorifying Allah"
  },
  {
    name: "Alhamdulillah", 
    arabic: "الْحَمْدُ لِلَّهِ",
    target: 33,
    current: 33,
    reward: "Praising Allah"
  },
  {
    name: "Allahu Akbar",
    arabic: "اللهُ أَكْبَرُ", 
    target: 34,
    current: 12,
    reward: "Magnifying Allah"
  },
  {
    name: "La ilaha illa Allah",
    arabic: "لاَ إِلَهَ إِلاَّ اللهُ",
    target: 100,
    current: 67,
    reward: "Declaration of Faith"
  }
]

const achievements = [
  { 
    title: "Morning Warrior",
    description: "Complete morning duas for 7 consecutive days",
    progress: 5,
    target: 7,
    icon: "🌅",
    completed: false
  },
  {
    title: "Night Guardian", 
    description: "Complete evening duas for 7 consecutive days", 
    progress: 7,
    target: 7,
    icon: "🌙",
    completed: true
  },
  {
    title: "Dhikr Master",
    description: "Complete daily dhikr targets for 30 days",
    progress: 18,
    target: 30,
    icon: "📿",
    completed: false
  },
  {
    title: "Consistency Champion",
    description: "Maintain daily practice for 90 days",
    progress: 45,
    target: 90,
    icon: "🏆",
    completed: false
  }
]

const prayerReminders = [
  { prayer: "Fajr", time: "5:30 AM", status: "completed" },
  { prayer: "Dhuhr", time: "12:45 PM", status: "completed" },
  { prayer: "Asr", time: "3:45 PM", status: "upcoming" },
  { prayer: "Maghrib", time: "6:20 PM", status: "upcoming" },
  { prayer: "Isha", time: "8:00 PM", status: "upcoming" }
]

export function DuasSection() {
  const [dhikrCounts, setDhikrCounts] = useState(
    dhikrCounters.reduce((acc, counter) => {
      acc[counter.name] = counter.current
      return acc
    }, {} as Record<string, number>)
  )

  const [streak, setStreak] = useState(15)

  const incrementCounter = (name: string, target: number) => {
    setDhikrCounts(prev => ({
      ...prev,
      [name]: Math.min(prev[name] + 1, target)
    }))
  }

  const decrementCounter = (name: string) => {
    setDhikrCounts(prev => ({
      ...prev,
      [name]: Math.max(prev[name] - 1, 0)
    }))
  }

  const resetCounter = (name: string) => {
    setDhikrCounts(prev => ({
      ...prev,
      [name]: 0
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl mb-4 text-orange-900">Daily Duas & Spiritual Reminders</h1>
          <p className="text-orange-700 max-w-2xl mx-auto">
            Strengthen your spiritual connection through daily duas, dhikr counters, and mindful reminders
          </p>
        </div>

        {/* Current Streak & Prayer Status */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl text-orange-900 mb-1">{streak}</div>
              <div className="text-sm text-orange-600">Day Streak</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-2">📿</div>
              <div className="text-2xl text-orange-900 mb-1">127/200</div>
              <div className="text-sm text-orange-600">Today's Dhikr</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl text-orange-900 mb-1">3/8</div>
              <div className="text-sm text-orange-600">Achievements</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Daily Duas */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl text-orange-900 mb-6">Daily Duas</h2>
              
              {dailyDuas.map((timeGroup, groupIndex) => {
                const IconComponent = timeGroup.icon
                return (
                  <Card key={groupIndex} className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-orange-900 flex items-center">
                        <IconComponent className="w-5 h-5 mr-2" />
                        {timeGroup.time} Duas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {timeGroup.duas.map((dua, duaIndex) => (
                        <div key={duaIndex} className={`p-4 rounded-lg border ${
                          dua.completed ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'
                        }`}>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-orange-900 text-lg mb-1">{dua.title}</h3>
                              <Badge className={`text-xs ${
                                dua.completed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                              }`}>
                                {dua.category}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Play className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Volume2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Arabic Text */}
                          <div className="text-right text-xl leading-loose text-orange-900 mb-3" dir="rtl">
                            {dua.arabic}
                          </div>

                          {/* Transliteration */}
                          <div className="text-orange-700 italic mb-2 text-sm">
                            {dua.transliteration}
                          </div>

                          {/* Translation */}
                          <div className="text-orange-800 leading-relaxed text-sm mb-3">
                            {dua.translation}
                          </div>

                          <Button 
                            className={`w-full ${
                              dua.completed 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-orange-600 hover:bg-orange-700'
                            } text-white`}
                          >
                            {dua.completed ? '✓ Completed Today' : 'Mark as Completed'}
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Dhikr Counters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-900">Daily Dhikr Counters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {dhikrCounters.map((counter, index) => (
                    <div key={index} className="p-4 border border-orange-200 rounded-lg">
                      <div className="text-center mb-4">
                        <h3 className="text-orange-900 text-lg mb-1">{counter.name}</h3>
                        <div className="text-2xl text-orange-800 mb-2" dir="rtl">{counter.arabic}</div>
                        <div className="text-sm text-orange-600">{counter.reward}</div>
                      </div>

                      <div className="text-center mb-4">
                        <div className="text-3xl text-orange-900 mb-2">
                          {dhikrCounts[counter.name]}/{counter.target}
                        </div>
                        <Progress 
                          value={(dhikrCounts[counter.name] / counter.target) * 100} 
                          className="h-2"
                        />
                      </div>

                      <div className="flex items-center justify-center gap-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => decrementCounter(counter.name)}
                          disabled={dhikrCounts[counter.name] === 0}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          size="sm"
                          onClick={() => incrementCounter(counter.name, counter.target)}
                          disabled={dhikrCounts[counter.name] === counter.target}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-6"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Count
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => resetCounter(counter.name)}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prayer Times Reminder */}
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-900">Today's Prayers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prayerReminders.map((prayer, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                      prayer.status === 'completed' ? 'bg-green-50' : 
                      prayer.status === 'current' ? 'bg-orange-100' : 'bg-gray-50'
                    }`}>
                      <div>
                        <div className="text-sm text-orange-900">{prayer.prayer}</div>
                        <div className="text-xs text-orange-600">{prayer.time}</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        prayer.status === 'completed' ? 'bg-green-500' :
                        prayer.status === 'current' ? 'bg-orange-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-900 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Spiritual Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      achievement.completed ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-2xl">{achievement.icon}</div>
                        {achievement.completed && (
                          <Badge className="bg-green-100 text-green-700 text-xs">Completed</Badge>
                        )}
                      </div>
                      
                      <h4 className="text-orange-900 text-sm mb-1">{achievement.title}</h4>
                      <p className="text-orange-700 text-xs mb-3">{achievement.description}</p>
                      
                      <div className="flex justify-between text-xs text-orange-600 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.target}</span>
                      </div>
                      <Progress value={(achievement.progress / achievement.target) * 100} className="h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-900">Reminder Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-800">Morning Duas</span>
                    <div className="w-10 h-6 bg-orange-200 rounded-full relative">
                      <div className="w-4 h-4 bg-orange-600 rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-800">Evening Duas</span>
                    <div className="w-10 h-6 bg-orange-200 rounded-full relative">
                      <div className="w-4 h-4 bg-orange-600 rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-800">Prayer Times</span>
                    <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                      <div className="w-4 h-4 bg-gray-400 rounded-full absolute top-1 left-1"></div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4 border-orange-300 text-orange-700 hover:bg-orange-50">
                  Customize Reminders
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}