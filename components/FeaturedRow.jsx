import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import { demoImage } from "../utils";
import sanityClient from "../sanity";
const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured" && _id == $id]{
          ...,
          restaurants[]->{
            ...,
            dishes[] ->,
            _type ->{
              name
            }
          },
        }[0]
`,
        { id }
      )
      .then((data) => {
        console.log(data);
        setRestaurants(data.restaurants || undefined);
      });
  }, [id]);
  console.log(id);
  console.log(restaurants);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant cards */}
        <RestaurantCard
          id="123"
          imgUrl={demoImage}
          title="Yo! Sushi"
          rating={4.5}
          genre="Japanese"
          address="123 Main St."
          short_description="This is a description"
          dishes={[]}
          long={20}
          lat={32}
        />
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
