import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import className from 'twrnc'
import { Stack, Tabs, useRouter, useSegments } from 'expo-router'
import {ClerkProvider,ClerkLoaded, useAuth} from '@clerk/clerk-expo'
const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
import * as SecureStore from 'expo-secure-store'

const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key)
        if (item) {
          console.log(`${key} was used 🔐 \n`)
        } else {
          console.log('No values stored under key: ' + key)
        }
        return item
      } catch (error) {
        console.error('SecureStore get item error: ', error)
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value)
      } catch (err) {
        return
      }
    },
  }
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }


const InitialLayout = () => {
    const router = useRouter();
    const segments = useSegments();
    const {isLoaded , isSignedIn} = useAuth();



    useEffect(() => {
        if(!isLoaded) return;

        const inTabsGroup = segments[0] === '(tabs)';
        
        if(isSignedIn && !inTabsGroup) {
            router.replace('/(tabs)/');
        } else if(!isSignedIn) {
            router.replace('/');
        }
    }, [isSignedIn]);

    if(!isLoaded ) {
        return <View/>;
    }
    return (
        <Stack>
            <Stack.Screen name='index' options={{headerShown:false}}/>
            <Stack.Screen name='otp' options={{ headerShown:false}}/>
            <Stack.Screen name='verify/[phone]' options={{headerShown:false}}/>
            <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
            <Stack.Screen name='contact' options={{headerShown:false}} />
            <Stack.Screen name='chats' options={{headerShown:false}} />
            <Stack.Screen 
                name='(modals)/new-chat' 
                options={{
                    presentation: 'modal',
                    title: 'New chat',
                    headerStyle: {
                    backgroundColor: '#F0FDF4', // Background color of the header
                    },
                    headerTitleStyle: {
                    color: 'black', // Change title text color
                    fontWeight: 'bold', // Make title text bold
                    fontSize: 20, // Adjust font size
                    },
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                }}
                />
        </Stack>
    )
}
const RootLayout = () => {
    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
              <InitialLayout/>
        </ClerkProvider>
    )
}

export default RootLayout