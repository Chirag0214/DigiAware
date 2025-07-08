import Navbar from '@/components/Navbar';
import Link from 'next/link';
import React from 'react'

const Home = () => {
  return (
    <div className='bg-black'>
      <Navbar/>
      <div className='bg- bg-black'>
        <main>
          {/* Hero */}
          <section className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/cyber 1st.jpg"
                alt="CYBER Background"
                className="w-full h-120 object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative h-full flex flex-col items-center justify-center px-4 text-center z-10">

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fadeIn">
                <span className="italic">Digi Aware</span>
              </h1>

              <p className="text-xl md:text-2xl text-white font-medium max-w-2xl mb-10">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis?
              </p>
            </div>
          </section>
          {/* Hero end */}






        </main>


      </div>
    </div>
  )
}

export default Home;