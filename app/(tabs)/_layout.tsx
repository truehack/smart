import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScreenProps, Tabs } from 'expo-router';
import { useTheme, Text, Button } from 'react-native-paper';
import { Modal, useModal } from '@/hooks/use-modal';

export type Tab = ScreenProps & {
    path: string;
    icon: string;
    modal?: Modal
};

export default function TabsLayout() {
    const theme = useTheme();
    const addModal = useModal();

    const tabs: Tab[] = [
        { name: 'Расписание', path: 'schedule', icon: 'home' },
        { name: 'Добавить', path: 'add', icon: 'plus', modal: addModal },
        { name: 'Уведомления', path: 'notifications', icon: 'account' },
        { name: 'Настройки', path: 'settings', icon: 'cog' },
    ];

    return (
        <>
            <Tabs
                initialRouteName='schedule'
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

            <addModal.view>
                <Text variant="titleLarge" style={{ marginBottom: 12 }}>
                    Добавление элемента
                </Text>
                <Text style={{ marginBottom: 20 }}>
                    Здесь может быть форма или любой контент
                </Text>
                <Button mode="contained" onPress={addModal.close}>
                    Закрыть
                </Button>
            </addModal.view>
        </>
    );
}
