import React,{useState, useEffect} from 'react';

import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api';
import {FiPower, FiTrash2} from 'react-icons/fi'
import logoImg  from '../../assets/logo.svg'

import './style.css'
export default function Profile(){
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
   
    useEffect(() => {
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data.incidents);
        })
    
    },[ongId])

   async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incident=>incident.id !==id))

        }catch(err){
            alert('Erro ao deletar caso, tente novamente');
        }
    }
    function handleLogoult(){
        localStorage.clear();
        history.push('/');
    }

    return(
       <div className="profile-container">
           <header>
               <img src={logoImg} alt="Be The Heroe" ></img>
               <span>Bem vindo, {ongName}</span>
               <Link className="button" to="/incident/new" >Cadastrar novo caso</Link>
               <button onClick={handleLogoult} type="button">
                   <FiPower size={18} color="#E02041"></FiPower>
               </button>
           </header>
           <h1>Casos Cadastrados</h1>
           <ul>
              {incidents.map(incident=>(
                   <li key={incident.id}>
                   <strong>Caso: </strong>
                   <p>{incident.title}</p>
                   <strong>Descrição</strong>
                   <p>{incident.description}</p>
                   <strong>Valor</strong>
                   <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incident.value)}</p>
                   <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                       <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                   </button>
               </li>
              ))}
              
           </ul>
       </div>
    )
}