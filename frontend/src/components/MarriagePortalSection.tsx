import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Heart, User, Search, Shield, MessageCircle, Calendar, MapPin, Star, Eye, Lock, Users } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const profiles = [
  {
    id: 1,
    name: "Aisha Rahman",
    age: 26,
    profession: "Software Engineer",
    education: "Master's in Computer Science",
    location: "New York, NY",
    mosqueAffiliation: "Al-Noor Islamic Center",
    interests: ["Quran Study", "Volunteering", "Reading", "Technology"],
    about: "Looking for a practicing Muslim partner who values family and deen.",
    verified: true,
    lastActive: "2 hours ago",
    compatibility: 92
  },
  {
    id: 2,
    name: "Fatima Al-Zahra",
    age: 24,
    profession: "Medical Student",
    education: "Pursuing MD",
    location: "Chicago, IL",
    mosqueAffiliation: "Masjid As-Salam",
    interests: ["Medicine", "Community Service", "Calligraphy", "Hiking"],
    about: "Family-oriented person seeking a life partner with strong Islamic values.",
    verified: true,
    lastActive: "1 day ago",
    compatibility: 88
  },
  {
    id: 3,
    name: "Zainab Hassan",
    age: 28,
    profession: "Teacher",
    education: "Bachelor's in Education",
    location: "Los Angeles, CA",
    mosqueAffiliation: "Islamic Society Center",
    interests: ["Education", "Children's Welfare", "Poetry", "Cooking"],
    about: "Passionate about Islamic education and building a faithful family.",
    verified: true,
    lastActive: "3 hours ago",
    compatibility: 95
  }
]

const myMatches = [
  {
    id: 1,
    name: "Sarah Ahmad",
    age: 25,
    compatibility: 94,
    mutualInterests: 6,
    status: "pending",
    lastMessage: "Thank you for your interest. I'd like to learn more about your family values."
  },
  {
    id: 2,
    name: "Amina Yusuf",
    age: 27,
    compatibility: 89,
    mutualInterests: 4,
    status: "matched",
    lastMessage: "Looking forward to our family meeting this weekend."
  }
]

const upcomingMeetings = [
  {
    id: 1,
    name: "Sarah Ahmad",
    type: "Family Introduction",
    date: "This Saturday",
    time: "3:00 PM",
    location: "Al-Noor Community Hall",
    chaperone: "Imam Ahmad Rahman"
  },
  {
    id: 2,
    name: "Amina Yusuf",
    type: "Second Meeting",
    date: "Next Sunday",
    time: "2:00 PM",
    location: "Islamic Center Conference Room",
    chaperone: "Sister Khadijah"
  }
]

const safetyTips = [
  "Always meet in public places within mosque premises",
  "Bring a mahram or chaperone to all meetings",
  "Verify profiles through mosque leadership",
  "Report any inappropriate behavior immediately",
  "Keep family informed about all interactions"
]

