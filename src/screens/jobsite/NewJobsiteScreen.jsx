// src/screens/jobsite/NewJobsiteScreen.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import { saveLocal, queueForSync, generateJobsiteCode, localId } from '../../services/sync'
import { useAuth } from '../../context/AuthContext'

export default function NewJobsiteScreen() {
  const navigate = useNavigate()
  const { user }  = useAuth()
  const [name,    setName]    = useState('')
  const [address, setAddress] = useState('')
  const [saving,  setSaving]  = useState(false)

  const code = name.trim() ? generateJobsiteCode(name.trim()) : null

  async function handleCreate() {
    if (!name.trim()) return
    setSaving(true)
    const jobsite = {
      id:          localId(),
      name:        name.trim(),
      address:     address.trim(),
      jobsiteCode: generateJobsiteCode(name.trim()),
      ownerId:     user?.$id || 'local',
      createdAt:   new Date().toISOString(),
      updatedAt:   new Date().toISOString(),
      syncStatus:  'local'
    }
    await saveLocal('jobsites', jobsite)
    await queueForSync('create', 'jobsites', jobsite)
    navigate(`/jobsites/${jobsite.id}`, { replace: true })
  }

  return (
    <>
      <AppHeader title="New Jobsite" onBack={() => navigate(-1)} />

      <div className="screen" style={{ paddingTop: 24 }}>

        {/* Card */}
        <div style={{
          background:   '#222',
          borderRadius: 16,
          border:       '1px solid #333',
          padding:      '24px 20px',
          marginBottom: 16
        }}>
          <label className="label" style={{ fontSize: 11, letterSpacing: 1 }}>JOB NAME *</label>
          <input
            className="input"
            placeholder="Smith Deck, Maple St Reno..."
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ marginBottom: 6, fontSize: 15 }}
          />

          {/* Live code preview */}
          <div style={{ marginBottom: 20, minHeight: 24 }}>
            {code ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>Jobsite code:</span>
                <span style={{
                  fontFamily:    'monospace',
                  fontSize:      12,
                  fontWeight:    700,
                  color:         '#E85C00',
                  background:    'rgba(232,92,0,0.1)',
                  border:        '1px solid rgba(232,92,0,0.3)',
                  borderRadius:  6,
                  padding:       '2px 8px',
                  letterSpacing: 1
                }}>{code}</span>
              </div>
            ) : (
              <span style={{ fontSize: 12, color: '#444' }}>Code auto-generates from job name</span>
            )}
          </div>

          <label className="label" style={{ fontSize: 11, letterSpacing: 1 }}>ADDRESS (OPTIONAL)</label>
          <input
            className="input"
            placeholder="123 Main St, Wilson NC"
            value={address}
            onChange={e => setAddress(e.target.value)}
            style={{ marginBottom: 4, fontSize: 15 }}
          />
          <p style={{ fontSize: 11, color: '#555', marginTop: 8, lineHeight: 1.5 }}>
            The jobsite code is stamped on every order, note, and photo from this job.
          </p>
        </div>

        {/* Create button */}
        <button
          onClick={handleCreate}
          disabled={!name.trim() || saving}
          style={{
            width:         '100%',
            padding:       '16px',
            borderRadius:  12,
            border:        'none',
            background:    (!name.trim() || saving)
              ? '#333'
              : 'linear-gradient(135deg, #ff6b1a 0%, #c44800 100%)',
            color:         (!name.trim() || saving) ? '#555' : '#fff',
            fontSize:      16,
            fontWeight:    700,
            cursor:        (!name.trim() || saving) ? 'not-allowed' : 'pointer',
            letterSpacing: '0.5px',
            boxShadow:     (!name.trim() || saving) ? 'none' : '0 4px 16px rgba(232,92,0,0.3)',
            transition:    'all 0.2s ease',
            marginBottom:  10
          }}
        >
          {saving ? 'Creating...' : 'Create Jobsite'}
        </button>

        <button
          onClick={() => navigate(-1)}
          style={{
            width:        '100%',
            padding:      '14px',
            borderRadius: 12,
            border:       '1px solid #333',
            background:   'transparent',
            color:        '#666',
            fontSize:     15,
            cursor:       'pointer'
          }}
        >
          Cancel
        </button>
      </div>
    </>
  )
}
