import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { ScrollArea } from './ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Send, MessageCircle, Clock, User, Phone, Calendar, BookOpen, Heart, Star, MapPin } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface Message {
  id: number
  sender: 'user' | 'imam'
  content: string
  timestamp: string
  type: 'text' | 'appointment' | 'resource'
}

const imams = [
  {
    id: 1,
    name: "Imam Ahmad Rahman",
    mosque: "Al-Noor Islamic Center",
    specialization: "Quran Interpretation & Family Counseling",
    availability: "Available",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1756412066387-2b518da6a7d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbWFtJTIwc2Nob2xhciUyMGlzbGFtaWN8ZW58MXx8fHwxNzU4MTI1MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    responseTime: "Usually responds within 1 hour"
  },
  {
    id: 2,
    name: "Imam Omar Hassan",
    mosque: "Masjid As-Salam",
    specialization: "Islamic Law & Youth Guidance",
    availability: "Busy",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1756412066387-2b518da6a7d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbWFtJTIwc2Nob2xhciUyMGlzbGFtaWN8ZW58MXx8fHwxNzU4MTI1MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    responseTime: "Usually responds within 3 hours"
  },
  {
    id: 3,
    name: "Imam Abdullah Al-Faisal",
    mosque: "Islamic Society Center",
    specialization: "Spirituality & Marriage Counseling",
    availability: "Available",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1756412066387-2b518da6a7d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbWFtJTIwc2Nob2xhciUyMGlzbGFtaWN8ZW58MXx8fHwxNzU4MTI1MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    responseTime: "Usually responds within 30 minutes"
  }
]

const chatHistory: Message[] = [
  {
    id: 1,
    sender: 'imam',
    content: 'Assalamu Alaikum! I am here to help you with any Islamic questions or guidance you may need. How can I assist you today?',
    timestamp: '10:30 AM',
    type: 'text'
  },
  {
    id: 2,
    sender: 'user',
    content: 'Wa alaikum assalam. I have a question about making up missed prayers from when I was traveling.',
    timestamp: '10:35 AM',
    type: 'text'
  },
  {
    id: 3,
    sender: 'imam',
    content: 'Excellent question! When traveling, if you shortened your prayers (Qasr), you do not need to make them up later. However, if you missed prayers entirely due to circumstances, you should make them up as soon as possible. Would you like me to explain the specific rulings for your situation?',
    timestamp: '10:38 AM',
    type: 'text'
  }
]

const quickQuestions = [
  "How do I perform Wudu correctly?",
  "What are the times for today's prayers?",
  "Can you help me understand a Quran verse?",
  "I need advice about family matters",
  "How do I calculate Zakat?",
  "What should I do if I miss a prayer?"
]

const upcomingAppointments = [
  {
    id: 1,
    imamName: "Imam Ahmad Rahman",
    date: "Tomorrow",
    time: "2:00 PM",
    topic: "Marriage Counseling Session",
    location: "Al-Noor Islamic Center"
  },
  {
    id: 2,
    imamName: "Imam Abdullah Al-Faisal",
    date: "Friday",
    time: "4:30 PM",
    topic: "Quran Study Session",
    location: "Islamic Society Center"
  }
]

