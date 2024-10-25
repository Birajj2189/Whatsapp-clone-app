import { View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import className from 'twrnc';
import ChatHeader from '@/components/ChatHeader';
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import chatData from '@/assets/dummyData/chats.json';
import { Bubble, GiftedChat,IMessage, InputToolbar, Send, SystemMessage } from "react-native-gifted-chat";
import messageData from "@/assets/dummyData/messages.json"
import { CameraIcon, MicrophoneIcon, PlusIcon } from 'react-native-heroicons/outline';
import {  PaperAirplaneIcon } from 'react-native-heroicons/solid';
import { Swipeable } from 'react-native-gesture-handler';
import ChatMessageBox from '@/components/ChatMessageBox';
import ReplyMessageBar from '@/components/ReplyMessageBar';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define a type for the contact object
interface Contact {
  id: string;
  from: string;
  date: string;
  img: string;
  msg: string;
  read: boolean;
  unreadCount: number;
}

const ChatScreen = () => {
  const [contact, setContact] = useState<Contact | null>(null);
  const router = useRouter(); 
  const { id } = useLocalSearchParams();
  const chatId = Array.isArray(id) ? id[0] : id;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState('');

  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
  const swipeableRowRef = useRef<Swipeable | null>(null);

  useEffect(() => {
    const foundContact = chatData.find((chat) => chat.id === chatId) as Contact | undefined;
    setContact(foundContact || null);
  }, [chatId]);
  
  useEffect(() => {
    if (contact) {
      const formattedMessages = messageData.map((message) => {
        return {
          _id: message.id,
          text: message.msg,
          createdAt: new Date(message.date),
          user: {
            _id: message.from,
            name: message.from === 1 ? 'You' : contact.from,
          },
        };
      });
  
      setMessages(formattedMessages);
    }
  }, [contact]);
  
  
  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.currentMessage?._id === replyMessage._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage]
  );

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    setText(''); // Clear the input text after sending
  }, []);

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: '#fff' }}
        renderActions={() => (
          <View style={{ height: 44, justifyContent: 'center', alignItems: 'center', left: 5 }}>
            <PlusIcon style={className`text-green-500`}/>
          </View>
        )}
      />
    );
  };



  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={className`flex-1`}>
      <TouchableOpacity onPress={() => router.push(`/contact/${chatId}`)}>
        <ChatHeader chatName={contact ? contact.from : 'Loading...'} chatId={chatId} chatImage={contact ? contact.img : 'Loading..'}/>
      </TouchableOpacity>
      <ImageBackground
        source={require('@/assets/images/chat-bg.png')}
        style={className`flex-1 mb-4`}
        imageStyle={className`absolute w-full h-full -z-10`}
      >
        {contact ? (
          <GiftedChat
            messages={messages}
            onSend={(messages: any) => onSend(messages)}
            user={{ _id: 1 }}
            renderAvatar={null}
            renderInputToolbar={renderInputToolbar}
            onLongPress={(context, message) => setReplyMessage(message)}
            renderSystemMessage={(props) => (
              <SystemMessage {...props} textStyle={{ color: '#000' }} />
            )}
            renderMessage={(props) => (
              <ChatMessageBox
                {...props}
                setReplyOnSwipeOpen={setReplyMessage}
                updateRowRef={updateRowRef}
              />
            )}
            renderBubble={(props) => (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    color: '#000',
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: '#fff',
                  },
                  right: {
                    backgroundColor: '#DCF7C5',
                  },
                }}
                
              />
            )}
            renderChatFooter={() => (
              <ReplyMessageBar clearReply={() => setReplyMessage(null)} message={replyMessage} />
            )}
            renderSend={(props) => (
              <View style={{ height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, paddingHorizontal: 14 }}>
                {text === '' && (
                  <>
                    <CameraIcon style={className`text-green-500`}/>
                    <MicrophoneIcon style={className`text-green-500`}/>
                  </>
                )}
                {text !== '' && (
                  <Send {...props} containerStyle={{ justifyContent: 'center' }}>
                    <PaperAirplaneIcon style={className`text-green-500`}/>
                  </Send>
                )}
              </View>
            )}
            onInputTextChanged={setText}
            maxComposerHeight={100}
          />
        ) : (
          <Text style={className`text-white p-4`}>Chat not found.</Text>
        )}
      </ImageBackground>
    </View>
    </SafeAreaView >
  );
};


export default ChatScreen;
