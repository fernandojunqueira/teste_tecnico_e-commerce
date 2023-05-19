import { useState } from "react"
import { Modal } from "./components/Modal/modal"
import { TableRead } from "./components/Table/table"

export const App = () => {
  const [file, setFile] = useState("")
  console.log(file)
  return (
    <>
    <div>
      <form >
        <input formEncType="multipart/form-data" type="file" className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100" 
          onBlur={(e) => setFile(e.target.value)}/>
        <button type="submit">Enviar</button>
      </form>
        <Modal file={file}/>
      <TableRead/>

    </div>
    </>
  )
}

