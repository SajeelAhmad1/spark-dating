import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/components/common/PrimaryButton';

const INTERESTS = [
  {
    category: 'Content & Lifestyle',
    items: ['Content Creation', 'Privacy-Focused Lifestyle', 'Online Entrepreneurship', 'Traveling for Work'],
  },
  {
    category: 'Wellness & Growth',
    items: ['Fitness / Body Maintenance', 'Fame-Aware Dating', 'Mental Health & Self-Care'],
  },
  {
    category: 'Creative & Hobbies',
    items: ['Photography', 'Music', 'Gaming', 'Art', 'Books', 'Movies'],
  },
  {
    category: 'Lifestyle',
    items: ['Travel', 'Food', 'Cooking', 'Dancing', 'Sports'],
  },
];

const MAX = 5;
const MIN = 3;

const InterestsScreen = ({ navigation }: any) => {
  const [selected, setSelected] = useState<string[]>(['Photography', 'Travel', 'Traveling for Work']);

  const toggle = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((s) => s !== item));
    } else {
      if (selected.length >= MAX) return;
      setSelected([...selected, item]);
    }
  };

  const canContinue = selected.length >= MIN;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Back Button ── */}
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <ChevronLeft size={24} color="#000000" />
        </TouchableOpacity>

        {/* ── Header ── */}
        <View style={{ marginTop: 12, gap: 6 }}>
          <Text style={{ fontSize: 28, fontWeight: '600', color: '#000000', lineHeight: 28 }}>
            Your Interests
          </Text>
          <Text style={{ fontSize: 15, fontWeight: '400', color: '#7D858E', lineHeight: 15 }}>
            Choose at least 3 interests (max 5)
          </Text>
        </View>

        {/* ── Categories ── */}
        <View style={{ marginTop: 24, gap: 24 }}>
          {INTERESTS.map(({ category, items }) => (
            <View key={category}>

              {/* Category Title */}
              <Text style={{
                fontSize: 15,
                fontWeight: '600',
                color: '#000000',
                lineHeight: 15,
                marginBottom: 12,
              }}>
                {category}
              </Text>

              {/* Chips */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {items.map((item) => {
                  const isSelected = selected.includes(item);
                  return (
                    <TouchableOpacity
                      key={item}
                      onPress={() => toggle(item)}
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 9,
                        borderRadius: 999,
                        borderWidth: isSelected ? 0 : 0.4,
                        borderColor: '#B6B9C9',
                        backgroundColor: isSelected ? '#FBB202' : 'transparent',
                        marginRight: 8,
                        marginBottom: 8,
                      }}
                    >
                      <Text style={{
                        fontSize: 13,
                        fontWeight: '400',
                        color: isSelected ? '#000000' : '#7D858E',
                        lineHeight: 13,
                      }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

            </View>
          ))}
        </View>
      </ScrollView>

      {/* ── Footer ── */}
      <View style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        paddingHorizontal: 24,
        paddingBottom: 32,
        backgroundColor: '#fff',
        alignItems: 'center',
        gap: 12,
      }}>
        <Text style={{
          fontSize: 15,
          fontWeight: '500',
          color: '#FBB202',
          lineHeight: 15,
        }}>
          {selected.length}/{MAX} selected
        </Text>

        <PrimaryButton
          title="Continue"
          onPress={() => navigation?.navigate('UploadPhotosScreen')}
          colors={['#1E78F5', '#FBB202']}
          variant="gradient"
          style={{
            alignSelf: 'stretch',
            opacity: canContinue ? 1 : 0.5,
          }}
          textStyle={{fontSize: 20, fontWeight: '500', lineHeight: 20, letterSpacing: 0}}
        />
      </View>
    </SafeAreaView>
  );
};

export default InterestsScreen;
