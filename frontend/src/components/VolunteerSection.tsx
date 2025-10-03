import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { HandHeart, Calendar, Users, MapPin, Clock, Star, Plus, CheckCircle, Award, Heart, Zap } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const volunteerOpportunities = [
  {
    id: 1,
    title: "Community Kitchen Volunteer",
    organization: "Al-Noor Islamic Center",
    category: "Food Service",
    date: "Every Saturday",
    time: "10:00 AM - 2:00 PM",
    location: "123 Main St, Downtown",
    volunteersNeeded: 8,
    volunteersSignedUp: 5,
    description: "Help prepare and serve meals for community members and those in need.",
    skills: ["Cooking", "Food Safety", "Customer Service"],
    points: 50,
    urgent: false,
    coordinator: "Sister Fatima"
  },
  {
    id: 2,
    title: "Youth Mentor Program",
    organization: "Islamic Society Center",
    category: "Education",
    date: "Weekends",
    time: "3:00 PM - 5:00 PM",
    location: "789 Elm St, Uptown",
    volunteersNeeded: 12,
    volunteersSignedUp: 8,
    description: "Mentor young Muslims in academics, life skills, and Islamic values.",
    skills: ["Teaching", "Leadership", "Communication"],
    points: 75,
    urgent: false,
    coordinator: "Brother Ahmad"
  },
  {
    id: 3,
    title: "Emergency Relief Drive",
    organization: "Community Relief Fund",
    category: "Emergency",
    date: "This Weekend",
    time: "9:00 AM - 6:00 PM",
    location: "Multiple Locations",
    volunteersNeeded: 25,
    volunteersSignedUp: 12,
    description: "Help distribute emergency supplies to families affected by recent floods.",
    skills: ["Physical Work", "Organization", "Driving"],
    points: 100,
    urgent: true,
    coordinator: "Imam Abdullah"
  },
  {
    id: 4,
    title: "Elderly Care Visits",
    organization: "Masjid As-Salam",
    category: "Healthcare",
    date: "Flexible",
    time: "Anytime",
    location: "Various Homes",
    volunteersNeeded: 15,
    volunteersSignedUp: 7,
    description: "Visit elderly community members, provide companionship and assistance.",
    skills: ["Compassion", "Communication", "Patience"],
    points: 60,
    urgent: false,
    coordinator: "Sister Aisha"
  }
]

const myVolunteerHistory = [
  {
    id: 1,
    title: "Ramadan Food Distribution",
    organization: "Al-Noor Islamic Center",
    date: "March 15, 2024",
    hours: 6,
    points: 100,
    status: "completed",
    feedback: "Excellent volunteer! Very helpful and dedicated."
  },
  {
    id: 2,
    title: "Mosque Cleanup Day",
    organization: "Islamic Society Center",
    date: "February 28, 2024",
    hours: 4,
    points: 60,
    status: "completed",
    feedback: "Great team player, arrived early and stayed late."
  },
  {
    id: 3,
    title: "Youth Islamic Workshop",
    organization: "Masjid As-Salam",
    date: "February 10, 2024",
    hours: 8,
    points: 120,
    status: "completed",
    feedback: "Wonderful with the children, very patient and knowledgeable."
  }
]

const leaderboard = [
  { rank: 1, name: "Ahmed Hassan", points: 1250, hours: 95, badge: "Community Champion" },
  { rank: 2, name: "Fatima Al-Zahra", points: 1180, hours: 88, badge: "Service Leader" },
  { rank: 3, name: "Omar Abdullah", points: 980, hours: 76, badge: "Dedicated Helper" },
  { rank: 4, name: "Zainab Hussein", points: 920, hours: 71, badge: "Kind Heart" },
  { rank: 5, name: "Yusuf Rahman", points: 850, hours: 65, badge: "Team Player" }
]

