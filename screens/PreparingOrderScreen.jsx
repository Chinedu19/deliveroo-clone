import { SafeAreaView, Text, View } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import AnimatedLottieView from "lottie-react-native";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const deliveryTimer = setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
    return () => {
      clearTimeout(deliveryTimer);
    };
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-[#00CCBB] justify-center items-center">
      <AnimatedLottieView
        autoPlay
        style={{
          width: "80%",
          aspectRatio: 1,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/food_bike.json")}
      />
      <Animatable.Text
        animation={"slideInUp"}
        iterationCount={1}
        className="text-white text-lg my-10 font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
