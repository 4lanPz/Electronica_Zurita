import React from 'react'
import Tabla from '../componets/Tabla'

const Listar = () => {

    return (
        <div>
            <h1 className='poppins-bold text-center font-black text-4xl text-black'>Listado de clientes</h1>
            <hr className='my-4' />
            <Tabla/>
        </div>
    )
}

export default Listar