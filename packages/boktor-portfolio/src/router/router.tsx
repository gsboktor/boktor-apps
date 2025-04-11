import { ContactPage } from '@boktor-apps/boktor-portfolio/features/contact-page';
import { HomePage } from '@boktor-apps/boktor-portfolio/features/home-page';
import { ProjectsPage } from '@boktor-apps/boktor-portfolio/features/projects-page';
import { ResumePage } from '@boktor-apps/boktor-portfolio/features/resume-page';

import { ToastContainer } from '@boktor-apps/boktor-portfolio/ui/components';
import { PersonalDetailsProvider } from '@boktor-apps/boktor-portfolio/ui/providers';

import { AnimatePresence } from 'motion/react';
import { Route, Routes, useLocation } from 'react-router';
import { Fallback } from './Fallback';

const route_title = {
  '/': 'Home',
  '/resume': 'Resume',
  '/contact': 'Contact me',
  '/projects': 'Projects',
} as Record<string, string>;

export const Router = () => {
  const location = useLocation();
  window.document.title = `George Boktor • ${route_title[location.pathname] ?? 'Whoopsie'}`;

  return (
    <AnimatePresence>
      <Routes>
        <Route
          path="/"
          element={
            <PersonalDetailsProvider>
              <HomePage />
            </PersonalDetailsProvider>
          }
        />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<Fallback />} />
      </Routes>
      <ToastContainer />
    </AnimatePresence>
  );
};
