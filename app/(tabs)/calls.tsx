import { View, Text, ScrollView, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import className from 'twrnc'
import { HeartIcon } from 'react-native-heroicons/solid'
import { ArrowDownLeftIcon, PhoneIcon, VideoCameraIcon } from 'react-native-heroicons/solid'
import Calls from '@/assets/dummyData/calls.json'
import { ArrowUpRightIcon } from 'react-native-heroicons/outline'
import Animated, { CurvedTransition, FadeInDown, FadeInUp, FadeOutUp } from 'react-native-reanimated';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { SafeAreaView } from 'react-native-safe-area-context'

const transition = CurvedTransition.delay(100);

const formatCallDate = (dateString: string) => {
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



const calls = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredCalls, setFilteredCalls] = useState(Calls);

  useEffect(() => {
    if (selectedIndex === 1) {
      setFilteredCalls(Calls.filter((call) => call.missed));
    } else {
      setFilteredCalls(Calls);
    }
  }, [selectedIndex]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={className`bg-green-50 flex-1`}>
      <Header title='Calls'/>
      <SegmentedControl
        values={['All', 'Missed']}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        appearance='light'
        backgroundColor='white'
        tintColor='#48bb78'
        fontStyle={{
            color: 'black'
        }}
        activeFontStyle={{
          color : 'white'
        }}
        style={className`m-2 shadow-lg border border-gray-400 border-opacity-40 h-10`}
      />
      <ScrollView>
        <View>
          <Text style={className`my-2 px-4 text-gray-400`}>Favourites</Text>
          <View style={className`flex-row items-center border border-gray-400 border-opacity-40 bg-white p-4`}>
              <View style={className`flex justify-center rounded-full bg-green-100 mr-4 p-2`}>
                <HeartIcon style={className`text-green-500 `}/>
              </View>
              <Text style={className`font-semibold`}>Add Favourite</Text>
          </View>
        </View>
        <View >
          <Text style={className`my-2 px-4 text-gray-400`}>Recents</Text>
          <View style={className`border-t border-gray-400 border-opacity-40`}>
            <Animated.FlatList data={filteredCalls}
              skipEnteringExitingAnimations
              scrollEnabled={false}
              itemLayoutAnimation={transition}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item, index})=>(
                <Animated.View entering={FadeInUp.delay(index * 20)} exiting={FadeOutUp.delay(index * 20)} style={className`flex-row items-center border-b border-gray-400 border-opacity-40 bg-white p-4`}>
                    <Image style={className`bg-gray-400 rounded-full h-12 w-12 mr-4`} source={{uri:  item.img}}/>
                    <View style={className`gap-1`}>
                        { item.missed ?
                          <Text style={className`font-semibold text-red-500`}>{item.name}</Text> :
                          <Text style={className`font-semibold`}>{item.name}</Text>
                        }
                        <View style={className`flex-row`}>
                          { item.incoming ?
                            <ArrowDownLeftIcon style={item.missed ? className`text-red-500 h-4 w-4 mr-2`:  className`text-green-500 h-4 w-4 mr-2`}/> : 
                            <ArrowUpRightIcon style={item.missed ? className`text-red-500 h-4 w-4 mr-2`:  className`text-green-500 h-4 w-4 mr-2`}/>
                          }
                          <Text style={className`text-gray-400`}>{formatCallDate(item.date)}</Text>
                        </View>
                    </View>
                    <View style={className`flex-1`}/>
                    <View style={className`margin-auto`}>
                      {item.video ?
                        <PhoneIcon style={className`text-green-500`}/>:
                        <VideoCameraIcon style={className`text-green-500`}/>
                      }

                    </View>
                </Animated.View>
              )}
            />
        </View>
        </View>

        
        <View style={className`flex-row justify-center my-4`}>
          <Text style={className`text-gray-400`}>Your phone calls are </Text>
          <Text style={className`text-green-500`}>end-to-end encrypted</Text>
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>

  )
}

export default calls