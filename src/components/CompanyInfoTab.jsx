import React from 'react'

const CompanyInfoTab = ({ ticker, payload }) => {
  if (!payload) {
    return (
      <div className="bg-dark-card rounded-lg p-6 text-center text-gray-400">Waiting for company details...</div>
    )
  }

  const { logoUrl, name, sector, marketCap, pe, eps, description, meta } = payload || {}

  return (
    <div className="space-y-6">
      <div className="card p-6 flex flex-col sm:flex-row gap-6">
        {logoUrl && (
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-dark-border flex items-center justify-center">
            <img src={logoUrl} alt={`${ticker} logo`} className="w-full h-full object-contain" />
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{name || ticker}</h2>
          <p className="text-gray-400">{sector || '—'}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div>
              <div className="text-sm text-gray-400">Market Cap</div>
              <div className="text-white font-semibold">{marketCap ?? '—'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">P/E</div>
              <div className="text-white font-semibold">{pe ?? '—'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">EPS</div>
              <div className="text-white font-semibold">{eps ?? '—'}</div>
            </div>
          </div>
        </div>
      </div>

      {description && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-2">About</h3>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
      )}

      {meta && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(meta).map(([label, value]) => (
              <div key={label} className="bg-dark-card rounded-lg p-4">
                <div className="text-sm text-gray-400">{label}</div>
                <div className="text-white font-semibold">{value ?? '—'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CompanyInfoTab


