import React from 'react';
import { View, Text } from 'react-native';
import { Zap, Heart, Camera, Flame, MessageCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import PrimaryButton from '@/components/common/PrimaryButton';

// ─── Constants ────────────────────────────────────────────
const FEATURES = [
  {
    id: 'matches',
    label: 'Like Matches',
    icon: <Heart size={24} color="#E53935" fill="#E53935" />,
  },
  {
    id: 'snaps',
    label: 'Send Snaps',
    icon: <Camera size={24} color="#212121" />,
  },
  {
    id: 'streaks',
    label: 'Build Streaks',
    icon: <Flame size={24} color="#FF6D00" />,
  },
  {
    id: 'connect',
    label: 'Stay Connected',
    icon: <MessageCircle size={24} color="#1E78F5" fill="#1E78F5" />,
  },
];

// ─── Screen ───────────────────────────────────────────────
const LaunchScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-5 py-10">
        {/* ── Main Content ── */}
        <View className="flex-1 items-center justify-center gap-y-6">
          {/* Icon */}
          <View className="w-20 h-20 rounded-full bg-[#1E78F5] items-center justify-center">
            <Zap size={40} color="#ffffff" fill="#ffffff" />
          </View>

          {/* Title */}
          <Text
            style={{
              fontSize: 24,
              lineHeight: 24,
              letterSpacing: 0,
            }}
            className="text-black text-center font-semibold"
          >
            We're Live!
          </Text>

          {/* Subtitle */}
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              lineHeight: 24,
              letterSpacing: 0,
            }}
            className="text-[#7D858E] text-center"
          >
            SparkLink is officially live with{' '}
            <Text style={{ fontFamily: 'Poppins-Regular', color: '#1E78F5' }}>
              1000+ users
            </Text>{' '}
            🎉
          </Text>

          {/* Daily Stats Card */}
          <LinearGradient
            colors={['#1E78F51A', '#FBB2021A']}
            style={{ borderRadius: 16, width: '100%', padding: 16, gap: 8 }}
          >
            {/* Card Header */}
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                lineHeight: 16,
                letterSpacing: 0,
              }}
              className="text-black text-center"
            >
              Every Day You'll See
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 20,
                lineHeight: 20,
                letterSpacing: 0,
              }}
              className="text-[#1E78F5] text-center"
            >
              20 People
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                lineHeight: 16,
                letterSpacing: 0,
              }}
              className="text-[#555555] text-center"
            >
              Fresh matches to connect with
            </Text>

            {/* Feature Grid */}
            <View className="gap-y-3 mt-1">
              <View className="flex-row gap-x-2">
                {FEATURES.slice(0, 2).map(({ id, label, icon }) => (
                  <View
                    key={id}
                    className="flex-1 bg-white rounded-2xl items-center justify-center gap-y-2 py-4"
                  >
                    {icon}
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16,
                        lineHeight: 16,
                        letterSpacing: 0,
                      }}
                      className="text-[#7D858E]"
                    >
                      {label}
                    </Text>
                  </View>
                ))}
              </View>
              <View className="flex-row gap-x-2">
                {FEATURES.slice(2, 4).map(({ id, label, icon }) => (
                  <View
                    key={id}
                    className="flex-1 bg-white rounded-2xl items-center justify-center gap-y-2 py-4"
                  >
                    {icon}
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16,
                        lineHeight: 16,
                        letterSpacing: 0,
                      }}
                      className="text-[#7D858E]"
                    >
                      {label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Premium Banner */}
            <View className="items-center mt-1">
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                  lineHeight: 16,
                  letterSpacing: 0,
                }}
                className="text-black text-center"
              >
                Invite 2 friends to unlock premium features
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* ── Bottom: Action ── */}
        <PrimaryButton
          title="Let's Find your Spark!"
          onPress={() => navigation.navigate('NumberInputScreen')}
          colors={['#1E78F5', '#FBB202']}
          variant="gradient"
        />
      </View>
    </SafeAreaView>
  );
};

export default LaunchScreen;
