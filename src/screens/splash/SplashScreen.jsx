// src/screens/splash/SplashScreen.jsx
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import logo from '/icons/icon-512.png'

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

      {/* Impact dust particles — behind logo */}
      <div style={{ position: 'relative', width: 220, height: 220 }}>

        {/* Dust ring — expands outward on impact */}
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
        {[-60,-40,-25].map((x, i) => (
          <div key={`dl${i}`} style={{
            position:   'absolute',
            bottom:     0,
            left:       '50%',
            width:      `${6 - i}px`,
            height:     `${6 - i}px`,
            borderRadius: '50%',
            background: `rgba(232,92,0,${0.7 - i * 0.15})`,
            animation:  `dustLeft${i} 0.6s ease-out 0.55s both`
          }} />
        ))}

        {/* Dust particles right */}
        {[60,40,25].map((x, i) => (
          <div key={`dr${i}`} style={{
            position:   'absolute',
            bottom:     0,
            left:       '50%',
            width:      `${6 - i}px`,
            height:     `${6 - i}px`,
            borderRadius: '50%',
            background: `rgba(232,92,0,${0.7 - i * 0.15})`,
            animation:  `dustRight${i} 0.6s ease-out 0.55s both`
          }} />
        ))}

        {/* Ground impact shockwave */}
        <div style={{
          position:     'absolute',
          bottom:       -2,
          left:         '50%',
          transform:    'translateX(-50%)',
          width:        0,
          height:       2,
          background:   'var(--orange)',
          borderRadius: 2,
          animation:    'shockwave 0.5s ease-out 0.55s both'
        }} />

        {/* The logo — drops in from above */}
        <img
          src={logo}
          alt="Upstream MAC Guide"
          style={{
            width:      220,
            height:     220,
            borderRadius: '50%',
            animation:  'dropIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both',
            position:   'relative',
            zIndex:     2,
            filter:     'drop-shadow(0 20px 40px rgba(232,92,0,0.3))'
          }}
        />
      </div>

      {/* Tagline — fades in after landing */}
      <div style={{
        marginTop:   24,
        textAlign:   'center',
        animation:   'fadeUp 0.5s ease-out 0.9s both'
      }}>
        <div style={{ fontSize: 13, color: 'var(--muted)', letterSpacing: 3 }}>
          MATERIALS &amp; CONSTRUCTION
        </div>
      </div>

      {/* Loading dots — appear last */}
      <div style={{
        display:   'flex',
        gap:       6,
        marginTop: 36,
        animation: 'fadeUp 0.4s ease-out 1.1s both'
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width:      6,
            height:     6,
            borderRadius: '50%',
            background: 'var(--orange)',
            animation:  `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
          }} />
        ))}
      </div>

      <style>{`
        /* Logo drops from above and lands with slight bounce */
        @keyframes dropIn {
          0%   { transform: translateY(-420px); opacity: 0; }
          70%  { transform: translateY(12px);   opacity: 1; }
          85%  { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }

        /* Dust ring expands on impact */
        @keyframes dustRing {
          0%   { width: 20px;  opacity: 0.8; }
          100% { width: 260px; opacity: 0;   }
        }

        /* Shockwave line */
        @keyframes shockwave {
          0%   { width: 0;     opacity: 1; }
          100% { width: 240px; opacity: 0; }
        }

        /* Dust particles — left side */
        @keyframes dustLeft0 {
          0%   { transform: translate(0, 0)       scale(1);   opacity: 0.8; }
          100% { transform: translate(-70px, -30px) scale(0); opacity: 0;   }
        }
        @keyframes dustLeft1 {
          0%   { transform: translate(0, 0)       scale(1);   opacity: 0.6; }
          100% { transform: translate(-45px, -50px) scale(0); opacity: 0;   }
        }
        @keyframes dustLeft2 {
          0%   { transform: translate(0, 0)       scale(1);   opacity: 0.5; }
          100% { transform: translate(-25px, -40px) scale(0); opacity: 0;   }
        }

        /* Dust particles — right side */
        @keyframes dustRight0 {
          0%   { transform: translate(0, 0)      scale(1);   opacity: 0.8; }
          100% { transform: translate(70px, -30px) scale(0); opacity: 0;   }
        }
        @keyframes dustRight1 {
          0%   { transform: translate(0, 0)      scale(1);   opacity: 0.6; }
          100% { transform: translate(45px, -50px) scale(0); opacity: 0;   }
        }
        @keyframes dustRight2 {
          0%   { transform: translate(0, 0)      scale(1);   opacity: 0.5; }
          100% { transform: translate(25px, -40px) scale(0); opacity: 0;   }
        }

        /* Fade up for tagline and dots */
        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0);    }
        }

        /* Loading dots pulse */
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1);   }
          50%       { opacity: 1;   transform: scale(1.3); }
        }
      `}</style>
    </div>
  )
}