const volunteerBadges = [
  { name: "First Time Volunteer", icon: "🌟", earned: true, date: "Jan 15, 2024" },
  { name: "Community Kitchen Helper", icon: "🍽️", earned: true, date: "Feb 1, 2024" },
  { name: "Youth Mentor", icon: "👨‍🏫", earned: true, date: "Feb 20, 2024" },
  { name: "Emergency Responder", icon: "🚨", earned: false, requirement: "5 emergency volunteering" },
  { name: "Monthly Contributor", icon: "📅", earned: false, requirement: "Volunteer monthly for 6 months" },
  { name: "Community Champion", icon: "🏆", earned: false, requirement: "1000+ volunteer points" }
]

export function VolunteerSection() {
  const [activeTab, setActiveTab] = useState("opportunities")
  const [eventTitle, setEventTitle] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterUrgency, setFilterUrgency] = useState("all")

  const totalPoints = myVolunteerHistory.reduce((sum, item) => sum + item.points, 0)
  const totalHours = myVolunteerHistory.reduce((sum, item) => sum + item.hours, 0)
  const earnedBadges = volunteerBadges.filter(badge => badge.earned).length

  const filteredOpportunities = volunteerOpportunities.filter(opp => {
    const categoryMatch = filterCategory === "all" || opp.category.toLowerCase() === filterCategory.toLowerCase()
    const urgencyMatch = filterUrgency === "all" || (filterUrgency === "urgent" && opp.urgent) || (filterUrgency === "regular" && !opp.urgent)
    return categoryMatch && urgencyMatch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXIlMjBzZXJ2aWNlfGVufDF8fHx8MTc1ODEyNTYxMXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Community volunteer service"
            className="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-4 md:mb-6 object-cover border-4 border-cyan-300"
          />
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4 text-cyan-900 font-bold">Volunteer Coordination Hub</h1>
          <p className="text-cyan-800 max-w-2xl mx-auto text-sm md:text-base px-4">
            Connect with volunteer opportunities, organize community service, and make a meaningful impact together
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-4 text-center">
              <HandHeart className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalPoints}</div>
              <div className="text-sm opacity-90">Volunteer Points</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalHours}</div>
              <div className="text-sm opacity-90">Hours Served</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-teal-500 to-green-500 text-white">
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{earnedBadges}</div>
              <div className="text-sm opacity-90">Badges Earned</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm opacity-90">Events Organized</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="opportunities" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <HandHeart className="w-4 h-4 md:w-4 md:h-4 text-cyan-600 flex-shrink-0" />
              <span className="leading-tight text-center">Opportunities</span>
            </TabsTrigger>
            <TabsTrigger value="my-volunteering" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Calendar className="w-4 h-4 md:w-4 md:h-4 text-blue-600 flex-shrink-0" />
              <span className="leading-tight text-center">My Activity</span>
            </TabsTrigger>
            <TabsTrigger value="create-event" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Plus className="w-4 h-4 md:w-4 md:h-4 text-green-600 flex-shrink-0" />
              <span className="leading-tight text-center">Create Event</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Star className="w-4 h-4 md:w-4 md:h-4 text-amber-600 flex-shrink-0" />
              <span className="leading-tight text-center">Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Award className="w-4 h-4 md:w-4 md:h-4 text-purple-600 flex-shrink-0" />
              <span className="leading-tight text-center">Badges</span>
            </TabsTrigger>
          </TabsList>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-cyan-900 text-base">Filter Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-cyan-700 mb-2 block">Category</label>
                      <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="food service">Food Service</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-cyan-700 mb-2 block">Urgency</label>
                      <Select value={filterUrgency} onValueChange={setFilterUrgency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Opportunities</SelectItem>
                          <SelectItem value="urgent">Urgent Only</SelectItem>
                          <SelectItem value="regular">Regular Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                      Apply Filters
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-cyan-900 text-base">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-cyan-50 rounded-lg text-center">
                      <div className="text-lg font-bold text-cyan-900">{volunteerOpportunities.length}</div>
                      <div className="text-sm text-cyan-600">Available Opportunities</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg text-center">
                      <div className="text-lg font-bold text-orange-900">
                        {volunteerOpportunities.filter(opp => opp.urgent).length}
                      </div>
                      <div className="text-sm text-orange-600">Urgent Needs</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                      <div className="text-lg font-bold text-green-900">
                        {volunteerOpportunities.reduce((sum, opp) => sum + opp.volunteersSignedUp, 0)}
                      </div>
                      <div className="text-sm text-green-600">Volunteers Registered</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Opportunities List */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {filteredOpportunities.map((opportunity) => (
                    <Card key={opportunity.id} className={`hover:shadow-lg transition-shadow ${
                      opportunity.urgent ? 'border-l-4 border-l-red-500' : ''
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-cyan-900 text-lg">{opportunity.title}</h3>
                              {opportunity.urgent && (
                                <Badge className="bg-red-500 text-white">
                                  <Zap className="w-3 h-3 mr-1" />
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <p className="text-cyan-700 mb-1">{opportunity.organization}</p>
                            <Badge className="bg-cyan-100 text-cyan-800 text-xs">
                              {opportunity.category}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-cyan-900">{opportunity.points}</div>
                            <div className="text-xs text-cyan-600">points</div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4">{opportunity.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{opportunity.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{opportunity.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{opportunity.location}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-cyan-700 mb-2">
                            <span>Volunteers Needed</span>
                            <span>{opportunity.volunteersSignedUp}/{opportunity.volunteersNeeded}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-cyan-600 h-2 rounded-full" 
                              style={{ width: `${(opportunity.volunteersSignedUp / opportunity.volunteersNeeded) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-sm text-cyan-700 mb-2">Required Skills:</div>
                          <div className="flex flex-wrap gap-2">
                            {opportunity.skills.map((skill, index) => (
                              <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            Coordinator: {opportunity.coordinator}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" className="border-cyan-300 text-cyan-700 hover:bg-cyan-100">
                              Learn More
                            </Button>
                            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                              <HandHeart className="w-4 h-4 mr-2" />
                              Volunteer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* My Volunteering Tab */}
          <TabsContent value="my-volunteering">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-cyan-900">My Volunteer History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myVolunteerHistory.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-4 bg-cyan-50 rounded-lg">
                        <div className="w-12 h-12 bg-cyan-200 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-cyan-700" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-cyan-900 mb-1">{activity.title}</h3>
                          <p className="text-cyan-700 text-sm mb-1">{activity.organization}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{activity.date}</span>
                            <span>{activity.hours} hours</span>
                            <span>{activity.points} points earned</span>
                          </div>
                          {activity.feedback && (
                            <div className="mt-2 p-2 bg-green-50 rounded text-sm text-green-800">
                              "{activity.feedback}"
                            </div>
                          )}
                        </div>

                        <Badge className="bg-green-100 text-green-800">
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-cyan-900 text-base">Personal Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-900">{totalHours}</div>
                      <div className="text-sm text-blue-600">Total Hours</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-900">{totalPoints}</div>
                      <div className="text-sm text-green-600">Total Points</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-900">{myVolunteerHistory.length}</div>
                      <div className="text-sm text-purple-600">Events Completed</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-cyan-900 text-base">Upcoming Commitments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-amber-50 rounded border border-amber-200">
                        <div className="font-medium text-amber-900 text-sm">Community Kitchen</div>
                        <div className="text-xs text-amber-700">This Saturday, 10:00 AM</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded border border-blue-200">
                        <div className="font-medium text-blue-900 text-sm">Youth Mentoring</div>
                        <div className="text-xs text-blue-700">Next Sunday, 3:00 PM</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-cyan-900 text-base">Impact Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-cyan-700">Meals Served:</span>
                        <span className="font-medium text-cyan-900">320+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-700">Students Mentored:</span>
                        <span className="font-medium text-cyan-900">15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-700">Families Helped:</span>
                        <span className="font-medium text-cyan-900">45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-700">Events Organized:</span>
                        <span className="font-medium text-cyan-900">8</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Create Event Tab */}
          <TabsContent value="create-event">
            <Card>
              <CardHeader>
                <CardTitle className="text-cyan-900">Create Volunteer Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-cyan-700 mb-2 block">Event Title</label>
                      <Input
                        placeholder="Enter event title"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        className="border-cyan-300"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-cyan-700 mb-2 block">Category</label>
                      <Select>
                        <SelectTrigger className="border-cyan-300">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="food-service">Food Service</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="emergency">Emergency Relief</SelectItem>
                          <SelectItem value="community">Community Building</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-cyan-700 mb-2 block">Date</label>
                      <Input type="date" className="border-cyan-300" />
                    </div>

                    <div>
                      <label className="text-sm text-cyan-700 mb-2 block">Time</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="time" placeholder="Start time" className="border-cyan-300" />
                        <Input type="time" placeholder="End time" className="border-cyan-300" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-cyan-700 mb-2 block">Location</label>
                      <Input placeholder="Event location" className="border-cyan-300" />
                    </div>

                    <div>
                      <label className="text-sm text-cyan-700 mb-2 block">Volunteers Needed</label>
                      <Input type="number" placeholder="Number of volunteers" className="border-cyan-300" />
                    </div>

                    <div>
                      <label className="text-sm text-cyan-700 mb-2 block">Points per Volunteer</label>
                      <Input type="number" placeholder="Points to award" className="border-cyan-300" />
                    </div>

                    <div>
                      <label className="text-sm text-cyan-700 mb-2 block">Urgency</label>
                      <Select>
                        <SelectTrigger className="border-cyan-300">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-cyan-700 mb-2 block">Event Description</label>
                  <Textarea
                    placeholder="Describe the volunteer opportunity, what volunteers will do, and any requirements..."
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    className="min-h-24 border-cyan-300"
                  />
                </div>

                <div>
                  <label className="text-sm text-cyan-700 mb-2 block">Required Skills (comma-separated)</label>
                  <Input placeholder="e.g., Cooking, Customer Service, Physical Work" className="border-cyan-300" />
                </div>

                <div className="flex gap-3">
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                  <Button variant="outline" className="border-cyan-300 text-cyan-700 hover:bg-cyan-100">
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="text-cyan-900">Community Volunteer Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((volunteer) => (
                    <div key={volunteer.rank} className="flex items-center gap-4 p-4 bg-cyan-50 rounded-lg">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                        volunteer.rank === 1 ? 'bg-yellow-500' :
                        volunteer.rank === 2 ? 'bg-gray-400' :
                        volunteer.rank === 3 ? 'bg-orange-500' :
                        'bg-cyan-500'
                      }`}>
                        {volunteer.rank}
                      </div>
                      
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-cyan-200 text-cyan-800">
                          {volunteer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-cyan-900">{volunteer.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>{volunteer.points} points</span>
                          <span>{volunteer.hours} hours</span>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800 text-xs mt-1">
                          {volunteer.badge}
                        </Badge>
                      </div>

                      {volunteer.rank <= 3 && (
                        <div className="text-2xl">
                          {volunteer.rank === 1 ? '🥇' : volunteer.rank === 2 ? '🥈' : '🥉'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {volunteerBadges.map((badge, index) => (
                <Card key={index} className={`hover:shadow-lg transition-shadow ${
                  badge.earned ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-amber-200' : 'bg-gray-50'
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <h3 className={`font-medium mb-2 ${
                      badge.earned ? 'text-amber-900' : 'text-gray-600'
                    }`}>
                      {badge.name}
                    </h3>
                    
                    {badge.earned ? (
                      <div>
                        <Badge className="bg-green-500 text-white mb-2">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Earned
                        </Badge>
                        <div className="text-sm text-amber-700">
                          Earned on {badge.date}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Badge className="bg-gray-300 text-gray-600 mb-2">
                          Not Earned
                        </Badge>
                        <div className="text-sm text-gray-500">
                          Requirement: {badge.requirement}
                        </div>
                      </div>
                    )}
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