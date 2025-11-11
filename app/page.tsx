'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import NavbarWrapper from './component/wraper';
import Threads from './component/paragraph';
import Write from './component/Write';

interface Props {
  theme: 'light' | 'dark';
}

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 16, mass: 1.2 } },
};

const slideDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};

const Page = ({ theme }: Props) => {
  const [showWrite, setShowWrite] = useState(false);

  return (
    <NavbarWrapper>
      <main className="relative min-h-screen">
        {/* Background Threads */}
        <div className="absolute inset-0 z-0">
          <Threads enableMouseInteraction />
        </div>

        {/* First Page / Welcome Section */}
        <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 space-y-6 pt-24">
          <SignedOut>
            <motion.h1
              className="text-5xl font-bold text-center italic"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              Welcome,{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Poems Bits
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-center opacity-80 max-w-3xl italic"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
            >
              Poems Bits is a curated collection of original poems, essays, and creative experiments —
              designed to inspire, provoke, and connect.
            </motion.p>

            <motion.div
              className="flex justify-center mt-5"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <SignInButton mode="modal">
                <button className="relative items-center justify-center rounded-lg px-4 py-2 font-medium cursor-pointer overflow-hidden transition-all duration-300 group">
                  <span className="absolute inset-[2px] rounded-lg bg-white dark:bg-black"></span>
                  <span className="relative z-10">Log In</span>
                </button>
              </SignInButton>
            </motion.div>
          </SignedOut>

          <SignedIn>
            <motion.h4
              className="text-xl font-bold text-center italic"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              Here you can read and Write Poems,{' '}
              <span className="bg-gradient-to-r from-red-400 via-blue-500 to-white bg-clip-text text-transparent">
                Select what you want to do. Don&apos;t forget to donate to run this page ad-free.
              </span>
            </motion.h4>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={() => setShowWrite(!showWrite)}
                className="md:inline-flex border-0 mb-4 mr-3 rounded-4xl px-4 py-2 font-medium cursor-pointer transition-all duration-300 relative group"
                style={{
                  backgroundColor: theme === 'light' ? '#111' : '#fff',
                  color: theme === 'light' ? '#fff' : '#000',
                }}
              >
                <span className="relative z-10">Write Poems</span>
              </motion.button>

            </div>
          </SignedIn>
        </section>

        {/* Write Section Below Buttons */}
       <AnimatePresence>
  {showWrite && (
    <motion.section
      key="write-section"
      variants={slideDown}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`relative z-10 w-full px-4 mt-10 flex justify-center`}
    >
      <Write theme={theme} />
    </motion.section>
  )}
</AnimatePresence>
      </main>
    </NavbarWrapper>
  );
};

export default Page;
