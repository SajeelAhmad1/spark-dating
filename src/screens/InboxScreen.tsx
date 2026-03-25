import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { ChevronLeft, Search, Lock, Camera } from 'lucide-react-native';
import BottomTabBar from '@/components/common/BottomTabBar';
import CameraIcon from '@/assets/images/cameraIcon.svg';
import { CONVERSATIONS } from '@/constants/conversations';
import { Conversation } from '@/constants/conversations';

type FilterType = 'All' | 'Active Streaks' | 'Expiring Soon' | 'Locked Chats';

const FILTERS: FilterType[] = [
  'All',
  'Active Streaks',
  'Expiring Soon',
  'Locked Chats',
];

function filterConversations(
  conversations: Conversation[],
  filter: FilterType,
  query: string,
): Conversation[] {
  let filtered = conversations;

  if (query.trim()) {
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (filter) {
    case 'Active Streaks':
      return filtered.filter(c => c.status === 'active');
    case 'Expiring Soon':
      return filtered.filter(c => c.status === 'locking');
    case 'Locked Chats':
      return filtered.filter(c => c.status === 'locked');
    default:
      return filtered;
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const StreakBadge = ({
  count,
  type,
}: {
  count?: number;
  type?: 'orange' | 'gold';
}) => {
  if (!type) return null;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 22,
        backgroundColor: 'rgba(251,178,2,0.4)',
        borderWidth: 0.6,
        borderColor: '#DC9B00',
        gap: 2,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 8,
        paddingRight: 8,
      }}
    >
      <Text style={{ fontSize: 8, lineHeight: 14 }}>🔥</Text>

      <Text style={{ fontSize: 13, color: '#DC9B00', fontWeight: 'semibold' }}>
        {count ? count : '⏳'}
      </Text>
    </View>
  );
};

/**
 * Small circular camera button — orange gradient style matching the design.
 * ~40×40 with a camera icon centered inside.
 */
const CameraButton = () => (
  <TouchableOpacity>
    <CameraIcon width={52} height={52} />
  </TouchableOpacity>
);

/**
 * Avatar circle — shows a person emoji as placeholder.
 * Pass isLocked to show the dark lock avatar.
 */
const Avatar = ({
  isLocked,
  hasNotifDot,
}: {
  isLocked?: boolean;
  hasNotifDot?: boolean;
}) => (
  <View style={{ width: 50, height: 50, marginRight: 12 }}>
    {isLocked ? (
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 25,
          backgroundColor: '#222222',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Lock size={20} color="#FFFFFF" strokeWidth={2} />
      </View>
    ) : (
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#C8A882',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Text style={{ fontSize: 26 }}>👩</Text>
      </View>
    )}

    {/* Red notification dot */}
    {hasNotifDot && (
      <View
        style={{
          position: 'absolute',
          top: -1,
          right: -1,
          width: 16,
          height: 16,
          borderRadius: 8,
          backgroundColor: '#FF3B30',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: '#FFFFFF',
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700', lineHeight: 11  }}>
          1
        </Text>
      </View>
    )}
  </View>
);

const ConversationItem = ({ item }: { item: Conversation }) => {
  const isLocked = item.status === 'locked';
  const isLocking = item.status === 'locking';

  return (
    <View
      style={{
        borderRadius: 16,
        marginBottom: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.09,
        shadowRadius: 1,
        elevation: 1,
        backgroundColor: '#FFFFFF',
      }}
    >
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
          paddingVertical: 12,
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: item.isUnread ? 'rgba(251,178,2,0.07)' : '#FFFFFF',
        }}
      >
        {/* Avatar */}
        <Avatar
          isLocked={isLocked}
          hasNotifDot={item.hasNotifDot}
        />

        {/* Text info */}
        <View style={{ flex: 1, minWidth: 0 }}>
          {/* Name + streak badge */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              marginBottom: 3,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 16,
                fontWeight: '600',
                color: '#000000',
              }}
            >
              {item.name}
            </Text>
            {!isLocked && (
              <StreakBadge count={item.streakCount} type={item.streakType} />
            )}
          </View>

          {/* Last message */}
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              lineHeight: 13,
              fontWeight: item.isUnread ? '600' : '400',
              color: item.isUnread ? '#000000' : '#555555',
              marginBottom: 3,
            }}
          >
            {item.lastMessage}
          </Text>

          {/* Time */}
          {item.time ? (
            <Text
              style={{
                fontSize: 11,
                lineHeight: 20,
                fontWeight: '500',
                color: item.timeWarning ? '#FF3B30' : '#7D858E',
              }}
            >
              ⏱ {item.time}
            </Text>
          ) : null}
        </View>

        {/* Right action */}
        {isLocked ? (
          <View
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Lock size={22} color="#7D858E" strokeWidth={1.8} />
          </View>
        ) : (
          <CameraButton />
        )}
      </TouchableOpacity>
    </View>
  );
};

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader = ({
  icon,
  label,
  mt,
}: {
  icon: React.ReactNode;
  label: string;
  mt?: number;
}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 12,
      marginTop: mt ?? 0,
    }}
  >
    {icon}
    <Text
      style={{
        fontSize: 16,
        lineHeight: 16,
        fontWeight: '500',
        color: '#000000',
      }}
    >
      {label}
    </Text>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function InboxScreen({ navigation }: any) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<
    'Home' | 'Request' | 'Camera' | 'Chat' | 'Profile'
  >('Chat');

  const filtered = filterConversations(
    CONVERSATIONS,
    activeFilter,
    searchQuery,
  );

  const activeConversations = filtered.filter(c => c.status === 'active');
  const lockingConversations = filtered.filter(c => c.status === 'locking');
  const lockedConversations = filtered.filter(c => c.status === 'locked');

  const showAllSections = activeFilter === 'All' || !!searchQuery.trim();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* ── Nav Bar ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 20,
        }}
        className="py-6 pt-8"
      >
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={{
            position: 'absolute',
            left: 20,
            top: 0,
            bottom: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <ChevronLeft size={18} color="#555555" strokeWidth={2} />
          <Text
            style={{
              fontSize: 13,
              color: '#8D8D8D',
              fontWeight: '400',
            }}
          >
            Back
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            lineHeight: 20,
            fontWeight: '600',
            color: '#000000',
          }}
        >
          Inbox
        </Text>
      </View>

      {/* ── Search Bar ── */}
      <View style={{ paddingHorizontal: 20, marginBottom: 14 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 48,
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            paddingHorizontal: 14,
            gap: 8,
            borderWidth: 1,
            borderColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.06,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Search size={16} color="#8D8D8D" strokeWidth={2} />
          <TextInput
            placeholder="Search conversations..."
            placeholderTextColor="#8D8D8D"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              flex: 1,
              fontSize: 14,
              lineHeight: 14,
              color: '#333333',
              fontWeight: '400',
              padding: 0,
            }}
          />
        </View>
      </View>

      {/* ── Filter Chips ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 8,
          paddingBottom: 4,
        }}
        style={{ flexGrow: 0, marginBottom: 16 }}
      >
        {FILTERS.map(filter => {
          const isActive = activeFilter === filter;
          return (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 99,
                backgroundColor: isActive ? '#1E78F5' : '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.09,
                shadowRadius: 5,
                elevation: 2,
              }}
              activeOpacity={0.75}
            >
              {filter === 'Active Streaks' && (
                <Text style={{ fontSize: 14, marginRight: 4 }}>🔥</Text>
              )}
              {filter === 'Expiring Soon' && (
                <Text style={{ fontSize: 14, marginRight: 4 }}>⏳</Text>
              )}
              {filter === 'Locked Chats' && (
                <Text style={{ fontSize: 14, marginRight: 4 }}>🔒</Text>
              )}
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 16,
                  fontWeight: '500',
                  color: isActive ? '#FFFFFF' : '#B6B9C9',
                }}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── Conversation List ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        style={{ flex: 1 }}
      >
        {/* Active Streaks */}
        {activeConversations.length > 0 && (
          <>
            <SectionHeader
              icon={<Text style={{ fontSize: 18 }}>🔥</Text>}
              label="Active Streaks"
            />
            {activeConversations.map(item => (
              <ConversationItem key={item.id} item={item} />
            ))}
          </>
        )}

        {/* Locking Soon */}
        {lockingConversations.length > 0 && (
          <>
            <SectionHeader
              mt={activeConversations.length > 0 ? 8 : 0}
              icon={<Text style={{ fontSize: 16 }}>⏳</Text>}
              label="Locking Soon"
            />
            {lockingConversations.map(item => (
              <ConversationItem key={item.id} item={item} />
            ))}
          </>
        )}

        {/* Locked Chats */}
        {lockedConversations.length > 0 && (
          <>
            <SectionHeader
              mt={
                lockingConversations.length > 0 ||
                activeConversations.length > 0
                  ? 8
                  : 0
              }
              icon={<Lock size={16} color="#000000" strokeWidth={2} />}
              label="Locked Chats"
            />
            {lockedConversations.map(item => (
              <ConversationItem key={item.id} item={item} />
            ))}
          </>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Text style={{ fontSize: 15, color: '#8D8D8D' }}>
              No conversations found
            </Text>
          </View>
        )}
      </ScrollView>

      {/* ── Bottom Tab Bar ── */}
      <BottomTabBar
        activeTab={activeTab}
        onTabPress={tab => setActiveTab(tab)}
      />
    </SafeAreaView>
  );
}
