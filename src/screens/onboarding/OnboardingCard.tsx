import React from 'react';
import { View, Text } from 'react-native';
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
    <View
      className="bg-white rounded-t-[32px] pt-12 pb-10 shadow-lg"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
        elevation: 10,
      }}
    >
      {/* Title */}
      <Text
        className="text-[24px] font-semibold text-center text-[#000000] px-5 mb-2"
        style={{ lineHeight: 30 }}
      >
        {title}
      </Text>

      {/* Subtitle */}
      <Text
        className="text-[16px] text-[#7D858E] text-center px-5 mb-10"
        style={{ lineHeight: 20 }}
      >
        {subtitle}
      </Text>

      {/* Dots */}
      <View className="flex-row justify-center items-center mb-6" style={{ gap: 6 }}>
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
        />
      </View>
    </View>
  );
};

export default OnboardingCard;
