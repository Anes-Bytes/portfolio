import { PenTool, Code, Smartphone, Zap, Star, GitBranch, Users, Github } from 'lucide-react'
import { aboutData as staticAboutData } from '@/lib/portfolio-data'
import { GitHubData } from '@/lib/types'

const iconMap = {
  Code,
  Zap,
  Smartphone,
  PenTool,
}

interface AboutSectionProps {
  data?: typeof staticAboutData;
  github?: GitHubData;
  dictionary: {
    title: string
    services: string
    githubStats: string
    githubRepos: string
    repos: string
    stars: string
    followers: string
    following: string
    noDescription: string
    other: string
  }
}

export function AboutSection({ data = staticAboutData, github, dictionary }: AboutSectionProps) {
  return (
    <div className="space-y-8 md:space-y-10">
      {/* About Me */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{dictionary.title}</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
        <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          {data.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* What I'm Doing */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">{dictionary.services}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap]
            return (
              <div
                key={index}
                className="flex gap-3 md:gap-4 p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                  <IconComponent className="w-full h-full text-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">{service.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* GitHub Section */}
      {github && (
        <div className="space-y-8">
          {/* GitHub Stats */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">{dictionary.githubStats}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border flex flex-col items-center justify-center text-center">
                <GitBranch className="w-6 h-6 text-accent mb-2" />
                <span className="text-xl md:text-2xl font-bold text-foreground">{github.user_stats.public_repos}</span>
                <span className="text-xs text-muted-foreground uppercase">{dictionary.repos}</span>
              </div>
              <div className="p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border flex flex-col items-center justify-center text-center">
                <Star className="w-6 h-6 text-accent mb-2" />
                <span className="text-xl md:text-2xl font-bold text-foreground">{github.user_stats.stars}</span>
                <span className="text-xs text-muted-foreground uppercase">{dictionary.stars}</span>
              </div>
              <div className="p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border flex flex-col items-center justify-center text-center">
                <Users className="w-6 h-6 text-accent mb-2" />
                <span className="text-xl md:text-2xl font-bold text-foreground">{github.user_stats.followers}</span>
                <span className="text-xs text-muted-foreground uppercase">{dictionary.followers}</span>
              </div>
              <div className="p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border flex flex-col items-center justify-center text-center">
                <Users className="w-6 h-6 text-accent mb-2" />
                <span className="text-xl md:text-2xl font-bold text-foreground">{github.user_stats.following}</span>
                <span className="text-xs text-muted-foreground uppercase">{dictionary.following}</span>
              </div>
            </div>
          </div>

          {/* Recent Repositories */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">{dictionary.githubRepos}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {github.recent_repos.map((repo, index) => (
                <a
                  key={index}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-base md:text-lg font-semibold text-foreground group-hover:text-accent transition-colors break-all">
                      {repo.name}
                    </h4>
                    <Github className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                    {repo.description || dictionary.noDescription}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                      {repo.language || dictionary.other}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      {repo.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitBranch className="w-3.5 h-3.5" />
                      {repo.forks}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
