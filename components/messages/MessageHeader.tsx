import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type MessageHeaderProps = {
  name: string;
  activeTab: 'chat' | 'profile';
  onTabChange: (tab: 'chat' | 'profile') => void;
  handleClearMessages: any;
};

export function MessageHeader({
  name,
  activeTab,
  onTabChange,
  handleClearMessages,
}: MessageHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showUnmatchConfirm, setShowUnmatchConfirm] = useState(false);
  const [showReportConfirm, setShowReportConfirm] = useState(false);
  const [showClearChatConfirm, setShowClearChatConfirm] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [isReportChecked, setIsReportChecked] = useState(true);
  const [isBlockAndDeleteChecked, setIsBlockAndDeleteChecked] = useState(true);
  const [rating, setRating] = useState(0);

  const handleMenuPress = () => {
    setIsMenuOpen(true);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  const handleUnmatchPress = () => {
    setIsMenuOpen(false);
    setShowUnmatchConfirm(true);
  };

  const handleUnmatchConfirm = () => {
    // Handle unmatch logic here
    setShowUnmatchConfirm(false);
  };

  const handleBlockPress = () => {
    setIsMenuOpen(false);
    setShowBlockConfirm(true);
  };

  const handleBlockConfirm = () => {
    // Handle block logic here
    setShowBlockConfirm(false);
  };

  const handleReportPress = () => {
    setIsMenuOpen(false);
    setShowReportConfirm(true);
  };

  const handleReportConfirm = () => {
    // Handle report logic here
    setShowReportConfirm(false);
  };

  const handleClearChatPress = () => {
    setIsMenuOpen(false);
    setShowClearChatConfirm(true);
  };

  const handleClearChatConfirm = () => {
    // Handle clear chat logic here
    handleClearMessages();
    setShowClearChatConfirm(false);
  };

  const handleRatePress = () => {
    setIsMenuOpen(false);
    setShowRateModal(true);
  };

  const handleRateConfirm = () => {
    // Handle rate logic here with rating value
    console.log('Rating submitted:', rating);
    setShowRateModal(false);
    setRating(0); // Reset rating after submission
  };

  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const toggleReport = () => {
    setIsReportChecked(!isReportChecked);
  };

  const toggleBlockAndDelete = () => {
    setIsBlockAndDeleteChecked(!isBlockAndDeleteChecked);
  };

  return (
    <>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.push('/matches')}
            style={styles.backButton}
          >
            <Ionicons name='chevron-back' size={24} color='#002140' />
          </TouchableOpacity>
          <ThemedText style={styles.name}>{name}</ThemedText>
          <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
            <Ionicons name='ellipsis-vertical' size={24} color='#002140' />
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
            onPress={() => onTabChange('chat')}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === 'chat' && styles.activeTabText,
              ]}
            >
              Chat
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
            onPress={() => onTabChange('profile')}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === 'profile' && styles.activeTabText,
              ]}
            >
              Profile
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isMenuOpen}
        transparent
        animationType='slide'
        onRequestClose={handleClose}
      >
        <Pressable style={styles.overlay} onPress={handleClose}>
          <View style={styles.modalWrapper}>
            <View style={styles.menuContent}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleUnmatchPress}
              >
                <ThemedText style={[styles.menuText, styles.menuTextCenter]}>
                  Unmatch
                </ThemedText>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleBlockPress}
              >
                <ThemedText style={[styles.menuText, styles.menuTextCenter]}>
                  Block
                </ThemedText>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleClearChatPress}
              >
                <ThemedText style={[styles.menuText, styles.menuTextCenter]}>
                  Clear chat
                </ThemedText>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleRatePress}
              >
                <ThemedText
                  style={[
                    styles.menuText,
                    styles.rateText,
                    styles.menuTextCenter,
                  ]}
                >
                  Rate
                </ThemedText>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleReportPress}
              >
                <ThemedText
                  style={[
                    styles.menuText,
                    styles.reportText,
                    styles.menuTextCenter,
                  ]}
                >
                  Report
                </ThemedText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <ThemedText style={styles.cancelText}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <Modal
        visible={showUnmatchConfirm}
        transparent
        animationType='slide'
        onRequestClose={() => setShowUnmatchConfirm(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setShowUnmatchConfirm(false)}
        >
          <View style={styles.modalWrapper}>
            <View style={styles.menuContent}>
              <ThemedText style={styles.modalTitle}>Unmatch {name}?</ThemedText>
              <ThemedText style={styles.modalDescription}>
                If you unmatch this profile, it will be removed from your
                matched list
              </ThemedText>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={() => setShowUnmatchConfirm(false)}
                >
                  <ThemedText style={styles.cancelActionText}>
                    Cancel
                  </ThemedText>
                </TouchableOpacity>
                <View style={styles.actionDivider} />
                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={handleUnmatchConfirm}
                >
                  <ThemedText style={styles.confirmActionText}>
                    Unmatch
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>

      <Modal
        visible={showBlockConfirm}
        transparent
        animationType='slide'
        onRequestClose={() => setShowBlockConfirm(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setShowBlockConfirm(false)}
        >
          <View style={styles.modalWrapper}>
            <View style={styles.menuContent}>
              <ThemedText style={styles.modalTitle}>Block {name}?</ThemedText>
              <ThemedText style={styles.modalDescription}>
                Blocked contact cannot send you messages.{'\n'}
                This contact will not be notified
              </ThemedText>
              <TouchableOpacity
                style={styles.reportSection}
                onPress={toggleReport}
                activeOpacity={0.8}
              >
                <View style={styles.checkmarkContainer}>
                  {isReportChecked && <View style={styles.checkmark} />}
                </View>
                <View style={styles.reportTextContainer}>
                  <ThemedText style={styles.reportTitle}>
                    Report contact
                  </ThemedText>
                  <ThemedText style={styles.reportDescription}>
                    The last 5 messages will be forwarded to Karama
                  </ThemedText>
                </View>
              </TouchableOpacity>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={() => setShowBlockConfirm(false)}
                >
                  <ThemedText style={styles.cancelActionText}>
                    Cancel
                  </ThemedText>
                </TouchableOpacity>
                <View style={styles.actionDivider} />
                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={handleBlockConfirm}
                >
                  <ThemedText style={styles.confirmActionText}>
                    Block
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>

      <Modal
        visible={showReportConfirm}
        transparent
        animationType='slide'
        onRequestClose={() => setShowReportConfirm(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setShowReportConfirm(false)}
        >
          <View style={styles.modalWrapper}>
            <View style={styles.menuContent}>
              <ThemedText style={styles.modalTitle}>Report {name}?</ThemedText>
              <ThemedText style={styles.modalDescription}>
                The last 5 messages will be forwarded to Karama. If you block
                this contact and delete chat, messages will be deleted from you
                device only.
              </ThemedText>
              <ThemedText style={styles.modalSubDescription}>
                This contact will not be notified
              </ThemedText>
              <TouchableOpacity
                style={styles.reportSection}
                onPress={toggleBlockAndDelete}
                activeOpacity={0.8}
              >
                <View style={styles.checkmarkContainer}>
                  {isBlockAndDeleteChecked && <View style={styles.checkmark} />}
                </View>
                <View style={styles.reportTextContainer}>
                  <ThemedText style={styles.reportTitle}>
                    Block contact and delete chat
                  </ThemedText>
                </View>
              </TouchableOpacity>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={() => setShowReportConfirm(false)}
                >
                  <ThemedText style={styles.cancelActionText}>
                    Cancel
                  </ThemedText>
                </TouchableOpacity>
                <View style={styles.actionDivider} />
                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={handleReportConfirm}
                >
                  <ThemedText style={styles.confirmActionText}>
                    Report
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>

      <Modal
        visible={showClearChatConfirm}
        transparent
        animationType='slide'
        onRequestClose={() => setShowClearChatConfirm(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setShowClearChatConfirm(false)}
        >
          <View style={styles.modalWrapper}>
            <View style={styles.menuContent}>
              <ThemedText style={styles.modalTitle}>
                Clear this chat?
              </ThemedText>
              <ThemedText style={styles.modalDescription}>
                Messages from this chat will be permanently deleted from your
                device
              </ThemedText>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={() => setShowClearChatConfirm(false)}
                >
                  <ThemedText style={styles.cancelActionText}>
                    Cancel
                  </ThemedText>
                </TouchableOpacity>
                <View style={styles.actionDivider} />
                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={handleClearChatConfirm}
                >
                  <ThemedText style={styles.confirmActionText}>
                    Clear
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>

      <Modal
        visible={showRateModal}
        transparent
        animationType='slide'
        onRequestClose={() => setShowRateModal(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setShowRateModal(false)}
        >
          <View style={styles.modalWrapper}>
            <View style={styles.menuContent}>
              <ThemedText style={styles.modalTitle}>Rate {name}</ThemedText>
              <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => handleStarPress(star)}
                    style={styles.starButton}
                  >
                    <Ionicons
                      name={star <= rating ? 'star' : 'star-outline'}
                      size={40}
                      color='#002140'
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={() => setShowRateModal(false)}
                >
                  <ThemedText style={styles.cancelActionText}>
                    Cancel
                  </ThemedText>
                </TouchableOpacity>
                <View style={styles.actionDivider} />
                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={handleRateConfirm}
                >
                  <ThemedText style={styles.confirmActionText}>Rate</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Bogart-Bold',
    color: '#002140',
    textAlign: 'left',
    flex: 1,
    lineHeight: 36,
    marginLeft: 8,
  },
  menuButton: {
    padding: 8,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
    justifyContent: 'center',
    paddingBottom: 12,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#FF4B55',
  },
  tabText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  menuContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
  },
  menuItem: {
    paddingVertical: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#002140',
    fontFamily: 'Poppins',
    lineHeight: 32,
  },
  menuTextCenter: {
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
  },
  rateText: {
    color: '#4CAF50',
  },
  reportText: {
    color: '#FF4B55',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    padding: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#002140',
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  modalTitle: {
    fontSize: 24,
    color: '#002140',
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Poppins',
    lineHeight: 32,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 32,
    fontFamily: 'Poppins',
  },
  modalSubDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    fontFamily: 'Poppins',
  },
  modalActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginHorizontal: -24,
    marginBottom: -24,
    marginTop: 24,
  },
  modalActionButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionDivider: {
    width: 1,
    backgroundColor: '#F0F0F0',
  },
  cancelActionText: {
    fontSize: 16,
    color: '#002140',
    fontFamily: 'Poppins',
  },
  confirmActionText: {
    fontSize: 16,
    color: '#FF4B55',
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  reportSection: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    padding: 16,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#002140',
  },
  checkmark: {
    width: 16,
    height: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  reportTextContainer: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    color: '#002140',
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Poppins',
  },
  reportDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    fontFamily: 'Poppins',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  starButton: {
    padding: 4,
  },
});
