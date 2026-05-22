// src/screens/home-jobs/HomeJobsScreen.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import BottomNav from '../../components/BottomNav'
import { getAllLocal, saveLocal, queueForSync, localId } from '../../services/sync'

export default function HomeJobsScreen() {
  const navigate  = useNavigate()
  const [jobs,    setJobs]    = useState([])
  const [adding,  setAdding]  = useState(false)
  const [newJob,  setNewJob]  = useState('')
  const [newNote, setNewNote] = useState('')
  const [newPri,  setNewPri]  = useState('medium')

  useEffect(() => {
    getAllLocal('home_jobs').then(data => {
      setJobs(data.sort((a, b) => {
        const order = { high: 0, medium: 1, low: 2 }
        return (order[a.priority] || 1) - (order[b.priority] || 1)
      }))
    })
  }, [])

  async function addJob() {
    if (!newJob.trim()) return
    const job = {
      id:        localId(),
      name:      newJob.trim(),
      notes:     newNote.trim(),
      priority:  newPri,
      done:      false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syncStatus:'local'
    }
    await saveLocal('home_jobs', job)
    await queueForSync('create', 'home_jobs', job)
    setJobs(prev => [job, ...prev])
    setNewJob('')
    setNewNote('')
    setNewPri('medium')
    setAdding(false)
  }

  async function toggleJob(id) {
    const job     = jobs.find(j => j.id === id)
    const updated = { ...job, done: !job.done, updatedAt: new Date().toISOString(), syncStatus: 'local' }
    await saveLocal('home_jobs', updated)
    await queueForSync('update', 'home_jobs', updated)
    setJobs(prev => prev.map(j => j.id === id ? updated : j))
  }

  const PRIORITY_COLOR = { high: '#D63B3B', medium: '#E8A900', low: '#2D8653' }
  const PRIORITY_LABEL = { high: 'High',    medium: 'Medium',  low: 'Low'    }

  const pending  = jobs.filter(j => !j.done)
  const done     = jobs.filter(j => j.done)

  return (
    <>
      <AppHeader
        title="Home Jobs"
        onBack={() => navigate('/')}
        rightAction={
          <button
            onClick={() => setAdding(true)}
            style={{
              background: 'var(--orange)', border: 'none', borderRadius: 8,
              color: 'white', fontWeight: 700, fontSize: 22,
              width: 36, height: 36, cursor: 'pointer', lineHeight: 1
            }}
          >+</button>
        }
      />

      <div className="screen">
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>
          Family home project list — add jobs, check them off when done.
        </p>

        {/* Add job form */}
        {adding && (
          <div className="card" style={{ marginBottom: 16 }}>
            <label className="label">Job name</label>
            <input
              className="input"
              placeholder="Fix back gate, build raised bed..."
              value={newJob}
              onChange={e => setNewJob(e.target.value)}
              autoFocus
              style={{ marginBottom: 10 }}
            />
            <label className="label">Notes (optional)</label>
            <input
              className="input"
              placeholder="She wants the drawers on the left side..."
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <label className="label">Priority</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              {['high','medium','low'].map(p => (
                <button
                  key={p}
                  onClick={() => setNewPri(p)}
                  style={{
                    flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    background: newPri === p ? PRIORITY_COLOR[p] : 'var(--charcoal-light)',
                    color: newPri === p ? 'white' : 'var(--muted)'
                  }}
                >
                  {PRIORITY_LABEL[p]}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary" onClick={addJob} style={{ flex: 1 }}>Add Job</button>
              <button className="btn btn-ghost" onClick={() => setAdding(false)} style={{ flex: 1 }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Pending jobs */}
        {pending.length > 0 && (
          <>
            <div className="section-title">To Do ({pending.length})</div>
            <div className="card">
              {pending.map(job => (
                <div
                  key={job.id}
                  className="check-item"
                  onClick={() => toggleJob(job.id)}
                >
                  <div className="check-box" />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 600 }}>{job.name}</span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '2px 6px',
                        borderRadius: 4, background: `${PRIORITY_COLOR[job.priority]}22`,
                        color: PRIORITY_COLOR[job.priority], border: `1px solid ${PRIORITY_COLOR[job.priority]}44`
                      }}>
                        {PRIORITY_LABEL[job.priority]}
                      </span>
                    </div>
                    {job.notes && (
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>
                        {job.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Completed jobs */}
        {done.length > 0 && (
          <>
            <div className="section-title">Done ({done.length})</div>
            <div className="card">
              {done.map(job => (
                <div key={job.id} className="check-item checked" onClick={() => toggleJob(job.id)}>
                  <div className="check-box checked">
                    <span style={{ color: 'white', fontSize: 14 }}>✓</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="check-label" style={{ fontWeight: 600 }}>{job.name}</div>
                    {job.notes && (
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{job.notes}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {jobs.length === 0 && !adding && (
          <div className="empty-state">
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
            <h3>No home jobs yet</h3>
            <p style={{ marginBottom: 20 }}>Tap + to add the first job to the list</p>
            <button className="btn btn-primary" onClick={() => setAdding(true)}>
              Add First Job
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </>
  )
}
