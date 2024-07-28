'user client'

import navigation from "@/data/footer/page";

export default function Footer() {
  return (
    <footer className="bg-gray-100 h-[300px]">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8 h-full">
        <nav aria-label="Footer" className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12">
          {navigation.main.map((item) => (
            <div key={item.id} className="flex flex-col font-medium pb-6 text-center">
              <p className="text-md pb-2 text-gray-800">
                {item.address}
              </p>
              <p className="text-md pb-2 text-gray-800">
                {item.phone}
              </p>
              <p className="text-md pb-2 text-gray-800">
                {item.opening}
              </p>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2024 LOOKMANS, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
