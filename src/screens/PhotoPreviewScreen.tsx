import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { X, Download } from 'lucide-react-native';
import PrimaryButton from '@/components/common/PrimaryButton';

interface PhotoPreviewScreenProps {
  visible: boolean;
  photoUri: string | null;
  isSending: boolean;
  onClose: () => void;
  onDownload: () => void;
  onSend: () => void;
}

export default function PhotoPreviewScreen({
  visible,
  photoUri,
  isSending,
  onClose,
  onDownload,
  onSend,
}: PhotoPreviewScreenProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      statusBarTranslucent
      transparent={false}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        <View style={{ flex: 1 }}>
          {/* Header with Cross icon and top margin */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingHorizontal: 20,
              paddingTop: 60,
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Photo Display */}
          {photoUri && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                marginTop: -40,
              }}
            >
              <Image
                source={{ uri: photoUri }}
                style={{
                  width: '100%',
                  height: '70%',
                  borderRadius: 24,
                  resizeMode: 'cover',
                }}
              />
            </View>
          )}

          {/* Bottom Buttons */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 20,
              paddingHorizontal: 20,
              paddingBottom: 40,
              paddingTop: 20,
            }}
          >
            {/* Download Button with Yellow Background */}
            <TouchableOpacity
              onPress={onDownload}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#FBB202',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              disabled={isSending}
            >
              <Download size={28} color="#000000" />
            </TouchableOpacity>

            {/* Send Button */}
            <View style={{ flex: 1 }}>
              <PrimaryButton
                title={isSending ? "Sending..." : "Send"}
                onPress={onSend}
                colors={['#1E78F5', '#FBB202']}
                variant="gradient"
                style={{ alignSelf: 'stretch' }}
                iconPosition="end"
                disabled={isSending}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
