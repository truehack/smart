import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@/hooks/use-theme';
import { ScreenProps, Tabs, useRouter } from 'expo-router';

export type Tab = ScreenProps & {
    path: string;
    icon: string;
    reroute?: Parameters<ReturnType<typeof useRouter>['push']>[0];
};

export const tabs: Tab[] = [
    { name: 'Расписание', path: 'schedule', icon: 'home' },
    {
        name: 'Добавить',
        path: 'add',
        icon: 'plus',
        reroute: '/modals/add-modal',
    },
    { name: 'Уведомления', path: 'notifications', icon: 'account' },
    { name: 'Настройки', path: 'settings', icon: 'cog' },
];

export default function TabsLayout() {
    const theme = useTheme();
    const router = useRouter();

    return (
        <Tabs
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
                    {...tab}
                    key={tab.name}
                    name={tab.path}
                    listeners={
                        tab.reroute
                            ? {
                                  tabPress: (e) => {
                                      e.preventDefault();
                                      if (tab.reroute) {
                                          router.push(tab.reroute);
                                      }
                                  },
                              }
                            : undefined
                    }
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
