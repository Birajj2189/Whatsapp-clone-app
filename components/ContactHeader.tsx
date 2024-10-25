import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import className from 'twrnc'
import { useRouter } from 'expo-router'

interface ContactHeaderProps {
    chatName?: string
    chatId?: string,
    chatImage?: string
}

const ContactHeader: React.FC<ContactHeaderProps> = ({chatName}) => {
    const router = useRouter();

  return (
    <View style={className`bg-white flex-row p-4 items-center justify-between`}>
        <TouchableOpacity style={className``} onPress={()=>{router.back()}}>
            <ChevronLeftIcon style={className`text-green-500 border-2 h-8 w-8`}/>
        </TouchableOpacity>
        <View style={className``}>
            <Text style={className`text-lg font-semibold`}>Contact Info</Text>
        </View>
        <View>
           <Text style={className`text-lg text-green-500 font-semibold`}>Edit</Text>
        </View>
    </View>
  )
}

export default ContactHeader