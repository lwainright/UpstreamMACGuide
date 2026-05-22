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

  // Preview the code as they type
  const codePreview = name.trim() ? generateJobsiteCode(name.trim()) : 'SITE-???'

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

      <div className="screen">
        <div className="card">
          <label className="label">Job Name *</label>
          <input
            className="input"
            placeholder="Smith Deck, Maple St Reno..."
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ marginBottom: 8 }}
          />
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20 }}>
            Jobsite code: <span className="code-badge" style={{ marginLeft: 6 }}>
              {name.trim() ? generateJobsiteCode(name.trim()) : 'auto-generated'}
            </span>
          </div>

          <label className="label">Address (optional)</label>
          <input
            className="input"
            placeholder="123 Main St, Wilson NC"
            value={address}
            onChange={e => setAddress(e.target.value)}
            style={{ marginBottom: 8 }}
          />
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
            The jobsite code is stamped on every order, note, and photo from this job.
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleCreate}
          disabled={!name.trim() || saving}
          style={{ marginTop: 8, opacity: (!name.trim() || saving) ? 0.6 : 1 }}
        >
          {saving ? 'Creating...' : 'Create Jobsite'}
        </button>

        <button
          className="btn btn-ghost"
          onClick={() => navigate(-1)}
          style={{ marginTop: 10 }}
        >
          Cancel
        </button>
      </div>
    </>
  )
}
