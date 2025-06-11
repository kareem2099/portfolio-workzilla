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
  {
    id: '6',
    title: 'Premium Agency Bot Website',
    description: 'A modern, interactive single-page website for an HR agency, featuring AI technologies and Telegram bot integration for contact forms.',
    imageUrl: '/assets/project-placeholder-6.png',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Telegram Bot API'],
    liveLink: 'https://premium-agency-bot.vercel.app/',
    codeLink: 'https://github.com/kareem2099/premium-agency-bot',
    category: 'Web App / Bot Integration',
    detailedContent: `<h3>Project Overview</h3><p>This project is a comprehensive single-page website designed for a premium HR agency, showcasing their services and AI-driven recruitment technologies. It features a modern design, rich animations, and interactive elements.</p><h3>Key Features & Technologies</h3><p>The website is built using pure HTML, CSS, and JavaScript, demonstrating strong front-end development skills. It includes smooth scrolling, scroll-triggered animations, a dynamic testimonial slider, and a robust contact form with client-side validation. A unique aspect is its integration with the Telegram Bot API for form submissions. <strong>Note: The original implementation of the Telegram bot integration had a security vulnerability (exposed API token). For a production environment, this would be refactored to use a secure server-side endpoint.</strong></p>`
  },
  {
    id: '7',
    title: 'woordline',
    description: 'An e-commerce Telda project where users can buy and wood.',
    imageUrl: '/assets/project-placeholder-7.png',
    techStack: ['E-commerce', 'Telda', 'Wood'], // Placeholder tech stack
    liveLink: '#',
    codeLink: '#',
    category: 'E-commerce',
    detailedContent: `<h3>Project Overview</h3><p>Woordline is an e-commerce platform built as a Telda project, specializing in the sale of various wood products. It provides a seamless online shopping experience for users looking to purchase wood.</p><h3>Key Features</h3><ul><li><strong>Product Catalog:</strong> Browse a wide range of wood products with detailed descriptions and images.</li><li><strong>Shopping Cart:</strong> Add items to a persistent shopping cart for easy checkout.</li><li><strong>User Accounts:</strong> Manage orders and personal information through secure user accounts.</li><li><strong>Payment Integration:</strong> Integrated with Telda for secure and convenient payment processing.</li></ul><h3>Technologies Used</h3><p>The project utilizes modern web technologies to deliver a responsive and efficient e-commerce solution. Specific technologies include [Placeholder for actual technologies, e.g., React, Node.js, MongoDB, Telda API integration].</p>`
  },
  {
    id: '8',
    title: 'My Luna',
    description: 'A clothes factory e-commerce platform made by Telda, allowing users to buy and sell clothes.',
    imageUrl: '/assets/project-placeholder-8.png',
    techStack: ['E-commerce', 'Telda', 'Clothes'], // Placeholder tech stack
    liveLink: '#',
    codeLink: '#',
    category: 'E-commerce',
    detailedContent: `<h3>Project Overview</h3><p>My Luna is an innovative e-commerce platform developed as a Telda project, focusing on the buying and selling of clothing. It serves as a digital marketplace for a clothes factory, enabling users to both purchase new garments and potentially sell their own.</p><h3>Key Features</h3><ul><li><strong>Extensive Catalog:</strong> Explore a diverse collection of clothing items from the factory.</li><li><strong>Buy & Sell Functionality:</strong> Users can not only buy clothes but also list and sell their own items, fostering a dynamic community.</li><li><strong>Secure Transactions:</strong> Integrated with Telda for secure and streamlined payment processes.</li><li><strong>User Profiles:</strong> Personalized profiles for managing orders, listings, and communication.</li></ul><h3>Technologies Used</h3><p>This platform leverages modern web development practices to ensure a smooth and engaging user experience. Technologies include [Placeholder for actual technologies, e.g., Next.js, TypeScript, Tailwind CSS, Telda API, database solution].</p>`
  },
  {
    id: '9',
    title: 'Indi Company',
    description: 'An e-commerce Telda project focused on books and wood works.',
    imageUrl: '/assets/project-placeholder-9.png',
    techStack: ['E-commerce', 'Telda', 'Books', 'Wood Works'],
    liveLink: 'https://indi-company.com/',
    codeLink: 'https://github.com/kareem2099/indi-website',
    category: 'E-commerce',
    detailedContent: `<h3>Project Overview</h3><p>Indi Company is an e-commerce platform built as a Telda project, specializing in the sale of books and wood-related products. It aims to provide a unique online shopping experience for customers interested in these niche markets.</p<h3>Key Features</h3><ul><li><strong>Dual Product Categories:</strong> Offers a diverse range of products, including both books and handcrafted wood items.</li><li><strong>E-commerce Functionality:</strong> Full e-commerce capabilities for browsing, purchasing, and managing orders.</li><li><strong>Telda Integration:</strong> Seamless payment processing and financial management through Telda.</li><li><strong>User-Friendly Interface:</strong> Designed for easy navigation and a pleasant shopping experience.</li></ul><h3>Technologies Used</h3><p>The project is developed using modern web technologies to ensure a robust and scalable e-commerce solution. Specific technologies include [Placeholder for actual technologies, e.g., React, Node.js, PostgreSQL, Telda API].</p>`
  },
  {
    id: '10',
    title: 'Delivery Wood Works',
    description: 'A company interested in delivery wood works, built with Tilda.',
    imageUrl: '/assets/project-placeholder-10.png',
    techStack: ['Tilda', 'Wood Works', 'Delivery'],
    liveLink: 'https://project8612217.tilda.ws/',
    codeLink: 'https://github.com/kareem2099/website',
    category: 'Website',
    detailedContent: `<h3>Project Overview</h3><p>This project showcases a company focused on the delivery of wood works, built using the Tilda platform. It highlights their services and portfolio of wood-related projects, emphasizing their commitment to quality and timely delivery.</p><h3>Key Features</h3><ul><li><strong>Service Showcase:</strong> Detailed presentation of various wood work delivery services offered.</li><li><strong>Project Portfolio:</strong> A gallery or section dedicated to showcasing completed wood work projects.</li><li><strong>Contact & Inquiry:</strong> Easy-to-use forms for clients to request quotes or inquire about services.</li><li><strong>Responsive Design:</strong> Optimized for viewing across various devices, ensuring accessibility for all users.</li></ul><h3>Technologies Used</h3><p>The website is developed on the Tilda publishing platform, leveraging its intuitive drag-and-drop interface and pre-designed blocks to create a professional and visually appealing online presence without extensive coding. This allows for rapid development and easy content management.</p>`
  },
  {
    id: '11',
    title: 'My Luna (Custom)',
    description: 'A Telda project focused on custom clothing, made according to client wants and needs.',
    imageUrl: '/assets/project-placeholder-11.png',
    techStack: ['Tilda', 'Custom Clothing', 'E-commerce'],
    liveLink: 'https://my-luna.org/',
    codeLink: 'https://github.com/kareem2099/my-luna',
    category: 'E-commerce',
    detailedContent: `<h3>Project Overview</h3><p>My Luna (Custom) is a Telda-based e-commerce project dedicated to providing custom clothing solutions. It empowers clients to define their specific needs and preferences, ensuring that the final product perfectly matches their vision.</p><h3>Key Features</h3><ul><li><strong>Custom Order System:</strong> Allows clients to specify design, materials, and measurements for personalized clothing.</li><li><strong>Client Collaboration:</strong> Facilitates communication and feedback between the client and the production team throughout the design and manufacturing process.</li><li><strong>Online Catalog:</strong> Showcases examples of previous custom work and available materials.</li><li><strong>Telda Integration:</strong> Utilizes Telda for secure transactions and efficient order management.</li></ul><h3>Technologies Used</h3><p>Built on the Tilda platform, this project leverages its flexible design capabilities to create a visually appealing and functional website for custom clothing orders. The focus is on a streamlined user experience for both ordering and communication.</p>`
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
