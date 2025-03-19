import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import useAuthMutation from '@/hooks/useAuthMutation';
import customAxios from '@/services/api/envConfig';
import { useUserStore } from '@/services/state/user';
import { useMutation } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Page() {
  const { caregiverImages, setCaregiverImages } = useUserStore();
  // const [image, setImage] = useState<string | null>(null);
  const uploadImages = useAuthMutation({
    mutationFn: async () => {
      const formData = new FormData();
      caregiverImages?.forEach((uri, index) => {
        const fileName = uri.split('/').pop() || `image${index}.jpg`;

        formData.append('files', {
          uri,
          name: fileName,
          type: 'image/jpeg',
        } as any);
      });

      return customAxios.post('/caregiver-profile/add-photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      router.push('/(auth)/screens/onboarding/family/success');
      console.log('CAREGIVER IMAGES UPLOADED SUCCESSFULLY');
    },
    onError: (error: any) => {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    },
  });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 6,
    });

    console.log(result, 'is result');

    if (!result.canceled) {
      const selectedImages = result?.assets?.map((item) => {
        return item?.uri;
      });
      setCaregiverImages(selectedImages);
    }
  };
  const removeImage = (index: number) => {
    const newImages = caregiverImages?.filter((_, i) => i !== index);
    setCaregiverImages(newImages);
  };
  useEffect(() => {
    console.log(caregiverImages);
  }, [caregiverImages]);
  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />
        <ScrollView>
          <ThemedText style={styles.title}>
            Great, Now let's tie it all with some fun photos!
          </ThemedText>

          <ThemedText style={styles.subtitle}>
            Share pictures of yourself, your projects, activities, and hobbies.
            If you include photos from previous childcare positions, make sure
            you have permission from the families to post them. Please don't
            share pictures that show children's faces; cover or blur them.
          </ThemedText>

          <ThemedText style={styles.sectionTitle}>Select Photos</ThemedText>

          <View style={styles.photoGrid}>
            {[...Array(6)].map((_, index) => (
              <View key={index} style={styles.photoPlaceholder}>
                {index < caregiverImages?.length ? (
                  <View>
                    <Image
                      source={{ uri: caregiverImages[index] }}
                      style={styles.photoImage}
                    />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeImage(index)}
                    >
                      <ThemedText style={styles.removeButtonText}>✕</ThemedText>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.photoPlaceholderInner} />
                )}
              </View>
            ))}
          </View>

          <ThemedText style={styles.dragHint}>
            Tap to edit, drag to Rearrange
          </ThemedText>

          <View style={styles.addPhotoContainer}>
            <Button
              label='Add photo'
              onPress={() => {
                // We'll implement this later
                // console.log('Add photo pressed');
                pickImage();
              }}
              variant='compact'
              disabled={caregiverImages?.length === 6}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomNav}>
        <View style={styles.buttonContainer}>
          <Button
            label='Next'
            onPress={() => uploadImages.mutate()}
            variant='compact'
            disabled={caregiverImages?.length < 4 || uploadImages.isPending}
            loading={uploadImages.isPending}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  spacerTop: {
    height: 120,
  },
  title: {
    fontSize: 36,
    lineHeight: 44,
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 16,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#94A3B8',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#94A3B8',
    marginBottom: 16,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  photoPlaceholder: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  photoPlaceholderInner: {
    flex: 1,
    backgroundColor: '#EDEAE6',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  removeButtonText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  dragHint: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'left',
    marginBottom: 24,
  },
  addPhotoContainer: {
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bottomNav: {
    padding: 20,
    paddingBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});
