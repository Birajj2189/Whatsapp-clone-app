import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import Header from '@/components/Header'
import className from 'twrnc'
import { KeyIcon, ChevronRightIcon, StarIcon, ComputerDesktopIcon, BellAlertIcon, ChatBubbleBottomCenterIcon } from 'react-native-heroicons/solid'
import { ArrowsUpDownIcon, HeartIcon, InformationCircleIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'

const settings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={className`bg-green-50 flex-1`}>
      <Header title='Settings'/>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={className`flex-1 justify-center items-center `}> 
          <View style={className`bg-white w-60 border border-gray-400 border-opacity-40 rounded-2xl shadow-xl`}>
            <Text style={className`font-semibold p-4 text-center`}>Do you want to Logout?</Text>
            <View style={className`flex-row justify-evenly items-center`}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={className`border border-gray-400 border-opacity-40 w-[50%] justify-center items-center p-2 rounded-bl-xl`}
                  >
                  <Text style={className`font-semibold `}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={className`border border-gray-400 border-opacity-40 w-[50%] justify-center items-center p-2 rounded-br-xl`}
                  >
                  <Text style={className`font-semibold `}>No</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={className`bg-white border border-gray-400 border-opacity-40 p-4 flex-row`}>
          <Image style={className`bg-gray-500 rounded-full h-16 w-16 mr-4`}/>
          <View style={className`flex justify-center`}>
            <Text style={className`font-semibold text-[18px]`}>Biraj Mahanta</Text>
            <Text style={className`text-gray-400`}>Full Stack Web and Mobile developer</Text>
          </View>
          <View style={className`flex-1`}/>
          <View style={className`flex justify-center`}>
              <ChevronRightIcon style={className`text-gray-400`}/>
          </View>
        </View>
        <View style={className`mt-8 bg-white flex justify-center`}>
            <TouchableOpacity style={className`flex-row px-4 py-4 border border-gray-400 border-opacity-40`}>
                <View style={className`bg-yellow-500 p-1 rounded mr-4`}>
                    <StarIcon style={className`text-white h-4 w-4`}/>
                </View>
                <Text style={className`text-md font-medium`}>Starred Messages</Text>
                <View style={className`flex-1`}/>
                <View style={className`flex justify-center`}>
                    <ChevronRightIcon style={className`text-gray-400`}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={className`flex-row px-4 py-4 border-b border-gray-400 border-opacity-40`}>
                <View style={className`bg-green-700 p-1 rounded mr-4`}>
                  <ComputerDesktopIcon style={className`text-white h-4 w-4`}/>
                </View>
                <Text style={className`text-md font-medium`}>WhatsApp Web/Desktop</Text>
                <View style={className`flex-1`}/>
                <View style={className`flex justify-center`}>
                    <ChevronRightIcon style={className`text-gray-400`}/>
                </View>
            </TouchableOpacity>
        </View>
        <View style={className`mt-8 bg-white`}>
            <TouchableOpacity style={className`flex-row px-4 py-4 border border-gray-400 border-opacity-40`}>
                <View style={className`bg-blue-500 p-1 rounded mr-4`}>
                  <KeyIcon style={className`text-white h-4 w-4`}/>
                </View>
                <Text style={className`text-md font-medium`}>Account</Text>
                <View style={className`flex-1`}/>
                <View style={className`flex justify-center`}>
                    <ChevronRightIcon style={className`text-gray-400`}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={className`flex-row px-4 py-4 border-b border-gray-400 border-opacity-40`}>
                <View style={className`bg-green-500 p-1 rounded mr-4`}>
                  <ChatBubbleBottomCenterIcon style={className`text-white h-4 w-4`}/>
                </View>
                <Text style={className`text-md font-medium`}>Chats</Text>
                <View style={className`flex-1`}/>
                <View style={className`flex justify-center`}>
                    <ChevronRightIcon style={className`text-gray-400`}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={className`flex-row px-4 py-4 border-b border-gray-400 border-opacity-40`}>
                <View style={className`bg-red-500 p-1 rounded mr-4`}>
                  <BellAlertIcon style={className`text-white h-4 w-4`}/>
                </View>
                <Text style={className`text-md font-medium`}>Notifications</Text>
                <View style={className`flex-1`}/>
                <View style={className`flex justify-center`}>
                    <ChevronRightIcon style={className`text-gray-400`}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={className`flex-row px-4 py-4 border-b border-gray-400 border-opacity-40`}>
                <View style={className`bg-green-600 p-1 rounded mr-4`}>
                  <ArrowsUpDownIcon style={className`text-white h-4 w-4`}/>
                </View>
                <Text style={className`text-md font-medium`}>Data and Storage Usage</Text>
                <View style={className`flex-1`}/>
                <View style={className`flex justify-center`}>
                    <ChevronRightIcon style={className`text-gray-400`}/>
                </View>
            </TouchableOpacity>
        </View>
        <View style={className`mt-8 bg-white`}>
            <TouchableOpacity style={className`flex-row px-4 py-4 border border-gray-400 border-opacity-40`}>
                <View style={className`bg-blue-700 p-1 rounded mr-4`}>
                  <InformationCircleIcon style={className`text-white h-4 w-4`}/>
                </View>
                <Text style={className`text-md font-medium`}>Help</Text>
                <View style={className`flex-1`}/>
                <View style={className`flex justify-center`}>
                    <ChevronRightIcon style={className`text-gray-400`}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={className`flex-row px-4 py-4 border-b border-gray-400 border-opacity-40`}>
                <View style={className`bg-red-700 p-1 rounded mr-4`}>
                  <HeartIcon style={className`text-white h-4 w-4`}/>
                </View>
                <Text style={className`text-md font-medium`}>Tell a friend</Text>
                <View style={className`flex-1`}/>
                <View style={className`flex justify-center`}>
                    <ChevronRightIcon style={className`text-gray-400`}/>
                </View>
            </TouchableOpacity>
            
        </View>
        
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={className`flex h-12 justify-center items-center`}>
          <Text style={className`text-red-400 font-bold text-lg`}>Logout</Text>
        </TouchableOpacity>
        <View style={className`flex-1`}/>
        <View style={className`flex h-12 justify-center items-center`}>
          <Text style={className`text-gray-400`}>WhatsApp from Facebook</Text>
        </View>
      </ScrollView>
    </View>
    </SafeAreaView >
  )
}

export default settings