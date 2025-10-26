import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ScreenProps, Tabs } from 'expo-router';
import { TextInput, useTheme } from 'react-native-paper';
import { Modal, useModal } from '@/hooks/use-modal';
import { DatePickerModal } from 'react-native-paper-dates';
import { useLocale } from '@/hooks/use-locale';
import { useState } from 'react';

export type Tab = ScreenProps & {
    path: string;
    icon: string;
    modal?: Modal;
};

export default function TabsLayout() {
    const theme = useTheme();
    const modal = useModal();
    const locale = useLocale();

    const tabs: Tab[] = [
        { name: 'Расписание', path: 'schedule', icon: 'home' },
        { name: 'Добавить', path: 'add', icon: 'plus', modal },
        { name: 'Уведомления', path: 'notifications', icon: 'account' },
        { name: 'Настройки', path: 'settings', icon: 'cog' },
    ];

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [open, setOpen] = useState(false);

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

            <modal.view
                onClose={() => {
                    setDate(undefined);
                }}
                title="Добавить препарат"
                mode="fullscreen"
                contentStyle={{ gap: 8 }}
            >
                <TextInput mode="outlined" label={'Название'} />
                <TextInput
                    mode="outlined"
                    label={'Количество'}
                    keyboardType="number-pad"
                />
                <TextInput
                    mode="outlined"
                    label={'Время'}
                    value={date?.toLocaleDateString()}
                    right={
                        <TextInput.Icon
                            onPress={() => setOpen(true)}
                            icon="pen"
                        />
                    }
                />
            </modal.view>

            <DatePickerModal
                allowEditing={false}
                locale={locale}
                mode="single"
                visible={open}
                onDismiss={() => setOpen(false)}
                date={date}
                onConfirm={(params) => {
                    setOpen(false);
                    setDate(params.date);
                }}
            />
        </>
    );
}
