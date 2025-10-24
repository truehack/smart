import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@/hooks/use-theme';
import { ScreenProps, Tabs } from 'expo-router';

export type Tab = ScreenProps & {
    path: string;
    icon: string;
};

export const tabs: Tab[] = [
    { name: 'Расписание', path: 'schedule', icon: 'home' },
    { name: 'Добавить', path: 'add', icon: 'plus' },
    { name: 'Уведомления', path: 'notifications', icon: 'account' },
    { name: 'Настройки', path: 'settings', icon: 'cog' },
];

export default function TabsLayout() {
    const { theme } = useTheme();

    return (
        <Tabs
            screenOptions={() => ({
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.background,
                },
            })}
        >
            {tabs.map((tab) => (
                <Tabs.Screen
                    {...tab}
                    key={tab.name}
                    name={tab.path}
                    options={{
                        title: tab.name,
                        tabBarIcon: ({ color, size }) => (
                            <Icon name={tab.icon} color={color} size={size} />
                        ),
                    }}
                />
            ))}
        </Tabs>
    );
}
