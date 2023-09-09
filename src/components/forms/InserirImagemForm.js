import React, { useState } from 'react';
import NomeDoCss from './forms.module.css'
import * as blobServices from '../../services/blob-services';

export default function InserirImagemForm() {
  const [noticia, setNoticia] = useState({
    titulo: '',
    descricao: '',
    chapeu: '',
    dataPublicacao: '',
    autor: '',
    iFormFile: null,
  });
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoticia({ ...noticia, [name]: value });
  };

  const handleImagemChange = (e) => {
    const imagem = e.target.files[0];
    setNoticia({ ...noticia, iFormFile: imagem });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('titulo', noticia.titulo);
      formData.append('descricao', noticia.descricao);
      formData.append('chapeu', noticia.chapeu);
      formData.append('dataPublicacao', noticia.dataPublicacao);
      formData.append('autor', noticia.autor);
      formData.append('iFormFile', noticia.iFormFile);
      console.log(e)
      const result = await blobServices.postCadastrarBlob(formData);

      if (result.message === "Notícia cadastrada com sucesso!") {
        setStatus({ type: 'success', mensagem: 'Notícia cadastrada com sucesso!' });
        alert('Usuário cadastrado com sucesso!');
        window.location.href = '/inicio';
      } else {
        // Tratar erro, se necessário
        setStatus({ type: 'error', mensagem: 'Erro ao cadastrar notícia.' });
        console.log(result.data); // Exemplo de como lidar com a resposta de erro da API
      }
    } catch (error) {
      // Lidar com erros da solicitação
      setStatus({ type: 'error', mensagem: 'Erro ao enviar dados.' });
      console.error(error);
    }
  };

  return (
    <div>
      {status.type === 'success' && <p style={{ color: 'green' }}>{status.mensagem}</p>}
      {status.type === 'error' && <p style={{ color: '#ff0000' }}>{status.mensagem}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Título da Notícia:</label>
          <input
            type="text"
            className="form-control"
            name="titulo"
            value={noticia.titulo}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Descrição da Notícia:</label>
          <textarea
            className="form-control"
            name="descricao"
            value={noticia.descricao}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Chapeu da Notícia:</label>
          <input
            type="text"
            className="form-control"
            name="chapeu"
            value={noticia.chapeu}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Data de Publicação:</label>
          <input
            type="date"
            className="form-control"
            name="dataPublicacao"
            value={noticia.dataPublicacao}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Autor:</label>
          <input
            type="text"
            className="form-control"
            name="autor"
            value={noticia.autor}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label style={{ color: 'red', fontWeight: 'bold' }}>Imagem é obeigatória! </label>
          <input
            type="file"
            accept="image/*"
            name="iFormFile" 
            onChange={(e) => handleImagemChange(e)} 
          />
        </div>
        <button className={`${NomeDoCss.submit} btn btn-success`} type="submit">Cadastrar Notícia</button>
      </form>
    </div>
  );
}