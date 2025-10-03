import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { 
  BookOpen, Search, Play, Volume2, Bookmark, Settings, 
  Moon, Sun, Type, Languages, Share2, Copy, 
  RotateCcw, SkipBack, SkipForward, Pause,
  BookMarked, PenTool, Lightbulb, MessageSquare, Clock, Target,
  Headphones, Globe, Zap, Brain, Eye, ChevronDown,
  ChevronUp, Menu, X, Plus, Minus, ArrowLeft, ArrowRight,
  Volume1, VolumeX, Repeat, Shuffle, FastForward, Rewind,
  Bot, Send, Sparkles, Quote, FileText, Users, Star,
  ChevronLeft, ChevronRight, Layers, Heart, Filter,
  MoreVertical, Maximize2, Minimize2
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

interface Verse {
  number: number
  arabic: string
  transliteration: string
  translation: string
  translations: { [key: string]: string }
  tafseer: string
  wordByWord: Array<{ arabic: string; translation: string; transliteration: string }>
  audioUrl?: string
  isBookmarked?: boolean
  userNote?: string
  tags?: string[]
  relatedHadith?: RelatedHadith[]
}

interface Translator {
  id: string
  name: string
  fullName: string
  language: string
  style: string
  country: string
}

interface RelatedHadith {
  id: string
  source: string
  narrator: string
  arabic: string
  translation: string
  relevance: string
  reference: string
}

interface AIMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  verseContext?: number
}

// Available Translators
const translators: Translator[] = [
  { id: 'sahih', name: 'Sahih International', fullName: 'Sahih International Translation', language: 'English', style: 'Modern', country: 'Saudi Arabia' },
  { id: 'pickthall', name: 'Pickthall', fullName: 'Mohammed Marmaduke William Pickthall', language: 'English', style: 'Classical', country: 'UK' },
  { id: 'yusuf', name: 'Yusuf Ali', fullName: 'Abdullah Yusuf Ali', language: 'English', style: 'Eloquent', country: 'India/UK' },
  { id: 'shakir', name: 'M.H. Shakir', fullName: 'Mohammad Habib Shakir', language: 'English', style: 'Literal', country: 'India' },
  { id: 'hilali', name: 'Hilali & Khan', fullName: 'Hilali & Muhsin Khan', language: 'English', style: 'Detailed', country: 'Saudi Arabia' },
  { id: 'arberry', name: 'Arberry', fullName: 'Arthur John Arberry', language: 'English', style: 'Literary', country: 'UK' },
  { id: 'asad', name: 'Muhammad Asad', fullName: 'Muhammad Asad (Leopold Weiss)', language: 'English', style: 'Analytical', country: 'Austria/Pakistan' },
  { id: 'ahmed', name: 'Ahmed Ali', fullName: 'Ahmed Ali', language: 'English', style: 'Contemporary', country: 'India' },
  { id: 'wahiduddin', name: 'Wahiduddin Khan', fullName: 'Wahiduddin Khan', language: 'English', style: 'Simple', country: 'India' },
  { id: 'clear', name: 'Clear Quran', fullName: 'Dr. Mustafa Khattab', language: 'English', style: 'Modern Clear', country: 'Canada' }
]

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

