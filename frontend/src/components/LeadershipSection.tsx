import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Shield, Users, BarChart3, Calendar, MessageSquare, Settings, AlertTriangle, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const mosqueStats = [
  { mosque: 'Al-Noor Center', members: 456, events: 12, prayers: 2340, growth: '+8%' },
  { mosque: 'Masjid As-Salam', members: 389, events: 8, prayers: 1980, growth: '+5%' },
  { mosque: 'Islamic Society', members: 267, events: 6, prayers: 1456, growth: '+12%' },
  { mosque: 'Baitul Rahman', members: 234, events: 4, prayers: 1234, growth: '+3%' }
]

const attendanceData = [
  { month: 'Sep', fajr: 65, dhuhr: 45, asr: 38, maghrib: 52, isha: 48 },
  { month: 'Oct', fajr: 68, dhuhr: 48, asr: 42, maghrib: 55, isha: 51 },
  { month: 'Nov', fajr: 72, dhuhr: 52, asr: 45, maghrib: 58, isha: 54 },
  { month: 'Dec', fajr: 75, dhuhr: 55, asr: 48, maghrib: 61, isha: 57 },
  { month: 'Jan', fajr: 78, dhuhr: 58, asr: 51, maghrib: 64, isha: 60 }
]

const communityMetrics = [
  { name: 'Prayer Attendance', value: 85, color: '#10b981' },
  { name: 'Event Participation', value: 67, color: '#3b82f6' },
  { name: 'Youth Engagement', value: 72, color: '#f59e0b' },
  { name: 'Community Service', value: 91, color: '#8b5cf6' }
]

const pendingTasks = [
  { task: 'Review community event proposals', priority: 'High', due: 'Today', category: 'Events' },
  { task: 'Approve volunteer coordinator applications', priority: 'Medium', due: 'Tomorrow', category: 'HR' },
  { task: 'Budget review for Q1 2025', priority: 'High', due: 'Jan 18', category: 'Finance' },
  { task: 'Youth program curriculum update', priority: 'Low', due: 'Jan 22', category: 'Education' }
]

const recentActivities = [
  { action: 'New member registration approved', time: '2 hours ago', user: 'Admin Team' },
  { action: 'Community iftar event created', time: '4 hours ago', user: 'Event Committee' },
  { action: 'Prayer time schedule updated', time: '6 hours ago', user: 'Mosque Admin' },
  { action: 'Volunteer training session scheduled', time: '1 day ago', user: 'Youth Coordinator' }
]

const accessLevels = [
  {
    level: 'Imam Dashboard',
    description: 'Full access to community management, spiritual guidance tools',
    features: ['Member counseling', 'Khutbah scheduling', 'Religious guidance', 'Prayer leadership']
  },
  {
    level: 'Local Mosque Admin',
    description: 'Manage individual mosque operations and local community',
    features: ['Event management', 'Member registration', 'Prayer times', 'Local announcements']
  },
  {
    level: 'National Leadership',
    description: 'Oversight of all mosques and community-wide initiatives',
    features: ['Multi-mosque analytics', 'Resource allocation', 'Strategic planning', 'Cross-community coordination']
  }
]

