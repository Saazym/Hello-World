import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Users, Calendar, MessageSquare, HandHeart, Shield, HelpCircle, Plus, Search, Heart, MessageCircle, FileText, CheckCircle, Clock, AlertCircle, Upload, Send, Lock, Camera, Star, ThumbsUp, Eye } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const upcomingEvents = [
  {
    title: "Community Iftar Dinner",
    date: "Jan 18, 2025",
    time: "6:30 PM",
    location: "Al-Noor Islamic Center",
    attendees: 120,
    description: "Join us for a community iftar dinner with special guest speaker",
    category: "Social",
    volunteersNeeded: 15
  },
  {
    title: "Youth Quran Competition",
    date: "Jan 22, 2025", 
    time: "10:00 AM",
    location: "Masjid As-Salam",
    attendees: 45,
    description: "Annual youth Quran recitation and memorization competition",
    category: "Education",
    volunteersNeeded: 8
  },
  {
    title: "Food Drive for Homeless",
    date: "Jan 25, 2025",
    time: "9:00 AM",
    location: "Islamic Society Center", 
    attendees: 80,
    description: "Collecting and distributing food to local homeless shelters",
    category: "Charity",
    volunteersNeeded: 20
  }
]

const discussionTopics = [
  {
    category: "Ask Your Imam",
    title: "Questions about Ramadan preparation",
    author: "Fatima S.",
    replies: 12,
    lastActive: "2 hours ago",
    questionsToday: 3,
    dailyLimit: 5
  },
  {
    category: "Fact Check", 
    title: "Clarification on hadith authenticity",
    author: "Omar K.",
    replies: 8,
    lastActive: "5 hours ago",
    questionsToday: 2,
    dailyLimit: 3
  },
  {
    category: "Community Q&A",
    title: "Best practices for teaching children prayers",
    author: "Aisha M.", 
    replies: 15,
    lastActive: "1 hour ago",
    questionsToday: 1,
    dailyLimit: 10
  }
]

const volunteerOpportunities = [
  {
    title: "Soup Kitchen Volunteer",
    organization: "Downtown Islamic Center",
    timeCommitment: "4 hours/week",
    skills: ["Cooking", "Serving", "Cleaning"],
    urgency: "High"
  },
  {
    title: "Youth Mentor",
    organization: "Muslim Youth Alliance", 
    timeCommitment: "2 hours/week",
    skills: ["Teaching", "Communication", "Patience"],
    urgency: "Medium"
  },
  {
    title: "Translation Assistant",
    organization: "Al-Noor Community",
    timeCommitment: "3 hours/week", 
    skills: ["Arabic", "English", "Writing"],
    urgency: "Low"
  }
]

const announcements = [
  {
    title: "New Prayer Times for February",
    content: "Due to daylight changes, prayer times will be adjusted starting February 1st.",
    date: "Jan 12, 2025",
    author: "Mosque Administration",
    priority: "High",
    category: "Prayer Times"
  },
  {
    title: "Community Iftar Registration Open",
    content: "Register your family for the community iftar dinner. Limited spots available.",
    date: "Jan 10, 2025",
    author: "Event Committee",
    priority: "Medium",
    category: "Events"
  },
  {
    title: "Islamic School Enrollment",
    content: "Enrollment for the spring semester is now open. Early bird discounts available.",
    date: "Jan 8, 2025",
    author: "Education Board",
    priority: "Low",
    category: "Education"
  }
]

const communityDirectory = [
  { name: "Dr. Ahmad Hassan", role: "Imam", mosque: "Al-Noor Center", expertise: ["Jurisprudence", "Counseling"] },
  { name: "Sister Fatima Al-Zahra", role: "Youth Coordinator", mosque: "Masjid As-Salam", expertise: ["Youth Programs", "Education"] },
  { name: "Brother Omar Abdullah", role: "Community Outreach", mosque: "Islamic Society", expertise: ["Social Work", "Interfaith"] },
  { name: "Dr. Aisha Rahman", role: "Islamic Studies Teacher", mosque: "Baitul Rahman", expertise: ["Quran", "Arabic"] }
]

