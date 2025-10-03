import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ShoppingCart, Search, Clock, MapPin, Star, Plus, Minus, Filter, Truck, Timer, Heart, Package, CheckCircle } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const categories = [
  { id: 'fresh', name: 'Fresh Produce', icon: '🥬', items: 127 },
  { id: 'meat', name: 'Halal Meat', icon: '🥩', items: 89 },
  { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛', items: 45 },
  { id: 'pantry', name: 'Pantry Staples', icon: '🍚', items: 234 },
  { id: 'snacks', name: 'Halal Snacks', icon: '🍪', items: 156 },
  { id: 'beverages', name: 'Beverages', icon: '🥤', items: 78 },
  { id: 'personal', name: 'Personal Care', icon: '🧴', items: 92 },
  { id: 'household', name: 'Household', icon: '🧽', items: 67 }
]

const featuredProducts = [
  {
    id: 1,
    name: "Fresh Halal Chicken",
    category: "Halal Meat",
    image: "https://images.unsplash.com/photo-1641470787994-3f4dfd90d7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxhbCUyMGZvb2QlMjBwcm9kdWN0cyUyMG1hcmtldHxlbnwxfHx8fDE3NTg0ODQ4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 1078,
    originalPrice: 1327,
    discount: 19,
    rating: 4.8,
    reviews: 124,
    deliveryTime: "8 mins",
    stock: 25,
    unit: "per kg",
    bestseller: true
  },
  {
    id: 2,
    name: "Organic Basmati Rice",
    category: "Pantry Staples",
    image: "https://images.unsplash.com/photo-1613527523952-f229fe16a8ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwZGVsaXZlcnklMjBzaG9wcGluZ3xlbnwxfHx8fDE3NTg0ODQ4ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 705,
    originalPrice: 829,
    discount: 15,
    rating: 4.6,
    reviews: 89,
    deliveryTime: "6 mins",
    stock: 42,
    unit: "5kg bag",
    bestseller: false
  },
  {
    id: 3,
    name: "Premium Dates Medjool",
    category: "Halal Snacks",
    image: "https://images.unsplash.com/photo-1641470787994-3f4dfd90d7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxhbCUyMGZvb2QlMjBwcm9kdWN0cyUyMG1hcmtldHxlbnwxfHx8fDE3NTg0ODQ4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 1410,
    originalPrice: 1659,
    discount: 15,
    rating: 4.9,
    reviews: 156,
    deliveryTime: "5 mins",
    stock: 18,
    unit: "500g pack",
    bestseller: true
  },
  {
    id: 4,
    name: "Halal Beef Mince",
    category: "Halal Meat",
    image: "https://images.unsplash.com/photo-1613527523952-f229fe16a8ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwZGVsaXZlcnklMjBzaG9wcGluZ3xlbnwxfHx8fDE3NTg0ODQ4ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 1576,
    originalPrice: 1908,
    discount: 17,
    rating: 4.7,
    reviews: 203,
    deliveryTime: "7 mins",
    stock: 12,
    unit: "per kg",
    bestseller: false
  },
  {
    id: 5,
    name: "Fresh Milk (Whole)",
    category: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1641470787994-3f4dfd90d7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxhbCUyMGZvb2QlMjBwcm9kdWN0cyUyMG1hcmtldHxlbnwxfHx8fDE3NTg0ODQ4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 290,
    originalPrice: 331,
    discount: 13,
    rating: 4.5,
    reviews: 67,
    deliveryTime: "4 mins",
    stock: 35,
    unit: "1L bottle",
    bestseller: false
  },
  {
    id: 6,
    name: "Halal Chicken Biryani Mix",
    category: "Pantry Staples",
    image: "https://images.unsplash.com/photo-1613527523952-f229fe16a8ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwZGVsaXZlcnklMjBzaG9wcGluZ3xlbnwxfHx8fDE3NTg0ODQ4ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 414,
    originalPrice: 497,
    discount: 17,
    rating: 4.8,
    reviews: 145,
    deliveryTime: "6 mins",
    stock: 28,
    unit: "200g pack",
    bestseller: true
  }
]

const quickDeals = [
  { name: "Free delivery on orders above ₹2,075", icon: "🚚", color: "green" },
  { name: "20% off on fresh produce", icon: "🥬", color: "emerald" },
  { name: "Buy 2 Get 1 Free on snacks", icon: "🍪", color: "amber" },
  { name: "10% cashback with HalalPay", icon: "💳", color: "blue" }
]

export function HalalSupermarketSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<{[key: number]: number}>({})
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }))
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[productId] > 1) {
        newCart[productId] -= 1
      } else {
        delete newCart[productId]
      }
      return newCart
    })
  }

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = featuredProducts.find(p => p.id === parseInt(productId))
      return total + (product ? product.price * quantity : 0)
    }, 0)
  }

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  }

  const filteredProducts = featuredProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl mb-2 text-green-900 font-bold">Halal Supermarket</h1>
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Timer className="w-4 h-4" />
                <span className="text-sm md:text-base">Delivery in 10 minutes</span>
              </div>
            </div>
          </div>
          <p className="text-green-800 max-w-2xl mx-auto text-sm md:text-base px-4">
            Fresh Halal groceries delivered to your doorstep in just 10 minutes
          </p>
        </div>

        {/* Live Time & Location Banner */}
        <div className="bg-white rounded-xl p-4 border border-green-200 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <div className="text-xs text-gray-500">Store Open 24/7</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Delivering to Bangalore</span>
            </div>
          </div>
        </div>

        {/* Quick Deals Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          {quickDeals.map((deal, index) => (
            <div key={index} className={`bg-gradient-to-r from-${deal.color}-100 to-${deal.color}-200 border border-${deal.color}-300 rounded-lg p-3 text-center`}>
              <div className="text-2xl mb-1">{deal.icon}</div>
              <div className={`text-xs text-${deal.color}-800 leading-tight`}>{deal.name}</div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search for halal products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 border-green-300 focus:ring-green-500 focus:border-green-500"
          />
          <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-2">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-auto">
            <TabsTrigger value="products" className="flex flex-col md:flex-row items-center gap-2 p-3">
              <Package className="w-4 h-4 text-green-600" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex flex-col md:flex-row items-center gap-2 p-3">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Categories</span>
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-xl transition-shadow bg-white border-green-200">
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      {product.bestseller && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                          Bestseller
                        </Badge>
                      )}
                      {product.discount > 0 && (
                        <Badge className="absolute top-2 right-2 bg-green-600 text-white text-xs">
                          {product.discount}% OFF
                        </Badge>
                      )}
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {product.deliveryTime}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        {product.category}
                      </Badge>
                      
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-600">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{product.unit}</div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-current" />
                          <span className="text-xs text-gray-600">{product.rating}</span>
                          <span className="text-xs text-gray-400">({product.reviews})</span>
                        </div>
                        <div className="text-xs text-gray-500">{product.stock} left</div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {cart[product.id] ? (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(product.id)}
                            className="w-8 h-8 p-0 border-green-300"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="font-medium w-8 text-center">{cart[product.id]}</span>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product.id)}
                            className="w-8 h-8 p-0 bg-green-600 hover:bg-green-700"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => addToCart(product.id)}
                          className="bg-green-600 hover:bg-green-700 text-white flex-1"
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2 border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer bg-white border-green-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.items} items</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Fixed Cart Bottom Bar - Mobile */}
        {getCartItemCount() > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg md:hidden">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-green-600">₹{getCartTotal().toFixed(2)}</div>
                <div className="text-xs text-gray-500">{getCartItemCount()} items</div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Checkout - 8 mins delivery
              </Button>
            </div>
          </div>
        )}

        {/* Cart Summary - Desktop */}
        {getCartItemCount() > 0 && (
          <Card className="fixed top-4 right-4 w-80 bg-white border-green-200 shadow-xl hidden md:block">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-green-900">
                <span>Your Cart</span>
                <Badge className="bg-green-600 text-white">{getCartItemCount()} items</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {Object.entries(cart).map(([productId, quantity]) => {
                  const product = featuredProducts.find(p => p.id === parseInt(productId))
                  if (!product) return null
                  return (
                    <div key={productId} className="flex items-center justify-between text-sm">
                      <div className="flex-1">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-gray-500">₹{product.price} × {quantity}</div>
                      </div>
                      <div className="font-medium">₹{(product.price * quantity).toFixed(2)}</div>
                    </div>
                  )
                })}
              </div>
              <div className="border-t pt-2 mt-3">
                <div className="flex items-center justify-between font-bold text-green-600">
                  <span>Total:</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                <Button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white">
                  <Truck className="w-4 h-4 mr-2" />
                  Checkout - 8 mins delivery
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}