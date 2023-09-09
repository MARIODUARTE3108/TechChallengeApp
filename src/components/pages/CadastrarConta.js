import React from 'react'
import CadastrarForm from '../forms/CadastrarForm'
import style from './geralzao.module.css'

export default function CadastrarConta() {
  return (
    <div className='container '>
       <div className={`${style.containerCadastrarConta} row`}>
            <div className={`${style.containerCadastrarContaCol} col-md-8`} >
                <div className='card'>
                    <div className='card-body'>
                            <h5 className='card-title'>Crie sua Conta</h5>
                            <p>Preencha os campos para criar sua conta de usuário</p>
                          <hr/>
                        <CadastrarForm />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
