import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { X } from 'lucide-react-native';
import CameraIcon from '@/assets/images/cameraIcon.svg';
import CameraScreen from './CameraScreen';
import PhotoPreviewScreen from './PhotoPreviewScreen';

const MatchScreen = () => {
  const [isCamOpen, setIsCamOpen] = useState(false);
  const [isPhotoPreviewOpen, setIsPhotoPreviewOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { width } = useWindowDimensions();

  // Larger photos to match Figma
  const PHOTO_WIDTH = width * 0.40;
  const PHOTO_HEIGHT = PHOTO_WIDTH * 1.5;

  // Container tall enough for both photos + rotation bleed
  const CONTAINER_HEIGHT = PHOTO_HEIGHT + 120;

  // Smaller circle so it doesn't dominate the title row
  const CIRCLE_SIZE = 156;

  // Function to send photo message
  const sendPhotoMessage = async (photoUri: string) => {
    try {
      setIsSending(true);
      
      // Upload to server (uncomment and configure as needed)
      /*
      const formData = new FormData();
      formData.append('photo', {
        uri: photoUri,
        type: 'image/jpeg',
        name: `photo_${Date.now()}.jpg`,
      });
      formData.append('message', inputMessage);
      
      const response = await fetch('YOUR_API_ENDPOINT/messages', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      */
      
      // For demo purposes, simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Photo sent:', photoUri);
      console.log('Message:', inputMessage);
      
      // Clear after successful send
      setCapturedPhoto(null);
      setInputMessage('');
      setIsPhotoPreviewOpen(false);
      
    } catch (error) {
      console.error('Error sending photo:', error);
    } finally {
      setIsSending(false);
    }
  };

  // Function to download photo
  const downloadPhoto = () => {
    if (capturedPhoto) {
      // Implement download functionality
      console.log('Downloading photo:', capturedPhoto);
      // You can use react-native-fs or similar library to save to device
    }
  };

  // Function to handle captured photo from camera
  const handlePhotoCapture = (photoUri: string) => {
    setCapturedPhoto(photoUri);
    setIsPhotoPreviewOpen(true);
  };

  // Function to handle send button from preview screen
  const handleSendPhoto = () => {
    if (capturedPhoto) {
      sendPhotoMessage(capturedPhoto);
    }
  };

  // Function to close preview
  const handleClosePreview = () => {
    setIsPhotoPreviewOpen(false);
    setCapturedPhoto(null);
    setInputMessage('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FBB202' }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingTop: 28,
          paddingBottom: 24,
        }}
      >
        {/* ── Title ── */}
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
          {/* Perfect circle — width === height */}
          <View
            style={{
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              borderRadius: CIRCLE_SIZE / 2,
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

        {/* ── Photo Stack — flex:1 so it expands to fill available space ── */}
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: '70%',
              height: CONTAINER_HEIGHT,
            }}
          >
            {/* Right photo — smaller, rotated +12deg, behind left photo */}
            <View
              style={{
                position: 'absolute',
                right: width * 0.00,
                width: PHOTO_WIDTH,
                height: PHOTO_HEIGHT,
                borderRadius: 18,
                transform: [{ rotate: '10deg' }],
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.18,
                shadowRadius: 6,
                overflow: 'hidden',
                backgroundColor: '#ddd',
              }}
            >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
                }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>

            {/* Left photo — larger, rotated -12deg, in front (higher elevation) */}
            <View
              style={{
                position: 'absolute',
                left: width * 0.00,
                top: 100,
                width: PHOTO_WIDTH,
                height: PHOTO_HEIGHT,
                borderRadius: 18,
                transform: [{ rotate: '-10deg' }],
                elevation: 8,
                shadowColor: '#000',
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.18,
                shadowRadius: 6,
                overflow: 'hidden',
                backgroundColor: '#ddd',
              }}
            >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
                }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>

            {/* Top heart — in the gap between the two photos, near top */}
            <View
              style={{
                position: 'absolute',
                top: -30,          
                left: 0,
                right: 0,
                alignItems: 'center',
                zIndex: 20,
                transform: [{ rotate: '10deg' }],
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 24 }}>❤️</Text>
              </View>
            </View>

            {/* Bottom-left heart — mid-lower of the left photo */}
            <View
              style={{
                position: 'absolute',
                bottom: -10,
                left: width * 0.02,
                zIndex: 20,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [{ rotate: '-10deg' }],
                }}
              >
                <Text style={{ fontSize: 24 }}>❤️</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Subtitle ── */}
        <Text
          style={{
            lineHeight: 20,
          }}
          className='font-medium text-[16px] text-[#000000] mb-4 text-center'
        >
          {'You and Emma liked each other.'}
        </Text>

        {/* ── Input ── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#000000',
            borderRadius: 999,
            paddingHorizontal: 18,
            paddingVertical: 4,
            width: '100%',
            marginBottom: 20,
            backgroundColor: '#000000',
          }}
        >
          <TextInput
            placeholder="Show Emma what you're doing..."
            placeholderTextColor="#FFFFFF"
            value={inputMessage}
            onChangeText={setInputMessage}
            style={{
              flex: 1,
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              lineHeight: 18,
              padding: 4,
              color: '#FFFFFF',
            }}
          />

          {/* Camera Icon Button */}
          <TouchableOpacity onPress={() => setIsCamOpen(true)}>
            <CameraIcon width={32} height={32} />
          </TouchableOpacity>
        </View>

        {/* Camera Modal */}
        <CameraScreen
          visible={isCamOpen}
          onClose={() => setIsCamOpen(false)}
          onPhotoCapture={handlePhotoCapture}
        />

        {/* Photo Preview Modal */}
        <PhotoPreviewScreen
          visible={isPhotoPreviewOpen}
          photoUri={capturedPhoto}
          isSending={isSending}
          onClose={handleClosePreview}
          onDownload={downloadPhoto}
          onSend={handleSendPhoto}
        />

        {/* ── Close button ── */}
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#1E78F5',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={18} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default MatchScreen;
