import React from 'react';
import { View, SafeAreaView, Dimensions } from 'react-native';
import OnboardingCard from './OnboardingCard';

import Profile1 from '@/assets/images/avatar1.svg';
import Profile2 from '@/assets/images/avatar2.svg';
import Profile3 from '@/assets/images/avatar3.svg';
import Profile4 from '@/assets/images/avatar4.svg';
import Profile5 from '@/assets/images/avatar5.svg';
import CenterProfile from '@/assets/images/avatar6.svg';
import LocationIcon from '@/assets/images/locationIcon.svg';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

// ─── Geometry ──────────────────────────────────────────────────────────────
const ORBIT_D = width * 0.78;
const ORBIT_R = ORBIT_D / 2;
const CX = ORBIT_R;
const CY = ORBIT_R;

const DASHED_ORBIT_D = ORBIT_D;
const STROKE_WIDTH = 2;
const DASH_LENGTH = 12;
const GAP_LENGTH = 13;

const toRad = (deg: number) => (deg * Math.PI) / 180;

const onCircle = (angleDeg: number, radius: number, size: number) => ({
  left: CX + radius * Math.cos(toRad(angleDeg)) - size / 2,
  top: CY + radius * Math.sin(toRad(angleDeg)) - size / 2,
});

const RINGS = [
  { d: ORBIT_D * 0.55, color: 'rgba(30, 120, 245, 0.1)' }, // 10% opacity
  { d: ORBIT_D * 0.45, color: 'rgba(30, 120, 245, 0.15)' }, // 15% opacity
  { d: ORBIT_D * 0.35, color: 'rgba(30, 120, 245, 0.2)' }, // 20% opacity
];

// ─── Center avatar ─────────────────────────────────────────────────────────
const CENTER_SIZE = 62;

const AVATARS: { Component: any; angle: number; size: number }[] = [
  { Component: Profile1, angle: -150, size: 68 }, // top-left    — smaller
  { Component: Profile2, angle: -55, size: 52 }, // top-right   — smallest
  { Component: Profile3, angle: 0, size: 62 }, // right       — medium
  { Component: Profile5, angle: 58, size: 68 }, // bottom-right— medium
  { Component: Profile4, angle: 140, size: 56 }, // bottom-left — smaller
];

const PINS = [
  { size: 24, angle: -95, tilt: 0 }, // first pin rotated -15°
  { size: 24, angle: -22, tilt: 20 }, // second pin rotated 10°
  { size: 24, angle: 105, tilt: 0 }, // no tilt for third pin
];

const OnboardingScreen1 = ({ navigation }: any) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
        <View style={{ width: ORBIT_D, height: ORBIT_D }}>
          {/* Single outer dashed ring */}
          <Svg
            width={DASHED_ORBIT_D}
            height={DASHED_ORBIT_D}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <Circle
              cx={ORBIT_R}
              cy={ORBIT_R}
              r={ORBIT_R - STROKE_WIDTH / 2} // radius
              stroke="#7D858E"
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={`${DASH_LENGTH}, ${GAP_LENGTH}`}
              fill="none"
            />
          </Svg>

          {/* 2 solid filled rings — no border at all */}
          {RINGS.map((ring, i) => {
            const size = Math.max(ring.d, 4);
            return (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  backgroundColor: ring.color,
                  top: CY - size / 2,
                  left: CX - size / 2,
                }}
              />
            );
          })}

          {/* Center avatar */}
          <View
            style={{
              position: 'absolute',
              width: CENTER_SIZE,
              height: CENTER_SIZE,
              borderRadius: CENTER_SIZE / 2,
              top: CY - CENTER_SIZE / 2,
              left: CX - CENTER_SIZE / 2,
              overflow: 'hidden',
              zIndex: 10,
            }}
          >
            <CenterProfile width={CENTER_SIZE} height={CENTER_SIZE} />
          </View>

          {/* 5 orbit avatars */}
          {AVATARS.map(({ Component, angle, size }, i) => {
            const pos = onCircle(angle, ORBIT_R, size);
            return (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  top: pos.top,
                  left: pos.left,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: '#FBB202',
                  elevation: 6,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 4,
                  zIndex: 5,
                }}
              >
                <Component width={size} height={size} />
              </View>
            );
          })}

          {/* 3 location pins */}
          {PINS.map((pin, i) => {
            const pos = onCircle(pin.angle, ORBIT_R, pin.size);
            return (
              <LocationIcon
                key={i}
                width={pin.size}
                height={pin.size}
                style={{
                  position: 'absolute',
                  top: pos.top - 12,
                  left: pos.left,
                  zIndex: 8,
                  transform: [{ rotate: `${pin.tilt ?? 0}deg` }],
                }}
              />
            );
          })}
        </View>
      </View>

      <OnboardingCard
        title="Find Your Match"
        subtitle="Swipe through profiles and connect with people who interest you in real-time."
        activeDot={0}
        buttonLabel="Next"
        onPress={() => navigation.navigate('Onboarding2')}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen1;
