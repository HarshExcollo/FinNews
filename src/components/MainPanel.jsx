import React from 'react'
import ChartTab from './ChartTab'
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
    <div className="space-y-16 px-4 sm:px-8 lg:px-20">
      <ChartTab ticker={ticker} payload={data?.chart} />
      <CompanyInfoTab ticker={ticker} payload={data?.company} />
      <NewsTab ticker={ticker} payload={data?.news} />
    </div>
  )
}

export default MainPanel


