import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { motion } from 'framer-motion'

const MarketBar = ({ data }) => {
  const indices = [
    { name: 'NIFTY', key: 'nifty', color: 'text-blue-400' },
    { name: 'SENSEX', key: 'sensex', color: 'text-green-400' },
    { name: 'NASDAQ', key: 'nasdaq', color: 'text-purple-400' },
    { name: 'DOW', key: 'dow', color: 'text-yellow-400' },
    { name: 'GOLD', key: 'gold', color: 'text-yellow-500' },
    { name: 'CRUDE', key: 'crude', color: 'text-orange-500' }
  ]

  const getPriceChangeIcon = (change) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-trading-green" />
    if (change < 0) return <TrendingDown className="w-4 h-4 text-trading-red" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  const getPriceChangeClass = (change) => {
    if (change > 0) return 'price-up'
    if (change < 0) return 'price-down'
    return 'price-neutral'
  }

  return (
    <div className="bg-dark-bg py-8">
      <div className="px-20">
        <div className="flex flex-col gap-6">
          <h1
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
            style={{ width: '288px', height: '40px', minWidth: '288px', opacity: 1 }}
          >
            Market Overview
          </h1>

          {/* Analysis block removed as requested */}
          
          <div className="flex flex-wrap items-center gap-6">
            {indices.map((index) => {
              const indexData = data?.[index.key]
              if (!indexData) return null
              
              return (
                <motion.div
                  key={index.key}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: indices.indexOf(index) * 0.1 }}
                >
                  <span className={`text-sm font-medium ${index.color}`}>
                    {index.name}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {indexData.price.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1">
                    {getPriceChangeIcon(indexData.change)}
                    <span className={`text-xs font-medium ${getPriceChangeClass(indexData.change)}`}>
                      {indexData.change > 0 ? '+' : ''}{indexData.change.toFixed(2)}
                    </span>
                    <span className={`text-xs font-medium ${getPriceChangeClass(indexData.change)}`}>
                      ({indexData.changePercent > 0 ? '+' : ''}{indexData.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketBar
