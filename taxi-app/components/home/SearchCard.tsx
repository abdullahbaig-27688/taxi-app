import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';


interface Props {
  pickup: string;
  dropoff: string;
  setPickup: (value: string) => void;
  setDropoff: (value: string) => void;
}


export default function SearchCard({
  pickup,
  dropoff,
  setPickup,
  setDropoff
}: Props) {


  return (

    <View style={styles.container}>


      {/* From */}
      <View style={styles.inputPill}>

        <Ionicons
          name="person"
          size={18}
          color="#6236FF"
          style={styles.leadingIcon}
        />


        <TextInput
          placeholder="Pickup location"
          placeholderTextColor="#AEAEB2"
          value={pickup}
          onChangeText={setPickup}
          style={styles.input}
        />


        <Ionicons
          name="locate-outline"
          size={20}
          color="#000"
        />

      </View>




      {/* To */}
      <View style={styles.inputPill}>

        <Ionicons
          name="search-outline"
          size={18}
          color="#6236FF"
          style={styles.leadingIcon}
        />


        <TextInput
          placeholder="Dropoff location"
          placeholderTextColor="#AEAEB2"
          value={dropoff}
          onChangeText={setDropoff}
          style={styles.input}
        />


        <Ionicons
          name="send"
          size={16}
          color="#000"
        />

      </View>


    </View>

  );
}




const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 20,
    marginTop: 14,
    gap: 12,
  },


  inputPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 55,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },


  leadingIcon: {
    marginRight: 12
  },


  input: {
    flex: 1,
    fontSize: 15,
    color: "#1C1C1E",
    fontWeight: "600"
  }

});