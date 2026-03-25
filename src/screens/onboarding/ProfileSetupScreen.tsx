import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { ChevronLeft, ChevronDown } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/components/common/PrimaryButton';

const GENDERS = ['Male', 'Female', 'Other'];

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = Array.from({ length: 100 }, (_, i) => String(2024 - i));

type DropdownField = 'day' | 'month' | 'year' | null;

const ProfileSetupScreen = ({navigation}: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  const [day, setDay] = useState('24');
  const [month, setMonth] = useState('May');
  const [year, setYear] = useState('1999');
  const [bio, setBio] = useState('');
  const [openDropdown, setOpenDropdown] = useState<DropdownField>(null);

  const dropdownOptions: Record<NonNullable<DropdownField>, string[]> = {
    day: DAYS,
    month: MONTHS,
    year: YEARS,
  };

  const dropdownValues: Record<NonNullable<DropdownField>, string> = {
    day,
    month,
    year,
  };

  const handleSelect = (field: NonNullable<DropdownField>, value: string) => {
    if (field === 'day') setDay(value);
    if (field === 'month') setMonth(value);
    if (field === 'year') setYear(value);
    setOpenDropdown(null);
  };

  const inputStyle = {
    borderWidth: 1,
    borderColor: '#B6B9C9',
    borderRadius: 15,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#000000',
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Back Button ── */}
        <TouchableOpacity className="" onPress={() => {}}>
          <ChevronLeft size={24} color="#000000" />
        </TouchableOpacity>

        {/* ── Header ── */}
        <View className="gap-y-2" style={{ marginTop: 12 }}>
          <Text className="text-black text-[28px] font-semibold leading-[28px]">
            Tell Us About You
          </Text>
          <Text className="text-[#7D858E] text-[15px] font-normal leading-[15px]">
            Complete your profile to get started
          </Text>
        </View>

        {/* ── First & Last Name ── */}
        <View className="mt-6 flex-row gap-x-3">
          <View className="flex-1">
            <Text className="text-black text-[15px] font-semibold mb-2">First Name</Text>
            <TextInput
              placeholder="JJ"
              placeholderTextColor="#7D858E"
              value={firstName}
              onChangeText={setFirstName}
              style={inputStyle}
            />
          </View>
          <View className="flex-1">
            <Text className="text-black text-[15px] font-semibold mb-2">Last Name</Text>
            <TextInput
              placeholder="Smith"
              placeholderTextColor="#7D858E"
              value={lastName}
              onChangeText={setLastName}
              style={inputStyle}
            />
          </View>
        </View>

        {/* ── Gender ── */}
        <View className="mt-6">
          <Text className="text-black text-[15px] font-semibold mb-2">Gender</Text>
          <View className="flex-row gap-x-3">
            {GENDERS.map((g) => {
              const selected = gender === g;
              return (
                <TouchableOpacity
                  key={g}
                  onPress={() => setGender(g)}
                  style={{
                    flex: 1,
                    height: 56,
                    borderRadius: 15,
                    borderWidth: selected ? 0 : 1,
                    borderColor: '#B6B9C9',
                    backgroundColor: selected ? '#FBB202' : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000000',
                      fontWeight: '400',
                    }}
                  >
                    {g}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Date of Birth ── */}
        <View className="mt-6">
          <Text className="text-black text-[15px] font-semibold mb-2">Date of birth</Text>
          <View className="flex-row gap-x-3">
            {(['day', 'month', 'year'] as NonNullable<DropdownField>[]).map((field) => (
              <TouchableOpacity
                key={field}
                onPress={() => setOpenDropdown(field)}
                style={{
                  flex: 1,
                  height: 56,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#B6B9C9',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                }}
              >
                <Text style={{ fontSize: 15, color: '#000000' }}>
                  {dropdownValues[field]}
                </Text>
                <ChevronDown size={16} color="#000000" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Bio ── */}
        <View className="mt-6">
          <Text className="text-black text-[15px] font-normal mb-2">Add a Bio</Text>
          <TextInput
            placeholder="Write something interesting..."
            placeholderTextColor="#7D858E"
            value={bio}
            onChangeText={setBio}
            multiline
            textAlignVertical="top"
            style={{
              borderWidth: 1,
              borderColor: '#B6B9C9',
              borderRadius: 15,
              height: 120,
              paddingHorizontal: 16,
              paddingTop: 14,
              fontSize: 15,
              color: '#000000',
            }}
          />
        </View>
      </ScrollView>

      {/* ── Continue Button ── */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pb-8 bg-white">
        <PrimaryButton
          title="Continue"
          onPress={() => {navigation.navigate("PhysicalAttributesScreen")}}
          colors={['#1E78F5', '#FBB202']}
          variant="gradient"
          style={{ alignSelf: 'stretch' }}
        />
      </View>

      {/* ── Dropdown Modal ── */}
      <Modal
        visible={openDropdown !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setOpenDropdown(null)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/40 justify-end"
          activeOpacity={1}
          onPress={() => setOpenDropdown(null)}
        >
          <View className="bg-white rounded-t-3xl px-5 pt-4 pb-10" style={{ maxHeight: 320 }}>
            <View className="w-10 h-1 bg-[#E8EAED] rounded-full self-center mb-4" />
            <FlatList
              data={openDropdown ? dropdownOptions[openDropdown] : []}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = openDropdown ? dropdownValues[openDropdown] === item : false;
                return (
                  <TouchableOpacity
                    onPress={() => openDropdown && handleSelect(openDropdown, item)}
                    style={{
                      paddingVertical: 14,
                      borderBottomWidth: 1,
                      borderBottomColor: '#F0F0F0',
                      backgroundColor: isSelected ? '#FFF8E7' : 'transparent',
                      paddingHorizontal: 8,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: isSelected ? '#FBB202' : '#000000',
                        fontWeight: isSelected ? '600' : '400',
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
};

export default ProfileSetupScreen;
