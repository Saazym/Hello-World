import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Users, UserPlus, Trophy, Flame, Target, Crown, Gift, Heart, Calendar, Star, Plus, Check, Clock } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const familyMembers = [
  {
    id: 1,
    name: "Ahmed Hassan",
    relation: "Father",
    currentStreak: 15,
    bestStreak: 28,
    totalPoints: 1250,
    status: "active",
    avatar: "AH",
    lastActive: "2 minutes ago",
    todaysPrayers: 4,
    weeklyGoal: 35,
    weeklyProgress: 28
  },
  {
    id: 2,
    name: "Aisha Hassan",
    relation: "Mother",
    currentStreak: 12,
    bestStreak: 22,
    totalPoints: 980,
    status: "active",
    avatar: "AH",
    lastActive: "5 minutes ago",
    todaysPrayers: 4,
    weeklyGoal: 35,
    weeklyProgress: 30
  },
  {
    id: 3,
    name: "Omar Hassan",
    relation: "Son",
    currentStreak: 8,
    bestStreak: 15,
    totalPoints: 620,
    status: "active",
    avatar: "OH",
    lastActive: "1 hour ago",
    todaysPrayers: 3,
    weeklyGoal: 30,
    weeklyProgress: 22
  },
  {
    id: 4,
    name: "Fatima Hassan",
    relation: "Daughter",
    currentStreak: 6,
    bestStreak: 12,
    totalPoints: 450,
    status: "missed",
    avatar: "FH",
    lastActive: "6 hours ago",
    todaysPrayers: 2,
    weeklyGoal: 25,
    weeklyProgress: 18
  }
]

const familyAchievements = [
  {
    id: 1,
    title: "Family Prayer Champions",
    description: "All family members completed prayers for 7 consecutive days",
    icon: "👨‍👩‍👧‍👦",
    points: 500,
    unlocked: true,
    date: "5 days ago"
  },
  {
    id: 2,
    title: "Ramadan Unity",
    description: "Maintained family streak throughout Ramadan",
    icon: "🌙",
    points: 1000,
    unlocked: true,
    date: "2 months ago"
  },
  {
    id: 3,
    title: "Quran Study Circle",
    description: "Family completed 10 Quran sessions together",
    icon: "📖",
    points: 750,
    unlocked: false,
    progress: 7,
    total: 10
  },
  {
    id: 4,
    title: "Charity Champions",
    description: "Family donated together for 30 days",
    icon: "💝",
    points: 1200,
    unlocked: false,
    progress: 12,
    total: 30
  }
]

const rewards = [
  {
    id: 1,
    title: "Family Iftar Voucher",
    description: "$50 voucher for local halal restaurant",
    cost: 2000,
    category: "dining",
    icon: "🍽️"
  },
  {
    id: 2,
    title: "Islamic Book Collection",
    description: "Set of 5 Islamic children's books",
    cost: 1500,
    category: "education",
    icon: "📚"
  },
  {
    id: 3,
    title: "Family Umrah Fund",
    description: "Contribution to family Umrah savings",
    cost: 5000,
    category: "pilgrimage",
    icon: "🕋"
  },
  {
    id: 4,
    title: "Mosque Donation",
    description: "Donate in family's name to local mosque",
    cost: 1000,
    category: "charity",
    icon: "🕌"
  }
]

const pendingInvites = [
  {
    id: 1,
    name: "Grandfather Ali",
    email: "ali.hassan@email.com",
    status: "pending",
    sentDate: "2 days ago"
  },
  {
    id: 2,
    name: "Uncle Yusuf",
    email: "yusuf.hassan@email.com",
    status: "pending",
    sentDate: "1 week ago"
  }
]

