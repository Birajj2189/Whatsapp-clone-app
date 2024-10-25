import { View, Text, FlatList, TouchableHighlight } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import ChatItem from '@/components/ChatItem'
import className from 'twrnc'
import chats from '@/assets/dummyData/chats.json'
import Animated, { FadeOutLeft, CurvedTransition, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context'
const transition = CurvedTransition.delay(100);

const index = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={className`flex-1 bg-white`} >
      <Header title='WhatsApp'/>
      <Animated.FlatList
        skipEnteringExitingAnimations
        itemLayoutAnimation={transition}
        style={className``}
        data={chats}  
        contentContainerStyle={className`gap-0`}
        renderItem={({ item,index }) => (
            <Animated.View entering={FadeInRight.delay(index*20)} exiting={FadeOutLeft.delay(index*20)} >
            <ChatItem chatId={item.id} chatName={item.from} chatUnreadNumber={item.unreadCount} chatContent={item.msg} chatLastMessageTime={item.date} chatImage={item.img}/>  
            </Animated.View>
        )}
        keyExtractor={(item) => item.id} 
      />
      
    </View>
    </SafeAreaView>

  )
}

export default index