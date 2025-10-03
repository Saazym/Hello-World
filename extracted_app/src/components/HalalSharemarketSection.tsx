import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart as PieIcon, Search, Filter, Star, Eye, AlertTriangle, CheckCircle, Clock, Award, Target } from 'lucide-react'

const halalStocks = [
  {
    symbol: "AMZN",
    name: "Amazon",
    price: 269514,
    change: +2108,
    changePercent: +0.79,
    marketCap: "₹137L Cr",
    volume: "2.1M",
    halalStatus: "Compliant",
    sector: "Technology",
    shariaCompliance: 92
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    price: 31445,
    change: -432,
    changePercent: -1.35,
    marketCap: "₹237L Cr",
    volume: "18.2M",
    halalStatus: "Compliant",
    sector: "Technology",
    shariaCompliance: 89
  },
  {
    symbol: "GOOGL",
    name: "Alphabet",
    price: 239895,
    change: +1556,
    changePercent: +0.65,
    marketCap: "₹159L Cr",
    volume: "1.4M",
    halalStatus: "Compliant",
    sector: "Technology",
    shariaCompliance: 86
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    price: 72646,
    change: +3494,
    changePercent: +5.05,
    marketCap: "₹179L Cr",
    volume: "35.8M",
    halalStatus: "Compliant",
    sector: "Technology",
    shariaCompliance: 95
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    price: 20626,
    change: -739,
    changePercent: -3.46,
    marketCap: "₹65.7L Cr",
    volume: "42.1M",
    halalStatus: "Under Review",
    sector: "Automotive",
    shariaCompliance: 78
  },
  {
    symbol: "AAPL",
    name: "Apple",
    price: 15759,
    change: +178,
    changePercent: +1.15,
    marketCap: "₹247L Cr",
    volume: "28.5M",
    halalStatus: "Compliant",
    sector: "Technology",
    shariaCompliance: 91
  }
]

const islamicIndices = [
  { name: "Dow Jones Islamic Market Index", value: 342442, change: +1531, changePercent: +0.45 },
  { name: "FTSE Shariah Global Equity Index", value: 239880, change: -1021, changePercent: -0.42 },
  { name: "MSCI World Islamic Index", value: 130136, change: +2131, changePercent: +1.66 },
  { name: "S&P 500 Shariah Index", value: 286913, change: +739, changePercent: +0.26 }
]

const portfolioData = [
  { month: 'Jan', value: 830000, halalValue: 705500 },
  { month: 'Feb', value: 996000, halalValue: 846600 },
  { month: 'Mar', value: 954500, halalValue: 813400 },
  { month: 'Apr', value: 1120500, halalValue: 971100 },
  { month: 'May', value: 1261600, halalValue: 1112200 },
  { month: 'Jun', value: 1228400, halalValue: 1070700 }
]

const sectorDistribution = [
  { name: 'Technology', value: 45, color: '#10b981' },
  { name: 'Healthcare', value: 25, color: '#3b82f6' },
  { name: 'Consumer Goods', value: 15, color: '#f59e0b' },
  { name: 'Energy', value: 10, color: '#ef4444' },
  { name: 'Others', value: 5, color: '#8b5cf6' }
]

const halalScreeningCriteria = [
  { name: "Interest-based Income", threshold: "<5%", current: "2.1%", status: "compliant" },
  { name: "Debt Ratio", threshold: "<33%", current: "18%", status: "compliant" },
  { name: "Cash Ratio", threshold: "<33%", current: "28%", status: "compliant" },
  { name: "Haram Activities", threshold: "0%", current: "0%", status: "compliant" }
]

const islamicFinancialNews = [
  {
    title: "Islamic Finance Market Reaches $3.7 Trillion Globally",
    summary: "Sukuk issuances surge 15% in Q2 2024, driven by green and sustainability bonds",
    time: "2 hours ago",
    category: "Market News"
  },
  {
    title: "New Sharia-Compliant ETF Launches with Tech Focus",
    summary: "Fund targets halal technology companies with strong ESG credentials",
    time: "5 hours ago",
    category: "Product Launch"
  },
  {
    title: "Malaysia's Islamic Banking Assets Cross $500B",
    summary: "Digital Islamic banking solutions drive unprecedented growth",
    time: "1 day ago",
    category: "Regional News"
  }
]

