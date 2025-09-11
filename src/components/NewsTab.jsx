import React from 'react'

const extractLinkFromText = (text) => {
  if (!text) return { cleanText: text, url: undefined }
  const match = text.match(/\[\s*read\s*more\s*\]\(([^)]+)\)/i)
  if (match) {
    const url = match[1]
    const cleanText = text.replace(match[0], '').trim()
    return { cleanText, url }
  }
  return { cleanText: text, url: undefined }
}

const NewsTab = ({ ticker, payload }) => {
  const articles = payload?.articles || payload || []

  if (!articles.length) {
    return (
      <div className="text-center text-gray-400">Waiting for news...</div>
    )
  }

  return (
    <div className="space-y-6">
      <h2
        className="text-white"
        style={{
          width: '100%',
          height: '28px',
          opacity: 1,
          fontFamily: 'Inter, ui-sans-serif, system-ui',
          fontWeight: 700,
          fontStyle: 'normal',
          fontSize: '22px',
          lineHeight: '28px',
          letterSpacing: '0px'
        }}
      >
        News Feed
      </h2>
      <div className="space-y-4 max-h-[32rem] overflow-y-auto pr-0 sm:pr-2">
      {articles.map((a, idx) => {
        const titleRaw = typeof a === 'string' ? a : a.title
        const { cleanText: title, url: urlFromTitle } = extractLinkFromText(titleRaw)
        const url = a.url || urlFromTitle
        return (
          <div
            key={idx}
            className="p-6 hover:bg-dark-border transition-colors bg-dark-bg rounded-lg"
          >
            <div
              className="text-white font-semibold"
              style={{
                width: '100%',
                minHeight: '20px',
                opacity: 1,
                fontFamily: 'Inter, ui-sans-serif, system-ui',
                fontWeight: 700,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '20px',
                letterSpacing: '0px',
                marginBottom: '12px'
              }}
            >
              {title}
              {(a.source || a.publishedAt) && (
                <span className="text-gray-400 text-sm font-normal ml-2">
                  — {a.source || ''} {a.publishedAt ? `— ${a.publishedAt}` : ''}
                </span>
              )}
            </div>
            {a.summary && (
              <div 
                className="text-gray-300 text-sm line-clamp-2"
                style={{ marginBottom: '12px' }}
              >
                {a.summary}
              </div>
            )}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="block"
                style={{
                  width: '119px',
                  height: '44px',
                  opacity: 1,
                  gap: '8px',
                  paddingTop: '10px',
                  paddingRight: '16px',
                  paddingBottom: '10px',
                  paddingLeft: '16px',
                  borderRadius: '8px',
                  background: 'linear-gradient(180deg, rgba(142, 84, 247, 0.5) 0%, rgba(72, 50, 197, 0.164) 67.2%, rgba(207, 199, 255, 0) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  marginTop: '8px'
                }}
              >
                <span
                  style={{
                    width: '87px',
                    height: '24px',
                    opacity: 1,
                    fontFamily: 'Poppins, ui-sans-serif, system-ui',
                    fontWeight: 600,
                    fontStyle: 'normal',
                    fontSize: '16px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#FFFFFF'
                  }}
                >
                  Read More
                </span>
              </a>
            )}
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default NewsTab


