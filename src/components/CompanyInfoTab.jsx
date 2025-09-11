import React from 'react'

const CompanyInfoTab = ({ ticker, payload }) => {
  if (!payload) {
    return (
      <div className="bg-dark-card rounded-lg p-6 text-center text-gray-400">Waiting for company details...</div>
    )
  }

  const { logoUrl, name, sector, marketCap, pe, eps, description, meta } = payload || {}

  return (
    <div className="space-y-12">
      {description && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Company Profile</h3>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
      )}

      <div>
        <h2
          className="text-white mb-4"
          style={{
            width: '928px',
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
          Key Company Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div
            style={{
              width: '286px',
              minHeight: '306px',
              opacity: 1,
              paddingTop: '47px',
              paddingRight: '25px',
              paddingBottom: '47px',
              paddingLeft: '25px',
              borderRadius: '21px',
              backgroundColor: '#1F1D2C',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div
              className="text-white mb-4"
              style={{
                width: '236px',
                height: '38px',
                opacity: 1,
                fontFamily: 'Raleway, ui-sans-serif, system-ui',
                fontWeight: 600,
                fontStyle: 'normal',
                fontSize: '32px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              Market Cap
            </div>
            <div
              className="flex-1"
              style={{
                width: '236px',
                opacity: 1,
                fontFamily: 'Inter, ui-sans-serif, system-ui',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '131%',
                letterSpacing: '0%',
                color: '#9B9B9B',
                textAlign: 'left'
              }}
            >
              {description || '—'}
            </div>
          </div>
          <div
            style={{
              width: '286px',
              minHeight: '306px',
              opacity: 1,
              paddingTop: '47px',
              paddingRight: '25px',
              paddingBottom: '47px',
              paddingLeft: '25px',
              borderRadius: '21px',
              backgroundColor: '#1F1D2C',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div
              className="text-white mb-4"
              style={{
                width: '236px',
                height: '38px',
                opacity: 1,
                fontFamily: 'Raleway, ui-sans-serif, system-ui',
                fontWeight: 600,
                fontStyle: 'normal',
                fontSize: '32px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              P/E
            </div>
            <div
              className="flex-1"
              style={{
                width: '236px',
                opacity: 1,
                fontFamily: 'Inter, ui-sans-serif, system-ui',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '131%',
                letterSpacing: '0%',
                color: '#9B9B9B',
                textAlign: 'left'
              }}
            >
              {description || '—'}
            </div>
          </div>
          <div
            style={{
              width: '286px',
              minHeight: '306px',
              opacity: 1,
              paddingTop: '47px',
              paddingRight: '25px',
              paddingBottom: '47px',
              paddingLeft: '25px',
              borderRadius: '21px',
              backgroundColor: '#1F1D2C',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div
              className="text-white mb-4"
              style={{
                width: '236px',
                height: '38px',
                opacity: 1,
                fontFamily: 'Raleway, ui-sans-serif, system-ui',
                fontWeight: 600,
                fontStyle: 'normal',
                fontSize: '32px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              EPS
            </div>
            <div
              className="flex-1"
              style={{
                width: '236px',
                opacity: 1,
                fontFamily: 'Inter, ui-sans-serif, system-ui',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '131%',
                letterSpacing: '0%',
                color: '#9B9B9B',
                textAlign: 'left'
              }}
            >
              {description || '—'}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CompanyInfoTab


