import { useState, useEffect, useRef, type FormEvent } from 'react'

// ─── Types & Data ─────────────────────────────────────────────────────────────

export interface CaseStudy {
  briefing: string
  archWhy: string
  role: string
  roleDesc?: string
  hurdles: string
}

export interface Project {
  code: string
  name: string
  archetype: string
  status: string
  classification: string
  briefing: string
  stack: string[]
  results: string
  image: string
  featured?: boolean
  caseStudy: CaseStudy
}

const SKILLS = [
  { label: 'Full-Stack Development (Laravel / Node)', level: 'PROFICIENT' },
  { label: 'PHP & Laravel (Sanctum / Spatie RBAC)', level: 'INTERMEDIATE' },
  { label: 'Frontend (React / TypeScript / Tailwind)', level: 'PROFICIENT' },
  { label: 'Node.js & Express REST APIs', level: 'PROFICIENT' },
  { label: 'Database Design (MySQL / PostgreSQL)', level: 'PROFICIENT' },
  { label: 'Docker & Containerized Environments', level: 'PRACTICAL' },
  { label: 'Testing (Jest / Supertest / Playwright)', level: 'PRACTICAL' },
  { label: 'Real-Time & Security (Socket.IO / JWT)', level: 'PRACTICAL' },
]

const CAPABILITIES = [
  { code: 'SYS-01', label: 'Full-Stack & Architecture', tech: 'Laravel · Node.js · Express · React · TypeScript · REST APIs', rating: 'PROFICIENT' },
  { code: 'SYS-02', label: 'Backend & Authentication', tech: 'PHP · Laravel Sanctum · Spatie RBAC · JWT · bcrypt · Helmet', rating: 'INTERMEDIATE' },
  { code: 'SYS-03', label: 'Databases & ORMs', tech: 'MySQL · PostgreSQL · TypeORM · Prisma · Eloquent ORM', rating: 'PROFICIENT' },
  { code: 'SYS-04', label: 'Containers & DevOps', tech: 'Docker · docker-compose · Nginx Reverse Proxy · Git Workflows', rating: 'PRACTICAL' },
  { code: 'SYS-05', label: 'Testing & Quality Assurance', tech: 'Jest · Supertest · Playwright E2E · Swagger / OpenAPI Docs', rating: 'PRACTICAL' },
  { code: 'SYS-06', label: 'Team Leadership & Agile', tech: 'Odyssey Forge Founder · System Design · Security & UX Integration', rating: 'PROFICIENT' },
]

const PROJECTS: Project[] = [
  {
    code: 'CLIENT PROJECT 01',
    name: 'GARAGE – X',
    archetype: 'Motorcycle Service Booking & Workshop System',
    status: 'COMPLETED CLIENT WORK',
    classification: 'FEATURED CLIENT WORK',
    featured: true,
    briefing: 'Full-stack motorcycle service booking and workshop management system developed for a local client. Built core workflows for motorcycle management, service booking, workshop operations, customer management, and administrative processes.',
    stack: ['Laravel', 'PHP', 'MySQL', 'Docker', 'Laravel Sanctum', 'Spatie Permission', 'REST APIs'],
    results: 'Led a 3-member team to design system architecture, RBAC authorization, and containerized Docker environments.',
    image: '/garage-x.jpg',
    caseStudy: {
      briefing: 'Developed for a local client needing an integrated digital platform to handle motorcycle service bookings, workshop operations, inventory, customer management, and administrative oversight.',
      archWhy: 'Selected Laravel with PHP and MySQL for robust backend MVC architecture, using Laravel Sanctum and Spatie Laravel Permission for fine-grained role-based access control (RBAC).',
      role: 'Founder & Lead Software Developer',
      roleDesc: 'Handled core system development, API integration, database schema configuration, authentication mechanisms, and testing.',
      hurdles: 'Led a three-member development team through requirements analysis, system planning, development, and testing while establishing Docker containerization and Git workflows.',
    },
  },
  {
    code: 'ENGINEERING PROJECT 02',
    name: 'CLUB EVENT HANDLER',
    archetype: 'Full-Stack Event Management Web Application',
    status: 'COMPLETED',
    classification: 'FULL-STACK SPEC',
    briefing: 'Multi-role campus event management platform built with React 19 and Express, featuring safe RSVPs, real-time WebSocket alerts, mobile camera QR ticketing, and automated testing.',
    stack: ['TypeScript', 'React 19', 'Node.js', 'Express', 'Zod', 'TypeORM', 'Socket.IO', 'Docker', 'Nginx', 'SQLite'],
    results: 'Integrated Socket.IO real-time updates, optical mobile QR code scanner (jsQR), Nodemailer alerts with Ethereal development fallback, Swagger API docs, iCal Exporter, and Playwright E2E testing.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=500&fit=crop&auto=format',
    caseStudy: {
      briefing: 'Full-stack campus event platform built for student organizations requiring concurrent RSVPs, calendar scheduling, real-time alerts, mobile optical QR ticketing, and automated testing.',
      archWhy: 'Selected end-to-end TypeScript with React 19, Express, Zod, TypeORM, and SQLite for complete type safety, schema validation, zero-config persistence, and smooth developer experience.',
      role: 'Lead Full-Stack Developer',
      roleDesc: 'Engineered REST APIs, Socket.IO real-time WebSocket push, RBAC auth (JWT/bcrypt), calendar .ics exporter, jsQR mobile camera scanner, 22 Jest security tests, and 5 Playwright E2E tests.',
      hurdles: 'Hardened security using OWASP ASVS 4.0 standards (JWT, Helmet, rate limiting), designed continuous mobile QR check-ins with audio feedback, and containerized services using Docker & Nginx.',
    },
  },
  {
    code: 'LEADERSHIP & VENTURE 03',
    name: 'ODYSSEY FORGE SOLUTIONS',
    archetype: 'Digital Solutions & Application Ecosystem',
    status: 'PROCESSING',
    classification: 'AGENCY & PRODUCTS',
    briefing: 'Founded and lead a software development team in Phnom Penh. Engineered corporate web platform with Vue 3 Composition API, TypeScript, Vite 6, Tailwind CSS v4, SCSS, and Vercel hosting.',
    stack: ['Vue 3', 'TypeScript', 'Vite 6', 'Tailwind CSS v4', 'Sass', 'Vercel', 'Laravel', 'Node.js', 'Docker'],
    results: 'Managing full-stack application architecture, developer collaboration, Git workflows, and security/UX integration.',
    image: '/odyssey-forge.png',
    caseStudy: {
      briefing: 'Established Odyssey Forge to create high-performance full-stack web applications and custom software solutions for client needs.',
      archWhy: 'Built with Vue 3 Composition API, TypeScript (v5.7), Vite (v6), Tailwind CSS v4 (@tailwindcss/vite), Sass/SCSS, Google Fonts (Barlow Condensed, Kantumruy Pro, Inter, Space Mono), custom IntersectionObserver reveal system (useReveal.ts), and Vercel static deployment.',
      role: 'Founder & Lead Software Developer',
      roleDesc: 'Lead software development initiatives, architect database schemas, guide team members through sprint cycles, enforce clean code practices, and manage end-to-end project execution.',
      hurdles: 'Coordinates multi-discipline team members specializing in application security and UX/UI design while building core backend and frontend systems.',
    },
  },
]

const TIMELINE = [
  {
    year: '2026 – Present',
    code: '01',
    title: 'Founder & Lead Software Developer — Odyssey Forge',
    desc: 'Founded and lead a software development team in Phnom Penh. Overseeing full-stack application architecture across PHP/Laravel, React, Node.js, MySQL, Docker containerization, Git workflows, and team coordination.',
    active: true,
  },
  {
    year: '2023 – Present',
    code: '02',
    title: 'Royal University of Phnom Penh (RUPP)',
    desc: 'Information Technology Engineering (ITE) student. Building strong academic and practical foundations in software development, data structures, database architecture, and web engineering.',
  },
  {
    year: '2025',
    code: '03',
    title: 'Full-Stack Engineering & Career Footpath',
    desc: 'Engineered the GARAGE–X Workshop Management System and Club Event Handler platform, establishing core full-stack software development experience and hands-on system architecture.',
  },
  {
    year: 'Future Goal',
    code: '04',
    title: 'Cloud Engineering & DevOps Focus',
    desc: 'Advancing toward cloud engineering and DevOps through continued development of infrastructure, automation, security, and scalable software systems.',
  },
]

