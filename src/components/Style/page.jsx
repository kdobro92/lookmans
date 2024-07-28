'use client';

import styles from "@/data/style/page"
import { BsScissors } from "react-icons/bs";
import { PiDotFill } from "react-icons/pi";

export default function Style() {  

  return (
    <div id="styles" className="bg-white py-32 sm:py-64">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
        <div className="flex flex-col justify-center items-center mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-12">LOOKMANS STYLES</h2>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 place-items-center grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {styles.map((person) => (
            <li key={person.id} className={`w-72 h-96 items-center ${ person.popular ? 'relative max-w-xs mx-auto' : ''}`}>
              <img alt="customer images" src={person.imageUrl} className={`aspect-[3/3] w-full rounded-2xl object-cover border-4 
              ${ person.popular ? 'border-pink-500' : 'border-none'}`} />
                {person.popular && (
                  <div className="absolute top-4 right-4 bg-white bg-opacity-75 text-sm font-semibold px-2 py-1 rounded-lg border-2 border-pink-500 text-pink-500">
                    대표
                  </div>
                )}
              <div className="flex items-center w-full">
                <BsScissors className="w-6 h-6 mr-4 mt-4"/>
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
              </div>
              <div className="flex items-center mt-4">
                <PiDotFill className="w-6 h-6 mr-4"/>
                <p className="text-base leading-7 text-gray-600">{person.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
  