import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { AlphabetList } from "react-native-section-alphabet-list";
import contacts from "@/assets/dummyData/contacts.json"
import className from "twrnc"

const newChatScreen = () => {
    const data  = contacts.map((contact,index) =>({
        value: `${contact.first_name} ${contact.last_name}`,
        name: `${contact.first_name} ${contact.last_name}`,
        img: `${contact.img}`,
        desc: `${contact.desc}`,
        key: `${contact.first_name} ${contact.last_name}-${index}`,
    }))
  return (
    <ScrollView style={className`bg-green-50 px-2 pb-8`}>
          <AlphabetList
            data={data}
            indexLetterStyle={{ 
                color: 'blue', 
                fontSize: 20,
            }}
            renderCustomItem={(item:any) => (
                <View style={className`flex bg-white border border-gray-400 border-opacity-30 flex-row p-2 items-center`}>
                    <Image source={{uri:item.img}} style={className`h-10 w-10 rounded-full mr-4`}/>
                    <View>
                        <Text style={className`text-lg px-4 font-semibold`}>{item.value}</Text>
                        <Text style={className`px-4 text-gray-400`}>{
                        item.desc.length > 40 ? `${item.desc.substring(0, 40)}...` : item.desc
                        }</Text>
                    </View>
                </View>
            )}
            renderCustomSectionHeader={(section) => (
                <View style={className`bg-green-50`}>
                <Text style={className`text-xl font-bold text-gray-400 px-4 py-2`}>{section.title}</Text>
                </View>
            )}
            />
    </ScrollView>
  )
}

export default newChatScreen