import React, { useState } from 'react'
import NomeDoCss from './forms.module.css'
import { useForm, Controller } from 'react-hook-form';
import emailValidation from '../../validations/email-validation';
import passwordValidation from '../../validations/password-validation';
import * as services from '../../services/account-services';
import * as helper from '../../helpers/auth-helper';

export default function LoginForm() {

  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const {
    control,
    handleSubmit,
    formState: {
      errors
    },
    reset
  } = useForm();



  const onSubmit = (data) => {
    console.log('Dados do formulário:', data);
    services.postLogin(data)
      .then(
        result => {
          helper.signIn(result);
          window.location = '/inicio';
        }
      )
      .catch(
        e => {
          console.log(e.response);

          switch (e.response.status) {

            case 401:
              setMensagemErro(e.response.data);
              break;

            default:
              setMensagemErro('Operação não pode ser realizada');
              break;
          }
        }
      )
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} >

      {mensagemSucesso && <div className='alert alert-sucess'> <strong> Sucesso! </strong> {mensagemSucesso} </div>}
      {mensagemErro && <div className='alert alert-danger'> <strong> Erro! </strong> {mensagemErro} </div>}

      <div className='mb-3'>

        <label><strong>Email:</strong> </label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="email"
              className="form-control"
              {...field}
            />
          )}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
      </div>
      <div className='mb-3'>
        <label><strong>Senha:</strong> </label>
        <Controller
          name="senha"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="password"
              className="form-control"
              {...field}
            />
          )}
        />
        {errors.senha && <p className="error-text">{errors.senha.message}</p>}
      </div>
      <div className={`${NomeDoCss.submit} mb-3`}>
        <div className='d-grid'>
          <input type='submit' className='btn btn-dark' value='Acessar Projeto' />
        </div>
      </div>
    </form>
  )
}
