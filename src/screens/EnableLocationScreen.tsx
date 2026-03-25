import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';

// ── Custom Toggle ──────────────────────────────────────────
const TRACK_WIDTH = 46;
const TRACK_HEIGHT = 26;
const THUMB_SIZE = 20;
const THUMB_MARGIN = 3;

const CustomToggle = ({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: (v: boolean) => void;
}) => {
  const translateX = useRef(
    new Animated.Value(
      value ? TRACK_WIDTH - THUMB_SIZE - THUMB_MARGIN : THUMB_MARGIN,
    ),
  ).current;

  const toggle = () => {
    const toValue = value
      ? THUMB_MARGIN
      : TRACK_WIDTH - THUMB_SIZE - THUMB_MARGIN;
    Animated.spring(translateX, {
      toValue,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
    onValueChange(!value);
  };

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={toggle}>
      <View
        style={{
          width: TRACK_WIDTH,
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT / 2,
          backgroundColor: value ? '#1E78F533' : '#E5E5E5',
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: THUMB_SIZE / 2,
            backgroundColor: '#ffffff',
            transform: [{ translateX }],
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

// ── Location Icon ──────────────────────────────────────────
const LocationIcon = () => (
  <Svg width={80} height={88} viewBox="0 0 80 88" fill="none">
    <Path
      d="M40 4C25.088 4 13 16.088 13 31C13 50.25 40 76 40 76C40 76 67 50.25 67 31C67 16.088 54.912 4 40 4Z"
      fill="#FBB202"
      fillOpacity={0.15}
      stroke="#FBB202"
      strokeWidth={3}
    />
    <Circle cx={40} cy={31} r={10} fill="#FBB202" />
    <Ellipse cx={40} cy={82} rx={16} ry={4} fill="#FBB202" fillOpacity={0.25} />
  </Svg>
);

// ── Screen ─────────────────────────────────────────────────
const EnableLocationScreen = ({ navigation }: any) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white justify-between pb-8">
      {/* Center Content */}
      <View className="flex-1 items-center justify-center px-8 gap-5">
        <LocationIcon />

        <Text
          className="text-black text-center mt-2"
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 24,
            lineHeight: 24,
            letterSpacing: 0,
          }}
        >
          Enable Location
        </Text>

        <Text
          className="text-center"
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            lineHeight: 22,
            letterSpacing: 0,
            color: '#B6B9C9',
          }}
        >
          You need to enable location to be able to{'\n'}use the spark app
        </Text>
      </View>

      {/* Bottom Card */}
      <View className="mx-6 bg-gray-50 rounded-2xl px-5 py-4 flex-row items-center justify-between">
        <View className="flex-1">
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              lineHeight: 16,
              color: '#000000',
            }}
          >
            Enable Location
          </Text>
          <Text
            className="mt-1"
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 13,
              lineHeight: 18,
              color: '#555555',
            }}
          >
            Find people near you and get better matches
          </Text>
        </View>

        <CustomToggle
          value={isEnabled}
          onValueChange={val => {
            setIsEnabled(val);
            if (val) { navigation.navigate('SearchScreen') };
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default EnableLocationScreen;
