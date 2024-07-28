import timeline from '@/data/contact/page'
import { IoMdPhonePortrait } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaRegCalendarAlt } from 'react-icons/fa'

export default function Contact() {
  return (
    <div id="contact" className="bg-white pt-64 pb-32 sm:pt-32 sm:py-32">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center pb-12">
        LOOKMANS CONTACT
      </h2>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-32">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {timeline.map((item) => (
            <div key={item.id}>
              <time
                dateTime={item.dateTime}
                className="flex items-center text-sm font-semibold leading-6 text-indigo-600"
              >
                <svg
                  viewBox="0 0 4 4"
                  aria-hidden="true"
                  className="mr-4 h-1 w-1 flex-none"
                >
                  <circle r={2} cx={2} cy={2} fill="currentColor" />
                </svg>
                {item.title}
                <div
                  aria-hidden="true"
                  className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                />
              </time>
              {item.id === 1 && (
                <>
                  <div className="flex items-center mt-6">
                    <IoMdPhonePortrait className="w-6 h-6 ml-4 bg-white" />
                    <p className="text-lg font-semibold leading-8 tracking-tight text-gray-900 pl-6">
                      {item.phone}
                    </p>
                  </div>
                  <div className="flex items-center mt-6 ml-4">
                    <MdEmail className="w-6 h-6" />
                    <p className="text-lg font-semibold leading-8 tracking-tight text-gray-900 pl-6">
                      {item.email}
                    </p>
                  </div>
                </>
              )}
              {item.id === 2 && (
                <div className="flex mt-6">
                  <FaMapMarkerAlt className="w-6 h-7 ml-4" />
                  <p className="text-lg font-semibold leading-8 tracking-tight text-gray-900 pl-6">
                    {item.address}
                  </p>
                </div>
              )}
              {item.id === 3 && (
                <>
                  <div className="flex items-center mt-6">
                    <FaRegCalendarAlt className="w-6 h-6 ml-4" />
                    <p className="text-lg font-semibold leading-8 tracking-tight text-gray-900 pl-6">
                      {item.opening}
                    </p>
                  </div>
                  <div className="flex items-center mt-6">
                    <img src="/images/dayoff.png" className="w-6 h-6 ml-4" />
                    <p className="text-lg font-semibold leading-8 tracking-tight text-gray-900 pl-6">
                      {item.dayOff}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
