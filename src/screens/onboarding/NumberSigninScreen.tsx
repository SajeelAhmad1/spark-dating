import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ChevronLeft, EyeOff } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/components/common/PrimaryButton';

const NumberSignInScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'phone' | 'email'>('phone');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-4 pb-6">

        {/* ── Back Button ── */}
        <TouchableOpacity className="w-8 h-8" onPress={() => {}}>
          <ChevronLeft size={24} color="#000000" />
        </TouchableOpacity>

        {/* ── Header ── */}
        <View className="gap-y-2" style={{ marginTop: 48 }}>
          <Text className="text-black text-[28px] leading-[34px]">
            Welcome Back!
          </Text>
          <Text className="text-[#7D858E] text-[14px] leading-[20px]">
            Please enter your number & password to signin
          </Text>
        </View>

        {/* ── Tabs ── */}
        <View className="flex-row mt-6 gap-x-6">
          <TouchableOpacity onPress={() => setActiveTab('phone')} className="gap-y-1 pb-1">
            <Text className={`text-[16px] ${activeTab === 'phone' ? 'text-[#FBB202]' : 'text-[#7D858E]'}`}>
              Phone number
            </Text>
            {activeTab === 'phone' && <View className="h-[2px] bg-[#FBB202] rounded-full" />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('email')} className="gap-y-1 pb-1">
            <Text className={`text-[16px] ${activeTab === 'email' ? 'text-[#FBB202]' : 'text-[#7D858E]'}`}>
              Email
            </Text>
            {activeTab === 'email' && <View className="h-[2px] bg-[#FBB202] rounded-full" />}
          </TouchableOpacity>
        </View>

        {/* ── Fields ── */}
        <View className="mt-6 gap-y-5">

          {/* Phone / Email */}
          <View className="gap-y-2">
            <Text className="text-black text-[16px]">
              {activeTab === 'phone' ? 'Phone number' : 'Email'}
            </Text>
            <TextInput
              placeholder={activeTab === 'phone' ? '0000000000' : 'example@email.com'}
              placeholderTextColor="#7D858E"
              keyboardType={activeTab === 'phone' ? 'phone-pad' : 'email-address'}
              className="text-[#7D858E] text-[13px] border-b border-[#E8EAED] py-2"
            />
          </View>

          {/* Password */}
          <View className="gap-y-2">
            <Text className="text-black text-[16px]">
              Password
            </Text>
            <View className="flex-row items-center border-b border-[#E8EAED]">
              <TextInput
                placeholder="••••••••••••"
                placeholderTextColor="#7D858E"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                className="flex-1 text-[#7D858E] text-[13px] py-2"
              />
              <TouchableOpacity onPress={() => setShowPassword(p => !p)} className="pl-2">
                <EyeOff size={20} color="#7D858E" />
              </TouchableOpacity>
            </View>
          </View>

        </View>

        {/* ── Remember me / Forgot password ── */}
        <View className="flex-row items-center justify-between mt-5">
          <TouchableOpacity onPress={() => setRememberMe(r => !r)} className="flex-row items-center gap-x-2">
            <View className={`w-[18px] h-[18px] rounded-sm border border-[#1E78F5] items-center justify-center ${rememberMe ? 'bg-[#1E78F5]' : 'bg-transparent'}`}>
              {rememberMe && (
                <Text className="text-white text-[11px] leading-[13px]">✓</Text>
              )}
            </View>
            <Text className="text-black text-[13px]">
              Remember me
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text className="text-[#1E78F5] text-[13px]">
              Forgot password!
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Bottom Actions ── */}
        <View className="gap-y-4 items-center" style={{ marginTop: 12 }}>
          <PrimaryButton
            title="Login"
            onPress={() => navigation.navigate('InviteScreen')}
            colors={['#1E78F5', '#FBB202']}
            variant="gradient"
            style={{ alignSelf: 'stretch' }}
          />

          <Text className="text-black text-[15px]">
            Don't have an account?{' '}
            <Text className="text-[#1E78F5]">Sign Up</Text>
          </Text>
        </View>

        {/* ── Need Help ── */}
        <View className="flex-1 justify-end items-center">
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-[#7D858E] text-[15px]">
              Need Help?
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default NumberSignInScreen;
