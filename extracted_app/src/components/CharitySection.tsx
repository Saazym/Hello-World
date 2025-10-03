import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Input } from './ui/input'
import { Heart, DollarSign, Users, Target, TrendingUp, Gift, HandHeart } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const activeCampaigns = [
  {
    title: "Winter Clothing Drive",
    description: "Providing warm clothing for homeless families",
    target: 830000,
    raised: 651550,
    donors: 156,
    daysLeft: 12,
    impact: "250 families helped",
    urgency: "High"
  },
  {
    title: "Orphan Education Fund",
    description: "Supporting education for orphaned children",
    target: 2075000,
    raised: 1527200,
    donors: 289,
    daysLeft: 28,
    impact: "45 children enrolled",
    urgency: "Medium"
  },
  {
    title: "Community Food Bank",
    description: "Monthly food distribution program",
    target: 415000,
    raised: 385950,
    donors: 98,
    daysLeft: 5,
    impact: "120 families fed monthly",
    urgency: "Low"
  }
]

const topContributors = [
  { name: "Anonymous Donor", amount: 415000, rank: 1, type: "Individual" },
  { name: "Al-Noor Islamic Center", amount: 348600, rank: 2, type: "Mosque" },
  { name: "Ahmad Hassan", amount: 315400, rank: 3, type: "Individual" },
  { name: "Masjid As-Salam", amount: 290500, rank: 4, type: "Mosque" },
  { name: "Fatima Al-Zahra", amount: 240700, rank: 5, type: "Individual" }
]

const impactMetrics = [
  { category: 'Families Fed', value: 1250, icon: '🍽️', growth: '+15%' },
  { category: 'Children Educated', value: 450, icon: '📚', growth: '+22%' },
  { category: 'Homeless Sheltered', value: 89, icon: '🏠', growth: '+8%' },
  { category: 'Medical Aid', value: 234, icon: '⚕️', growth: '+31%' }
]

const donationData = [
  { month: 'Sep', amount: 1037500, donors: 45 },
  { month: 'Oct', amount: 1311400, donors: 62 },
  { month: 'Nov', amount: 1510600, donors: 78 },
  { month: 'Dec', amount: 1859200, donors: 94 },
  { month: 'Jan', amount: 1630950, donors: 86 }
]

const categoryBreakdown = [
  { name: 'Education', value: 35, color: '#3b82f6' },
  { name: 'Food Security', value: 28, color: '#10b981' },
  { name: 'Healthcare', value: 20, color: '#f59e0b' },
  { name: 'Emergency Relief', value: 17, color: '#ef4444' }
]

