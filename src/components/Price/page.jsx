'use client';

import prices from "@/data/price/page";
  
export default function Price() {
  return (
    <div id="price" className="bg-slate-50 py-32 sm:pb-64">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center pb-32">LOOKMANS PRICE</h2>
        <div className="mx-auto flex max-w-2xl flex-col gap-32 lg:mx-0 lg:max-w-none lg:flex-row">
          <div className="w-full lg:max-w-lg lg:flex-auto">
            <img
              alt="price image"
              src="/images/price.png"
              className="w-full rounded-2xl bg-gray-50"
            />
          </div>
          <div className="w-full lg:max-w-lg lg:flex-auto">

          <div className="flex flex-col h-full">
            {prices.map((post, index) => (
              <article
                key={post.id}
                className={`flex max-w-xl flex-col justify-center items-start py-9 ${
                  index === prices.length - 1 ? 'border-t border-b border-gray-200' : 'border-t border-gray-200'
                }`}
              >
                <div className="flex items-center gap-x-4 text-sm text-gray-900">
                  {post.type}
                </div>
                <div className="flex justify-between w-full">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    {post.subType}
                  </h3>
                  <p className="mt-3 text-sm font-bold text-indigo-800">{post.price}</p>
                </div>
                {post.id === 2 && (
                  <>
                    <div className="flex justify-between w-full">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        {post.subType01}
                      </h3>
                      <p className="mt-3 text-sm font-bold text-indigo-800">{post.price01}</p>
                    </div>
                    <div className="flex justify-between w-full">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        {post.subType02}
                      </h3>
                      <p className="mt-3 text-sm font-bold text-blue-800">{post.price02}</p>
                    </div>
                  </>
                )}
              </article>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
