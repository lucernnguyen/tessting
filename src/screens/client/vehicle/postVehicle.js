import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import COLORS from "./../../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getListVehicleModel } from "../../../app/Vehicle/actions";
const VehiclePost = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const [vehicleModelId, setVehicleModelId] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [odo, setOdo] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const { vehicleModel } = useSelector((state) => state.vehicle);
    const fetchGetListVehicleModel = async () => {
      await dispatch(getListVehicleModel());
    };
    useEffect(() => {
      const fetch = async () => {
        await fetchGetListVehicleModel();
      };
      fetch();
    }, []);
  const handleSignup = async () => {
    try {
      if (!vehicleModelId || !licensePlate || !odo || !color || !description) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      setLoad(true);
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.post(
        "http://autocare.runasp.net/api/Vehicles/Post",
        {
          vehicleModelId: vehicleModelId,
          color: color,
          licensePlate: licensePlate,
          odo: odo,
          description: description,
        },
        {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setLoad(false);
        alert("Tạo xe thành công!");
        navigation.navigate("VEHICLE");
      } else {
        setLoad(false);
        alert("Tạo xe không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error during:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        console.error("Status code:", error.response.status);
        alert(
          "Server responded with an error. Please check the console for details."
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert(
          "No response received from the server. Please check your network connection."
        );
      } else {
        console.error("Error setting up the request:", error.message);
        alert(
          "An error occurred during the request setup. Please check the console for details."
        );
      }
    }
  };
  
  const handleNavigateBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleNavigateBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={vehicleModelId}
            onValueChange={(itemValue) => setVehicleModelId(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Chọn mẩu xe" value="" />
            {vehicleModel.map((vehicle) => (
              <Picker.Item
                key={vehicle.vehicleModelId}
                label={
                  vehicle.vehicleModelName + "-" + vehicle.vehiclesBrandName
                }
                value={vehicle.vehicleModelId}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="màu xe"
            value={color}
            onChangeText={(text) => setColor(text)}
            required={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="biển số xe"
            value={licensePlate}
            onChangeText={(text) => setLicensePlate(text)}
            required={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="số km đi được"
            value={odo}
            onChangeText={(text) => setOdo(text)}
            required={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="thông tin xe"
            value={description}
            onChangeText={(text) => setDescription(text)}
            required={true}
          />
        </View>
        {load ? (
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Đang tạo ...</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Tạo xe</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    marginTop: 50,
  },
  backButton: {
    marginRight: 12,
  },
  form: {
    paddingHorizontal: 42,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  picker: {
    flex: 1,
  },
  button: {
    backgroundColor: "red",
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default VehiclePost;