export function EnhancedQuranSection({ onNavigate }: QuranSectionProps) {
  // Reading State
  const [selectedSurah, setSelectedSurah] = useState(1)
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null)
  const [startVerse, setStartVerse] = useState(1)
  const [currentView, setCurrentView] = useState<'search' | 'reader'>('search')
  const [selectedTranslator, setSelectedTranslator] = useState('sahih')
  
  // UI State
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [arabicFontSize, setArabicFontSize] = useState(24) // Reduced for mobile
  const [translationFontSize, setTranslationFontSize] = useState(16) // Reduced for mobile
  const [showTransliteration, setShowTransliteration] = useState(true)
  const [showWordByWord, setShowWordByWord] = useState(false)
  const [showTafseer, setShowTafseer] = useState(false)
  const [showHadith, setShowHadith] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPlayingVerse, setCurrentPlayingVerse] = useState<number | null>(null)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  
  // AI Chat State
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([])
  const [aiInput, setAiInput] = useState('')
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [showAiChat, setShowAiChat] = useState(false)
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Verse[]>([])
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)

  // Get current surah
  const currentSurah = surahs.find(s => s.number === selectedSurah) || surahs[0]

  // Get current translator
  const currentTranslator = translators.find(t => t.id === selectedTranslator) || translators[0]

  // Generate sample verses with hadith and multiple translations
  const generateVerses = (surahNumber: number, startVerse: number): Verse[] => {
    const verses: Verse[] = []
    const maxVerses = Math.min(10, currentSurah.verses - startVerse + 1)
    
    for (let i = 0; i < maxVerses; i++) {
      const verseNumber = startVerse + i
      
      if (surahNumber === 1) {
        // Al-Fatiha verses with multiple translations
        const fatihaVerses = [
          {
            arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
            transliteration: 'Bismillahi r-rahmani r-raheem',
            translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
            translations: {
              sahih: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
              pickthall: 'In the name of Allah, the Beneficent, the Merciful.',
              yusuf: 'In the name of Allah, Most Gracious, Most Merciful.',
              shakir: 'In the name of Allah, the Beneficent, the Merciful.',
              hilali: 'In the Name of Allah, the Most Beneficent, the Most Merciful.',
              arberry: 'In the Name of God, the Merciful, the Compassionate.',
              asad: 'IN THE NAME OF God, The Most Gracious, The Dispenser of Grace:',
              ahmed: 'In the name of Allah, most benevolent, ever-merciful.',
              wahiduddin: 'In the name of God, the Most Gracious, the Most Merciful.',
              clear: 'In the Name of Allah—the Most Compassionate, Most Merciful.'
            },
            tafseer: 'This is the Basmala, recited at the beginning of every chapter except At-Tawbah. It establishes Allah\'s absolute mercy and compassion.',
            relatedHadith: [
              {
                id: '1',
                source: 'Sahih al-Bukhari',
                narrator: 'Abu Hurairah',
                arabic: 'مَا أَنْزَلَ اللَّهُ فِي التَّوْرَاةِ وَلاَ فِي الإِنْجِيلِ مِثْلَ أُمِّ الْقُرْآنِ',
                translation: 'Allah has not revealed in the Torah or the Gospel anything like Umm Al-Quran (Al-Fatiha).',
                relevance: 'Shows the special status of Al-Fatiha',
                reference: 'Bukhari 4474'
              }
            ]
          },
          {
            arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
            transliteration: 'Alhamdu lillahi rabbi l-alameen',
            translation: '[All] praise is [due] to Allah, Lord of the worlds.',
            translations: {
              sahih: '[All] praise is [due] to Allah, Lord of the worlds.',
              pickthall: 'Praise be to Allah, Lord of the Worlds,',
              yusuf: 'Praise be to Allah, the Cherisher and Sustainer of the worlds;',
              shakir: 'All praise is due to Allah, the Lord of the Worlds.',
              hilali: 'All the praises and thanks be to Allah, the Lord of the \'Alamin (mankind, jinns and all that exists).',
              arberry: 'Praise belongs to God, the Lord of all Being,',
              asad: 'ALL PRAISE is due to God alone, the Sustainer of all the worlds,',
              ahmed: 'All praise be to Allah, Lord of all the worlds,',
              wahiduddin: 'All praise belongs to God, the Lord of the Universe,',
              clear: 'All praise is for Allah—Lord of all worlds,'
            },
            tafseer: 'All forms of praise and gratitude belong to Allah alone, Who is the Lord and Sustainer of all the worlds.',
            relatedHadith: [
              {
                id: '2',
                source: 'Sahih Muslim',
                narrator: 'Anas ibn Malik',
                arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ أَحَبُّ الْكَلاَمِ إِلَى اللَّهِ',
                translation: 'Alhamdulillahi rabbil alameen is the most beloved speech to Allah.',
                relevance: 'Emphasizes the importance of praising Allah',
                reference: 'Muslim 2731'
              }
            ]
          },
          {
            arabic: 'الرَّحْمَنِ الرَّحِيمِ',
            transliteration: 'Ar-rahmani r-raheem',
            translation: 'The Entirely Merciful, the Especially Merciful,',
            translations: {
              sahih: 'The Entirely Merciful, the Especially Merciful,',
              pickthall: 'The Compassionate, the Merciful,',
              yusuf: 'Most Gracious, Most Merciful;',
              shakir: 'The Beneficent, the Merciful.',
              hilali: 'The Most Beneficent, the Most Merciful.',
              arberry: 'the All-merciful, the All-compassionate,',
              asad: 'the Most Gracious, the Dispenser of Grace,',
              ahmed: 'Most compassionate, ever-merciful,',
              wahiduddin: 'the Compassionate, the Merciful,',
              clear: 'the Most Compassionate, Most Merciful,'
            },
            tafseer: 'This verse emphasizes Allah\'s mercy by mentioning two of His most beautiful names.',
            relatedHadith: []
          },
          {
            arabic: 'مَالِكِ يَوْمِ الدِّينِ',
            transliteration: 'Maliki yawmi d-deen',
            translation: 'Sovereign of the Day of Recompense.',
            translations: {
              sahih: 'Sovereign of the Day of Recompense.',
              pickthall: 'Master of the Day of Judgment,',
              yusuf: 'Master of the Day of Judgment.',
              shakir: 'Master of the Day of Judgment.',
              hilali: 'The Only Owner (and the Only Ruling Judge) of the Day of Recompense (i.e. the Day of Resurrection)',
              arberry: 'Master of the Day of Doom.',
              asad: 'Lord of the Day of Judgment!',
              ahmed: 'King of the Day of Judgement.',
              wahiduddin: 'Master of the Day of Judgement.',
              clear: 'Master of the Day of Judgment.'
            },
            tafseer: 'Allah is the ultimate judge and ruler of the Day of Judgment.',
            relatedHadith: []
          },
          {
            arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
            transliteration: 'Iyyaka na\'budu wa iyyaka nasta\'een',
            translation: 'It is You we worship and You we ask for help.',
            translations: {
              sahih: 'It is You we worship and You we ask for help.',
              pickthall: 'Thee (alone) we worship; Thee (alone) we ask for help.',
              yusuf: 'Thee do we worship, and Thine aid we seek.',
              shakir: 'Thee do we serve and Thee do we beseech for help.',
              hilali: 'You (Alone) we worship, and You (Alone) we ask for help (for each and everything).',
              arberry: 'Thee only we serve; to Thee alone we pray for succour.',
              asad: 'Thee alone do we worship; and unto Thee alone do we turn for aid.',
              ahmed: 'You alone we worship, and You alone we ask for help.',
              wahiduddin: 'You alone we worship, and You alone we ask for help.',
              clear: 'You ˹alone˺ we worship and You ˹alone˺ we ask for help.'
            },
            tafseer: 'This verse declares exclusive worship and seeking help from Allah alone.',
            relatedHadith: [
              {
                id: '3',
                source: 'Sunan at-Tirmidhi',
                narrator: 'Ibn Abbas',
                arabic: 'إِيَّاكَ نَعْبُدُ تَبَرُّؤٌ مِنَ الشِّرْكِ وَإِيَّاكَ نَسْتَعِينُ تَفْوِيضٌ إِلَى اللَّهِ',
                translation: 'Iyyaka na\'budu is a declaration of freedom from shirk, and iyyaka nasta\'een is delegation to Allah.',
                relevance: 'Explains the deeper meaning of exclusive worship',
                reference: 'Tirmidhi 2953'
              }
            ]
          },
          {
            arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
            transliteration: 'Ihdinas-siratal mustaqeem',
            translation: 'Guide us to the straight path -',
            translations: {
              sahih: 'Guide us to the straight path -',
              pickthall: 'Guide us on the straight path,',
              yusuf: 'Show us the straight way,',
              shakir: 'Keep us on the right path.',
              hilali: 'Guide us to the Straight Way',
              arberry: 'Guide us in the straight path,',
              asad: 'Guide us the straight way',
              ahmed: 'Guide us (O Lord) to the path that is straight,',
              wahiduddin: 'Guide us to the straight path:',
              clear: 'Guide us along the Straight Path,'
            },
            tafseer: 'A supplication for divine guidance to the path of righteousness.',
            relatedHadith: []
          },
          {
            arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
            transliteration: 'Sirata l-ladhina an\'amta \'alayhim ghayri l-maghdubi \'alayhim wa la d-dalleen',
            translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
            translations: {
              sahih: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
              pickthall: 'The path of those whom Thou hast favoured; Not the (path) of those who earn Thine anger nor of those who go astray.',
              yusuf: 'The way of those on whom Thou hast bestowed Thy Grace, those whose (portion) is not wrath, and who go not astray.',
              shakir: 'The path of those upon whom Thou hast bestowed favors. Not (the path) of those upon whom Thy wrath is brought down, nor of those who go astray.',
              hilali: 'The Way of those on whom You have bestowed Your Grace, not (the way) of those who earned Your Anger (such as the Jews), nor of those who went astray (such as the Christians).',
              arberry: 'the path of those whom Thou hast blessed, not of those against whom Thou art wrathful, nor of those who are astray.',
              asad: 'The way of those upon whom Thou hast bestowed Thy blessings, not of those who have been condemned [by Thee], nor of those who go astray!',
              ahmed: 'The path of those You have blessed, Not of those who have earned Your anger, nor those who have gone astray.',
              wahiduddin: 'the path of those You have blessed; not of those who have incurred Your wrath, nor of those who have gone astray.',
              clear: 'the Path of those You have blessed—not those You are displeased with, or those who are astray.'
            },
            tafseer: 'The path of the righteous, avoiding the way of those who earned Allah\'s displeasure or went astray.',
            relatedHadith: []
          }
        ]
        
        const verseData = fatihaVerses[verseNumber - 1] || fatihaVerses[0]
        
        verses.push({
          number: verseNumber,
          ...verseData,
          translation: verseData.translations[selectedTranslator] || verseData.translation,
          wordByWord: [
            { arabic: 'بِسْمِ', translation: 'In the name', transliteration: 'Bismi' },
            { arabic: 'اللَّهِ', translation: 'of Allah', transliteration: 'Allahi' },
            { arabic: 'الرَّحْمَنِ', translation: 'the Most Gracious', transliteration: 'ar-Rahman' },
            { arabic: 'الرَّحِيمِ', translation: 'the Most Merciful', transliteration: 'ar-Raheem' }
          ],
          isBookmarked: Math.random() > 0.7,
          userNote: Math.random() > 0.8 ? 'Personal reflection on this verse...' : undefined
        })
      }
    }
    
    return verses
  }

  const currentVerses = generateVerses(selectedSurah, startVerse)

  const handleVerseSelect = (verse: Verse) => {
    setSelectedVerse(verse.number)
    setCurrentView('reader')
    setStartVerse(verse.number)
  }

  const handleAiQuestion = async (question: string, verseNumber?: number) => {
    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date(),
      verseContext: verseNumber
    }

    setAiMessages(prev => [...prev, userMessage])
    setAiInput('')
    setIsAiTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAiResponse(question, verseNumber),
        timestamp: new Date(),
        verseContext: verseNumber
      }

      setAiMessages(prev => [...prev, aiResponse])
      setIsAiTyping(false)
    }, 2000)
  }

  const generateAiResponse = (question: string, verseNumber?: number): string => {
    if (verseNumber) {
      return `Regarding verse ${verseNumber}: This verse teaches us about the fundamental principle of Tawhid (monotheism). The phrase "Iyyaka na'budu" establishes exclusive worship to Allah, while "wa iyyaka nasta'een" declares our complete dependence on His help. This duality is essential in Islamic belief - we worship Allah alone and seek assistance only from Him. The verse serves as a daily reminder in our five prayers to maintain this pure relationship with our Creator.`
    }
    
    return `That's a thoughtful question about the Quran. The verses in Al-Fatiha provide a complete framework for our relationship with Allah - from recognizing His mercy and sovereignty to asking for guidance. Each phrase has deep theological significance that has been explained by scholars across centuries. Would you like me to elaborate on any specific aspect?`
  }

  const searchVerses = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    // Simulate search results
    const results = currentVerses.filter(verse => 
      verse.translation.toLowerCase().includes(query.toLowerCase()) ||
      verse.transliteration.toLowerCase().includes(query.toLowerCase()) ||
      verse.tafseer.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(results)
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900' 
        : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100'
    }`}>
      {/* Mobile-Optimized Header */}
      <div className={`sticky top-0 z-50 border-b transition-all duration-300 backdrop-blur-xl ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-700/50' 
          : 'bg-white/90 border-emerald-200/50'
      }`}>
        <div className="px-3 py-3 sm:px-4 sm:py-4">
          {/* Mobile Header Layout */}
          <div className="space-y-3">
            {/* Top Row: Title and Theme Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h1 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    Quran Study Hub
                  </h1>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-emerald-600'} hidden sm:block`}>
                    AI-powered study experience
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`transition-all duration-200 p-2 ${
                    isDarkMode ? 'text-emerald-400 hover:bg-slate-800' : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                
                {/* Settings Sheet for Mobile */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Reading Settings</SheetTitle>
                      <SheetDescription>Customize your reading experience</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Arabic Font Size</label>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => setArabicFontSize(Math.max(16, arabicFontSize - 2))}>
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-12 text-center">{arabicFontSize}px</span>
                          <Button size="sm" variant="outline" onClick={() => setArabicFontSize(Math.min(36, arabicFontSize + 2))}>
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Translation Font Size</label>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => setTranslationFontSize(Math.max(12, translationFontSize - 1))}>
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-12 text-center">{translationFontSize}px</span>
                          <Button size="sm" variant="outline" onClick={() => setTranslationFontSize(Math.min(24, translationFontSize + 1))}>
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Translation</label>
                        <Select value={selectedTranslator} onValueChange={setSelectedTranslator}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {translators.map((translator) => (
                              <SelectItem key={translator.id} value={translator.id}>
                                <div className="flex flex-col items-start">
                                  <span className="font-medium">{translator.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {translator.fullName}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {translator.style} Style • {translator.country}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Display Options</label>
                        <div className="space-y-2">
                          <Button
                            variant={showTransliteration ? "default" : "outline"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => setShowTransliteration(!showTransliteration)}
                          >
                            Show Transliteration
                          </Button>
                          <Button
                            variant={showTafseer ? "default" : "outline"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => setShowTafseer(!showTafseer)}
                          >
                            Show Commentary
                          </Button>
                          <Button
                            variant={showHadith ? "default" : "outline"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => setShowHadith(!showHadith)}
                          >
                            Show Related Hadith
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            
            {/* Bottom Row: View Toggle and Surah Selection */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {/* View Toggle */}
              <div className="flex bg-emerald-100 dark:bg-slate-800 rounded-lg p-1">
                <Button
                  variant={currentView === 'search' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView('search')}
                  className={`flex-1 ${currentView === 'search' ? 'bg-emerald-600 text-white' : ''}`}
                >
                  <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="text-xs sm:text-sm">Search</span>
                </Button>
                <Button
                  variant={currentView === 'reader' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView('reader')}
                  className={`flex-1 ${currentView === 'reader' ? 'bg-emerald-600 text-white' : ''}`}
                >
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="text-xs sm:text-sm">Reader</span>
                </Button>
              </div>
              
              {/* Surah and Translation Selection - Stacked on mobile */}
              <div className="flex flex-col sm:flex-row gap-2 flex-1">
                <Select value={selectedSurah.toString()} onValueChange={(value) => setSelectedSurah(parseInt(value))}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {surahs.map((surah) => (
                      <SelectItem key={surah.number} value={surah.number.toString()}>
                        <div className="flex flex-col">
                          <span>{surah.number}. {surah.name}</span>
                          <span className="text-xs text-muted-foreground">{surah.arabicName}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Translation Selection */}
                <Select value={selectedTranslator} onValueChange={setSelectedTranslator}>
                  <SelectTrigger className="flex-1 sm:max-w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {translators.map((translator) => (
                      <SelectItem key={translator.id} value={translator.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{translator.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {translator.style} • {translator.country}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-4 lg:p-6">
        {currentView === 'search' ? (
          // Mobile-Optimized Search View
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {/* Mobile Search Interface */}
            <Card className={`border-0 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800/40 backdrop-blur-xl' 
                : 'bg-white/60 backdrop-blur-xl'
            }`}>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                    <Input
                      placeholder="Search verses, translations..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        searchVerses(e.target.value)
                      }}
                      className="pl-10 sm:pl-12 h-10 sm:h-12 text-base"
                    />
                  </div>

                  {/* Quick Search Tags - Mobile Scrollable */}
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    <Badge className="bg-emerald-100 text-emerald-700 whitespace-nowrap">Quick Search</Badge>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="whitespace-nowrap flex-shrink-0"
                      onClick={() => setSearchQuery('mercy')}
                    >
                      Mercy
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="whitespace-nowrap flex-shrink-0"
                      onClick={() => setSearchQuery('guidance')}
                    >
                      Guidance
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="whitespace-nowrap flex-shrink-0"
                      onClick={() => setSearchQuery('forgiveness')}
                    >
                      Forgiveness
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="whitespace-nowrap flex-shrink-0"
                      onClick={() => setSearchQuery('worship')}
                    >
                      Worship
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Search Results or Browse Verses */}
            <div className="space-y-3 sm:space-y-4">
              {searchResults.length > 0 ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        Results ({searchResults.length})
                      </h3>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-emerald-600'}`}>
                        Translation by {currentTranslator.name}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentView('reader')}
                      className="text-emerald-600 w-fit"
                    >
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="text-xs sm:text-sm">Reader</span>
                    </Button>
                  </div>
                  {searchResults.map((verse) => (
                    <Card
                      key={verse.number}
                      className={`cursor-pointer border-0 shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.98] ${
                        isDarkMode 
                          ? 'bg-slate-800/40 backdrop-blur-xl hover:bg-slate-700/40' 
                          : 'bg-white/60 backdrop-blur-xl hover:bg-white/80'
                      }`}
                      onClick={() => handleVerseSelect(verse)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-emerald-600 text-white text-xs sm:text-sm">
                              {selectedSurah}:{verse.number}
                            </Badge>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                          <div 
                            className={`text-xl sm:text-2xl font-arabic leading-loose text-right ${isDarkMode ? 'text-emerald-300' : 'text-emerald-800'}`}
                            style={{ fontSize: `${arabicFontSize}px` }}
                          >
                            {verse.arabic}
                          </div>
                          <div 
                            className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
                            style={{ fontSize: `${translationFontSize}px` }}
                          >
                            {verse.translation}
                          </div>
                          {verse.relatedHadith && verse.relatedHadith.length > 0 && (
                            <div className="flex items-center gap-2 pt-2">
                              <Quote className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                              <span className="text-xs sm:text-sm text-blue-600">
                                {verse.relatedHadith.length} related hadith
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        Browse {currentSurah.name}
                      </h3>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-emerald-600'}`}>
                        Translation by {currentTranslator.name}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs w-fit">
                      {currentSurah.verses} verses
                    </Badge>
                  </div>
                  {currentVerses.map((verse) => (
                    <Card
                      key={verse.number}
                      className={`cursor-pointer border-0 shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.98] ${
                        isDarkMode 
                          ? 'bg-slate-800/40 backdrop-blur-xl hover:bg-slate-700/40' 
                          : 'bg-white/60 backdrop-blur-xl hover:bg-white/80'
                      }`}
                      onClick={() => handleVerseSelect(verse)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-emerald-600 text-white text-xs sm:text-sm">
                              {selectedSurah}:{verse.number}
                            </Badge>
                            <div className="flex items-center gap-2">
                              {verse.isBookmarked && (
                                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-current" />
                              )}
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                          <div 
                            className={`text-xl sm:text-2xl font-arabic leading-loose text-right ${isDarkMode ? 'text-emerald-300' : 'text-emerald-800'}`}
                            style={{ fontSize: `${arabicFontSize}px` }}
                          >
                            {verse.arabic}
                          </div>
                          <div 
                            className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
                            style={{ fontSize: `${translationFontSize}px` }}
                          >
                            {verse.translation}
                          </div>
                          {verse.relatedHadith && verse.relatedHadith.length > 0 && (
                            <div className="flex items-center gap-2 pt-2">
                              <Quote className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                              <span className="text-xs sm:text-sm text-blue-600">
                                {verse.relatedHadith.length} related hadith
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Mobile-Optimized Reader View
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {/* Current Verse Display */}
            {selectedVerse && (
              <Card className={`border-0 shadow-lg ${
                isDarkMode 
                  ? 'bg-slate-800/40 backdrop-blur-xl' 
                  : 'bg-white/60 backdrop-blur-xl'
              }`}>
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-emerald-600 text-white text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
                        {selectedSurah}:{selectedVerse}
                      </Badge>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button variant="outline" size="sm">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>

                    {currentVerses.find(v => v.number === selectedVerse) && (
                      <div className="space-y-4 sm:space-y-6">
                        <div 
                          className={`text-3xl sm:text-4xl lg:text-5xl font-arabic leading-loose text-right ${isDarkMode ? 'text-emerald-300' : 'text-emerald-800'}`}
                          style={{ fontSize: `${arabicFontSize * 1.2}px` }}
                        >
                          {currentVerses.find(v => v.number === selectedVerse)?.arabic}
                        </div>
                        
                        {showTransliteration && (
                          <div 
                            className={`italic ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
                            style={{ fontSize: `${translationFontSize * 1.1}px` }}
                          >
                            {currentVerses.find(v => v.number === selectedVerse)?.transliteration}
                          </div>
                        )}
                        
                        {/* Current Translation */}
                        <div className={`p-4 rounded-lg border-l-4 border-emerald-500 ${isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`font-semibold text-sm ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                              {currentTranslator.name}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {currentTranslator.style}
                            </Badge>
                          </div>
                          <div 
                            className={`leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
                            style={{ fontSize: `${translationFontSize * 1.2}px` }}
                          >
                            {currentVerses.find(v => v.number === selectedVerse)?.translation}
                          </div>
                        </div>

                        {/* Translation Comparison Sheet */}
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" className="w-full">
                              <Languages className="w-4 h-4 mr-2" />
                              Compare Translations
                            </Button>
                          </SheetTrigger>
                          <SheetContent side="bottom" className="h-[70vh] p-0">
                            <div className="flex flex-col h-full">
                              <SheetHeader className="p-4 border-b">
                                <SheetTitle>Translation Comparison</SheetTitle>
                                <SheetDescription>
                                  Compare different translations of verse {selectedSurah}:{selectedVerse}
                                </SheetDescription>
                              </SheetHeader>
                              
                              <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4">
                                  {translators.map((translator) => {
                                    const verse = currentVerses.find(v => v.number === selectedVerse)
                                    const translation = verse?.translations[translator.id] || verse?.translation
                                    
                                    return (
                                      <Card 
                                        key={translator.id} 
                                        className={`${
                                          translator.id === selectedTranslator 
                                            ? 'ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                                            : ''
                                        }`}
                                      >
                                        <CardContent className="p-4">
                                          <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                              <div>
                                                <h4 className="font-semibold text-sm">{translator.name}</h4>
                                                <p className="text-xs text-muted-foreground">
                                                  {translator.fullName} • {translator.style} • {translator.country}
                                                </p>
                                              </div>
                                              <Button
                                                size="sm"
                                                variant={translator.id === selectedTranslator ? "default" : "outline"}
                                                onClick={() => setSelectedTranslator(translator.id)}
                                              >
                                                {translator.id === selectedTranslator ? 'Current' : 'Select'}
                                              </Button>
                                            </div>
                                            <div className="text-sm leading-relaxed pt-2">
                                              {translation}
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    )
                                  })}
                                </div>
                              </ScrollArea>
                            </div>
                          </SheetContent>
                        </Sheet>

                        {showTafseer && (
                          <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${isDarkMode ? 'bg-slate-700/50' : 'bg-blue-50'}`}>
                            <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                              Commentary (Tafseer)
                            </h4>
                            <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                              {currentVerses.find(v => v.number === selectedVerse)?.tafseer}
                            </p>
                          </div>
                        )}

                        {/* Related Hadith Section */}
                        {showHadith && currentVerses.find(v => v.number === selectedVerse)?.relatedHadith && (
                          <div className="space-y-4">
                            <h4 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                              <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
                              Related Hadith
                            </h4>
                            {currentVerses.find(v => v.number === selectedVerse)?.relatedHadith?.map((hadith) => (
                              <Card key={hadith.id} className={`${isDarkMode ? 'bg-slate-700/50' : 'bg-amber-50'} border-amber-200`}>
                                <CardContent className="p-4">
                                  <div className="space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                      <Badge className="bg-amber-100 text-amber-800 w-fit">{hadith.source}</Badge>
                                      <span className="text-xs sm:text-sm text-amber-600">{hadith.reference}</span>
                                    </div>
                                    <div className={`text-base sm:text-lg font-arabic text-right ${isDarkMode ? 'text-amber-300' : 'text-amber-800'}`}>
                                      {hadith.arabic}
                                    </div>
                                    <div className={`text-sm sm:text-base ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                      {hadith.translation}
                                    </div>
                                    <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                      <span className="font-medium">Narrator:</span> {hadith.narrator} • 
                                      <span className="font-medium"> Relevance:</span> {hadith.relevance}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Mobile Navigation Controls */}
            <Card className={`border-0 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800/40 backdrop-blur-xl' 
                : 'bg-white/60 backdrop-blur-xl'
            }`}>
              <CardContent className="p-3 sm:p-4">
                <div className="space-y-3 sm:space-y-4">
                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedVerse(Math.max(1, (selectedVerse || 1) - 1))}
                      disabled={(selectedVerse || 1) <= 1}
                      className="flex-1 mr-2"
                    >
                      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="text-xs sm:text-sm">Previous</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedVerse(Math.min(currentSurah.verses, (selectedVerse || 1) + 1))}
                      disabled={(selectedVerse || 1) >= currentSurah.verses}
                      className="flex-1 ml-2"
                    >
                      <span className="text-xs sm:text-sm">Next</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    </Button>
                  </div>
                  
                  {/* Display Options - Mobile Friendly */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={showTransliteration ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowTransliteration(!showTransliteration)}
                      className="flex-1 min-w-0"
                    >
                      <span className="text-xs sm:text-sm truncate">Transliteration</span>
                    </Button>
                    <Button
                      variant={showTafseer ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowTafseer(!showTafseer)}
                      className="flex-1 min-w-0"
                    >
                      <span className="text-xs sm:text-sm truncate">Commentary</span>
                    </Button>
                    <Button
                      variant={showHadith ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowHadith(!showHadith)}
                      className="flex-1 min-w-0"
                    >
                      <span className="text-xs sm:text-sm truncate">Hadith</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile AI Chat - Full Screen Sheet */}
            <Sheet open={showAiChat} onOpenChange={setShowAiChat}>
              <SheetTrigger asChild>
                <Button className="w-full" onClick={() => setShowAiChat(true)}>
                  <Bot className="w-4 h-4 mr-2" />
                  Ask AI Assistant About This Verse
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] p-0">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-emerald-600" />
                      AI Verse Assistant
                    </SheetTitle>
                    <SheetDescription>
                      Ask questions about verse {selectedSurah}:{selectedVerse}
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="flex-1 flex flex-col p-4">
                    {/* Chat Messages */}
                    <ScrollArea className="flex-1 mb-4">
                      <div className="space-y-3">
                        {aiMessages.length === 0 && (
                          <div className={`text-center py-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Ask me anything about this verse!</p>
                          </div>
                        )}
                        {aiMessages.map((message) => (
                          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-emerald-600 text-white'
                                : isDarkMode
                                ? 'bg-slate-700 text-slate-200'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                        {isAiTyping && (
                          <div className="flex justify-start">
                            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>

                    {/* Quick Questions */}
                    <div className="space-y-2 mb-4">
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Quick Questions:</p>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          "What is the main lesson of this verse?",
                          "How does this relate to daily life?",
                          "What is the Arabic grammar here?",
                          "Are there similar verses?"
                        ].map((question, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-left justify-start text-xs h-8"
                            onClick={() => handleAiQuestion(question, selectedVerse || undefined)}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask about this verse..."
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && aiInput.trim() && handleAiQuestion(aiInput, selectedVerse || undefined)}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        onClick={() => aiInput.trim() && handleAiQuestion(aiInput, selectedVerse || undefined)}
                        disabled={!aiInput.trim() || isAiTyping}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </div>
  )
}