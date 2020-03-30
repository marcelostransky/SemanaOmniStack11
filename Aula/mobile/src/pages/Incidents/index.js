import React, {useState,useEffect} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from  'react-native';
import { Feather} from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import {useNavigation} from '@react-navigation/native'
import api from '../../service/api'
import styles from './styles';

export default function Incidents(){
    const navigation = useNavigation();
    const [listaIncidents,setIncidents]=useState([]);
    const [total,setTotal]=useState(0);
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(false);

    function navigateToDetail(incident){
        navigation.navigate('Detail',{incident});
    }
    async function loadIncidents(){
        if(loading){
            return ;
        }
        if(total > 0 & listaIncidents.length===total){
            return;
        }
        setLoading(true);

        const response = await api.get('incidents',{params:{page}})
        setPage(page + 1);
        setLoading(false);
        setIncidents([...listaIncidents, ...response.data.incidents]);
        setTotal(response.headers['x-total-count']);

    }

    useEffect(()=>{
        loadIncidents();
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <Text style={styles.headertext}>
                    Total de  <Text style={styles.headertextbold}> {total} casos</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

            <FlatList 
            data={listaIncidents}
            style={styles.incidents}
            showsVerticalScrollIndicator = {false}
            keyExtractor={incident => String(incident.id)}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem={({item:incident})=>(
                <View style={styles.incident}>
                <Text style={styles.incidentProperty}>Ong:</Text>
                <Text style={styles.incidentValue}>{incident.nome}</Text>
                
                <Text style={styles.incidentProperty}>Caso:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
                
                <Text style={styles.incidentProperty}>Valor</Text>
            <Text style={styles.incidentValue}>{
            Intl.NumberFormat('pt-BR',{
                style:'currency', 
                currency:'BRL'})
            .format(incident.value)}</Text>

                <TouchableOpacity style={styles.detailButton} 
                onPress={()=>navigateToDetail(incident)}>
                    <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                    <Feather name='arrow-right'  size={16} color='#e02041'/>
                </TouchableOpacity>
            </View>

            )}
            ></FlatList>
            {/* <View style={styles.incidents}>
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>Ong:</Text>
                    <Text style={styles.incidentValue}>Apad</Text>
                    
                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>Cadelinha Atropelada</Text>
                    
                    <Text style={styles.incidentProperty}>Valor</Text>
                    <Text style={styles.incidentValue}>R$120,00</Text>

                    <TouchableOpacity style={styles.detailButton} 
                    onPress={()=>{}}>
                        <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                        <Feather name='arrow-right'  size={16} color='#e02041'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>Ong:</Text>
                    <Text style={styles.incidentValue}>Apad</Text>
                    
                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>Cadelinha Atropelada</Text>
                    
                    <Text style={styles.incidentProperty}>Valor</Text>
                    <Text style={styles.incidentValue}>R$120,00</Text>

                    <TouchableOpacity style={styles.detailButton} 
                    onPress={()=>{}}>
                        <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                        <Feather name='arrow-right'  size={16} color='#e02041'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>Ong:</Text>
                    <Text style={styles.incidentValue}>Apad</Text>
                    
                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>Cadelinha Atropelada</Text>
                    
                    <Text style={styles.incidentProperty}>Valor</Text>
                    <Text style={styles.incidentValue}>R$120,00</Text>

                    <TouchableOpacity style={styles.detailButton} 
                    onPress={()=>{}}>
                        <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                        <Feather name='arrow-right'  size={16} color='#e02041'/>
                    </TouchableOpacity>
                </View>
            
            </View> */}
        </View>
    );
}