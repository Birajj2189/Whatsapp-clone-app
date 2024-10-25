import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import className from 'twrnc';
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import chatData from '@/assets/dummyData/chats.json';
import ContactHeader from '@/components/ContactHeader';
import { ChatBubbleLeftIcon, PhoneIcon, VideoCameraIcon } from 'react-native-heroicons/solid';
import { ChevronRightIcon, MagnifyingGlassIcon, PhotoIcon, SpeakerWaveIcon, StarIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define a type for the contact object
interface Contact {
  id: string;
  from: string;
  date: string;
  img: string;
  msg: string;
  read: boolean;
  contact: string;
  unreadCount: number;
}

const ContactScreen = () => {
  const [contact, setContact] = useState<Contact | null>(null); // Allow contact to be of type Contact or null
  const router = useRouter(); 
  const { id } = useLocalSearchParams();
  const chatId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    const foundContact = chatData.find(chat => chat.id === chatId) as Contact | undefined; // Cast to Contact or undefined
    setContact(foundContact || null); // Set to found contact or null if not found
  }, [chatId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={className`flex-1`}>
      <ContactHeader chatName={contact ? contact.from : 'Loading...'} />
      <ScrollView>
        <Image source={{uri:contact ? contact.img : 'loading..'}} style={className`w-full h-100`}/>
        <View style={className`flex-row justify-between items-center bg-white px-4 py-4 border border-gray-400 border-opacity-40`}>
          <View style={className`flex gap-1`}>
            <Text style={className`text-lg font-semibold `}>{contact ? `${contact.from}`: 'Loading..'}</Text>
            <Text style={className`text-gray-400 text-xs`}>+91 81340-30614</Text>
          </View>
          <View style={className`flex-row gap-3`}>
            <View style={className`bg-green-200 p-1 rounded-full`}>
              <ChatBubbleLeftIcon style={className`text-green-500`}/>
            </View>
            <View style={className`bg-green-200 p-1 rounded-full`}>
              <VideoCameraIcon style={className`text-green-500`}/>
            </View>
            <View style={className`bg-green-200 p-1 rounded-full`}>
              <PhoneIcon style={className`text-green-500`}/>
            </View>
          </View>
        </View>
        <View style={className`border-b border-gray-400 border-opacity-40 bg-white p-4`}>
          <Text style={className`text-md font-normal`}>This is a sample description of the contact.</Text>
        </View>
        <View style={className`mt-4 border-t border-gray-400 border-opacity-40`}>
          <TouchableOpacity style={className`bg-white flex-row px-4 py-4 border-b border-gray-400 border-opacity-40`}>
            <View style={className`bg-blue-600 p-1 rounded mr-4`}>
              <PhotoIcon style={className`text-white h-4 w-4`}/>
            </View>
            <Text style={className`text-md font-medium`}>Media, Links and Docs</Text>
            <View style={className`flex-1`}/>
            <View style={className`flex-row items-center justify-center`}>
                <Text style={className`text-gray-500 mr-2`}>12</Text>
                <ChevronRightIcon style={className`text-gray-400`}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={className`bg-white flex-row px-4 py-4 border-b border-gray-400 border-opacity-40`}>
            <View style={className`bg-yellow-400 p-1 rounded mr-4`}>
              <StarIcon style={className`text-white h-4 w-4`}/>
            </View>
            <Text style={className`text-md font-medium`}>Starred Messages</Text>
            <View style={className`flex-1`}/>
            <View style={className`flex-row items-center justify-center`}>
                <Text style={className`text-gray-500 mr-2`}>None</Text>
                <ChevronRightIcon style={className`text-gray-400`}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={className`bg-white flex-row px-4 py-4 border-b border-gray-400 border-opacity-40`}>
            <View style={className`bg-red-400 p-1 rounded mr-4`}>
              <MagnifyingGlassIcon style={className`text-white h-4 w-4`}/>
            </View>
            <Text style={className`text-md font-medium`}>Chat Search</Text>
            <View style={className`flex-1`}/>
            <View style={className`flex-row items-center justify-center`}>
                <ChevronRightIcon style={className`text-gray-400`}/>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={className`bg-white flex-row px-4 py-4 border mt-4 border-gray-400 border-opacity-40`}>
            <View style={className`bg-green-400 p-1 rounded mr-4`}>
              <SpeakerWaveIcon style={className`text-white h-4 w-4`}/>
            </View>
            <Text style={className`text-md font-medium`}>Mute</Text>
            <View style={className`flex-1`}/>
            <View style={className`flex-row items-center justify-center`}>
                <Text style={className`text-gray-500 mr-2`}>No</Text>
                <ChevronRightIcon style={className`text-gray-400`}/>
            </View>
          </TouchableOpacity>

      </ScrollView>
    </View>
    </SafeAreaView >
  );
};

export default ContactScreen;
