
import React from 'react';
import { Database, Code, Library, Box, Layout, Github, Mail, Linkedin } from 'lucide-react';
import { Skill, Project } from './types';

export const SKILLS: Skill[] = [
  { name: 'python', category: 'Language', description: 'Primary language for Data Science and AI development.' },
  { name: 'java', category: 'Language', description: 'Expertise in building scalable backend services.' },
  { name: 'C', category: 'Language', description: 'Foundational programming for systems and performance.' },
  { name: 'numpy', category: 'Library', description: 'Numerical computing with powerful N-dimensional arrays.' },
  { name: 'pandas', category: 'Library', description: 'Advanced data manipulation and analysis toolkit.' },
  { name: 'sea-born', category: 'Library', description: 'Sophisticated statistical data visualization.' },
  { name: 'tensorflow', category: 'Library', description: 'Comprehensive open-source platform for machine learning.' },
  { name: 'pytorch', category: 'Library', description: 'Deep learning framework for research and production.' },
  { name: 'scikitlearn', category: 'Library', description: 'Essential tools for data mining and predictive modeling.' },
  { name: 'sql', category: 'Tool', description: 'Querying and managing relational database systems.' },
  { name: 'excel', category: 'Tool', description: 'Data organization, modeling, and business calculations.' },
  { name: 'tableau', category: 'Tool', description: 'Interactive data visualization and business intelligence.' },
  { name: 'powerbi', category: 'Tool', description: 'Business analytics for data insights and reporting.' },
  { name: 'springboot', category: 'Backend', description: 'Modern Java framework for production-grade microservices.' },
  { name: 'react', category: 'Frontend', description: 'Building dynamic and interactive modern user interfaces.' },
];

export const PROJECTS: Project[] = [
  {
    title: "Data Science Repositories",
    description: "A collection of machine learning and data analysis projects involving Python, TensorFlow, and Pytorch.",
    link: "https://github.com/RuthvikKarne?tab=repositories",
    tags: ["python", "tensorflow", "pytorch"]
  },
  {
    title: "Java Fullstack Work",
    description: "Robust backend architectures with springboot and dynamic frontends built with react.",
    link: "https://github.com/RuthvikKarne?tab=repositories",
    tags: ["springboot", "react", "java"]
  },
  {
    title: "Analytics Dashboards",
    description: "Visualizing complex datasets using tableau, powerbi, and sea-born to drive business insights.",
    link: "https://github.com/RuthvikKarne?tab=repositories",
    tags: ["tableau", "powerbi", "sql"]
  }
];

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Language: <Code className="w-5 h-5" />,
  Library: <Library className="w-5 h-5" />,
  Tool: <Database className="w-5 h-5" />,
  Backend: <Box className="w-5 h-5" />,
  Frontend: <Layout className="w-5 h-5" />,
};

export const SOCIAL_LINKS = [
  { name: 'GitHub', icon: <Github />, url: 'https://github.com/RuthvikKarne' },
  { name: 'LinkedIn', icon: <Linkedin />, url: 'https://in.linkedin.com/in/karneruthvik' },
  { name: 'Email', icon: <Mail />, url: 'mailto:ruthvikkarne11@gmail.com' },
];
