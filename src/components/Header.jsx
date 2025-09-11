import React, { useState } from 'react'
import { Search, TrendingUp, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const Header = ({ onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType] = useState('all')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim().toUpperCase())
    }
  }

  return (
    <header className="bg-dark-bg sticky top-0 z-50">
      <div className="px-4 sm:px-8 lg:px-20 py-3">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-trading-blue to-trading-green rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 
              className="text-white"
              style={{
                width: '173px',
                height: '23px',
                opacity: 1,
                fontFamily: 'Inter, ui-sans-serif, system-ui',
                fontWeight: 700,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '23px',
                letterSpacing: '0px',
                color: '#FFFFFF'
              }}
            >
              FinNews Dashboard
            </h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="w-full sm:flex-1 sm:max-w-3xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-base rounded-full focus:outline-none"
                style={{ backgroundColor: 'rgba(62, 49, 79, 0.8)', color: '#D1C7E0' }}
                disabled={isLoading}
              />
              {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-trading-blue w-5 h-5 animate-spin" />
              )}
            </div>
          </form>

          {/* Right controls removed as requested */}
        </div>
      </div>
    </header>
  )
}

export default Header
