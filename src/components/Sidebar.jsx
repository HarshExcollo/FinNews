import React from 'react'
import { Trash2, Bell } from 'lucide-react'

const Sidebar = ({ watchlist, onRemoveFromWatchlist, onSelectTicker }) => {
  return (
    <aside className="card p-4 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Watchlist</h3>
        {!watchlist.length ? (
          <div className="text-gray-400 text-sm">No symbols yet. Add from chart tab.</div>
        ) : (
          <ul className="space-y-2">
            {watchlist.map((t) => (
              <li key={t} className="flex items-center justify-between gap-2 bg-dark-card border border-dark-border rounded-lg px-3 py-2">
                <button onClick={() => onSelectTicker(t)} className="text-white font-medium hover:underline">
                  {t}
                </button>
                <button onClick={() => onRemoveFromWatchlist(t)} className="text-gray-400 hover:text-trading-red">
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Alerts</h3>
        <div className="bg-dark-card border border-dark-border rounded-lg p-4 text-center text-gray-400">
          <Bell className="w-5 h-5 mx-auto mb-2" />
          <div className="text-sm">Alerts coming soon</div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar


