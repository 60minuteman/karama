import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeableCardStack } from '@/components/ui/SwipeableCardStack';

// Mock data for both caregivers and families
const mockCaregivers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 28,
    location: 'Brooklyn, NY',
    hourlyRate: 25,
    experience: '5 years',
    specialties: ['Infant Care', 'Special Needs'],
    bio: 'Passionate about child development with early childhood education background.',
    images: ['https://picsum.photos/400/600?random=1'],
    isVerified: true,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    age: 32,
    location: 'Manhattan, NY',
    hourlyRate: 30,
    experience: '8 years',
    specialties: ['Newborn Care', 'Night Shifts'],
    bio: 'Certified pediatric nurse with extensive overnight care experience.',
    images: ['https://picsum.photos/400/600?random=2'],
    isVerified: true,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Emily Chen',
    age: 26,
    location: 'Queens, NY',
    hourlyRate: 22,
    experience: '3 years',
    specialties: ['Toddler Care', 'Activities'],
    bio: 'Creative caregiver who loves engaging children in educational activities.',
    images: ['https://picsum.photos/400/600?random=3'],
    isVerified: false,
    isOnline: true,
  },
];

const mockFamilies = [
  {
    id: '1',
    familyName: 'The Smiths',
    children: [
      { age: 3, gender: 'girl' },
      { age: 5, gender: 'boy' }
    ],
    location: 'Upper East Side, NY',
    hourlyRate: 28,
    schedule: 'Part-time weekdays',
    bio: 'Looking for a caring nanny for our two energetic kids.',
    images: ['https://picsum.photos/400/600?random=4'],
    isVerified: true,
  },
  {
    id: '2',
    familyName: 'The Johnsons',
    children: [
      { age: 1, gender: 'boy' }
    ],
    location: 'Brooklyn Heights, NY',
    hourlyRate: 32,
    schedule: 'Full-time',
    bio: 'New parents seeking experienced infant care specialist.',
    images: ['https://picsum.photos/400/600?random=5'],
    isVerified: true,
  },
  {
    id: '3',
    familyName: 'The Williams',
    children: [
      { age: 7, gender: 'girl' },
      { age: 9, gender: 'girl' }
    ],
    location: 'Manhattan, NY',
    hourlyRate: 25,
    schedule: 'After school',
    bio: 'Need help with after-school care and homework assistance.',
    images: ['https://picsum.photos/400/600?random=6'],
    isVerified: false,
  },
];

const mockCaregiverProfile = {
  name: 'Alex Thompson',
  role: 'CAREGIVER',
  location: 'New York, NY',
  preferences: {
    childAges: ['toddler', 'preschooler'],
    specialNeeds: true,
    petFriendly: true,
  }
};

const mockFamilyProfile = {
  name: 'The Davis Family',
  role: 'FAMILY',
  location: 'Manhattan, NY',
  children: [
    { age: 4, gender: 'boy', name: 'Lucas' }
  ],
  preferences: {
    experience: 'experienced',
    background_check: true,
    references: true,
  }
};

export default function DiscoveryUIPreview() {
  const [userRole, setUserRole] = useState<'FAMILY' | 'CAREGIVER'>('FAMILY');
  const [loading, setLoading] = useState(false);

  const currentData = userRole === 'FAMILY' ? mockCaregivers : mockFamilies;
  const profileData = userRole === 'FAMILY' ? mockFamilyProfile : mockCaregiverProfile;

  const handleSwipeRight = async (item: any, index: number) => {
    console.log('Liked:', item.name || item.familyName);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleSwipeLeft = async (item: any, index: number) => {
    console.log('Passed:', item.name || item.familyName);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
  };

  const toggleRole = () => {
    setUserRole(prev => prev === 'FAMILY' ? 'CAREGIVER' : 'FAMILY');
  };

  const toggleLoading = () => {
    setLoading(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discovery Screen Preview</Text>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={toggleRole}>
            <Text style={styles.buttonText}>
              Switch to {userRole === 'FAMILY' ? 'Caregiver' : 'Family'} View
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleLoading}>
            <Text style={styles.buttonText}>
              {loading ? 'Hide' : 'Show'} Loading
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          Currently viewing as: {userRole}
        </Text>
      </View>

      <SwipeableCardStack
        data={currentData}
        onSwipeRight={handleSwipeRight}
        onSwipeLeft={handleSwipeLeft}
        loading={loading}
        userRole={userRole}
        caregiverProfileData={userRole === 'FAMILY' ? profileData : undefined}
        familyProfileData={userRole === 'CAREGIVER' ? profileData : undefined}
        containerStyle={styles.cardStack}
        stackSize={3}
        swipeThreshold={80}
        enableVerticalSwipe={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 120,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardStack: {
    flex: 1,
    paddingTop: 10,
  },
}); 