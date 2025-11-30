import React, { useState, useEffect, useMemo } from 'react';
import { User, GraduationCap, Link as LinkIcon, Sun, Moon, FileText, Search, Star, Phone, Home, Briefcase, ExternalLink, Linkedin, Github, Codepen } from 'lucide-react';
import { PROFILE_DATA } from './constants';
import { TabId } from './types';
import { GlassCard } from './components/GlassCard';
import { HighlightedText } from './components/HighlightedText';

// --- STYLES ---
// Injecting CSS variables and keyframes directly here to maintain the "Single File" feel while using React best practices.
const GlobalStyles = () => (
  <style>{`
    :root {
      --color-accent: #00a859;
      --color-text-primary: #000000;
      --color-text-secondary: #333333;
      --color-card-bg: rgba(255, 255, 255, 0.05);
      --color-card-hover-bg: rgba(255, 255, 255, 0.10);
      --color-border: rgba(255, 255, 255, 0.3);
    }
    .dark-mode {
      --color-text-primary: #ffffff;
      --color-text-secondary: #cccccc;
      --color-card-bg: rgba(0, 0, 0, 0.05);
      --color-card-hover-bg: rgba(0, 0, 0, 0.08);
      --color-border: rgba(255, 255, 255, 0.10);
    }
    body {
      background-image: url("https://github.com/urstrulysaida/shaiksaidavali.in/blob/main/Image.jpg?raw=true");
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      background-repeat: no-repeat;
      color: var(--color-text-primary);
      transition: color 0.5s;
    }
    .glass-card {
      background-color: var(--color-card-bg);
    }
    .glass-card:hover {
      background-color: var(--color-card-hover-bg);
    }
    /* Tab underline animation */
    .tab-link::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: var(--color-accent);
      transition: width 0.3s ease, left 0.3s ease;
    }
    .tab-link.active::after {
      width: 100%;
      left: 0;
    }
    /* Profile Pulse */
    @keyframes pulse-glow {
      0% { box-shadow: 0 0 0 0 rgba(0, 168, 89, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(0, 168, 89, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 168, 89, 0); }
    }
    .profile-pulse {
      animation: pulse-glow 2s infinite;
    }
    .profile-pulse:hover {
      animation: none;
    }
    /* Smooth height transition wrapper */
    .tab-content-wrapper {
        transition: height 0.4s ease-in-out;
    }
    /* Button Resume Hover */
    .btn-resume:hover {
      background-color: var(--color-card-hover-bg);
      color: var(--color-accent);
      border-color: var(--color-accent);
      box-shadow: 0 4px 15px rgba(0, 168, 89, 0.4);
    }
  `}</style>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('personal-info');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // --- THEME LOGIC ---
  useEffect(() => {
    // Check system preference or localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  // --- SEARCH LOGIC ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Use useMemo to search through data and potentially auto-switch tabs (Optimization)
  useEffect(() => {
    if (!debouncedSearch) return;

    const term = debouncedSearch.toLowerCase();
    
    // Helper to check if string contains term
    const hasMatch = (str: string) => str.toLowerCase().includes(term);
    // Helper to check object
    const checkObj = (obj: any) => Object.values(obj).some(val => typeof val === 'string' && hasMatch(val));

    // Determine where the match is
    const inPersonal = checkObj(PROFILE_DATA.personal);
    const inEducation = PROFILE_DATA.education.some(edu => 
      hasMatch(edu.title) || edu.details.some(d => hasMatch(d.label) || hasMatch(d.value))
    );
    const inCareer = checkObj(PROFILE_DATA.career.currentRole) || 
                     PROFILE_DATA.career.links.some(l => hasMatch(l.label)) ||
                     PROFILE_DATA.career.certifications.some(c => hasMatch(c.title) || hasMatch(c.focus) || hasMatch(c.skills)) ||
                     PROFILE_DATA.career.internships.some(i => hasMatch(i.title) || hasMatch(i.focus) || hasMatch(i.skills));

    if (inPersonal) setActiveTab('personal-info');
    else if (inEducation) setActiveTab('education');
    else if (inCareer) setActiveTab('career-links');

  }, [debouncedSearch]);


  // --- RENDER HELPERS ---
  const renderDataRow = (label: string, value: string, isLink = false, url = '') => (
    <div className="grid grid-cols-2 gap-2" key={label}>
      <span className="font-medium text-[var(--color-text-secondary)]">
        <HighlightedText text={label} highlight={debouncedSearch} />:
      </span>
      {isLink ? (
        <a href={url} target="_blank" rel="noreferrer" className="text-right font-semibold text-accent hover:underline">
          <HighlightedText text={value} highlight={debouncedSearch} />
        </a>
      ) : (
        <span className="text-right font-semibold text-[var(--color-text-primary)]">
          <HighlightedText text={value} highlight={debouncedSearch} />
        </span>
      )}
    </div>
  );

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl rounded-3xl border border-[var(--color-border)] bg-[var(--color-card-bg)] shadow-[0_10px_30px_rgba(0,0,0,0.1)] backdrop-blur-[45px] p-8 relative animate-fadeInUp transition-all duration-500">
          
          {/* --- HEADER --- */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-[var(--color-border)]">
            <div className="flex items-center mb-4 sm:mb-0 animate-slideInLeft">
              <div className="relative mr-4 w-28 h-28 shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-accent shadow-[0_0_15px_rgba(0,168,89,0.6)] profile-pulse transition-transform duration-300 hover:scale-105 hover:rotate-3 hover:shadow-[0_0_25px_rgba(0,168,89,0.8)] cursor-pointer">
                  <img
                    src="https://github.com/urstrulysaida/urstrulysaida/blob/main/Github%20Profile.jpeg?raw=true"
                    onError={(e) => { e.currentTarget.src='https://placehold.co/112x112/00a859/ffffff?text=SV'; }}
                    alt="Shaik Saida Vali"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
                  <HighlightedText text="Shaik Saida Vali" highlight={debouncedSearch} />
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)]">
                  <HighlightedText text={PROFILE_DATA.personal.email} highlight={debouncedSearch} />
                </p>
              </div>
            </div>

            <div className="flex space-x-3 items-center">
              <button
                onClick={toggleTheme}
                className="p-3 rounded-lg text-[var(--color-text-primary)] border border-[var(--color-border)] bg-[var(--color-card-bg)] hover:shadow-lg transition duration-300 hover:scale-105"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              <a
                href="https://docs.google.com/document/d/1UBfhBcEI_hzWj1KOlvlD4vjbkhmVV1ZNFayQrkroXZA/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="btn-resume flex items-center bg-accent text-white border-2 border-accent px-6 py-2 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                <FileText size={20} className="mr-2" />
                View Resume
              </a>
            </div>
          </header>

          {/* --- SEARCH BAR --- */}
          <div className="mb-6 flex items-center space-x-2">
            <Search className="text-[var(--color-text-secondary)]" size={24} />
            <input
              type="text"
              placeholder="Search keywords (e.g., 'GCP', 'SIEM', '2026')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card-bg)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-300"
            />
          </div>

          {/* --- TABS --- */}
          <nav className="mb-8">
            <div className="flex space-x-6 border-b border-[rgba(255,255,255,0.2)]">
              {(['personal-info', 'education', 'career-links'] as TabId[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    tab-link relative pb-3 font-medium transition-all duration-300
                    ${activeTab === tab ? 'text-accent font-semibold active' : 'text-[var(--color-text-primary)] hover:text-accent'}
                  `}
                >
                  <span className="flex items-center">
                    {tab === 'personal-info' && <User size={18} className="mr-2" />}
                    {tab === 'education' && <GraduationCap size={18} className="mr-2" />}
                    {tab === 'career-links' && <LinkIcon size={18} className="mr-2" />}
                    {tab === 'personal-info' ? 'Personal Info' : tab === 'education' ? 'Education' : 'Career & Links'}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          {/* --- TAB CONTENT --- */}
          <main>
            {/* PERSONAL INFO */}
            {activeTab === 'personal-info' && (
              <div className="space-y-8 animate-fadeIn">
                <GlassCard>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)] flex items-center">
                    <Star className="mr-2 text-accent" size={24} />
                    Professional Summary
                  </h3>
                  <p className="text-base text-[var(--color-text-primary)] leading-relaxed">
                    <HighlightedText text={PROFILE_DATA.personal.summary} highlight={debouncedSearch} />
                  </p>
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <GlassCard>
                    <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)] flex items-center">
                      <Phone className="mr-2 text-accent" size={24} />
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      {renderDataRow("Email", PROFILE_DATA.personal.email)}
                      {renderDataRow("Contact", PROFILE_DATA.personal.contact)}
                      {renderDataRow("WhatsApp", PROFILE_DATA.personal.whatsapp)}
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)] flex items-center">
                      <User className="mr-2 text-accent" size={24} />
                      Personal Details
                    </h3>
                    <div className="space-y-3">
                      {renderDataRow("DOB", PROFILE_DATA.personal.dob)}
                      {renderDataRow("Gender", PROFILE_DATA.personal.gender)}
                      {renderDataRow("Category", PROFILE_DATA.personal.category)}
                      {renderDataRow("Disability", PROFILE_DATA.personal.disability)}
                    </div>
                  </GlassCard>
                </div>

                <GlassCard className="max-w-xl">
                  <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)] flex items-center">
                    <Home className="mr-2 text-accent" size={24} />
                    Address Information
                  </h3>
                  <div className="space-y-3">
                    {renderDataRow("Address", PROFILE_DATA.personal.address)}
                    {renderDataRow("City/Town", PROFILE_DATA.personal.city)}
                    {renderDataRow("State", PROFILE_DATA.personal.state)}
                  </div>
                </GlassCard>
              </div>
            )}

            {/* EDUCATION */}
            {activeTab === 'education' && (
              <div className="space-y-8 animate-fadeIn">
                <h3 className="text-2xl font-bold text-accent mb-6">Academic History</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {PROFILE_DATA.education.slice(0, 2).map((edu) => (
                    <div key={edu.id} className="glass-card rounded-xl overflow-hidden relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                      {/* Background Image Wrapper */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center z-0" 
                        style={{ backgroundImage: `url(${edu.bgImage})` }} 
                      />
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />
                      
                      {/* Content */}
                      <div className="relative z-20 p-6 text-white h-full">
                        <h4 className="text-xl font-semibold mb-4 flex items-center">
                           <GraduationCap className="mr-2 text-white" size={20} />
                           <HighlightedText text={edu.title} highlight={debouncedSearch} />
                        </h4>
                        <div className="space-y-3 text-sm">
                          {edu.details.map((detail, idx) => (
                            <div className="grid grid-cols-2 gap-2" key={idx}>
                              <span className="font-medium text-gray-200">
                                <HighlightedText text={detail.label} highlight={debouncedSearch} />:
                              </span>
                              {detail.isLink ? (
                                <a href={detail.linkUrl} target="_blank" rel="noreferrer" className="text-right text-yellow-300 hover:underline">
                                  {detail.value}
                                </a>
                              ) : (
                                <span className="text-right font-semibold text-white">
                                  <HighlightedText text={detail.value} highlight={debouncedSearch} />
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* UG Card - Full Width */}
                {PROFILE_DATA.education.slice(2).map((edu) => (
                   <div key={edu.id} className="glass-card rounded-xl overflow-hidden relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl min-h-[16rem] flex items-end">
                    <div 
                      className="absolute inset-0 bg-cover bg-center z-0" 
                      style={{ backgroundImage: `url(${edu.bgImage})` }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />
                    
                    <div className="relative z-20 p-6 w-full text-white">
                      <h4 className="text-xl font-semibold mb-4 flex items-center">
                          <GraduationCap className="mr-2 text-white" size={20} />
                          <HighlightedText text={edu.title} highlight={debouncedSearch} />
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm">
                         {edu.details.map((detail, idx) => (
                            <div className="grid grid-cols-2 gap-2" key={idx}>
                              <span className="font-medium text-gray-200">
                                <HighlightedText text={detail.label} highlight={debouncedSearch} />:
                              </span>
                              <span className="text-right font-semibold text-white">
                                <HighlightedText text={detail.value} highlight={debouncedSearch} />
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                   </div>
                ))}
              </div>
            )}

            {/* CAREER & LINKS */}
            {activeTab === 'career-links' && (
              <div className="space-y-8 animate-fadeIn">
                <h3 className="text-2xl font-bold text-accent mb-6">Career & Links</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <GlassCard>
                    <h4 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)] flex items-center">
                      <Briefcase className="mr-2 text-red-500" size={20} />
                      Current Position
                    </h4>
                    <div className="space-y-3 text-sm">
                      {PROFILE_DATA.career.currentRole.map(item => renderDataRow(item.label, item.value))}
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <h4 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)] flex items-center">
                      <LinkIcon className="mr-2 text-purple-500" size={20} />
                      Social & Portfolio Links
                    </h4>
                    <div className="space-y-3 text-sm">
                      {PROFILE_DATA.career.links.map((link) => (
                        <div className="flex items-center justify-between" key={link.label}>
                          <span className="font-medium text-[var(--color-text-secondary)] flex items-center">
                             {link.label === 'LinkedIn' && <Linkedin size={16} className={`mr-2 ${link.iconColorClass}`} />}
                             {link.label === 'GitHub' && <Github size={16} className={`mr-2 ${link.iconColorClass}`} />}
                             {link.label === 'Codepen' && <Codepen size={16} className={`mr-2 ${link.iconColorClass}`} />}
                             <HighlightedText text={link.label} highlight={debouncedSearch} />:
                          </span>
                          <a href={link.url} target="_blank" rel="noreferrer" className="text-accent hover:underline font-semibold">
                            {link.linkText}
                          </a>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>

                <div className="border-t border-[var(--color-border)] pt-8">
                   <h3 className="text-2xl font-bold text-accent mb-6">Career Highlights</h3>
                   
                   {/* CERTIFICATIONS */}
                   <h4 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)] flex items-center">
                      <Star className="mr-2 text-green-500" size={20} />
                      Professional Certifications
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                      {PROFILE_DATA.career.certifications.map(cert => (
                        <GlassCard key={cert.id} className="flex flex-col h-full">
                           <h5 className={`text-lg font-bold mb-2 ${cert.colorClass}`}>
                             <HighlightedText text={cert.title} highlight={debouncedSearch} />
                           </h5>
                           <p className="text-xs font-semibold uppercase text-[var(--color-text-secondary)] mb-3">{cert.type}</p>
                           <ul className="space-y-2 text-sm text-[var(--color-text-primary)] mb-4 flex-grow">
                             <li><strong>Key Focus:</strong> <HighlightedText text={cert.focus} highlight={debouncedSearch} /></li>
                             <li><strong>Skills:</strong> <HighlightedText text={cert.skills} highlight={debouncedSearch} /></li>
                           </ul>
                           <a href={cert.linkUrl} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white bg-accent rounded-md border border-accent shadow-sm transition-all duration-200 hover:bg-[rgba(255,255,255,0.1)] hover:text-accent hover:scale-105 group">
                              <ExternalLink size={14} className="mr-1 transition-colors group-hover:stroke-accent" stroke="currentColor" />
                              View Proof
                           </a>
                        </GlassCard>
                      ))}
                   </div>

                   {/* INTERNSHIPS */}
                   <h4 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)] flex items-center border-t border-[var(--color-border)] pt-6">
                      <Briefcase className="mr-2 text-red-500" size={20} />
                      Internships & Practical Experience
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {PROFILE_DATA.career.internships.map(intern => (
                        <GlassCard key={intern.id} className="flex flex-col h-full">
                           <h5 className={`text-lg font-bold mb-2 ${intern.colorClass}`}>
                             <HighlightedText text={intern.title} highlight={debouncedSearch} />
                           </h5>
                           <p className="text-xs font-semibold uppercase text-[var(--color-text-secondary)] mb-3">{intern.type}</p>
                           <ul className="space-y-2 text-sm text-[var(--color-text-primary)] mb-4 flex-grow">
                             <li><strong>Key Focus:</strong> <HighlightedText text={intern.focus} highlight={debouncedSearch} /></li>
                             <li><strong>Skills:</strong> <HighlightedText text={intern.skills} highlight={debouncedSearch} /></li>
                           </ul>
                           <a href={intern.linkUrl} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white bg-accent rounded-md border border-accent shadow-sm transition-all duration-200 hover:bg-[rgba(255,255,255,0.1)] hover:text-accent hover:scale-105 group">
                              <ExternalLink size={14} className="mr-1 transition-colors group-hover:stroke-accent" stroke="currentColor" />
                              View Certificate
                           </a>
                        </GlassCard>
                      ))}
                   </div>
                </div>

              </div>
            )}
          </main>

        </div>
      </div>
    </>
  );
};

export default App;