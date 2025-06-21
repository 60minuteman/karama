import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ComingSoonModalProps {
  visible: boolean;
  onClose: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.noticeText}>Notice !</Text>
          <ThemedText style={styles.titleText}>
            Profile Edits coming Soon
          </ThemedText>
          <ThemedText style={styles.messageText}>
            We're still working on the profile editing feature. For now, please
            ensure all your information is entered correctly
          </ThemedText>
          <TouchableOpacity style={styles.proceedButton} onPress={onClose}>
            <ThemedText style={styles.proceedButtonText}>Proceed</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 35,
    paddingBottom: 35,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxWidth: 400,
  },
  noticeText: {
    fontSize: 30,
    color: '#EB4430',
    marginBottom: 8,
    fontFamily: 'bogart',
    fontWeight: '600',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#261D2A',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'bogart',
  },
  messageText: {
    fontSize: 16,
    color: '#261D2A',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Poppins',
    lineHeight: 24,
  },
  proceedButton: {
    backgroundColor: '#EB4430',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 60,
    elevation: 2,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  proceedButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default ComingSoonModal;
