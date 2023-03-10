import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"]{
      ...,
      restaurants[]=>{
        ...,
        dishes[] =>{}
      }
    }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);
  console.log(featuredCategories, "feat");
  return (
    <View>
      <SafeAreaView className="bg-white pt-5">
        <View className="flex-row pb-3 items-center space-x-2 px-4">
          <Image
            source={{
              uri: "https://picsum.photos/200",
            }}
            className="h-7 w-7 bg-gray-100 p-4 rounded-full"
          />
          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">
              Deliver Now!
            </Text>
            <Text className="font-bold text-xl">
              Current Location
              <ChevronDownIcon size={20} color="#00CCBB" />
            </Text>
          </View>
          <UserIcon size={35} color="#00CCBB" />
        </View>

        {/* Search */}
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
          <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
            <MagnifyingGlassIcon color={"gray"} />
            <TextInput
              placeholder="Restaurants and cuisines"
              keyboardType="default"
            />
          </View>
          <AdjustmentsHorizontalIcon color={"#00CCBB"} />
        </View>
        {/* Body */}
        <ScrollView
          className="bg-gray-100"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Categories */}
          <Categories />
          {/* Featured rows */}
          <FlatList
            data={featuredCategories}
            renderItem={({ item }) => (
              <FeaturedRow
                id={item._id}
                title={item.name}
                description={item.short_description}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
