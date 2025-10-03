import React, { useState } from 'react'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet'
import { Home, BookOpen, MapPin, User, Users, GraduationCap, Shield, Heart, Sun, Menu, AlertTriangle, MessageCircle, HandHeart, DollarSign, UserPlus, ShoppingCart, TrendingUp, Grid, Sparkles, Bot, Car, CreditCard, LogOut } from 'lucide-react'
import logoImage from './assets/59574aba7471d4e7c082b728f3637a2664302b6a.png'
import { SitemapMenu } from './components/SitemapMenu'
import { HomeSection } from './components/HomeSection'
import { EnhancedQuranSection } from './components/EnhancedQuranSection'
import { MapsSection } from './components/MapsSection'
import { ProfileSection } from './components/ProfileSection'
import { CommunitySection } from './components/CommunitySection'
import { LearningSection } from './components/LearningSection'
import { LeadershipSection } from './components/LeadershipSection'
import { CharitySection } from './components/CharitySection'
import { DuasSection } from './components/DuasSection'
import { EmergencyAlertSection } from './components/EmergencyAlertSection'
import { ImamChatSection } from './components/ImamChatSection'
import { FamilyStreakSection } from './components/FamilyStreakSection'
import { MarriagePortalSection } from './components/MarriagePortalSection'
import { IslamicFinanceSection } from './components/IslamicFinanceSection'
import { VolunteerSection } from './components/VolunteerSection'
import { HalalSupermarketSection } from './components/HalalSupermarketSection'
import { HalalSharemarketSection } from './components/HalalSharemarketSection'
import { InfluentialMuslimsSection } from './components/InfluentialMuslimsSection'
import { InfluentialMuslimProfile } from './components/InfluentialMuslimProfile'
import { SuperAISection } from './components/SuperAISection'
import { TakafulSection } from './components/TakafulSection'
import { IslamicBankingSection } from './components/IslamicBankingSection'
import { RunningTicker } from './components/RunningTicker'
import { Toaster } from './components/ui/sonner'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LoginScreen } from './components/LoginScreen'

const navigation = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'quran', label: 'Quran', icon: BookOpen },
  { id: 'maps', label: 'Maps', icon: MapPin },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'community', label: 'Community', icon: Users },
]

const moreNavigation = [
  { id: 'islamic-banking', label: 'Premium Islamic Banking', icon: CreditCard },
  { id: 'super-ai', label: 'Super AI Guide', icon: Bot },
  { id: 'learning', label: 'Islamic Learning', icon: GraduationCap },
  { id: 'leadership', label: 'Leadership Portal', icon: Shield },
  { id: 'charity', label: 'Charity Tracker', icon: Heart },
  { id: 'duas', label: 'Daily Duas', icon: Sun },
  { id: 'emergency', label: 'Emergency Alerts', icon: AlertTriangle },
  { id: 'imam-chat', label: 'Ask Imam', icon: MessageCircle },
  { id: 'family-streak', label: 'Family Streak', icon: Users },
  { id: 'marriage', label: 'Marriage Portal', icon: UserPlus },
  { id: 'finance', label: 'Islamic Finance', icon: DollarSign },
  { id: 'takaful', label: 'Halal Takaful Insurance', icon: Car },
  { id: 'volunteer', label: 'Volunteer Hub', icon: HandHeart },
  { id: 'halal-supermarket', label: 'Halal Supermarket (10min)', icon: ShoppingCart },
  { id: 'halal-sharemarket', label: 'Halal Sharemarket Guide', icon: TrendingUp },
  { id: 'influential-muslims', label: 'Influential Muslims', icon: Users },
]

