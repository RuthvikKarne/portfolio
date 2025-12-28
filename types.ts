
export interface Skill {
  name: string;
  category: 'Language' | 'Library' | 'Tool' | 'Backend' | 'Frontend';
  description?: string;
  icon?: string;
}

export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
}
