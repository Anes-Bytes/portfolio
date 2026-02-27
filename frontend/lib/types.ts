export interface DynamicProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  avatar: string;
  birthday: string;
  location: string;
  github: string;
  telegram: string;
  linkedin: string;
  about_me: string;
  services: {
    icon: string;
    title: string;
    description: string;
    order: number;
  }[];
}

export interface ResumeData {
  education: {
    title: string;
    period: string;
    description: string;
  }[];
  experience: {
    title: string;
    period: string;
    description: string;
  }[];
  skills: {
    name: string;
    level: number;
  }[];
}

export interface PortfolioProjectsData {
  categories: string[];
  projects: {
    title: string;
    category_name: string;
    image: string;
    description: string;
    tech: string[];
    live_url: string;
    github_url: string;
  }[];
}

export interface GitHubData {
  user_stats: {
    public_repos: number;
    followers: number;
    following: number;
    stars: number;
  };
  recent_repos: {
    name: string;
    description: string;
    url: string;
    stars: number;
    forks: number;
    language: string;
    updated_at: string;
  }[];
}

export interface BlogPostData {
  id: number;
  title: string;
  slug: string;
  image: string;
  content: string;
  short_description: string;
  language: 'en' | 'fa';
  language_label: string;
  category: {
    name: string;
    slug: string;
  } | null;
  tags: {
    name: string;
    slug: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface APIResponse {
  profile: DynamicProfileData;
  resume: ResumeData;
  portfolio: PortfolioProjectsData;
  blog: BlogPostData[];
  github: GitHubData;
}
