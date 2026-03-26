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
      <Text style={{ fontSize: sf(16) }} className="text-black">
        {activeTab === 'phone' ? 'Phone number' : 'Email'}
      </Text>
      <TextInput
        placeholder={activeTab === 'phone' ? '0000000000' : 'example@email.com'}
        placeholderTextColor="#7D858E"
        keyboardType={activeTab === 'phone' ? 'phone-pad' : 'email-address'}
        style={{ fontSize: sf(13), paddingVertical: sh(8) }}
        className="text-[#7D858E] border-b border-[#E8EAED]"
      />
    </View>
  );
}