export function ImamChatSection() {
  const [selectedImam, setSelectedImam] = useState(imams[0])
  const [messages, setMessages] = useState<Message[]>(chatHistory)
  const [newMessage, setNewMessage] = useState("")
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate imam response
    setTimeout(() => {
      const imamResponse: Message = {
        id: messages.length + 2,
        sender: 'imam',
        content: "Thank you for your question. I understand your concern and will provide you with guidance based on Islamic teachings. Let me think about this carefully...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      }
      setMessages(prev => [...prev, imamResponse])
    }, 2000)
  }

  const sendQuickQuestion = (question: string) => {
    setNewMessage(question)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1756412066387-2b518da6a7d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbWFtJTIwc2Nob2xhciUyMGlzbGFtaWN8ZW58MXx8fHwxNzU4MTI1MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Imam guidance"
            className="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-4 md:mb-6 object-cover border-4 border-emerald-300"
          />
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4 text-emerald-900 font-bold">Ask Your Imam</h1>
          <p className="text-emerald-800 max-w-2xl mx-auto text-sm md:text-base px-4">
            Get Islamic guidance and answers to your questions from qualified local imams
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="chat" className="flex flex-col sm:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <MessageCircle className="w-4 h-4 md:w-4 md:h-4 text-emerald-600 flex-shrink-0" />
              <span className="leading-tight text-center">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="imams" className="flex flex-col sm:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <User className="w-4 h-4 md:w-4 md:h-4 text-blue-600 flex-shrink-0" />
              <span className="leading-tight text-center hidden sm:inline">Choose Imam</span>
              <span className="leading-tight text-center sm:hidden">Imams</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex flex-col sm:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Calendar className="w-4 h-4 md:w-4 md:h-4 text-purple-600 flex-shrink-0" />
              <span className="leading-tight text-center hidden sm:inline">Appointments</span>
              <span className="leading-tight text-center sm:hidden">Schedule</span>
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Chat Area */}
              <div className="lg:col-span-3">
                <Card className="h-[600px] flex flex-col overflow-hidden">
                  <CardHeader className="p-4 border-b flex-shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarImage src={selectedImam.image} alt={selectedImam.name} />
                        <AvatarFallback>{selectedImam.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-emerald-900 truncate">{selectedImam.name}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={`text-xs flex-shrink-0 ${
                            selectedImam.availability === 'Available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {selectedImam.availability}
                          </Badge>
                          <span className="text-xs text-gray-500 truncate">{selectedImam.responseTime}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700">
                          <Phone className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700">
                          <Calendar className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 p-0 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="p-4 space-y-4 min-w-0">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} min-w-0`}
                          >
                            <div
                              className={`max-w-[70%] min-w-0 p-3 rounded-lg word-wrap ${
                                message.sender === 'user'
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                              style={{ 
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word'
                              }}
                            >
                              <p className="text-sm whitespace-pre-wrap" style={{ 
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word'
                              }}>
                                {message.content}
                              </p>
                              <p className={`text-xs mt-1 ${
                                message.sender === 'user' ? 'text-emerald-100' : 'text-gray-500'
                              }`}>
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </CardContent>

                  <div className="p-4 border-t flex-shrink-0">
                    <div className="flex gap-2 min-w-0">
                      <Input
                        placeholder="Type your question..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1 min-w-0"
                      />
                      <Button onClick={sendMessage} className="bg-emerald-600 hover:bg-emerald-700 text-white flex-shrink-0">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Questions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-emerald-900 text-base">Quick Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                        onClick={() => sendQuickQuestion(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* Islamic Resources */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-emerald-900 text-base flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" size="sm" className="w-full justify-start border-emerald-300 text-emerald-700">
                      Prayer Times & Qibla
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start border-emerald-300 text-emerald-700">
                      Quran with Translation
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start border-emerald-300 text-emerald-700">
                      Hadith Collection
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start border-emerald-300 text-emerald-700">
                      Islamic Calendar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Imams Tab */}
          <TabsContent value="imams">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {imams.map((imam) => (
                <Card 
                  key={imam.id} 
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${
                    selectedImam.id === imam.id ? 'ring-2 ring-emerald-500' : ''
                  }`}
                  onClick={() => setSelectedImam(imam)}
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <Avatar className="w-16 h-16 mx-auto mb-3">
                        <AvatarImage src={imam.image} alt={imam.name} />
                        <AvatarFallback>{imam.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-medium text-emerald-900 mb-1">{imam.name}</h3>
                      <p className="text-sm text-emerald-700">{imam.mosque}</p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Specialization:</span>
                      </div>
                      <p className="text-sm text-emerald-800">{imam.specialization}</p>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs ${
                          imam.availability === 'Available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {imam.availability}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500 fill-current" />
                          <span className="text-sm text-gray-700">{imam.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mb-4">{imam.responseTime}</div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Chat
                      </Button>
                      <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700">
                        <Calendar className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg md:text-xl text-emerald-900 mb-6">Upcoming Appointments</h2>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium text-emerald-900 mb-1">{appointment.topic}</h3>
                            <p className="text-sm text-emerald-700">with {appointment.imamName}</p>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-800">Confirmed</Badge>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{appointment.date} at {appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700">
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
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-emerald-900">Schedule New Appointment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-emerald-700 mb-2 block">Select Imam</label>
                      <select className="w-full p-2 border border-emerald-300 rounded-md text-sm">
                        {imams.map((imam) => (
                          <option key={imam.id} value={imam.id}>
                            {imam.name} - {imam.mosque}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-emerald-700 mb-2 block">Purpose</label>
                      <select className="w-full p-2 border border-emerald-300 rounded-md text-sm">
                        <option>Islamic Guidance</option>
                        <option>Marriage Counseling</option>
                        <option>Family Issues</option>
                        <option>Quran Study</option>
                        <option>Convert Support</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-emerald-700 mb-2 block">Preferred Date</label>
                      <Input type="date" className="border-emerald-300" />
                    </div>

                    <div>
                      <label className="text-sm text-emerald-700 mb-2 block">Preferred Time</label>
                      <Input type="time" className="border-emerald-300" />
                    </div>

                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                      Request Appointment
                    </Button>
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