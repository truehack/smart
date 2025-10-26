import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ScreenProps, Tabs } from 'expo-router';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { Modal, useModal } from '@/hooks/use-modal';
import { useState } from 'react';
import { View } from 'react-native';

export type Tab = ScreenProps & {
    path: string;
    icon: string;
    modal?: Modal;
};

export default function TabsLayout() {
    const [ visible, setVisible ] = useState(false)
    const AddModal = useModal({ visible, setVisible });

    const theme = useTheme();

    const tabs: Tab[] = [
        { name: 'Расписание', path: 'schedule', icon: 'home' },
        { name: 'Добавить', path: 'add', icon: 'plus', modal: AddModal },
        { name: 'Уведомления', path: 'notifications', icon: 'account' },
        { name: 'Настройки', path: 'settings', icon: 'cog' },
    ];

    const [name, setName] = useState<string>();
    const [count, setCount] = useState<string>();

    return (
        <>
            <Tabs
                initialRouteName="schedule"
                screenOptions={() => ({
                    headerShown: false,
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
                    tabBarStyle: {
                        backgroundColor: theme.colors.background,
                    },
                })}
            >
                {tabs.map((tab) => (
                    <Tabs.Screen
                        key={tab.name}
                        name={tab.path}
                        options={{
                            title: tab.name,
                            tabBarIcon: ({ color, size }) => (
                                <Icon
                                    name={tab.icon}
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}
                        listeners={
                            tab.modal
                                ? {
                                      tabPress: (e) => {
                                          e.preventDefault();
                                          tab.modal!.open();
                                      },
                                  }
                                : undefined
                        }
                    />
                ))}
            </Tabs>

            <AddModal.view
                onClose={() => {
                    setName(undefined);
                    setCount(undefined);
                }}
                title="Добавить препарат"
                mode="fullscreen"
                contentStyle={{ justifyContent: 'space-between' }}
            >
                <View style={{ gap: 8 }}>
                    <TextInput
                        mode="outlined"
                        label={'Название'}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <TextInput
                        value={count}
                        onChangeText={(text) => setCount(text)}
                        mode="outlined"
                        label={'Количество'}
                        keyboardType="number-pad"
                    />
                </View>
                <View style={{ gap: 16 }}>
                    <Button mode="contained">Добавить</Button>
                    <Button mode="outlined" onPress={AddModal.close}>
                        Отмена
                    </Button>
                </View>
            </AddModal.view>
        </>
    );
}
