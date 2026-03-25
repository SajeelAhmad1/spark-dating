import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  ChevronLeft,
  MoreVertical,
  Clock,
  Image as ImageIcon,
  Send,
} from 'lucide-react-native';
import CameraIcon from '@/assets/images/cameraIcon.svg';
import PhotoPreviewScreen from './PhotoPreviewScreen';
import CameraScreen from './CameraScreen';
import { launchImageLibrary } from 'react-native-image-picker';
import { BlurView } from '@react-native-community/blur';

// ─── Types ────────────────────────────────────────────────────────────────────

type MessageType = 'text' | 'image' | 'snap';
type MessageSender = 'me' | 'friend';

interface Message {
  id: string;
  type: MessageType;
  sender: MessageSender;
  text?: string;
  imageUri?: string;
  time: string;
  snapDuration?: string;
  seen?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getTimeString = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const generateId = () =>
  Date.now().toString() + Math.random().toString(36).slice(2);

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'image',
    sender: 'friend',
    imageUri:
      'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=300',
    time: '',
  },
  {
    id: '2',
    type: 'text',
    sender: 'friend',
    text: 'Hello! Nice to meet you 😊',
    time: '10:05 AM',
  },
  {
    id: '3',
    type: 'text',
    sender: 'me',
    text: 'Hi Maria! Nice to meet you too!',
    time: '10:05 AM',
    seen: true,
  },
  {
    id: '4',
    type: 'snap',
    sender: 'friend',
    text: 'Tap to view snap',
    time: '10:05 AM',
    snapDuration: '20s',
  },
  {
    id: '5',
    type: 'snap',
    sender: 'me',
    text: 'Photo',
    time: '10:05 AM',
    seen: true,
  },
];

// ─── Avatar ───────────────────────────────────────────────────────────────────

const Avatar = ({ size = 40 }: { size?: number }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#C8A882',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}
  >
    <Text style={{ fontSize: size * 0.55 }}>👩</Text>
  </View>
);

const MyAvatar = ({ size = 40 }: { size?: number }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#8B6F5E',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}
  >
    <Text style={{ fontSize: size * 0.55 }}>🧔</Text>
  </View>
);

// ─── Message Bubble ───────────────────────────────────────────────────────────

const MessageBubble = ({ message }: { message: Message }) => {
  const isMe = message.sender === 'me';

  if (message.type === 'image') {
    return (
      <View
        style={{
          alignItems: isMe ? 'flex-end' : 'flex-start',
          marginBottom: 12,
          paddingHorizontal: 16,
          flexDirection: isMe ? 'row-reverse' : 'row',
          gap: 8,
          alignSelf: 'stretch',
        }}
      >
        {isMe ? <MyAvatar size={32} /> : <Avatar size={32} />}
        <Image
          source={{ uri: message.imageUri }}
          style={{ width: 148, height: 208, borderRadius: 16 }}
          resizeMode="cover"
        />
      </View>
    );
  }

  if (message.type === 'snap') {
    if (isMe) {
      return (
        <View
          style={{
            alignItems: 'flex-end',
            marginBottom: 4,
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}
          >
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#1E78F5',
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  gap: 6,
                }}
              >
                <Text style={{ fontSize: 16, color: '#FFFFFF' }}>✦</Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontWeight: '500',
                    fontSize: 16,
                    lineHeight: 16,
                    color: '#FFFFFF',
                  }}
                >
                  {message.text}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontWeight: '400',
                    fontSize: 10,
                    lineHeight: 10,
                    color: '#7D858E',
                  }}
                >
                  {message.time}
                </Text>
                {message.seen && (
                  <Text style={{ fontSize: 10, color: '#7D858E' }}>✓✓</Text>
                )}
              </View>
            </View>
            <MyAvatar size={40} />
          </View>
        </View>
      );
    }

    return (
      <View
        style={{
          alignItems: 'flex-start',
          marginBottom: 4,
          paddingHorizontal: 16,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
          <Avatar size={40} />
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(251,178,2,0.2)',
                borderRadius: 20,
                paddingHorizontal: 14,
                paddingVertical: 10,
                gap: 6,
              }}
            >
              <Text style={{ fontSize: 16 }}>📷</Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontWeight: '500',
                  fontSize: 16,
                  lineHeight: 16,
                  color: '#DC9B00',
                }}
              >
                {message.text}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                marginTop: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontWeight: '400',
                  fontSize: 10,
                  lineHeight: 10,
                  color: '#DC9B00',
                }}
              >
                {message.time}
              </Text>
              {message.snapDuration && (
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontWeight: '400',
                    fontSize: 10,
                    lineHeight: 10,
                    color: '#DC9B00',
                  }}
                >
                  {message.snapDuration}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Text message
  if (isMe) {
    return (
      <View
        style={{
          alignItems: 'flex-end',
          marginBottom: 4,
          paddingHorizontal: 16,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
          <View style={{ alignItems: 'flex-end' }}>
            <View
              style={{
                backgroundColor: '#1E78F5',
                borderRadius: 20,
                borderBottomRightRadius: 4,
                paddingHorizontal: 16,
                paddingVertical: 10,
                maxWidth: 260,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontWeight: '400',
                  fontSize: 16,
                  lineHeight: 16,
                  color: '#FFFFFF',
                }}
              >
                {message.text}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                marginTop: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontWeight: '400',
                  fontSize: 10,
                  lineHeight: 10,
                  color: '#7D858E',
                }}
              >
                {message.time}
              </Text>
              {message.seen && (
                <Text style={{ fontSize: 10, color: '#1E78F5' }}>✓✓</Text>
              )}
            </View>
          </View>
          <MyAvatar size={40} />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: 'flex-start',
        marginBottom: 4,
        paddingHorizontal: 16,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
        <Avatar size={40} />
        <View>
          <View
            style={{
              backgroundColor: 'rgba(251,178,2,0.2)',
              borderRadius: 20,
              borderBottomLeftRadius: 4,
              paddingHorizontal: 16,
              paddingVertical: 10,
              maxWidth: 260,
            }}
          >
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontWeight: '400',
                fontSize: 16,
                lineHeight: 16,
                color: '#000000',
              }}
            >
              {message.text}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontWeight: '400',
              fontSize: 10,
              lineHeight: 10,
              color: '#7D858E',
              marginTop: 4,
            }}
          >
            {message.time}
          </Text>
        </View>
      </View>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

