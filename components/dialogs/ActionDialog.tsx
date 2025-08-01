import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TouchableOpacity, GestureResponderEvent, Platform,} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface ActionDialogProps {
  visible: boolean;
  title: string;
  message: string;
  negativeText?: string;
  positiveText: string;
  onNegative?: () => void;
  onPositive?: () => void;
  onClose?: () => void;
  dismissable?: boolean;
}

const ActionDialog: React.FC<ActionDialogProps> = ({
  visible,
  title,
  message,
  negativeText,
  positiveText,
  onNegative,
  onPositive,
  onClose,
  dismissable = false,
}) => {
  const showDefaultOk = negativeText == "";

  const handleBackdropPress = () => {
    if (dismissable && onClose) {
      onClose();
    }
  };

  const renderButton = (
    label: string,
    onPress?: ((event: GestureResponderEvent) => void) | undefined,
    style?: any,
    isPrimary? : boolean
  ) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={isPrimary ? styles.buttonText : styles.secondaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      onDismiss={onClose}
    >
      <Pressable style={styles.backdrop} onPress={handleBackdropPress}>
        <Pressable style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title.toUpperCase()}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeIconWrapper}>
              <Ionicons name="close" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <Text style={styles.message}>{message}</Text>

            <View style={styles.actionsRow}>
              {showDefaultOk &&
                renderButton(positiveText, onPositive, styles.primaryButton, true)}

              {!showDefaultOk && negativeText &&
                renderButton(negativeText, onNegative, styles.secondaryButton, false)}

              {!showDefaultOk && positiveText &&
                renderButton(positiveText, onPositive, styles.primaryButton, true)}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    // shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // elevation for Android
    elevation: 7,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#0074BA",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: 700
  },
  closeIconWrapper: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  body: {
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    fontWeight: 500
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  primaryButton: {
    backgroundColor: "#0074BA", 
  },
  secondaryButton: {
    backgroundColor: "#DBF2FF",
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 700
  },
  secondaryButtonText: {
    color: "#0074BA",
    fontSize: 14,
    fontWeight: 700
  },
});

export default ActionDialog;