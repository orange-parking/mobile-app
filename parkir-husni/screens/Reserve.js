import React, {useEffect,useState} from 'react'
import { View, Text, ScrollView, ActivityIndicator, TouchableHighlight } from 'react-native'
import db from '../firebase/index'

const Reserve = (props) => {

    const [lots, setLots] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        let parkingLot = []
        db
        .collection('parking-lots')
        .orderBy('name')
        .get()
        .then(async(querySnapshot) => {
            await querySnapshot.forEach(doc => {
                parkingLot.push(doc.data())
            })
            setLots(parkingLot)
            setLoading(false)
        })
    },[])

    return (
        <ScrollView contentContainerStyle={{flex:1, justifyContent:'center', alignItems: 'center'}}>
            {
                loading ? 
                    <ActivityIndicator />
                    :
                    lots === [] ?
                        <Text>There is no parking lot!</Text>
                        :
                        <View
                        style={{width:'100%', marginBottom:10, justifyContent:'center', alignItems: 'center'}}
                        >
                            <Text style={{marginBottom:20}}>Choose where you want to park</Text>
                            {
                                lots.map((el,index) => (
                                    <TouchableHighlight 
                                    style={{marginBottom:4, height:40, justifyContent:'center', alignItems: 'center', width:'100%', backgroundColor:'orange', borderColor:'grey', borderWidth:2}}
                                    onPress={() => props.navigation.navigate('detail',{id:el.name})}
                                    key={index} 
                                    >
                                        <View>
                                            <Text style={{color:'white'}}>{(el.name.toUpperCase())}</Text>
                                        </View>
                                    </TouchableHighlight>
                                ))
                            }
                        </View>
            }   
        </ScrollView>
    )
}

export default Reserve
