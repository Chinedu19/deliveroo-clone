import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "category"]
    `
      )
      .then((data) => setCategories(data));
  }, []);
  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      data={categories}
      keyExtractor={(item) => item._id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <CategoryCard
          imgUrl={urlFor(item.image).width(200).url()}
          title={item.name}
        />
      )}
    />
  );
};

export default Categories;
