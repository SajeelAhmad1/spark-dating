import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { Settings, X } from 'lucide-react-native';
import { Heart, Star } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import BottomTabBar from '@/components/common/BottomTabBar';
import Logo from '@/assets/images/logo.svg';
import ChatIcon from '@/assets/images/chatIcon.svg';
import { ProgressDots } from '@/components/ProgressDots';
import { MATCHES } from '@/constants/matches';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_H_PADDING = 12;
const CARD_WIDTH = SCREEN_WIDTH - CARD_H_PADDING * 2;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.6;
const BTN_OVERLAP = 32;

// ── Discovery Screen ───────────────────────────────────────
const DiscoveryScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<
    'Home' | 'Request' | 'Camera' | 'Chat' | 'Profile'
  >('Home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + 12));
    setCurrentIndex(index);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* ── Full screen background gradient ── */}
      <LinearGradient
        colors={['#1E78F5', '#FBB202']}
        start={{ x: 0, y: -0.1 }}
        end={{ x: 2, y: 0.7 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        {/* ── Header ── */}
        <LinearGradient
          colors={['#1E78F5', '#FBB202']}
          start={{ x: 1.5, y: 1.5 }}
          end={{ x: -2, y: -0.8 }}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255,255,255,0.2)',
            shadowColor: '#000000',
            shadowOpacity: 0.032,
            shadowRadius: 7,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingTop: 12,
              paddingBottom: 16,
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Logo width={40} height={40} />
              <Text
                style={{
                  fontFamily: 'ZenDots-Regular',
                  fontSize: 20,
                  lineHeight: 20,
                  color: '#FFFFFF',
                  letterSpacing: 0,
                }}
              >
                SPARK
              </Text>
            </View>

            <TouchableOpacity
              style={{
                width: 36,
                height: 36,
                borderRadius: 92,
                backgroundColor: '#FBB20233',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#FFFFFF',
                borderWidth: 1,
              }}
            >
              <Settings size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* ── Title ── */}
        <View
          style={{ paddingHorizontal: 20, marginTop: 16, marginBottom: 12 }}
        >
          <MaskedView
            maskElement={
              <Text
                style={{
                  lineHeight: 32,
                }}
                className="font-semibold text-[24px]"
              >
                {'Connect Through Moments 🔥'}
              </Text>
            }
          >
            <LinearGradient
              colors={['#FFFFFF', '#FBB202']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={{
                  lineHeight: 32,
                  opacity: 0,
                }}
                className="font-semibold text-[24px]"
              >
                {'Connect Through Moments 🔥'}
              </Text>
            </LinearGradient>
          </MaskedView>
        </View>

        {/* ── Card Carousel + Action Buttons ── */}
        <View
          style={{
            paddingHorizontal: CARD_H_PADDING,
            paddingBottom: BTN_OVERLAP,
            position: 'relative',
          }}
        >
          <FlatList
            ref={flatListRef}
            data={MATCHES}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            snapToInterval={CARD_WIDTH + 12}
            decelerationRate="fast"
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  marginRight: 12,
                }}
              >
                {/* Clipped card */}
                <View
                  style={{
                    flex: 1,
                    borderRadius: 24,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />

                  {/* Bottom gradient */}
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.88)']}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      paddingTop: 110,
                      paddingBottom: BTN_OVERLAP + 18,
                      paddingHorizontal: 12,
                    }}
                  >
                    {/* Name/Bio + Chat icon — all inside one card */}
                    <View
                      style={{
                        backgroundColor: 'rgba(251,178,2,0.2)',
                        borderWidth: 2,
                        borderColor: 'rgba(251,178,2,0.2)',
                        borderRadius: 14,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      {/* Left: Name + Bio */}
                      <View style={{ flex: 1, marginRight: 10 }}>
                        <Text
                          style={{
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 18,
                            color: '#fff',
                            lineHeight: 22,
                          }}
                        >
                          {item.name}, {item.age}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Poppins-Regular',
                            fontSize: 12,
                            color: 'rgba(255,255,255,0.85)',
                            marginTop: 2,
                          }}
                          numberOfLines={1}
                        >
                          {item.bio}
                        </Text>
                      </View>

                      {/* Right: Chat button inside the card */}
                      <TouchableOpacity>
                        <ChatIcon width={36} height={36} />
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                </View>

                {/* Progress dots */}
                <View
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 12,
                    right: 12,
                    zIndex: 10,
                  }}
                >
                  <ProgressDots total={MATCHES.length} current={currentIndex} />
                </View>
              </View>
            )}
          />

          {/* ── Action Buttons ── */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              zIndex: 10,
            }}
          >
            {/* Dislike */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: 52,
                height: 52,
                borderRadius: 28,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 5,
              }}
            >
              <X size={24} color="#7D858E" strokeWidth={2.5} />
            </TouchableOpacity>

            {/* Like */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>{navigation.navigate("MatchScreen")}}
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#FF4D6D',
                shadowOpacity: 0.4,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 8,
              }}
            >
              <Heart size={32} color="#FF4D6D" fill="#FF4D6D" strokeWidth={0} />
            </TouchableOpacity>

            {/* Super Like */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: 52,
                height: 52,
                borderRadius: 28,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 5,
              }}
            >
              <Star size={24} color="#FBB202" fill="#FBB202" strokeWidth={0} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* ── Bottom Tab Bar ── */}
        <BottomTabBar
          activeTab={activeTab}
          onTabPress={tab => setActiveTab(tab)}
        />
      </SafeAreaView>
    </View>
  );
};

export default DiscoveryScreen;