const AppContent: React.FC = () => {
  const { user, logout, isLoading } = useAuth()
  const [currentPage, setCurrentPage] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSitemapOpen, setIsSitemapOpen] = useState(false)
  const [profileData, setProfileData] = useState<any>(null)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <img 
            src={logoImage} 
            alt="My Emaan Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <div className="text-emerald-600">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginScreen />
  }

  const navigateToPage = (pageId: string, data?: any) => {
    setCurrentPage(pageId)
    if (data) {
      setProfileData(data)
    }
    setIsMenuOpen(false)
    setIsSitemapOpen(false)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeSection onNavigate={navigateToPage} />
      case 'quran':
        return <EnhancedQuranSection />
      case 'maps':
        return <MapsSection />
      case 'profile':
        return <ProfileSection />
      case 'community':
        return <CommunitySection />
      case 'islamic-banking':
        return <IslamicBankingSection />
      case 'super-ai':
        return <SuperAISection />
      case 'learning':
        return <LearningSection />
      case 'leadership':
        return <LeadershipSection />
      case 'charity':
        return <CharitySection />
      case 'duas':
        return <DuasSection />
      case 'emergency':
        return <EmergencyAlertSection />
      case 'imam-chat':
        return <ImamChatSection />
      case 'family-streak':
        return <FamilyStreakSection />
      case 'marriage':
        return <MarriagePortalSection />
      case 'finance':
        return <IslamicFinanceSection />
      case 'takaful':
        return <TakafulSection />
      case 'volunteer':
        return <VolunteerSection />
      case 'halal-supermarket':
        return <HalalSupermarketSection />
      case 'halal-sharemarket':
        return <HalalSharemarketSection />
      case 'influential-muslims':
        return <InfluentialMuslimsSection onNavigate={navigateToPage} />
      case 'influential-profile':
        return <InfluentialMuslimProfile 
          muslim={profileData?.muslim} 
          onBack={() => navigateToPage('influential-muslims')} 
        />
      default:
        return <HomeSection onNavigate={navigateToPage} />
    }
  }

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side Sitemap Menu Trigger */}
          <Sheet open={isSitemapOpen} onOpenChange={setIsSitemapOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Grid className="w-5 h-5 text-emerald-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>App Sitemap</SheetTitle>
                <SheetDescription>Navigate through all available features and sections of My Emaan</SheetDescription>
              </SheetHeader>
              <SitemapMenu onNavigate={navigateToPage} currentPage={currentPage} />
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="My Emaan Logo" 
              className="h-8 w-auto object-contain"
            />
            <span className="text-lg font-bold text-emerald-700 hidden sm:inline">My Emaan</span>
          </div>
          
          {/* Right Side Menu Trigger */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-5 h-5 text-emerald-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 border-l border-emerald-700 flex flex-col">
              <SheetHeader className="text-left mb-6 flex-shrink-0 border-b border-emerald-700 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <img 
                    src={logoImage} 
                    alt="My Emaan Logo" 
                    className="h-8 w-auto object-contain filter brightness-0 invert"
                  />
                  <SheetTitle className="text-emerald-100 text-xl">My Emaan</SheetTitle>
                </div>
                <SheetDescription className="text-emerald-300 text-sm">Islamic Community Unity Platform</SheetDescription>
              </SheetHeader>
              
              {/* Scrollable Menu Items with Custom Scrollbar */}
              <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-600 hover:scrollbar-thumb-emerald-500 pr-2">
                <div className="space-y-1 mb-6">
                  {/* Enhanced More Features Section */}
                  <div className="relative bg-gradient-to-br from-emerald-700/30 to-teal-700/30 rounded-xl p-4 border border-emerald-600/40 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 rounded-xl"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                          <span className="font-semibold text-emerald-100 text-sm">More Features</span>
                        </div>
                        <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 text-xs px-2 py-0.5">
                          Premium
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        {moreNavigation.map((item, index) => {
                          const Icon = item.icon
                          return (
                            <button
                              key={item.id}
                              onClick={() => navigateToPage(item.id)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group relative ${
                                currentPage === item.id
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transform scale-[0.98]'
                                  : 'text-emerald-100 hover:bg-emerald-600/40 hover:text-white hover:transform hover:scale-[0.99]'
                              }`}
                            >
                              <div className={`p-1.5 rounded-md ${
                                currentPage === item.id 
                                  ? 'bg-white/20' 
                                  : 'bg-emerald-600/30 group-hover:bg-emerald-500/40'
                              }`}>
                                <Icon className={`w-3.5 h-3.5 transition-all duration-200 ${
                                  currentPage === item.id 
                                    ? 'text-white' 
                                    : 'text-emerald-300 group-hover:text-white group-hover:scale-110'
                                }`} />
                              </div>
                              <span className="text-sm font-medium flex-1">{item.label}</span>
                              {/* Special badges for certain features */}
                              {(item.id === 'islamic-banking' || item.id === 'super-ai' || item.id === 'halal-supermarket' || item.id === 'influential-muslims') && (
                                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                              )}
                              {item.id === 'islamic-banking' && (
                                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-1 py-0 border-0">NEW</Badge>
                              )}
                              {currentPage === item.id && (
                                <div className="ml-auto w-2 h-2 bg-white/70 rounded-full animate-pulse"></div>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>

      {/* Bottom Navigation - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
        <div className="flex justify-around items-center py-2 px-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-0 ${
                  currentPage === item.id
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-gray-500 hover:text-emerald-600'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs truncate">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Running Ticker */}
      <RunningTicker />
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}