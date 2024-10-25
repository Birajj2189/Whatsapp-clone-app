import { View, Text, Image, TouchableHighlight } from 'react-native';
import React from 'react';
import className from 'twrnc';
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { Link } from 'expo-router';

type ChatItemProps = {
    chatId: string,
    chatName?: string;
    chatImage: string;
    chatContent: string;
    chatUnreadNumber: number;
    chatLastMessageTime: string;
};

const formatChatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    // Format the time as "HH:MM AM/PM" for today's messages
    if (isToday) {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    }

    // Format as "DD/MM/YYYY" for messages not from today
    return date.toLocaleDateString([], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const ChatItem: React.FC<ChatItemProps> = ({
    chatId,
    chatName,
    chatContent,
    chatUnreadNumber,
    chatImage,
    chatLastMessageTime,
}) => { 
    return (
        <Link href={`/chats/${chatId}`} style={className`w-full `} asChild>
            <TouchableHighlight style={className`w-full `} activeOpacity={0.5} underlayColor='#0000' >
                <View style={className`flex-row mb-2 pl-2 border-b border-gray-400 border-opacity-30 py-2`}>
                    <Image
                        style={className`h-16 w-16 rounded rounded-full`}
                        source={{ uri: chatImage }}
                    />
                    <View style={className`px-4 flex-1 justify-between py-1`}>
                        <View style={className`flex flex-row justify-between`}>
                            <Text style={className`text-black text-lg font-semibold`}>{chatName}</Text>
                            {chatUnreadNumber > 0 ?
                                <Text style={className`text-green-400`}>
                                {formatChatDate(chatLastMessageTime)}
                            </Text>:
                                <Text style={className`text-gray-400`}>
                                {formatChatDate(chatLastMessageTime)}
                            </Text>
                            }
                        </View>
                        <View style={className`flex flex-row justify-between`}>
                            <Text style={className`text-gray-400`}>
                                {chatContent?.length > 30 ? `${chatContent.slice(0, 30)}...` : chatContent}
                            </Text>
                            <View style={className`flex-row items-center justify-center gap-1`}>
                                {chatUnreadNumber > 0 && (
                                    <View
                                        style={className`bg-green-500 rounded-full h-6 w-6 flex justify-center items-center`}
                                    >
                                        <Text style={className`text-white text-sm`}>
                                            {chatUnreadNumber}
                                        </Text>
                                    </View>
                                )}
                                <ChevronRightIcon style={className`text-gray-400 h-4 w-4`} />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </Link>
    );
};

export default ChatItem;
