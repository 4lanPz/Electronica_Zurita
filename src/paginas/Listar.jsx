import React from 'react'
import Tabla from '../componets/Tabla'

const Listar = () => {

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Listado de clientes</h1>
            <hr className='my-4' />
            <Tabla/>
        </div>
    )
}

export default Listar