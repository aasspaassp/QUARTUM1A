import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Header() {

  return (
    <div className="bg-white">
      <div className="relative px-6 lg:px-2">
        <div className="mx-auto max-w-4xl py-4 sm:py-48 lg:py-7">
        <img
          src="./public/Página principal Quartum.jpg"
          alt="header"
          className="mb-6"
        />
          <div className="text-center">
            <h1 className="text-1xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Propiedades seguras en las mejores zonas de Mérida.
            </h1>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/propiedades"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Encuentra tu propiedad
              </Link>
    
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
        </div>
      </div>
    </div>
  )
}
