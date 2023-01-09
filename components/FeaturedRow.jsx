import { View, Text, ScrollView, FlatList } from "react-native";
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
      {/* Restaurant cards */}
      <FlatList
        horizontal
        data={restaurants}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <RestaurantCard
            id={item._id}
            imgUrl={item.image}
            title={item.name}
            rating={item.rating}
            genre={item.type?.name}
            address={item.address}
            short_description={item.short_description}
            dishes={item.dishes}
            long={item.long}
            lat={item.lat}
          />
        )}
      />
    </View>
  );
};

export default FeaturedRow;
