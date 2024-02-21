import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { HomeIcon } from "react-native-heroicons/solid";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 5000);
  }, []);
  return (
    <SafeAreaView className="bg-[#f15a22] flex-1 items-center justify-center">
      <Animatable.Image
        source={require("../assets/deliveroo-too-teal-bg.webp")}
        animation="slideInDown"
        iterationCount={1}
        className="h-96 w-96"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-white text-lg font-bold my-10"
      >
        Waiting for Restaurant to accept your order
      </Animatable.Text>
      <Progress.Circle size={30} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