export function LeadershipSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl mb-4 text-slate-900">Central Leadership & Admin Portal</h1>
          <p className="text-slate-700 max-w-2xl mx-auto">
            Comprehensive management tools for imam dashboards, local mosque administration, and national leadership oversight
          </p>
        </div>

        <Tabs defaultValue="imam" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8 h-auto">
            <TabsTrigger value="imam" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 sm:px-4">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Imam Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="local" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 sm:px-4">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Local Admin</span>
            </TabsTrigger>
            <TabsTrigger value="national" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 sm:px-4">
              <BarChart3 className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">National View</span>
            </TabsTrigger>
          </TabsList>

          {/* Imam Dashboard */}
          <TabsContent value="imam">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-900 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Spiritual Guidance & Counseling
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl text-blue-900 mb-1">24</div>
                          <div className="text-sm text-blue-600">Pending Consultations</div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl text-green-900 mb-1">156</div>
                          <div className="text-sm text-green-600">This Month</div>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl text-purple-900 mb-1">4.9</div>
                          <div className="text-sm text-purple-600">Avg Rating</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 border border-slate-200 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-sm text-slate-900">Marriage guidance consultation</div>
                            <Badge className="bg-red-100 text-red-700 text-xs">Urgent</Badge>
                          </div>
                          <div className="text-xs text-slate-600">Scheduled: Today 3:00 PM</div>
                        </div>
                        
                        <div className="p-3 border border-slate-200 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-sm text-slate-900">Youth spiritual development</div>
                            <Badge className="bg-yellow-100 text-yellow-700 text-xs">Normal</Badge>
                          </div>
                          <div className="text-xs text-slate-600">Scheduled: Tomorrow 2:00 PM</div>
                        </div>
                      </div>

                      <Button className="w-full bg-slate-600 hover:bg-slate-700 text-white">
                        View All Appointments
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-900 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Khutbah & Prayer Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-slate-200 rounded-lg">
                          <div className="text-sm text-slate-900 mb-2">This Friday's Khutbah</div>
                          <div className="text-xs text-slate-600 mb-2">"The Importance of Community Unity"</div>
                          <div className="text-xs text-green-600">✓ Prepared & Reviewed</div>
                        </div>
                        
                        <div className="p-4 border border-slate-200 rounded-lg">
                          <div className="text-sm text-slate-900 mb-2">Next Week's Topic</div>
                          <div className="text-xs text-slate-600 mb-2">"Seeking Knowledge in Islam"</div>
                          <div className="text-xs text-orange-600">⚠ Needs Preparation</div>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-sm text-slate-900 mb-2">Prayer Leadership Schedule</div>
                        <div className="grid grid-cols-5 gap-2 text-xs">
                          <div className="text-center p-2 bg-white rounded">
                            <div className="text-slate-600">Fajr</div>
                            <div className="text-green-600">✓</div>
                          </div>
                          <div className="text-center p-2 bg-white rounded">
                            <div className="text-slate-600">Dhuhr</div>
                            <div className="text-green-600">✓</div>
                          </div>
                          <div className="text-center p-2 bg-white rounded">
                            <div className="text-slate-600">Asr</div>
                            <div className="text-slate-400">-</div>
                          </div>
                          <div className="text-center p-2 bg-white rounded">
                            <div className="text-slate-600">Maghrib</div>
                            <div className="text-blue-600">Scheduled</div>
                          </div>
                          <div className="text-center p-2 bg-white rounded">
                            <div className="text-slate-600">Isha</div>
                            <div className="text-blue-600">Scheduled</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-900">Community Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                        <div className="text-2xl text-blue-900 mb-1">89%</div>
                        <div className="text-sm text-blue-600">Community Satisfaction</div>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Regular Attendees</span>
                          <span className="text-slate-900">234</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">New Members (Month)</span>
                          <span className="text-slate-900">18</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Youth Participation</span>
                          <span className="text-slate-900">72%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start border-slate-300">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Community Message
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-slate-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Special Event
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-slate-300">
                      <Settings className="w-4 h-4 mr-2" />
                      Manage Prayer Times
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Local Mosque Admin */}
          <TabsContent value="local">
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-6">
                <div className="grid grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl text-slate-900 mb-1">456</div>
                      <div className="text-sm text-slate-600">Active Members</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl text-slate-900 mb-1">12</div>
                      <div className="text-sm text-slate-600">Events This Month</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl text-slate-900 mb-1">2,340</div>
                      <div className="text-sm text-slate-600">Prayer Attendances</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl text-green-600 mb-1">+8%</div>
                      <div className="text-sm text-slate-600">Growth Rate</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-900">Monthly Prayer Attendance Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={attendanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="fajr" stroke="#0f172a" strokeWidth={2} name="Fajr" />
                        <Line type="monotone" dataKey="dhuhr" stroke="#1e40af" strokeWidth={2} name="Dhuhr" />
                        <Line type="monotone" dataKey="asr" stroke="#dc2626" strokeWidth={2} name="Asr" />
                        <Line type="monotone" dataKey="maghrib" stroke="#059669" strokeWidth={2} name="Maghrib" />
                        <Line type="monotone" dataKey="isha" stroke="#7c3aed" strokeWidth={2} name="Isha" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-900">Pending Administrative Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pendingTasks.map((task, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                          <div>
                            <div className="text-sm text-slate-900">{task.task}</div>
                            <div className="text-xs text-slate-600">Due: {task.due}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs ${
                              task.priority === 'High' ? 'bg-red-100 text-red-700' :
                              task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {task.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-slate-300">
                              {task.category}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-900">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="p-3 border border-slate-200 rounded-lg">
                          <div className="text-sm text-slate-900 mb-1">{activity.action}</div>
                          <div className="text-xs text-slate-600">{activity.time}</div>
                          <div className="text-xs text-slate-500">by {activity.user}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-900">Alerts & Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center text-red-700 text-sm">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Low volunteer count for Friday event
                        </div>
                      </div>
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center text-yellow-700 text-sm">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Prayer time update needed
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* National Leadership View */}
          <TabsContent value="national">
            <div className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl text-slate-900 mb-2">1,247</div>
                    <div className="text-sm text-slate-600">Total Mosques</div>
                    <div className="text-xs text-green-600 mt-1">+23 this year</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl text-slate-900 mb-2">45,892</div>
                    <div className="text-sm text-slate-600">Community Members</div>
                    <div className="text-xs text-green-600 mt-1">+2,156 this month</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl text-slate-900 mb-2">8,934</div>
                    <div className="text-sm text-slate-600">Daily Prayers</div>
                    <div className="text-xs text-green-600 mt-1">+5% from last month</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl text-slate-900 mb-2">156</div>
                    <div className="text-sm text-slate-600">Monthly Events</div>
                    <div className="text-xs text-green-600 mt-1">+12% participation</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-900 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Top Performing Mosques
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mosqueStats.map((mosque, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                          <div>
                            <div className="text-sm text-slate-900">{mosque.mosque}</div>
                            <div className="text-xs text-slate-600">{mosque.members} members • {mosque.events} events</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-slate-900">{mosque.prayers}</div>
                            <div className="text-xs text-green-600">{mosque.growth}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-900">Community Health Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {communityMetrics.map((metric, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-700">{metric.name}</span>
                            <span className="text-slate-900">{metric.value}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-slate-900">Access Level Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {accessLevels.map((level, index) => (
                      <div key={index} className="p-4 border border-slate-200 rounded-lg">
                        <h3 className="text-lg text-slate-900 mb-2">{level.level}</h3>
                        <p className="text-sm text-slate-600 mb-4">{level.description}</p>
                        <div className="space-y-2">
                          {level.features.map((feature, idx) => (
                            <div key={idx} className="text-xs text-slate-700 flex items-center">
                              <div className="w-2 h-2 bg-slate-400 rounded-full mr-2"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4 border-slate-300 text-slate-700 hover:bg-slate-50">
                          Manage Access
                        </Button>
                      </div>
                    ))}
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