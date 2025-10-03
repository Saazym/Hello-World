const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001'

// API utility function with authentication
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token')
  
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
  
  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  return response.json()
}

// Specific API functions
export const quranAPI = {
  getVerses: (surah?: number) => apiCall(`/api/quran/verses${surah ? `?surah=${surah}` : ''}`),
  getSurahs: () => apiCall('/api/quran/surahs'),
  bookmarkVerse: (verseId: string) => apiCall('/api/quran/bookmark', {
    method: 'POST',
    body: JSON.stringify({ verse_id: verseId }),
  }),
  getBookmarks: () => apiCall('/api/quran/bookmarks'),
  updateProgress: (surah: number, verse: number) => apiCall('/api/quran/progress', {
    method: 'POST',
    body: JSON.stringify({ surah, verse }),
  }),
}

export const mapsAPI = {
  getMosques: (lat?: number, lng?: number, radius?: number) => {
    let url = '/api/maps/mosques'
    const params = new URLSearchParams()
    if (lat && lng) {
      params.append('lat', lat.toString())
      params.append('lng', lng.toString())
    }
    if (radius) params.append('radius', radius.toString())
    if (params.toString()) url += `?${params.toString()}`
    return apiCall(url)
  },
  getQiblaDirection: (lat: number, lng: number) => 
    apiCall(`/api/maps/qibla-direction?lat=${lat}&lng=${lng}`),
  getPrayerTimes: (lat: number, lng: number) => 
    apiCall(`/api/maps/prayer-times?lat=${lat}&lng=${lng}`),
}

export const communityAPI = {
  getPosts: (skip = 0, limit = 10) => 
    apiCall(`/api/community/posts?skip=${skip}&limit=${limit}`),
  createPost: (content: string) => apiCall('/api/community/posts', {
    method: 'POST',
    body: JSON.stringify({ content }),
  }),
  likePost: (postId: string) => apiCall(`/api/community/posts/${postId}/like`, {
    method: 'POST',
  }),
  addComment: (postId: string, commentContent: string) => 
    apiCall(`/api/community/posts/${postId}/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment_content: commentContent }),
    }),
  getEvents: () => apiCall('/api/community/events'),
  getGroups: () => apiCall('/api/community/groups'),
}

export const charityAPI = {
  getOrganizations: (category?: string) => {
    let url = '/api/charity/organizations'
    if (category) url += `?category=${category}`
    return apiCall(url)
  },
  makeDonation: (organizationId: string, amount: number, projectName?: string) => 
    apiCall('/api/charity/donate', {
      method: 'POST',
      body: JSON.stringify({ 
        organization_id: organizationId, 
        amount, 
        project_name: projectName 
      }),
    }),
  getDonations: () => apiCall('/api/charity/donations'),
  getStats: () => apiCall('/api/charity/stats'),
  calculateZakat: (savings = 0, gold = 0, silver = 0, businessAssets = 0) => 
    apiCall(`/api/charity/zakat-calculator?savings=${savings}&gold=${gold}&silver=${silver}&business_assets=${businessAssets}`),
  getLeaderboard: () => apiCall('/api/charity/leaderboard'),
}

export const duasAPI = {
  getDuas: (category?: string) => {
    let url = '/api/duas/'
    if (category) url += `?category=${category}`
    return apiCall(url)
  },
  getCategories: () => apiCall('/api/duas/categories'),
  favoriteDua: (duaId: string) => apiCall('/api/duas/favorite', {
    method: 'POST',
    body: JSON.stringify({ dua_id: duaId }),
  }),
  getFavorites: () => apiCall('/api/duas/favorites'),
  getDailyReminder: () => apiCall('/api/duas/daily-reminder'),
}

export const islamicFinanceAPI = {
  getProducts: (type?: string) => {
    let url = '/api/islamic-finance/products'
    if (type) url += `?type=${type}`
    return apiCall(url)
  },
  getHalalStocks: () => apiCall('/api/islamic-finance/halal-stocks'),
  calculateInvestment: (principal: number, returnRate: number, years: number) => 
    apiCall(`/api/islamic-finance/investment-calculator?principal=${principal}&return_rate=${returnRate}&years=${years}`),
  getMarketNews: () => apiCall('/api/islamic-finance/market-news'),
  addToPortfolio: (productId: string, amount: number) => 
    apiCall('/api/islamic-finance/portfolio/add', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, amount }),
    }),
  getPortfolio: () => apiCall('/api/islamic-finance/portfolio'),
}

export const volunteerAPI = {
  getOpportunities: (category?: string, location?: string) => {
    let url = '/api/volunteer/opportunities'
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (location) params.append('location', location)
    if (params.toString()) url += `?${params.toString()}`
    return apiCall(url)
  },
  register: (opportunityId: string) => 
    apiCall(`/api/volunteer/register/${opportunityId}`, { method: 'POST' }),
  getMyRegistrations: () => apiCall('/api/volunteer/my-registrations'),
  getCategories: () => apiCall('/api/volunteer/categories'),
  getStats: () => apiCall('/api/volunteer/stats'),
  createOpportunity: (opportunityData: any) => 
    apiCall('/api/volunteer/create', {
      method: 'POST',
      body: JSON.stringify(opportunityData),
    }),
}

export const marriageAPI = {
  getProfiles: (filters?: any) => {
    let url = '/api/marriage/profiles'
    const params = new URLSearchParams()
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key].toString())
        }
      })
    }
    if (params.toString()) url += `?${params.toString()}`
    return apiCall(url)
  },
  createProfile: (profileData: any) => 
    apiCall('/api/marriage/profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    }),
  getMyProfile: () => apiCall('/api/marriage/profile/me'),
  updateProfile: (profileData: any) => 
    apiCall('/api/marriage/profile/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),
  expressInterest: (profileId: string) => 
    apiCall(`/api/marriage/interest/${profileId}`, { method: 'POST' }),
  getReceivedInterests: () => apiCall('/api/marriage/interests/received'),
  checkCompatibility: (profileId: string) => 
    apiCall(`/api/marriage/compatibility/${profileId}`),
  getSuccessStories: () => apiCall('/api/marriage/success-stories'),
}