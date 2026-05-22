// src/screens/splash/SplashScreen.jsx
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function SplashScreen() {
  const { user, loading } = useAuth()
  const navigate          = useNavigate()
  const hasNavigated      = useRef(false)

  useEffect(() => {
    if (loading) return
    const timer = setTimeout(() => {
      if (!hasNavigated.current) {
        hasNavigated.current = true
        navigate(user ? '/' : '/auth/login', { replace: true })
      }
    }, 2800)
    return () => clearTimeout(timer)
  }, [user, loading])

  return (
    <div className="screen-full" style={{
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      background:     '#111111',
      overflow:       'hidden',
      position:       'relative'
    }}>
      <div style={{ position: 'relative', width: 220, height: 220 }}>

        {/* Dust ring */}
        <div style={{
          position:     'absolute',
          bottom:       -10,
          left:         '50%',
          transform:    'translateX(-50%)',
          width:        20,
          height:       8,
          borderRadius: '50%',
          background:   'radial-gradient(ellipse, rgba(232,92,0,0.5) 0%, transparent 70%)',
          animation:    'dustRing 0.4s ease-out 0.55s both'
        }} />

        {/* Dust particles left */}
        {[0,1,2].map(i => (
          <div key={`dl${i}`} style={{
            position:     'absolute',
            bottom:       0,
            left:         '50%',
            width:        `${6 - i}px`,
            height:       `${6 - i}px`,
            borderRadius: '50%',
            background:   `rgba(232,92,0,${0.7 - i * 0.15})`,
            animation:    `dustLeft${i} 0.6s ease-out 0.55s both`
          }} />
        ))}

        {/* Dust particles right */}
        {[0,1,2].map(i => (
          <div key={`dr${i}`} style={{
            position:     'absolute',
            bottom:       0,
            left:         '50%',
            width:        `${6 - i}px`,
            height:       `${6 - i}px`,
            borderRadius: '50%',
            background:   `rgba(232,92,0,${0.7 - i * 0.15})`,
            animation:    `dustRight${i} 0.6s ease-out 0.55s both`
          }} />
        ))}

        {/* Shockwave */}
        <div style={{
          position:     'absolute',
          bottom:       -2,
          left:         '50%',
          transform:    'translateX(-50%)',
          width:        0,
          height:       2,
          background:   '#E85C00',
          borderRadius: 2,
          animation:    'shockwave 0.5s ease-out 0.55s both'
        }} />

        {/* Logo — uses public path, no import needed */}
        <img
          src="/icons/icon-512.png"
          alt="Upstream MAC Guide"
          style={{
            width:        220,
            height:       220,
            borderRadius: '50%',
            animation:    'dropIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both',
            position:     'relative',
            zIndex:       2,
            filter:       'drop-shadow(0 20px 40px rgba(232,92,0,0.3))'
          }}
        />
      </div>

      {/* Tagline */}
      <div style={{ marginTop: 24, textAlign: 'center', animation: 'fadeUp 0.5s ease-out 0.9s both' }}>
        <div style={{ fontSize: 13, color: '#888', letterSpacing: 3 }}>
          MATERIALS &amp; CONSTRUCTION
        </div>
      </div>

      {/* Loading dots */}
      <div style={{ display: 'flex', gap: 6, marginTop: 36, animation: 'fadeUp 0.4s ease-out 1.1s both' }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width:        6,
            height:       6,
            borderRadius: '50%',
            background:   '#E85C00',
            animation:    `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
          }} />
        ))}
      </div>

      <style>{`
        @keyframes dropIn {
          0%   { transform: translateY(-420px); opacity: 0; }
          70%  { transform: translateY(12px);   opacity: 1; }
          85%  { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        @keyframes dustRing {
          0%   { width: 20px;  opacity: 0.8; }
          100% { width: 260px; opacity: 0;   }
        }
        @keyframes shockwave {
          0%   { width: 0;     opacity: 1; }
          100% { width: 240px; opacity: 0; }
        }
        @keyframes dustLeft0 {
          0%   { transform: translate(0,0) scale(1);      opacity: 0.8; }
          100% { transform: translate(-70px,-30px) scale(0); opacity: 0; }
        }
        @keyframes dustLeft1 {
          0%   { transform: translate(0,0) scale(1);      opacity: 0.6; }
          100% { transform: translate(-45px,-50px) scale(0); opacity: 0; }
        }
        @keyframes dustLeft2 {
          0%   { transform: translate(0,0) scale(1);      opacity: 0.5; }
          100% { transform: translate(-25px,-40px) scale(0); opacity: 0; }
        }
        @keyframes dustRight0 {
          0%   { transform: translate(0,0) scale(1);     opacity: 0.8; }
          100% { transform: translate(70px,-30px) scale(0); opacity: 0; }
        }
        @keyframes dustRight1 {
          0%   { transform: translate(0,0) scale(1);     opacity: 0.6; }
          100% { transform: translate(45px,-50px) scale(0); opacity: 0; }
        }
        @keyframes dustRight2 {
          0%   { transform: translate(0,0) scale(1);     opacity: 0.5; }
          100% { transform: translate(25px,-40px) scale(0); opacity: 0; }
        }
        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1);   }
          50%       { opacity: 1;   transform: scale(1.3); }
        }
      `}</style>
    </div>
  )
}
