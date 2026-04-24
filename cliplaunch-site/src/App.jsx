import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

const C = {
  bg: '#080808',
  bgWarm: '#0a0706',
  bgCard: '#0f0f0f',
  bgCardHover: '#141414',
  red: '#E8001C',
  redGlow: 'rgba(232,0,28,0.15)',
  redGlowStrong: 'rgba(232,0,28,0.35)',
  white: '#FFFFFF',
  gray: '#A0A0A0',
  grayDim: '#555555',
  border: 'rgba(255,255,255,0.06)',
  borderRed: 'rgba(232,0,28,0.25)',
}

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Clients', href: '#clients' },
  { label: 'Results', href: '#results' },
  { label: 'FAQ', href: '#faq' },
]

const strategyCards = [
  {
    number: '1',
    image: 'https://framerusercontent.com/images/r7q8L1DdCDgzOYMEAKQrPudjEY0.png',
    title: 'Personalized Breakdown & Audit',
    description:
      'We audit your current content engine and identify the exact bottleneck holding growth back.',
  },
  {
    number: '2',
    image: 'https://framerusercontent.com/images/oB6KtL2AFZvvK0fZJuVgGw1jFqs.png',
    title: 'System Walkthrough',
    description:
      'We show you the acquisition, editing, and distribution mechanics behind 500M+ short-form views.',
  },
  {
    number: '3',
    image: 'https://framerusercontent.com/images/iB7fuNc6GYPolHIoINGzYp81FJ8.png',
    title: 'Content Roadmap',
    description:
      'You leave with a tailored rollout plan built around your audience, monetization, and brand voice.',
  },
]

const row1Clients = ['Alex Schor', 'Baby Spice', 'Based Bodyworks', 'Crispy Concords', 'Eduardo Najera']
const row2Clients = ['DamnBruh', 'Kason Grainger', 'Noah Danenhower', 'OgLightskins', 'Predecessor Game']
const row3Clients = ['Rizz App', 'Royalty Family', 'Stephen Sharer', 'Alex Schor', 'Baby Spice']

const row1Track = [...Array(6)].flatMap(() => row1Clients)
const row2Track = [...Array(6)].flatMap(() => row2Clients)
const row3Track = [...Array(6)].flatMap(() => row3Clients)

const clientStats = [
  { value: 500, suffix: 'M+', label: 'Views Generated' },
  { value: 30000, suffix: '+', label: 'Active Clippers' },
  { value: 13, suffix: '', label: 'Clients' },
]

const resultsStats = [
  {
    end: 500,
    prefix: '',
    suffix: 'M+',
    label: 'Views Generated',
    detail: 'Campaign scale driven through verified short-form distribution.',
  },
  {
    end: 30000,
    prefix: '',
    suffix: '+',
    label: 'Active Clippers',
    detail: 'A managed network built to push clips into platform-native reach.',
  },
  {
    end: 100,
    prefix: '$',
    suffix: 'K+',
    label: 'Client Revenue',
    detail: 'Documented revenue impact powered by viral short-form execution.',
  },
]

const clipItems = [
  { img: 'https://framerusercontent.com/images/9I3wMBZpvfPBgqYdO74lNFrmDuY.png', views: '6M', label: 'Pinned', height: '280px' },
  { img: 'https://framerusercontent.com/images/fEmq55doqJgOkhLuPqOD2SY4U.png', views: '237.7K', height: '240px' },
  { img: 'https://framerusercontent.com/images/xm0Fl7fMmJdg0HxVOStgT1gC8Zg.png', views: '2.8M', height: '260px' },
  { img: 'https://framerusercontent.com/images/3MgDQDAi86B7qRcTu8KMdQEI.png', views: '6.1M', height: '280px' },
  { img: 'https://framerusercontent.com/images/O6XfgoRtlathW0NHlmT0MJC4uU.png', views: '100K', height: '240px' },
  { img: 'https://framerusercontent.com/images/1VhroaEWaSbxwEo0drgmrlb1X4.jpg', views: '256K', height: '260px' },
  { img: 'https://framerusercontent.com/images/GL5YQ4XB2c9zNmnsFaS9qnPDkwM.jpg', views: '346.6K', label: 'Pinned', height: '280px' },
  { img: 'https://framerusercontent.com/images/FuZfogwAuOATwgGtElp5RrTTOa0.jpg', views: '100K', height: '240px' },
  { img: 'https://framerusercontent.com/images/waiALpxrz2zG0PO33SS69t4xdGE.jpg', views: '1.8M', label: 'Pinned', height: '260px' },
  { img: 'https://framerusercontent.com/images/bZ6RkXRM5UH3n2BscrqBl4sdhVU.jpg', views: '345.5K', height: '280px' },
  { img: 'https://framerusercontent.com/images/jHhJrquPD8Al9LkRtW64Xotae0.jpg', views: '488K', height: '240px' },
  { img: 'https://framerusercontent.com/images/p3FSkCEuaU6aKrnfDnvhm1VsQ.jpg', views: '914.8K', height: '260px' },
]

const contentStyles = [
  {
    title: 'Streamer Clips',
    description: 'Gaming and stream highlights cut around reactions, stakes, and pacing spikes.',
    images: ['https://framerusercontent.com/images/ZZllMDeRGn5Ez46vUwKsH52zfBk.png'],
  },
  {
    title: 'Slideshow Style',
    description: 'Product and brand storytelling delivered as native-feeling sequence edits.',
    images: [
      'https://framerusercontent.com/images/5VyMILM9vQdl4mR4UAlB9RYe8.webp',
      'https://framerusercontent.com/images/DPWmJxnoU4t23L3GXxUS6LgmuRc.webp',
    ],
  },
  {
    title: 'Podcast Clips',
    description: 'Conversation-driven moments trimmed for clarity, hooks, and retention.',
    images: [
      'https://framerusercontent.com/images/ZZDGuI68FfHWWPk9p3ETV7YKSw.png',
      'https://framerusercontent.com/images/KVJ24K0eDHl6V8A2Wenf4LehCxE.png',
    ],
  },
  {
    title: 'Authority Based',
    description: 'Thought-leadership edits designed to position you as the category expert.',
    images: ['https://framerusercontent.com/images/PTqiJAoP1lNYw1C9zhDB2QvrWFE.png'],
  },
  {
    title: 'Viral Clip Style',
    description: 'Aggressive hook-first formats built around shareability and fast watch-through.',
    images: ['https://framerusercontent.com/images/zKCQ2tlHGQrHdLWIvcwiNco7Rs.jpg'],
  },
]

