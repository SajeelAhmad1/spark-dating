import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '@/components/common/PrimaryButton';
import { sf, sh } from '@/utils/responsive';

export default function SignInBottomActions({
  onLogin,
}: {
  onLogin: () => void;
}) {
  return (
    <>
      <View className="gap-y-4 items-center" style={{ marginTop: sh(12) }}>
        <PrimaryButton
          title="Login"
          onPress={onLogin}
          colors={['#1E78F5', '#FBB202']}
          variant="gradient"
          style={{ alignSelf: 'stretch' }}
        />

        <Text style={{ fontSize: sf(15) }} className="text-black">
          Don't have an account?{' '}
          <Text className="text-[#1E78F5]">Sign Up</Text>
        </Text>
      </View>

      <View className="flex-1 justify-end items-center">
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ fontSize: sf(15) }} className="text-[#7D858E]">
            Need Help?
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

