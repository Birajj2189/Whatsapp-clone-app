import { View, Text, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import OtpHeader from '@/components/OtpHeader';
import className from 'twrnc';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useLocalSearchParams } from 'expo-router';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { SafeAreaView } from 'react-native-safe-area-context';

const CELL_COUNT = 6;

const VerifyOTPScreen = () => {
  const { phone, signin } = useLocalSearchParams<{ phone: string; signin: string }>();
  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  // clerk 
  const {signUp, setActive } = useSignUp();
  const {signIn} = useSignIn();

  useEffect(() => {
    if (code.length === 6) {
      console.log(code);
      if (signin === 'true') {
        console.log('signin');
        verifySignin();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  const verifyCode = async () => {
    // Add your verification logic here
    console.log('Verifying code...');
    try {
      await signUp!.attemptPhoneNumberVerification({
        code,
      });
      await setActive!({session:signUp!.createdSessionId});
    } catch (error) {
      console.log("error",error) ;
      if(isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].message);
      }
    }
  };

  const verifySignin = async () => {
    // Add your sign-in verification logic here
    try {
      await signIn!.attemptFirstFactor({
        strategy: 'phone_code',
        code,
      });
      await setActive!({session: signIn!.createdSessionId});
    } catch (error) {
      console.log("error", error);
      if(isClerkAPIResponseError(error)){
        Alert.alert(error.errors[0].message);
      }
      
    }
  };

  const resendCode = async () => {
    // Logic to resend OTP code
    console.log('Resending code...');
    try {
      if (signin === 'true') {
        const signInResponse = await signIn!.create({
          identifier: phone,
        });
  
        // Check if supportedFirstFactors is defined and not null
        const { supportedFirstFactors } = signInResponse || {};
        if (supportedFirstFactors && supportedFirstFactors.length > 0) {
          const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
            return factor.strategy === 'phone_code';
          });
          if (firstPhoneFactor) {
            const { phoneNumberId } = firstPhoneFactor;
            await signIn!.prepareFirstFactor({
              strategy: 'phone_code',
              phoneNumberId,
            });
          } else {
            Alert.alert('Error', 'Phone verification method not supported.');
          }
        } else {
          Alert.alert('Error', 'No supported phone verification methods found.');
        }
      } else {
        const signUpResponse = await signUp!.create({
          phoneNumber: phone,
        });
        signUpResponse && signUp!.preparePhoneNumberVerification();
      }
    } catch (error) {
      console.log('error', error);
      if (isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].message);
      }
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <KeyboardAvoidingView style={className`bg-green-50 flex-1`}>
      <OtpHeader title={phone} backNav={true} backNavTitle="Edit" />
      <View style={className`bg-green-50 flex`}>
        <Text style={className`p-4 text-center text-gray-800`}>
          We have sent you an SMS with a code to the number above
        </Text>
        <Text style={className`p-4 text-center text-gray-800`}>
          To complete your phone number verification, please enter the 6-digit authentication code
        </Text>
      </View>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        // autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <TouchableOpacity style={className`bg-transparent p-4`} onPress={resendCode}>
        <Text style={className`text-[#007AFF] text-center font-semibold text-lg`}>
          Didn't receive a verification code?
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: { marginTop: 20, alignItems: 'center' , padding: 15 ,gap:6},
  cell: {
    width: 35,
    height: 35,
    lineHeight: 35,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    borderRadius: 10,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  focusCell: {
    borderColor: '#48bb78',
  },
});

export default VerifyOTPScreen;
