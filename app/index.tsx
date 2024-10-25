import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import className from 'twrnc'
import { Link } from 'expo-router'

const index = () => {
    const openLink = () =>{
        Linking.openURL('https://www.whatsapp.com/legal/terms-of-service')
    }
  return (
    <View style={className`flex-1 items-center bg-white`}>
        <View style={className`p-20`}>
            <Image source={require('@/assets/images/whatsApp-art-logo.png')} style={className`w-90 h-90`}/>
        </View>
        <Text style={className`text-2xl `}>Welcome to WhatsApp</Text>
        <Text style={className`px-12 text-center text-xs mt-4`}>
            Read our <Text onPress={openLink} style={className`text-[#007AFF]`}>Privacy Policy</Text>. Tap "Agree and Continue" to accept the <Text onPress={openLink} style={className`text-[#007AFF]`}>Terms and Service</Text>.
        </Text>
        <Link href={'/otp'} replace asChild style={className` bg-green-500 p-2 rounded-md w-80 mt-10 text-lg font-semibold justify-center items-center text-center`}>
            <TouchableOpacity>
                <Text style={className`text-center text-white font-semibold`}>
                    Agree & Continue
                </Text>
            </TouchableOpacity>
        </Link>
    </View>
  )
}

export default index