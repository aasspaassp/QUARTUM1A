export default function TipoDePropiedad({filterFunction}) {
 

  const handleChangeCategoria = (event) => {
    filterFunction(prevState => ({
      ...prevState,
    categoria: event.target.value
    }))
  }

  return (
    <>
    <div className="flex flex-col">
    <label for="categorias" className=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Seleccione una categoría:</label><select id="categorias" onChange={handleChangeCategoria} className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
      <option selected value="todo">Todo</option>
      <option value="Casa">Casas</option>
      <option value="Departamento">Departamentos</option>
      <option value="Oficina">Oficinas</option>
      <option value="Lote residencial">Lotes residenciales</option>
      <option value="Lote de inversión">Lotes de inversión</option>
      <option value="Local comercial">Locales comerciales</option>
      <option value="Consultorio">Consultorios</option>
    </select>
    </div>
    </>
  )
}
