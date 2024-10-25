import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {  ChevronLeftIcon, PhoneIcon, VideoCameraIcon } from 'react-native-heroicons/solid'
import className from 'twrnc'
import { useRouter } from 'expo-router'

interface ChatHeaderProps {
    chatName?: string
    chatId?: string,
    chatImage?: string
}

const ChatHeader: React.FC<ChatHeaderProps> = ({chatName,chatId,chatImage}) => {
    const router = useRouter();

  return (
    <View style={className`flex-row p-4 items-center bg-white`}>
        <TouchableOpacity style={className`mr-6`} onPress={()=>{router.replace('/(tabs)')}}>
            <ChevronLeftIcon style={className`text-green-500 border-2 h-8 w-8`}/>
        </TouchableOpacity>
        <View style={className`flex-row`}>
            <Image style={className`bg-gray-400 h-10 w-10 rounded-full mr-2`} source={{uri: chatImage}}/>
            <View>
                <Text style={className`font-semibold`}>{chatName}</Text>
                <Text style={className`text-gray-400`}>tap here for contact info</Text>
            </View>
        </View>
        <View style={className`flex-1`}/>
        <View style={className`flex-row gap-6`}>
            <VideoCameraIcon style={className`text-green-500`}/>
            <PhoneIcon style={className`text-green-500`}/>
        </View>
    </View>
  )
}

export default ChatHeader