const testimonials = [
  {
    name: 'DamnBruh',
    category: 'PvP Browser Game',
    videoUrl: 'https://framerusercontent.com/assets/17zdIKMdveoA7GiQpcQA0TneF8M.mp4',
    text: "I've worked with plenty of agencies, but Andrew and Evan actually get it. We went from 300-500 signups a day to over 1,000 consistently. The management, the creators, and the clarity are top tier.",
  },
  {
    name: 'OgLightskins',
    category: 'Influencer',
    videoUrl: 'https://framerusercontent.com/assets/W3kAb4nKLdqguam9sKywnegGY.mp4',
    text: 'Evan and Andrew made getting clippers insanely easy. They handled communication, pricing, and the Whop system, kept us updated, and made the entire process smooth from day one.',
  },
]

const faqs = [
  [
    'What does your clipping service actually offer?',
    'We turn your long-form content into high-performing short-form clips for TikTok, Reels, and YouTube Shorts, fully edited, captioned, and optimized for your brand.',
  ],
  [
    'Who is this best suited for?',
    'Creators, podcasters, brands, and agencies with valuable long-form content who want consistent short-form growth without adding to their workload.',
  ],
  [
    'How do your clipping campaigns actually work?',
    'We mine your content for high-impact moments, brief creators across our network, and distribute clips in coordinated waves. You pay for verified views, not vanity metrics.',
  ],
  [
    'How much does it cost?',
    "Pricing depends on content volume, turnaround, and campaign scope. Book a strategy call and we'll map out a custom rollout around your goals and budget.",
  ],
  [
    'What do I need to provide?',
    'Just your raw footage: podcasts, livestream replays, YouTube videos, or other long-form assets. We handle editing, captions, formatting, and distribution.',
  ],
  [
    'How do I get started?',
    "Book a strategy call using the button below. We'll align on your goals, finalize the offer, and get your campaign live fast.",
  ],
]

function useWindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}

function useCountUp(end, active, duration = 1800) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return undefined

    let frame = 0
    const start = performance.now()
    const easeOut = (t) => 1 - (1 - t) ** 3

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(end * easeOut(progress)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, duration, end])

  return value
}

function Glow({ top, left, right, bottom, size = 500, opacity = 0.15, color = '232,0,28', blur = 100, style }) {
  return (
    <motion.div
      animate={{ opacity: [opacity * 0.75, opacity * 1.4, opacity * 0.75] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(${color},${opacity}) 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    />
  )
}

function Eyebrow({ text, align = 'center' }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
        justifyContent: align,
      }}
    >
      <div style={{ width: '24px', height: '1px', background: C.red }} />
      <span
        style={{
          fontSize: '11px',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: C.red,
        }}
      >
        {text}
      </span>
      <div style={{ width: '24px', height: '1px', background: C.red }} />
    </div>
  )
}

function SectionDivider() {
  return (
    <div
      style={{
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(232,0,28,0.2), transparent)',
        margin: 0,
      }}
    />
  )
}

function SectionShell({ id, warm = false, children, style }) {
  return (
    <>
      <SectionDivider />
      <section
        id={id}
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(80px, 10vw, 140px) 0',
          background: warm ? C.bgWarm : C.bg,
          ...style,
        }}
      >
        {children}
      </section>
    </>
  )
}

function PrimaryButton({ children, href, onClick, style }) {
  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          background: 'linear-gradient(135deg, #E8001C, #ff2020, #E8001C)',
          color: C.white,
          borderRadius: '999px',
          padding: '16px 44px',
          fontSize: '16px',
          fontWeight: 700,
          boxShadow: '0 0 50px rgba(232,0,28,0.5), 0 4px 20px rgba(0,0,0,0.5)',
          border: 'none',
          cursor: 'pointer',
          ...style,
        }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #E8001C, #ff2020, #E8001C)',
        color: C.white,
        borderRadius: '999px',
        padding: '16px 44px',
        fontSize: '16px',
        fontWeight: 700,
        boxShadow: '0 0 50px rgba(232,0,28,0.5), 0 4px 20px rgba(0,0,0,0.5)',
        border: 'none',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </motion.button>
  )
}

function CountStatCard({ item }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const value = useCountUp(item.end, inView)
  const display = item.end >= 1000 ? value.toLocaleString() : value.toString()

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        background: 'linear-gradient(145deg, #131313, #0e0e0e)',
        borderTop: `2px solid ${C.red}`,
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        border: `1px solid ${C.border}`,
      }}
    >
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(48px, 6vw, 72px)',
          lineHeight: 0.88,
          color: C.red,
          textShadow: '0 0 30px rgba(232,0,28,0.4)',
          marginBottom: '12px',
          letterSpacing: '-0.04em',
        }}
      >
        {item.prefix}
        {display}
        {item.suffix}
      </div>
      <div style={{ color: C.white, fontWeight: 700, marginBottom: '10px' }}>{item.label}</div>
      <div style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: '14px' }}>{item.detail}</div>
    </motion.div>
  )
}

function ClientStatCard({ stat, isLast, isTablet }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const value = useCountUp(stat.value, inView)
  const display = stat.value >= 1000 ? value.toLocaleString() : value.toString()

  return (
    <div
      ref={ref}
      style={{
        padding: '24px 14px',
        textAlign: 'center',
        borderRight: isTablet && !isLast ? `1px solid ${C.border}` : 'none',
        borderBottom: !isTablet && !isLast ? `1px solid ${C.border}` : 'none',
      }}
    >
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(42px, 6vw, 60px)',
          fontWeight: 800,
          lineHeight: 0.92,
          color: C.red,
          textShadow: '0 0 26px rgba(232,0,28,0.35)',
        }}
      >
        {display}
        {stat.suffix}
      </div>
      <div
        style={{
          color: 'rgba(255,255,255,0.42)',
          fontSize: '12px',
          letterSpacing: '1.2px',
          textTransform: 'uppercase',
          marginTop: '8px',
        }}
      >
        {stat.label}
      </div>
    </div>
  )
}