const communityPosts = [
  {
    id: 1,
    title: "New Halal Restaurant Opening - Barakah Eats",
    category: "Business Launch",
    author: "Mohammed Al-Rashid",
    mosque: "Al-Noor Center",
    date: "Jan 15, 2025",
    description: "We're excited to announce the opening of Barakah Eats, serving authentic Middle Eastern cuisine. Grand opening special: 20% off for community members!",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGFyYWJpYyUyMGhhbGFsfGVufDF8fHx8MTc1Nzc1Njc5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    status: "approved",
    likes: 24,
    comments: 8,
    views: 156,
    priority: "medium",
    approvedBy: "Dr. Ahmad Hassan"
  },
  {
    id: 2,
    title: "Software Engineer Position Available",
    category: "Job Opening",
    author: "Tech Solutions Inc",
    mosque: "Islamic Society Center",
    date: "Jan 14, 2025",
    description: "Growing tech company seeking Muslim software engineer. Remote work available, prayer-friendly environment. Competitive salary + benefits.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHNlYXJjaHwxfHx0ZWNoJTIwb2ZmaWNlJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzU3NzU2Nzk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "approved",
    likes: 16,
    comments: 12,
    views: 89,
    priority: "high",
    approvedBy: "Brother Omar Abdullah"
  },
  {
    id: 3,
    title: "Community Garden Project Launch",
    category: "Community Event",
    author: "Green Ummah Initiative",
    mosque: "Masjid As-Salam",
    date: "Jan 13, 2025",
    description: "Join us in creating a beautiful community garden! Volunteers needed for planting, maintenance, and harvest distribution to families in need.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBjb21tdW5pdHklMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1Nzc1Njc5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    status: "approved",
    likes: 31,
    comments: 5,
    views: 203,
    priority: "medium",
    approvedBy: "Sister Fatima Al-Zahra"
  }
]

const pendingPosts = [
  {
    id: 4,
    title: "Islamic Bookstore Sale Event",
    category: "Store Launch",
    author: "Noor Books & More",
    mosque: "Al-Noor Center",
    date: "Pending approval",
    description: "50% off all Islamic books and children's materials. Special collection of Quran translations and Islamic history books.",
    status: "pending",
    otpRequired: true,
    submittedAt: "2 hours ago",
    requestedImam: "Dr. Ahmad Hassan"
  }
]

