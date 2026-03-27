import React from 'react';
import { View, Text } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import PrimaryButton from '@/components/common/PrimaryButton';
import { Colors } from '@/theme';
import { sf } from '@/utils/responsive';

interface Props {
  title: string;
  subtitle: string;
  activeDot: 0 | 1 | 2;
  buttonLabel: string;
  onPress: () => void;
}

const OnboardingCard: React.FC<Props> = ({
  title,
  subtitle,
  activeDot,
  buttonLabel,
  onPress,
}) => {
  return (
    <Shadow
      // distance={24}
      // startColor="#00000040"
      // offset={[0, -2]}
        distance={10}
  offset={[0, 0]}
  // startColor="rgba(0,0,0,0.25)"
  endColor="rgba(0,0,0,0)"
      sides={{ top: true, bottom: false, start: false, end: false }}
      style={{ width: '100%' }}
    >
      <View
        className="bg-white rounded-t-[32px] pt-10 pb-8 min-h-[300px] "
        style={{ width: '100%' }}
      >
       <View className="" style={{ width: '100%' }}>
         {/* Title */}
        <Text
          className="font-semibold text-center text-[#000000] px-6 mb-2"
          style={{ fontSize: sf(24), lineHeight: sf(32), letterSpacing: 0, }}
        >
          {title}
        </Text>

        {/* Subtitle */}
        <Text
          className=" font-normal text-[#7D858E] text-center px-10"
          style={{ fontSize: sf(16), lineHeight: sf(20), letterSpacing: 0, height: sf(80) }}
        >
          {subtitle}
        </Text>
       </View>

        <View className="flex-1 justify-end " style={{ width: '100%' }}>
          {/* Dots */}
        <View className="flex-row justify-center items-center mb-5" style={{ gap: 6 }}>
          {[0, 1, 2].map(i => (
            <View
              key={i}
              style={{
                height: 8,
                width: i === activeDot ? 24 : 8,
                borderRadius: 4,
                backgroundColor: i === activeDot ? '#1E78F5' : '#B6B9C9',
              }}
            />
          ))}
        </View>

        {/* Button */}
        <View className="px-5">
          <PrimaryButton
            title={buttonLabel}
            onPress={onPress}
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            textStyle={{ fontSize: sf(18), fontWeight: '500', lineHeight: sf(18), letterSpacing: 0 }}
          />
        </View>
        </View>
      </View>
    </Shadow>
  );
};

export default OnboardingCard;
