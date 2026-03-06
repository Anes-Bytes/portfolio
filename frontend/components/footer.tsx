import { Github, Send, Linkedin } from 'lucide-react'

interface FooterProps {
  onNavigate: (section: string) => void
  githubUrl?: string
  telegramUrl?: string
  linkedinUrl?: string
  dictionary: {
    nav: {
      about: string
      resume: string
      portfolio: string
      blog: string
      contact: string
    }
  }
}

export function Footer({
  onNavigate,
  githubUrl = 'https://github.com/anes-bytes',
  telegramUrl = '#',
  linkedinUrl = '#',
  dictionary,
}: FooterProps) {
  return (
    <footer className="mt-8 md:mt-12 pb-8">
      <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
            {['about', 'resume', 'portfolio', 'blog', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => onNavigate(section)}
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors capitalize"
              >
                {dictionary.nav[section as keyof FooterProps['dictionary']['nav']]}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center border border-border"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center border border-border"
              aria-label="Telegram"
            >
              <Send className="w-5 h-5" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center border border-border"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              made with ❤️ and lots of ☕ by{' '}
              <a
                href="https://t.me/AnesPy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-accent hover:opacity-80 transition-opacity"
              >
                @AnesPy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

