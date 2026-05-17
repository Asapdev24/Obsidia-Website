'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NewtonsCradleLoader from './NewtonsCradleLoader';

const SESSION_KEY = 'obsidia_loaded';

export default function PageLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const already = sessionStorage.getItem(SESSION_KEY);
    if (already) return;

    setVisible(true);

    const hide = () => {
      sessionStorage.setItem(SESSION_KEY, '1');
      setVisible(false);
    };

    if (document.readyState === 'complete') {
      const t = setTimeout(hide, 600);
      return () => clearTimeout(t);
    }

    window.addEventListener('load', hide, { once: true });
    return () => window.removeEventListener('load', hide);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#FBFBFE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden
        >
          <NewtonsCradleLoader />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
