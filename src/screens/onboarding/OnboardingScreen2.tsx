import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingCard from './OnboardingCard';
// import StreakImage1 from '@/assets/images/streakImage1.png';
// import StreakImage2 from '@/assets/images/streakImage2.png';
import CameraIcon from '@/assets/images/cameraIcon.svg';
export default function Onboarding2({ navigation }: any) {
  return (
    <SafeAreaView className="flex-1 bg-[#EBEBEB]" edges={['top']}>
      {/* ── Illustration area ── */}
      <View className="flex-1 relative items-center justify-center overflow-hidden">
        {/* Left phone — rotated left, anchored to left edge */}
        <View className="absolute left-[-18px] top-40 -translate-y-32 z-10">
            {/* <StreakImage1 width={172} height={353} /> */}
        </View>

        {/* 🔥 upper — sits upper-right of camera icon */}
        <Text
          className="absolute text-[22px] z-20"
          style={{ top: '30%', left: '36%' }}
        >
          🔥
        </Text>

        {/* Center camera circle with blue glow */}
        <View className="z-30 w-[76px] h-[76px] rounded-full bg-[#E8F0FF] items-center justify-center">
          <CameraIcon width={68} height={68} />
        </View>

        {/* 🔥 lower — sits lower-left of camera icon */}
        <Text
          className="absolute text-[22px] z-20"
          style={{ top: '60%', left: '51%' }}
        >
          🔥
        </Text>

        {/* Right phone — rotated right, anchored to right edge */}
        <View className="absolute right-[-4px] top-24 z-10">
            {/* <StreakImage2 width={172} height={353} /> */}
        </View>
      </View>

      {/* ── Bottom card ── */}
      <OnboardingCard
        title="Build Streaks 🔥"
        subtitle="Break the ice with a photo. It's the spark that starts every conversation."
        activeDot={1}
        buttonLabel="Next"
        onPress={() => navigation.navigate('Onboarding3')}
      />
    </SafeAreaView>
  );
}
