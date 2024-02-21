import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { selectRestaurant } from "../features/restaurantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItems, setGroupedItems] = useState({});
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItems(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#f15a22 ] bg-white shadow-sm ">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant?.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color={"#f15a22 "} size={50} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://www.thespruceeats.com/thmb/",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 30 mins</Text>
          <TouchableOpacity>
            <Text className=" text-[#f15a22]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItems).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#f15a22] text-lg">{items.length} X</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">${items[0]?.price}</Text>
              <TouchableOpacity>
                <Text
                  className="text-[#f15a22] text-xs"
                  onPress={() => {
                    dispatch(removeFromBasket({ id: key }));
                  }}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-4 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between ">
            <Text className="text-gray-500">Subtotal</Text>
            <Text className="text-gray-600">${basketTotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between ">
            <Text className="text-gray-500">Delivery Fee</Text>
            <Text className="text-gray-600">$4.99</Text>
          </View>
          <View className="flex-row justify-between ">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              ${(basketTotal + 4.99).toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PreparingOrder");
            }}
            className="flex-row justify-center bg-[#f15a22] py-3 rounded-lg"
          >
            <Text className="text-white font-bold">Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
