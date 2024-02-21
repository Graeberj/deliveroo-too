import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  StarIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/solid";
import DishCard from "../components/DishCard";
import BasketIcon from "../components/BasketIcon";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
      id,
      title,
      imgUrl,
      rating,
      genre,
      address,
      short_description,
      dishes,
      longitude,
      latitude,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        title,
        imgUrl,
        rating,
        genre,
        address,
        short_description,
        dishes,
        longitude,
        latitude,
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="h-56 w-full bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#f15a22" />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="font-bold text-3xl ">{title}</Text>
            <View className="flex-row space-x-1 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="orange" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-orange-500">{rating}</Text> - {genre}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500">
                  {" "}
                  Neaby - {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 mb-4">{short_description}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 border-y border-gray-300 p-4">
            <QuestionMarkCircleIcon size={20} color="#f15a22" />
            <Text className="text-gray-500 text-xs ml-4 flex-1">
              Have a food allergy?
            </Text>
            <ChevronRightIcon size={20} color="#f15a22" />
          </TouchableOpacity>
          <View className="pb-36">
            <Text className="px-4 pt-6 font-bold text-xl">Menu</Text>
            {/** Dishes */}
            {dishes?.map((dish) => (
              <DishCard
                key={dish._id}
                id={dish._id}
                name={dish.name}
                description={dish.short_description}
                price={dish.price}
                image={dish.image}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