export function CharitySection() {
  const [donationAmount, setDonationAmount] = useState("")
  const [selectedCampaign, setSelectedCampaign] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl mb-4 text-rose-900">Charity & Donation Tracker</h1>
          <p className="text-rose-700 max-w-2xl mx-auto">
            Make a difference in your community through charitable giving and track the collective impact of our ummah
          </p>
        </div>

        {/* Impact Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {impactMetrics.map((metric, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl mb-2">{metric.icon}</div>
                <div className="text-2xl text-rose-900 mb-1">{metric.value.toLocaleString()}</div>
                <div className="text-sm text-rose-600 mb-2">{metric.category}</div>
                <Badge className="bg-green-100 text-green-700 text-xs">
                  {metric.growth} this year
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Campaigns */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl text-rose-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                Active Campaigns
              </h2>
              
              <div className="space-y-6">
                {activeCampaigns.map((campaign, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl text-rose-900 mb-2">{campaign.title}</h3>
                          <p className="text-rose-700 text-sm mb-3">{campaign.description}</p>
                        </div>
                        <Badge className={`text-xs ${
                          campaign.urgency === 'High' ? 'bg-red-100 text-red-700' :
                          campaign.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {campaign.urgency} Priority
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-rose-700 mb-2">
                          <span>Progress: ₹{campaign.raised.toLocaleString()} raised</span>
                          <span>Goal: ₹{campaign.target.toLocaleString()}</span>
                        </div>
                        <Progress value={(campaign.raised / campaign.target) * 100} className="h-3" />
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg text-rose-900">{campaign.donors}</div>
                          <div className="text-xs text-rose-600">Donors</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg text-rose-900">{campaign.daysLeft}</div>
                          <div className="text-xs text-rose-600">Days Left</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg text-rose-900">{Math.round((campaign.raised / campaign.target) * 100)}%</div>
                          <div className="text-xs text-rose-600">Complete</div>
                        </div>
                      </div>

                      <div className="p-3 bg-rose-50 rounded-lg mb-4">
                        <div className="text-sm text-rose-800">
                          <HandHeart className="w-4 h-4 inline mr-2" />
                          Impact: {campaign.impact}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1 bg-rose-600 hover:bg-rose-700 text-white">
                          <Gift className="w-4 h-4 mr-2" />
                          Donate Now
                        </Button>
                        <Button variant="outline" className="border-rose-300 text-rose-700 hover:bg-rose-50">
                          Share Campaign
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Donation Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-rose-900 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Monthly Donation Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={donationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'amount' ? `₹${value.toLocaleString()}` : value,
                      name === 'amount' ? 'Amount Raised' : 'Number of Donors'
                    ]} />
                    <Bar dataKey="amount" fill="#e11d48" name="amount" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-rose-900">Donation Distribution by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="space-y-3">
                    {categoryBreakdown.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-3"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="text-sm text-rose-800">{category.name}</span>
                        </div>
                        <span className="text-sm text-rose-900">{category.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Donate */}
            <Card>
              <CardHeader>
                <CardTitle className="text-rose-900 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Quick Donate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-rose-700 mb-2 block">Select Campaign</label>
                  <select 
                    value={selectedCampaign}
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    className="w-full p-2 border border-rose-300 rounded-md text-sm"
                  >
                    <option value="">Choose a campaign...</option>
                    <option value="winter">Winter Clothing Drive</option>
                    <option value="education">Orphan Education Fund</option>
                    <option value="food">Community Food Bank</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-rose-700 mb-2 block">Donation Amount</label>
                  <Input 
                    type="number"
                    placeholder="Enter amount (₹)"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="border-rose-300"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[2075, 4150, 8300].map(amount => (
                    <Button 
                      key={amount}
                      variant="outline" 
                      size="sm"
                      onClick={() => setDonationAmount(amount.toString())}
                      className="border-rose-300 text-rose-700 hover:bg-rose-50"
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>

                <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                  <Heart className="w-4 h-4 mr-2" />
                  Donate Now
                </Button>

                <div className="text-xs text-rose-600 text-center">
                  🔒 Secure payment processing • Tax-deductible
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="text-rose-900 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-rose-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm mr-3 ${
                          contributor.rank === 1 ? 'bg-yellow-500' :
                          contributor.rank === 2 ? 'bg-gray-400' :
                          contributor.rank === 3 ? 'bg-orange-500' :
                          'bg-rose-400'
                        }`}>
                          {contributor.rank}
                        </div>
                        <div>
                          <div className="text-sm text-rose-900">{contributor.name}</div>
                          <Badge variant="outline" className="text-xs border-rose-300 text-rose-700">
                            {contributor.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-rose-900">₹{contributor.amount.toLocaleString()}</div>
                        <div className="text-xs text-rose-600">Total</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4 border-rose-300 text-rose-700 hover:bg-rose-50">
                  View Full Leaderboard
                </Button>
              </CardContent>
            </Card>

            {/* Monthly Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-rose-900">January 2025 Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-rose-700">Community Target</span>
                      <span className="text-rose-900">$75,000</span>
                    </div>
                    <Progress value={68} className="h-2 mb-1" />
                    <div className="text-xs text-rose-600">$51,200 raised so far</div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-rose-700">New Donors Goal</span>
                      <span className="text-rose-900">500</span>
                    </div>
                    <Progress value={45} className="h-2 mb-1" />
                    <div className="text-xs text-rose-600">225 new donors this month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}