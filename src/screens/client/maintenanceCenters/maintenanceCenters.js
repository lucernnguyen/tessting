import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { getListCenter } from "../../../app/Center/actions";
import { AntDesign } from "@expo/vector-icons";
const MaintenanceCenters = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { centerList } = useSelector((state) => state.center);
  const fetchGetListBooking = async () => {
    await dispatch(getListCenter());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchGetListBooking();
    });
    fetchGetListBooking();
    return unsubscribe;
  }, [navigation]);
  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ padding: 12 }}>
        <View>
          {centerList.length > 0 &&
            centerList.map((item, index) => (
              <Pressable
                style={{
                  marginVertical: 12,
                  backgroundColor: "white",
                  borderRadius: 7,
                }}
                key={index}
              >
                <View
                  style={{
                    backgroundColor: "#0066b2",
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTopLeftRadius: 7,
                    borderTopRightRadius: 7,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                      }}
                    >
                      thông tin trung tâm
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                        marginTop: 3,
                      }}
                    >
                      {item?.maintenanceCenterName}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                      }}
                    >
                      Đánh giá
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 15,
                          fontWeight: "500",
                          marginTop: 4,
                        }}
                      >
                        {item?.rating}
                      </Text>
                      <AntDesign name="staro" size={24} color="white" />
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: "white",
                    marginHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      email : {item?.email}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      số điện thoại : {item?.phone}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      địa chỉ : {item?.address}
                    </Text>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 13, fontWeight: "600" }}>
                        thông tin
                      </Text>
                      <Text style={{ fontSize: 15, marginTop: 4 }}>
                        {item?.maintenanceCenterDescription}
                      </Text>
                    </View>
                    <View style={{ marginBottom: 20 }} />
                  </View>
                </View>
                <View style={{ paddingBottom: 12 }}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("PostBooking", {
                        maintenanceCenterId: item?.maintenanceCenterId,
                      })
                    }
                    style={{
                      backgroundColor: "#52c41a",
                      padding: 10,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 10,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ color: "white" }}>+ Lên lịch sửa xe</Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MaintenanceCenters;

const styles = StyleSheet.create({});
