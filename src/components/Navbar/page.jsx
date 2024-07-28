'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  PopoverGroup,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { IoLogoInstagram } from '../../../public/icons/page';
import Links from '../../lib/links';

export default function Navbar({ setScrollTo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white w-full fixed top-0 left-0 text-white py-2 z-50 shadow-navbar-light">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1 items-center">
          <a href="#" className="-m-1.5 p-1.5">
            <img className="w-7 h-7" src="/images/logo.jpg" />
          </a>
          <a href="#" className="pl-4 text-2xl text-black font-bold">LOOKMANS</a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
       <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <div className="flex items-center gap-x-1 text-lg lg:flex lg:gap-x-12 font-semibold leading-6 text-gray-900">
              <a className="border-0 text-gray-900 cursor-pointer" onClick={() => setScrollTo('about')}>ABOUT</a>
              <a className="border-0 text-gray-900 cursor-pointer" onClick={() => setScrollTo('styles')}>STYLES</a>
              <a className="border-0 text-gray-900 cursor-pointer" onClick={() => setScrollTo('price')}>PRICE</a>
            <a className="border-0 text-gray-900 cursor-pointer" onClick={() => setScrollTo('contact')}>CONTACT</a>
          </div>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href={Links.instagram} className="text-sm font-semibold leading-6 text-gray-900 pr-4">
            <img src="/images/instagram.jpg" className="w-8 h-8" />
          </a>
          <a href={Links.naverBlog} className="text-sm font-semibold leading-6 text-gray-900 pr-4">
            <img src="/images/blog.png" className="w-8 h-8" />
          </a>
          <a href={Links.naverReserve} className="text-sm font-semibold leading-6 text-gray-900 pr-4">
            <img src="/images/naver.jpg" className="w-8 h-8 rounded-md" />
          </a>
           <a href={Links.facebook} className="text-sm font-semibold leading-6 text-gray-900">
            <img src="/images/facebook.png" className="w-8 h-8 rounded-md" />
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">LOOKMANS</span>
              <img
                alt=""
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3 mt-5">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    About
                  </DisclosureButton>
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Styles
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Price
                </a>

                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Contact
                  </DisclosureButton>                 
                </Disclosure>
              </div>
              <div className="py-6">
                <a href={Links.instagram} className="text-sm font-semibold leading-6 text-gray-900 pr-4">
                  <IoLogoInstagram className="w-10 h-10" />
                </a>
                <a href={Links.naverBlog} className="text-sm font-semibold leading-6 text-gray-900 pr-4">
                  <img src="/images/blog.jpg" className="w-10 h-10" />
                </a>
                <a href={Links.naverReserve} className="text-sm font-semibold leading-6 text-gray-900 pr-4">
                  <img src="/images/naver1.jpg" className="w-10 h-10 rounded-md" />
                </a>
                <a href={Links.facebook} className="text-sm font-semibold leading-6 text-gray-900">
                  <img src="/images/facebook.png" className="w-10 h-10 rounded-md" />
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
