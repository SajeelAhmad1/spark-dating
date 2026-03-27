import { View, Text } from 'react-native';
import PrimaryButton from '@/components/common/PrimaryButton';
import Logo from '@/assets/images/logo.svg';
import GoogleIcon from '@/assets/images/google.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Phone } from 'lucide-react-native';
import { sf, sr, sw, sh } from '@/utils/responsive';

export default function SignUpScreen({ navigation }: any) {
  return (
    <View className="flex-1">
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
        <View style={{ paddingHorizontal: sw(20) }} className="flex-1 justify-between items-center pt-20 ">

          <Text
            style={{ fontSize: sf(32), marginBottom: sh(32) }}
            className="font-semibold text-white text-center"
          >
            Welcome back!
          </Text>

        <View className="items-center gap-2">
          <View
            style={{
              width: sf(72),
              height: sf(72),
              borderRadius: sr(18),
              elevation: 0,
              shadowOpacity: 0,
            }}
          >
            <Logo width={sf(88)} height={sf(88)} />
          </View>

          <Text
            style={{ fontSize: sf(24),  }}
            className="font-semibold text-[#ffffff] text-center"
          >
            Match. Snap. Keep the{'\n'}Spark Alive.
          </Text>
        </View> 

        <View style={{ paddingHorizontal: sw(20), paddingBottom: sh(24), gap: sh(12) }}>
          <Text
            style={{ fontSize: sf(16), marginBottom: sh(16) }}
            className="font-medium text-[#ffffff] text-center"
          >
            By tapping "Sign In" you agree to or{' '}
            <Text className="text-[#1E78F5]">Terms</Text>. Learn how we process
            your data in our{' '}
            <Text className="text-[#1E78F5]">Privacy Policy</Text> and{' '}
            <Text className="text-[#1E78F5]">Cookies Policy</Text>
          </Text>
          <PrimaryButton
            title="Continue with mobile"
            onPress={() => navigation.navigate('NumberInputScreen')}
            colors={['#1E78F5', '#1E78F5']}
            iconBackground="#ffffff"
            variant="solid"
            icon={<Phone width={sf(28)} height={sf(28)} color="#1E78F5" />}
            iconPosition="start"
             textStyle={{fontSize: sf(16), fontWeight: '500'}}
          />

          <PrimaryButton
            title="Continue with Google"
            onPress={() => navigation.navigate('ProfileSetupScreen')}
            colors={['#ffffff']}
            iconBackground="#EDEDED"
            variant="outline"
            icon={<GoogleIcon width={sf(28)} height={sf(28)} />}
            iconPosition="start"
            style={{ backgroundColor: 'white', }}
            textStyle={{fontSize: sf(16), fontWeight: '500', color: '#1E78F5'}}
          />

          <View style={{ marginTop: sh(8) }} className="items-center">
            <Text style={{ fontSize: sf(16) }} className="text-white font-normal">
              Already have an account?{' '}
              <Text
                className="text-[#1E78F5] font-medium"
                onPress={() => navigation.navigate('SignInScreen')}
              >
                Login
              </Text>
            </Text>
          </View>
        </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
