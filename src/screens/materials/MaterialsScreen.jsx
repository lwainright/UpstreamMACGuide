// src/screens/materials/MaterialsScreen.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import BottomNav from '../../components/BottomNav'
import { getAllLocal, saveLocal, queueForSync, localId, getLocal } from '../../services/sync'

export default function MaterialsScreen() {
  const navigate       = useNavigate()
  const { jobsiteId }  = useParams()
  const [jobsite,  setJobsite]  = useState(null)
  const [items,    setItems]    = useState([])
  const [newItem,  setNewItem]  = useState('')
  const [newQty,   setNewQty]   = useState('1')
  const [newUnit,  setNewUnit]  = useState('ea')
  const [adding,   setAdding]   = useState(false)

  useEffect(() => {
    if (jobsiteId) {
      getLocal('jobsites', jobsiteId).then(setJobsite)
    }
    getAllLocal('materials').then(all => {
      const filtered = jobsiteId
        ? all.filter(m => m.jobsiteId === jobsiteId)
        : all
      setItems(filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    })
  }, [jobsiteId])

  async function addItem() {
    if (!newItem.trim()) return
    const item = {
      id:          localId(),
      jobsiteId:   jobsiteId || 'general',
      jobsiteCode: jobsite?.jobsiteCode || 'GEN',
      name:        newItem.trim(),
      qty:         newQty || '1',
      unit:        newUnit,
      checked:     false,
      createdAt:   new Date().toISOString(),
      updatedAt:   new Date().toISOString(),
      syncStatus:  'local'
    }
    await saveLocal('materials', item)
    await queueForSync('create', 'materials', item)
    setItems(prev => [item, ...prev])
    setNewItem('')
    setNewQty('1')
    setAdding(false)
  }

  async function toggleItem(id) {
    const item    = items.find(i => i.id === id)
    const updated = { ...item, checked: !item.checked, updatedAt: new Date().toISOString(), syncStatus: 'local' }
    await saveLocal('materials', updated)
    await queueForSync('update', 'materials', updated)
    setItems(prev => prev.map(i => i.id === id ? updated : i))
  }

  const unchecked = items.filter(i => !i.checked)
  const checked   = items.filter(i => i.checked)

  return (
    <>
      <AppHeader
        title={jobsite ? jobsite.name : 'Materials'}
        onBack={jobsiteId ? () => navigate(`/jobsites/${jobsiteId}`) : null}
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
        {/* Jobsite code badge */}
        {jobsite && (
          <div style={{ marginBottom: 12 }}>
            <span className="code-badge">{jobsite.jobsiteCode}</span>
          </div>
        )}

        {/* Add item form */}
        {adding && (
          <div className="card" style={{ marginBottom: 16 }}>
            <label className="label">Item name</label>
            <input
              className="input"
              placeholder="2x10x16 lumber, deck screws..."
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addItem()}
              autoFocus
              style={{ marginBottom: 10 }}
            />
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <label className="label">Qty</label>
                <input
                  className="input"
                  type="number"
                  inputMode="numeric"
                  value={newQty}
                  onChange={e => setNewQty(e.target.value)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label className="label">Unit</label>
                <select
                  className="input"
                  value={newUnit}
                  onChange={e => setNewUnit(e.target.value)}
                >
                  <option value="ea">ea</option>
                  <option value="lf">lf</option>
                  <option value="sf">sf</option>
                  <option value="bd">bd</option>
                  <option value="lb">lb</option>
                  <option value="bag">bag</option>
                  <option value="box">box</option>
                  <option value="roll">roll</option>
                  <option value="sheet">sheet</option>
                  <option value="set">set</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary" onClick={addItem} style={{ flex: 1 }}>
                Add Item
              </button>
              <button className="btn btn-ghost" onClick={() => setAdding(false)} style={{ flex: 1 }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Needed items */}
        {unchecked.length > 0 && (
          <>
            <div className="section-title">Needed ({unchecked.length})</div>
            <div className="card">
              {unchecked.map(item => (
                <div key={item.id} className={`check-item ${item.checked ? 'checked' : ''}`} onClick={() => toggleItem(item.id)}>
                  <div className={`check-box ${item.checked ? 'checked' : ''}`}>
                    {item.checked && <span style={{ color: 'white', fontSize: 14 }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="check-label" style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                      {item.qty} {item.unit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Got items */}
        {checked.length > 0 && (
          <>
            <div className="section-title">Got it ({checked.length})</div>
            <div className="card">
              {checked.map(item => (
                <div key={item.id} className="check-item checked" onClick={() => toggleItem(item.id)}>
                  <div className="check-box checked">
                    <span style={{ color: 'white', fontSize: 14 }}>✓</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="check-label" style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                      {item.qty} {item.unit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {items.length === 0 && !adding && (
          <div className="empty-state">
            <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
            <h3>No materials yet</h3>
            <p style={{ marginBottom: 20 }}>Tap + to add items to this list</p>
            <button className="btn btn-primary" onClick={() => setAdding(true)}>
              Add First Item
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </>
  )
}
