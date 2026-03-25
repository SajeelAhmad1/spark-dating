import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Users, MessageSquare } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import SearchAvatar from '@/assets/images/searchAvatar.svg';
import CameraIcon from '@/assets/images/cameraIcon.svg';

type Tab = 'Home' | 'Request' | 'Camera' | 'Chat' | 'Profile';

interface BottomTabBarProps {
  activeTab: Tab;
  onTabPress: (tab: Tab) => void;
}

const ACTIVE_COLOR = '#1E78F5';
const INACTIVE_COLOR = '#7D858E';
const PILL_COLOR = '#F0EEE6';

const HORIZONTAL_PADDING = 16;
const PILL_HEIGHT = 72;
const CAMERA_SIZE = 72;
const NOTCH_RADIUS = CAMERA_SIZE / 3 + 6;
const PILL_CORNER = 40;

function buildNotchPath(w: number, h: number): string {
  const r = PILL_CORNER;
  const nr = NOTCH_RADIUS;
  const cx = w / 2;
  const x1 = cx - nr;
  const x2 = cx + nr;

  return [
    `M ${r} 0`,
    `L ${x1} 0`,
    `A ${nr} ${nr} 0 0 0 ${x2} 0`,
    `L ${w - r} 0`,
    `Q ${w} 0 ${w} ${r}`,
    `L ${w} ${h - r}`,
    `Q ${w} ${h} ${w - r} ${h}`,
    `L ${r} ${h}`,
    `Q 0 ${h} 0 ${h - r}`,
    `L 0 ${r}`,
    `Q 0 0 ${r} 0`,
    `Z`,
  ].join(' ');
}

const BottomTabBar = ({ activeTab, onTabPress }: BottomTabBarProps) => {
  const { width: screenWidth } = useWindowDimensions();
  const pillWidth = screenWidth - HORIZONTAL_PADDING * 2;
  const iconSize = 24;

  const TabItem = ({
    tab,
    label,
    icon,
  }: {
    tab: Tab;
    label: string;
    icon: React.ReactNode;
  }) => {
    const isActive = activeTab === tab;

    return (
      <TouchableOpacity
        onPress={() => onTabPress(tab)}
        activeOpacity={0.7}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
          gap: 2,
        }}
      >
        {icon}
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            lineHeight: 14,
            color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: HORIZONTAL_PADDING,
        paddingBottom: 16,
        paddingTop: CAMERA_SIZE / 2,
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}
    >
      {/* ── Camera button — center aligned on the pill's top edge ── */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 20,
          alignItems: 'center',
          width: '100%',
        }}
      >
        <TouchableOpacity onPress={() => onTabPress('Camera')} activeOpacity={0.85}>
          <CameraIcon width={CAMERA_SIZE} height={CAMERA_SIZE} />
        </TouchableOpacity>
      </View>

      {/* ── Pill with SVG notch background ── */}
      <View
        style={{
          width: pillWidth,
          height: PILL_HEIGHT,
          shadowColor: '#000',
          shadowOpacity: 0.10,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 4 },
          elevation: 10,
          backgroundColor: 'transparent',
        }}
      >
        {/* SVG pill shape with arc notch */}
        <Svg
          width={pillWidth}
          height={PILL_HEIGHT}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <Path
            d={buildNotchPath(pillWidth, PILL_HEIGHT)}
            fill={PILL_COLOR}
          />
        </Svg>

        {/* Tab items row — sits on top of the SVG */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8,
          }}
        >
          <TabItem
            tab="Home"
            label="Home"
            icon={
              <View
                style={{
                  borderWidth: activeTab === 'Home' ? 1 : 0,
                  borderColor: '#FFFFFF',
                  borderRadius: 6,
                }}
              >
                <View style={{ width: iconSize + 6, height: iconSize + 6 }}>
                  {/* Back card */}
                  <View
                    style={{
                      position: 'absolute',
                      top: 2,
                      left: 6,
                      width: iconSize - 2,
                      height: iconSize,
                      backgroundColor: activeTab === 'Home' ? '#5BA4F5' : INACTIVE_COLOR,
                      borderRadius: 4,
                      opacity: 0.55,
                      transform: [{ rotate: '-8deg' }],
                    }}
                  />
                  {/* Front card */}
                  <View
                    style={{
                      position: 'absolute',
                      top: 2,
                      left: 0,
                      width: iconSize - 2,
                      height: iconSize,
                      backgroundColor: activeTab === 'Home' ? ACTIVE_COLOR : INACTIVE_COLOR,
                      borderRadius: 4,
                      transform: [{ rotate: '4deg' }],
                    }}
                  />
                </View>
              </View>
            }
          />

          <TabItem
            tab="Request"
            label="Request"
            icon={
              <View
                style={{
                  borderWidth: activeTab === 'Request' ? 1 : 0,
                  borderColor: '#FFFFFF',
                  borderRadius: 6,
                }}
              >
                <Users
                  size={iconSize}
                  color={activeTab === 'Request' ? ACTIVE_COLOR : INACTIVE_COLOR}
                  strokeWidth={1.8}
                />
              </View>
            }
          />

          {/* Center gap — sits under the camera notch */}
          <View style={{ flex: 1 }} />

          <TabItem
            tab="Chat"
            label="Chat"
            icon={
              <View
                style={{
                  borderWidth: activeTab === 'Chat' ? 1 : 0,
                  borderColor: '#FFFFFF',
                  borderRadius: 6,
                }}
              >
                <MessageSquare
                  size={iconSize}
                  color={activeTab === 'Chat' ? ACTIVE_COLOR : INACTIVE_COLOR}
                  strokeWidth={1.8}
                />
              </View>
            }
          />

          <TabItem
            tab="Profile"
            label="Profile"
            icon={
              <View
                style={{
                  width: iconSize + 6,
                  height: iconSize + 6,
                  borderRadius: (iconSize + 6) / 2,
                  overflow: 'hidden',
                  borderWidth: activeTab === 'Profile' ? 1 : 0,
                  borderColor: '#FFFFFF',
                }}
              >
                <SearchAvatar width={iconSize + 6} height={iconSize + 6} />
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
};

export default BottomTabBar;
