import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  Text,
  Picker,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import db from "../firebase/index";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";

const ReserveDetail = (props) => {
  const [data, setData] = useState(null);
  const [parkData, setParkData] = useState(null);
  const [blockChosen, setBlockChosen] = useState(null);
  const [parkRow, setParkRow] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let id = props.navigation.state.params.id;
    db.collection("parkings-lots")
      .doc(id)
      .onSnapshot((onSnapshot) => {
        setData(onSnapshot);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    let id = props.navigation.state.params.id;
    db.collection("parking-lots")
      .doc(id)
      .get()
      .then((doc) => {
        setParkData(doc.data());
        setLoading(false);
      });
  }, [data]);

  useEffect(() => {
    setLoading(true);
    if (parkData && parkData.parkiran) {
      let block = parkData.parkiran[blockChosen];
      // let reserved = getRandomReserve(Number(block[0].avail), block[0].capacity)
      let blockGroup = [];
      for (let i = 0; i < block.capacity; i++) {
        let color = "";
        let onpress = "";
        if (block.reserved.includes(i + 1)) {
          color = "red";
          onpress = () => alert("this row not available");
        } else {
          color = "orange";
          onpress = () => {
            props.navigation.navigate("reservation", {
              parkId: block.id,
              block: blockChosen,
              row: i + 1,
              parkData,
            });
          };
        }
        blockGroup.push(
          <TouchableHighlight key={i} onPress={onpress}>
            <View
              style={{
                height: 100,
                width: 100,
                marginBottom: 10,
                backgroundColor: color,
                borderWidth: 2,
                borderColor: "grey",
              }}
            >
              <Text style={{ color: "white" }}>{i + 1}</Text>
            </View>
          </TouchableHighlight>
        );
      }
      setParkRow(blockGroup);
      setLoading(false);
    }
  }, [blockChosen]);

  function getRandomReserve(avail, capac) {
    let output = [];
    for (let i = 0; i < capac - avail; i++) {
      getNumber(capac, output);
    }
    return output;
  }

  function getNumber(capac, output) {
    let reservedNumFunc = () => Math.round(Math.random() * capac);
    let reservedNum = reservedNumFunc();
    if (output.includes(reservedNum) || !reservedNum) {
      return getNumber(capac, output);
    } else {
      output.push(reservedNum);
      return output;
    }
  }

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ marginTop: 10, marginBottom: 15 }}>
        {parkData && parkData.name ? (
          <Text style={{ fontSize: 20 }}>{parkData.name.toUpperCase()}</Text>
        ) : null}
      </Text>
      <Text>Choose on what block do you want to park</Text>
      <Picker
        selectedValue={blockChosen}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) => setBlockChosen(itemValue)}
      >
        {parkData &&
          parkData.parkiran &&
          parkData.parkiran.length &&
          parkData.parkiran.map((el, index) => (
            <Picker.Item key={index} label={el.block} value={index} />
          ))}
      </Picker>
      <Text style={{ marginBottom: 10 }}>Choose specific row</Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {parkRow && parkRow}
      </View>
    </ScrollView>
  );
};

export default ReserveDetail;
