import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import className from 'twrnc'
import {  CameraIcon, EllipsisHorizontalCircleIcon } from "react-native-heroicons/outline";
import { PlusCircleIcon,  } from "react-native-heroicons/solid";
import { Link } from 'expo-router';

type HeadersProps = {
  title: string;
};

const Headers: React.FC<HeadersProps> = ({ title }) => {

  return (
    <View style={className`bg-white p-4 flex-row items-center justify-between border border-gray-400 border-opacity-40 `}>
      <Text style={className`text-3xl font-bold`}>{title}</Text>
      <View style={className`flex-row items-center gap-1`}>
        <CameraIcon size={25} style={className`text-green-500`}/>
        {title === 'WhatsApp'   ?     
          <Link href="/(modals)/new-chat" asChild>
            <TouchableOpacity >
              <PlusCircleIcon  size={25} style={className`text-green-500 ml-4`}/>
            </TouchableOpacity>
          </Link> : null
        }
        <EllipsisHorizontalCircleIcon size={25} style={className`text-green-500 ml-4`}/>
      </View>
    </View>
  );
};

export default Headers;
