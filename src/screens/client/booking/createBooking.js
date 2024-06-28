import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import COLORS from "./../../../constants/colors";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateBooking = ({
  centerList,
  maintenanceCenterId,
  vehicleListByClient,
}) => {
  const navigation = useNavigation();
  const [vehicle, setVehicle] = useState("");
  const [maintenanceCenter, setMaintenanceCenter] = useState(maintenanceCenterId || "");
  const [note, setNote] = useState("");
  const [bookingDate, setBookingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const handleSignup = async () => {
    try {
      if (!note || !maintenanceCenter) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.post(
        "http://autocare.runasp.net/api/Bookings/Post",
        {
          vehicleId: vehicle,
          maintenanceCenterId: maintenanceCenter,
          maintananceScheduleId: null,
          note: note,
          bookingDate: bookingDate.toISOString(),
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
        alert("Tạo lịch thành công!");
        navigation.navigate("Booking");
      } else {
        alert("Tạo lịch không thành công. Vui lòng thử lại.");
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

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || bookingDate;
    setShowDatePicker(false);
    setBookingDate(currentDate);
    if (event.type === "set") {
      setShowTimePicker(true); // Show time picker after date is selected
    }
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || bookingDate;
    setShowTimePicker(false);
    const updatedDate = new Date(
      bookingDate.setHours(currentTime.getHours(), currentTime.getMinutes())
    );
    setBookingDate(updatedDate);
  };

  return (
    <ScrollView style={{ marginTop: 20 }}>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Lưu ý"
              value={note}
              onChangeText={(text) => setNote(text)}
              required={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={vehicle}
              onValueChange={(itemValue) => setVehicle(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Chọn xe" value="" />
              {vehicleListByClient.map((vehicle) => (
                <Picker.Item
                  key={vehicle.vehiclesId}
                  label={vehicle.vehiclesBrandName}
                  value={vehicle.vehiclesId}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={maintenanceCenter}
              onValueChange={(itemValue) => setMaintenanceCenter(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Chọn trung tâm bảo dưỡng" value="" />
              {centerList.map((center) => (
                <Picker.Item
                  key={center.maintenanceCenterId}
                  label={center.maintenanceCenterName}
                  value={center.maintenanceCenterId}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={styles.datePickerButton}
            >
              <Text style={styles.datePickerText}>
                {bookingDate
                  ? bookingDate.toLocaleString()
                  : "Chọn ngày và giờ"}
              </Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={bookingDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={bookingDate}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}
          </View>
          <Pressable style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Tạo lịch</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  datePickerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: COLORS.black,
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

export default CreateBooking;
