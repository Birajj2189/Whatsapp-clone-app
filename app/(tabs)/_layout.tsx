import React from 'react'
import className from 'twrnc'
import { Tabs } from 'expo-router'
import { ChatBubbleLeftIcon, PhoneIcon, CogIcon, GlobeAmericasIcon} from "react-native-heroicons/solid";

const Layout = () => {
  return (
        <Tabs sceneContainerStyle={className`bg-white`} initialRouteName='index'
        screenOptions={{
            tabBarStyle:{
                height:80,
                paddingTop:20,
                backgroundColor:'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 20,
            },
            tabBarLabelStyle:{
                fontSize:12,
                fontWeight:400,
                color:'gray'
            },
            tabBarActiveTintColor: '#22c55e',
            headerShown: false
        }
    }
        >
            <Tabs.Screen name='index' options={{ 
                tabBarLabel: 'Chat',
                headerTitle: 'WhatsApp',
                tabBarIcon: ChatBubbleLeftIcon
            }}/>
            <Tabs.Screen name='updates' options={{ 
                tabBarLabel: 'Updates',
                headerTitle: 'Updates',
                tabBarIcon: GlobeAmericasIcon
            }}/>
            <Tabs.Screen name='calls' options={{ 
                tabBarLabel: 'Calls',
                headerTitle: 'Calls',
                tabBarIcon: PhoneIcon
            }}/>
            <Tabs.Screen name='settings' options={{ 
                tabBarLabel: 'Settings',
                headerTitle: 'Settings',
                tabBarIcon: CogIcon
            }}/>
        </Tabs>
  )
}

export default Layout