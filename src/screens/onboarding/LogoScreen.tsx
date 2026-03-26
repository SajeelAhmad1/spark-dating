import { View, Text } from 'react-native';
import PrimaryButton from '@/components/common/PrimaryButton';
import Logo from '@/assets/images/logo.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { sf, sr } from '@/utils/responsive';

export default function LogoScreen({ navigation }: any) {
  return (
    <View className="flex-1">
      {/* Gradient overlay at reduced opacity */}
      <LinearGradient
        colors={['#1E78F5', '#FBB202']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        {/* Center content */}
        <View className="flex-1 items-center justify-center px-2">
          {/* App icon */}
          <View
            style={{ width: sf(88), height: sf(88), borderRadius: sr(18) }}
          >
            <Logo width={sf(88)} height={sf(88)} />
          </View>

          {/* App name */}
          <Text style={{ fontSize: sf(40) }} className="text-[#ffffff] font-normal">
            SPARK
          </Text>

          {/* Subtitle */}
          <Text
            style={{ fontSize: sf(15), lineHeight: sf(24) }}
            className="text-[#222222] font-normal text-center"
          >
            Discover real connections through shared interests{'\n'}and genuine
            conversations.
          </Text>
        </View>

        {/* Bottom Next button */}
        <View className="px-4 pb-6">
          <PrimaryButton
            title="Next"
            onPress={() => navigation.navigate('SignUpScreen')}
            colors={['#1E78F5', '#1E78F5']}
            variant="solid"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
