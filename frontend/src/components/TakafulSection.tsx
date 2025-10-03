import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Progress } from './ui/progress'
import { 
  Shield, 
  Heart, 
  Car, 
  Building2, 
  Users, 
  Calculator, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  PieChart,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Star,
  Award,
  Banknote,
  Clock,
  ArrowRight
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

const takafulCategories = [
  {
    id: 'health',
    title: 'Health Takaful',
    icon: Heart,
    color: 'bg-rose-500',
    description: 'Comprehensive health coverage following Shariah principles',
    features: ['Cashless Treatment', 'Family Coverage', 'Pre & Post Hospitalization', 'Annual Health Check-up'],
    premium: '₹8,500/year',
    coverage: 'Up to ₹10,00,000'
  },
  {
    id: 'life',
    title: 'Life Takaful',
    icon: Shield,
    color: 'bg-emerald-500',
    description: 'Family financial protection through Islamic life coverage',
    features: ['Death Benefit', 'Critical Illness Cover', 'Maturity Benefits', 'Tax Benefits'],
    premium: '₹15,000/year',
    coverage: 'Up to ₹50,00,000'
  },
  {
    id: 'vehicle',
    title: 'Vehicle Accidental Takaful',
    icon: Car,
    color: 'bg-blue-500',
    description: 'Shariah-compliant motor insurance for vehicles',
    features: ['Accident Coverage', 'Third Party Liability', 'Vehicle Damage', '24/7 Roadside Assistance'],
    premium: '₹12,000/year',
    coverage: 'Up to ₹25,00,000'
  },
  {
    id: 'business',
    title: 'Business Takaful',
    icon: Building2,
    color: 'bg-purple-500',
    description: 'Complete business protection under Islamic guidelines',
    features: ['Property Coverage', 'Liability Protection', 'Business Interruption', 'Equipment Coverage'],
    premium: '₹35,000/year',
    coverage: 'Up to ₹1,00,00,000'
  }
]

const claims = [
  { id: 1, type: 'Health', status: 'Approved', amount: '₹45,000', date: '2024-12-15' },
  { id: 2, type: 'Vehicle', status: 'Processing', amount: '₹18,000', date: '2024-12-20' },
  { id: 3, type: 'Life', status: 'Approved', amount: '₹2,50,000', date: '2024-12-10' }
]

export function TakafulSection() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedCategory, setSelectedCategory] = useState(takafulCategories[0])
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    coverageAmount: '',
    category: 'health'
  })

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Quote request submitted successfully! Our Takaful advisor will contact you within 24 hours.')
    setQuoteForm({
      name: '',
      email: '',
      phone: '',
      age: '',
      coverageAmount: '',
      category: 'health'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Shield className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold">Halal Takaful Insurance</h1>
            </div>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
              Protect your family and assets with Shariah-compliant insurance solutions
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Learn Takaful
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="quote" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Get Quote
            </TabsTrigger>
            <TabsTrigger value="claims" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              My Claims
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm">Total Policies</p>
                      <p className="text-2xl font-bold">4</p>
                    </div>
                    <FileText className="w-8 h-8 text-emerald-200" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-rose-500 to-rose-600 text-white border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-rose-100 text-sm">Active Claims</p>
                      <p className="text-2xl font-bold">1</p>
                    </div>
                    <Clock className="w-8 h-8 text-rose-200" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Coverage</p>
                      <p className="text-2xl font-bold">₹1.85Cr</p>
                    </div>
                    <Shield className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Annual Premium</p>
                      <p className="text-2xl font-bold">₹70,500</p>
                    </div>
                    <Banknote className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Categories Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {takafulCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Card key={category.id} className="hover:shadow-lg transition-all duration-200 border border-gray-200 bg-white">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${category.color} text-white rounded-lg`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                          <Badge variant="secondary" className="mt-1">{category.premium}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-gray-600 text-sm">{category.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Coverage:</span>
                          <span className="font-medium">{category.coverage}</span>
                        </div>
                        <Progress value={75} className="h-2" />
                        <p className="text-xs text-gray-500">75% Recommended Coverage</p>
                      </div>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => {
                          setSelectedCategory(category)
                          setActiveTab('products')
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium">Health Takaful Premium Paid</p>
                        <p className="text-sm text-gray-500">December 20, 2024</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">₹8,500</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Vehicle Claim Processing</p>
                        <p className="text-sm text-gray-500">December 18, 2024</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6 mt-6">
            <Card className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  What is Takaful? Understanding Islamic Insurance
                </CardTitle>
                <CardDescription className="text-emerald-100">
                  Learn how Takaful differs from conventional insurance and why it's Halal
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Takaful Explanation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-emerald-700">How Takaful Becomes Halal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Mutual Cooperation (Ta'awun)</p>
                        <p className="text-sm text-gray-600">Based on mutual help and shared responsibility among participants</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium">No Gharar (Uncertainty)</p>
                        <p className="text-sm text-gray-600">Transparent terms and conditions without excessive uncertainty</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium">No Riba (Interest)</p>
                        <p className="text-sm text-gray-600">Investment in Shariah-compliant assets only</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Shared Profit & Loss</p>
                        <p className="text-sm text-gray-600">Participants share both profits and losses fairly</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conventional vs Takaful */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-rose-700">Takaful vs Conventional Insurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <h4 className="font-medium text-emerald-700 mb-2">✓ Takaful (Halal)</h4>
                      <ul className="space-y-1 text-sm text-emerald-600">
                        <li>• Mutual cooperation model</li>
                        <li>• Shariah-compliant investments</li>
                        <li>• Surplus shared with participants</li>
                        <li>• Transparent fee structure</li>
                      </ul>
                    </div>
                    <div className="bg-rose-50 p-4 rounded-lg">
                      <h4 className="font-medium text-rose-700 mb-2">✗ Conventional Insurance</h4>
                      <ul className="space-y-1 text-sm text-rose-600">
                        <li>• Profit-based business model</li>
                        <li>• May invest in non-Halal assets</li>
                        <li>• Company keeps all profits</li>
                        <li>• May contain elements of Gharar</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shariah Board */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  Our Shariah Advisory Board
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Award className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h4 className="font-medium">Dr. Ahmad Rahman</h4>
                    <p className="text-sm text-gray-600">Senior Islamic Scholar</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Award className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h4 className="font-medium">Sheikh Muhammad Ali</h4>
                    <p className="text-sm text-gray-600">Takaful Expert</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Award className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h4 className="font-medium">Dr. Fatima Ibrahim</h4>
                    <p className="text-sm text-gray-600">Islamic Finance Advisor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Category Selection */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700">Select Category</h3>
                {takafulCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory.id === category.id ? "default" : "outline"}
                      className={`w-full justify-start gap-3 p-3 h-auto ${
                        selectedCategory.id === category.id 
                          ? 'bg-emerald-600 hover:bg-emerald-700' 
                          : 'hover:bg-emerald-50'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <Icon className="w-5 h-5" />
                      <div className="text-left">
                        <p className="font-medium">{category.title}</p>
                        <p className="text-xs opacity-70">{category.premium}</p>
                      </div>
                    </Button>
                  )
                })}
              </div>

              {/* Product Details */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 ${selectedCategory.color} text-white rounded-lg`}>
                        <selectedCategory.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{selectedCategory.title}</CardTitle>
                        <CardDescription>{selectedCategory.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Premium & Coverage */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-emerald-50 rounded-lg">
                        <p className="text-sm text-emerald-600 font-medium">Annual Premium</p>
                        <p className="text-2xl font-bold text-emerald-700">{selectedCategory.premium}</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600 font-medium">Maximum Coverage</p>
                        <p className="text-2xl font-bold text-blue-700">{selectedCategory.coverage}</p>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h4 className="font-medium mb-3">Key Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedCategory.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-medium mb-3">Additional Benefits</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span>No Medical Check-up required up to ₹5,00,000</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span>Instant Policy Issuance</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span>24/7 Customer Support</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span>Shariah Compliance Guaranteed</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1"
                        onClick={() => setActiveTab('quote')}
                      >
                        Get Quote
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Download Brochure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Quote Tab */}
          <TabsContent value="quote" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  Get Your Takaful Quote
                </CardTitle>
                <CardDescription>
                  Fill in your details to get a personalized Shariah-compliant insurance quote
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuoteSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter your age"
                        value={quoteForm.age}
                        onChange={(e) => setQuoteForm({...quoteForm, age: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Takaful Category *</Label>
                      <Select value={quoteForm.category} onValueChange={(value) => setQuoteForm({...quoteForm, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="health">Health Takaful</SelectItem>
                          <SelectItem value="life">Life Takaful</SelectItem>
                          <SelectItem value="vehicle">Vehicle Accidental Takaful</SelectItem>
                          <SelectItem value="business">Business Takaful</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coverage">Desired Coverage Amount</Label>
                      <Select value={quoteForm.coverageAmount} onValueChange={(value) => setQuoteForm({...quoteForm, coverageAmount: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select coverage amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5lakh">₹5,00,000</SelectItem>
                          <SelectItem value="10lakh">₹10,00,000</SelectItem>
                          <SelectItem value="25lakh">₹25,00,000</SelectItem>
                          <SelectItem value="50lakh">₹50,00,000</SelectItem>
                          <SelectItem value="1crore">₹1,00,00,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Get Free Quote
                    <Calculator className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Phone className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-medium">Call Us</h4>
                  <p className="text-sm text-gray-600">1800-123-TAKAFUL</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Mail className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-medium">Email Us</h4>
                  <p className="text-sm text-gray-600">info@halaltagkaful.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-medium">Visit Office</h4>
                  <p className="text-sm text-gray-600">Mumbai, Delhi, Bangalore</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Claims Tab */}
          <TabsContent value="claims" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  My Claims History
                </CardTitle>
                <CardDescription>Track your Takaful claims and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {claims.map((claim) => (
                    <div key={claim.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          claim.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 
                          claim.status === 'Processing' ? 'bg-amber-100 text-amber-600' : 
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {claim.status === 'Approved' ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium">{claim.type} Takaful Claim</p>
                          <p className="text-sm text-gray-500">Claim Date: {claim.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{claim.amount}</p>
                        <Badge variant={claim.status === 'Approved' ? 'default' : 'secondary'}>
                          {claim.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" className="w-full">
                    File New Claim
                    <FileText className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Claim Process */}
            <Card>
              <CardHeader>
                <CardTitle>How to File a Claim</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">1</div>
                    <h4 className="font-medium text-sm">Report Incident</h4>
                    <p className="text-xs text-gray-600 mt-1">Call our helpline immediately</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">2</div>
                    <h4 className="font-medium text-sm">Submit Documents</h4>
                    <p className="text-xs text-gray-600 mt-1">Upload required documents</p>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">3</div>
                    <h4 className="font-medium text-sm">Assessment</h4>
                    <p className="text-xs text-gray-600 mt-1">Our team reviews your claim</p>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full mx-auto mb-2 flex items-center justify-center font-bold">4</div>
                    <h4 className="font-medium text-sm">Settlement</h4>
                    <p className="text-xs text-gray-600 mt-1">Receive your claim amount</p>
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