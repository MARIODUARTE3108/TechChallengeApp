import React from 'react';
import LoginForm from '../forms/LoginForm';
import style from './geralzao.module.css'

export default function AcessarConta() {
  return (
    <div >
       <div className={`${style.containerAcessarConta} row`}>
            <div className={`${style.containerAcessarContaCol} col-md-3`}>
                <div className='card'>
                    <div className='card-body'>
                        <div className='text-center'>
                            <h5 className='card-title mb-3' style={{fontSize: '30px'}}>Acessar Blog</h5>
                                         
                        </div>
                        <hr/> 
                        <LoginForm />

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
