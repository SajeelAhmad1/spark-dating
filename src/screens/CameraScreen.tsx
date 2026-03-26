import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { Cross, FlashlightIcon, FlashlightOffIcon, GalleryVerticalIcon, FlipHorizontal } from 'lucide-react-native';
import { sf, sr, sw, sh } from '@/utils/responsive';

interface CameraScreenProps {
  visible: boolean;
  onClose: () => void;
  onPhotoCapture?: (photoUri: string) => void;
}

export default function CameraScreen({ visible, onClose, onPhotoCapture }: CameraScreenProps) {
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [isPickingImage, setIsPickingImage] = useState(false);

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice(facing);
  const cameraRef = useRef<Camera>(null);

  const toggleFlip = () => setFacing(f => (f === 'back' ? 'front' : 'back'));
  const toggleFlash = () => setFlashEnabled(f => !f);

  const takePhoto = async () => {
    if (!cameraRef.current || !hasPermission || !device) {
      return;
    }

    try {
      setIsTakingPhoto(true);
      const photo = await cameraRef.current.takePhoto({
        flash: flashEnabled ? 'on' : 'off',
      });
      
      if (photo && photo.path) {
        if (onPhotoCapture) {
          onPhotoCapture(`file://${photo.path}`);
        }
        onClose();
      }
    } catch (error) {
      console.error('Failed to take photo:', error);
    } finally {
      setIsTakingPhoto(false);
    }
  };

  const openGallery = () => {
    setIsPickingImage(true);
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
        includeBase64: false,
      },
      (response) => {
        setIsPickingImage(false);
        
        if (!response.didCancel && !response.error && response.assets && response.assets[0]) {
          const selectedImage = response.assets[0].uri;
          if (selectedImage && onPhotoCapture) {
            onPhotoCapture(selectedImage);
            onClose();
          }
        }
      }
    );
  };

  React.useEffect(() => {
    if (visible && !hasPermission) {
      requestPermission();
    }
  }, [visible, hasPermission, requestPermission]);

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent>
      <StatusBar barStyle="light-content" backgroundColor="#000" hidden />
      <View style={styles.fullScreenContainer}>
        {hasPermission && device ? (
          <>
            <Camera
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={visible}
              torch={flashEnabled ? 'on' : 'off'}
              photo={true}
              enableZoomGesture={true}
            />
            
            {isTakingPhoto && (
              <View style={styles.capturingOverlay}>
                <ActivityIndicator size="large" color="#FFFFFF" />
              </View>
            )}

            <View style={styles.topControls}>
              <TouchableOpacity style={styles.controlButton} onPress={onClose}>
                <Cross size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
                {flashEnabled
                  ? <FlashlightIcon size={24} color="#FFFFFF" />
                  : <FlashlightOffIcon size={24} color="#FFFFFF" />
                }
              </TouchableOpacity>
            </View>

            <View style={styles.bottomControls}>
              <TouchableOpacity 
                style={styles.controlButton} 
                onPress={openGallery}
                disabled={isPickingImage}
              >
                {isPickingImage ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <GalleryVerticalIcon size={24} color="#FFFFFF" />
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.shutterButton} 
                onPress={takePhoto}
                disabled={isTakingPhoto}
              >
                <View style={styles.shutterInner} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.controlButton} 
                onPress={toggleFlip}
                disabled={isTakingPhoto}
              >
                <FlipHorizontal size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>
              {!hasPermission ? 'Camera permission required' : 'No camera device found'}
            </Text>
            {!hasPermission && (
              <TouchableOpacity onPress={requestPermission} style={styles.grantButton}>
                <Text style={styles.grantButtonText}>Grant Permission</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: sw(20),
    paddingTop: sh(50),
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: sw(30),
    paddingBottom: sh(40),
  },
  controlButton: {
    width: sf(50),
    height: sf(50),
    borderRadius: sr(25),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterButton: {
    width: sf(72),
    height: sf(72),
    borderRadius: sr(36),
    borderWidth: sf(4),
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  shutterInner: {
    width: sf(56),
    height: sf(56),
    borderRadius: sr(28),
    backgroundColor: '#FFFFFF',
  },
  capturingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: sw(20),
  },
  permissionText: {
    color: '#888',
    fontFamily: 'Poppins-Regular',
    fontSize: sf(16),
    marginBottom: sh(20),
    textAlign: 'center',
  },
  grantButton: {
    paddingHorizontal: sw(24),
    paddingVertical: sh(12),
    borderRadius: 999,
    backgroundColor: '#1E78F5',
  },
  grantButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: sf(14),
  },
});
