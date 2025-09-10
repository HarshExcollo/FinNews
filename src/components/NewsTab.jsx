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
      <div className="bg-dark-card rounded-lg p-6 text-center text-gray-400">Waiting for news...</div>
    )
  }

  return (
    <div className="space-y-4 max-h-[32rem] overflow-y-auto pr-2">
      {articles.map((a, idx) => {
        const titleRaw = typeof a === 'string' ? a : a.title
        const { cleanText: title, url: urlFromTitle } = extractLinkFromText(titleRaw)
        const url = a.url || urlFromTitle
        return (
          <div
            key={idx}
            className="card p-4 hover:bg-dark-border transition-colors"
          >
            <div className="text-sm text-gray-400">{a.source || '—'}</div>
            <div className="text-white font-semibold">{title}</div>
            {a.summary && <div className="text-gray-300 text-sm mt-1 line-clamp-2">{a.summary}</div>}
            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-gray-500">{a.publishedAt || ''}</div>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary px-3 py-1"
                >
                  Read more
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default NewsTab


