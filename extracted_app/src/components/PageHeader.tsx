import { Button } from './ui/button'
import { ChevronLeft, Home } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description?: string
  imageSrc?: string
  onNavigateHome?: () => void
  children?: React.ReactNode
  bgClass?: string
}

export function PageHeader({ 
  title, 
  description, 
  imageSrc, 
  onNavigateHome, 
  children,
  bgClass = "bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100"
}: PageHeaderProps) {
  return (
    <div className={`${bgClass} py-16`}>
      <div className="container mx-auto px-6">
        {/* Navigation */}
        {onNavigateHome && (
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={onNavigateHome}
              className="text-gray-600 hover:text-gray-800 hover:bg-white/80"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        )}

        {/* Header Content */}
        <div className="text-center mb-12">
          {imageSrc && (
            <img 
              src={imageSrc}
              alt={title}
              className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
            />
          )}
          
          <h1 className="text-4xl mb-4 text-gray-900 font-bold">{title}</h1>
          {description && (
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              {description}
            </p>
          )}
        </div>

        {children}
      </div>
    </div>
  )
}