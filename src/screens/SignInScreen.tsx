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
import { useZodForm } from '@/utils/form';
import {
  signInSchema,
  phoneNumberSchema,
  emailSchema,
  passwordSchema,
  rememberMeSchema,
} from '@/validations/auth';
import { sf } from '@/utils/responsive';

export default function SignInScreen({
  navigation,
  route,
}: {
  navigation: any;
  route?: { params?: { defaultTab?: AuthSigninTab } };
}) {
  const initialTab = route?.params?.defaultTab ?? 'phone';

  const [activeTab, setActiveTab] = useState<AuthSigninTab>(initialTab);
  const [showPassword, setShowPassword] = useState(false);

  const { watch, setValue, getValues } = useZodForm(signInSchema, {
    defaultValues: {
      phoneNumber: '',
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const phoneNumber = watch('phoneNumber');
  const email = watch('email');
  const password = watch('password');
  const rememberMe = watch('rememberMe');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-6 pb-4">
        {/* Back Button */}
        <TouchableOpacity style={{ width: 32, height: 32 }} onPress={() => {}}>
          <ChevronLeft size={24} color="#000000" />
        </TouchableOpacity>

        {/* Header */}
        <View className="gap-y-2" style={{ marginTop: 48 }}>
          <Text className="text-black font-semibold leading-[100%] tracking-[0%]"
          style={{ fontSize: sf(28), lineHeight: sf(28), letterSpacing: 0 }}
          >
            Welcome Back!
          </Text>
          <Text className="text-[#7D858E]  leading-[100%] tracking-[0%]"
          style={{ fontSize: sf(15), lineHeight: sf(15), letterSpacing: 0 }}
          >
            Please enter your number & password to signin
          </Text>
        </View>

        {/* Tabs */}
        <SignInTabs
          activeTab={activeTab}
          onTabChange={t => setActiveTab(t)}
        />

        {/* Fields */}
        <View className="pt-8">
          <PhoneEmailField
            activeTab={activeTab}
            value={activeTab === 'phone' ? phoneNumber : email}
            onChangeText={v =>
              setValue(activeTab === 'phone' ? 'phoneNumber' : 'email', v)
            }
          />
          <PasswordField
            password={password}
            onChangeText={v => setValue('password', v)}
            showPassword={showPassword}
            onToggleShowPassword={() => setShowPassword(p => !p)}
          />
        </View>

        {/* Remember me / Forgot password */}
        <View className="flex-row items-center justify-between mt-5">
          <RememberMeToggle
            rememberMe={rememberMe}
            onToggle={() => setValue('rememberMe', !getValues().rememberMe)}
          />

          <TouchableOpacity onPress={() => {}}>
            <Text className="text-[#1E78F5] font-medium leading-[100%]"
          style={{ fontSize: sf(14),  }}
            >
              Forgot password!
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Actions */}
        <SignInBottomActions
          onLogin={() => {
            const values = getValues();
            const contact =
              activeTab === 'phone' ? values.phoneNumber : values.email;

            const contactSchema =
              activeTab === 'phone'
                ? phoneNumberSchema
                : emailSchema;

            const contactResult = contactSchema.safeParse(contact);
            const passwordResult = passwordSchema.safeParse(values.password);
            const rememberResult = rememberMeSchema.safeParse(values.rememberMe);

            // Keep existing behavior; only run validation for correctness.
            if (!contactResult.success || !passwordResult.success || !rememberResult.success) {
              // eslint-disable-next-line no-console
              console.warn('Sign-in validation failed', {
                contactError: contactResult.success ? null : contactResult.error.flatten(),
                passwordError: passwordResult.success ? null : passwordResult.error.flatten(),
                rememberError: rememberResult.success ? null : rememberResult.error.flatten(),
              });
            }

            navigation.navigate('EnableLocationScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

