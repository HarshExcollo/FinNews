import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChartTab from './ChartTab'
import OptionsChainTab from './OptionsChainTab'
import CompanyInfoTab from './CompanyInfoTab'
import NewsTab from './NewsTab'
import { TrendingUp, Link, Building2, Newspaper, Loader2 } from 'lucide-react'

const Tabs = ({ selectedTicker, selectedDataType, isLoading, data, onAddToWatchlist, watchlist }) => {
  const [activeTab, setActiveTab] = useState(selectedDataType)

  useEffect(() => {
    setActiveTab(selectedDataType)
  }, [selectedDataType])

  const tabs = [
    { id: 'chart', label: 'Chart', icon: TrendingUp },
    { id: 'options', label: 'F&O Chain', icon: Link },
    { id: 'company', label: 'Company Info', icon: Building2 },
    { id: 'news', label: 'News', icon: Newspaper }
  ]

  const renderTabContent = () => {
    if (!selectedTicker) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Welcome to FinNews Dashboard</h3>
            <p className="text-gray-500">Search for a stock ticker to get started</p>
          </div>
        </div>
      )
    }

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-trading-blue animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading {selectedTicker} data...</p>
          </div>
        </div>
      )
    }

    switch (activeTab) {
      case 'chart':
        return <ChartTab ticker={selectedTicker} payload={data?.chart} onAddToWatchlist={onAddToWatchlist} watchlist={watchlist} />
      case 'options':
        return <OptionsChainTab ticker={selectedTicker} payload={data?.options} />
      case 'company':
        return <CompanyInfoTab ticker={selectedTicker} payload={data?.company} />
      case 'news':
        return <NewsTab ticker={selectedTicker} payload={data?.news} />
      default:
        return <ChartTab ticker={selectedTicker} payload={data?.chart} onAddToWatchlist={onAddToWatchlist} watchlist={watchlist} />
    }
  }

  return (
    <div className="card">
      {/* Tab Headers */}
      <div className="flex border-b border-dark-border">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'tab-active border-b-2 border-trading-blue'
                  : 'tab-inactive hover:bg-dark-border'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Tabs
