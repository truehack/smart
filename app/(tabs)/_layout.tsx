import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { useTheme, Provider, Portal, Modal, Text, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function TabsLayout() {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const tabs = [
    { name: 'Расписание', path: 'schedule', icon: 'home', modal: null },
    { name: 'Добавить', path: 'add', icon: 'plus', modal: true }, // модалка открывается
    { name: 'Уведомления', path: 'notifications', icon: 'account', modal: null },
    { name: 'Настройки', path: 'settings', icon: 'cog', modal: null },
  ];

  return (
    <Provider>
      <Tabs
        initialRouteName="schedule"
        screenOptions={() => ({
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
          tabBarStyle: { backgroundColor: theme.colors.background },
        })}
      >
        {tabs.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.path}
            options={{
              title: tab.name,
              tabBarIcon: ({ color, size }) => <Icon name={tab.icon} color={color} size={size} />,
            }}
            listeners={
              tab.modal
                ? {
                    tabPress: (e) => {
                      e.preventDefault();
                      openModal();
                    },
                  }
                : undefined
            }
          />
        ))}
      </Tabs>

      {/* Модалка для таба "Добавить" */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={closeModal}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={{ fontSize: 18, marginBottom: 12 }}>Добавление элемента</Text>
          <Text style={{ marginBottom: 20 }}>Здесь может быть форма или любой контент</Text>
          <Button mode="contained" onPress={closeModal}>
            Закрыть
          </Button>
        </Modal>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});





