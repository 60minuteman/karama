import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Pill } from '@/components/ui/Pill';

interface ProfileCardProps {
  image: string;
  name: string;
  age: number;
  location: string;
  pronouns: string;
  rating: number;
  role: string;
  experience: string[];
  lookingFor: string[];
  hourlyRate: string;
  languages: string[];
  interests: string[];
  obsession: string;
  religion?: string;
  personality: string[];
  disabilities?: string[];
}

export const ProfileCard = ({
  image,
  name,
  age,
  location,
  pronouns,
  rating,
  role,
  experience,
  lookingFor,
  hourlyRate,
  languages,
  interests,
  obsession,
  religion,
  personality,
  disabilities,
}: ProfileCardProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      
      <View style={styles.overlay}>
        <View style={styles.header}>
          <View style={styles.pronounsContainer}>
            <ThemedText style={styles.pronouns}>{pronouns}</ThemedText>
          </View>
          <View style={styles.ratingContainer}>
            <ThemedText style={styles.rating}>{rating}</ThemedText>
            <ThemedText style={styles.star}>⭐</ThemedText>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.info}>
            <ThemedText style={styles.name}>{name}, {age}</ThemedText>
            <ThemedText style={styles.location}>{location}</ThemedText>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionIcon}>✕</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.likeButton]}>
              <ThemedText style={styles.actionIcon}>♥</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.details}>
        <Section title="I am">
          <Pill label={role} icon="👩‍⚕️" />
        </Section>

        <Section title="I have experience with">
          {experience.map((exp, i) => (
            <Pill key={i} label={exp} icon="👶" />
          ))}
        </Section>

        <Section title="I'm Looking For">
          {lookingFor.map((item, i) => (
            <Pill key={i} label={item} icon="⏰" />
          ))}
        </Section>

        <Section title="My Hourly Rate">
          <Pill label={hourlyRate} icon="⌛" />
        </Section>

        <Section title="I speak">
          {languages.map((lang, i) => (
            <Pill key={i} label={lang} icon="💬" />
          ))}
        </Section>

        <Section title="My Interests">
          {interests.map((interest, i) => (
            <Pill key={i} label={interest} icon="🎨" />
          ))}
        </Section>

        <Section title="My current obsession is">
          <ThemedText style={styles.obsession}>{obsession}</ThemedText>
        </Section>

        {religion && (
          <Section title="Our religion">
            <Pill label={religion} icon="🕉️" />
          </Section>
        )}

        <Section title="Personality">
          {personality.map((trait, i) => (
            <Pill key={i} label={trait} icon="😊" />
          ))}
        </Section>

        {disabilities && disabilities.length > 0 && (
          <Section title="Disability experience">
            {disabilities.map((disability, i) => (
              <Pill key={i} label={disability} />
            ))}
          </Section>
        )}
      </View>
    </View>
  );
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <View style={styles.section}>
    <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pronounsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pronouns: {
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  rating: {
    fontSize: 14,
    marginRight: 4,
  },
  star: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  location: {
    fontSize: 16,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    backgroundColor: '#FF4B55',
  },
  actionIcon: {
    fontSize: 24,
  },
  details: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 12,
  },
  sectionContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  obsession: {
    fontSize: 24,
    fontWeight: '600',
  },
}); 