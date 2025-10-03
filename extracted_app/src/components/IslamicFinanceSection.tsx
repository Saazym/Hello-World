import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DollarSign, TrendingUp, Shield, AlertTriangle, Calculator, PieChart, Target, Coins, BookOpen, CheckCircle } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const portfolioItems = [
  {
    id: 1,
    name: "Islamic Equity Fund",
    type: "Sukuk",
    amount: 15000,
    returns: 8.5,
    status: "halal",
    riskLevel: "medium",
    description: "Sharia-compliant equity investments"
  },
  {
    id: 2,
    name: "Gold Investment",
    type: "Commodity",
    amount: 8500,
    returns: 12.3,
    status: "halal",
    riskLevel: "low",
    description: "Physical gold holdings"
  },
  {
    id: 3,
    name: "Real Estate Sukuk",
    type: "Real Estate",
    amount: 25000,
    returns: 6.8,
    status: "halal",
    riskLevel: "medium",
    description: "Sharia-compliant real estate investment"
  },
  {
    id: 4,
    name: "Technology Stock",
    type: "Individual Stock",
    amount: 5000,
    returns: -2.1,
    status: "questionable",
    riskLevel: "high",
    description: "Needs Sharia compliance review"
  }
]

const zakatCalculations = [
  {
    category: "Cash & Savings",
    amount: 12000,
    nisab: 4340,
    zakatDue: 300,
    rate: 2.5
  },
  {
    category: "Gold & Silver",
    amount: 8500,
    nisab: 4340,
    zakatDue: 212.5,
    rate: 2.5
  },
  {
    category: "Business Assets",
    amount: 15000,
    nisab: 4340,
    zakatDue: 375,
    rate: 2.5
  },
  {
    category: "Investments",
    amount: 25000,
    nisab: 4340,
    zakatDue: 625,
    rate: 2.5
  }
]

const halalInvestments = [
  {
    name: "Amana Growth Fund",
    type: "Mutual Fund",
    rating: "A+",
    returns: "9.2% annually",
    minimumInvestment: 1000,
    shariaBoard: "Certified",
    description: "Large-cap equity fund following Islamic principles"
  },
  {
    name: "Wahed FTSE USA Shariah ETF",
    type: "ETF",
    rating: "A",
    returns: "8.7% annually",
    minimumInvestment: 100,
    shariaBoard: "Certified",
    description: "Diversified US equity exposure"
  },
  {
    name: "Islamic Real Estate Investment",
    type: "REIT",
    rating: "B+",
    returns: "7.1% annually",
    minimumInvestment: 2500,
    shariaBoard: "Certified",
    description: "Commercial real estate investments"
  },
  {
    name: "Sukuk Government Bonds",
    type: "Sukuk",
    rating: "A",
    returns: "5.5% annually",
    minimumInvestment: 5000,
    shariaBoard: "Certified",
    description: "Government-issued Islamic bonds"
  }
]

const monthlyExpenses = [
  { category: "Housing", amount: 2000, halal: true, percentage: 40 },
  { category: "Food", amount: 800, halal: true, percentage: 16 },
  { category: "Transportation", amount: 400, halal: true, percentage: 8 },
  { category: "Charity", amount: 500, halal: true, percentage: 10 },
  { category: "Education", amount: 300, halal: true, percentage: 6 },
  { category: "Healthcare", amount: 200, halal: true, percentage: 4 },
  { category: "Entertainment", amount: 300, halal: true, percentage: 6 },
  { category: "Savings", amount: 500, halal: true, percentage: 10 }
]

