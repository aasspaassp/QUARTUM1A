import { Link } from 'react-router-dom'
import headerImage from '../../public/Página principal Quartum.jpg'

export default function Header() {

  headerText='Ofrecemos asesoría inmobiliaria personalizada y certeza jurídica'

  return (
    <div className="bg-white">
      <div className="relative px-4 lg:px-2">
        <div className="mx-auto max-w-4xl py-4 sm:py-48 lg:py-7">
        <img
          src={headerImage}
          alt="header"
          className="mb-6"
        />
          <div className="text-center">
            <h1 className="text-1xl font-bold tracking-tight px-10 text-gray-900 sm:text-6xl">
           {headerText}
            </h1>

            <div className="mt-10 flex items-center px-10 justify-center gap-x-6">
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
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      </div>

    </div>
  )
}
