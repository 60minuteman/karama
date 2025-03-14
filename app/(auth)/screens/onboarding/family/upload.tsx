import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import useAuthMutation from '@/hooks/useAuthMutation';
import customAxios from '@/services/api/envConfig';
import { useUserStore } from '@/services/state/user';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Page() {
  const { family_images, setFamilyImages } = useUserStore();

  const uploadMutation = useAuthMutation({
    mutationFn: async () => {
      const formData = new FormData();
      family_images.forEach((uri, index) => {
        const fileName = uri.split('/').pop() || `image${index}.jpg`;

        formData.append('files', {
          uri,
          name: fileName,
          type: 'image/jpeg',
        } as any);
      });

      return customAxios.post('/family-profile/add-photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      router.push('/(auth)/screens/onboarding/family/success');
    },
    onError: (error: any) => {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    },
  });

  const pickImage = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // Add new image to existing images array
      const newImages = [...family_images, result.assets[0].uri];
      // Limit to 6 images
      if (newImages.length <= 6) {
        setFamilyImages(newImages);
      } else {
        alert('Maximum 6 images allowed');
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = family_images.filter((_, i) => i !== index);
    setFamilyImages(newImages);
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={styles.title}>
          Great, Now let's tie it all with some fun{'\n'}family photos!
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Share pictures of your family, pets, toys{'\n'}and so much more. This
          will help the{'\n'}caregiver understand your family more!
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Select Photos</ThemedText>

        <View style={styles.photoGrid}>
          {[...Array(6)].map((_, index) => (
            <View key={index} style={styles.photoPlaceholder}>
              {index < family_images.length ? (
                <>
                  <Image
                    source={{ uri: family_images[index] }}
                    style={styles.photoImage}
                  />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <ThemedText style={styles.removeButtonText}>✕</ThemedText>
                  </TouchableOpacity>
                </>
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
          <Button label='Add photo' onPress={pickImage} variant='compact' />
        </View>
      </View>

      <View style={styles.bottomNav}>
        <View style={styles.buttonContainer}>
          <Button
            label='Next'
            onPress={() => uploadMutation.mutate()}
            variant='compact'
            disabled={family_images.length < 4 || uploadMutation.isPending}
            loading={uploadMutation.isPending}
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
