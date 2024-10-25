import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import className from 'twrnc'
import { useNavigation, useRouter } from 'expo-router';

type HeadersProps = {
    title: string;
    backNav?: boolean;
    backNavTitle?: string;
  };

const OtpHeader: React.FC<HeadersProps> = ({title, backNav, backNavTitle}) => {
    const navigation = useNavigation();
    const router = useRouter();

  return (
    <View style={className`h-12 flex-row items-center bg-white shadow-sm px-2`}>
      {backNav && ( 
        <TouchableOpacity style={className`flex-none`} onPress={() => navigation.goBack()}>
          <Text style={className`text-lg font-semibold text-blue-500`}>{backNavTitle}</Text>
        </TouchableOpacity>
      )}
      <Text style={className`flex-1 text-lg font-semibold text-center -left-4`}>{title}</Text> 
      <View style={className`flex-none`} /> 
    </View>
  )
}

export default OtpHeader