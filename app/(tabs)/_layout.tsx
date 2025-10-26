import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ScreenProps, Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';

export type Tab = ScreenProps & {
    path: string;
    icon: string;
};

export default function TabsLayout() {
    const theme = useTheme();

    const tabs: Tab[] = [
        { name: 'Расписание', path: 'schedule', icon: 'home' },
        { name: 'Добавить', path: 'add', icon: 'plus' },
        { name: 'Уведомления', path: 'notifications', icon: 'account' },
        { name: 'Настройки', path: 'settings', icon: 'cog' },
    ];
    return (
        <>
            <Tabs
                initialRouteName="schedule"
                screenOptions={() => ({
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
                    tabBarStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    headerStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    headerTintColor: theme.colors.onBackground,
                    headerShown: false
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
                    />
                ))}
            </Tabs>
        </>
    );
}
