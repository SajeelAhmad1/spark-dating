import React from 'react';
import { View, Text } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import PrimaryButton from '@/components/common/PrimaryButton';
import { Colors } from '@/theme';

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
      distance={24}
      startColor="#00000040"
      offset={[0, 12]}
      sides={{ top: true, bottom: false, start: false, end: false }}
      style={{ width: '100%', height: '40%' }}
    >
<<<<<<< Updated upstream
      {/* Title */}
      <Text
        className="text-[24px] font-semibold text-center text-[#000000] px-5 mb-2"
        style={{ lineHeight: 30 }}
=======
      <View
        className="bg-white rounded-t-[32px] pt-12 pb-10"
        style={{ width: '100%' }}
>>>>>>> Stashed changes
      >
        {/* Title */}
        <Text
          className="text-[24px] font-semibold text-center text-[#000000] px-5 mb-2"
          style={{ lineHeight: 32, letterSpacing: 0 }}
        >
          {title}
        </Text>

<<<<<<< Updated upstream
      {/* Subtitle */}
      <Text
        className="text-[16px] text-[#7D858E] text-center px-5 mb-10"
        style={{ lineHeight: 20 }}
      >
        {subtitle}
      </Text>
=======
        {/* Subtitle */}
        <Text
          className="text-[16px] font-normal text-[#7D858E] text-center px-5"
          style={{ lineHeight: 20, letterSpacing: 0, height: 80 }}
        >
          {subtitle}
        </Text>
>>>>>>> Stashed changes

        {/* Dots */}
        <View className="flex-row justify-center items-center mb-4" style={{ gap: 6 }}>
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
            textStyle={{ fontSize: 18, fontWeight: '500', lineHeight: 18, letterSpacing: 0 }}
          />
        </View>
      </View>
<<<<<<< Updated upstream

      {/* Button */}
      <View className="px-5">
        <PrimaryButton
          title={buttonLabel}
          onPress={onPress}
          colors={[Colors.gradientStart, Colors.gradientEnd]}
        />
      </View>
    </View>
=======
    </Shadow>
>>>>>>> Stashed changes
  );
};

export default OnboardingCard;
