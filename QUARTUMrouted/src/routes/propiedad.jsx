import { lazy } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'

export async function loader({ params }) {
  const response = await fetch(`api/${params.propiedadId}`);
  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }
  const propiedad = await response.json();
  console.log('respuesta servidor', propiedad)
  return { propiedad }

}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const breadcrumbs = [
  { id: 1, name: 'Quartum', href: '#' },
  { id: 2, name: 'Propiedades', href: '#' },
]
const reviews = { href: '#', average: 4, totalCount: 117 }


export default function Propiedad() {


  const { propiedad } = useLoaderData();
  console.log(propiedad);

  const fotos = propiedad.Fotos.map((foto) =>
    <div key={foto}>
      <img
        src={`https://drive.google.com/uc?export=view&id=${foto.slice(foto.indexOf("d/") + 2, foto.indexOf("/view"))}` || null}
        alt="foto propiedad"
        loading="lazy"
        className="h-full w-full object-cover object-center"
      />
    </div>
  )

  return (


    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={propiedad.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {propiedad.MainAddress}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            {fotos[0]}
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            {fotos[1]}
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            {fotos[2]}
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          {fotos[0]}
          </div>
        </div>

        {/* propiedad info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{propiedad.MainAddress}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">propiedad information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{new Intl.NumberFormat('mx-MX', { style: 'currency', currency: 'MXN' }).format(Number.parseFloat(propiedad.Precio))}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
              <p>Calificación:</p>
                <div className="flex items-center">
                
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
    
                <p className="sr-only">{reviews.average}</p>
        
              </div>
            </div>

            {/* <form className="mt-10">
           
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {propiedad.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form> */}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Descripción:</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{propiedad.ShortDescription}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Amenidades:</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {propiedad.Amenidades.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Zona</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{propiedad.Zona}</p>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Metros cuadrados:</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{propiedad.MetrosConstruccion}m²</p>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Recámaras:</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{propiedad.Recamaras}</p>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Niveles:</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{propiedad.Niveles}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  {/*  <div id="propiedad">
        <div>{fotos}</div>
        <div>
          <h1>
            {propiedad.MainAddress}
            <Favorite propiedad={propiedad} />
          </h1>
  
          {propiedad.Coordinates && (
            <p>
              <a
                target="_blank"
                href={`https://www.google.com/maps/@${propiedad.Coordinates[0]},${propiedad.Coordinates[1]},15z?entry=ttu`}
              >
                Ubicación
              </a>
            </p>
          )}
  
          {propiedad.Precio && <p>{propiedad.Precio}</p>}
  
          <div>
            <Form action="edit">
              <button type="submit">Edit</button>
            </Form>
            <Form
              method="post"
              action="destroy"
              onSubmit={(event) => {
                if (
                  !confirm(
                    "Please confirm you want to delete this record."
                  )
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        </div>
            </div> */}


}

function Favorite({ propiedad }) {
  // yes, this is a `let` for later
  let favorite = propiedad.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}