export function CommunitySection() {
  const [activeTab, setActiveTab] = useState("events")
  const [newQuestion, setNewQuestion] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("community")
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false)
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false)
  const [postForm, setPostForm] = useState({
    title: '',
    category: '',
    description: '',
    image: null as File | null
  })
  const [otpCode, setOtpCode] = useState('')
  const [selectedImam, setSelectedImam] = useState('')

  const handleSubmitPost = () => {
    setIsPostDialogOpen(false)
    setIsOtpDialogOpen(true)
    // In real app, would send OTP to selected imam
  }

  const handleOtpSubmit = () => {
    // In real app, would verify OTP and approve post
    setIsOtpDialogOpen(false)
    setOtpCode('')
    setPostForm({ title: '', category: '', description: '', image: null })
    setSelectedImam('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1625148293808-e7def697ebdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwZW9wbGUlMjBoZWxwaW5nJTIwY2hhcml0eSUyMG1vc3F1ZXxlbnwxfHx8fDE3NTc3NTY3OTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Community helping together"
            className="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-4 md:mb-6 object-cover border-4 border-teal-300"
          />
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4 text-teal-900 font-bold">Community Hub & Events</h1>
          <p className="text-teal-800 max-w-2xl mx-auto text-sm md:text-base px-4">
            Connect with your local Muslim community, participate in events, volunteer, and engage in meaningful discussions
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="events" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-emerald-600" />
              <span className="leading-tight">Events</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <FileText className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-blue-600" />
              <span className="leading-tight hidden sm:inline">Community</span>
              <span className="leading-tight sm:hidden">Posts</span>
            </TabsTrigger>
            <TabsTrigger value="volunteer" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <HandHeart className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-rose-600" />
              <span className="leading-tight hidden sm:inline">Volunteer</span>
              <span className="leading-tight sm:hidden">Help</span>
            </TabsTrigger>
            <TabsTrigger value="discussions" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <MessageSquare className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-purple-600" />
              <span className="leading-tight hidden sm:inline">Discussions</span>
              <span className="leading-tight sm:hidden">Q&A</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <MessageCircle className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-amber-600" />
              <span className="leading-tight">News</span>
            </TabsTrigger>
            <TabsTrigger value="directory" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <Users className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-teal-600" />
              <span className="leading-tight hidden sm:inline">Directory</span>
              <span className="leading-tight sm:hidden">Dir</span>
            </TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={`text-xs ${
                        event.category === 'Social' ? 'bg-blue-100 text-blue-700' :
                        event.category === 'Education' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {event.category}
                      </Badge>
                      <div className="text-right text-xs text-teal-600">
                        <div>{event.date}</div>
                        <div>{event.time}</div>
                      </div>
                    </div>
                    <CardTitle className="text-teal-900 text-base md:text-lg leading-tight">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-teal-700 text-sm mb-4">{event.description}</p>
                    
                    <div className="space-y-2 mb-4 text-xs md:text-sm">
                      <div className="flex justify-between">
                        <span className="text-teal-600">Location:</span>
                        <span className="text-teal-900 text-right">{event.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-teal-600">Attendees:</span>
                        <span className="text-teal-900">{event.attendees} registered</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-teal-600">Volunteers Needed:</span>
                        <span className="text-orange-600">{event.volunteersNeeded} more</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs md:text-sm">
                        Register
                      </Button>
                      <Button variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50 text-xs md:text-sm">
                        Volunteer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 md:mt-8">
              <CardHeader>
                <CardTitle className="text-teal-900 flex items-center text-base md:text-lg">
                  <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Create New Event
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Submit Event Proposal
                </Button>
                <p className="text-sm text-teal-600 mt-2">
                  Have an idea for a community event? Submit your proposal for review by the community leadership.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Posts Tab */}
          <TabsContent value="community">
            <div className="space-y-4 md:space-y-6">
              {/* Post Submission Banner */}
              <Card className="border-dashed border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-medium text-blue-900 mb-2">Share with Your Community</h3>
                      <p className="text-blue-700 text-sm">
                        Post business openings, job opportunities, events, or community announcements.
                        All posts require imam approval before publishing.
                      </p>
                    </div>
                    <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Create Post
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            Submit Community Post
                          </DialogTitle>
                          <DialogDescription>
                            Create a new post to share with your community. All posts are reviewed by imam before being published.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="title">Post Title</Label>
                            <Input
                              id="title"
                              placeholder="e.g., New Halal Restaurant Opening"
                              value={postForm.title}
                              onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Select value={postForm.category} onValueChange={(value) => setPostForm({...postForm, category: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="business">Business Launch</SelectItem>
                                <SelectItem value="job">Job Opening</SelectItem>
                                <SelectItem value="event">Community Event</SelectItem>
                                <SelectItem value="store">Store Launch</SelectItem>
                                <SelectItem value="service">Service Announcement</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="imam">Select Approving Imam</Label>
                            <Select value={selectedImam} onValueChange={setSelectedImam}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose imam for approval" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ahmad">Dr. Ahmad Hassan - Al-Noor Center</SelectItem>
                                <SelectItem value="fatima">Sister Fatima Al-Zahra - Masjid As-Salam</SelectItem>
                                <SelectItem value="omar">Brother Omar Abdullah - Islamic Society</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Provide details about your announcement..."
                              value={postForm.description}
                              onChange={(e) => setPostForm({...postForm, description: e.target.value})}
                              rows={3}
                            />
                          </div>

                          <div>
                            <Label htmlFor="image">Upload Image (Optional)</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                            </div>
                          </div>

                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <Lock className="w-4 h-4 text-amber-600 mt-0.5" />
                              <div className="text-sm">
                                <p className="text-amber-800 font-medium">Approval Required</p>
                                <p className="text-amber-700">Your post will be sent to the selected imam for review and OTP confirmation before publishing.</p>
                              </div>
                            </div>
                          </div>

                          <Button 
                            onClick={handleSubmitPost} 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={!postForm.title || !postForm.category || !selectedImam}
                          >
                            Submit for Approval
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Posts */}
              {pendingPosts.length > 0 && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-amber-800 flex items-center text-lg">
                      <Clock className="w-5 h-5 mr-2" />
                      Your Pending Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {pendingPosts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200">
                        <div>
                          <h4 className="font-medium text-gray-900">{post.title}</h4>
                          <p className="text-sm text-gray-600">Submitted {post.submittedAt} • Awaiting {post.requestedImam}</p>
                        </div>
                        <Badge variant="outline" className="border-amber-300 text-amber-700">
                          Pending OTP
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Approved Community Posts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {communityPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-40 md:h-48 object-cover"
                      />
                      <Badge className={`absolute top-3 left-3 text-xs ${
                        post.priority === 'high' ? 'bg-red-500 text-white' :
                        post.priority === 'medium' ? 'bg-amber-500 text-white' :
                        'bg-green-500 text-white'
                      }`}>
                        {post.category}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2 leading-tight">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {post.comments}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          <p>By {post.author}</p>
                          <p>{post.mosque} • {post.date}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          <span>Verified</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <Button variant="outline" size="sm" className="flex-1 mr-2 text-xs">
                            Learn More
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            Like
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* OTP Verification Dialog */}
            <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Imam Verification Required
                  </DialogTitle>
                  <DialogDescription>
                    Enter the verification code sent to the imam to confirm your post submission.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-gray-700 mb-2">
                      OTP sent to <strong>{selectedImam === 'ahmad' ? 'Dr. Ahmad Hassan' : selectedImam === 'fatima' ? 'Sister Fatima Al-Zahra' : 'Brother Omar Abdullah'}</strong>
                    </p>
                    <p className="text-sm text-gray-500">
                      The imam will review your post and provide an OTP for verification.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="otp">Enter OTP from Imam</Label>
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit code"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      maxLength={6}
                      className="text-center text-lg tracking-wider"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Demo OTP:</strong> 123456 (In real app, this would be sent securely to the imam)
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsOtpDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleOtpSubmit}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      disabled={otpCode !== '123456'}
                    >
                      Verify & Publish
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Volunteer Tab */}
          <TabsContent value="volunteer">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {volunteerOpportunities.map((opportunity, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge className={`text-xs ${
                        opportunity.urgency === 'High' ? 'bg-red-100 text-red-700' :
                        opportunity.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {opportunity.urgency} Priority
                      </Badge>
                    </div>
                    <CardTitle className="text-teal-900 text-base md:text-lg">{opportunity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div>
                        <span className="text-teal-600 text-sm">Organization:</span>
                        <div className="text-teal-900 text-sm">{opportunity.organization}</div>
                      </div>
                      <div>
                        <span className="text-teal-600 text-sm">Time Commitment:</span>
                        <div className="text-teal-900 text-sm">{opportunity.timeCommitment}</div>
                      </div>
                      <div>
                        <span className="text-teal-600 text-sm">Skills Needed:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {opportunity.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-teal-300 text-teal-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                      Sign Up to Volunteer
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions">
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                {discussionTopics.map((topic, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex justify-between items-start mb-3">
                        <Badge className={`text-xs ${
                          topic.category === 'Ask Your Imam' ? 'bg-purple-100 text-purple-700' :
                          topic.category === 'Fact Check' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {topic.category === 'Ask Your Imam' && <HelpCircle className="w-3 h-3 mr-1" />}
                          {topic.category === 'Fact Check' && <Shield className="w-3 h-3 mr-1" />}
                          {topic.category === 'Community Q&A' && <MessageSquare className="w-3 h-3 mr-1" />}
                          {topic.category}
                        </Badge>
                        {topic.category !== 'Community Q&A' && (
                          <Badge variant="outline" className="text-xs">
                            {topic.questionsToday}/{topic.dailyLimit} today
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-teal-900 text-base md:text-lg mb-2">{topic.title}</h3>
                      
                      <div className="flex items-center justify-between text-sm text-teal-600">
                        <div className="flex items-center">
                          <Avatar className="w-6 h-6 mr-2 bg-teal-200">
                            <AvatarFallback className="text-xs text-teal-700">
                              {topic.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{topic.author}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {topic.replies}
                          </div>
                          <span>{topic.lastActive}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-teal-900 text-base md:text-lg">Ask a Question</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-teal-700 mb-2 block">Category</label>
                      <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 border border-teal-300 rounded-md text-sm"
                      >
                        <option value="community">Community Q&A</option>
                        <option value="imam">Ask Your Imam</option>
                        <option value="factcheck">Fact Check</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-teal-700 mb-2 block">Your Question</label>
                      <Textarea 
                        placeholder="What would you like to ask?"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="min-h-[100px] border-teal-300"
                      />
                    </div>

                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                      Post Question
                    </Button>

                    <div className="text-xs text-teal-600 p-2 bg-teal-50 rounded-lg">
                      <div>📝 Daily Limits:</div>
                      <div>• Ask Your Imam: 5 questions</div>
                      <div>• Fact Check: 3 questions</div>
                      <div>• Community Q&A: Unlimited</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements">
            <div className="space-y-4 md:space-y-6">
              {announcements.map((announcement, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg md:text-xl text-teal-900 mb-2">{announcement.title}</h3>
                        <p className="text-teal-700 mb-3">{announcement.content}</p>
                      </div>
                      <Badge className={`text-xs ${
                        announcement.priority === 'High' ? 'bg-red-100 text-red-700' :
                        announcement.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {announcement.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-teal-600">
                      <div>By {announcement.author} • {announcement.date}</div>
                      <Badge variant="outline" className="border-teal-300 text-teal-700">
                        {announcement.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community Directory Tab */}
          <TabsContent value="directory">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {communityDirectory.map((person, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-base md:text-lg text-teal-900 mb-1">{person.name}</h3>
                        <p className="text-teal-700 text-sm mb-2">{person.role}</p>
                        <p className="text-teal-600 text-sm">{person.mosque}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm text-teal-800 mb-2">Areas of Expertise:</h4>
                      <div className="flex flex-wrap gap-1">
                        {person.expertise.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-teal-300 text-teal-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 border-teal-300 text-teal-700 hover:bg-teal-50">
                        Contact
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 border-teal-300 text-teal-700 hover:bg-teal-50">
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 md:mt-8">
              <CardHeader>
                <CardTitle className="text-teal-900 flex items-center text-base md:text-lg">
                  <Search className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Find Community Leaders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Input placeholder="Search by name, role, or expertise..." className="flex-1 border-teal-300" />
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    Search
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