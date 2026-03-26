import React from 'react';
import { View, Text } from 'react-native';
import { Share2, Bell, Users2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/components/common/PrimaryButton';

// ─── Constants ────────────────────────────────────────────
const CURRENT = 454;
const TARGET = 1000;
const REMAINING = TARGET - CURRENT;
const PROGRESS = (CURRENT / TARGET) * 100;

// ─── Screen ───────────────────────────────────────────────
const WaitingScreen = ({ navigation }: any) => (
  <SafeAreaView className="flex-1 bg-white">
    <View className="flex-1 px-5 py-10">

      {/* ── Main Content ── */}
      <View className="flex-1 items-center justify-center gap-y-6">

        {/* Icon */}
        <View className="w-20 h-20 rounded-full bg-[#1E78F5] items-center justify-center">
          <Users2 width={40} height={40} color="#ffffff" />
        </View>

        {/* Title */}
        <Text
          style={{ fontSize: 24, lineHeight: 24, letterSpacing: 0 }}
          className="text-black text-center font-semibold"
        >
          We're Almost There! 🚀
        </Text>

        {/* Subtitle */}
        <Text
          style={{ fontFamily: 'Poppins-Regular', fontSize: 16, lineHeight: 16, letterSpacing: 0 }}
          className="text-[#7D858E] text-center"
        >
          Spark goes live when{' '}
          <Text style={{ fontFamily: 'Poppins-Medium', color: '#1E78F5' }}
          className='font-medium'
          >
            {TARGET.toLocaleString()} people
          </Text>{' '}
          join. Invite friends to speed it up!
        </Text>

        {/* Progress */}
        <View className="w-full gap-y-2">
          <View className="flex-row items-center justify-between">
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, lineHeight: 16, letterSpacing: 0 }} className="text-black">
              Launch Progress
            </Text>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, lineHeight: 16, letterSpacing: 0 }} className="text-[#1E78F5]">
              {CURRENT}/{TARGET}
            </Text>
          </View>

          <View className="w-full h-2 rounded-full bg-[#E8EAED] overflow-hidden">
            <View
              className="h-full rounded-full bg-[#1E78F5]"
              style={{ width: `${PROGRESS}%` }}
            />
          </View>

          <Text
            style={{ fontFamily: 'Poppins-Medium', fontSize: 14, lineHeight: 20, letterSpacing: 0 }}
            className="text-[#DC9B00] text-right"
          >
            {REMAINING} more to go!
          </Text>
        </View>

        {/* Notification Card */}
        <View
          className="w-full flex-row items-center rounded-2xl bg-[#EDEDED] px-4 py-4"
        >
          <View
            className="w-[40px] h-[40px] rounded-full items-center justify-center shrink-0"
            style={{ backgroundColor: '#FBB20233', borderWidth: 0.4, borderColor: '#DC9B00' }}
          >
            <Bell size={24} color="#DC9B00" />
          </View>
          <View className="flex-1 shrink ml-2">
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, lineHeight: 16, letterSpacing: 0 }} className="text-black">
              You'll be notified
            </Text>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, lineHeight: 13, letterSpacing: 0 }} className="text-[#555555]">
              We will send you a notification when we reach {TARGET} users
            </Text>
          </View>
        </View>

      </View>

      {/* ── Bottom: Action ── */}
      <PrimaryButton
        title="Invite Friends to Speed Up"
        onPress={() => navigation.navigate("LaunchScreen")}
        colors={['#1E78F5', '#DC9B00']}
        variant="gradient"
        icon={<Share2 size={20} color="#ffffff" />}
        iconPosition="start"
        textStyle={{fontSize: 18, fontWeight: '500', lineHeight: 18, letterSpacing: 0, color: '#ffffff'}}
      />

    </View>
  </SafeAreaView>
);

export default WaitingScreen;
