import { Button } from './ui/button'
import { BookOpen, MapPin, Users, GraduationCap, Shield, Heart, Sun, AlertTriangle, MessageCircle, HandHeart, DollarSign, UserPlus, ShoppingCart, TrendingUp, Compass, ArrowRight, Grid, Bot, Car, CreditCard } from 'lucide-react'
import logoImage from 'figma:asset/59574aba7471d4e7c082b728f3637a2664302b6a.png'

interface SitemapMenuProps {
  onNavigate: (page: string) => void
  currentPage: string
}

const sitemap = {
  'Core Features': [
    { id: 'quran', label: 'Quran Reader & Study Hub', icon: BookOpen, description: 'Read Quran with translations, join study groups, track memorization progress', stats: '2,156 daily sessions' },
    { id: 'maps', label: 'Islamic Locations & Services', icon: MapPin, description: 'Find nearby mosques, halal restaurants, Islamic centers, and community events', stats: '45,892 locations mapped' },
    { id: 'community', label: 'Community Hub', icon: Users, description: 'Connect with local Muslims, join events, share experiences, build lasting friendships', stats: '12,340 active members' },
  ],
  'AI & Intelligence': [
    { id: 'super-ai', label: 'Super AI Guide', icon: Bot, description: 'Advanced AI for Islamic guidance, career advice, life decisions, and scholar connections', stats: '50K+ questions answered' },
    { id: 'imam-chat', label: 'Ask Imam - AI Assistant', icon: MessageCircle, description: 'Get instant guidance on Islamic matters with our AI-powered imam chatbot', stats: '12,450 questions answered' },
  ],
  'Learning & Growth': [
    { id: 'learning', label: 'Islamic Learning Center', icon: GraduationCap, description: 'Comprehensive Islamic education with courses, lectures, and certification programs', stats: '890 courses available' },
    { id: 'duas', label: 'Daily Duas & Dhikr', icon: Sun, description: 'Morning and evening duas, dhikr counter, personalized reminders and progress tracking', stats: '156K duas recited today' },
    { id: 'leadership', label: 'Leadership Portal', icon: Shield, description: 'Community leadership tools, mosque management, and administrative features', stats: '247 mosque leaders' },
  ],
  'Services & Finance': [
    { id: 'islamic-banking', label: 'Premium Islamic Banking', icon: CreditCard, description: 'Complete Sharia-compliant digital banking with Rupay debit card, UPI, and AI-powered features', stats: '₹2.34L average balance' },
    { id: 'charity', label: 'Charity & Zakat Tracker', icon: Heart, description: 'Manage your charitable giving, track zakat, support verified causes with transparency', stats: '₹2.3M donated this month' },
    { id: 'finance', label: 'Islamic Finance Hub', icon: DollarSign, description: 'Halal investment tracking, Islamic banking, financial planning with Sharia compliance', stats: '₹45L in halal investments' },
    { id: 'takaful', label: 'Halal Takaful Insurance', icon: Car, description: 'Shariah-compliant insurance for health, life, vehicle, and business protection', stats: '₹1.85Cr total coverage' },
    { id: 'halal-supermarket', label: 'Halal Supermarket', icon: ShoppingCart, description: '10-minute delivery of certified halal groceries, meat, and daily essentials', stats: '5,670 orders today' },
    { id: 'halal-sharemarket', label: 'Halal Sharemarket Guide', icon: TrendingUp, description: 'Complete guide to Sharia-compliant investing with live portfolio tracking', stats: '₹12.5L portfolio value' },
  ],
  'Community Support': [
    { id: 'volunteer', label: 'Volunteer Coordination Hub', icon: HandHeart, description: 'Organize and participate in community service, disaster relief, and social initiatives', stats: '892 active volunteers' },
    { id: 'marriage', label: 'Halal Marriage Portal', icon: UserPlus, description: 'Connect with potential life partners through our secure, family-oriented platform', stats: '2,340 successful matches' },
    { id: 'family-streak', label: 'Family Streak System', icon: Users, description: 'Build spiritual habits together as a family with shared goals and achievements', stats: '1,456 family groups' },
    { id: 'emergency', label: 'Emergency Alert System', icon: AlertTriangle, description: 'Location-based emergency alerts, crisis support, and community rapid response network', stats: '24/7 monitoring active' },
  ]
}

