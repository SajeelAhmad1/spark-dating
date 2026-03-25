import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { ChevronLeft, ChevronDown } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/components/common/PrimaryButton';

const HEIGHTS = [
  '4\'0"',
  '4\'1"',
  '4\'2"',
  '4\'3"',
  '4\'4"',
  '4\'5"',
  '4\'6"',
  '4\'7"',
  '4\'8"',
  '4\'9"',
  '4\'10"',
  '4\'11"',
  '5\'0"',
  '5\'1"',
  '5\'2"',
  '5\'3"',
  '5\'4"',
  '5\'5"',
  '5\'6"',
  '5\'7"',
  '5\'8"',
  '5\'9"',
  '5\'10"',
  '5\'11"',
  '6\'0"',
  '6\'1"',
  '6\'2"',
  '6\'3"',
  '6\'4"',
  '6\'5"',
  '6\'6"',
];

const BODY_TYPES = [
  'Slim',
  'Athletic',
  'Average',
  'Curvy',
  'Heavyset',
  'Muscular',
  'Petite',
  'Plus-size',
];

const ETHNICITIES = [
  'Asian',
  'Black / African Descent',
  'Hispanic / Latino',
  'Middle Eastern',
  'Mixed Race',
  'Native American',
  'Pacific Islander',
  'South Asian',
  'White / Caucasian',
  'Other',
];

type DropdownField = 'height' | 'bodyType' | 'ethnicity' | null;

const PhysicalAttributesScreen = ({ navigation }: any) => {
  const [height, setHeight] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [openDropdown, setOpenDropdown] = useState<DropdownField>(null);

  const dropdownOptions: Record<NonNullable<DropdownField>, string[]> = {
    height: HEIGHTS,
    bodyType: BODY_TYPES,
    ethnicity: ETHNICITIES,
  };

  const dropdownValues: Record<NonNullable<DropdownField>, string> = {
    height,
    bodyType,
    ethnicity,
  };

  const handleSelect = (field: NonNullable<DropdownField>, value: string) => {
    if (field === 'height') setHeight(value);
    if (field === 'bodyType') setBodyType(value);
    if (field === 'ethnicity') setEthnicity(value);
    setOpenDropdown(null);
  };

  const fields: {
    key: NonNullable<DropdownField>;
    label: string;
    placeholder: string;
  }[] = [
    { key: 'height', label: 'Height', placeholder: 'Select height' },
    { key: 'bodyType', label: 'Body Type', placeholder: 'Select bodytype' },
    { key: 'ethnicity', label: 'Ethnicity', placeholder: 'Select ethnicity' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Back Button ── */}
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <ChevronLeft size={24} color="#000000" />
        </TouchableOpacity>

        {/* ── Header ── */}
        <View className="gap-y-2" style={{ marginTop: 12 }}>
          <Text className="text-black text-[28px] font-semibold leading-[28px]">
            Physical Attributes
          </Text>
          <Text className="text-[#7D858E] text-[15px] font-normal leading-[15px]">
            Help others learn more about you
          </Text>
        </View>

        {/* ── Dropdowns ── */}
        <View className="gap-y-5" style={{ marginTop: 12 }}>
          {fields.map(({ key, label, placeholder }) => (
            <View key={key}>
              <Text className="text-black text-[15px] font-semibold mb-2">
                {label}
              </Text>
              <TouchableOpacity
                onPress={() => setOpenDropdown(key)}
                style={{
                  height: 56,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#B6B9C9',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: dropdownValues[key] ? '#000000' : '#7D858E',
                  }}
                >
                  {dropdownValues[key] || placeholder}
                </Text>
                <ChevronDown size={18} color="#000000" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* ── Skip Note ── */}
        <Text className="text-[#FBB202] text-[14px] font-normal mt-5">
          You can always skip this step and edit later
        </Text>
      </ScrollView>

      {/* ── Continue Button ── */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pb-8">
        <PrimaryButton
          title="Continue"
          onPress={() => navigation?.navigate('InterestsScreen')}
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
          <View
            className="bg-white rounded-t-3xl px-5 pt-4 pb-10"
            style={{ maxHeight: 360 }}
          >
            {/* Handle */}
            <View className="w-10 h-1 bg-[#E8EAED] rounded-full self-center mb-4" />

            <FlatList
              data={openDropdown ? dropdownOptions[openDropdown] : []}
              keyExtractor={item => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = openDropdown
                  ? dropdownValues[openDropdown] === item
                  : false;
                return (
                  <TouchableOpacity
                    onPress={() =>
                      openDropdown && handleSelect(openDropdown, item)
                    }
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

export default PhysicalAttributesScreen;
