import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  SafeAreaView,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import socketio from "socket.io-client";
import logo from "../../assets/logo.png";
import SpotList from "../components/SpotList";

// import { Container } from './styles';

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then((user_id) => {
      const socket = socketio("http://192.168.0.105:3333", {
        query: { user_id },
      });
      socket.on("booking_response", (booking) => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("techs").then((storageTechs) => {
      const techsArray = storageTechs.split(",").map((tech) => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  async function handleLogout() {
    AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>
      <ScrollView>
        {techs.map((tech) => (
          <SpotList tech={tech} key={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 30,
  },
});
