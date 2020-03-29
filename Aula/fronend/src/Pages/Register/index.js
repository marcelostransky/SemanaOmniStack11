import React,{useState} from  'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import logoImg  from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';

export default function Register(){
    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWatsapp] = useState('');
    const [city,setCity] = useState('');
    const [uf,setUf] = useState('');
    const history = useHistory();
  async  function handleregister(e){
        e.preventDefault();
       const data = {
            nome,
            email,
            whatsapp,
            city,
            uf,
        }
        try {
            const response = await  api.post('ongs',data);
            alert(`Seu Id de acesso: ${response.data.id}`)
            history.push('/')
        }catch(err){
            alert('Erro no cadastro, tente novamente')
        }

    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"></img>
                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.
                    </p>
                    <Link className="back-link" to="/">
                       <FiArrowLeft size={16} color="#E02041" />
                       Já tenho um cadastro
                   </Link>
                </section>
                <form onSubmit={handleregister}>
                    <input placeholder="Nome da ONG"
                    value = {nome}
                    onChange = {e=> setNome(e.target.value)}
                    />
                    <input type="email" placeholder="E-mail" 
                    value = {email}
                    onChange = {e=> setEmail(e.target.value)}
                    />
                    <input placeholder="WhatsApp"
                    value = {whatsapp}
                    onChange = {e=> setWatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input placeholder="Cidade"
                        value = {city}
                        onChange = {e=> setCity(e.target.value)}
                        />
                        
                        <input placeholder="Uf" style={{width:80}}
                        value = {uf}
                        onChange = {e=> setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    
        )
}
    