'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import NavbarWrapper from './component/wraper';
import Threads from './component/paragraph';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 16, mass: 1.2 } },
};

const slideDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};

const Page = () => {
  const [showWrite, setShowWrite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <NavbarWrapper>
      <main className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Threads enableMouseInteraction />
        </div>

        <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 space-y-6 pt-24">
          <SignedOut>
            <motion.h1 className="text-5xl font-bold text-center italic" variants={fadeUp} initial="hidden" animate="visible">
              Welcome,{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Poems Bits
              </span>
            </motion.h1>

            <motion.p className="text-lg text-center opacity-80 max-w-3xl italic" variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.15 }}>
              Poems Bits is a curated collection of original poems, essays, and creative experiments —
              designed to inspire, provoke, and connect.
            </motion.p>

            <motion.div className="flex justify-center mt-5" variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
              <SignInButton mode="modal">
                <button className="relative items-center justify-center rounded-lg px-4 py-2 font-medium cursor-pointer overflow-hidden transition-all duration-300 group">
                  <span className="absolute inset-[2px] rounded-lg bg-white dark:bg-black"></span>
                  <span className="relative z-10">Log In</span>
                </button>
              </SignInButton>
            </motion.div>
          </SignedOut>

          <SignedIn>
            <motion.div className="max-w-4xl mx-auto text-center space-y-4 px-4" variants={fadeUp} initial="hidden" animate="visible">
              <motion.h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold italic leading-snug">
                Welcome to the world of poetry,
              </motion.h2>
              <motion.p className="text-lg leading-relaxed">
                Choose your path,{' '}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                  read or write
                </span>
                , and be part of a community that celebrates creativity.  
                Don’t forget to support us to keep this page ad-free and thriving.
              </motion.p>
            </motion.div>
          </SignedIn>
        </section>

        <AnimatePresence>
          {showWrite && (
            <motion.section key="write-section" variants={slideDown} initial="hidden" animate="visible" exit="exit" className="relative z-10 w-full px-4 mt-10 flex justify-center">
             
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </NavbarWrapper>
  );
};

export default Page;
