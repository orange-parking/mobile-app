import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native'
import db from '../firebase/index'
import { TouchableHighlight } from 'react-native-gesture-handler';
import firebase from 'firebase'

const Reservation = (props) => {

    const [plateNumber, setPlateNumber] = useState('')
    const [loading, setLoading] = useState(false)
    
    let {parkId, block, row, parkData} = props.navigation.state.params

    function submitReservation(){
        setLoading(true)
        let regex = new RegExp(/^([A-Za-z]{1,2})(\s|-)*([0-9]{1,4})(\s|-)*([A-Za-z]{0,3})$/i)
        if(regex.test(plateNumber)) {
            db
            .collection('parkings')
            .add({
                date: new Date(),
                nopol: plateNumber,
                reservation: {
                    status: 'pre',
                    location: parkId,
                    block,
                    row
                }
            })
            .then(data => {
                let y = [...parkData.parkiran]
                y[block]['reserved'].push(row)
                let x = 'parkiran.'+block+'.reserved'
                return db
                .collection('parking-lots')
                .doc(parkId)
                .update({
                    parkiran: y
                })
                .then(() => {
                    alert(`Reservation at ${parkId.toUpperCase()}, block: ${block}, row: ${row} succeed!` )
                    props.navigation.navigate('Home')
                    setLoading(false)
                })
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
        } else {
            alert('Please input valid number plate!')
            setLoading(false)
        }
    }

    return (
        <View style={{backgroundColor:'orange', justifyContent:'center', alignItems:'center', flex:1}}>
            <View
            style={{backgroundColor:'white', padding: 20, 
            elevation:5, shadowColor:'black', shadowOpacity:0.8, shadowRadius:2, shadowOffset:{width:1, height:1},
            borderRadius:3
            }}>
                <Text style={{marginBottom:20, fontSize:20}}>Please Fill This Form to Continue</Text>
                <View style={{justifyContent:'flex-start'}}>
                    <Text style={{marginBottom:10}}>You are going to reserve at:</Text>
                    <Text>Park Location: {parkId.toUpperCase()}</Text>
                    <Text>Block: {block}</Text>
                    <Text style={{marginBottom:10}}>Row: {row}</Text>
                    <Text style={{marginBottom:10}}>Please input your plate number:</Text>
                    <TextInput 
                        style={{height:30, width:200, borderWidth:1, borderColor:'grey'}}
                        value={plateNumber}
                        onChangeText={(text) => setPlateNumber(text)}
                        placeholder=' ex:D 4098 VAK'
                    />
                </View>
                <View style={{marginTop:20}}>
                    <TouchableHighlight
                    style={{borderRadius:2, alignItems: 'center',
                    backgroundColor: 'orange',
                    justifyContent: 'center',
                    height:25,elevation:8, shadowColor:'black', shadowOpacity:0.8, 
                    shadowRadius:2, shadowOffset:{width:1, height:1}
                    }}
                    onPress={() => submitReservation()}
                    activeOpacity= {0.5}
                    underlayColor= 'orange'
                    >
                    {loading? <ActivityIndicator /> : <Text style={{color:'white'}}>Reserve Parking</Text>}
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

export default Reservation
