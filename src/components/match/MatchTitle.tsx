import React from 'react';
import { Text, View } from 'react-native';
import { MATCH_CIRCLE_SIZE } from '@/constants/match';

export default function MatchTitle() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          lineHeight: 46,
        }}
        className="font-bold text-[44px] text-[#1C1C1E]"
      >
        {"It's a"}
      </Text>

      <View
        style={{
          width: MATCH_CIRCLE_SIZE,
          height: MATCH_CIRCLE_SIZE,
          borderRadius: MATCH_CIRCLE_SIZE / 2,
          backgroundColor: '#1E78F5',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            lineHeight: 46,
            textAlign: 'center',
          }}
          className="font-bold text-[44px] text-[#FFFFFF]"
        >
          {'match!'}
        </Text>
      </View>
    </View>
  );
}