export function SitemapMenu({ onNavigate, currentPage }: SitemapMenuProps) {
  const totalFeatures = Object.values(sitemap).reduce((acc, features) => acc + features.length, 0)

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white">
      {/* Header */}
      <div className="p-6 border-b border-emerald-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
            <Grid className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-emerald-100">App Sitemap</h2>
            <p className="text-sm text-emerald-300">{totalFeatures} Integrated Features</p>
          </div>
        </div>
        <div className="bg-emerald-800/50 rounded-lg p-3 border border-emerald-600/30">
          <div className="flex items-center gap-2 mb-1">
            <img 
              src={logoImage} 
              alt="My Emaan Logo" 
              className="h-5 w-auto object-contain filter brightness-0 invert"
            />
            <div className="text-sm text-emerald-200">My Emaan</div>
          </div>
          <div className="text-xs text-emerald-300">Your Complete Islamic Community Platform</div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-600 hover:scrollbar-thumb-emerald-500 p-4">
        <div className="space-y-6">
          {Object.entries(sitemap).map(([category, features]) => (
            <div key={category} className="space-y-3">
              {/* Category Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-emerald-700/50">
                <Compass className="w-4 h-4 text-emerald-400" />
                <h3 className="font-semibold text-emerald-100">{category}</h3>
                <div className="ml-auto text-xs text-emerald-400 bg-emerald-800/50 px-2 py-1 rounded">
                  {features.length} features
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                {features.map((feature) => {
                  const Icon = feature.icon
                  const isActive = currentPage === feature.id
                  
                  return (
                    <button
                      key={feature.id}
                      onClick={() => onNavigate(feature.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 group hover:scale-[0.99] ${
                        isActive
                          ? 'bg-emerald-600 border border-emerald-500 shadow-lg'
                          : 'bg-emerald-800/30 border border-emerald-700/50 hover:bg-emerald-700/50 hover:border-emerald-600/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isActive ? 'bg-emerald-500' : 'bg-emerald-700/50 group-hover:bg-emerald-600/50'
                        }`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-medium text-sm truncate ${
                              isActive ? 'text-white' : 'text-emerald-100 group-hover:text-white'
                            }`}>
                              {feature.label}
                            </h4>
                            {isActive && (
                              <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse flex-shrink-0"></div>
                            )}
                          </div>
                          
                          <p className={`text-xs mb-2 leading-relaxed ${
                            isActive ? 'text-emerald-100' : 'text-emerald-300 group-hover:text-emerald-200'
                          }`}>
                            {feature.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className={`text-xs font-medium px-2 py-1 rounded ${
                              isActive 
                                ? 'bg-emerald-500/50 text-emerald-100' 
                                : 'bg-emerald-700/50 text-emerald-300 group-hover:bg-emerald-600/50 group-hover:text-emerald-200'
                            }`}>
                              {feature.stats}
                            </div>
                            <ArrowRight className={`w-3 h-3 transition-transform ${
                              isActive ? 'text-emerald-200' : 'text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-1'
                            }`} />
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-emerald-700 bg-emerald-800/50">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-emerald-700/50 rounded-lg p-2">
            <div className="text-lg font-bold text-emerald-100">45,892</div>
            <div className="text-xs text-emerald-300">Active Members</div>
          </div>
          <div className="bg-emerald-700/50 rounded-lg p-2">
            <div className="text-lg font-bold text-emerald-100">1,247</div>
            <div className="text-xs text-emerald-300">Partner Mosques</div>
          </div>
        </div>
        <div className="mt-3 text-center">
          <div className="text-xs text-emerald-300">
            Connecting Islamic Communities Worldwide
          </div>
        </div>
      </div>
    </div>
  )
}