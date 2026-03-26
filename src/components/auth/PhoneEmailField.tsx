import React from 'react';
import { Text, TextInput, View } from 'react-native';
import type { AuthSigninTab } from '@/types/auth';
import { sf, sh } from '@/utils/responsive';

export default function PhoneEmailField({
  activeTab,
}: {
  activeTab: AuthSigninTab;
}) {
  return (
    <View className="gap-y-2">
      <Text className="text-black text-[18px] font-semibold">
        {activeTab === 'phone' ? 'Phone number' : 'Email'}
      </Text>
      <TextInput
        placeholder={activeTab === 'phone' ? '0000000000' : 'example@email.com'}
        placeholderTextColor="#7D858E"
        keyboardType={activeTab === 'phone' ? 'phone-pad' : 'email-address'}
        style={{ fontSize: sf(12), paddingVertical: sh(8) }}
        className="text-[#7D858E] border-b border-[#E8EAED]"
      />
    </View>
  );
}

