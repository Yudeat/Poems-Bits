'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Threads from './component/paragraph';
import NavbarWrapper from './component/wraper'; // theme wrapper + nav
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Page = () => {
  // Animation variants
  const fadeDown: Variants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 16, mass: 1.2 } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 16, mass: 1.2 } },
  };

  return (
    <NavbarWrapper>
      {/* Main page content */}
      <main className="relative min-h-screen">
        {/* Threads background */}
        <div className="absolute inset-0 z-0">
          <Threads enableMouseInteraction color={undefined} />
        </div>

        {/* Page content */}
        <section className="relative z-10 flex flex-col items-center justify-center italic min-h-[80vh] px-4 space-y-6">
          {/* Heading */}
          <motion.h1
            className="text-5xl font-bold text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            Welcome,{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Poems Bits
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-lg text-center opacity-80 max-w-3xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.15 }}
          >
            Poems Bits is a curated collection of original poems, essays, and creative experiments —
            designed to inspire, provoke, and connect. Explore featured pieces, project case studies, and ways to get in touch.
          </motion.p>

          {/* CTA button */}
          <motion.div
            className="flex justify-center mt-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.3 }}
          >
         <SignedOut>
              <SignInButton mode="modal">
            <button className="md:hidden relative items-center justify-center rounded-lg px-4 py-2 font-medium cursor-pointer overflow-hidden transition-all duration-300 group">
              {/* Animated glowing border */}
              <span className="absolute inset-0 rounded-lg bg-[conic-gradient(from_0deg,#ff0080,#7928ca,#2af598,#ff0080)] animate-border-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]"></span>

              {/* Glow aura */}
              <span className="absolute inset-[-4px] rounded-lg bg-[conic-gradient(from_0deg,#ff0080,#7928ca,#2af598,#ff0080)] animate-border-spin opacity-0 group-hover:opacity-70 blur-[8px] transition-opacity duration-500"></span>

              {/* Inner solid background */}
              <span className="absolute inset-[2px] rounded-lg bg-white dark:bg-black"></span>

           
              <span className="relative z-10">Log In</span>
            </button>
          </SignInButton>
            </SignedOut>

            {/* User avatar when signed in */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </motion.div>
        </section>
      </main>
    </NavbarWrapper>
  );
};

export default Page;
