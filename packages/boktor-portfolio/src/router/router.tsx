import { ContactPage } from '@boktor-apps/boktor-portfolio/features/contact-page';
import { HomePage } from '@boktor-apps/boktor-portfolio/features/home-page';
import { ResumePage } from '@boktor-apps/boktor-portfolio/features/resume-page';
import { ToastContainer } from '@boktor-apps/boktor-portfolio/ui/components';
import { PersonalDetailsProvider } from '@boktor-apps/boktor-portfolio/ui/providers';

import { AnimatePresence } from 'motion/react';
import { Route, Routes, useLocation } from 'react-router';
const p = {
  '/': 'Home',
  '/resume': 'Resume',
  '/contact': 'Contact me',
} as Record<string, string>;
export const Router = () => {
  const location = useLocation();
  window.document.title = `George Boktor • ${p[location.pathname]}`;

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
      </Routes>
      <ToastContainer />
    </AnimatePresence>
  );
};
