import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { Switch } from './ui/switch'
import { CreditCard, Shield, Smartphone, Eye, EyeOff, Send, ArrowUpDown, Plus, Minus, DollarSign, TrendingUp, Lock, Unlock, Settings, Bell, Star, Award, Zap, Scan, Fingerprint, Brain, Globe, ChevronRight, Copy, Check, QrCode, MapPin, Calendar, Clock, User, Phone, Mail, Building } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { motion, AnimatePresence } from 'motion/react'
import { toast } from 'sonner'

export function IslamicBankingSection() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showBalance, setShowBalance] = useState(true)
  const [showCardDetails, setShowCardDetails] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [transferAmount, setTransferAmount] = useState('')
  const [transferTo, setTransferTo] = useState('')
  const [cardLocked, setCardLocked] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const accountData = {
    accountNumber: '4532 1234 5678 9012',
    balance: 234567.89,
    availableBalance: 234567.89,
    blockedAmount: 0,
    accountHolder: 'Ahmed Hassan',
    accountType: 'Premium Islamic Banking',
    ifscCode: 'ISLN0001234',
    branchName: 'Al-Baraka Islamic Banking - Delhi Central'
  }

  const cardData = {
    cardNumber: '4532 1234 5678 9012',
    expiryDate: '12/28',
    holderName: 'AHMED HASSAN',
    cvv: '123',
    cardType: 'Digital Rupay Debit',
    isVirtual: true,
    isActivated: true,
    dailyLimit: 100000,
    monthlyLimit: 500000,
    usedToday: 15000,
    usedThisMonth: 45000
  }

  const recentTransactions = [
    {
      id: 1,
      type: 'debit',
      amount: 2500,
      description: 'Al-Madina Supermarket',
      date: '2025-01-03',
      time: '14:30',
      status: 'completed',
      category: 'grocery',
      location: 'Delhi, India',
      halalVerified: true,
      upiRef: 'UPI/432156789012'
    },
    {
      id: 2,
      type: 'credit',
      amount: 50000,
      description: 'Salary Credit - Halal Inc',
      date: '2025-01-01',
      time: '09:00',
      status: 'completed',
      category: 'salary',
      location: 'Delhi, India',
      halalVerified: true,
      upiRef: 'NEFT/876543210987'
    },
    {
      id: 3,
      type: 'debit',
      amount: 15000,
      description: 'Zakat Payment - Al-Khair Foundation',
      date: '2024-12-30',
      time: '16:45',
      status: 'completed',
      category: 'charity',
      location: 'Delhi, India',
      halalVerified: true,
      upiRef: 'UPI/567891234567'
    },
    {
      id: 4,
      type: 'debit',
      amount: 8500,
      description: 'Bismillah Electronics',
      date: '2024-12-28',
      time: '11:20',
      status: 'completed',
      category: 'shopping',
      location: 'Delhi, India',
      halalVerified: true,
      upiRef: 'UPI/234567890123'
    }
  ]

  const investments = [
    {
      name: 'Halal Equity Fund',
      amount: 150000,
      returns: 8.5,
      status: 'profitable',
      type: 'Sharia Compliant'
    },
    {
      name: 'Islamic Sukuk Bonds',
      amount: 200000,
      returns: 6.2,
      status: 'stable',
      type: 'Fixed Income'
    },
    {
      name: 'Gold Backed Securities',
      amount: 75000,
      returns: 12.3,
      status: 'profitable',
      type: 'Commodity'
    }
  ]

  const quickActions = [
    { id: 'send-money', icon: Send, label: 'Send Money', color: 'bg-blue-500' },
    { id: 'request-money', icon: Plus, label: 'Request Money', color: 'bg-green-500' },
    { id: 'pay-bills', icon: ArrowUpDown, label: 'Pay Bills', color: 'bg-purple-500' },
    { id: 'qr-scan', icon: QrCode, label: 'QR Pay', color: 'bg-orange-500' },
    { id: 'investments', icon: TrendingUp, label: 'Investments', color: 'bg-indigo-500' },
    { id: 'zakat', icon: Award, label: 'Zakat Calculator', color: 'bg-emerald-500' }
  ]

  const handleQuickAction = (actionId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success(`${actionId} feature launched!`)
    }, 1000)
  }

  const handleTransfer = () => {
    if (!transferAmount || !transferTo) {
      toast.error('Please fill all transfer details')
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success(`₹${transferAmount} transferred successfully!`)
      setTransferAmount('')
      setTransferTo('')
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl text-emerald-900">Premium Islamic Banking</h1>
              <p className="text-emerald-700 text-sm md:text-base">Sharia-Compliant Digital Banking & Rupay Debit Card</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">100% Halal Certified</Badge>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">RBI Licensed</Badge>
            <Badge className="bg-amber-100 text-amber-800 border-amber-200">AI-Powered</Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 md:mb-8">
            <TabsTrigger value="dashboard" className="text-xs md:text-sm">Dashboard</TabsTrigger>
            <TabsTrigger value="card" className="text-xs md:text-sm">Digital Card</TabsTrigger>
            <TabsTrigger value="transactions" className="text-xs md:text-sm">Transactions</TabsTrigger>
            <TabsTrigger value="investments" className="text-xs md:text-sm">Investments</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs md:text-sm">Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Account Balance Card */}
            <Card className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22white%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%222%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
              <CardHeader className="relative">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-emerald-100 text-sm">Available Balance</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-2xl md:text-3xl font-bold">
                        {showBalance ? `₹${accountData.balance.toLocaleString('en-IN')}` : '₹••••••'}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowBalance(!showBalance)}
                        className="text-emerald-200 hover:text-white hover:bg-emerald-500/30"
                      >
                        {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-200 text-xs">Account No.</div>
                    <div className="text-sm font-mono">{accountData.accountNumber.slice(-4)}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-200">Account Holder</span>
                  <span>{accountData.accountHolder}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-emerald-200">Account Type</span>
                  <span>{accountData.accountType}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold text-emerald-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <motion.div
                      key={action.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center gap-2 hover:shadow-lg transition-all"
                        onClick={() => handleQuickAction(action.id)}
                        disabled={isLoading}
                      >
                        <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs text-center">{action.label}</span>
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Recent Transactions Preview */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-emerald-900">Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('transactions')}>
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? <Plus className="w-5 h-5" /> : <Minus className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{transaction.description}</div>
                          <div className="text-xs text-gray-600 flex items-center gap-2">
                            <span>{transaction.date} • {transaction.time}</span>
                            {transaction.halalVerified && (
                              <Badge className="bg-emerald-100 text-emerald-700 text-xs px-1 py-0">✓ Halal</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Investment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Islamic Investment Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {investments.map((investment, index) => (
                    <div key={index} className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
                      <div className="font-medium text-sm mb-1">{investment.name}</div>
                      <div className="text-xs text-gray-600 mb-2">{investment.type}</div>
                      <div className="font-bold text-lg text-emerald-700">₹{investment.amount.toLocaleString('en-IN')}</div>
                      <div className={`text-sm font-medium ${
                        investment.returns > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        +{investment.returns}% returns
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Digital Card Tab */}
          <TabsContent value="card" className="space-y-6">
            {/* Digital Debit Card */}
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <div className="relative">
                  {/* Card Design */}
                  <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-xl p-6 text-white relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22white%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
                    
                    {/* Card Header */}
                    <div className="relative flex justify-between items-start mb-8">
                      <div>
                        <div className="text-emerald-200 text-xs uppercase tracking-wide">Digital Rupay Debit</div>
                        <div className="text-white text-sm font-semibold">Islamic Banking</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-300" />
                        <div className="text-xs text-emerald-200">Secured</div>
                      </div>
                    </div>

                    {/* Card Number */}
                    <div className="relative mb-6">
                      <div className="text-emerald-200 text-xs mb-1">Card Number</div>
                      <div className="font-mono text-lg tracking-wider">
                        {showCardDetails ? cardData.cardNumber : '•••• •••• •••• ' + cardData.cardNumber.slice(-4)}
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="relative flex justify-between items-end">
                      <div>
                        <div className="text-emerald-200 text-xs mb-1">Card Holder</div>
                        <div className="font-semibold text-sm">{cardData.holderName}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-200 text-xs mb-1">Valid Thru</div>
                        <div className="font-mono text-sm">{showCardDetails ? cardData.expiryDate : '••/••'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-200 text-xs mb-1">CVV</div>
                        <div className="font-mono text-sm">{showCardDetails ? cardData.cvv : '•••'}</div>
                      </div>
                    </div>

                    {/* Chip */}
                    <div className="absolute top-16 left-6 w-8 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md"></div>
                  </div>

                  {/* Card Controls */}
                  <div className="flex justify-center gap-4 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCardDetails(!showCardDetails)}
                      className="flex items-center gap-2"
                    >
                      {showCardDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showCardDetails ? 'Hide' : 'Show'} Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCardLocked(!cardLocked)}
                      className={`flex items-center gap-2 ${cardLocked ? 'text-red-600 border-red-300' : 'text-green-600 border-green-300'}`}
                    >
                      {cardLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      {cardLocked ? 'Unlock' : 'Lock'} Card
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card Usage Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-900">Card Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Daily Limit Usage</span>
                    <span>₹{cardData.usedToday.toLocaleString('en-IN')} / ₹{cardData.dailyLimit.toLocaleString('en-IN')}</span>
                  </div>
                  <Progress value={(cardData.usedToday / cardData.dailyLimit) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Monthly Limit Usage</span>
                    <span>₹{cardData.usedThisMonth.toLocaleString('en-IN')} / ₹{cardData.monthlyLimit.toLocaleString('en-IN')}</span>
                  </div>
                  <Progress value={(cardData.usedThisMonth / cardData.monthlyLimit) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Card Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-900">Premium Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Smartphone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm font-medium">UPI Enabled</div>
                    <div className="text-xs text-gray-600">Instant Payments</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-medium">100% Secure</div>
                    <div className="text-xs text-gray-600">End-to-End Encryption</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Fingerprint className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm font-medium">Biometric Auth</div>
                    <div className="text-xs text-gray-600">Advanced Security</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Globe className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-sm font-medium">Global Acceptance</div>
                    <div className="text-xs text-gray-600">Worldwide Usage</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            {/* Transfer Money */}
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-900 flex items-center gap-2">
                  <Send className="w-5 h-5 text-emerald-600" />
                  Send Money
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Recipient UPI ID or Phone</label>
                    <Input
                      placeholder="recipient@upi or +91 9876543210"
                      value={transferTo}
                      onChange={(e) => setTransferTo(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amount (₹)</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleTransfer} 
                  disabled={isLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {isLoading ? 'Processing...' : 'Send Money'}
                </Button>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-900">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <motion.div
                      key={transaction.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gray-50 rounded-lg border cursor-pointer"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? <Plus className="w-6 h-6" /> : <Minus className="w-6 h-6" />}
                          </div>
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                              <span>{transaction.date} • {transaction.time}</span>
                              {transaction.halalVerified && (
                                <Badge className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1">✓ Halal Verified</Badge>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {transaction.location}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold text-lg ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                          </div>
                          <div className="text-xs text-gray-500">{transaction.upiRef}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Sharia-Compliant Investments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-semibold text-lg">{investment.name}</div>
                          <div className="text-sm text-gray-600">{investment.type}</div>
                        </div>
                        <Badge className={`${
                          investment.status === 'profitable' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {investment.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-2xl font-bold text-emerald-700">₹{investment.amount.toLocaleString('en-IN')}</div>
                          <div className="text-sm text-gray-600">Current Value</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xl font-bold ${
                            investment.returns > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            +{investment.returns}%
                          </div>
                          <div className="text-sm text-gray-600">Annual Returns</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Investment Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-900 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-emerald-600" />
                  AI-Powered Investment Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Recommended for You</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      Based on your spending patterns and risk profile, consider investing in 
                      <strong> Islamic Technology Fund</strong> with expected returns of 14.2% annually.
                    </div>
                  </div>
                  <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Trending</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      Halal Real Estate Investment Trust (REIT) is gaining momentum with 
                      <strong> 18.5% returns</strong> in the last quarter.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-900">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Account Holder Name</label>
                    <div className="font-medium">{accountData.accountHolder}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Account Number</label>
                    <div className="font-mono flex items-center gap-2">
                      {accountData.accountNumber}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(accountData.accountNumber)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">IFSC Code</label>
                    <div className="font-mono flex items-center gap-2">
                      {accountData.ifscCode}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(accountData.ifscCode)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Branch Name</label>
                    <div className="text-sm">{accountData.branchName}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Biometric Authentication</div>
                    <div className="text-sm text-gray-600">Use fingerprint for secure access</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Transaction Notifications</div>
                    <div className="text-sm text-gray-600">Get instant alerts for all transactions</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Halal Verification Alerts</div>
                    <div className="text-sm text-gray-600">Get notified about merchant Halal status</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">AI-Powered Fraud Detection</div>
                    <div className="text-sm text-gray-600">Advanced security monitoring</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Future Banking Features */}
            <Card className="border-2 border-gradient-to-r from-purple-200 to-pink-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="text-purple-900 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Future Banking Features (Beta)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="font-medium">AI Zakat Calculator</div>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">Coming Soon</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Automatically calculate your Zakat obligations based on your wealth and transactions using advanced AI algorithms.
                  </div>
                </div>
                
                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Scan className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="font-medium">Blockchain Halal Verification</div>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">Beta</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Instant merchant verification using blockchain technology to ensure 100% Halal compliance.
                  </div>
                </div>
                
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Globe className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="font-medium">Global Islamic Banking Network</div>
                    <Badge className="bg-green-100 text-green-800 text-xs">2025</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Connect with Islamic banks worldwide for seamless international transactions and investments.
                  </div>
                </div>
                
                <div className="p-4 bg-white rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Fingerprint className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="font-medium">Voice-Activated Banking</div>
                    <Badge className="bg-orange-100 text-orange-800 text-xs">2025</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Perform banking operations using voice commands with advanced Islamic context understanding.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}