import { Button } from './ui/button'
import { BookOpen, Users, MapPin, Heart, Sun, User } from 'lucide-react'

interface QuickNavProps {
  onNavigate?: (page: string) => void
  currentPage?: string
}

const quickLinks = [
  { id: 'quran', label: 'Quran', icon: BookOpen, color: 'bg-amber-600 hover:bg-amber-700' },
  { id: 'community', label: 'Community', icon: Users, color: 'bg-teal-600 hover:bg-teal-700' },
  { id: 'maps', label: 'Maps', icon: MapPin, color: 'bg-indigo-600 hover:bg-indigo-700' },
  { id: 'charity', label: 'Charity', icon: Heart, color: 'bg-rose-600 hover:bg-rose-700' },
  { id: 'duas', label: 'Duas', icon: Sun, color: 'bg-orange-600 hover:bg-orange-700' },
  { id: 'profile', label: 'Profile', icon: User, color: 'bg-purple-600 hover:bg-purple-700' },
]

export function QuickNav({ onNavigate, currentPage }: QuickNavProps) {
  if (!onNavigate) return null

  return (
    <div className="bg-white py-8 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Quick Navigation</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon
            const isActive = currentPage === link.id
            
            return (
              <Button
                key={link.id}
                variant={isActive ? "secondary" : "default"}
                className={`${isActive ? 'bg-gray-200 text-gray-800' : `${link.color} text-white`} p-4 h-auto flex-col space-y-2`}
                onClick={() => onNavigate(link.id)}
                disabled={isActive}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm">{link.label}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}