import React, {useEffect, useState} from 'react'
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native'
import QRCode from 'react-native-qrcode'
import db from '../firebase/index'

const Home = (props) => {

    const [qr, setQr] = useState('')
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        db.collection("parkings")
        .onSnapshot((onSnapshot) => {
            setData(onSnapshot)
            setLoading(false)
        })
    },[])

    useEffect(() => {
        setLoading(true)
        if(props.navigation.state.params){
            alert(props.navigation.state.params.data)
            let id = props.navigation.state.params.data
            setQr(id)
            AsyncStorage.setItem('parkId',id)
            .then(() => {
                AsyncStorage.getItem('parkId')
                .then((id) => {
                    console.log(id,'opopopopopopop')
                    setLoading(false)
                })
            })
        }
    },[props.navigation.state.params])
    
    useEffect(() => {
        setLoading(true)
        // if(!props.navigation.state.params){
            AsyncStorage.getItem('parkId')
                .then((id) => {
                    console.log(id,'pppppppppppp')
                    db
                    .collection('parkings')
                    .doc(id)
                    .get()
                    .then((doc) => {
                        if(doc.exists){
                            setQr(id)
                            setLoading(false)
                        } else {
                            AsyncStorage.removeItem('parkId')
                            .then(() => {
                                setQr('')
                                setLoading(false)
                            })
                        }
                    })
                })
        // }
    }, [data])

    return (
        <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
            {
                loading ?
                <ActivityIndicator />
                :
                    qr==='' ?
                    <Text>You don't have any ongoing parking</Text>
                    :
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:'black', marginBottom:20}}>Scan this QRCode on the exit gate</Text>
                        <QRCode
                        value={qr}
                        size={200}
                        bgColor='purple'
                        fgColor='white'/>
                    </View>
            }
        </View>
    )
}

export default Home