function ClientMarqueeRow({ items, direction = 'left', duration = 28 }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          width: 'max-content',
          animation: `${direction === 'left' ? 'marqueeLeft' : 'marqueeRight'} ${duration}s linear infinite`,
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={`${item}-${index}`}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              width: '140px',
              height: '140px',
              flexShrink: 0,
              borderRadius: '14px',
              overflow: 'hidden',
              position: 'relative',
              backgroundImage: `url(https://picsum.photos/seed/${encodeURIComponent(`${item}-${index % 5}`)}/200/200)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: '10px 12px',
                background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.86) 100%)',
                color: C.white,
                fontSize: '12px',
                fontWeight: 700,
                lineHeight: 1.25,
              }}
            >
              {item}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ClipCard({ img, views, label, height = '260px' }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        position: 'relative',
        width: '160px',
        height,
        borderRadius: '16px',
        overflow: 'hidden',
        flexShrink: 0,
        border: `1px solid ${C.border}`,
        cursor: 'pointer',
        boxShadow: '0 20px 40px rgba(0,0,0,0.45)',
        background: '#0b0b0b',
      }}
    >
      <img
        src={img}
        alt=""
        referrerPolicy="no-referrer"
        style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ color: C.white, fontSize: '12px' }}>▶</span>
        <span
          style={{
            color: C.white,
            fontSize: '18px',
            fontWeight: 700,
            fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: '0.02em',
          }}
        >
          {views}
        </span>
      </div>
    </motion.div>
  )
}

function StrategyCard({ card }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        background: 'linear-gradient(145deg, #141414 0%, #0f0f0f 100%)',
        border: `1px solid ${C.border}`,
        borderTop: '2px solid rgba(232,0,28,0.4)',
        borderRadius: '20px',
        overflow: 'hidden',
        padding: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.55)',
      }}
    >
      <img
        src={card.image}
        alt=""
        referrerPolicy="no-referrer"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          objectPosition: 'center top',
          borderRadius: '12px',
          marginBottom: '24px',
          display: 'block',
          filter: 'brightness(0.9) contrast(1.05)',
        }}
      />
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: C.red,
          display: 'grid',
          placeItems: 'center',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '22px',
          color: C.white,
          boxShadow: '0 0 20px rgba(232,0,28,0.6)',
          marginBottom: '18px',
        }}
      >
        {card.number}
      </div>
      <h3
        style={{
          margin: '0 0 12px',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '28px',
          lineHeight: 0.98,
          textTransform: 'uppercase',
          color: C.white,
        }}
      >
        {card.title}
      </h3>
      <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>{card.description}</p>
    </motion.div>
  )
}

function ContentStyleCard({ item }) {
  const isPair = item.images.length === 2

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        background: 'linear-gradient(160deg, #131313 0%, #0e0e0e 100%)',
        border: `1px solid ${C.border}`,
        borderRadius: '20px',
        overflow: 'hidden',
        padding: '0 0 24px 0',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '9 / 16',
          maxHeight: '360px',
          overflow: 'hidden',
          display: isPair ? 'grid' : 'block',
          gridTemplateColumns: isPair ? '1fr 1fr' : undefined,
          gap: isPair ? '8px' : undefined,
          padding: isPair ? '0 8px 0 0' : 0,
          background: '#111',
        }}
      >
        {item.images.map((image) => (
          <motion.img
            key={image}
            src={image}
            alt=""
            referrerPolicy="no-referrer"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              filter: 'brightness(0.9)',
            }}
          />
        ))}
      </div>
      <div style={{ padding: '20px 24px 0' }}>
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '22px',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: C.white,
            marginBottom: '10px',
          }}
        >
          {item.title}
        </div>
        <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

function FaqItem({ question, answer, isOpen, onToggle, isLast }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        background: isOpen ? 'linear-gradient(135deg, #131313, #0f0f0f)' : '#0f0f0f',
        borderBottom: isLast ? 'none' : `1px solid rgba(255,255,255,0.05)`,
        borderLeft: isOpen ? `3px solid ${C.red}` : '3px solid transparent',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '20px 24px',
          background: 'transparent',
          border: 0,
          color: C.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          textAlign: 'left',
          fontSize: '15px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: C.red, display: 'inline-flex', flexShrink: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 24px 20px' }}>
              <div
                style={{
                  borderLeft: '2px solid rgba(232,0,28,0.2)',
                  paddingLeft: '16px',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '14px',
                  lineHeight: 1.8,
                }}
              >
                {answer}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

function FloatingNav({
  isMobile,
  scrolled,
  navHidden,
  activeSection,
  menuOpen,
  setMenuOpen,
  page,
  navigateToSection,
  goHome,
}) {
  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: navHidden ? -120 : 0, opacity: navHidden ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '12px 24px' : '20px 24px',
          transition: 'padding 0.4s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            background: scrolled ? 'rgba(10,7,6,0.92)' : 'rgba(10,7,6,0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: scrolled ? '1px solid rgba(232,0,28,0.3)' : '1px solid rgba(255,255,255,0.08)',
            borderRadius: '999px',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,0,28,0.1)'
              : 'none',
            transition: 'all 0.4s ease',
          }}
        >
          <motion.button
            type="button"
            onClick={() => goHome()}
            whileHover={{ color: '#ffffff' }}
            transition={{ duration: 0.2 }}
            style={{
              border: 0,
              background: 'transparent',
              color: C.white,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '1px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              textShadow: scrolled ? '0 0 20px rgba(232,0,28,0.5)' : 'none',
            }}
          >
            <span></span>
            <span>CLIPLAUNCH</span>
          </motion.button>

          {!isMobile ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {navLinks.map((link) => (
                  <motion.button
                    key={link.href}
                    type="button"
                    onClick={() => navigateToSection(link.href)}
                    whileHover={{ color: '#ffffff' }}
                    transition={{ duration: 0.2 }}
                    style={{
                      border: 0,
                      background: 'transparent',
                      color:
                        page === 'home' && activeSection === link.href.slice(1)
                          ? C.red
                          : 'rgba(255,255,255,0.6)',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
              <motion.button
                type="button"
                onClick={() => navigateToSection('#strategy-call')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: C.red,
                  borderRadius: '999px',
                  padding: '9px 22px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  color: C.white,
                  boxShadow: scrolled ? '0 0 20px rgba(232,0,28,0.5)' : 'none',
                }}
              >
                Book a Call
              </motion.button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '999px',
                border: `1px solid ${C.border}`,
                background: 'rgba(255,255,255,0.03)',
                color: C.white,
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'grid', gap: '4px' }}>
                <span style={{ width: '16px', height: '2px', background: C.white, display: 'block' }} />
                <span style={{ width: '16px', height: '2px', background: C.white, display: 'block' }} />
              </div>
            </button>
          )}
        </div>
      </motion.div>

      <div style={{ height: scrolled ? '64px' : '80px', transition: 'height 0.4s ease' }} />

      <AnimatePresence>
        {isMobile && menuOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 95,
                background: 'rgba(0,0,0,0.58)',
              }}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              style={{
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 110,
                minHeight: '50vh',
                background: '#0f0f0f',
                borderTop: '1px solid rgba(232,0,28,0.3)',
                borderRadius: '24px 24px 0 0',
                padding: '28px 24px 32px',
                boxShadow: '0 -20px 60px rgba(0,0,0,0.55)',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '4px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.16)',
                  margin: '0 auto 24px',
                }}
              />
              <div style={{ display: 'grid', gap: '10px' }}>
                {navLinks.map((link) => (
                  <motion.button
                    key={link.href}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false)
                      navigateToSection(link.href)
                    }}
                    whileHover={{ color: '#ffffff' }}
                    transition={{ duration: 0.2 }}
                    style={{
                      border: 0,
                      background: 'transparent',
                      color: 'rgba(255,255,255,0.82)',
                      textAlign: 'left',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: '28px',
                      fontWeight: 700,
                      padding: '8px 0',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
              <PrimaryButton
                onClick={() => {
                  setMenuOpen(false)
                  navigateToSection('#strategy-call')
                }}
                style={{ width: '100%', marginTop: '22px', fontSize: '15px', padding: '14px 22px' }}
              >
                Book a Call
              </PrimaryButton>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}

function TermsOfService({ goHome, navigateToSection, isMobile, scrolled, activeSection, menuOpen, setMenuOpen }) {
  return (
    <>
      <FloatingNav
        isMobile={isMobile}
        scrolled={scrolled}
        navHidden={navHidden}
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        page="tos"
        navigateToSection={navigateToSection}
        goHome={goHome}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ background: C.bg, minHeight: '100vh' }}
      >
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '140px 0 60px',
            background: 'radial-gradient(ellipse 120% 80% at 50% 120%, #1a0005 0%, #080808 60%)',
          }}
        >
          <Glow bottom="-200px" left="50%" size={900} opacity={0.2} blur={120} style={{ transform: 'translateX(-50%)' }} />
          <Glow top="18%" left="-200px" size={520} opacity={0.1} />
          <Glow top="22%" right="-200px" size={460} opacity={0.1} />
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 clamp(16px, 4vw, 48px)',
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
            }}
          >
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <Eyebrow text="LEGAL" />
              <h1
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(52px, 7vw, 92px)',
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                  margin: '0 0 14px',
                }}
              >
                TERMS OF <span style={{ color: C.red }}>SERVICE</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>Last updated: January 2025</p>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '80px 0 120px',
            background: C.bg,
          }}
        >
          <div
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              padding: '0 clamp(16px, 4vw, 48px)',
              position: 'relative',
              zIndex: 1,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.9,
              fontSize: '15px',
            }}
          >
            <motion.button
              type="button"
              onClick={goHome}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              style={{
                border: 0,
                background: 'transparent',
                color: C.red,
                fontWeight: 700,
                cursor: 'pointer',
                padding: 0,
                marginBottom: '28px',
              }}
            >
              {'\u2190'} Back to Site
            </motion.button>

            {[
              [
                'Acceptance of Terms',
                'By using ClipLaunch, you agree to these Terms of Service and all applicable laws and regulations. If you do not agree, you may not access or use our services.',
              ],
              [
                'Services Description',
                'ClipLaunch provides short-form content clipping, campaign management, creator coordination, and distribution services for clients using a pay-per-verified-view model.',
              ],
              [
                'Payment Terms',
                'Clients are charged based on verified views delivered through ClipLaunch campaigns. Because billing is tied to verified performance, no refunds are provided on verified views already delivered.',
              ],
              [
                'Intellectual Property',
                'All ClipLaunch branding, systems, workflows, and proprietary materials remain the intellectual property of ClipLaunch unless otherwise agreed in writing.',
              ],
              [
                'Content License',
                'By submitting content to ClipLaunch, the client grants ClipLaunch a license to clip, edit, format, and distribute that content for the purpose of executing the agreed campaign and related promotional activity.',
              ],
              [
                'Limitation of Liability',
                'ClipLaunch is not liable for indirect, incidental, consequential, or special damages arising from the use of our services, including lost profits, lost data, or business interruption.',
              ],
              [
                'Termination',
                'We reserve the right to suspend or terminate services for misuse, non-payment, abuse, or conduct that interferes with campaign execution. Clients may stop future services at any time, subject to payment for verified views already delivered.',
              ],
              [
                'Contact',
                'For questions regarding these Terms of Service, please contact ClipLaunch directly through your existing communication channel or strategy call touchpoint.',
              ],
            ].map(([heading, copy]) => (
              <motion.div
                key={heading}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                style={{ marginBottom: '28px' }}
              >
                <h2
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '22px',
                    color: C.white,
                    textTransform: 'uppercase',
                    margin: '0 0 10px',
                  }}
                >
                  {heading}
                </h2>
                <p style={{ margin: 0 }}>{copy}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </>
  )
}

function App() {
  const width = useWindowWidth()
  const isMobile = width < 768
  const isTablet = width >= 768
  const isDesktop = width >= 1024
  const [page, setPage] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('how-it-works')
  const [pendingSection, setPendingSection] = useState(null)
  const [clipsPaused, setClipsPaused] = useState(false)

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        color: ['#ff4444', '#ff8800', '#ffffff'][Math.floor(Math.random() * 3)],
        top: `${Math.random() * 55}%`,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 3 + 3,
        delay: Math.random() * 4,
      })),
    [],
  )

  const videoRef = useRef(null)
  const videoInView = useInView(videoRef, { once: true, margin: '-80px' })
  const track = useMemo(
    () => [...clipItems, ...clipItems, ...clipItems, ...clipItems, ...clipItems, ...clipItems],
    [],
  )

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      setScrolled(y > 28)

      if (y < 60) {
        setNavHidden(false)
      } else {
        const delta = y - lastY
        if (Math.abs(delta) > 8) {
          if (delta > 0) setNavHidden(true)
          if (delta < 0) setNavHidden(false)
          lastY = y
        }
      }

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (page !== 'home') return undefined

    const sections = ['how-it-works', 'clients', 'results', 'faq']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.35 },
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [page])

  useEffect(() => {
    if (page !== 'home' || !pendingSection) return undefined

    const timer = window.setTimeout(() => {
      if (pendingSection === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const target = document.querySelector(pendingSection)
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      setPendingSection(null)
    }, 30)

    return () => window.clearTimeout(timer)
  }, [page, pendingSection])

  const navigateToSection = (href) => {
    setMenuOpen(false)
    if (page !== 'home') {
      setPage('home')
      setPendingSection(href)
      return
    }

    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goHome = () => {
    setMenuOpen(false)
    if (page !== 'home') {
      setPage('home')
      setPendingSection('#top')
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (page === 'tos') {
    return (
      <TermsOfService
        goHome={goHome}
        navigateToSection={navigateToSection}
        isMobile={isMobile}
        scrolled={scrolled}
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ background: C.bg, color: C.white, minHeight: '100vh' }}
    >
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #080808;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
          opacity: 0.4;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #E8001C; border-radius: 2px; }
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes clipsScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-172px * 12)); }
        }
      `}</style>

      <FloatingNav
        isMobile={isMobile}
        scrolled={scrolled}
        navHidden={navHidden}
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        page={page}
        navigateToSection={navigateToSection}
        goHome={goHome}
      />

      <main id="top">
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(96px, 12vw, 140px) 0 clamp(80px, 10vw, 120px)',
            background: 'radial-gradient(ellipse 120% 80% at 50% 120%, #1a0005 0%, #080808 60%)',
          }}
        >
          <Glow bottom="-150px" left="50%" size={900} opacity={0.2} blur={120} style={{ transform: 'translateX(-50%)' }} />
          <Glow top="20%" left="-200px" size={600} opacity={0.08} />
          <Glow top="30%" right="-200px" size={500} opacity={0.08} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 clamp(16px, 4vw, 48px)',
              position: 'relative',
              zIndex: 1,
              width: '100%',
            }}
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              style={{ textAlign: 'center', maxWidth: '980px', margin: '0 auto' }}
            >
              <motion.div
                variants={fadeUp}
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  marginBottom: '22px',
                }}
              >
                {['5/5 Stars on Whop', '30,000+ Clipper Network'].map((pill, index) => (
                  <div
                    key={pill}
                    style={{
                      border: index === 0 ? '1px solid rgba(255,200,0,0.3)' : '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '999px',
                      padding: '7px 16px',
                      fontSize: '13px',
                      backdropFilter: 'blur(8px)',
                      background: 'rgba(255,255,255,0.05)',
                      color: C.white,
                    }}
                  >
                    {pill}
                  </div>
                ))}
              </motion.div>

              {[
                <>
                  Dominate <span style={{ color: C.red, textShadow: '0 0 40px rgba(232,0,28,0.4)' }}>your industry</span>
                </>,
                <>
                  with a proven clipping{' '}
                  <span style={{ color: C.red, textShadow: '0 0 40px rgba(232,0,28,0.4)' }}>distribution system</span>
                </>,
                <>
                  engineered to generate{' '}
                  <span style={{ color: C.red, textShadow: '0 0 40px rgba(232,0,28,0.4)' }}>real reach</span>
                </>,
              ].map((line, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 'clamp(52px, 7vw, 96px)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    lineHeight: 0.95,
                    textAlign: 'center',
                    letterSpacing: '-0.05em',
                  }}
                >
                  {line}
                </motion.div>
              ))}

              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: 'clamp(15px, 2vw, 18px)',
                  color: 'rgba(255,255,255,0.6)',
                  maxWidth: '500px',
                  margin: '26px auto 0',
                  lineHeight: 1.7,
                }}
              >
                Launch a premium short-form engine in 24 hours and pay only for the verified views it creates.
              </motion.p>

              <motion.div variants={fadeUp} style={{ marginTop: '32px' }}>
                <PrimaryButton
                  href="#strategy-call"
                  onClick={(event) => {
                    event.preventDefault()
                    navigateToSection('#strategy-call')
                  }}
                >
                  Book Your Free Strategy Call
                </PrimaryButton>
              </motion.div>

              <motion.div
                variants={fadeUp}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginTop: '24px',
                }}
              >
                {['Live in 24hrs', 'Pay Per Verified View', 'No Long-Term Contracts'].map((badge) => (
                  <div
                    key={badge}
                    style={{
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.4)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '5px 14px',
                      borderRadius: '999px',
                    }}
                  >
                    {badge}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <SectionShell
          id="how-it-works"
          warm
          style={{ background: 'linear-gradient(180deg, #080808 0%, #0c0404 50%, #080808 100%)' }}
        >
          <Glow top="10%" left="-150px" size={500} opacity={0.18} />
          <Glow top="10%" right="-150px" size={500} opacity={0.18} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '34px 34px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 clamp(16px, 4vw, 48px)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div
              ref={videoRef}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              style={{ textAlign: 'center' }}
            >
              <motion.div variants={fadeUp}>
                <Eyebrow text="STEP 1: WATCH THIS" />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(48px, 6vw, 72px)',
                  lineHeight: 0.94,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                  margin: '0 0 16px',
                }}
              >
                VIDEO <span style={{ color: C.red }}>BREAKDOWN</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                style={{
                  maxWidth: '700px',
                  margin: '0 auto 34px',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.75,
                }}
              >
                A quick walkthrough of the system, the offer, and why this format keeps outperforming traditional content ops.
              </motion.p>

              <motion.div
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.8 }}
                style={{
                  maxWidth: '860px',
                  margin: '0 auto',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(232,0,28,0.25)',
                  boxShadow: '0 0 0 1px rgba(232,0,28,0.1), 0 0 80px rgba(232,0,28,0.2), 0 40px 80px rgba(0,0,0,0.8)',
                  position: 'relative',
                }}
              >
                <div style={{ height: '2px', background: 'linear-gradient(to right, transparent, #E8001C, transparent)' }} />
                <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
                  <iframe
                    src="https://www.youtube.com/embed/ePjQcU9jIBc"
                    title="ClipLaunch Overview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </SectionShell>

        <SectionShell id="strategy-call">
          <Glow top="20%" left="-200px" size={600} opacity={0.12} />
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 clamp(16px, 4vw, 48px)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <motion.div variants={fadeUp} style={{ textAlign: 'center' }}>
                <Eyebrow text="STEP 2: STRATEGY CALL" />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                style={{
                  margin: '0 0 14px',
                  textAlign: 'center',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(48px, 6vw, 72px)',
                  lineHeight: 0.94,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                }}
              >
                BOOK A CONTENT <span style={{ color: C.red }}>STRATEGY CALL</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                style={{
                  textAlign: 'center',
                  maxWidth: '720px',
                  margin: '0 auto 38px',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.75,
                }}
              >
                We break down your funnel, your content surface area, and the fastest way to install a premium clipping engine.
              </motion.p>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr',
                  gap: '18px',
                  marginBottom: '44px',
                }}
              >
                {strategyCards.map((card) => (
                  <StrategyCard key={card.number} card={card} />
                ))}
              </motion.div>

              <motion.div
                variants={scaleIn}
                style={{
                  width: '100%',
                  height: isTablet ? 700 : 900,
                  borderRadius: '20px',
                  border: '1px solid rgba(232,0,28,0.2)',
                  boxShadow: '0 0 60px rgba(232,0,28,0.1), 0 40px 80px rgba(0,0,0,0.7)',
                  overflow: 'hidden',
                }}
              >
                <iframe
                  src="https://calendly.com/cliplaunch/content-strategy-call?primary_color=E8001C&background_color=111111&text_color=ffffff"
                  title="ClipLaunch Strategy Call Booking"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sandbox="allow-same-origin allow-scripts allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  style={{ width: '100%', height: '100%', border: 0 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </SectionShell>

        <SectionDivider />
        <section
          id="clients"
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: 'clamp(80px, 10vw, 140px) 0',
            background: C.bgWarm,
          }}
        >
          <Glow top="16%" left="-220px" size={560} opacity={0.11} />
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 clamp(16px, 4vw, 48px)',
              textAlign: 'left',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <motion.div variants={fadeUp}>
                <Eyebrow text="OUR CLIENTS" align="flex-start" />
              </motion.div>
              <motion.div variants={fadeUp} style={{ maxWidth: '920px', marginBottom: '22px' }}>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: isDesktop ? 72 : isTablet ? 56 : 42,
                    lineHeight: 0.92,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.04em',
                  }}
                >
                  500M+ Views Generated
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: isDesktop ? 72 : isTablet ? 56 : 42,
                    lineHeight: 0.92,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.04em',
                    color: C.red,
                  }}
                >
                  Across Leading Creators & Brands
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isTablet ? 'repeat(3, 1fr)' : '1fr',
                  border: `1px solid ${C.border}`,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: 'linear-gradient(180deg, rgba(19,19,19,0.96), rgba(11,11,11,0.96))',
                  marginBottom: '0',
                }}
              >
                {clientStats.map((stat, index) => (
                  <ClientStatCard
                    key={stat.label}
                    stat={stat}
                    isLast={index === clientStats.length - 1}
                    isTablet={isTablet}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{
              marginTop: '48px',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isTablet ? 420 : 480,
              padding: isTablet ? '36px 0' : '24px 0',
            }}
          >
            <div style={{ position: 'relative', zIndex: 0, display: 'grid', gap: '14px' }}>
              <ClientMarqueeRow items={row1Track} direction="left" duration={30} />
              <ClientMarqueeRow items={row2Track} direction="right" duration={35} />
              <ClientMarqueeRow items={row3Track} direction="left" duration={25} />
            </div>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse 55% 65% at 50% 50%, rgba(8,8,8,0.92) 20%, rgba(8,8,8,0.5) 55%, transparent 80%)',
                zIndex: 9,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '560px',
                background:
                  'linear-gradient(to right, #080808 0%, #080808 36%, rgba(8,8,8,0.9) 66%, rgba(8,8,8,0.65) 82%, transparent 100%)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '560px',
                background:
                  'linear-gradient(to left, #080808 0%, #080808 36%, rgba(8,8,8,0.9) 66%, rgba(8,8,8,0.65) 82%, transparent 100%)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 10,
                pointerEvents: 'none',
                width: '100%',
                padding: '0 24px',
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                  fontSize: isTablet ? 52 : 'clamp(24px, 6vw, 52px)',
                  marginBottom: '12px',
                  lineHeight: 0.94,
                }}
              >
                Trusted by <span style={{ color: C.red }}>Industry Leaders</span>
              </div>
              <p
                style={{
                  color: C.gray,
                  fontSize: isTablet ? 17 : 15,
                  lineHeight: 1.7,
                  maxWidth: 580,
                  margin: '0 auto',
                }}
              >
                The internet&apos;s top creators and brands choose ClipLaunch to scale their content with systems that actually convert attention into growth.
              </p>
            </div>
          </motion.div>
        </section>

        <SectionDivider />
        <section
          id="results"
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: 'clamp(80px, 10vw, 140px) 0',
            background: C.bg,
          }}
        >
          <Glow top="0" right="-150px" size={700} opacity={0.1} />
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 clamp(16px, 4vw, 48px)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <motion.div variants={fadeUp} style={{ textAlign: 'center' }}>
                <Eyebrow text="PROOF OF PERFORMANCE" />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                style={{
                  margin: '0 0 14px',
                  textAlign: 'center',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(48px, 6vw, 72px)',
                  lineHeight: 0.94,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                }}
              >
                PROVEN <span style={{ color: C.red }}>RESULTS</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                style={{
                  textAlign: 'center',
                  maxWidth: '720px',
                  margin: '0 auto 36px',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.75,
                }}
              >
                A quick look at the scale, network size, and performance snapshots behind the offer.
              </motion.p>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr',
                  gap: '18px',
                }}
              >
                {resultsStats.map((item) => (
                  <CountStatCard key={item.label} item={item} />
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              paddingLeft: 0,
              paddingRight: 0,
              marginTop: '48px',
              marginBottom: '48px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '120px',
                background: 'linear-gradient(to right, #080808, transparent)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '120px',
                background: 'linear-gradient(to left, #080808, transparent)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
            <div
              onMouseEnter={() => setClipsPaused(true)}
              onMouseLeave={() => setClipsPaused(false)}
              style={{
                display: 'flex',
                gap: '12px',
                width: 'max-content',
                alignItems: 'flex-end',
                animation: 'clipsScroll 35s linear infinite',
                animationPlayState: clipsPaused ? 'paused' : 'running',
                willChange: 'transform',
              }}
            >
              {track.map((clip, index) => (
                <ClipCard key={`${clip.img}-${index}`} {...clip} />
              ))}
            </div>
          </motion.div>

          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 clamp(16px, 4vw, 48px)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ textAlign: 'center' }}>
              <PrimaryButton
                href="#strategy-call"
                onClick={(event) => {
                  event.preventDefault()
                  navigateToSection('#strategy-call')
                }}
              >
                I&apos;m Ready To Scale
              </PrimaryButton>
            </motion.div>
          </div>
        </section>

        <SectionShell warm>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 clamp(16px, 4vw, 48px)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <motion.div variants={fadeUp} style={{ textAlign: 'center' }}>
                <Eyebrow text="CONTENT FORMATS" />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                style={{
                  margin: '0 0 14px',
                  textAlign: 'center',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(48px, 6vw, 72px)',
                  lineHeight: 0.94,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                }}
              >
                CUSTOM CONTENT STYLE <span style={{ color: C.red }}>BUILT AROUND STRATEGY</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                style={{
                  textAlign: 'center',
                  maxWidth: '720px',
                  margin: '0 auto 40px',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.75,
                }}
              >
                The visual treatment changes based on your niche, your audience, and what the platforms already reward.
              </motion.p>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : isTablet ? 'repeat(2, 1fr)' : '1fr',
                  gap: '18px',
                }}
              >
                {contentStyles.map((item) => (
                  <ContentStyleCard key={item.title} item={item} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </SectionShell>

        <SectionShell>
          <div
            style={{
              maxWidth: '1100px',
              margin: '0 auto',
              padding: '0 clamp(16px, 4vw, 48px)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <motion.div variants={fadeUp} style={{ textAlign: 'center' }}>
                <Eyebrow text="CLIENT FEEDBACK" />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                style={{
                  margin: '0 0 40px',
                  textAlign: 'center',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(48px, 6vw, 72px)',
                  lineHeight: 0.94,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                }}
              >
                WHAT OUR CLIENTS <span style={{ color: C.red }}>HAVE TO SAY</span>
              </motion.h2>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                style={{ display: 'grid', gap: '20px' }}
              >
                {testimonials.map((item, index) => {
                  const reverse = index === 1 && !isMobile

                  return (
                    <motion.div
                      key={item.name}
                      variants={scaleIn}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
                        gap: '36px',
                        alignItems: 'center',
                        background: 'linear-gradient(145deg, #121212, #0e0e0e)',
                        borderRadius: '24px',
                        border: `1px solid ${C.border}`,
                        borderLeft: `3px solid ${C.red}`,
                        padding: '40px',
                        boxShadow: '0 8px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)',
                      }}
                    >
                      <div style={{ order: reverse ? 2 : 1 }}>
                        <div
                          style={{
                            width: '100%',
                            maxWidth: '240px',
                            aspectRatio: '9/16',
                            margin: '0 auto',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 0 40px rgba(232,0,28,0.2)',
                            background: '#0a0a0a',
                          }}
                        >
                          <video
                            controls
                            playsInline
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          >
                            <source src={item.videoUrl} type="video/mp4" />
                          </video>
                        </div>
                        <div
                          style={{
                            marginTop: '16px',
                            color: C.red,
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            fontSize: '24px',
                            textAlign: 'center',
                          }}
                        >
                          {item.name}
                        </div>
                        <div style={{ marginTop: '4px', color: C.gray, fontSize: '13px', textAlign: 'center' }}>
                          {item.category}
                        </div>
                      </div>

                      <div style={{ order: reverse ? 1 : 2, position: 'relative' }}>
                        <div
                          style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: '100px',
                            color: C.red,
                            opacity: 0.35,
                            lineHeight: 0.7,
                            position: 'absolute',
                            top: '-8px',
                            left: 0,
                          }}
                        >
                          "
                        </div>
                        <p
                          style={{
                            margin: '32px 0 24px',
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '17px',
                            lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.85)',
                            fontStyle: 'italic',
                            position: 'relative',
                            zIndex: 1,
                          }}
                        >
                          {item.text}
                        </p>
                        <div
                          style={{
                            color: C.red,
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            fontSize: '16px',
                            marginBottom: '6px',
                          }}
                        >
                          {item.name}
                        </div>
                        <div style={{ color: C.gray, fontSize: '14px' }}>{item.category}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>
        </SectionShell>

        <SectionShell id="faq" warm style={{ background: 'linear-gradient(180deg, #080808 0%, #0a0504 50%, #080808 100%)' }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 clamp(16px, 4vw, 48px)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ textAlign: 'center' }}>
              <motion.div variants={fadeUp}>
                <Eyebrow text="FREQUENTLY ASKED" />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                style={{
                  margin: '0 0 40px',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(48px, 6vw, 72px)',
                  lineHeight: 0.94,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                }}
              >
                FREQUENTLY ASKED <span style={{ color: C.red }}>QUESTIONS</span>
              </motion.h2>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                style={{
                  maxWidth: '760px',
                  margin: '0 auto',
                  border: `1px solid ${C.border}`,
                  borderRadius: '20px',
                  overflow: 'hidden',
                }}
              >
                {faqs.map(([question, answer], index) => (
                  <FaqItem
                    key={question}
                    question={question}
                    answer={answer}
                    isOpen={openFaq === index}
                    onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
                    isLast={index === faqs.length - 1}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </SectionShell>

        <SectionDivider />
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            paddingBottom: '80px',
            paddingTop: '80px',
            background: C.bg,
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.75, 0.95, 0.75] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              zIndex: 0,
              filter: 'blur(70px)',
              borderRadius: '50%',
              width: '1000px',
              height: '800px',
              background: 'radial-gradient(ellipse, rgba(232,0,28,0.9) 0%, rgba(180,0,0,0.7) 45%, transparent 75%)',
              bottom: '-250px',
              left: '-250px',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.9, 0.7] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              zIndex: 0,
              filter: 'blur(70px)',
              borderRadius: '50%',
              width: '900px',
              height: '700px',
              background: 'radial-gradient(ellipse, rgba(210,0,0,0.85) 0%, transparent 72%)',
              bottom: '-150px',
              right: '-200px',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.72, 0.55] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              zIndex: 0,
              filter: 'blur(70px)',
              borderRadius: '50%',
              width: '700px',
              height: '600px',
              background: 'radial-gradient(ellipse, rgba(232,0,28,0.65) 0%, transparent 72%)',
              bottom: '50px',
              left: '25%',
            }}
          />
          <motion.div
            animate={{ opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              zIndex: 0,
              filter: 'blur(70px)',
              borderRadius: '50%',
              width: '800px',
              height: '600px',
              background: 'radial-gradient(ellipse, rgba(180,0,0,0.3) 0%, transparent 72%)',
              top: '-100px',
              left: '15%',
            }}
          />

          {particles.map((particle, index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -28, -56, -84], opacity: [0, 1, 0.65, 0], scale: [0, 1, 0.8, 0] }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                zIndex: 1,
                pointerEvents: 'none',
                background: particle.color,
                top: particle.top,
                left: particle.left,
              }}
            />
          ))}

          <div
            style={{
              position: 'absolute',
              top: '15%',
              right: '8%',
              zIndex: 5,
              filter: 'drop-shadow(0 0 20px rgba(255,100,0,0.6))',
            }}
          >
            <img
              src="https://framerusercontent.com/images/yTLcqf6tZjRTbMPPBYcDHaFfrbY.png"
              alt=""
              referrerPolicy="no-referrer"
              style={{ width: 'clamp(60px, 8vw, 120px)', display: 'block' }}
            />
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{
              position: 'relative',
              zIndex: 10,
              textAlign: 'center',
              maxWidth: '980px',
              padding: '0 24px',
            }}
          >
            <Eyebrow text="GET STARTED" />
            <h2
              style={{
                margin: '0 0 28px',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(52px, 7vw, 96px)',
                fontWeight: 800,
                color: C.white,
                textTransform: 'uppercase',
                lineHeight: 0.94,
                letterSpacing: '-0.04em',
              }}
            >
              READY TO SCALE WITH PROVEN CLIPPING SYSTEMS?
            </h2>

            <PrimaryButton
              href="https://calendly.com/cliplaunch/content-strategy-call"
              style={{ boxShadow: '0 0 80px rgba(232,0,28,0.8), 0 4px 20px rgba(0,0,0,0.5)' }}
            >
              Book Your Free Strategy Call →
            </PrimaryButton>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '24px',
              }}
            >
              {['✓ 500M+ Views Delivered', '✓ 30,000+ Active Clippers', '✓ Pay Per Verified View Only'].map((badge) => (
                <div
                  key={badge}
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '5px 14px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '-18px',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(80px, 15vw, 200px)',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.07)',
              letterSpacing: '-4px',
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            CLIPLAUNCH
          </motion.div>

          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '18px clamp(16px, 4vw, 48px)',
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              zIndex: 20,
            }}
          >
            <button
              type="button"
              onClick={goHome}
              style={{
                border: 0,
                background: 'transparent',
                color: C.white,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '24px',
                fontWeight: 800,
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
               CLIPLAUNCH
            </button>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  type="button"
                  onClick={() => navigateToSection(link.href)}
                  whileHover={{ color: 'rgba(255,255,255,0.8)' }}
                  transition={{ duration: 0.2 }}
                  style={{
                    border: 0,
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                type="button"
                onClick={() => {
                  setPage('tos')
                  window.scrollTo(0, 0)
                }}
                whileHover={{ color: 'rgba(255,255,255,0.8)' }}
                transition={{ duration: 0.2 }}
                style={{
                  border: 0,
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Terms of Service
              </motion.button>
            </div>

            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
              © 2025 ClipLaunch. All rights reserved.
            </div>
          </div>
        </motion.section>
      </main>
    </motion.div>
  )
}

export default App
