import React from 'react'
import ChartTab from './ChartTab'
import OptionsChainTab from './OptionsChainTab'
import CompanyInfoTab from './CompanyInfoTab'
import NewsTab from './NewsTab'

const MainPanel = ({ ticker, isLoading, data }) => {
  if (!ticker) {
    return (
      <div className="card p-12 text-center text-gray-400">Search for a stock ticker to get started</div>
    )
  }

  if (isLoading) {
    return (
      <div className="card p-12 text-center text-gray-400">Loading {ticker}...</div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <ChartTab ticker={ticker} payload={data?.chart} />
      </div>

      <div className="card p-6">
        <OptionsChainTab ticker={ticker} payload={data?.options} />
      </div>

      <div className="card p-6">
        <CompanyInfoTab ticker={ticker} payload={data?.company} />
      </div>

      <div className="card p-6">
        <NewsTab ticker={ticker} payload={data?.news} />
      </div>
    </div>
  )
}

export default MainPanel


