import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { XMarkIcon } from "react-native-heroicons/solid";
import AnimatedLottieView from "lottie-react-native";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import { demoImage } from "../utils";
const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurants = useSelector(selectRestaurant);
  return (
    <View className="flex-1 bg-[#00CCBB]">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={navigation.goBack}>
            <XMarkIcon color={"white"} size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 minutes</Text>
            </View>
            <AnimatedLottieView
              className="h-16 w-16"
              // Find more Lottie files at https://lottiefiles.com/featured
              source={require("../assets/food_bike.json")}
            />
          </View>
          <Progress.Bar
            className="mt-3"
            size={30}
            color="#00CCBB"
            indeterminate={true}
          />
          <Text className="mt-3 text-gray-500">
            Your order at {restaurants.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurants.lat,
          longitude: restaurants.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.05,
        }}
        className="flex-1 -mt-10 z-0"
      >
        <Marker
          coordinate={{
            latitude: restaurants.lat,
            longitude: restaurants.long,
          }}
          title={restaurants.title}
          description={restaurants.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: demoImage,
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Augustine Chinedu</Text>
          <Text className="text-gray-400">Your rider</Text>
        </View>
        <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
