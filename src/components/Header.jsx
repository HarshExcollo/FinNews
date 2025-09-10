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
    <header className="bg-dark-card border-b border-dark-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-trading-blue to-trading-green rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">FinNews Dashboard</h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter stock ticker (e.g., AAPL, NIFTY, Reliance)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 input-field text-lg"
                disabled={isLoading}
              />
              {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-trading-blue w-5 h-5 animate-spin" />
              )}
            </div>
          </form>

          {/* Type controls removed; single combined panel */}
        </div>
      </div>
    </header>
  )
}

export default Header
