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
    }, 3200)
    return () => clearTimeout(timer)
  }, [user, loading])

  return (
    <div style={{
      position:       'fixed',
      inset:          0,
      background:     '#0d0d0d',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      overflow:       'hidden'
    }}>

      {/* Ground line — the surface the logo lands on */}
      <div style={{
        position:   'absolute',
        bottom:     '28%',
        left:       0,
        right:      0,
        height:     1,
        background: 'linear-gradient(90deg, transparent 0%, #333 20%, #E85C00 50%, #333 80%, transparent 100%)',
        animation:  'groundAppear 0.3s ease-out 0.7s both'
      }} />

      {/* Shockwave ring — expands from impact point */}
      <div style={{
        position:     'absolute',
        bottom:       'calc(28% - 1px)',
        left:         '50%',
        transform:    'translateX(-50%)',
        width:        0,
        height:       0,
        borderRadius: '50%',
        border:       '2px solid rgba(232,92,0,0.8)',
        animation:    'shockwave 0.7s cubic-bezier(0.2,0.6,0.4,1) 0.72s both'
      }} />

      {/* Secondary shockwave — delayed slightly */}
      <div style={{
        position:     'absolute',
        bottom:       'calc(28% - 1px)',
        left:         '50%',
        transform:    'translateX(-50%)',
        width:        0,
        height:       0,
        borderRadius: '50%',
        border:       '1px solid rgba(232,92,0,0.4)',
        animation:    'shockwave 0.8s cubic-bezier(0.2,0.6,0.4,1) 0.85s both'
      }} />

      {/* Dust cloud left */}
      <div style={{
        position:   'absolute',
        bottom:     '28%',
        left:       '50%',
        width:      6,
        height:     6,
        borderRadius: '50%',
        background: 'rgba(232,92,0,0.9)',
        animation:  'dustFarLeft 0.8s cubic-bezier(0.2,0.8,0.3,1) 0.72s both'
      }} />
      <div style={{
        position:   'absolute',
        bottom:     '28%',
        left:       '50%',
        width:      4,
        height:     4,
        borderRadius: '50%',
        background: 'rgba(232,92,0,0.7)',
        animation:  'dustMidLeft 0.7s cubic-bezier(0.2,0.8,0.3,1) 0.74s both'
      }} />
      <div style={{
        position:   'absolute',
        bottom:     '28%',
        left:       '50%',
        width:      3,
        height:     3,
        borderRadius: '50%',
        background: 'rgba(200,80,0,0.6)',
        animation:  'dustNearLeft 0.65s cubic-bezier(0.2,0.8,0.3,1) 0.76s both'
      }} />

      {/* Dust cloud right */}
      <div style={{
        position:   'absolute',
        bottom:     '28%',
        left:       '50%',
        width:      6,
        height:     6,
        borderRadius: '50%',
        background: 'rgba(232,92,0,0.9)',
        animation:  'dustFarRight 0.8s cubic-bezier(0.2,0.8,0.3,1) 0.72s both'
      }} />
      <div style={{
        position:   'absolute',
        bottom:     '28%',
        left:       '50%',
        width:      4,
        height:     4,
        borderRadius: '50%',
        background: 'rgba(232,92,0,0.7)',
        animation:  'dustMidRight 0.7s cubic-bezier(0.2,0.8,0.3,1) 0.74s both'
      }} />
      <div style={{
        position:   'absolute',
        bottom:     '28%',
        left:       '50%',
        width:      3,
        height:     3,
        borderRadius: '50%',
        background: 'rgba(200,80,0,0.6)',
        animation:  'dustNearRight 0.65s cubic-bezier(0.2,0.8,0.3,1) 0.76s both'
      }} />

      {/* Small debris particles */}
      {[
        { x: -90, y: 45, s: 2, d: 0.72 },
        { x: -60, y: 65, s: 2, d: 0.75 },
        { x: -30, y: 38, s: 1.5, d: 0.78 },
        { x:  90, y: 45, s: 2, d: 0.72 },
        { x:  60, y: 65, s: 2, d: 0.75 },
        { x:  30, y: 38, s: 1.5, d: 0.78 },
      ].map((p, i) => (
        <div key={i} style={{
          position:   'absolute',
          bottom:     '28%',
          left:       '50%',
          width:      p.s,
          height:     p.s,
          borderRadius: '50%',
          background: 'rgba(232,92,0,0.5)',
          animation:  `debris${i} 0.9s ease-out ${p.d}s both`
        }} />
      ))}

      {/* The logo wrapper — positioned above ground line */}
      <div style={{
        position:   'absolute',
        bottom:     '28%',
        left:       '50%',
        transform:  'translateX(-50%)',
        animation:  'logoDropIn 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both',
        zIndex:     10
      }}>
        <img
          src="/icons/icon-512.png"
          alt="Upstream MAC Guide"
          style={{
            width:        200,
            height:       200,
            display:      'block',
            filter:       'drop-shadow(0 0 30px rgba(232,92,0,0.2))',
            animation:    'logoGlow 1.5s ease-in-out 1.2s infinite alternate'
          }}
        />
      </div>

      {/* Tagline — fades up after impact */}
      <div style={{
        position:   'absolute',
        bottom:     '18%',
        left:       '50%',
        transform:  'translateX(-50%)',
        textAlign:  'center',
        whiteSpace: 'nowrap',
        animation:  'fadeUp 0.6s ease-out 1.0s both'
      }}>
        <div style={{
          fontSize:      11,
          fontWeight:    600,
          color:         '#555',
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}>
          Materials &amp; Construction
        </div>
      </div>

      {/* Loading dots */}
      <div style={{
        position:   'absolute',
        bottom:     '12%',
        display:    'flex',
        gap:        8,
        animation:  'fadeUp 0.5s ease-out 1.3s both'
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width:        5,
            height:       5,
            borderRadius: '50%',
            background:   '#E85C00',
            animation:    `dotPulse 1.4s ease-in-out ${i * 0.18}s infinite`
          }} />
        ))}
      </div>

      <style>{`
        /* Logo drops from off-screen top, lands with sharp bounce */
        @keyframes logoDropIn {
          0%   { transform: translateX(-50%) translateY(-110vh); opacity: 0; }
          65%  { transform: translateX(-50%) translateY(10px);   opacity: 1; }
          80%  { transform: translateX(-50%) translateY(-6px); }
          90%  { transform: translateX(-50%) translateY(3px); }
          100% { transform: translateX(-50%) translateY(0px); }
        }

        /* Subtle glow pulse after landing */
        @keyframes logoGlow {
          0%   { filter: drop-shadow(0 0 20px rgba(232,92,0,0.15)); }
          100% { filter: drop-shadow(0 0 40px rgba(232,92,0,0.35)); }
        }

        /* Ground line appears on impact */
        @keyframes groundAppear {
          0%   { opacity: 0; transform: scaleX(0); }
          100% { opacity: 1; transform: scaleX(1); }
        }

        /* Shockwave ring expands outward */
        @keyframes shockwave {
          0%   { width: 0;     height: 0;    opacity: 0.9; }
          100% { width: 280px; height: 80px; opacity: 0;   }
        }

        /* Dust — left side */
        @keyframes dustFarLeft {
          0%   { transform: translate(0, 0)         scale(1); opacity: 0.9; }
          100% { transform: translate(-80px, -55px) scale(0); opacity: 0;   }
        }
        @keyframes dustMidLeft {
          0%   { transform: translate(0, 0)         scale(1); opacity: 0.7; }
          100% { transform: translate(-50px, -70px) scale(0); opacity: 0;   }
        }
        @keyframes dustNearLeft {
          0%   { transform: translate(0, 0)         scale(1); opacity: 0.6; }
          100% { transform: translate(-30px, -45px) scale(0); opacity: 0;   }
        }

        /* Dust — right side */
        @keyframes dustFarRight {
          0%   { transform: translate(0, 0)        scale(1); opacity: 0.9; }
          100% { transform: translate(80px, -55px) scale(0); opacity: 0;   }
        }
        @keyframes dustMidRight {
          0%   { transform: translate(0, 0)        scale(1); opacity: 0.7; }
          100% { transform: translate(50px, -70px) scale(0); opacity: 0;   }
        }
        @keyframes dustNearRight {
          0%   { transform: translate(0, 0)        scale(1); opacity: 0.6; }
          100% { transform: translate(30px, -45px) scale(0); opacity: 0;   }
        }

        /* Small debris scatter */
        @keyframes debris0 { 0% { transform:translate(0,0) } 100% { transform:translate(-90px,-45px); opacity:0; } }
        @keyframes debris1 { 0% { transform:translate(0,0) } 100% { transform:translate(-60px,-65px); opacity:0; } }
        @keyframes debris2 { 0% { transform:translate(0,0) } 100% { transform:translate(-30px,-38px); opacity:0; } }
        @keyframes debris3 { 0% { transform:translate(0,0) } 100% { transform:translate( 90px,-45px); opacity:0; } }
        @keyframes debris4 { 0% { transform:translate(0,0) } 100% { transform:translate( 60px,-65px); opacity:0; } }
        @keyframes debris5 { 0% { transform:translate(0,0) } 100% { transform:translate( 30px,-38px); opacity:0; } }

        /* Fade up for tagline and dots */
        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateX(-50%) translateY(12px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0);    }
        }

        /* Loading dots */
        @keyframes dotPulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
