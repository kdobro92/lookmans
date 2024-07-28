'use client'

import { useRef } from 'react';
import { useTypewriterEffect } from "@/hooks/useTypewriterEffect"
import { useImageAnimation } from "@/hooks/useImageAnimation"

export default function Main() {
  const typewriterRef = useRef(null);
  useTypewriterEffect(typewriterRef);
  const { imageRefs } = useImageAnimation();

  return (
  <div className="bg-white pt-12 pb-[200px]">
   <div className="mt-32 overflow-hidden sm:mt-40">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 ref={typewriterRef} className="typewriter-text w-full">LOOKMANS HAIR</h2>
              <p className="mt-6 text-xl leading-8 text-gray-600">
                남자머리에 디테일을 더하다 
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600">
              왕십리 남성전문미용실
              룩맨즈헤어는 오직 남성만을 위한 프리미엄<br />
              맨즈헤어샵 입니다.<br />
              간편한 손질 살아있는 질감을 원하신다면 방문해주세요
            </p>
          </div>
          <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <img
                  ref={(el) => (imageRefs.current[0] = el)}  
                  alt="background01"
                  src="/images/bg01.jpg"
                  className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
              />
            </div>
            <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
              <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                  <img
                    ref={(el) => (imageRefs.current[1] = el)} 
                    alt="background02"
                    src="/images/bg03.jpg"
                    className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
              <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <img
                    ref={(el) => (imageRefs.current[2] = el)}  
                    alt="background03"
                    src="/images/bg02.jpg"
                    className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}