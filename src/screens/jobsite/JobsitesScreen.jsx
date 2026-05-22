// src/screens/jobsite/JobsitesScreen.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import BottomNav from '../../components/BottomNav'
import { getAllLocal } from '../../services/sync'

export default function JobsitesScreen() {
  const navigate = useNavigate()
  const [sites, setSites] = useState([])

  useEffect(() => {
    getAllLocal('jobsites').then(data => {
      setSites(data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)))
    })
  }, [])

  return (
    <>
      <AppHeader
        title="Jobsites"
        rightAction={
          <button
            onClick={() => navigate('/jobsites/new')}
            style={{
              background: 'var(--orange)', border: 'none', borderRadius: 8,
              color: 'white', fontWeight: 700, fontSize: 22,
              width: 36, height: 36, cursor: 'pointer', lineHeight: 1
            }}
          >+</button>
        }
      />

      <div className="screen">
        {sites.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏗</div>
            <h3>No jobsites yet</h3>
            <p style={{ marginBottom: 20 }}>Tap + to create your first jobsite</p>
            <button className="btn btn-primary" onClick={() => navigate('/jobsites/new')}>
              Create Jobsite
            </button>
          </div>
        ) : (
          sites.map(site => (
            <div
              key={site.id}
              className="card"
              onClick={() => navigate(`/jobsites/${site.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                    {site.name}
                  </div>
                  {site.address && (
                    <div style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 8 }}>
                      {site.address}
                    </div>
                  )}
                  <span className="code-badge">{site.jobsiteCode}</span>
                </div>
                <div style={{ color: 'var(--muted)', fontSize: 20, marginLeft: 12 }}>›</div>
              </div>
              {site.syncStatus === 'local' && (
                <div style={{ marginTop: 8, fontSize: 11, color: 'var(--warning)' }}>
                  ⏳ Pending sync
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <BottomNav />
    </>
  )
}
