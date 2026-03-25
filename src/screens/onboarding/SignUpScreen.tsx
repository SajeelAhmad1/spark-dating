import { View, Text } from 'react-native';
import PrimaryButton from '@/components/common/PrimaryButton';
import Logo from '@/assets/images/logo.svg';
import GoogleIcon from '@/assets/images/google.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Phone } from 'lucide-react-native';

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
        <View className="flex-1 items-center justify-center px-5">
          <Text className="font-semibold text-[32px] text-[#ffffff] leading-[100%] tracking-normal text-center mb-32">
            Welcome back!
          </Text>

          <View
            className="w-[72px] h-[72px] rounded-[18px]"
            style={{ elevation: 0, shadowOpacity: 0 }}
          >
            <Logo width={72} height={72} />
          </View>

          <Text className="font-semibold text-[24px] text-[#ffffff] tracking-[0.24px] text-center leading-8">
            Match. Snap. Keep the{'\n'}Spark Alive.
          </Text>
        </View>

        <View className="px-5 pb-6 gap-3">
          <Text className="font-medium text-[16px] text-[#ffffff] leading-[20px] tracking-[0px] text-center mb-4">
            By tapping "Sign In" you agree to or{' '}
            <Text className="text-[#FBB202]">Terms</Text>. Learn how we process
            your data in our{' '}
            <Text className="text-[#FBB202]">Privacy Policy</Text> and{' '}
            <Text className="text-[#FBB202]">Cookies Policy</Text>
          </Text>
          <PrimaryButton
            title="Continue with mobile"
            onPress={() => navigation.navigate('NumberSigninScreen')}
            colors={['#1E78F5', '#1E78F5']}
            iconBackground="#ffffff"
            variant="solid"
            icon={<Phone size={20} color="#1E78F5" />}
            iconPosition="start"
          />

          <PrimaryButton
            title="Continue with Google"
            onPress={() => navigation.navigate('EmailSigninScreen')}
            colors={['#ffffff']}
            iconBackground="#EDEDED"
            variant="outline"
            icon={<GoogleIcon width={20} height={20} />}
            iconPosition="start"
          />

          <View className="items-center mt-2">
            <Text className="text-white/80 text-[13px]">
              Already have an account?{' '}
              <Text
                className="text-[#FBB202] font-semibold"
                onPress={() => navigation.navigate('Login')}
              >
                Login
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
