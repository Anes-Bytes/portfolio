'use client'

import { useState } from 'react'
import { ProfileSidebar } from '@/components/profile-sidebar'
import { AboutSection } from '@/components/about-section'
import { ResumeSection } from '@/components/resume-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { BlogSection } from '@/components/blog-section'
import { ContactSection } from '@/components/contact-section-new'
import { ThemeToggle } from '@/components/theme-toggle'
import { Footer } from '@/components/footer'

export function HomeClient({ 
  profileData, 
  aboutData, 
  resumeData, 
  portfolioData, 
  blogPosts,
  githubData,
  lang,
  dictionary
}: any) {
  const [activeSection, setActiveSection] = useState('about')

  const sections = ['about', 'resume', 'portfolio', 'blog', 'contact']

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-12 flex flex-col" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex gap-2">
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-7xl w-full flex-grow flex flex-col">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 flex-grow">
          <ProfileSidebar data={profileData} dictionary={dictionary.sidebar} />

          {/* Main Content */}
          <main className="flex-1 bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden flex flex-col">
            {/* Navigation */}
            <nav className="flex gap-1 sm:gap-2 md:gap-4 p-3 sm:p-4 md:p-6 border-b border-border overflow-x-auto scrollbar-hide">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                    activeSection === section
                      ? 'text-foreground bg-accent/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {dictionary.nav[section]}
                </button>
              ))}
            </nav>

            <div className="p-4 sm:p-5 md:p-6 lg:p-8">
              {activeSection === 'about' && <AboutSection data={aboutData} github={githubData} dictionary={dictionary.about} />}
              {activeSection === 'resume' && <ResumeSection data={resumeData} dictionary={dictionary.resume} />}
              {activeSection === 'portfolio' && <PortfolioSection data={portfolioData} dictionary={dictionary.portfolio} />}
              {activeSection === 'blog' && <BlogSection data={blogPosts} dictionary={dictionary.blog} />}
              {activeSection === 'contact' && <ContactSection dictionary={dictionary.contact} />}
            </div>
          </main>
        </div>

        <Footer 
          onNavigate={(section) => setActiveSection(section)} 
          githubUrl={profileData.social.github}
          telegramUrl={profileData.social.telegram}
          linkedinUrl={profileData.social.linkedin}
          dictionary={dictionary}
        />
      </div>
    </div>
  )
}
