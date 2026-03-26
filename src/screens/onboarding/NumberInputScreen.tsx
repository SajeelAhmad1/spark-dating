import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CountryPicker } from 'react-native-country-codes-picker';
import PrimaryButton from '@/components/common/PrimaryButton';

const NumberEnterScreen = ({navigation}: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [show, setShow] = useState(false);

  // ✅ Store full country object
  const [country, setCountry] = useState({
    flag: '🇳🇱',
    dial_code: '+31',
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-4 mt-20 pb-6">

        {/* ── Header ── */}
        <View className="mt-16 gap-y-2">
          <Text className="text-black text-[28px] leading-[100%] tracking-[0%] font-semibold">
            My mobile number
          </Text>
          <Text className="text-[#7D858E] text-[15px] font-normal leading-[100%] tracking-[0%]">
            Your streak is waiting 🔥
          </Text>
        </View>

        {/* ── Phone Input ── */}
        <View className="mt-8 flex-row items-center border border-[#E8EAED] rounded-xl px-4 py-3 gap-x-3">
          
          {/* Country Selector */}
          <TouchableOpacity
            className="flex-row items-center gap-x-1"
            onPress={() => setShow(true)}
          >
            <Text className="text-[20px]">{country.flag}</Text>
            <Text className="text-black text-[16px] leading-[24px]">
              {country.dial_code}
            </Text>
            <ChevronDown size={16} color="#000000" />
          </TouchableOpacity>

          {/* Divider */}
          <View className="w-[1px] h-5 bg-[#E8EAED]" />

          {/* Number Input */}
          <TextInput
            placeholder="300 1234567"
            placeholderTextColor="#7D858E"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            className="flex-1 text-black text-[16px] leading-[150%] tracking-[0px] font-medium"
          />
        </View>

        {/* ── Helper Text ── */}
        <Text className="text-[#7D858E] text-[15px] font-normal leading-[100%] tracking-[0%] mt-4">
          We'll text you a code to verify you're really you. Message and data
          rates may apply.{' '}
          <Text className="text-[#7D858E]">
            What happens if your number changes?
          </Text>
        </Text>

        {/* ── Button ── */}
        <View className="mt-6">
          <PrimaryButton
            title="Send verification Code"
            onPress={() => navigation.navigate('NumberVerifyScreen')}
            colors={['#1E78F5', '#FBB202']}
            variant="gradient"
            style={{ alignSelf: 'stretch' }}
            textStyle={{color: '#ffffff', fontSize: 20, fontWeight: '500', lineHeight: 20, letterSpacing: 0}}
          />
        </View>

        {/* ── Already have account ── */}
        <View className="mt-4 items-center">
          <Text className="text-[#7D858E] text-[16px] leading-[100%] tracking-[0%]">
            Already have an account?{' '}
            <Text className="text-[#1E78F5] underline font-medium">Login</Text>
          </Text>
        </View>
      </View>

      {/* ── Country Picker ── */}
      <CountryPicker
        lang="en"
        show={show}
        pickerButtonOnPress={(item) => {
          setCountry(item);
          setShow(false);
        }}
      />
    </SafeAreaView>
  );
};

export default NumberEnterScreen;
