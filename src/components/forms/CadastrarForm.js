import React, { useState } from 'react';
import NomeDoCss from './forms.module.css'
import { useForm, Controller } from 'react-hook-form';
import * as services from '../../services/account-services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import emailValidation from '../../validations/email-validation';
// se tu quiser usar isso aqui tem q implementar meu querido, essa é mais ou menos a estrutura do código, ai tu joga la no campo q nem eu coloquei la
//{emailValidation !== true && (
//     <div className="error-message" style={{color:'red'}}>{emailValidation(aqui a variavel que armazena o valor q o usuário digita)}</div>
// )}

import passwordValidation from '../../validations/password-validation';
import textValidation from '../../validations/text-validation';

export default function CadastrarForm() {
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmacaoSenha, setMostrarConfirmacaoSenha] = useState(false);

    const {
        control,
        handleSubmit,
        formState: {
            errors,
        },
        reset
    } = useForm();

    const onSubmit = (data) => {
        setMensagemSucesso('');
        setMensagemErro('');
        console.log(data)
        services.postUsuario(data)
            .then(    //retorno sucesso
                result => {
                    console.log('erro', result)
                    setMensagemSucesso(result.message);
                    console.log(result.message)
                    reset({
                        nome: '',
                        email: '',
                        senha: '',
                        senhaconfirmacao: ''
                    })
                }
            )
            .catch(      // retorno erro
                e => {
                    switch (e.response.status) {
                        case 400:
                            if (e.response.data.errors.Senha) {
                                setMensagemErro(e.response.data.errors.Senha[0]);
                            }
                            if (e.response.data.errors.Nome) {
                                setMensagemErro(e.response.data.errors.Nome[0]);
                            }
                            if (e.response.data.errors.SenhaConfirmacao) {
                                setMensagemErro(e.response.data.errors.SenhaConfirmacao[0]);
                            }
                            if (e.response.data.errors.Email) {
                                setMensagemErro(e.response.data.errors.Email[0]);
                            }
                            break;

                        case 422:
                            setMensagemErro(e.response.data)
                            break;

                        case 500:
                            setMensagemErro(e.response.data.message)
                            break;

                        default:
                            setMensagemErro('Não foi possível realizar a operação.');
                            break;
                    }
                }
            )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={NomeDoCss.container}>
            {mensagemSucesso && <div className='alert alert-success'> <strong> Sucesso! </strong> {mensagemSucesso} </div>}
            {mensagemErro && <div className='alert alert-danger'> <strong> Erro! </strong> {mensagemErro} </div>}

            <div className='row mb-3'>
                <div className='col-md-6'>
                    <label><strong>Nome de Usuário:</strong></label>
                    <Controller
                        control={control}
                        name='nome'
                        defaultValue=''
                        rules={{}}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <input type='text' id='nome' placeholder='Digite aqui seu nome ' className='form-control' onChange={onChange} onBlur={onBlur} value={value} />
                        )}
                    />
                    {errors.nome && <div className='text-danger'> {errors.nome.message} </div>}
                </div>


                <div className='col-md-6'>
                    <label><strong>E-mail:</strong> </label>
                    <Controller control={control} name='email' defaultValue='' rules={{}}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <input type='email' placeholder='Digite aqui seu e-mail' className='form-control' onChange={onChange} onBlur={onBlur} value={value} />
                        )}
                    />
                    {/* {emailValidation !== true && (
                            <div className="error-message" style={{color:'red'}}>{emailValidation(aqui a variavel que armazena o valor q o usuário digita)}</div>
                    )} */}
                    {errors.email && <div className='text-danger'> {errors.email.message} </div>}
                </div>
            </div>



            <div className='row mb-3'>
                <div className='col-md-6'>
                    <label><strong>Senha:</strong></label>
                    <div className='input-group'>
                        <Controller control={control} name='senha' defaultValue='' rules={{}}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <input
                                    type={mostrarSenha ? 'text' : 'password'}
                                    id='senha'
                                    placeholder='Digite aqui sua senha'
                                    className='form-control'
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                        />
                        <div className='input-group-append'>
                            <button
                                type='button'
                                className='btn btn-outline-secondary'
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                            >
                                {/* no lugar de esconder e mostrar da pra jogar um icone tbm */}
                                {mostrarSenha ? 'Esconder' : 'Mostrar'}
                            </button>
                        </div>
                    </div>
                    {errors.senha && <div className='text-danger'> {errors.senha.message} </div>}
                </div>

                <div className='col-md-6'>
                    <label>Confirmação Senha:</label>
                    <div className='input-group'>
                        <Controller control={control} name='senhaconfirmacao' defaultValue='' rules={{}}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <input
                                    type={mostrarConfirmacaoSenha ? 'text' : 'password'}
                                    id='senhaconfirmacao'
                                    placeholder='Digite aqui sua confirmação'
                                    className='form-control'
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                        />
                        <div className='input-group-append'>
                            <button
                                type='button'
                                className='btn btn-outline-secondary'
                                onClick={() => setMostrarConfirmacaoSenha(!mostrarConfirmacaoSenha)}
                            >
                                {/* no lugar de esconder e mostrar da pra jogar um texto tbm */}
                                <FontAwesomeIcon icon={mostrarConfirmacaoSenha ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </div>
                    {errors.senhaconfirmacao && <div className='text-danger'> {errors.senhaconfirmacao.message} </div>}
                </div>
            </div>

            <div >

                <input type='submit' value='Realizar Cadastro' className={`${NomeDoCss.submit} btn btn-success`} />

            </div>
        </form>
    )
}
