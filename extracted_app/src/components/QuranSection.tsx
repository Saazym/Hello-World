import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Slider } from './ui/slider'
import { Switch } from './ui/switch'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { 
  BookOpen, Star, Heart, Search, Play, Volume2, Bookmark, Settings, 
  Moon, Sun, Type, Languages, Download, Share2, Copy, Mic, 
  RotateCcw, SkipBack, SkipForward, Pause, Filter, Grid3X3,
  BookMarked, PenTool, Lightbulb, MessageSquare, Clock, Target,
  Headphones, RadioIcon, Globe, Zap, Brain, Eye, ChevronDown,
  ChevronUp, Menu, X, Plus, Minus, MoreVertical, Home, Library,
  Sparkles, Bot, AudioLines, NotebookPen, Layers, RefreshCw,
  FileText, Highlighter, Quote, ArrowLeft, ArrowRight,
  Volume1, VolumeX, Repeat, Shuffle, FastForward, Rewind
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface QuranSectionProps {
  onNavigate?: (page: string) => void
}

interface Surah {
  number: number
  name: string
  arabicName: string
  englishName: string
  verses: number
  revelation: 'Meccan' | 'Medinan'
  category: string
}

interface Translation {
  id: string
  name: string
  author: string
  language: string
  type: 'translation' | 'tafseer' | 'transliteration'
  quality: 'premium' | 'standard'
}

interface Verse {
  number: number
  arabic: string
  transliteration: string
  translation: string
  tafseer: string
  wordByWord: Array<{ arabic: string; translation: string; transliteration: string }>
  audioUrl?: string
  isBookmarked?: boolean
  userNote?: string
  tags?: string[]
}

interface AIInsight {
  type: 'context' | 'lesson' | 'reference' | 'grammar'
  title: string
  content: string
  confidence: number
}

// Sample Surah data
const surahs: Surah[] = [
  { number: 1, name: 'Al-Fatiha', arabicName: 'الفاتحة', englishName: 'The Opening', verses: 7, revelation: 'Meccan', category: 'Prayer Essential' },
  { number: 2, name: 'Al-Baqarah', arabicName: 'البقرة', englishName: 'The Cow', verses: 286, revelation: 'Medinan', category: 'Legal Guidance' },
  { number: 3, name: 'Al-Imran', arabicName: 'آل عمران', englishName: 'Family of Imran', verses: 200, revelation: 'Medinan', category: 'Prophetic Stories' },
  { number: 18, name: 'Al-Kahf', arabicName: 'الكهف', englishName: 'The Cave', verses: 110, revelation: 'Meccan', category: 'Friday Special' },
  { number: 36, name: 'Ya-Sin', arabicName: 'يس', englishName: 'Ya-Sin', verses: 83, revelation: 'Meccan', category: 'Heart of Quran' },
  { number: 67, name: 'Al-Mulk', arabicName: 'الملك', englishName: 'The Sovereignty', verses: 30, revelation: 'Meccan', category: 'Protection' },
  { number: 112, name: 'Al-Ikhlas', arabicName: 'الإخلاص', englishName: 'The Sincerity', verses: 4, revelation: 'Meccan', category: 'Core Belief' }
]

// Translation options
const translations: Translation[] = [
  { id: 'sahih', name: 'Sahih International', author: 'Saheeh International', language: 'English', type: 'translation', quality: 'premium' },
  { id: 'dr_khattab', name: 'The Clear Quran', author: 'Dr. Mustafa Khattab', language: 'English', type: 'translation', quality: 'premium' },
  { id: 'yusuf_ali', name: 'Yusuf Ali', author: 'Abdullah Yusuf Ali', language: 'English', type: 'translation', quality: 'standard' },
  { id: 'urdu_kanzul', name: 'Kanz-ul-Iman', author: 'Ahmed Raza Khan', language: 'Urdu', type: 'translation', quality: 'premium' },
  { id: 'hindi_suhel', name: 'Suhel Farooq Khan', author: 'Suhel Farooq Khan', language: 'Hindi', type: 'translation', quality: 'standard' }
]

export function QuranSection({ onNavigate }: QuranSectionProps) {
  // Reading State
  const [selectedSurah, setSelectedSurah] = useState(1)
  const [startVerse, setStartVerse] = useState(1)
  const [selectedTranslation, setSelectedTranslation] = useState('sahih')
  
  // UI State
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [arabicFontSize, setArabicFontSize] = useState(28)
  const [translationFontSize, setTranslationFontSize] = useState(18)
  const [showTransliteration, setShowTransliteration] = useState(true)
  const [showWordByWord, setShowWordByWord] = useState(false)
  const [showTafseer, setShowTafseer] = useState(false)
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPlayingVerse, setCurrentPlayingVerse] = useState<number | null>(null)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isLooping, setIsLooping] = useState(false)
  
  // AI Features
  const [activeAIVerse, setActiveAIVerse] = useState<number | null>(null)
  const [aiInsights, setAiInsights] = useState<Record<number, AIInsight[]>>({})
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  
  // Study Features
  const [searchQuery, setSearchQuery] = useState('')
  const [showSidebar, setShowSidebar] = useState(true)
  const [readingMode, setReadingMode] = useState<'study' | 'recitation' | 'memorization'>('study')

  // Get current surah
  const currentSurah = surahs.find(s => s.number === selectedSurah) || surahs[0]
  const currentTranslation = translations.find(t => t.id === selectedTranslation) || translations[0]

  // Generate sample verses for the selected surah
  const generateVerses = (surahNumber: number, startVerse: number): Verse[] => {
    const verses: Verse[] = []
    const maxVerses = Math.min(10, currentSurah.verses - startVerse + 1)
    
    for (let i = 0; i < maxVerses; i++) {
      const verseNumber = startVerse + i
      
      if (surahNumber === 1) {
        // Al-Fatiha verses
        const fatihaVerses = [
          {
            arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
            transliteration: 'Bismillahi r-rahmani r-raheem',
            translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
            tafseer: 'This is the Basmala, recited at the beginning of every chapter except At-Tawbah. It establishes Allah\'s absolute mercy and compassion.'
          },
          {
            arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
            transliteration: 'Alhamdu lillahi rabbi l-alameen',
            translation: '[All] praise is [due] to Allah, Lord of the worlds.',
            tafseer: 'All forms of praise and gratitude belong to Allah alone, Who is the Lord and Sustainer of all the worlds.'
          },
          {
            arabic: 'الرَّحْمَنِ الرَّحِيمِ',
            transliteration: 'Ar-rahmani r-raheem',
            translation: 'The Entirely Merciful, the Especially Merciful,',
            tafseer: 'This verse emphasizes Allah\'s mercy by mentioning two of His most beautiful names.'
          },
          {
            arabic: 'مَالِكِ يَوْمِ الدِّينِ',
            transliteration: 'Maliki yawmi d-deen',
            translation: 'Sovereign of the Day of Recompense.',
            tafseer: 'Allah is the ultimate judge and ruler of the Day of Judgment.'
          },
          {
            arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
            transliteration: 'Iyyaka na\'budu wa iyyaka nasta\'een',
            translation: 'It is You we worship and You we ask for help.',
            tafseer: 'This verse declares exclusive worship and seeking help from Allah alone.'
          },
          {
            arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
            transliteration: 'Ihdina s-sirata l-mustaqeem',
            translation: 'Guide us to the straight path -',
            tafseer: 'A supplication for divine guidance to the path of righteousness.'
          },
          {
            arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
            transliteration: 'Sirata l-ladhina an\'amta \'alayhim ghayri l-maghdubi \'alayhim wa la d-dalleen',
            translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
            tafseer: 'The path of the righteous, avoiding the way of those who earned Allah\'s displeasure or went astray.'
          }
        ]
        
        const verseData = fatihaVerses[verseNumber - 1] || fatihaVerses[0]
        
        verses.push({
          number: verseNumber,
          ...verseData,
          wordByWord: [
            { arabic: 'بِسْمِ', translation: 'In the name', transliteration: 'Bismi' },
            { arabic: 'اللَّهِ', translation: 'of Allah', transliteration: 'Allahi' },
            { arabic: 'الرَّحْمَنِ', translation: 'the Most Gracious', transliteration: 'ar-Rahman' },
            { arabic: 'الرَّحِيمِ', translation: 'the Most Merciful', transliteration: 'ar-Raheem' }
          ],
          isBookmarked: Math.random() > 0.7,
          userNote: Math.random() > 0.8 ? 'Personal reflection on this verse...' : undefined
        })
      } else {
        // Sample verses for other surahs
        verses.push({
          number: verseNumber,
          arabic: 'وَاللَّهُ أَعْلَمُ بِمَا تَعْمَلُونَ',
          transliteration: 'Wallahu a\'lamu bima ta\'maloon',
          translation: 'And Allah is knowing of what you do.',
          tafseer: 'Allah is fully aware of all our actions, both apparent and hidden.',
          wordByWord: [
            { arabic: 'وَاللَّهُ', translation: 'And Allah', transliteration: 'Wallahu' },
            { arabic: 'أَعْلَمُ', translation: 'is most knowing', transliteration: 'a\'lamu' },
            { arabic: 'بِمَا', translation: 'of what', transliteration: 'bima' },
            { arabic: 'تَعْمَلُونَ', translation: 'you do', transliteration: 'ta\'maloon' }
          ],
          isBookmarked: Math.random() > 0.7,
          userNote: Math.random() > 0.8 ? 'Important lesson about divine knowledge...' : undefined
        })
      }
    }
    
    return verses
  }

  const currentVerses = generateVerses(selectedSurah, startVerse)

  // Generate AI insights for a verse
  const generateAIInsights = async (verseNumber: number): Promise<AIInsight[]> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    return [
      {
        type: 'context',
        title: 'Historical Context',
        content: 'This verse was revealed in Mecca during the early period of Islam, emphasizing the fundamental principles of monotheism.',
        confidence: 0.92
      },
      {
        type: 'lesson',
        title: 'Key Teaching',
        content: 'The verse establishes the exclusive worship of Allah and seeking help from Him alone, forming the foundation of Islamic belief.',
        confidence: 0.88
      },
      {
        type: 'reference',
        title: 'Cross References',
        content: 'Similar themes appear in Surah Al-Ikhlas (112:1-4) and Surah Al-Baqarah (2:21-22).',
        confidence: 0.85
      },
      {
        type: 'grammar',
        title: 'Arabic Grammar',
        content: 'The use of "إِيَّاكَ" (Iyyaka) emphasizes exclusivity through the grammatical structure of object fronting.',
        confidence: 0.79
      }
    ]
  }

  const handleAIClick = async (verseNumber: number) => {
    if (activeAIVerse === verseNumber) {
      setActiveAIVerse(null)
      return
    }
    
    setActiveAIVerse(verseNumber)
    
    if (!aiInsights[verseNumber]) {
      setIsLoadingAI(true)
      const insights = await generateAIInsights(verseNumber)
      setAiInsights(prev => ({ ...prev, [verseNumber]: insights }))
      setIsLoadingAI(false)
    }
  }

  const handleAudioClick = (verseNumber: number) => {
    if (currentPlayingVerse === verseNumber && isPlaying) {
      setIsPlaying(false)
      setCurrentPlayingVerse(null)
    } else {
      setIsPlaying(true)
      setCurrentPlayingVerse(verseNumber)
    }
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900' 
        : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100'
    }`}>
      {/* Modern Header */}
      <div className={`sticky top-0 z-50 border-b transition-all duration-300 backdrop-blur-xl ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-700/50' 
          : 'bg-white/80 border-emerald-200/50'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Surah Info */}
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSidebar(!showSidebar)}
                className={`transition-all duration-200 ${
                  isDarkMode ? 'text-emerald-400 hover:bg-slate-800' : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <div className="hidden md:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className={`font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    {currentSurah.name} ({currentSurah.arabicName})
                  </h1>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-emerald-600'}`}>
                    {currentSurah.englishName} • Verses {startVerse}-{Math.min(startVerse + 9, currentSurah.verses)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Quick Actions */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`transition-all duration-200 ${
                  isDarkMode ? 'text-emerald-400 hover:bg-slate-800' : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={isDarkMode ? 'text-emerald-400 hover:bg-slate-800' : 'text-emerald-700 hover:bg-emerald-50'}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <h4 className="font-medium">Reading Preferences</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Reading Mode</label>
                        <Select value={readingMode} onValueChange={(value: 'study' | 'recitation' | 'memorization') => setReadingMode(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="study">📚 Study Mode</SelectItem>
                            <SelectItem value="recitation">🎵 Recitation Mode</SelectItem>
                            <SelectItem value="memorization">🧠 Memorization Mode</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Playback Speed</label>
                        <Select value={playbackSpeed.toString()} onValueChange={(value) => setPlaybackSpeed(parseFloat(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.5">0.5x (Slow)</SelectItem>
                            <SelectItem value="0.75">0.75x</SelectItem>
                            <SelectItem value="1">1x (Normal)</SelectItem>
                            <SelectItem value="1.25">1.25x</SelectItem>
                            <SelectItem value="1.5">1.5x (Fast)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Loop Verses</label>
                        <Switch checked={isLooping} onCheckedChange={setIsLooping} />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Enhanced Sidebar */}
        {showSidebar && (
          <>
            {/* Mobile Overlay */}
            <div 
              className="fixed inset-0 bg-black/50 z-20 md:hidden"
              onClick={() => setShowSidebar(false)}
            />
            
            <div className={`fixed md:relative top-[89px] md:top-0 left-0 w-full md:w-80 h-[calc(100vh-89px)] md:h-auto border-r transition-all duration-300 z-30 ${
              isDarkMode ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-emerald-200'
            } backdrop-blur-xl`}>
              <ScrollArea className="h-full">
                <div className="p-4 space-y-6">
                  {/* Search */}
                  <div className="relative">
                    <Search className={`absolute left-3 top-3 w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-emerald-500'}`} />
                    <Input 
                      placeholder="Search verses, topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`pl-10 ${
                        isDarkMode 
                          ? 'bg-slate-800/50 border-slate-600 text-slate-200' 
                          : 'bg-emerald-50/50 border-emerald-200'
                      }`}
                    />
                  </div>

                  {/* Surah Selection */}
                  <div className="space-y-3">
                    <h3 className={`font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      Select Surah
                    </h3>
                    <Select value={selectedSurah.toString()} onValueChange={(value) => {
                      setSelectedSurah(parseInt(value))
                      setStartVerse(1)
                      if (window.innerWidth < 768) setShowSidebar(false)
                    }}>
                      <SelectTrigger className={isDarkMode ? 'bg-slate-800/50 border-slate-600' : 'bg-emerald-50/50 border-emerald-200'}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {surahs.map((surah) => (
                          <SelectItem key={surah.number} value={surah.number.toString()}>
                            <div className="flex items-center justify-between w-full">
                              <div className="flex flex-col">
                                <span className="font-medium">{surah.number}. {surah.name}</span>
                                <span className="text-xs text-muted-foreground">{surah.englishName} • {surah.verses} verses</span>
                              </div>
                              <span className="text-lg mr-2">{surah.arabicName}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Translation Selection */}
                  <div className="space-y-3">
                    <h3 className={`font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      Translation
                    </h3>
                    <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
                      <SelectTrigger className={isDarkMode ? 'bg-slate-800/50 border-slate-600' : 'bg-emerald-50/50 border-emerald-200'}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {translations.map((translation) => (
                          <SelectItem key={translation.id} value={translation.id}>
                            <div className="flex items-center gap-2">
                              <span>{translation.name}</span>
                              {translation.quality === 'premium' && (
                                <Badge className="bg-amber-500 text-white text-xs">Premium</Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Verse Navigation */}
                  <div className="space-y-3">
                    <h3 className={`font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      Start from Verse
                    </h3>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setStartVerse(Math.max(1, startVerse - 10))}
                        disabled={startVerse <= 1}
                        className="flex-1"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Previous 10
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setStartVerse(Math.min(currentSurah.verses - 9, startVerse + 10))}
                        disabled={startVerse + 10 > currentSurah.verses}
                        className="flex-1"
                      >
                        Next 10
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    <Input 
                      type="number" 
                      min="1" 
                      max={currentSurah.verses} 
                      value={startVerse}
                      onChange={(e) => setStartVerse(Math.max(1, Math.min(currentSurah.verses, parseInt(e.target.value) || 1)))}
                      className={isDarkMode ? 'bg-slate-800/50 border-slate-600' : 'bg-emerald-50/50 border-emerald-200'}
                    />
                  </div>

                  {/* Reading Progress */}
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-800/50' : 'bg-emerald-50/50'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        Reading Progress
                      </span>
                      <Badge className="bg-emerald-600 text-white">
                        {Math.round((startVerse / currentSurah.verses) * 100)}%
                      </Badge>
                    </div>
                    <Progress value={(startVerse / currentSurah.verses) * 100} className="mb-2" />
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-emerald-600'}`}>
                      Verse {startVerse} of {currentSurah.verses}
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </>
        )}

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Modern Control Panel */}
            <Card className={`mb-6 border-0 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800/40 backdrop-blur-xl' 
                : 'bg-white/60 backdrop-blur-xl'
            }`}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Font Controls */}
                  <div className="space-y-4">
                    <h3 className={`font-semibold flex items-center gap-2 ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-700'
                    }`}>
                      <Type className="w-5 h-5" />
                      Typography Settings
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Arabic Font */}
                      <div className="space-y-2">
                        <label className={`text-sm font-medium flex items-center gap-2 ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                          Arabic
                        </label>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setArabicFontSize(Math.max(16, arabicFontSize - 2))}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <div className={`flex-1 text-center py-1 px-2 rounded-md border ${
                            isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-200' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          }`}>
                            <span className="font-mono text-sm">{arabicFontSize}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setArabicFontSize(Math.min(48, arabicFontSize + 2))}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Translation Font */}
                      <div className="space-y-2">
                        <label className={`text-sm font-medium flex items-center gap-2 ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Translation
                        </label>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setTranslationFontSize(Math.max(12, translationFontSize - 1))}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <div className={`flex-1 text-center py-1 px-2 rounded-md border ${
                            isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-200' : 'bg-blue-50 border-blue-200 text-blue-800'
                          }`}>
                            <span className="font-mono text-sm">{translationFontSize}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setTranslationFontSize(Math.min(24, translationFontSize + 1))}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Display Options */}
                  <div className="space-y-4">
                    <h3 className={`font-semibold flex items-center gap-2 ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-700'
                    }`}>
                      <Eye className="w-5 h-5" />
                      Display Options
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { 
                          key: 'transliteration', 
                          label: 'Transliteration', 
                          value: showTransliteration, 
                          setter: setShowTransliteration,
                          icon: Globe 
                        },
                        { 
                          key: 'wordByWord', 
                          label: 'Word by Word', 
                          value: showWordByWord, 
                          setter: setShowWordByWord,
                          icon: Layers 
                        },
                        { 
                          key: 'tafseer', 
                          label: 'Commentary', 
                          value: showTafseer, 
                          setter: setShowTafseer,
                          icon: FileText 
                        }
                      ].map((option) => {
                        const Icon = option.icon
                        return (
                          <div key={option.key} className="flex items-center justify-between">
                            <label className={`flex items-center gap-2 text-sm font-medium cursor-pointer ${
                              isDarkMode ? 'text-slate-300' : 'text-slate-700'
                            }`}>
                              <Icon className="w-4 h-4" />
                              {option.label}
                            </label>
                            <Switch 
                              checked={option.value} 
                              onCheckedChange={option.setter}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verses Display */}
            <div className="space-y-6">
              {currentVerses.map((verse) => (
                <Card key={verse.number} className={`relative overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                  isDarkMode 
                    ? 'bg-slate-800/40 backdrop-blur-xl' 
                    : 'bg-white/60 backdrop-blur-xl'
                } ${currentPlayingVerse === verse.number ? 'ring-2 ring-emerald-500' : ''}`}>
                  <CardContent className="p-6">
                    {/* Verse Header */}
                    <div className="flex justify-between items-center mb-6">
                      <Badge className="bg-emerald-600 text-white px-3 py-1 text-sm font-medium">
                        {selectedSurah}:{verse.number}
                      </Badge>
                      
                      {/* Floating Action Buttons */}
                      <div className="flex items-center gap-2">
                        {/* AI Assistant Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAIClick(verse.number)}
                          className={`relative transition-all duration-200 ${
                            activeAIVerse === verse.number 
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' 
                              : isDarkMode ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-900/20' : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
                          }`}
                        >
                          {isLoadingAI && activeAIVerse === verse.number ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                          {activeAIVerse === verse.number && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                          )}
                        </Button>

                        {/* Audio Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAudioClick(verse.number)}
                          className={`transition-all duration-200 ${
                            currentPlayingVerse === verse.number && isPlaying
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                              : isDarkMode ? 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/20' : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                          }`}
                        >
                          {currentPlayingVerse === verse.number && isPlaying ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>

                        {/* Bookmark Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`transition-all duration-200 ${
                            verse.isBookmarked 
                              ? 'text-amber-600 hover:text-amber-700' 
                              : isDarkMode ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600 hover:text-amber-600'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${verse.isBookmarked ? 'fill-current' : ''}`} />
                        </Button>

                        {/* More Options */}
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-600 hover:text-slate-700'}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48" align="end">
                            <div className="space-y-2">
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share Verse
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Text
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                <NotebookPen className="w-4 h-4 mr-2" />
                                Add Note
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Highlighter className="w-4 h-4 mr-2" />
                                Highlight
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* Arabic Text */}
                    <div 
                      className={`text-right mb-6 leading-loose font-arabic ${
                        isDarkMode ? 'text-slate-100' : 'text-emerald-900'
                      }`}
                      style={{ fontSize: `${arabicFontSize}px` }}
                      dir="rtl"
                    >
                      {verse.arabic}
                    </div>

                    {/* Transliteration */}
                    {showTransliteration && (
                      <div 
                        className={`mb-4 italic font-medium ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}
                        style={{ fontSize: `${translationFontSize - 2}px` }}
                      >
                        {verse.transliteration}
                      </div>
                    )}

                    {/* Translation */}
                    <div 
                      className={`mb-6 leading-relaxed ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}
                      style={{ fontSize: `${translationFontSize}px` }}
                    >
                      {verse.translation}
                    </div>

                    {/* AI Insights Expansion */}
                    {activeAIVerse === verse.number && aiInsights[verse.number] && (
                      <div className={`mb-6 p-4 rounded-xl border transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-700/30' 
                          : 'bg-gradient-to-r from-purple-50/50 to-blue-50/50 border-purple-200/50'
                      }`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <h4 className={`font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-900'}`}>
                            AI Study Insights
                          </h4>
                        </div>

                        <div className="grid gap-3">
                          {aiInsights[verse.number].map((insight, index) => (
                            <div key={index} className={`p-3 rounded-lg border ${
                              isDarkMode 
                                ? 'bg-slate-800/50 border-slate-600/50' 
                                : 'bg-white/50 border-slate-200/50'
                            }`}>
                              <div className="flex items-center justify-between mb-2">
                                <h5 className={`font-medium text-sm ${
                                  insight.type === 'context' ? 'text-blue-600 dark:text-blue-400' :
                                  insight.type === 'lesson' ? 'text-green-600 dark:text-green-400' :
                                  insight.type === 'reference' ? 'text-amber-600 dark:text-amber-400' :
                                  'text-purple-600 dark:text-purple-400'
                                }`}>
                                  {insight.title}
                                </h5>
                                <Badge variant="outline" className="text-xs">
                                  {Math.round(insight.confidence * 100)}%
                                </Badge>
                              </div>
                              <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                {insight.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Word by Word */}
                    {showWordByWord && (
                      <div className={`mb-6 p-4 rounded-xl ${isDarkMode ? 'bg-slate-700/30' : 'bg-emerald-50/50'}`}>
                        <h4 className={`font-medium mb-3 text-sm ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                          Word by Word Analysis
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {verse.wordByWord.map((word, index) => (
                            <div key={index} className={`p-3 rounded-lg border text-center ${
                              isDarkMode ? 'border-slate-600 bg-slate-800/30' : 'border-emerald-200 bg-white/50'
                            }`}>
                              <div className={`text-lg mb-1 ${isDarkMode ? 'text-slate-100' : 'text-emerald-900'}`} dir="rtl">
                                {word.arabic}
                              </div>
                              <div className={`text-xs mb-1 italic ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                                {word.transliteration}
                              </div>
                              <div className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                {word.translation}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tafseer */}
                    {showTafseer && (
                      <div className={`p-4 rounded-xl border ${
                        isDarkMode 
                          ? 'bg-amber-900/20 border-amber-700/30' 
                          : 'bg-amber-50/50 border-amber-200/50'
                      }`}>
                        <div className="flex justify-between items-center mb-3">
                          <h4 className={`font-medium ${isDarkMode ? 'text-amber-400' : 'text-amber-900'}`}>
                            Commentary
                          </h4>
                          <Badge className="bg-amber-600 text-white text-xs">
                            {currentTranslation.author}
                          </Badge>
                        </div>
                        <p className={`text-sm leading-relaxed ${
                          isDarkMode ? 'text-amber-200' : 'text-amber-800'
                        }`}>
                          {verse.tafseer}
                        </p>
                      </div>
                    )}

                    {/* User Note */}
                    {verse.userNote && (
                      <div className={`mt-4 p-3 rounded-lg border-l-4 border-blue-500 ${
                        isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50/50'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <NotebookPen className="w-4 h-4 text-blue-600" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                            Your Note
                          </span>
                        </div>
                        <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                          {verse.userNote}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation Controls */}
            <Card className={`mt-8 border-0 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800/40 backdrop-blur-xl' 
                : 'bg-white/60 backdrop-blur-xl'
            }`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => setStartVerse(Math.max(1, startVerse - 10))}
                    disabled={startVerse <= 1}
                    className="w-full md:w-auto"
                  >
                    <SkipBack className="w-4 h-4 mr-2" />
                    Previous 10 Verses
                  </Button>

                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="px-4 py-2">
                      Verses {startVerse}-{Math.min(startVerse + 9, currentSurah.verses)} of {currentSurah.verses}
                    </Badge>
                  </div>

                  <Button 
                    variant="outline"
                    onClick={() => setStartVerse(Math.min(currentSurah.verses - 9, startVerse + 10))}
                    disabled={startVerse + 10 > currentSurah.verses}
                    className="w-full md:w-auto"
                  >
                    Next 10 Verses
                    <SkipForward className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}