import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/components/common/PrimaryButton';

const NumberVerifyScreen = ({navigation}: any) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-4 pb-6 mt-20">

        {/* ── Header ── */}
        <View className="mt-16 gap-y-2">
          <Text className="text-black text-[28px] leading-[28px] font-semibold">
            Verify Your Number
          </Text>
          <Text className="text-[#7D858E] text-[15px] leading-[15px] font-normal">
            Enter the 4 digit code
          </Text>
        </View>

        {/* ── OTP Inputs ── */}
        <View className="mt-8 flex-row gap-x-4 justify-center">
          {code.map((digit, index) => (
            <TextInput
              key={index}
            //   ref={(ref) => (inputs.current[index] = ref)}
              value={digit}
              onChangeText={(text) => handleChange(text.slice(-1), index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              className="text-black text-[20px] font-semibold text-center"
              style={{
                width: 56,
                height: 56,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#B6B9C9',
              }}
            />
          ))}
        </View>

        {/* ── Verify Button ── */}
        <View className="mt-8">
          <PrimaryButton
            title="Verify"
            onPress={() => {navigation.navigate("VerificationSuccessScreen")}}
            colors={['#1E78F5', '#FBB202']}
            variant="gradient"
            style={{ alignSelf: 'stretch' }}
          />
        </View>

        {/* ── Resend Code ── */}
        <TouchableOpacity className="mt-4 items-center" onPress={() => {}}>
          <Text className="text-[#1E78F5] text-[16px] leading-[16px] font-medium">
            Resend Code
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default NumberVerifyScreen;
