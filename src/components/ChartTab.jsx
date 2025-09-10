import React from 'react'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const ChartTab = ({ ticker, payload }) => {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">{ticker}</h2>
      </div>

      <div className="bg-dark-card rounded-lg p-4">
        <div className="h-96 flex items-center justify-center text-gray-400">
          {!payload ? (
            <div className="text-center">
              <div className="text-sm">Waiting for chart data...</div>
              <div className="text-xs text-gray-500 mt-1">Backend webhook should return chart embed/config.</div>
            </div>
          ) : (
            (() => {
              // Accept multiple shapes: string HTML, {embedHtml}, {html}, {iframe}
              const html = typeof payload === 'string' ? payload : (payload?.embedHtml || payload?.html || payload?.iframe || '')
              if (html) return <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: html }} />
              return <div className="text-sm">Chart payload received but no embed HTML found.</div>
            })()
          )}
        </div>
      </div>

      {payload?.stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(payload.stats).map(([label, value]) => (
            <div key={label} className="bg-dark-card rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-sm text-gray-400">{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ChartTab


