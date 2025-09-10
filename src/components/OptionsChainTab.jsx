import React from 'react'
import { motion } from 'framer-motion'

const OptionsChainTab = ({ ticker, payload }) => {
  const expiries = payload?.expiries || payload?.expiry || []
  const optionsData = payload?.chain || payload?.rows || Array.isArray(payload) ? payload : []
  const selectedStrike = payload?.selectedStrike
  const currentPrice = payload?.currentPrice

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{ticker} Options Chain</h2>
          {typeof currentPrice === 'number' && (
            <p className="text-gray-400">Current Price: <span className="text-trading-blue font-semibold">${currentPrice}</span></p>
          )}
        </div>

        {expiries.length > 0 && (
          <div className="flex gap-2">
            {expiries.map((exp) => (
              <button
                key={exp}
                className={`px-3 py-1 rounded-lg text-sm font-medium bg-dark-card text-gray-400`}
                disabled
              >
                {exp}
              </button>
            ))}
          </div>
        )}
      </div>

      {!optionsData.length ? (
        <div className="bg-dark-card rounded-lg p-6 text-center text-gray-400">Waiting for options chain data...</div>
      ) : (
        <div className="bg-dark-card rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-border">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">CALLS</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">OI</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Vol</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Bid</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Ask</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">LTP</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">IV</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-trading-blue">Strike</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">IV</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">LTP</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Ask</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Bid</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Vol</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">OI</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">PUTS</th>
                </tr>
              </thead>
              <tbody>
                {optionsData.map((row, index) => (
                  <motion.tr
                    key={row.strike}
                    className={`border-b border-dark-border hover:bg-dark-border/50 transition-colors duration-200 ${
                      row.strike === selectedStrike ? 'bg-trading-blue/10' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.01 }}
                  >
                    <td className="px-4 py-3 text-sm text-trading-green font-medium">{row.callLtp}</td>
                    <td className="px-4 py-3 text-sm text-white text-center">{row.callOi}</td>
                    <td className="px-4 py-3 text-sm text-white text-center">{row.callVolume}</td>
                    <td className="px-4 py-3 text-sm text-white text-center">{row.callBid}</td>
                    <td className="px-4 py-3 text-sm text-white text-center">{row.callAsk}</td>
                    <td className="px-4 py-3 text-sm text-trading-green text-center font-medium">{row.callLtp}</td>
                    <td className="px-4 py-3 text-sm text-white text-center">{row.callIv}</td>
                    <td className="px-4 py-3 text-center text-white font-bold">{row.strike}</td>
                    <td className="px-4 py-3 text-sm text-white text-center">{row.putIv}</td>
                    <td className="px-4 py-3 text-sm text-trading-red text-center font-medium">{row.putLtp}</td>
                    <td className="px-4 py-3 text-sm text-white text-center">{row.putAsk}</td>
                    <td className="px-4 py-3 text-sm text-white text-center">{row.putBid}</td>
                    <td className="px-4 py-3 text-sm text-white text-center">{row.putVolume}</td>
                    <td className="px-4 py-3 text-sm text-white text-center">{row.putOi}</td>
                    <td className="px-4 py-3 text-sm text-trading-red font-medium">{row.putLtp}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default OptionsChainTab
