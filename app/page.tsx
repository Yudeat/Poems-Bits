'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import NavbarWrapper from './component/wraper';
import Threads from './component/paragraph';
import GlassIcons from './component/GlassIcons';
import { FiFileText, FiBook, FiHeart,  FiEdit, FiBarChart2 } from "react-icons/fi";

const items = [
  { icon: <FiFileText />, color: 'blue', label: 'Yours Files' },
  { icon: <FiBook />, color: 'purple', label: 'Books' },
  { icon: <FiHeart />, color: 'red', label: 'Favourite' },
  { icon: <FiEdit />, color: 'orange', label: 'Notes' },
  { icon: <FiBarChart2 />, color: 'green', label: 'Stats' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 16, mass: 1.2 } },
};

const Page = () => {
  return (
    <NavbarWrapper>
      <main className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Threads enableMouseInteraction />
        </div>

        <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 space-y-6">

{/* before signout */}
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
                  <span className="absolute inset-0 rounded-lg bg-[conic-gradient(from_0deg,#ff0080,#7928ca,#2af598,#ff0080)] animate-border-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]"></span>
                  <span className="absolute inset-[-4px] rounded-lg bg-[conic-gradient(from_0deg,#ff0080,#7928ca,#2af598,#ff0080)] animate-border-spin opacity-0 group-hover:opacity-70 blur-[8px] transition-opacity duration-500"></span>
                  <span className="absolute inset-[2px] rounded-lg bg-white dark:bg-black"></span>
                  <span className="relative z-10">Log In</span>
                </button>
              </SignInButton>
            </motion.div>
          </SignedOut>

{/* after sign in */}
          <SignedIn>

            <motion.h4
              className="text-xl font-bold text-center italic"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              Here you can read and Write Poems ,{' '}
              <span className="bg-gradient-to-r from-red-400 via-blue-500 to-white bg-clip-text text-transparent">
               Select what you wanna do,Don&apos;t Forgot to Donate a Amount to Run this page Ad Free.
              </span>
            </motion.h4>
            <div style={{ height: "200px", position: "relative" }}>
              <GlassIcons items={items} className="custom-class" />
            </div>
          </SignedIn>

        </section>
      </main>
    </NavbarWrapper>
  );
};

export default Page;
