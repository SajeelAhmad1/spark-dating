import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { EyeOff } from 'lucide-react-native';
import { sf, sh, sw } from '@/utils/responsive';

export default function PasswordField({
  password,
  onChangeText,
  showPassword,
  onToggleShowPassword,
}: {
  password: string;
  onChangeText: (v: string) => void;
  showPassword: boolean;
  onToggleShowPassword: () => void;
}) {
  return (
    <View className="gap-y-2">
      <Text className="text-black text-[18px] font-semibold">
        Password
      </Text>
      <View className="flex-row items-center border-b border-[#E8EAED]">
        <TextInput
          placeholder="••••••••••••"
          placeholderTextColor="#7D858E"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={onChangeText}
          style={{ fontSize: sf(12), paddingVertical: sh(8) }}
          className="flex-1 text-[#7D858E]"
        />
        <TouchableOpacity
          onPress={onToggleShowPassword}
          style={{ paddingLeft: sw(8) }}
        >
          <EyeOff size={sf(20)} color="#7D858E" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

