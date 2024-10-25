import React, { useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import className from 'twrnc';
import { CameraIcon, FaceSmileIcon, MicrophoneIcon, PaperAirplaneIcon } from 'react-native-heroicons/outline';
import EmojiSelector from 'react-native-emoji-selector';
import { PlusIcon } from 'react-native-heroicons/solid';
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const ChatFooter: React.FC = () => {
  const [chatInput, setChatInput] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const handleEmojiSelect = (emoji: string) => {
    setChatInput((prevInput) => prevInput + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  // Animated style for the entire footer
  const animatedFooterStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(showEmojiPicker ? -200 : 0, {
          duration: 400,
          easing: Easing.out(Easing.exp),
        }),
      },
    ],
  }));

  return (
    <Animated.View style={[className`w-full bg-white`, animatedFooterStyle]}>
      <View style={className`flex-row items-center px-4 justify-evenly py-4 border border-gray-400 border-opacity-40`}>
        <TouchableOpacity>
          <PlusIcon style={className`text-green-500`} />
        </TouchableOpacity>
        <View style={className`border border-gray-400 rounded-2xl py-1 px-2 justify-between flex-row`}>
          <TextInput
            ref={inputRef}
            style={className`border-none`}
            placeholder=""
            placeholderTextColor="#A0A0A0"
            value={chatInput}
            onChangeText={setChatInput}
          />
          <TouchableOpacity onPress={() => setShowEmojiPicker((prev) => !prev)}>
            <FaceSmileIcon style={className`text-green-500`} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <CameraIcon style={className`text-green-500`} />
        </TouchableOpacity>
        { chatInput.length > 0 ?
          <TouchableOpacity >
            <PaperAirplaneIcon style={className`text-green-500`} />
          </TouchableOpacity> : 
          <TouchableOpacity>
            <MicrophoneIcon style={className`text-green-500`} />
          </TouchableOpacity>
        }
      </View>
      {showEmojiPicker && (
        <View
          style={className`bottom-0 w-full h-30`}
        >
          <EmojiSelector onEmojiSelected={handleEmojiSelect} />
        </View>
      )}
    </Animated.View>
  );
};

export default ChatFooter;
