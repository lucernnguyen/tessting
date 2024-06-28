import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import COLORS from "./../../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postServiceCost } from "../../../app/Center/actions";
import { useDispatch } from "react-redux";
const ServicePost = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const [maintenanceServiceName, setMaintenanceServiceName] = useState("");
  const [acturalCost, setActuralCost] = useState("");
  const handleSignup = async () => {
    try {
      if (!maintenanceServiceName || !acturalCost) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      setLoad(true);
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.post(
        "http://autocare.runasp.net/api/MaintenanceServices/Post",
        {
          maintenanceServiceName: maintenanceServiceName,
          serviceCareId: null,
        },
        {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (
        response.status === 200 &&
        response.data &&
        response.data.maintenanceServiceId
      ) {
        await dispatch(postServiceCost({
          acturalCost: acturalCost,
          note: "string",
          maintenanceServiceId: response.data.maintenanceServiceId,
        }));
        setLoad(false);
        alert("Tạo dịch vụ thành công!");
        navigation.navigate("SERVICE");
      } else {
        setLoad(false);
        alert("Tạo dịch vụ không thành công. Vui lòng thử lại.");
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
          <TextInput
            style={styles.textInput}
            placeholder="tên dịch vụ"
            value={maintenanceServiceName}
            onChangeText={(text) => setMaintenanceServiceName(text)}
            required={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="chi phí dịch vụ"
            value={acturalCost}
            onChangeText={(text) => setActuralCost(text)}
            required={true}
          />
        </View>
        {load ? (
          <Pressable style={styles.button} >
            <Text style={styles.buttonText}>Đang tạo ...</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Tạo dịch vụ</Text>
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

export default ServicePost;
