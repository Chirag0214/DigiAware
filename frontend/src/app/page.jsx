import Navbar from '@/components/Navbar';
import Link from 'next/link';
import React from 'react';
import { FaLock, FaShieldAlt, FaSyncAlt, FaUserShield, FaCloudUploadAlt, FaExclamationTriangle } from 'react-icons/fa';

const cyberTips = [
  { icon: <FaLock className="text-cyan-400 text-3xl mb-2" />, tip: 'Use strong, unique passwords for each account.' },
  { icon: <FaShieldAlt className="text-cyan-400 text-3xl mb-2" />, tip: 'Enable two-factor authentication wherever possible.' },
  { icon: <FaExclamationTriangle className="text-cyan-400 text-3xl mb-2" />, tip: 'Be cautious of suspicious emails and links.' },
  { icon: <FaSyncAlt className="text-cyan-400 text-3xl mb-2" />, tip: 'Keep your software and devices updated.' },
  { icon: <FaCloudUploadAlt className="text-cyan-400 text-3xl mb-2" />, tip: 'Regularly back up important data.' },
  { icon: <FaUserShield className="text-cyan-400 text-3xl mb-2" />, tip: 'Educate yourself and others about common cyber threats.' }
];

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-cyan-900 min-h-screen">
      <Navbar />
      <main>
        {/* Split Hero Section */}
        <section className="flex flex-col md:flex-row h-[70vh] w-full">
          <div className="md:w-1/2 w-full h-[40vh] md:h-full relative">
            <img
              src="/cyber 1st.jpg"
              alt="CYBER Background"
              className="w-full h-full object-cover rounded-r-3xl shadow-xl"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col justify-center items-center px-8 py-12 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-cyan-400 mb-4 drop-shadow-lg">
              Digi Aware
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-medium mb-8">
              Empowering you to stay safe and smart in the digital world.
            </p>
            <Link href="/users/news">
              <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
                Explore Latest Cyber News
              </button>
            </Link>
          </div>
        </section>

        {/* Cyber Awareness Section with Cards */}
        <section className="py-16 px-4 bg-black/80 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">Stay Digi Aware</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
            Protect yourself online with these essential tips and resources. Cybersecurity is everyone's responsibility!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {cyberTips.map((item, idx) => (
              <div key={idx} className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-cyan-700 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                {item.icon}
                <span className="text-cyan-300 font-semibold mb-2">Tip {idx + 1}</span>
                <p className="text-gray-200">{item.tip}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/contact">
              <button className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-800 hover:to-blue-900 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300">
                Need Help? Contact Us
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;