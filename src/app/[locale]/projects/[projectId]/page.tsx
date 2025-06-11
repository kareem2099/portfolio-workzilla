import React from 'react';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';
import { Metadata } from 'next';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  images?: string[];
  techStack: string[];
  liveLink?: string;
  codeLink?: string;
  category?: string;
  detailedContent?: string;
}

const placeholderProjects: Project[] = [
  {
    id: '1',
    title: 'Wood Line Market',
    description: 'An online marketplace for wood products, built with HTML, CSS, JavaScript, Node.js, and ASP.NET.',
    imageUrl: '/assets/project-placeholder-1.png',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'ASP.NET'],
    liveLink: 'https://wood-line-web.vercel.app/',
    codeLink: 'https://github.com/kareem2099/WoodLine.Web',
    category: 'Web App',
    detailedContent: `<h3>Overview</h3><p>Wood Line Market is an online platform for browsing and purchasing various wood products. It features a user-friendly interface and robust backend capabilities.</p><h3>Technologies Used</h3><p>The frontend is built with HTML, CSS, and JavaScript, while the backend leverages both Node.js and ASP.NET for different microservices or functionalities, showcasing versatility in web technologies.</p>`
  },
  {
    id: '2',
    title: 'Rose & Gold E-commerce',
    description: 'A full-featured e-commerce website for jewelry, built with PHP and SQLite, and containerized with Docker.',
    imageUrl: '/assets/project-placeholder-2.png',
    techStack: ['PHP', 'SQLite', 'Docker', 'Apache', 'HTML', 'CSS', 'JavaScript'],
    liveLink: '#',
    codeLink: 'https://github.com/kareem2099/RoseAndGold',
    category: 'E-commerce',
    detailedContent: `<h3>Project Overview</h3><p>Rose & Gold is a comprehensive e-commerce platform designed for selling jewelry. It features product listings, a shopping cart, user accounts, and administrative functionalities for product management.</p><h3>Technical Details</h3><p>The application is built using PHP for server-side logic, with SQLite serving as the database. The frontend is crafted with HTML, CSS, and JavaScript. The entire application is containerized using Docker with an Apache web server, making it portable and scalable.</p>`
  },
  {
    id: '3',
    title: 'Lambo Site',
    description: 'A showcase website for Lambo.',
    imageUrl: '/assets/project-placeholder-3.png',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://lambo-website.vercel.app/',
    codeLink: 'https://github.com/kareem2099/lambo-website',
    category: 'Website',
    detailedContent: `<h3>Visual Showcase</h3><p>A simple yet elegant presentation for a fictional luxury car brand, focusing on imagery and minimalist design.</p>`
  },
  {
    id: '4',
    title: 'Pisa Prep',
    description: 'A preparatory platform for Pisa.',
    imageUrl: '/assets/project-placeholder-4.png',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://pisa-prep.vercel.app/',
    codeLink: 'https://github.com/kareem2099/PisaPrep--2-',
    category: 'Web App',
    detailedContent: `<h3>Educational Tool</h3><p>Provides resources and practice materials for students preparing for standardized tests.</p>`
  },
  {
    id: '5',
    title: 'Personal Portfolio Website',
    description: "The Next.js & Tailwind CSS portfolio you're currently viewing, showcasing my skills and projects.",
    imageUrl: '/assets/project-placeholder-5.png',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    liveLink: 'https://portfolio-workzilla.vercel.app/',
    codeLink: 'https://github.com/kareem2099/portfolio-workzilla',
    category: 'Portfolio',
    detailedContent: `<h3>Project Overview</h3><p>This is the very portfolio website you are currently exploring! It's designed to showcase my skills, journey, and the projects I've worked on in a clean, modern, and interactive way.</p><h3>Key Features & Technologies</h3><p>Built with Next.js for server-side rendering and static site generation, ensuring optimal performance and SEO. Styled with Tailwind CSS for a utility-first approach to design. Interactive elements and animations are powered by Framer Motion. The codebase is written in TypeScript for type safety and improved developer experience. Hosted on Vercel.</p>`
  },
];

export async function generateStaticParams() {
  return placeholderProjects.map((project) => ({
    projectId: project.id,
  }));
}

// Make getProjectById async
const getProjectById = async (id: string): Promise<Project | undefined> => {
  return placeholderProjects.find(project => project.id === id);
};

import { ValidLocale } from '@/lib/localeUtils';

// Updated interface to match Next.js 15 requirements
interface ProjectDetailPageProps {
  params: Promise<{ projectId: string; locale: ValidLocale }>; // params is now a Promise
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  // Await the params Promise first
  const { projectId } = await params;
  
  // Then await the call to getProjectById
  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}

// Updated generateMetadata to handle async params
export async function generateMetadata({ params }: { params: Promise<{ projectId: string }> }): Promise<Metadata> {
  const { projectId } = await params;
  const project = await getProjectById(projectId);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}