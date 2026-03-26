import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingCard from './OnboardingCard';
// import Chat from '@/assets/images/chat.png';
// import ChatLocked from '@/assets/images/chatLocked.png';
import Loading from '@/assets/images/loading.svg';

export default function Onboarding3({ navigation }: any) {
  return (
    <SafeAreaView className="flex-1 bg-[#EBEBEB]" edges={['top']}>
      {/* ── Illustration area ── */}
      <View className="flex-1 relative items-center justify-center overflow-hidden">
        {/* Left phone — rotated left, anchored to left edge */}
        <View className="absolute left-[-18px] top-40 -translate-y-32 z-10">
          {/* <ChatLocked width={172} height={353} /> */}
        </View>

        {/* Center loading circle with blue glow */}
        <View className="z-30 w-[76px] h-[76px] rounded-full bg-[#E8F0FF] items-center justify-center">
          <Loading width={68} height={68} />
        </View>

        {/* Right phone — rotated right, anchored to right edge */}
        <View className="absolute right-[-4px] top-24 z-10">
          {/* <Chat width={172} height={353} /> */}
        </View>
      </View>

      {/* ── Bottom card ── */}
      <OnboardingCard
        title="Build Streaks 🔥"
        subtitle="Break the ice with a photo. It's the spark that starts every conversation."
        activeDot={2}
        buttonLabel="Get Started"
        onPress={() => navigation.navigate('LogoScreen')}
      />
    </SafeAreaView>
  );
}
