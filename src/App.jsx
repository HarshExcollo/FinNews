import React, { useState } from 'react'
import Header from './components/Header'
import MarketBar from './components/MarketBar'
import MainPanel from './components/MainPanel'
import { motion } from 'framer-motion'
import { triggerSearchWebhook } from './lib/api'

function App() {
  const [selectedTicker, setSelectedTicker] = useState('')
  const [selectedDataType, setSelectedDataType] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [marketData, setMarketData] = useState({})
  
  const [tabData, setTabData] = useState({ chart: null, options: null, company: null, news: null })
  const [errorMsg, setErrorMsg] = useState('')

  const handleSearch = async (ticker) => {
    setIsLoading(true)
    setSelectedTicker(ticker)
    setSelectedDataType('all')
    try {
      setErrorMsg('')
      const response = await triggerSearchWebhook({ ticker, type: 'all' })
      // Map common response shapes to UI slots
      const map = (res) => {
        if (!res || typeof res !== 'object') return { chart: null, options: null, company: null, news: null, market: null }
        let chart = res.chart || res.data?.chart || res.chartData || res.chart_html || res.chartHtml || res.tradingView || res.tradingview || res.tv || null
        let options = res.options || res.optionChain || res.fo || res.derivatives || null
        let company = res.company || res.profile || res.info || null
        let news = res.news || res.articles || null
        const market = res.market || res.indices || null

        // Parse a single string output (sections) into buckets
        if (!chart && !options && !company && !news && typeof res.output === 'string') {
          const lines = res.output.trim().split('\n')
          let current = 'news'
          const buckets = { news: [], chart: [], options: [], company: [] }

          const detect = (line) => {
            const l = line.toLowerCase()
            if (l.includes('latest news')) return 'news'
            if (l.includes('chart analysis')) return 'chart'
            if (l.includes('options chain')) return 'options'
            if (l.includes('company snapshot') || l.startsWith('sector:')) return 'company'
            return null
          }

          for (const raw of lines) {
            const line = raw.replace(/^\s*[\u2500-\u257F\-\=\_\|\*\.`~]+\s*$/g, '').trim()
            if (!line) continue
            const sec = detect(line)
            if (sec) { current = sec; continue }
            buckets[current]?.push(line)
          }

          if (buckets.news.length) {
            news = buckets.news
              .filter(l => !/^\W+$/.test(l))
              .map(l => ({ title: l.replace(/^[-•]\s*/, '') }))
          }

          if (buckets.chart.length) {
            const escaped = buckets.chart.join('\n')
              .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            const html = `<pre style="white-space:pre-wrap;line-height:1.4">${escaped}</pre>`
            chart = { html }
          }

          if (buckets.options.length) {
            const rows = buckets.options.filter(l => l.includes('|') && /\d/.test(l))
            const toNumber = (v) => {
              const s = String(v).trim().toLowerCase().replace(/[,]/g, '')
              if (s.endsWith('k')) return parseFloat(s) * 1000
              if (s.endsWith('%')) return s
              const n = parseFloat(s)
              return isNaN(n) ? s : n
            }
            const chain = rows.map(r => {
              const parts = r.split('|').map(p => p.trim()).filter(Boolean)
              const [strike, callOi, putOi, iv] = parts.slice(-4)
              return {
                strike: toNumber(strike),
                callOi: toNumber(callOi),
                putOi: toNumber(putOi),
                callVolume: '-',
                putVolume: '-',
                callBid: '-',
                callAsk: '-',
                callLtp: '-',
                callIv: typeof iv === 'string' && iv.endsWith('%') ? iv : String(iv || ''),
                putIv: typeof iv === 'string' && iv.endsWith('%') ? iv : String(iv || ''),
                putLtp: '-',
                putAsk: '-',
                putBid: '-',
              }
            })
            options = { chain }
          }

          if (buckets.company.length) {
            const joined = buckets.company.join(' ')
            const sectorMatch = joined.match(/Sector:\s*([^|]+?)(?=\s*Market Cap|$)/i)
            const mcapMatch = joined.match(/Market Cap:\s*([^|]+?)(?=\s*\||$)/i)
            const peMatch = joined.match(/P\/?E:\s*([^|]+?)(?=\s*\||$)/i)
            const epsMatch = joined.match(/EPS:\s*([^|]+?)(?=\s*\||$)/i)
            const profileMatch = joined.match(/Profile:\s*(.+)$/i)
            company = {
              name: null,
              sector: sectorMatch ? sectorMatch[1].trim() : undefined,
              marketCap: mcapMatch ? mcapMatch[1].trim() : undefined,
              pe: peMatch ? peMatch[1].trim() : undefined,
              eps: epsMatch ? epsMatch[1].trim() : undefined,
              description: profileMatch ? profileMatch[1].trim() : undefined,
            }
          }
        }
        return { chart, options, company, news, market }
      }

      const mapped = map(response)
      setTabData({
        chart: mapped.chart ?? null,
        company: mapped.company ?? null,
        news: mapped.news ?? null,
      })
      if (mapped.market) setMarketData(mapped.market)
      if (response?.market) setMarketData(response.market)
    } catch (err) {
      console.error('[FinNews] Webhook error:', err)
      setErrorMsg(err?.response?.data?.message || err?.message || 'Webhook call failed')
    } finally {
      setIsLoading(false)
    }
  }

  

  return (
    <div className="min-h-screen bg-dark-bg">
      {errorMsg && (
        <div className="bg-red-900/40 text-red-200 border border-red-800 px-4 py-2 text-sm">
          {errorMsg}
        </div>
      )}
      {/* Header */}
      <Header 
        onSearch={handleSearch}
        isLoading={isLoading}
      />
      
      {/* Market Overview Bar */}
      <MarketBar data={marketData} />
      
      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-4 px-4 sm:px-8 lg:px-20">
        {/* Main Content */}
        <div className="flex-1">
          <MainPanel
            ticker={selectedTicker}
            isLoading={isLoading}
            data={tabData}
          />
        </div>
      </div>
    </div>
  )
}

export default App