export function MarriagePortalSection() {
  const [activeTab, setActiveTab] = useState("browse")
  const [searchAge, setSearchAge] = useState("")
  const [searchLocation, setSearchLocation] = useState("")
  const [searchEducation, setSearchEducation] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1644931212345-97274479bcdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjB3ZWRkaW5nJTIwbWFycmlhZ2V8ZW58MXx8fHwxNzU4MTI1NDMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Islamic marriage"
            className="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-4 md:mb-6 object-cover border-4 border-rose-300"
          />
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4 text-rose-900 font-bold">Halal Marriage Portal</h1>
          <p className="text-rose-800 max-w-2xl mx-auto text-sm md:text-base px-4">
            Find your life partner through our Islamic matrimonial service with mosque verification and family involvement
          </p>
        </div>

        {/* Safety Notice */}
        <Card className="mb-8 border-rose-200 bg-rose-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-rose-600" />
              <h3 className="font-medium text-rose-900">Safe & Halal Matrimony</h3>
            </div>
            <p className="text-sm text-rose-800 mb-2">
              All profiles are verified by local mosque leadership. Family involvement and proper Islamic procedures are encouraged.
            </p>
            <div className="text-xs text-rose-700">
              ✓ Mosque Verified • ✓ Family Supervised • ✓ Halal Process
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="browse" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Search className="w-4 h-4 md:w-4 md:h-4 text-rose-600 flex-shrink-0" />
              <span className="leading-tight text-center">Browse</span>
            </TabsTrigger>
            <TabsTrigger value="matches" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Heart className="w-4 h-4 md:w-4 md:h-4 text-pink-600 flex-shrink-0" />
              <span className="leading-tight text-center">My Matches</span>
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Calendar className="w-4 h-4 md:w-4 md:h-4 text-purple-600 flex-shrink-0" />
              <span className="leading-tight text-center">Meetings</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <User className="w-4 h-4 md:w-4 md:h-4 text-blue-600 flex-shrink-0" />
              <span className="leading-tight text-center">My Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Browse Tab */}
          <TabsContent value="browse">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Search Filters */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-rose-900 text-base">Search Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-rose-700 mb-2 block">Age Range</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20-25">20-25 years</SelectItem>
                          <SelectItem value="26-30">26-30 years</SelectItem>
                          <SelectItem value="31-35">31-35 years</SelectItem>
                          <SelectItem value="36-40">36-40 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-rose-700 mb-2 block">Location</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="il">Illinois</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-rose-700 mb-2 block">Education</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select education" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                          <SelectItem value="masters">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-rose-700 mb-2 block">Profession</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select profession" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                      Apply Filters
                    </Button>
                  </CardContent>
                </Card>

                {/* Safety Tips */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-rose-900 text-base flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Safety Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {safetyTips.map((tip, index) => (
                        <div key={index} className="text-xs text-rose-700 flex items-start gap-2">
                          <div className="w-1 h-1 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profiles Grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profiles.map((profile) => (
                    <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="w-16 h-16">
                            <AvatarFallback className="bg-rose-200 text-rose-800 text-lg">
                              {profile.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-rose-900">{profile.name}</h3>
                              {profile.verified && (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-rose-700">{profile.age} years • {profile.profession}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-600">{profile.location}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="w-4 h-4 text-amber-500 fill-current" />
                              <span className="text-sm font-medium text-rose-900">{profile.compatibility}%</span>
                            </div>
                            <span className="text-xs text-gray-500">Match</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="text-sm">
                            <span className="text-rose-700">Education: </span>
                            <span className="text-gray-800">{profile.education}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-rose-700">Mosque: </span>
                            <span className="text-gray-800">{profile.mosqueAffiliation}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-700">{profile.about}</p>
                        </div>

                        <div className="mb-4">
                          <div className="text-xs text-rose-700 mb-2">Interests:</div>
                          <div className="flex flex-wrap gap-1">
                            {profile.interests.slice(0, 3).map((interest, index) => (
                              <Badge key={index} className="bg-rose-100 text-rose-800 text-xs">
                                {interest}
                              </Badge>
                            ))}
                            {profile.interests.length > 3 && (
                              <Badge className="bg-gray-100 text-gray-600 text-xs">
                                +{profile.interests.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 bg-rose-600 hover:bg-rose-700 text-white">
                            <Heart className="w-3 h-3 mr-1" />
                            Express Interest
                          </Button>
                          <Button size="sm" variant="outline" className="border-rose-300 text-rose-700 hover:bg-rose-100">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="mt-2 text-xs text-gray-500">
                          Last active: {profile.lastActive}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches">
            <div className="space-y-6">
              {myMatches.map((match) => (
                <Card key={match.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-pink-200 text-pink-800">
                          {match.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-rose-900">{match.name}</h3>
                          <Badge className={`text-xs ${
                            match.status === 'matched' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {match.status === 'matched' ? 'Matched' : 'Pending'}
                          </Badge>
                        </div>
                        <p className="text-sm text-rose-700">{match.age} years</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>{match.compatibility}% compatible</span>
                          <span>{match.mutualInterests} mutual interests</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline" className="border-rose-300 text-rose-700">
                          <Calendar className="w-3 h-3 mr-1" />
                          Meet
                        </Button>
                      </div>
                    </div>
                    
                    {match.lastMessage && (
                      <div className="mt-4 p-3 bg-rose-50 rounded-lg">
                        <p className="text-sm text-rose-800">"{match.lastMessage}"</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Meetings Tab */}
          <TabsContent value="meetings">
            <div className="space-y-6">
              {upcomingMeetings.map((meeting) => (
                <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-rose-900 mb-1">{meeting.type}</h3>
                        <p className="text-rose-700">with {meeting.name}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{meeting.date} at {meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{meeting.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">Chaperone: {meeting.chaperone}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-rose-300 text-rose-700">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="text-rose-900">My Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="bg-rose-200 text-rose-800 text-2xl">
                      AH
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="border-rose-300 text-rose-700">
                    Update Photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-rose-700 mb-2 block">Full Name</label>
                      <Input defaultValue="Ahmed Hassan" className="border-rose-300" />
                    </div>
                    <div>
                      <label className="text-sm text-rose-700 mb-2 block">Age</label>
                      <Input defaultValue="29" className="border-rose-300" />
                    </div>
                    <div>
                      <label className="text-sm text-rose-700 mb-2 block">Profession</label>
                      <Input defaultValue="Software Engineer" className="border-rose-300" />
                    </div>
                    <div>
                      <label className="text-sm text-rose-700 mb-2 block">Education</label>
                      <Input defaultValue="Master's in Computer Science" className="border-rose-300" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-rose-700 mb-2 block">Location</label>
                      <Input defaultValue="New York, NY" className="border-rose-300" />
                    </div>
                    <div>
                      <label className="text-sm text-rose-700 mb-2 block">Mosque Affiliation</label>
                      <Input defaultValue="Al-Noor Islamic Center" className="border-rose-300" />
                    </div>
                    <div>
                      <label className="text-sm text-rose-700 mb-2 block">Marital Status</label>
                      <Select>
                        <SelectTrigger className="border-rose-300">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="divorced">Divorced</SelectItem>
                          <SelectItem value="widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-rose-700 mb-2 block">About Yourself</label>
                  <textarea 
                    className="w-full p-3 border border-rose-300 rounded-md text-sm min-h-24"
                    placeholder="Tell potential matches about yourself, your values, and what you're looking for in a spouse..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                    Save Changes
                  </Button>
                  <Button variant="outline" className="border-rose-300 text-rose-700">
                    Preview Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}