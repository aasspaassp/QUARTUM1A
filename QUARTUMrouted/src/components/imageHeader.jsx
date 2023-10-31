import { Link } from 'react-router-dom'

export default function ImageHeader() {
    return (
        <div className="relative isolate bg-gray-900 py-24 sm:py-32">
            <img
                src="https://drive.google.com/uc?export=view&id=1TH1qX59Y6uzhLWrqQGOnP6dSL1GCTa5w"
                alt="lala"
                className="absolute inset-0 -z-10 min-h-fit w-full  md:object-center invert-[.12] sepia-[.7] saturate-[28.82] hue-rotate-[248deg] brightness-[.91] contrast-[.98]"
            />
           
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">Work with us</h2>
                    <p className="mt-6 text-lg leading-8 text-black-300">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                        fugiat veniam occaecat fugiat aliqua.
                    </p>
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
        </div>
    )
}
