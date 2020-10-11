import React, { useEffect, useState } from "react";
import { AsyncStorage, SafeAreaView, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import logo from "../../assets/logo.png";
import SpotList from "../components/SpotList";

// import { Container } from './styles';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("techs").then((storageTechs) => {
      const techsArray = storageTechs.split(",").map((tech) => tech.trim());
      setTechs(techsArray);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
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
    marginTop: 25,
  },
});
