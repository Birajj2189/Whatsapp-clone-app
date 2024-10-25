import { View, Text, Image } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import className from 'twrnc'
import { CameraIcon, PencilIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context'

const updates = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={className`bg-green-50 flex-1`}>
      <Header title='Updates'/>
      <View style={className`py-4`}>
        <View style={className`bg-white border border-gray-400 border-opacity-40 p-4 flex-row`}>
          <Image style={className`bg-gray-500 rounded-full h-16 w-16 mr-4`}/>
          <PlusCircleIcon style={className`absolute text-green-500`}/>
          <View style={className`flex justify-center`}>
            <Text style={className`font-semibold text-[18px]`}>My Status</Text>
            <Text style={className`text-gray-400`}>Add to my Status</Text>
          </View>
          <View style={className`flex-1`}/>
          <View style={className`flex-row justify-center gap-3`}>
            <View style={className`flex my-auto bg-green-100 p-2 rounded-full`}>
              <CameraIcon style={className`text-green-500 h-6 w-6`}/>
            </View>
            <View style={className`flex my-auto bg-green-100 p-2 rounded-full`}>
              <PencilIcon style={className`text-green-500 h-6 w-6`}/>
            </View>
          </View>
        </View>
      
      </View>
      <View style={className`mt-4 bg-white border border-gray-400 border-opacity-40 p-4`}>
        <Text style={className`text-center text-gray-400`}>
          No recent updates to show right now
        </Text>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default updates