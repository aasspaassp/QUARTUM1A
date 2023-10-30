export default function Filterbar({filterFunction}) {

 

      const handleChangeVenta = () => {
        filterFunction(prevState => ({
          ...prevState,
          renta: false,
          venta:true
        }))
      }
    
      const handleChangeTodo = () => {
        filterFunction(prevState => ({
          ...prevState,
          renta: true,
          venta:true
        }))
      }
    
    
        
      const handleChangeRenta = () => {
        filterFunction(prevState => ({
          ...prevState,
          renta: true,
          venta: false
        }))
      }
    return (
        <>
            <div className="border-b border-gray-900/10 pb-12">

                <div className="mt-10 space-y-10">
                    <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">Tipo:</legend>
                        <div className="mt-6 space-y-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="todo"
                                        name="tipo"
                                        type="radio"
                                        onChange={handleChangeTodo}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        defaultChecked
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="todo" className="font-medium text-gray-900">
                                        Todo
                                    </label>
                                </div>
                            </div>
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="venta"
                                        name="tipo"
                                        type="radio"
                                        onChange={handleChangeVenta}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="venta" className="font-medium text-gray-900">
                                        Venta
                                    </label>
                                </div>
                            </div>
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="renta"
                                        name="tipo"
                                        type="radio"
                                        onChange={handleChangeRenta}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="renta" className="font-medium text-gray-900">
                                        Renta
                                    </label>
        
                                </div>
                            </div>
                        </div>
                    </fieldset>
                  
                </div>
            </div>
        </>
    )
}