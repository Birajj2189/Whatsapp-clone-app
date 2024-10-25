import { View, Text, KeyboardAvoidingView, Linking, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import className from 'twrnc'
import OtpHeader from '@/components/OtpHeader'
import { ChevronRightIcon } from 'react-native-heroicons/solid'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaskInput from 'react-native-mask-input';
import { Colors } from '@/constants/Colors'
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo'

const OtpScreen = () => {
    const [phoneNumber , setPhoneNumber ] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const openLink = () =>{
        Linking.openURL('https://www.whatsapp.com/legal/terms-of-service')
    }
    // clerk 
    const {signUp,setActive } = useSignUp();
    const {signIn} = useSignIn();



    const sendOTP = async () => {
        console.log('sendOTP', phoneNumber);
        setLoading(true);

        try {
            await signUp!.create({
                phoneNumber
            });
            console.log('TESafter createT: ', signUp!.createdSessionId);
            signUp!.preparePhoneNumberVerification();
            console.log('after prepare: ');
            router.push(`/verify/${phoneNumber}`);
        } catch (error) {
            console.log('error', JSON.stringify(error, null, 2));
            if(isClerkAPIResponseError(error)){
                if(error.errors[0].code === 'form_identifier_exists'){
                    console.log('user exists');
                    await trySignIn();
                }else{
                    setLoading(false);
                    Alert.alert('Error', error.errors[0].message);
                }
            }
        }finally{
            setLoading(false);
        }
    }
    const trySignIn = async () => {
        console.log('trySignIn', phoneNumber);
        // Your Sign-in logic here
        const {supportedFirstFactors} = await signIn!.create({
            identifier: phoneNumber
        });
        const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
            return factor.strategy === 'phone_code';
          });
        const {phoneNumberId} = firstPhoneFactor;
        await signIn!.prepareFirstFactor({
            strategy: 'phone_code',
            phoneNumberId,
        });
        router.push(`/verify/${phoneNumber}?sigin=true`);
        setLoading(false);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={className`flex-1 bg-green-50`}>
            <OtpHeader title="Phone number" backNav={false}/>
            {
                loading ? (
                    <View style={className`flex-1 justify-center items-center`}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                        <Text style={className`mt-2 text-sm`}>Sending code...</Text>
                    </View>
                ) : (
                    <>
                        <Text style={className`px-4 mt-4 text-sm text-gray-400 font-semibold`}>
                            Please confirm your country code and enter your phone number
                        </Text>
                        <View style={className`bg-white mx-4 flex rounded-md mt-4 shadow-sm`}>
                            <View style={className`flex-row justify-between items-center border-gray-300 border-b-[1px] p-2`}>
                                <Text style={className`text-green-500 text-lg font-semibold`}>India</Text>
                                <ChevronRightIcon style={className`text-gray-400`} />
                            </View>
                            <View style={className`p-2 flex-row`}>
                                <MaskInput
                                    style={className`text-lg mr-4 text-gray-500 font-semibold`}
                                    keyboardType='numeric'
                                    autoFocus
                                    placeholder='+91 xxxxx-xxxxx'
                                    value={phoneNumber}
                                    onChangeText={(masked, unmasked) => {
                                        setPhoneNumber(masked); // you can use the unmasked value as well
                                    }}
                                    mask={['+', '9', '1', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]}
                                />
                            </View>
                        </View>
                        <Text style={className`px-4 text-center text-sm mt-4`}>
                            Read our <Text onPress={openLink} style={className`text-[#007AFF]`}>Privacy Policy</Text>. Tap "Agree and Continue" to accept the <Text onPress={openLink} style={className`text-[#007AFF]`}>Terms and Service</Text>.
                        </Text>
                        <View style={className`flex-1`}></View>
                        <TouchableOpacity
                            onPress={sendOTP}
                            style={[
                                phoneNumber.trim() 
                                    ? className`bg-green-500 mx-4 rounded-md p-2` 
                                    : className`bg-gray-300 mx-4 rounded-md p-2`,
                                { marginBottom: 16 }
                            ]}
                            disabled={!phoneNumber.trim()} // Disable button when phoneNumber is empty or just spaces
                        >
                            <Text style={phoneNumber.trim() ? className`text-white text-center text-lg font-semibold` : className`text-gray-500 text-center text-lg font-semibold`}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </>
                )
            }
        </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

export default OtpScreen;
