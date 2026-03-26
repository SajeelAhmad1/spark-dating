import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AuthSigninTab } from '@/types/auth';
import SignInTabs from '@/components/auth/SignInTabs';
import PhoneEmailField from '@/components/auth/PhoneEmailField';
import PasswordField from '@/components/auth/PasswordField';
import RememberMeToggle from '@/components/auth/RememberMeToggle';
import SignInBottomActions from '@/components/auth/SignInBottomActions';

export default function SignInScreen({
  navigation,
  route,
}: {
  navigation: any;
  route?: { params?: { defaultTab?: AuthSigninTab } };
}) {
  const initialTab = route?.params?.defaultTab ?? 'phone';

  const [activeTab, setActiveTab] = useState<AuthSigninTab>(initialTab);
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-4 pb-6">
        {/* Back Button */}
        <TouchableOpacity style={{ width: 32, height: 32 }} onPress={() => {}}>
          <ChevronLeft size={24} color="#000000" />
        </TouchableOpacity>

        {/* Header */}
        <View className="gap-y-2" style={{ marginTop: 48 }}>
          <Text className="text-black text-[28px] font-semibold leading-[100%] tracking-[0%]">
            Welcome Back!
          </Text>
          <Text className="text-[#7D858E] text-[15px] leading-[100%] tracking-[0%]">
            Please enter your number & password to signin
          </Text>
        </View>

        {/* Tabs */}
        <SignInTabs
          activeTab={activeTab}
          onTabChange={t => setActiveTab(t)}
        />

        {/* Fields */}
        <View className="mt-6 gap-y-5">
          <PhoneEmailField activeTab={activeTab} />
          <PasswordField
            password={password}
            onChangeText={setPassword}
            showPassword={showPassword}
            onToggleShowPassword={() => setShowPassword(p => !p)}
          />
        </View>

        {/* Remember me / Forgot password */}
        <View className="flex-row items-center justify-between mt-5">
          <RememberMeToggle
            rememberMe={rememberMe}
            onToggle={() => setRememberMe(r => !r)}
          />

          <TouchableOpacity onPress={() => {}}>
            <Text className="text-[#1E78F5] text-[14px] font-medium leading-[100%]">
              Forgot password!
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Actions */}
        <SignInBottomActions
          onLogin={() => navigation.navigate('EnableLocationScreen')}
        />
      </View>
    </SafeAreaView>
  );
}

