import React from 'react'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const ChartTab = ({ ticker, payload }) => {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2
          className="text-white"
          style={{
            width: '608px',
            height: '20px',
            opacity: 1,
            fontFamily: 'Inter, ui-sans-serif, system-ui',
            fontWeight: 700,
            fontStyle: 'normal',
            fontSize: '16px',
            lineHeight: '20px',
            letterSpacing: '0px'
          }}
        >
          Short term market analysis
        </h2>
      </div>

      <div className="flex items-start justify-between gap-6 text-gray-400">
        {!payload ? (
          <div className="text-center flex-1">
            <div className="text-sm">Waiting for chart data...</div>
            <div className="text-xs text-gray-500 mt-1">Backend webhook should return chart embed/config.</div>
          </div>
        ) : (
          (() => {
            // Accept multiple shapes: string HTML, {embedHtml}, {html}, {iframe}
            const html = typeof payload === 'string' ? payload : (payload?.embedHtml || payload?.html || payload?.iframe || '')
            if (html) return (
              <div
                className="w-full h-full flex-1"
                style={{
                  width: '608px',
                  height: 'auto',
                  opacity: 1,
                  fontFamily: 'Inter, ui-sans-serif, system-ui',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0px',
                  color: '#AB9CBA'
                }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )
            // If not HTML, render plain text with the same styles, left-aligned
            const text = typeof payload === 'object' && payload?.text ? payload.text : String(payload)
            return (
              <p
                className="flex-1"
                style={{
                  width: '608px',
                  height: 'auto',
                  opacity: 1,
                  fontFamily: 'Inter, ui-sans-serif, system-ui',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0px',
                  color: '#AB9CBA',
                  whiteSpace: 'pre-wrap'
                }}
              >{text}</p>
            )
          })()
        )}
        <div className="w-56 h-36 rounded-lg overflow-hidden">
          <img
            src="https://source.unsplash.com/N__BnvQ_w18/560x360"
            alt="black flat screen computer monitor"
            className="w-full h-full object-cover"
          />
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