interface ChatScreenProps {
  navigation?: any;
  isLocked?: boolean;
}

export default function ChatScreen({
  navigation,
  isLocked: initialLocked = true,
}: ChatScreenProps) {
  const [isLocked, setIsLocked] = useState(initialLocked);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [messageText, setMessageText] = useState('');

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedPhotoUri, setCapturedPhotoUri] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSendingPhoto, setIsSendingPhoto] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  // ── Text send ──────────────────────────────────────────────────────────────

  const handleSendText = () => {
    const trimmed = messageText.trim();
    if (!trimmed) return;

    const newMsg: Message = {
      id: generateId(),
      type: 'text',
      sender: 'me',
      text: trimmed,
      time: getTimeString(),
      seen: false,
    };

    setMessages(prev => [...prev, newMsg]);
    setMessageText('');
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  };

  // ── Camera flow ───────────────────────────────────────────────────────────

  const handlePhotoCapture = (uri: string) => {
    setCapturedPhotoUri(uri);
    setIsCameraOpen(false);
    setIsPreviewOpen(true);
  };

  // ── Gallery flow (no preview, direct send, unlocks chat) ─────────────────

  const handleOpenGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
        includeBase64: false,
      },
      response => {
        if (
          !response.didCancel &&
          !response.errorCode &&
          response.assets?.[0]?.uri
        ) {
          const uri = response.assets[0].uri;

          if (isLocked) setIsLocked(false);

          const imageMsg: Message = {
            id: generateId(),
            type: 'image',
            sender: 'me',
            imageUri: uri,
            time: getTimeString(),
          };

          setMessages(prev => [...prev, imageMsg]);
          setTimeout(
            () => scrollViewRef.current?.scrollToEnd({ animated: true }),
            100,
          );
        }
      },
    );
  };

  // ── Camera photo send (snap badge) ────────────────────────────────────────

  const handleDownloadPhoto = async () => {
    if (!capturedPhotoUri) return;
    try {
      Alert.alert('Saved', 'Photo saved to your gallery.');
    } catch {
      Alert.alert('Error', 'Could not save photo.');
    }
  };

  const handleSendPhoto = async () => {
    if (!capturedPhotoUri) return;
    setIsSendingPhoto(true);

    await new Promise(res => setTimeout(res, 600));

    const snapMsg: Message = {
      id: generateId(),
      type: 'snap',
      sender: 'me',
      text: 'Photo',
      imageUri: capturedPhotoUri,
      time: getTimeString(),
      seen: false,
    };

    setMessages(prev => [...prev, snapMsg]);
    setIsSendingPhoto(false);
    setIsPreviewOpen(false);
    setCapturedPhotoUri(null);
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

      {/* Nav bar + messages wrapped so BlurView can cover both as absoluteFill sibling */}
      <View style={{ flex: 1 }}>

        {/* ── Nav Bar ── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: '#FFFFFF',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={{ marginRight: 8 }}
          >
            <ChevronLeft size={24} color="#7D858E" strokeWidth={2} />
          </TouchableOpacity>

          <Avatar size={40} />

          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontWeight: '400',
                fontSize: 20,
                lineHeight: 20,
                color: '#000000',
              }}
            >
              Jenny
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontWeight: '400',
                fontSize: 12,
                lineHeight: 12,
                color: '#1E78F5',
                marginTop: 2,
              }}
            >
              Online
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              marginRight: 12,
            }}
          >
            <Clock size={14} color="#7D858E" strokeWidth={2} />
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontWeight: '500',
                fontSize: 13,
                lineHeight: 13,
                color: '#7D858E',
              }}
            >
              23h
            </Text>
          </View>

          <TouchableOpacity>
            <MoreVertical size={22} color="#1E78F5" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* ── Messages ── */}
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 12 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: false })
          }
        >
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.06)',
                borderRadius: 99,
                paddingHorizontal: 14,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: '#7D858E',
                }}
              >
                Today
              </Text>
            </View>
          </View>

          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </ScrollView>

        {/* ── Blur overlay — absoluteFill inside the wrapper, covers nav + messages ── */}
        {isLocked && (
  <View style={StyleSheet.absoluteFill}>
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="light"
      blurAmount={10}
      overlayColor="rgba(251, 178, 2, 0.20)"  // ← this replaces the separate tint View
    />
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 40 }}>🔒</Text>
      <Text style={{ fontFamily: 'Poppins-Medium', fontWeight: '500', fontSize: 32, color: '#000000' }}>
        Chat Locked
      </Text>
    </View>
  </View>
)}

      {/* ── Bottom: unlock button OR normal input bar — always outside blur ── */}
      {isLocked ? (
        <TouchableOpacity
          onPress={handleOpenGallery}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            backgroundColor: '#FBB202',
            marginHorizontal: 16,
            marginBottom: 16,
            marginTop: 8,
            borderRadius: 99,
            paddingVertical: 16,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>🔓</Text>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontWeight: '500',
              fontSize: 16,
              lineHeight: 16,
              color: '#000000',
            }}
          >
            Send Image to Unlock the chat
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            gap: 10,
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Camera button */}
          <TouchableOpacity
            onPress={() => setIsCameraOpen(true)}
            style={{
              width: 56,
              height: 56,
              borderRadius: 92,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CameraIcon width={56} height={56} />
          </TouchableOpacity>

          {/* Text input */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              height: 48,
              borderRadius: 99,
              borderWidth: 1,
              borderColor: '#B6B9C9',
              paddingHorizontal: 16,
              gap: 8,
              backgroundColor: '#FFFFFF',
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.04,
              shadowRadius: 24,
              elevation: 1,
            }}
          >
            <TextInput
              placeholder="Type to a message..."
              placeholderTextColor="#B6B9C9"
              value={messageText}
              onChangeText={setMessageText}
              onSubmitEditing={handleSendText}
              returnKeyType="send"
              blurOnSubmit={false}
              style={{
                flex: 1,
                fontFamily: 'Poppins-Regular',
                fontWeight: '400',
                fontSize: 16,
                lineHeight: 16,
                color: '#333333',
                padding: 0,
              }}
            />

            {/* Gallery icon */}
            <TouchableOpacity onPress={handleOpenGallery}>
              <ImageIcon size={20} color="#7D858E" strokeWidth={1.8} />
            </TouchableOpacity>

            {/* Send icon */}
            <TouchableOpacity
              onPress={handleSendText}
              disabled={!messageText.trim()}
            >
              <Send
                size={20}
                color={messageText.trim() ? '#1E78F5' : '#B6B9C9'}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ── Camera Screen (modal) ── */}
      <CameraScreen
        visible={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onPhotoCapture={handlePhotoCapture}
      />

      {/* ── Photo Preview Screen (modal) ── */}
      <PhotoPreviewScreen
        visible={isPreviewOpen}
        photoUri={capturedPhotoUri}
        isSending={isSendingPhoto}
        onClose={() => {
          setIsPreviewOpen(false);
          setCapturedPhotoUri(null);
        }}
        onDownload={handleDownloadPhoto}
        onSend={handleSendPhoto}
      />

    </SafeAreaView>
  );
}