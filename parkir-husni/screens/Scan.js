import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import db from '../firebase/index'

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Scan extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render = () => {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
        <Button title='Hehe' onPress={this.test} />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    console.log(data.slice(0,33),'=========')
    if(data.slice(0,33) === 'http://192.168.0.110:3000/create/'){
      db.collection('parkings')
        .add({
            date: JSON.stringify(new Date()),
            nopol: null
        })
        .then((data) => {
            // props.history.replace('/user/'+data.id)
            // console.log(data)
            this.props.navigation.navigate('Home',{
              data: data.id
            })
        })
    }
  };
  test = ({data}) => {
    db.collection('parkings')
        .add({
            date: JSON.stringify(new Date()),
            nopol: null
        })
        .then((data) => {
            // props.history.replace('/user/'+data.id)
            // console.log(data.id)
            this.props.navigation.navigate('Home',{
              data:data.id
            })
        })
  }
}