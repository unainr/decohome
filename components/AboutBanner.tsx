import React from 'react'

const AboutBanner = ({bannertitle , bannertext}:{bannertitle:string,bannertext:string}) => {
  return (
    <div className="relative">
  <img
    src="/images/2.jpg"
    className="absolute inset-0 object-cover w-full h-full"
    alt=""
  />
  <div className="relative bg-opacity-75 py-20 bg-gradient-to-r from-deep-purple-accent-700 to-purple-800">
    <svg
      className="absolute inset-x-0 bottom-0 text-white"
      viewBox="0 0 1160 163"
    >
      <path
        fill="currentColor"
        d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
      />
    </svg>
    <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-xl mb-12 text-center">
          <h2 className="max-w-lg mb-6 font-sans text-4xl font-bold tracking-tight text-white sm:text-5xl sm:leading-tight">
          {bannertitle}
          </h2>
          <p className="max-w-xl mb-6 text-lg text-gray-200 md:text-xl">
            {bannertext}
          </p>
         
        </div>
      </div>
    </div>
  </div>
</div>

  
  )
}

export default AboutBanner