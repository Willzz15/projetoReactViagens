import React, {useEffect, useState} from 'react';
//Responsavel por dispara uma ação para o redux
import { useDispatch } from 'react-redux';
import {MdFlightTakeoff} from 'react-icons/md';

import {addReserveRequest} from '../../store/modules/reserve/actions';

import api from '../../services/api';
import './style.css';



export default function Home() {
  const dispath = useDispatch();  
  const [trips, setTrips] = useState([]);

  useEffect(()=>{
    async function loadApi(){
      const response = await api.get('trips');
      setTrips(response.data);

    }

    loadApi();
  }, [])

  //Parametro obrigatório para dispara uma ação é o 'type'.
  function handleAdd(id){
    dispath(addReserveRequest(id));
  }

 return (
   <div>
       <div className="box">
         {trips.map(trip => (
           <li key={trip.id}>
             <img src={trip.image} alt={trip.title} />
             <strong>{trip.title}</strong>
             <span>Status: {trip.status ? 'Disponivel' : 'Indisponivel'}</span>

             <button
             type="button"
             onClick={()=> handleAdd(trip.id)}
             >
               <div>
                 <MdFlightTakeoff size={16} color="#fff"/>
               </div>
               <span>SOLICITAR RESERVA</span>
             </button>
           </li>
         ))}
       </div>
   </div>
 );
}