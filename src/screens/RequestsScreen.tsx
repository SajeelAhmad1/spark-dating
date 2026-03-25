import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { X, Heart, ChevronLeft } from 'lucide-react-native';
import { REQUESTS } from '@/constants/requests';


function MatchCard({ name, avatar }: { name: string; avatar: string }) {
  return (
    <View
      className="flex-row items-center bg-white rounded-2xl px-4 py-3 mb-3 mx-4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.002,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      {/* Avatar */}
      <Image
        source={{ uri: avatar }}
        className="w-12 h-12 rounded-full mr-3"
      />

      {/* Text */}
      <View className="flex-1">
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            lineHeight: 16,
            color: '#000000',
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 13,
            lineHeight: 13,
            color: '#555555',
            marginTop: 4,
          }}
        >
          Wants to connect with you
        </Text>
      </View>

      {/* Action buttons */}
      <View className="flex-row items-center gap-2">
        {/* Cross */}
        <TouchableOpacity
          className="w-8 h-8 rounded-full items-center justify-center"
          style={{
            backgroundColor: '#EDEDED',
            borderWidth: 0.5,
            borderColor: 'rgba(30,30,30,0.2)',
          }}
        >
          <X size={14} color="#4A4A4A" strokeWidth={2.5} />
        </TouchableOpacity>

        {/* Heart */}
        <TouchableOpacity
          className="w-8 h-8 rounded-full items-center justify-center"
          style={{ backgroundColor: '#FF073E' }}
        >
          <Heart size={19} color="#FFFFFF" fill="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function RequestsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* Back button */}
      <TouchableOpacity className="px-4 pt-3 pb-1">
        <ChevronLeft size={22} color="#000" />
      </TouchableOpacity>

      {/* Header */}
      <View className="flex-row items-center px-4 mb-5 mt-1 gap-2">
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 28,
            lineHeight: 28,
            color: '#000000',
          }}
        >
          New Matches
        </Text>

        {/* Badge */}
        <View
          className="rounded-full px-2 py-2 items-center justify-center"
          style={{ backgroundColor: '#FBB202' }}
        >
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 13,
              lineHeight: 13,
              color: '#000000',
            }}
          >
            {String(REQUESTS.length).padStart(2, '0')}
          </Text>
        </View>
      </View>

      {/* Match List */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {REQUESTS.map(request => (
          <MatchCard key={request.id} name={request.name} avatar={request.avatar} />
        ))}
      </ScrollView>

    </SafeAreaView>
  );
}