const SUGGESTED_QUERIES = [
  'Tell me about Odyssey Forge and Rithy\'s experience',
  'What technical skills and tools does Rithy use?',
  'What projects has Un Rithy Reach built?',
  'What is Rithy\'s education and IELTS score?',
  'How can I contact or hire Un Rithy Reach?',
]

const AI_KB = [
  {
    patterns: ['technolog', 'skill', 'speciali', 'capabilit', 'stack', 'language', 'know', 'what tech', 'laravel', 'docker', 'php', 'node', 'react', 'zod', 'sql'],
    response: `UN RITHY REACH // TECH PROFICIENCY:\n\n  ▸ Technical Skills → PHP, Laravel, React, TypeScript, Node.js, Express.js, MySQL, Docker, REST APIs, Git, Tailwind CSS, GitHub Actions, Testing (Jest/Playwright/Supertest), Authentication, RBAC (Sanctum/Spatie), Zod, TypeORM, Prisma, Socket.IO, Nginx, Swagger/OpenAPI\n  ▸ People Skills   → Teamwork, Collaboration, Critical Thinking, Adaptability, Flexibility, Communication\n  ▸ Languages      → Khmer (Native), English (IELTS Academic Band 6.0)\n  ▸ Strengths      → Open-Minded, Problem Solving, Resilience, Fast Learner\n  ▸ Interests      → Cloud Engineering, New Technology, System Design, Software Architecture, Emerging Technology`,
  },
  {
    patterns: ['experience', 'year', 'background', 'history', 'career', 'education', 'university', 'rupp', 'odyssey', 'forge', 'founder', 'student', 'ielts', 'band'],
    response: `BACKGROUND, EDUCATION & EXPERIENCE:\n\n  ▸ Name         → UN RITHY REACH\n  ▸ Role         → Founder & Lead Software Developer at Odyssey Forge | Full Stack Developer\n  ▸ Education    → Information Technology Engineering (ITE) @ Royal University of Phnom Penh (RUPP)\n  ▸ Language     → IELTS Academic — Band 6.0 | Khmer & English\n  ▸ Experience   → Odyssey Forge (Phnom Penh, 2026 – Present): Founded and lead a 3-member software development team. Personally handle full-stack architecture across frontend, backend, database, APIs, Docker, and Git workflows.`,
  },
  {
    patterns: ['project', 'case study', 'work', 'built', 'created', 'developed', 'portfolio', 'garage', 'club', 'event'],
    response: `TECHNICAL PROJECTS BY UN RITHY REACH:\n\n  1. GARAGE – X | Motorcycle Service Booking & Workshop Management System\n     - Developed for local client using Laravel, PHP, MySQL, Docker, Laravel Sanctum, Spatie Permission.\n     - Built workflows for motorcycle management, service booking, workshop operations & RBAC authorization.\n\n  2. CLUB EVENT HANDLER | Full-Stack Event Management Web App\n     - Built with TypeScript, React 19, Node.js, Express, Zod, TypeORM, SQLite, Socket.IO, jsQR, Docker, Nginx, Jest, Playwright.\n     - Features safe concurrency RSVPs, real-time WebSocket alerts, optical QR ticketing, calendar .ics export & automated E2E testing.\n\n  3. ODYSSEY FORGE SOLUTIONS | Corporate Web Platform & Digital Ecosystem\n     - Built with Vue 3 (<script setup>), TypeScript, Vite 6, Tailwind CSS v4, SCSS, oxfmt & Vercel deployment.\n     - Engineered with custom scroll reveal system (useReveal.ts), Google Fonts typography & responsive UI system.`,
  },
  {
    patterns: ['contact', 'hire', 'available', 'role', 'consulting', 'recruit', 'work with', 'email', 'phone', 'number', 'github', 'linkedin', 'address', 'location'],
    response: `CONTACT & SOCIAL LINKS:\n\nUn Rithy Reach (Phnom Penh, Prek Pnov, Cambodia):\n  ▸ Email     → Reachhttps69@gmail.com\n  ▸ Phone     → (010) 367 456 / (096) 488 2257\n  ▸ LinkedIn  → https://linkedin.com/in/un-rithy-reach\n  ▸ GitHub    → https://github.com/ReachVs\n  ▸ Location  → Phnom Penh, Prek Pnov, Cambodia\n\nOpen for Full Stack Developer, Software Developer, Laravel / Node Backend, and React Frontend opportunities!`,
  },
]

export function getAIResponse(input: string): string {
  const lower = input.toLowerCase()
  for (const entry of AI_KB) {
    if (entry.patterns.some(p => lower.includes(p))) return entry.response
  }
  return `QUERY PROCESSED:\n\n  ▸ "Tell me about Odyssey Forge and Rithy's experience"\n  ▸ "What technical skills and tools does Rithy use?"\n  ▸ "What projects has Un Rithy Reach built?"\n  ▸ "What is Rithy's education and IELTS score?"\n  ▸ "How can I contact or hire Un Rithy Reach?"\n\nAsk any question to learn more about Un Rithy Reach!`
}

// ─── Sub-Components ───────────────────────────────────────────────────────────

function Badge({ children, variant = 'blue' }: { children: React.ReactNode; variant?: 'blue' | 'orange' | 'gray' }) {
  const styles =
    variant === 'blue'
      ? 'bg-[#7c3aed] text-white border-transparent shadow-md shadow-[#7c3aed]/30 font-bold'
      : variant === 'orange'
      ? 'text-[#e85d04] border-[#e85d04]/40 bg-[#e85d04]/10'
      : 'text-zinc-300 border-white/20 bg-white/5 font-medium'

  return (
    <span className={`font-mono-intel text-xs tracking-wider px-3 py-1 rounded-xs inline-block uppercase select-none ${styles}`}>
      {children}
    </span>
  )
}

function EditorialHeading({ issueTag, title, subtitle }: { issueTag: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-12 border-b border-white/10 pb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="inline-block bg-[#7c3aed] text-white px-3.5 py-1.5 font-mono-intel text-xs font-bold tracking-[0.2em] uppercase shadow-lg shadow-[#7c3aed]/40">
          {issueTag}
        </div>
      </div>
      <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-zinc-400 leading-[1.05]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-xl text-zinc-400 max-w-3xl leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─── Tech Brand SVG Logos ───────────────────────────────────────────────────

function ReactIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.5">
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="#61DAFB" />
    </svg>
  )
}

function NextjsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.86 18.52l-7.36-9.84v9.84H9V8h1.86l7.36 9.84V8H20v10.52h-2.14z"/>
    </svg>
  )
}

function TypescriptIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#3178C6"/>
      <path d="M11.5 17.2c0 1.1-.9 1.8-2.2 1.8-1 0-1.9-.6-2.3-1.5l1.3-.8c.3.5.7.9 1.1.9.5 0 .8-.3.8-.7 0-.4-.4-.6-1.1-.9l-.7-.3c-1.2-.5-1.8-1.3-1.8-2.5 0-1.6 1.3-2.7 3.1-2.7 1.3 0 2.3.6 2.8 1.6l-1.3.8c-.3-.6-.8-.9-1.5-.9-.5 0-.9.3-.9.7 0 .4.3.6 1 .9l.7.3c1.3.5 2 1.4 2 2.6zm6 0v1.8h-1.8v-6.9h-2.1v-1.4h6v1.4h-2.1v5.1h-1.8z" fill="#FFF"/>
    </svg>
  )
}

function TailwindIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#38BDF8">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
    </svg>
  )
}

function LaravelIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF2D20">
      <path d="M23.6 5.3L13.8.4a1.8 1.8 0 0 0-1.6 0L2.4 5.3A1.8 1.8 0 0 0 1.5 7v10a1.8 1.8 0 0 0 .9 1.6l9.8 4.9c.5.3 1.1.3 1.6 0l9.8-4.9a1.8 1.8 0 0 0 .9-1.6V7a1.8 1.8 0 0 0-.9-1.7zm-10.8-3l7.9 3.9-3.4 1.7-7.9-3.9 3.4-1.7zm-1.6 19.4L3.3 17.8V8.7l7.9 3.9v9.1zm9.5-3.9l-7.9 3.9v-9.1l7.9-3.9v9.1z"/>
    </svg>
  )
}

function NodeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#5FA04E">
      <path d="M12 1.6L2.3 7.2v11.2L12 24l9.7-5.6V7.2L12 1.6zm6.8 15.3l-6.8 3.9-6.8-3.9V8.7L12 4.8l6.8 3.9v8.2z"/>
    </svg>
  )
}

function ZodIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#3E67B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function DockerIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#2496ED">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.185.185 0 00.186-.186V3.575a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185zm0 5.43h2.118a.185.185 0 00.186-.185V9.006a.185.185 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.955 0h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H8.074a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-2.716h2.119a.186.186 0 00.185-.185V6.29a.185.185 0 00-.185-.186H8.074a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.955 2.716h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-2.716h2.119a.186.186 0 00.185-.185V6.29a.185.185 0 00-.185-.186H5.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954 2.716h2.118a.185.185 0 00.186-.185V9.006a.185.185 0 00-.186-.186H2.165a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-2.716h2.118a.185.185 0 00.186-.185V6.29a.185.185 0 00-.186-.186H2.165a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zM.016 12.836c.071 1.488.583 2.879 1.464 4.025C3.397 19.345 6.42 20.5 9.774 20.5c5.688 0 10.457-3.238 12.166-7.944a.185.185 0 00-.098-.228c-.851-.433-1.857-.665-2.883-.665-1.523 0-2.973.504-4.148 1.439-1.282-1.077-2.874-1.674-4.542-1.674a7.994 7.994 0 00-3.693.896V12.1a.185.185 0 00-.185-.185H4.275a.185.185 0 00-.185.185v.715c-.477-.071-.958-.107-1.442-.107a9.38 9.38 0 00-2.617.375.185.185 0 00-.015.353z" />
    </svg>
  )
}

function DatabaseIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#4169E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

function GitIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#F05032">
      <path d="M2.6 10.6L10.6 2.6c.8-.8 2-.8 2.8 0l8.4 8.4c.8.8.8 2 0 2.8l-8.4 8.4c-.8.8-2 .8-2.8 0L2.6 13.4c-.8-.8-.8-2 0-2.8zM14.5 13.1c.3-.4.5-1 .5-1.6 0-.8-.4-1.5-1.1-1.8v-2.2c.6-.3 1-1 1-1.7 0-1.1-.9-2-2-2s-2 .9-2 2c0 .7.4 1.4 1 1.7v2.2c-.6.3-1 1-1 1.8 0 .6.2 1.2.5 1.6l-1.9 1.9c-.4-.3-1-.5-1.6-.5-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2c0-.6-.2-1.2-.5-1.6l1.9-1.9z" />
    </svg>
  )
}

function CodeBracketIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function ServerIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  )
}

function LayersIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function TechMetricsCard() {
  const techCategories = [
    {
      category: 'FRONTEND ARCHITECTURE',
      CategoryIcon: CodeBracketIcon,
      skills: [
        { name: 'React 19 & Next.js 15', logos: [ReactIcon, NextjsIcon], level: 'PROFICIENT', note: 'App Router & Components' },
        { name: 'TypeScript & Type Safety', logos: [TypescriptIcon], level: 'INTERMEDIATE', note: 'Strict Mode & Generics' },
        { name: 'Tailwind CSS v4 & Modern UI', logos: [TailwindIcon], level: 'PROFICIENT', note: 'Responsive Dark Theme' },
      ],
    },
    {
      category: 'BACKEND & FRAMEWORKS',
      CategoryIcon: ServerIcon,
      skills: [
        { name: 'PHP / Laravel (MVC)', logos: [LaravelIcon], level: 'PROFICIENT', note: 'Eloquent ORM & Blade' },
        { name: 'Node.js & Express APIs', logos: [NodeIcon], level: 'PROFICIENT', note: 'REST & Middleware' },
        { name: 'Zod & Schema Validation', logos: [ZodIcon], level: 'INTERMEDIATE', note: 'Runtime Data Parsing' },
      ],
    },
    {
      category: 'DEVOPS & DATABASES',
      CategoryIcon: LayersIcon,
      skills: [
        { name: 'Docker & Containerization', logos: [DockerIcon], level: 'PRACTICAL', note: 'Container Workflows' },
        { name: 'PostgreSQL, Supabase & MySQL', logos: [DatabaseIcon], level: 'PROFICIENT', note: 'Relational DB & RLS' },
        { name: 'Git & GitHub Actions CI/CD', logos: [GitIcon], level: 'PRACTICAL', note: 'Version Control & Deploy' },
      ],
    },
  ]

  return (
    <div className="border border-white/20 bg-chrome-card p-6 sm:p-7 rounded-xs space-y-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#7c3aed] animate-pulse shadow-md shadow-[#7c3aed]" />
          <span className="font-mono-intel text-xs font-bold text-white uppercase tracking-wider">
            SYSTEM METRICS & TECH PROFICIENCY
          </span>
        </div>
        <span className="bg-[#7c3aed] text-white px-2.5 py-0.5 font-mono-intel text-[10px] font-bold tracking-wider shadow-md shadow-[#7c3aed]/30">
          VERIFIED
        </span>
      </div>

      <div className="space-y-6">
        {techCategories.map((cat, idx) => (
          <div key={idx} className="space-y-3">
            <div className="font-mono-intel text-xs text-zinc-400 font-semibold flex items-center gap-2 border-b border-white/5 pb-1.5">
              <cat.CategoryIcon className="w-4 h-4" />
              <span className="text-white font-bold tracking-wider">{cat.category}</span>
            </div>
            <div className="space-y-2.5">
              {cat.skills.map((s, i) => (
                <div key={i} className="p-3 bg-zinc-950/80 border border-white/10 rounded-xs hover:border-[#7c3aed]/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-mono-intel text-xs text-white font-bold flex items-center gap-2">
                      <div className="flex items-center gap-1.5 shrink-0">
                        {s.logos.map((Logo, lIdx) => (
                          <Logo key={lIdx} className="w-4 h-4 shrink-0" />
                        ))}
                      </div>
                      <span>{s.name}</span>
                    </div>
                    <div className="font-mono-intel text-[10px] text-zinc-400 mt-0.5">
                      {s.note}
                    </div>
                  </div>
                  <span className={`font-mono-intel text-[10px] font-bold px-2.5 py-1 rounded-xs tracking-wider shrink-0 uppercase border ${
                    s.level === 'ADVANCED' 
                      ? 'bg-[#7c3aed]/20 text-[#a78bfa] border-[#7c3aed]/40' 
                      : s.level === 'PROFICIENT'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  }`}>
                    {s.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 border border-white/10 bg-zinc-950 rounded-xs">
          <div className="font-display text-lg font-bold text-white">STRICT</div>
          <div className="font-mono-intel text-[9px] text-zinc-400 uppercase mt-0.5">Type Safety</div>
        </div>
        <div className="p-2.5 border border-white/10 bg-zinc-950 rounded-xs">
          <div className="font-display text-lg font-bold text-white">Docker</div>
          <div className="font-mono-intel text-[9px] text-zinc-400 uppercase mt-0.5">Containerized</div>
        </div>
        <div className="p-2.5 border border-white/10 bg-zinc-950 rounded-xs">
          <div className="font-display text-lg font-bold text-white">MVC</div>
          <div className="font-mono-intel text-[9px] text-zinc-400 uppercase mt-0.5">Laravel Arch</div>
        </div>
      </div>
    </div>
  )
}

function FaceFrame() {
  return (
    <div className="relative w-64 h-80 sm:w-72 sm:h-96 bg-zinc-950 border-chrome-metallic shadow-2xl shadow-white/10 overflow-hidden group">
      <img
        src="/profile.jpg"
        alt="Un Rithy Reach — Software Developer & Full Stack Developer"
        className="w-full h-full object-cover object-top brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-transparent to-transparent opacity-85 pointer-events-none" />

      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#7c3aed]" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#7c3aed]" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#7c3aed]" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#7c3aed]" />

      <div className="animate-scan bg-white/70" style={{ top: 0 }} />

      <div className="absolute bottom-3 left-4 right-4 space-y-1">
        <div className="font-mono-intel text-xs text-white font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse" />
          UN RITHY REACH
        </div>
        <div className="font-mono-intel text-xs text-zinc-400">SOFTWARE & FULL STACK DEVELOPER</div>
      </div>
    </div>
  )
}

// ─── Semplice Case Study Modal ────────────────────────────────────────────────

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    window.history.pushState({ modalOpen: true }, '')

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const handlePopState = () => {
      onClose()
    }

    window.addEventListener('keydown', handleKey)
    window.addEventListener('popstate', handlePopState)

    return () => {
      document.body.style.overflow = originalStyle
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [onClose])

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 modal-backdrop animate-fade-in-up"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0a0a0a] border border-[#2f2f2f] flex flex-col shadow-2xl overflow-hidden rounded-xs">
        {/* Modal Header */}
        <div className="border-b border-[#2f2f2f] bg-[#111111] px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#e2e8f0] animate-pulse" />
            <span className="font-mono-intel text-xs font-semibold tracking-wider text-[#e2e8f0]">
              PROJECT CASE STUDY // {project.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="font-mono-intel text-xs text-[#9e9e9e] hover:text-white border border-[#2f2f2f] hover:border-[#e2e8f0] px-3.5 py-1.5 transition-colors"
          >
            CLOSE [ESC]
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar space-y-8">
          {/* Banner Image */}
          <div className="relative h-60 sm:h-80 border border-[#2f2f2f] overflow-hidden bg-[#050505] rounded-xs">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover brightness-[0.6]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-mono-intel text-xs font-semibold text-[#e2e8f0] block mb-1">{project.archetype}</span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">{project.name}</h2>
              </div>
              <Badge variant="blue">{project.status}</Badge>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-mono-intel text-xs font-semibold text-[#9e9e9e] tracking-widest uppercase mb-3">TECHNOLOGIES USED</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span
                  key={tech}
                  className="font-mono-intel text-xs px-3.5 py-1.5 border border-[#e2e8f0]/40 bg-[#e2e8f0]/10 text-[#e2e8f0] rounded-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 4-Part Narrative Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="border border-[#2f2f2f] bg-[#111111] p-6 space-y-2 rounded-xs">
              <span className="font-mono-intel text-xs text-[#e2e8f0] font-bold block">01 // THE BRIEFING</span>
              <h3 className="font-display text-lg font-bold text-white">Problem & Objective</h3>
              <p className="text-sm text-[#9e9e9e] leading-relaxed">
                {project.caseStudy.briefing}
              </p>
            </div>

            <div className="border border-[#2f2f2f] bg-[#111111] p-6 space-y-2 rounded-xs">
              <span className="font-mono-intel text-xs text-[#e2e8f0] font-bold block">02 // STACK & RATIONALE</span>
              <h3 className="font-display text-lg font-bold text-white">Tech Choice Rationale</h3>
              <p className="text-sm text-[#9e9e9e] leading-relaxed">
                {project.caseStudy.archWhy}
              </p>
            </div>

            <div className="border border-[#2f2f2f] bg-[#111111] p-6 space-y-2 rounded-xs">
              <span className="font-mono-intel text-xs text-[#e2e8f0] font-bold block">03 // MY ROLE</span>
              <h3 className="font-display text-lg font-bold text-white">Contributions & Responsibilities</h3>
              <div className="font-mono-intel text-xs text-[#e2e8f0] font-semibold mb-1">{project.caseStudy.role}</div>
              <p className="text-sm text-[#9e9e9e] leading-relaxed">
                {project.caseStudy.roleDesc || 'Handled core system development, API integration, database schema configuration, authentication mechanisms, and testing.'}
              </p>
            </div>

            <div className="border border-[#2f2f2f] bg-[#111111] p-6 space-y-2 rounded-xs">
              <span className="font-mono-intel text-xs text-[#e85d04] font-bold block">04 // CHALLENGES SOLVED</span>
              <h3 className="font-display text-lg font-bold text-white">Key Problem Solving</h3>
              <p className="text-sm text-[#9e9e9e] leading-relaxed">
                {project.caseStudy.hurdles}
              </p>
            </div>
          </div>

          {/* Impact Metric */}
          <div className="border border-[#7c3aed]/40 bg-[#7c3aed]/10 p-6 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-mono-intel text-xs text-[#a78bfa] font-bold block mb-1">PROJECT OUTCOME</span>
              <div className="font-display text-lg sm:text-xl font-bold text-white">{project.results}</div>
            </div>
            <button
              onClick={onClose}
              className="font-mono-intel text-xs font-bold bg-[#7c3aed] text-white px-6 py-3 hover:bg-[#6d28d9] transition-colors shrink-0 rounded-xs uppercase tracking-wider shadow-md shadow-[#7c3aed]/30"
            >
              CLOSE CASE STUDY
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Header Navigation ────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Manifesto', href: '#editorial-feature' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Roadmap', href: '#experience' },
    { label: 'Ask AI', href: '#ai-assistant' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className="fixed top-0 inset-x-0 z-40 transition-all duration-300"
      style={{
        backgroundColor: scrolled || mobileMenuOpen ? 'rgba(5,5,5,0.98)' : 'transparent',
        borderBottom: scrolled || mobileMenuOpen ? '1px solid #2f2f2f' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3 group">
          <span className="font-display text-base font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
            UN RITHY REACH
          </span>
          <span className="font-mono-intel text-xs text-zinc-400 hidden sm:inline">// SOFTWARE & FULL STACK DEVELOPER</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Action Button & Mobile Menu */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-block font-mono-intel text-xs font-bold px-4 py-2 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-all rounded-xs uppercase tracking-wider shadow-md shadow-[#7c3aed]/30"
          >
            Hire Me
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden font-mono-intel text-xs px-3 py-1.5 border border-white/20 text-white hover:border-white transition-colors rounded-xs"
          >
            {mobileMenuOpen ? 'Close Menu' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#2f2f2f] bg-[#050505] px-6 py-4 space-y-3">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#9e9e9e] hover:text-[#e2e8f0] py-1 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center font-mono-intel text-xs font-bold mt-4 py-3 bg-[#7c3aed] text-white rounded-xs uppercase tracking-wider shadow-md shadow-[#7c3aed]/30"
          >
            Get In Touch
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grid pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Top Tag Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="bg-[#7c3aed] text-white px-3.5 py-1.5 font-mono-intel text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-[#7c3aed]/40">
              PORTFOLIO // FULL STACK DEVELOPER
            </span>
          </div>
          <div className="font-mono-intel text-xs text-zinc-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Phnom Penh, Prek Pnov, Cambodia</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-zinc-400">
              Software Developer & Full Stack Developer
            </h1>

            <p className="text-base sm:text-xl text-[#9e9e9e] leading-relaxed max-w-2xl font-light">
              Information Technology Engineering (ITE) student at RUPP and Founder & Lead Software Developer at <strong className="text-white font-medium">Odyssey Forge</strong>. Building practical digital solutions using <strong className="text-white font-medium">PHP, Laravel, React, TypeScript, Node.js, MySQL</strong>, and <strong className="text-white font-medium">Docker</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                className="font-mono-intel text-xs font-semibold px-6 py-3.5 bg-gradient-to-r from-slate-100 via-gray-200 to-zinc-300 text-black border border-white/60 hover:from-white hover:to-slate-200 transition-all rounded-xs shadow-[0_0_20px_rgba(255,255,255,0.12)] tracking-wider uppercase flex items-center gap-2"
              >
                View Technical Projects
              </a>
              <a
                href="https://github.com/ReachVs"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-intel text-xs font-semibold px-6 py-3.5 border border-slate-500/60 text-slate-200 hover:border-white hover:text-white hover:bg-white/5 transition-all rounded-xs backdrop-blur-xs flex items-center gap-2 tracking-wider uppercase"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <span>GitHub Profile ↗</span>
              </a>
              <a
                href="#contact"
                className="font-mono-intel text-xs font-semibold px-6 py-3.5 border border-[#2f2f2f] text-[#9e9e9e] hover:border-slate-400 hover:text-white transition-all rounded-xs bg-[#111111] tracking-wider uppercase"
              >
                Get In Touch
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#2f2f2f] max-w-xl">
              <div>
                <div className="font-display text-2xl sm:text-4xl font-bold text-white">RUPP</div>
                <div className="text-xs sm:text-sm text-[#9e9e9e] mt-1 font-mono-intel">ITE Engineering</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-4xl font-bold text-white">BAND 6.0</div>
                <div className="text-xs sm:text-sm text-[#9e9e9e] mt-1 font-mono-intel">IELTS Academic</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-4xl font-bold text-[#e2e8f0]">LEAD DEV</div>
                <div className="text-xs sm:text-sm text-[#9e9e9e] mt-1 font-mono-intel">Odyssey Forge</div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <FaceFrame />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Editorial Feature Section (Magazine Style) ─────────────────────────────

function EditorialFeatureSection() {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0)

  const essays = [
    {
      tag: '01 // TYPE SAFETY & ZOD',
      title: 'Eliminating Runtime Bugs with Zod & TypeScript',
      lead: 'As a developer, prioritizing type safety guarantees that API response schemas match UI component props seamlessly, preventing silent runtime failures.',
      quote: 'Type safety isn\'t extra work—it\'s the insurance policy that allows fast development without fear of unexpected production bugs.',
      body: 'By building web applications with Zod schemas as a single source of truth, input parameters are validated automatically on server routes and typed strictly on frontend components.',
      metricLabel: 'TYPE SAFETY FOCUS',
      metricValue: '100%',
      badge: 'STRICT TYPE VALIDATION',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=500&fit=crop&auto=format',
    },
    {
      tag: '02 // MODERN EDGE COMPUTE',
      title: 'Fast Loading & Microsecond Edge Delivery',
      lead: 'Modern web applications leverage edge execution like V8 isolates on Cloudflare Workers and Vercel to serve dynamic content with minimal latency.',
      quote: 'Building lightweight frontend bundles and caching at the edge ensures fast initial page loads for every user.',
      body: 'Utilizing Vercel Edge and Next.js middleware allows routing checks and authentication logic to execute in microsecond isolate environments close to users worldwide.',
      metricLabel: 'TARGET COLD START',
      metricValue: '<5ms',
      badge: 'V8 ISOLATE PRIMITIVE',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&h=500&fit=crop&auto=format',
    },
    {
      tag: '03 // REAL-TIME & WEBSOCKETS',
      title: 'Real-Time Communication & WebSockets',
      lead: 'Building interactive web applications requires instant event broadcasting between client and server without polling delays.',
      quote: 'Real-time communication elevates user experience by streaming status updates to clients instantly.',
      body: 'By leveraging Socket.IO alongside Express and React, system events, live updates, and notification triggers are delivered seamlessly with low latency.',
      metricLabel: 'EVENT LATENCY',
      metricValue: '<10ms',
      badge: 'SOCKET.IO + EXPRESS',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=500&fit=crop&auto=format',
    },
  ]

  const current = essays[activeTab]

  return (
    <section id="editorial-feature" className="py-24 bg-[#0a0a0a] border-t border-[#2f2f2f]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Magazine Editorial Section Header */}
        <div className="mb-10 border-b border-[#2f2f2f] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 bg-[#7c3aed] rounded-xs" />
              <span className="font-mono-intel text-xs font-bold tracking-[0.3em] text-[#a78bfa] uppercase">
                DEVELOPER MANIFESTO // 2026 EDITION
              </span>
            </div>
            <h2 className="font-serif-editorial text-5xl sm:text-7xl font-normal italic tracking-tight text-white leading-[1.02]">
              The Full-Stack Development Principles
            </h2>
            <p className="mt-3 text-base sm:text-xl text-[#9e9e9e] font-light max-w-2xl">
              Core technical guidelines I follow when building modern React, Next.js, and Node.js applications.
            </p>
          </div>
        </div>

        {/* Topic Navigation Pills */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-[#2f2f2f] pb-6">
          {essays.map((essay, idx) => (
            <button
              key={essay.tag}
              onClick={() => setActiveTab(idx as 0 | 1 | 2)}
              className={`font-mono-intel text-xs font-bold px-5 py-3 transition-all rounded-xs border ${
                activeTab === idx
                  ? 'border-[#7c3aed] bg-[#7c3aed] text-white shadow-lg shadow-[#7c3aed]/40'
                  : 'border-[#2f2f2f] bg-[#111111] text-zinc-300 hover:border-[#7c3aed]/60 hover:text-white'
              }`}
            >
              {essay.tag}
            </button>
          ))}
        </div>

        {/* 3-Column Magazine Spread Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="border border-[#2f2f2f] bg-[#111111] p-6 rounded-xs space-y-4">
              <span className="font-mono-intel text-[10px] text-[#a78bfa] font-bold tracking-widest uppercase block">
                ARTICLE OVERVIEW
              </span>
              <div className="font-serif-editorial text-7xl font-normal italic text-white/15 select-none leading-none">
                0{activeTab + 1}
              </div>

              <div className="space-y-3 pt-2 border-t border-[#2f2f2f]">
                <div>
                  <span className="font-mono-intel text-[10px] text-[#9e9e9e] block">ESSAY TITLE</span>
                  <h4 className="font-display text-sm font-bold text-white">{current.title}</h4>
                </div>
                <div>
                  <span className="font-mono-intel text-[10px] text-[#9e9e9e] block">AUTHOR</span>
                  <span className="text-xs text-white font-medium">Un Rithy Reach (Software Developer)</span>
                </div>
                <div>
                  <span className="font-mono-intel text-[10px] text-[#9e9e9e] block">CORE TOOLING</span>
                  <Badge variant="blue">{current.badge}</Badge>
                </div>
              </div>
            </div>

            <div className="border border-[#7c3aed]/40 bg-[#7c3aed]/10 p-6 rounded-xs text-center space-y-1">
              <span className="font-mono-intel text-[10px] text-[#a78bfa] font-bold tracking-widest uppercase block">
                {current.metricLabel}
              </span>
              <div className="font-display text-4xl font-bold text-white">{current.metricValue}</div>
            </div>
          </div>

          {/* Center Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="text-lg sm:text-xl text-white/90 leading-relaxed font-light">
              <span className="float-left font-serif-editorial text-7xl font-bold italic leading-none pr-4 pt-1 text-[#a78bfa]">
                {current.lead.charAt(0)}
              </span>
              {current.lead.slice(1)}
            </div>

            <div className="relative h-64 sm:h-72 border border-[#2f2f2f] overflow-hidden rounded-xs bg-[#050505] group">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover brightness-[0.6] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono-intel text-[10px] text-zinc-300">
                <span>FIG. 0{activeTab + 1} // {current.badge}</span>
                <span className="text-[#a78bfa]">CODE PRACTICE</span>
              </div>
            </div>

            <div className="p-8 border-y-2 border-[#7c3aed] bg-[#111111]/80 rounded-xs relative my-8 shadow-xl">
              <span className="font-serif-editorial text-7xl text-[#7c3aed]/30 absolute top-0 left-4 select-none">“</span>
              <blockquote className="font-serif-editorial text-2xl sm:text-3xl italic text-white leading-relaxed relative z-10 font-normal">
                "{current.quote}"
              </blockquote>
              <div className="mt-4 font-mono-intel text-xs font-semibold text-[#a78bfa] tracking-widest uppercase">
                — UN RITHY REACH, SOFTWARE DEVELOPER
              </div>
            </div>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              {current.body}
            </p>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="border border-[#2f2f2f] bg-[#111111] p-6 rounded-xs space-y-4">
              <span className="font-mono-intel text-[10px] text-[#a78bfa] font-bold tracking-widest uppercase block">
                DEVELOPER SIGNAL
              </span>
              <p className="text-sm text-white leading-relaxed font-medium">
                "Un Rithy Reach demonstrates solid full-stack software development skills: fast-learning, structured, and ready to build modern web applications."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#050505] bg-grid-fine border-t border-[#2f2f2f]">
      <div className="max-w-7xl mx-auto px-6">
        <EditorialHeading
          issueTag="PROFILE // SUMMARY"
          title="Background & Developer Mindset"
          subtitle="Software Developer and Information Technology Engineering student with hands-on experience building full-stack web applications and leading software development projects."
        />

        {/* Summary Card */}
        <div className="mb-8 border border-[#2f2f2f] bg-[#111111] p-6 sm:p-8 rounded-xs">
          <span className="font-mono-intel text-xs font-bold text-[#7c3aed] uppercase tracking-wider block mb-2">
            SUMMARY
          </span>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
            Software Developer and Information Technology Engineering student with hands-on experience building full-stack web applications and leading software development projects. Founder and Lead Software Developer at <strong className="text-white font-medium">Odyssey Forge</strong>, developing practical digital solutions and client-focused applications. Experienced with <strong className="text-white font-medium">PHP, Laravel, React, TypeScript, Node.js, MySQL, Docker, REST APIs, authentication, testing</strong>, and modern software development workflows. Interested in advancing toward cloud engineering and DevOps through continued development of infrastructure, automation, security, and scalable software systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 border border-[#2f2f2f] bg-[#111111] p-6 sm:p-8 rounded-xs">
            <h3 className="font-display text-xl font-bold text-white mb-4">Developer Profile Details</h3>
            <div className="space-y-3">
              {[
                { label: 'Full Name', value: 'UN RITHY REACH' },
                { label: 'Primary Title', value: 'Software Developer | Full Stack Developer' },
                { label: 'Current Role', value: 'Founder & Lead Software Developer @ Odyssey Forge' },
                { label: 'Education', value: 'Royal University of Phnom Penh (RUPP)' },
                { label: 'Major', value: 'Information Technology Engineering (ITE)' },
                { label: 'Certifications', value: 'IELTS Academic — Band 6.0' },
                { label: 'Location', value: 'Phnom Penh, Prek Pnov, Cambodia' },
                { label: 'Contact Phone', value: '(010) 367 456 / (096) 488 2257' },
                { label: 'Email', value: 'Reachhttps69@gmail.com' },
                { label: 'Profiles', value: 'github.com/ReachVs · linkedin.com/in/un-rithy-reach' },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 py-2.5"
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid #1a1a1a' : 'none' }}
                >
                  <span className="font-mono-intel text-xs font-semibold text-[#9e9e9e] sm:w-40 shrink-0 uppercase">{item.label}</span>
                  <span className="text-sm text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="border border-[#2f2f2f] bg-[#111111] p-6 sm:p-8 rounded-xs">
              <h3 className="font-display text-lg font-bold text-white mb-4">Core Strengths & Qualities</h3>
              <div className="space-y-4 text-sm text-[#9e9e9e] leading-relaxed">
                <div className="border-l-2 border-[#7c3aed] pl-3">
                  <strong className="text-white block mb-1">Open-Minded & Problem Solver</strong>
                  Approaches complex system requirements with analytical problem-solving and adaptive thinking.
                </div>
                <div className="border-l-2 border-[#7c3aed] pl-3">
                  <strong className="text-white block mb-1">Resilience & Fast Learner</strong>
                  Quickly absorbs emerging software frameworks, development tooling, and cloud architectures.
                </div>
                <div className="border-l-2 border-[#7c3aed] pl-3">
                  <strong className="text-white block mb-1">Team Leadership & Collaboration</strong>
                  Leads cross-functional dev teams while integrating security, UX/UI, and automated workflows.
                </div>
              </div>
            </div>

            <div className="border border-[#2f2f2f] bg-[#111111] p-6 rounded-xs space-y-3">
              <span className="font-mono-intel text-xs font-bold text-[#e2e8f0] uppercase tracking-wider block">
                PEOPLE SKILLS & LANGUAGES
              </span>
              <div className="flex flex-wrap gap-2">
                {['Teamwork', 'Collaboration', 'Critical Thinking', 'Adaptability', 'Flexibility', 'Communication'].map(s => (
                  <span key={s} className="font-mono-intel text-xs px-2.5 py-1 bg-white/5 border border-white/10 text-zinc-300 rounded-xs">
                    {s}
                  </span>
                ))}
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono-intel">
                <span className="text-zinc-400">Languages:</span>
                <span className="text-white font-semibold">Khmer (Native) · English (IELTS Band 6.0)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Skills Section ───────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-[#0a0a0a] border-t border-[#2f2f2f]">
      <div className="max-w-7xl mx-auto px-6">
        <EditorialHeading
          issueTag="CAPABILITY MATRIX"
          title="Technical Proficiency & Skills"
          subtitle="Focused on modern frontend React development, backend APIs, and type-safe JavaScript ecosystems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <TechMetricsCard />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CAPABILITIES.map(cap => (
              <div
                key={cap.code}
                className="border border-[#2f2f2f] bg-[#111111] p-5 rounded-xs hover:border-[#e2e8f0]/50 transition-colors"
              >
                <div className="font-mono-intel text-xs text-[#e2e8f0] font-bold mb-1">{cap.code}</div>
                <h4 className="font-display text-base font-bold text-white mb-2">{cap.label}</h4>
                <p className="text-xs sm:text-sm text-[#9e9e9e] leading-relaxed mb-3">{cap.tech}</p>
                <Badge variant="blue">{cap.rating}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Projects Section ─────────────────────────────────────────────────────────

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const featured = PROJECTS.find(p => p.featured) || PROJECTS[0]
  const others = PROJECTS.filter(p => !p.featured)

  return (
    <section id="projects" className="py-24 bg-[#050505] bg-grid-fine border-t border-[#2f2f2f]">
      <div className="max-w-7xl mx-auto px-6">
        <EditorialHeading
          issueTag="PORTFOLIO PROJECTS"
          title="Featured Projects & Case Studies"
          subtitle="Explore full-stack web applications built with Next.js, React, Node.js, and TypeScript."
        />

        {featured && (
          <div className="mb-12 border border-[#2f2f2f] bg-[#111111] rounded-xs overflow-hidden hover:border-[#e2e8f0]/60 transition-all group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden bg-[#0a0a0a]">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="w-full h-full object-cover brightness-[0.6] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="blue">{featured.classification}</Badge>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="font-mono-intel text-xs font-bold text-[#e2e8f0] tracking-widest uppercase block mb-2">
                    {featured.code} // {featured.archetype}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                    {featured.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[#9e9e9e] leading-relaxed font-light mb-6">
                    {featured.briefing}
                  </p>

                  <div className="mb-6">
                    <span className="font-mono-intel text-xs text-[#9e9e9e] block mb-2 font-semibold uppercase">TECH STACK</span>
                    <div className="flex flex-wrap gap-1.5">
                      {featured.stack.map(t => (
                        <span key={t} className="font-mono-intel text-xs px-2.5 py-1 border border-[#2f2f2f] text-[#e2e8f0] bg-[#e2e8f0]/5 rounded-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(featured)}
                  className="font-mono-intel text-xs font-bold text-center text-white bg-[#7c3aed] px-6 py-3.5 hover:bg-[#6d28d9] transition-colors rounded-xs w-full uppercase tracking-wider shadow-md shadow-[#7c3aed]/30"
                >
                  Read Full Project Case Study
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {others.map(p => (
            <div
              key={p.code}
              className="border border-[#2f2f2f] bg-[#111111] overflow-hidden hover:border-[#7c3aed]/60 transition-all flex flex-col rounded-xs group"
            >
              <div className="relative h-56 overflow-hidden bg-[#0a0a0a] shrink-0">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover brightness-[0.55] group-hover:brightness-[0.7] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant="blue">{p.classification}</Badge>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <span className="font-mono-intel text-xs font-semibold text-[#a78bfa] block mb-1">
                  {p.code} // {p.archetype}
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-3 leading-snug">{p.name}</h3>
                <p className="text-sm text-[#9e9e9e] leading-relaxed mb-6 flex-1">
                  {p.briefing}
                </p>

                <div className="mb-6">
                  <span className="font-mono-intel text-xs text-[#9e9e9e] block mb-2 font-semibold">TECH STACK</span>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map(t => (
                      <span key={t} className="font-mono-intel text-xs px-2.5 py-1 border border-[#2f2f2f] text-[#a78bfa] bg-[#7c3aed]/5 rounded-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(p)}
                  className="font-mono-intel text-xs font-semibold text-center text-white border border-[#7c3aed]/60 px-4 py-3 hover:bg-[#7c3aed] hover:text-white transition-all rounded-xs w-full uppercase tracking-wider"
                >
                  Read Full Case Study
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}

// ─── Experience Timeline Section ─────────────────────────────────────────────

function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-[#0a0a0a] border-t border-[#2f2f2f]">
      <div className="max-w-7xl mx-auto px-6">
        <EditorialHeading
          issueTag="DEVELOPER ROADMAP"
          title="Education & Experience Timeline"
          subtitle="From Information Technology Engineering (ITE) foundations to full-stack web application development."
        />

        <div className="relative max-w-4xl">
          <div className="absolute left-[20px] sm:left-[31px] top-6 bottom-6 w-px bg-[#2f2f2f]" />
          <div className="space-y-8">
            {TIMELINE.map((entry) => (
              <div key={entry.code} className="flex gap-4 sm:gap-8">
                <div className="shrink-0 flex flex-col items-center" style={{ width: 40 }}>
                  <div
                    className="w-4 h-4 mt-5 border-2 rounded-full"
                    style={{
                      borderColor: entry.active ? '#e2e8f0' : '#2f2f2f',
                      backgroundColor: entry.active ? '#e2e8f0' : '#050505',
                    }}
                  />
                </div>
                <div className="flex-1 border border-[#2f2f2f] bg-[#111111] p-6 rounded-xs hover:border-[#e2e8f0]/40 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="font-mono-intel text-xs text-[#e2e8f0] font-bold block mb-1">MILESTONE {entry.code}</span>
                      <h3 className="font-display text-xl font-bold text-white">{entry.title}</h3>
                    </div>
                    <span className="font-display text-3xl sm:text-4xl font-bold text-[#2a2a2a] select-none">
                      {entry.year}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#9e9e9e] leading-relaxed">{entry.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── AI Terminal Section ──────────────────────────────────────────────────────

function AITerminalSection() {
  const [lines, setLines] = useState<{ type: 'input' | 'output' | 'system'; content: string }[]>([
    { type: 'system', content: 'UN RITHY REACH // PORTFOLIO AI ASSISTANT v2.6' },
    { type: 'system', content: 'Ask me anything about Rithy\'s background, tech stack, projects, or availability!' },
    { type: 'system', content: '' },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const terminalBoxRef = useRef<HTMLDivElement>(null)
  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    if (terminalBoxRef.current) {
      terminalBoxRef.current.scrollTop = terminalBoxRef.current.scrollHeight
    }
  }, [lines])

  const executeQuery = async (queryText: string) => {
    if (!queryText.trim() || busy) return
    const query = queryText.trim()
    setInput('')
    setLines(prev => [...prev, { type: 'input', content: `> ${query}` }])
    setBusy(true)

    await new Promise(r => setTimeout(r, 300))
    setLines(prev => [...prev, { type: 'system', content: 'Processing query...' }])
    await new Promise(r => setTimeout(r, 500))

    const response = getAIResponse(query)
    setLines(prev => [...prev.slice(0, -1), { type: 'system', content: '' }])

    for (const part of response.split('\n')) {
      await new Promise(r => setTimeout(r, 35))
      setLines(prev => {
        const last = prev[prev.length - 1]
        return last.type === 'system' && last.content === ''
          ? [...prev.slice(0, -1), { type: 'output', content: part }]
          : [...prev, { type: 'output', content: part }]
      })
    }

    setBusy(false)
  }

  return (
    <section id="ai-assistant" className="py-24 bg-[#050505] border-t border-[#2f2f2f]">
      <div className="max-w-7xl mx-auto px-6">
        <EditorialHeading
          issueTag="INTERACTIVE ASSISTANT"
          title="Ask My AI Assistant"
          subtitle="Get instant answers about my technical skills, educational background, and job availability."
        />

        <div className="border border-white/20 bg-zinc-950 max-w-4xl rounded-xs shadow-2xl">
          <div className="border-b border-white/10 px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7c3aed] animate-pulse shadow-md shadow-[#7c3aed]" />
              <span className="font-mono-intel text-xs font-bold text-white tracking-wider">
                UN RITHY REACH // AI ASSISTANT TERMINAL
              </span>
            </div>
            <span className="bg-[#7c3aed] text-white px-2 py-0.5 font-mono-intel text-[10px] font-bold tracking-widest uppercase">
              LIVE
            </span>
          </div>

          <div ref={terminalBoxRef} className="h-72 overflow-y-auto p-6 space-y-1.5 font-mono-intel text-xs sm:text-sm leading-relaxed custom-scrollbar">
            {lines.map((l, i) => (
              <div
                key={i}
                className={
                  l.type === 'input' ? 'text-white font-semibold' :
                  l.type === 'output' ? 'text-zinc-300' :
                  'text-zinc-400 font-medium'
                }
              >
                {l.content || <>&nbsp;</>}
              </div>
            ))}
            {busy && <div className="text-[#7c3aed] animate-blink">█</div>}
          </div>

          <div className="border-t border-white/10 px-6 py-4 flex gap-3 items-center">
            <span className="font-mono-intel text-sm text-[#7c3aed] font-bold shrink-0">{'>'}</span>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && executeQuery(input)}
              placeholder="Ask a question..."
              className="flex-1 bg-transparent font-mono-intel text-xs sm:text-sm text-white outline-none placeholder-zinc-600"
            />
            <button
              onClick={() => executeQuery(input)}
              disabled={busy}
              className="font-mono-intel text-xs font-bold bg-[#7c3aed] text-white px-5 py-2.5 hover:bg-[#6d28d9] transition-colors disabled:opacity-30 shrink-0 rounded-xs uppercase tracking-wider shadow-md shadow-[#7c3aed]/30"
            >
              Send Query
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 max-w-4xl">
          <span className="font-mono-intel text-xs text-[#9e9e9e] font-semibold self-center mr-1">TRY ASKING:</span>
          {SUGGESTED_QUERIES.map(sq => (
            <button
              key={sq}
              disabled={busy}
              onClick={() => executeQuery(sq)}
              className="font-mono-intel text-xs text-[#9e9e9e] hover:text-white border border-[#2f2f2f] hover:border-[#e2e8f0] px-3 py-1.5 bg-[#111111] transition-colors rounded-xs disabled:opacity-40"
            >
              &gt; {sq}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [phase, setPhase] = useState<'idle' | 'sending' | 'done'>('idle')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    setPhase('sending')
    await new Promise(r => setTimeout(r, 1200))
    setPhase('done')
  }

  const resetForm = () => {
    setForm({ name: '', email: '', message: '' })
    setPhase('idle')
  }

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] border-t border-[#2f2f2f]">
      <div className="max-w-7xl mx-auto px-6">
        <EditorialHeading
          issueTag="CONTACT // HIRE ME"
          title="Let's Work Together"
          subtitle="Have a Junior / Mid-Level role or project opportunity? Send me a message and I'll respond within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-[#2f2f2f] bg-[#111111] p-6 sm:p-8 rounded-xs">
            {phase === 'done' ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#e2e8f0]/20 border border-[#e2e8f0] text-[#e2e8f0] flex items-center justify-center text-xl font-bold mx-auto">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-sm text-[#9e9e9e] leading-relaxed">
                  Thank you for reaching out. Un Rithy Reach will respond to your message within 24 hours.
                </p>
                <button
                  onClick={resetForm}
                  className="font-mono-intel text-xs font-bold border border-[#7c3aed] text-white bg-[#7c3aed] px-6 py-3 hover:bg-[#6d28d9] transition-colors rounded-xs mt-4 inline-block uppercase tracking-wider shadow-md shadow-[#7c3aed]/30"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                <div>
                  <label className="block font-mono-intel text-xs font-semibold text-[#9e9e9e] uppercase mb-2">Your Name</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Jane Doe"
                    className="w-full bg-[#0a0a0a] border border-[#2f2f2f] px-4 py-3.5 text-sm text-white placeholder-[#555555] focus:border-[#e2e8f0] outline-none transition-colors rounded-xs"
                  />
                </div>
                <div>
                  <label className="block font-mono-intel text-xs font-semibold text-[#9e9e9e] uppercase mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="you@company.com"
                    className="w-full bg-[#0a0a0a] border border-[#2f2f2f] px-4 py-3.5 text-sm text-white placeholder-[#555555] focus:border-[#e2e8f0] outline-none transition-colors rounded-xs"
                  />
                </div>
                <div>
                  <label className="block font-mono-intel text-xs font-semibold text-[#9e9e9e] uppercase mb-2">Role / Project Details</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell me about your junior role, team, or project inquiry..."
                    className="w-full bg-[#0a0a0a] border border-[#2f2f2f] px-4 py-3.5 text-sm text-white placeholder-[#555555] focus:border-[#e2e8f0] outline-none transition-colors resize-none rounded-xs"
                  />
                </div>
                <button
                  type="submit"
                  disabled={phase === 'sending'}
                  className="w-full font-mono-intel text-xs font-bold py-4 bg-[#7c3aed] text-white hover:bg-[#6d28d9] border border-[#7c3aed] shadow-lg shadow-[#7c3aed]/30 transition-all rounded-xs uppercase tracking-wider disabled:opacity-50"
                >
                  {phase === 'sending' ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="border border-[#2f2f2f] bg-[#111111] p-6 sm:p-8 rounded-xs">
              <h3 className="font-display text-lg font-bold text-white mb-6">Direct Contact & Profiles</h3>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 gap-3 border-b border-white/10">
                  <span className="font-mono-intel text-xs font-semibold text-zinc-400 uppercase tracking-wider">Direct Email</span>
                  <a
                    href="mailto:Reachhttps69@gmail.com"
                    className="font-mono-intel text-xs font-bold px-5 py-2.5 bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-all rounded-xs shadow-lg shadow-[#7c3aed]/40 inline-flex items-center gap-2 self-start sm:self-auto uppercase tracking-wider"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span>Reachhttps69@gmail.com</span>
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 gap-3 border-b border-white/10">
                  <span className="font-mono-intel text-xs font-semibold text-zinc-400 uppercase tracking-wider">Phone Contacts</span>
                  <div className="font-mono-intel text-xs font-semibold text-white space-y-1 text-right">
                    <div>(010) 367 456</div>
                    <div>(096) 488 2257</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 gap-3 border-b border-white/10">
                  <span className="font-mono-intel text-xs font-semibold text-zinc-400 uppercase tracking-wider">LinkedIn Profile</span>
                  <a
                    href="https://linkedin.com/in/un-rithy-reach"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-intel text-xs font-semibold px-5 py-2.5 border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition-all rounded-xs inline-flex items-center gap-2 self-start sm:self-auto uppercase tracking-wider"
                  >
                    <span>LinkedIn Profile ↗</span>
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 gap-3 border-b border-white/10">
                  <span className="font-mono-intel text-xs font-semibold text-zinc-400 uppercase tracking-wider">GitHub Profile</span>
                  <a
                    href="https://github.com/ReachVs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-intel text-xs font-semibold px-5 py-2.5 border border-white/40 text-white hover:bg-white/10 transition-all rounded-xs inline-flex items-center gap-2 self-start sm:self-auto uppercase tracking-wider backdrop-blur-xs"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    <span>Visit GitHub ↗</span>
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between py-3 gap-2 border-b border-[#1a1a1a]">
                  <span className="font-mono-intel text-xs font-semibold text-[#9e9e9e] uppercase">Location</span>
                  <span className="text-sm font-medium text-white">Phnom Penh, Prek Pnov, Cambodia</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between py-3 gap-2">
                  <span className="font-mono-intel text-xs font-semibold text-[#9e9e9e] uppercase">Response Time</span>
                  <span className="text-sm font-semibold text-[#e2e8f0]">&lt; 24 Hours Guaranteed</span>
                </div>
              </div>
            </div>

            <div className="border border-[#2f2f2f] bg-[#111111] p-6 sm:p-8 rounded-xs">
              <h3 className="font-display text-lg font-bold text-white mb-4">Open For Opportunities</h3>
              <div className="space-y-3 text-sm text-[#9e9e9e]">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#7c3aed]" />
                  <span>Software Developer & Full Stack Developer Roles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#7c3aed]" />
                  <span>Laravel / PHP / Node Backend & API Engineering</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#7c3aed]" />
                  <span>React / TypeScript Frontend & Full-Stack Projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#7c3aed]" />
                  <span>Cloud Engineering & DevOps Opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 border-t border-[#2f2f2f] pt-8 flex items-center justify-center">
        <span className="font-mono-intel text-xs text-[#9e9e9e]">
          © 2026 Un Rithy Reach — Junior Full-Stack Developer. All rights reserved.
        </span>
      </div>
    </section>
  )
}

function LiquidGlassBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Floating Liquid Light Orbs
    const blobs = [
      { x: width * 0.25, y: height * 0.3, r: 200, vx: 0.2, vy: 0.15, color: 'rgba(124, 58, 237, 0.16)' },
      { x: width * 0.75, y: height * 0.65, r: 240, vx: -0.15, vy: -0.2, color: 'rgba(255, 255, 255, 0.09)' },
      { x: width * 0.5, y: height * 0.85, r: 180, vx: 0.18, vy: -0.12, color: 'rgba(124, 58, 237, 0.14)' },
    ]

    let time = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      time += 0.015

      blobs.forEach((b, i) => {
        b.x += Math.sin(time + i) * 0.4 + b.vx
        b.y += Math.cos(time + i) * 0.4 + b.vy

        if (b.x < -100) b.x = width + 100
        if (b.x > width + 100) b.x = -100
        if (b.y < -100) b.y = height + 100
        if (b.y > height + 100) b.y = -100

        const pulseRadius = b.r + Math.sin(time * 1.5 + i) * 25
        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, pulseRadius)
        gradient.addColorStop(0, b.color)
        gradient.addColorStop(0.6, b.color.replace(/[\d\.]+\)$/, '0.04)'))
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(b.x, b.y, pulseRadius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Organic Liquid Glass background texture with slow morph animation */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 animate-liquid-morph filter contrast-125 brightness-95 mix-blend-screen"
        style={{ backgroundImage: `url('/liquid-glass-bg.png')` }}
      />

      {/* Interactive Floating Liquid Light Orbs */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-50 mix-blend-screen" />

      {/* Dark Vignette & Ambient Radial Glow for maximum text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030304]/85 via-[#030304]/60 to-[#030304]/90" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-[#7c3aed]/12 rounded-full blur-[150px] pointer-events-none" />
    </div>
  )
}

// ─── Root Application ─────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }

      // Strip initial hash on page load to prevent autocompleted hashes (like #about) from jumping down
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }

      const rootEl = document.documentElement
      const originalScrollBehavior = rootEl.style.scrollBehavior
      rootEl.style.scrollBehavior = 'auto'

      const forceScrollTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        rootEl.scrollTop = 0
        document.body.scrollTop = 0
      }

      forceScrollTop()

      const timers = [10, 50, 100, 250, 500, 1000].map(ms =>
        setTimeout(forceScrollTop, ms)
      )

      const enableSmoothTimer = setTimeout(() => {
        rootEl.style.scrollBehavior = originalScrollBehavior || 'smooth'
      }, 600)

      const handleEvent = () => forceScrollTop()
      window.addEventListener('load', handleEvent)
      window.addEventListener('pageshow', handleEvent)

      return () => {
        timers.forEach(clearTimeout)
        clearTimeout(enableSmoothTimer)
        window.removeEventListener('load', handleEvent)
        window.removeEventListener('pageshow', handleEvent)
        rootEl.style.scrollBehavior = originalScrollBehavior || 'smooth'
      }
    }
  }, [])

  return (
    <div className="relative bg-[#030304] text-white min-h-screen">
      <LiquidGlassBackground />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <EditorialFeatureSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <AITerminalSection />
        <ContactSection />
      </div>
    </div>
  )
}