export function FamilyStreakSection() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newMemberRelation, setNewMemberRelation] = useState("")

  const totalFamilyPoints = familyMembers.reduce((sum, member) => sum + member.totalPoints, 0)
  const familyStreak = Math.min(...familyMembers.map(member => member.currentStreak))
  const activeMembersToday = familyMembers.filter(member => member.todaysPrayers >= 4).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1628270251031-9262ac25387b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB0b2dldGhlciUyMG11c2xpbXxlbnwxfHx8fDE3NTgxMjUxOTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Family together"
            className="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-4 md:mb-6 object-cover border-4 border-purple-300"
          />
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4 text-purple-900 font-bold">Family Streak Hub</h1>
          <p className="text-purple-800 max-w-2xl mx-auto text-sm md:text-base px-4">
            Connect with family members to maintain collective Islamic practices and earn amazing rewards together
          </p>
        </div>

        {/* Family Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-4 text-center">
              <Flame className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{familyStreak}</div>
              <div className="text-sm opacity-90">Family Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalFamilyPoints.toLocaleString()}</div>
              <div className="text-sm opacity-90">Total Points</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{familyMembers.length}</div>
              <div className="text-sm opacity-90">Family Members</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{activeMembersToday}/{familyMembers.length}</div>
              <div className="text-sm opacity-90">Active Today</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="dashboard" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Users className="w-4 h-4 md:w-4 md:h-4 text-purple-600 flex-shrink-0" />
              <span className="leading-tight text-center">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="members" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <UserPlus className="w-4 h-4 md:w-4 md:h-4 text-blue-600 flex-shrink-0" />
              <span className="leading-tight text-center">Members</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Trophy className="w-4 h-4 md:w-4 md:h-4 text-amber-600 flex-shrink-0" />
              <span className="leading-tight text-center">Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Gift className="w-4 h-4 md:w-4 md:h-4 text-pink-600 flex-shrink-0" />
              <span className="leading-tight text-center">Rewards</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-900 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-pink-600" />
                      Family Progress Today
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {familyMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-purple-200 text-purple-800">
                              {member.avatar}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium text-purple-900">{member.name}</h3>
                              <div className="flex items-center gap-2">
                                <Badge className={`text-xs ${
                                  member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {member.status === 'active' ? 'On Track' : 'Needs Motivation'}
                                </Badge>
                                <span className="text-xs text-gray-500">{member.lastActive}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Flame className="w-4 h-4 text-orange-500" />
                                <span className="text-purple-700">{member.currentStreak} days</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Target className="w-4 h-4 text-blue-500" />
                                <span className="text-purple-700">{member.todaysPrayers}/5 prayers</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-500" />
                                <span className="text-purple-700">{member.totalPoints} points</span>
                              </div>
                            </div>
                            
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-purple-600 mb-1">
                                <span>Weekly Goal</span>
                                <span>{member.weeklyProgress}/{member.weeklyGoal}</span>
                              </div>
                              <Progress 
                                value={(member.weeklyProgress / member.weeklyGoal) * 100} 
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-purple-900">Family Challenges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-purple-900">Weekend Family Quran Reading</h3>
                          <Badge className="bg-purple-600 text-white">2 days left</Badge>
                        </div>
                        <p className="text-sm text-purple-700 mb-3">Read 5 pages of Quran together as a family</p>
                        <Progress value={60} className="h-2 mb-2" />
                        <div className="flex justify-between text-xs text-purple-600">
                          <span>3/5 pages completed</span>
                          <span>Reward: 500 family points</span>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-purple-900">Monthly Prayer Streak</h3>
                          <Badge className="bg-blue-600 text-white">15 days left</Badge>
                        </div>
                        <p className="text-sm text-purple-700 mb-3">All family members maintain 30-day prayer streak</p>
                        <Progress value={40} className="h-2 mb-2" />
                        <div className="flex justify-between text-xs text-purple-600">
                          <span>12/30 days completed</span>
                          <span>Reward: 2000 family points</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-900">Family Leaderboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {familyMembers
                        .sort((a, b) => b.currentStreak - a.currentStreak)
                        .map((member, index) => (
                          <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg bg-purple-50">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === 0 ? 'bg-yellow-500 text-white' :
                              index === 1 ? 'bg-gray-400 text-white' :
                              index === 2 ? 'bg-orange-500 text-white' :
                              'bg-purple-200 text-purple-800'
                            }`}>
                              {index + 1}
                            </div>
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-purple-200 text-purple-800 text-xs">
                                {member.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-medium text-purple-900 text-sm">{member.name}</div>
                              <div className="text-xs text-purple-600">{member.currentStreak} day streak</div>
                            </div>
                            {index === 0 && <Crown className="w-4 h-4 text-yellow-500" />}
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <Heart className="w-4 h-4 mr-2" />
                      Send Family Encouragement
                    </Button>
                    <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-100">
                      <Users className="w-4 h-4 mr-2" />
                      Start Family Prayer
                    </Button>
                    <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-100">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Family Activity
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-900">Add Family Member</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-purple-700 mb-2 block">Email Address</label>
                      <Input
                        placeholder="family@example.com"
                        value={newMemberEmail}
                        onChange={(e) => setNewMemberEmail(e.target.value)}
                        className="border-purple-300"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-purple-700 mb-2 block">Relationship</label>
                      <select 
                        value={newMemberRelation}
                        onChange={(e) => setNewMemberRelation(e.target.value)}
                        className="w-full p-2 border border-purple-300 rounded-md text-sm"
                      >
                        <option value="">Select relationship</option>
                        <option value="spouse">Spouse</option>
                        <option value="child">Child</option>
                        <option value="parent">Parent</option>
                        <option value="sibling">Sibling</option>
                        <option value="grandparent">Grandparent</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Send Invitation
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-purple-900">Pending Invitations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pendingInvites.map((invite) => (
                        <div key={invite.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <div>
                            <div className="font-medium text-purple-900">{invite.name}</div>
                            <div className="text-sm text-purple-600">{invite.email}</div>
                            <div className="text-xs text-gray-500">Sent {invite.sentDate}</div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-purple-300 text-purple-700">
                              Resend
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-900">Current Family Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {familyMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-purple-200 text-purple-800">
                              {member.avatar}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <h3 className="font-medium text-purple-900">{member.name}</h3>
                            <p className="text-sm text-purple-600">{member.relation}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`text-xs ${
                                member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {member.status === 'active' ? 'Active' : 'Inactive'}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Best: {member.bestStreak} days
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-900">{member.currentStreak}</div>
                            <div className="text-xs text-purple-600">day streak</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {familyAchievements.map((achievement) => (
                <Card key={achievement.id} className={`hover:shadow-lg transition-shadow ${
                  achievement.unlocked ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-amber-200' : 'bg-gray-50'
                }`}>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <h3 className={`font-medium mb-2 ${
                        achievement.unlocked ? 'text-amber-900' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${
                        achievement.unlocked ? 'text-amber-700' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>

                    {achievement.unlocked ? (
                      <div className="text-center">
                        <Badge className="bg-amber-500 text-white mb-2">
                          <Check className="w-3 h-3 mr-1" />
                          Unlocked
                        </Badge>
                        <div className="text-sm text-amber-700">
                          Earned {achievement.points} points • {achievement.date}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.total}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress! / achievement.total!) * 100} 
                          className="h-2 mb-2"
                        />
                        <div className="text-center text-sm text-gray-500">
                          {achievement.points} points when unlocked
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <div className="mb-6">
              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardContent className="p-6 text-center">
                  <Star className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-3xl font-bold mb-1">{totalFamilyPoints.toLocaleString()}</div>
                  <div className="text-purple-100">Available Family Points</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => (
                <Card key={reward.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{reward.icon}</div>
                      <h3 className="font-medium text-purple-900 mb-2">{reward.title}</h3>
                      <p className="text-sm text-purple-700 mb-3">{reward.description}</p>
                      <Badge className="bg-purple-100 text-purple-800 mb-2">
                        {reward.category}
                      </Badge>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-900 mb-3">
                        {reward.cost.toLocaleString()} points
                      </div>
                      <Button 
                        className={`w-full ${
                          totalFamilyPoints >= reward.cost 
                            ? 'bg-purple-600 hover:bg-purple-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={totalFamilyPoints < reward.cost}
                      >
                        <Gift className="w-4 h-4 mr-2" />
                        {totalFamilyPoints >= reward.cost ? 'Redeem' : 'Not Enough Points'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}