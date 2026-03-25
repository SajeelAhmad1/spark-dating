import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/components/common/PrimaryButton';

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
        <Text className="text-black text-[22px] font-semibold leading-[22px] mb-8">
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
          />
        </View>

        {/* ── Terms ── */}
        <TouchableOpacity className="mt-4" onPress={() => {}}>
          <Text className="text-[#7D858E] text-[14px] font-normal">
            Agree our{' '}
            <Text className="text-[#1E78F5] font-medium">Terms & Condition</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default VerificationSuccessScreen;
