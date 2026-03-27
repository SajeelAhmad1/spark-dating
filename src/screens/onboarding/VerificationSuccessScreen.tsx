import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/components/common/PrimaryButton';
import { sf } from '@/utils/responsive';

const VerificationSuccessScreen = ({navigation}: any) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pb-6 items-center mt-24">

        {/* ── Check Icon ── */}
        <View
          className="items-center justify-center mb-6"
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#4CD964',
          }}
        >
          <Check size={40} color="#FFFFFF" strokeWidth={3} />
        </View>

        {/* ── Title ── */}
        <Text className="text-black font-semibold leading-[24px] tracking-[0px] mb-8"
        style={{ fontSize: sf(24), lineHeight: sf(24), letterSpacing: 0 }}
        >
          Your Number is verified.
        </Text>

        {/* ── Continue Button ── */}
        <View className="w-full">
          <PrimaryButton
            title="Continue"
            onPress={() => {navigation.navigate("ProfileSetupScreen")}}
            colors={['#1E78F5', '#FBB202']}
            variant="gradient"
            style={{ alignSelf: 'stretch' }}
            textStyle={{fontSize: sf(20), fontWeight: '500', lineHeight: sf(20), letterSpacing: 0}}
          />
        </View>

        {/* ── Terms ── */}
        <TouchableOpacity className="mt-4" onPress={() => {}}>
          <Text className="text-[#7D858E] font-normal leading-[100%] tracking-[0%]" 
          style={{ fontSize: sf(16), lineHeight: sf(16), letterSpacing: 0 }}
          >
            Agree our{' '}
            <Text className="text-[#1E78F5] underline">Terms & Condition</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default VerificationSuccessScreen;