export function IslamicFinanceSection() {
  const [activeTab, setActiveTab] = useState("overview")
  const [zakatAmount, setZakatAmount] = useState("")
  const [income, setIncome] = useState("")
  const [investmentAmount, setInvestmentAmount] = useState("")

  const totalPortfolio = portfolioItems.reduce((sum, item) => sum + item.amount, 0)
  const totalZakat = zakatCalculations.reduce((sum, item) => sum + item.zakatDue, 0)
  const halalPercentage = (portfolioItems.filter(item => item.status === 'halal').reduce((sum, item) => sum + item.amount, 0) / totalPortfolio) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1624365167573-80c5d1b7681f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwZmluYW5jZSUyMGdvbGQlMjBjb2luc3xlbnwxfHx8fDE3NTgxMjU1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Islamic finance"
            className="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-4 md:mb-6 object-cover border-4 border-amber-300"
          />
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4 text-amber-900 font-bold">Islamic Finance Tracker</h1>
          <p className="text-amber-800 max-w-2xl mx-auto text-sm md:text-base px-4">
            Manage your wealth according to Islamic principles with halal investments, zakat calculations, and Sharia-compliant planning
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">${totalPortfolio.toLocaleString()}</div>
              <div className="text-sm opacity-90">Total Portfolio</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardContent className="p-4 text-center">
              <Coins className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">${totalZakat.toLocaleString()}</div>
              <div className="text-sm opacity-90">Zakat Due</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{halalPercentage.toFixed(1)}%</div>
              <div className="text-sm opacity-90">Halal Investments</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">8.4%</div>
              <div className="text-sm opacity-90">Avg. Returns</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="overview" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <PieChart className="w-4 h-4 md:w-4 md:h-4 text-amber-600 flex-shrink-0" />
              <span className="leading-tight text-center">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="zakat" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Calculator className="w-4 h-4 md:w-4 md:h-4 text-green-600 flex-shrink-0" />
              <span className="leading-tight text-center">Zakat</span>
            </TabsTrigger>
            <TabsTrigger value="investments" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <TrendingUp className="w-4 h-4 md:w-4 md:h-4 text-blue-600 flex-shrink-0" />
              <span className="leading-tight text-center">Investments</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Target className="w-4 h-4 md:w-4 md:h-4 text-purple-600 flex-shrink-0" />
              <span className="leading-tight text-center">Budget</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-900">Portfolio Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {portfolioItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg">
                          <div className={`w-4 h-4 rounded-full ${
                            item.status === 'halal' ? 'bg-green-500' : 
                            item.status === 'questionable' ? 'bg-amber-500' : 'bg-red-500'
                          }`}></div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium text-amber-900">{item.name}</h3>
                              <div className="flex items-center gap-2">
                                <Badge className={`text-xs ${
                                  item.status === 'halal' ? 'bg-green-100 text-green-800' : 
                                  item.status === 'questionable' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {item.status}
                                </Badge>
                                <span className={`text-sm ${
                                  item.returns > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {item.returns > 0 ? '+' : ''}{item.returns}%
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-amber-700">{item.type} • {item.riskLevel} risk</span>
                              <span className="font-medium text-amber-900">${item.amount.toLocaleString()}</span>
                            </div>
                            
                            <p className="text-xs text-amber-600 mt-1">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-amber-900">Islamic Finance Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <h3 className="font-medium text-green-800">Halal Investments</h3>
                        </div>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Sukuk (Islamic bonds)</li>
                          <li>• Sharia-compliant stocks</li>
                          <li>• Real estate investments</li>
                          <li>• Gold and commodities</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <h3 className="font-medium text-red-800">Avoid (Haram)</h3>
                        </div>
                        <ul className="text-sm text-red-700 space-y-1">
                          <li>• Interest-based investments</li>
                          <li>• Gambling/speculation</li>
                          <li>• Alcohol/tobacco companies</li>
                          <li>• Conventional banking</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-900">Portfolio Health</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-amber-700">Halal Compliance</span>
                        <span className="text-amber-900">{halalPercentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={halalPercentage} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-amber-700">Risk Diversification</span>
                        <span className="text-amber-900">Good</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-amber-700">Return Performance</span>
                        <span className="text-amber-900">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Zakat
                    </Button>
                    <Button variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-100">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Islamic Finance Guide
                    </Button>
                    <Button variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-100">
                      <Shield className="w-4 h-4 mr-2" />
                      Portfolio Review
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Zakat Tab */}
          <TabsContent value="zakat">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-900">Zakat Calculator</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {zakatCalculations.map((item, index) => (
                      <div key={index} className="p-4 bg-amber-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-amber-900">{item.category}</h3>
                          <Badge className="bg-green-100 text-green-800">
                            {item.rate}% rate
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-amber-700">Amount:</span>
                            <span className="text-amber-900">${item.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-amber-700">Nisab Threshold:</span>
                            <span className="text-amber-900">${item.nisab.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span className="text-amber-700">Zakat Due:</span>
                            <span className="text-green-700">${item.zakatDue.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-center">
                        <h3 className="font-medium text-green-800 mb-2">Total Zakat Due This Year</h3>
                        <div className="text-3xl font-bold text-green-700">${totalZakat.toLocaleString()}</div>
                        <p className="text-sm text-green-600 mt-2">
                          Based on current Nisab value and your reported assets
                        </p>
                      </div>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Pay Zakat Now
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-900">Add Assets for Zakat</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-amber-700 mb-2 block">Asset Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash & Savings</SelectItem>
                          <SelectItem value="gold">Gold & Silver</SelectItem>
                          <SelectItem value="business">Business Assets</SelectItem>
                          <SelectItem value="investment">Investments</SelectItem>
                          <SelectItem value="property">Rental Property</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-amber-700 mb-2 block">Amount ($)</label>
                      <Input
                        placeholder="Enter amount"
                        value={zakatAmount}
                        onChange={(e) => setZakatAmount(e.target.value)}
                        className="border-amber-300"
                      />
                    </div>

                    <Button variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-100">
                      Add Asset
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-amber-900">Zakat Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start border-amber-300 text-amber-700 hover:bg-amber-100">
                        Local Mosque Fund
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-amber-300 text-amber-700 hover:bg-amber-100">
                        Poor & Needy (Fuqara)
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-amber-300 text-amber-700 hover:bg-amber-100">
                        Debt Relief Program
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-amber-300 text-amber-700 hover:bg-amber-100">
                        Islamic Education
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-amber-300 text-amber-700 hover:bg-amber-100">
                        Refugee Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {halalInvestments.map((investment, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium text-amber-900">{investment.name}</h3>
                          <Badge className="bg-green-100 text-green-800">
                            {investment.rating}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-amber-700">Type:</span>
                            <span className="text-amber-900">{investment.type}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-amber-700">Returns:</span>
                            <span className="text-green-600">{investment.returns}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-amber-700">Minimum:</span>
                            <span className="text-amber-900">${investment.minimumInvestment.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-amber-700">Sharia Board:</span>
                            <span className="text-green-600">{investment.shariaBoard}</span>
                          </div>
                        </div>

                        <p className="text-sm text-amber-700 mb-4">{investment.description}</p>

                        <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-900">Investment Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-amber-700 mb-2 block">Investment Amount ($)</label>
                      <Input
                        placeholder="Enter amount"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="border-amber-300"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-amber-700 mb-2 block">Investment Period</label>
                      <Select>
                        <SelectTrigger className="border-amber-300">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="3years">3 Years</SelectItem>
                          <SelectItem value="5years">5 Years</SelectItem>
                          <SelectItem value="10years">10+ Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-amber-700 mb-2 block">Risk Tolerance</label>
                      <Select>
                        <SelectTrigger className="border-amber-300">
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Conservative (Low Risk)</SelectItem>
                          <SelectItem value="medium">Moderate (Medium Risk)</SelectItem>
                          <SelectItem value="high">Aggressive (High Risk)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                      Get Recommendations
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-amber-900">Portfolio Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-amber-50 rounded border border-amber-200">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-800">Review Required</span>
                      </div>
                      <p className="text-xs text-amber-700">Technology Stock needs Sharia compliance review</p>
                    </div>

                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Rebalance Opportunity</span>
                      </div>
                      <p className="text-xs text-blue-700">Consider increasing real estate allocation</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-900">Monthly Budget</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthlyExpenses.map((expense, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded ${
                              expense.halal ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-amber-900">{expense.category}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-amber-900">${expense.amount}</div>
                            <div className="text-xs text-amber-600">{expense.percentage}%</div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg border border-amber-200">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-amber-900">Total Monthly Expenses</span>
                          <span className="text-xl font-bold text-amber-900">
                            ${monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-900">Set Monthly Income</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-amber-700 mb-2 block">Monthly Income ($)</label>
                      <Input
                        placeholder="Enter your monthly income"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        className="border-amber-300"
                      />
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-medium text-green-800 mb-2">Islamic Budget Guidelines</h3>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 10-20% for Charity (Zakat + Sadaqah)</li>
                        <li>• 25-35% for Housing</li>
                        <li>• 15-20% for Savings</li>
                        <li>• 10-15% for Food</li>
                        <li>• Avoid debt/interest</li>
                      </ul>
                    </div>

                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                      Create Islamic Budget Plan
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-amber-900">Financial Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-amber-900">Emergency Fund</span>
                        <span className="text-xs text-amber-600">6 months expenses</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>

                    <div className="p-3 bg-amber-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-amber-900">Hajj Savings</span>
                        <span className="text-xs text-amber-600">$15,000 goal</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>

                    <div className="p-3 bg-amber-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-amber-900">Home Purchase</span>
                        <span className="text-xs text-amber-600">Islamic mortgage</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
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