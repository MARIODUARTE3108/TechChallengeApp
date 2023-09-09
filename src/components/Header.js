import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import * as helpers from '../helpers/auth-helper';

import style from './components.module.css'

export default function Header() {

    const [idUsuario, setIdUsuario] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [autenticado, setAutenticado] = useState(false);

    useEffect(() => {
        if (helpers.isLoggedIn()) {
            setAutenticado(true);
            setNomeUsuario(helpers.getNomeUsuario());
        }
    }, []);

    const sair = () => {
        if (window.confirm('Deseja realmente sair do sistema?')) {
            helpers.signOut();
            window.location.href = '/';
        }
    }

    return (
        <nav className=" navbar-expand-lg navbar-dark bg-dark">
            <div className={style.container}>
                <div className={style.projetoNome}>
                    <a className={`${style.proj} navbar-brand d-none d-sm-block`}>PROJETO TECH CHALLENGE - FIAP</a>
                    <a className={`${style.proj} navbar-brand d-block d-sm-none`}>FIAP</a>
                </div>
                <div className={style.links} id="navbarSupportedContent">
                    {!autenticado &&
                        <ul className="navbar-nav ml-auto"  >
                            <li className={`${style.item} nav-item`}>
                                <NavLink to="/cadastrar-conta" className="nav-link" href="#">Cadastrar Conta </NavLink>
                            </li>
                            <li className={`${style.item} nav-item`}>
                                <NavLink to="/" className="nav-link" aria-current="page" > Acessar Conta</NavLink>
                            </li>
                        </ul>
                    }
                    {autenticado &&
                        <ul className="navbar-nav ml-auto"   >
                            <li className="nav-link active">
                                Bem-vindo {nomeUsuario}
                            </li>
                            <li className="nav-link active">|</li>
                            <li><a href="#" className="nav-link" onClick={() => sair()}>Logout</a></li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    )
    }