export function HalalSharemarketSection() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [watchlist, setWatchlist] = useState<string[]>(['MSFT', 'GOOGL', 'NVDA'])
  const [portfolioValue, setPortfolioValue] = useState(20391350)
  const [dayChange, setDayChange] = useState(+194691)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time and portfolio value simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate portfolio value changes
      const randomChange = (Math.random() - 0.5) * 1000
      setPortfolioValue(prev => prev + randomChange)
      setDayChange(prev => prev + randomChange)
    }, 5000)
    
    return () => clearInterval(timer)
  }, [])

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    )
  }

  const filteredStocks = halalStocks.filter(stock => 
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-green-100 text-green-800'
      case 'Under Review': return 'bg-amber-100 text-amber-800'
      case 'Non-Compliant': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />
      case 'non-compliant': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl mb-2 text-blue-900 font-bold">Halal Sharemarket Guide</h1>
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <Star className="w-4 h-4" />
                <span className="text-sm md:text-base">Sharia-Compliant Investment Platform</span>
              </div>
            </div>
          </div>
          <p className="text-blue-800 max-w-2xl mx-auto text-sm md:text-base px-4">
            Invest in Halal stocks and build wealth according to Islamic principles
          </p>
        </div>

        {/* Live Market Status */}
        <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <div className="text-lg font-bold text-blue-600">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <div className="text-xs text-gray-500">Market Open - NYSE</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                ₹{portfolioValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`text-sm ${dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {dayChange >= 0 ? '+' : ''}₹{dayChange.toFixed(2)} ({((dayChange / portfolioValue) * 100).toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 h-auto">
            <TabsTrigger value="dashboard" className="flex flex-col sm:flex-row items-center gap-2 p-3">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span className="text-xs sm:text-sm">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="stocks" className="flex flex-col sm:flex-row items-center gap-2 p-3">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs sm:text-sm">Halal Stocks</span>
            </TabsTrigger>
            <TabsTrigger value="screening" className="flex flex-col sm:flex-row items-center gap-2 p-3">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-xs sm:text-sm">Screening</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex flex-col sm:flex-row items-center gap-2 p-3">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="text-xs sm:text-sm">Learn</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Portfolio Performance */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-900">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Portfolio Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={portfolioData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} name="Total Portfolio" />
                        <Line type="monotone" dataKey="halalValue" stroke="#10b981" strokeWidth={2} name="Halal Holdings" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Islamic Market Indices */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-900">Islamic Market Indices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {islamicIndices.map((index, i) => (
                        <div key={i} className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm text-blue-800 mb-1">{index.name}</div>
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-blue-900">{index.value.toFixed(2)}</div>
                            <div className={`flex items-center text-sm ${
                              index.change >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {index.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                              {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Sector Allocation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-900">
                      <PieIcon className="w-5 h-5 mr-2" />
                      Sector Allocation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={sectorDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={70}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {sectorDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Watchlist */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-900">
                      <Eye className="w-5 h-5 mr-2" />
                      Watchlist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {halalStocks.filter(stock => watchlist.includes(stock.symbol)).map((stock) => (
                        <div key={stock.symbol} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                          <div>
                            <div className="font-medium text-blue-900">{stock.symbol}</div>
                            <div className="text-xs text-gray-600">{stock.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">₹{stock.price}</div>
                            <div className={`text-xs ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Islamic Finance News */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-900">Islamic Finance News</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {islamicFinancialNews.map((news, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <Badge className="bg-blue-100 text-blue-800 text-xs">{news.category}</Badge>
                            <span className="text-xs text-gray-500">{news.time}</span>
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1 text-sm">{news.title}</h4>
                          <p className="text-xs text-gray-600">{news.summary}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Stocks Tab */}
          <TabsContent value="stocks">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search halal stocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredStocks.map((stock) => (
                <Card key={stock.symbol} className="hover:shadow-xl transition-shadow bg-white border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-blue-900">{stock.symbol}</h3>
                        <p className="text-sm text-gray-600">{stock.name}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleWatchlist(stock.symbol)}
                        className={`${watchlist.includes(stock.symbol) ? 'bg-blue-100 text-blue-700' : ''}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Badge className={getStatusColor(stock.halalStatus)}>
                        {stock.halalStatus}
                      </Badge>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-2xl text-blue-900">₹{stock.price}</span>
                        <div className={`flex items-center text-sm ${
                          stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                          {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%)
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <div>Market Cap: {stock.marketCap}</div>
                        <div>Volume: {stock.volume}</div>
                        <div>Sector: {stock.sector}</div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Sharia Compliance</span>
                          <span className="text-sm font-medium text-blue-900">{stock.shariaCompliance}%</span>
                        </div>
                        <Progress value={stock.shariaCompliance} className="h-2" />
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                        <DollarSign className="w-4 h-4 mr-1" />
                        Buy
                      </Button>
                      <Button variant="outline" size="sm" className="border-blue-300">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Screening Tab */}
          <TabsContent value="screening">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Halal Screening Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {halalScreeningCriteria.map((criteria, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getComplianceIcon(criteria.status)}
                          <div>
                            <div className="font-medium text-gray-900">{criteria.name}</div>
                            <div className="text-sm text-gray-600">Threshold: {criteria.threshold}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-blue-900">{criteria.current}</div>
                          <Badge className={getStatusColor('Compliant')}>
                            Compliant
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Screening Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-medium text-green-800 mb-2">✓ Business Activity Screening</h3>
                      <p className="text-sm text-green-700">
                        Companies must not engage in prohibited activities like alcohol, gambling, tobacco, or conventional banking.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">✓ Financial Ratio Screening</h3>
                      <p className="text-sm text-blue-700">
                        Companies must meet specific financial ratios to ensure minimal exposure to interest-based activities.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h3 className="font-medium text-purple-800 mb-2">✓ Ongoing Monitoring</h3>
                      <p className="text-sm text-purple-700">
                        Continuous monitoring ensures companies maintain their Halal status throughout your investment period.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Islamic Investment Principles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800">No Riba (Interest)</h4>
                      <p className="text-sm text-green-700">Avoid companies with excessive debt or interest-based income</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800">No Gharar (Speculation)</h4>
                      <p className="text-sm text-blue-700">Avoid excessive uncertainty and speculative investments</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-800">Halal Business Activities</h4>
                      <p className="text-sm text-purple-700">Only invest in companies with permissible business models</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Getting Started</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</div>
                      <div>
                        <div className="font-medium">Learn the Basics</div>
                        <div className="text-sm text-gray-600">Understand Islamic investment principles</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</div>
                      <div>
                        <div className="font-medium">Build Your Portfolio</div>
                        <div className="text-sm text-gray-600">Start with diversified halal stocks</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</div>
                      <div>
                        <div className="font-medium">Monitor & Purify</div>
                        <div className="text-sm text-gray-600">Regular monitoring and purification of income</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start border-blue-300">
                      <Award className="w-4 h-4 mr-2" />
                      Islamic Finance Course
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-green-300">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Halal Stock Screener
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-purple-300">
                      <Target className="w-4 h-4 mr-2" />
                      Investment Calculator
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-amber-300">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Market Analysis
                    </Button>
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