import { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Stack, useFocusEffect } from 'expo-router';
import { ScreenView } from '@/components/screen-view';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { useLocale } from '@/hooks/use-locale';

export default function Add() {
    const locale = useLocale();

    const [name, setName] = useState('');
    const [count, setCount] = useState('');
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState<{ hours: number; minutes: number; }>();

    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);

    const clear = () => {
        setName('');
        setCount('');
        setDate(undefined);
        setTime(undefined)
    };

    useFocusEffect(() => clear());

    return (
        <ScreenView
            style={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
            hasHeader
        >
            <Stack.Screen options={{ headerShown: true, headerTitle: "Добавить препарат" }} />
            <View style={{ gap: 8, flex: 1, paddingVertical: 20 }}>
                <TextInput
                    mode="outlined"
                    label="Название"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    mode="outlined"
                    label="Количество"
                    value={count}
                    keyboardType="number-pad"
                    onChangeText={setCount}
                />
                <TextInput
                    mode="outlined"
                    label="Дата"
                    value={date?.toLocaleDateString()}
                    onPressIn={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setOpenDate(true);
                    }}
                    right={
                        <TextInput.Icon
                            icon="calendar"
                            onPress={() => setOpenDate(true)}
                        />
                    }
                />
                <TextInput
                    mode="outlined"
                    label="Время"
                    value={time ? `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}` : ''}
                    onPressIn={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setOpenTime(true);
                    }}
                    right={
                        <TextInput.Icon
                            icon="clock"
                            onPress={() => setOpenTime(true)}
                        />
                    }
                />

                <DatePickerModal
                    mode="single"
                    locale={locale}
                    visible={openDate}
                    onDismiss={() => setOpenDate(false)}
                    date={date}
                    onConfirm={(params) => {
                        setDate(params.date);
                        setOpenDate(false);
                    }}
                />
                <TimePickerModal
                    defaultInputType='picker'
                    hours={time?.hours}
                    minutes={time?.minutes}
                    
                    locale={locale}
                    visible={openTime}
                    onDismiss={() => setOpenTime(false)}
                    onConfirm={(time) => {
                        setTime(time);
                        setOpenTime(false);
                    }}
                />
            </View>

            <View style={{ gap: 16 }}>
                <Button
                    mode="contained"
                    onPress={() => console.log({ name, count, date, time })}
                >
                    Добавить
                </Button>
                <Button mode="outlined" onPress={() => clear()}>
                    Отмена
                </Button>
            </View>
        </ScreenView>
    );
}
