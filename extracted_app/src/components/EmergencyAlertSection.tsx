import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { AlertTriangle, MapPin, Clock, Users, Phone, Send, Shield, Info, Zap, Bell, CheckCircle } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const activeAlerts = [
  {
    id: 1,
    type: "weather",
    severity: "high",
    title: "Severe Weather Alert",
    description: "Heavy snow expected tonight. Maghrib and Isha prayers may be delayed at Al-Noor Mosque.",
    location: "Downtown Area",
    time: "2 hours ago",
    affectedMosques: ["Al-Noor Islamic Center", "Masjid As-Salam"],
    responses: 45
  },
  {
    id: 2,
    type: "community",
    severity: "medium",
    title: "Community Member Needs Help",
    description: "Sister Fatima needs assistance with transportation for medical appointment.",
    location: "Midtown Area",
    time: "4 hours ago",
    affectedMosques: ["Islamic Society Center"],
    responses: 12
  },
  {
    id: 3,
    type: "emergency",
    severity: "low",
    title: "Volunteer Request",
    description: "Extra volunteers needed for community kitchen this weekend.",
    location: "All Areas",
    time: "6 hours ago",
    affectedMosques: ["All Mosques"],
    responses: 28
  }
]

const myAlerts = [
  {
    id: 1,
    title: "Prayer Schedule Change",
    description: "Due to construction, Friday prayer moved to community hall",
    status: "acknowledged",
    time: "Yesterday"
  },
  {
    id: 2,
    title: "Emergency Contact Updated",
    description: "Your emergency contact information has been updated",
    status: "read",
    time: "2 days ago"
  }
]

export function EmergencyAlertSection() {
  const [alertType, setAlertType] = useState("emergency")
  const [alertTitle, setAlertTitle] = useState("")
  const [alertDescription, setAlertDescription] = useState("")
  const [alertLocation, setAlertLocation] = useState("")
  const [activeTab, setActiveTab] = useState("alerts")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500 text-white'
      case 'medium': return 'bg-amber-500 text-white'
      case 'low': return 'bg-blue-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weather': return <Zap className="w-4 h-4" />
      case 'emergency': return <AlertTriangle className="w-4 h-4" />
      case 'community': return <Users className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1531132089310-f0e1e64bf85d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjBhbGVydCUyMHN5c3RlbXxlbnwxfHx8fDE3NTgxMjUxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Emergency alert system"
            className="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-4 md:mb-6 object-cover border-4 border-red-300"
          />
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4 text-red-900 font-bold">Community Alert System</h1>
          <p className="text-red-800 max-w-2xl mx-auto text-sm md:text-base px-4">
            Stay informed about community emergencies, weather alerts, and help requests in your area
          </p>
        </div>

        {/* Emergency Banner */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Emergency Contacts:</strong> For immediate emergencies, call 911. For mosque emergencies, contact: (555) MOSQUE-1
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="alerts" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Bell className="w-4 h-4 md:w-4 md:h-4 text-red-600 flex-shrink-0" />
              <span className="leading-tight text-center">Active Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Send className="w-4 h-4 md:w-4 md:h-4 text-orange-600 flex-shrink-0" />
              <span className="leading-tight text-center">Create Alert</span>
            </TabsTrigger>
            <TabsTrigger value="my-alerts" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Shield className="w-4 h-4 md:w-4 md:h-4 text-blue-600 flex-shrink-0" />
              <span className="leading-tight text-center">My Alerts</span>
            </TabsTrigger>
          </TabsList>

          {/* Active Alerts Tab */}
          <TabsContent value="alerts">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4 md:space-y-6">
                  {activeAlerts.map((alert) => (
                    <Card key={alert.id} className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                              {getTypeIcon(alert.type)}
                            </div>
                            <div>
                              <CardTitle className="text-base md:text-lg text-red-900">{alert.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                                  {alert.severity.toUpperCase()}
                                </Badge>
                                <Badge variant="outline" className="text-xs border-red-300 text-red-700">
                                  {alert.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">{alert.time}</div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-red-800 mb-3 md:mb-4">{alert.description}</p>
                        
                        <div className="space-y-2 mb-3 md:mb-4">
                          <div className="flex items-center gap-2 text-sm text-red-700">
                            <MapPin className="w-4 h-4" />
                            <span>{alert.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-red-700">
                            <Users className="w-4 h-4" />
                            <span>Affected: {alert.affectedMosques.join(", ")}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                              Acknowledge
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                              Share
                            </Button>
                          </div>
                          <div className="text-sm text-gray-600">
                            {alert.responses} responses
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-900 text-base md:text-lg">Alert Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-800">3</div>
                      <div className="text-sm text-red-600">Active Alerts</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-800">85</div>
                      <div className="text-sm text-orange-600">Total Responses</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-800">15</div>
                      <div className="text-sm text-green-600">Resolved Today</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-red-900 text-base md:text-lg">Emergency Contacts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm text-red-800">Emergency Services</span>
                      <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                        <Phone className="w-3 h-3 mr-1" />
                        911
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm text-red-800">Mosque Emergency</span>
                      <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                        <Phone className="w-3 h-3 mr-1" />
                        (555) 123-4567
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm text-red-800">Community Support</span>
                      <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                        <Phone className="w-3 h-3 mr-1" />
                        (555) 987-6543
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Create Alert Tab */}
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-900 text-base md:text-lg">Create New Alert</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                <div>
                  <label className="text-sm text-red-700 mb-2 block">Alert Type</label>
                  <select 
                    value={alertType}
                    onChange={(e) => setAlertType(e.target.value)}
                    className="w-full p-2 border border-red-300 rounded-md text-sm"
                  >
                    <option value="emergency">Emergency</option>
                    <option value="weather">Weather Alert</option>
                    <option value="community">Community Request</option>
                    <option value="volunteer">Volunteer Needed</option>
                    <option value="event">Event Update</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-red-700 mb-2 block">Alert Title</label>
                  <Input
                    placeholder="Brief description of the alert"
                    value={alertTitle}
                    onChange={(e) => setAlertTitle(e.target.value)}
                    className="border-red-300"
                  />
                </div>

                <div>
                  <label className="text-sm text-red-700 mb-2 block">Location</label>
                  <Input
                    placeholder="Specific location or area"
                    value={alertLocation}
                    onChange={(e) => setAlertLocation(e.target.value)}
                    className="border-red-300"
                  />
                </div>

                <div>
                  <label className="text-sm text-red-700 mb-2 block">Detailed Description</label>
                  <Textarea
                    placeholder="Provide detailed information about the alert..."
                    value={alertDescription}
                    onChange={(e) => setAlertDescription(e.target.value)}
                    className="min-h-24 border-red-300"
                  />
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <strong>Important:</strong> All alerts are reviewed by mosque leadership before being sent to the community. 
                      Use this system responsibly and only for legitimate community needs.
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Alert
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Alerts Tab */}
          <TabsContent value="my-alerts">
            <div className="space-y-4">
              {myAlerts.map((alert) => (
                <Card key={alert.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-red-900">{alert.title}</h3>
                          {alert.status === 'acknowledged' && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-red-700 mb-2">{alert.description}</p>
                        <div className="text-xs text-gray-500">{alert.time}</div>
                      </div>
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