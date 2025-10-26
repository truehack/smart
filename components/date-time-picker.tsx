import { useState } from 'react';
import { Button, useTheme } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

import { useDatePickerLocale } from '@/hooks/use-date-picker-locale';

export type DateTimeValue = {
    date: Date | null;
    time: { hours: number; minutes: number } | null;
};

export type DateTimePickerModalProps = {
    value?: DateTimeValue;
    onChange?: (value: DateTimeValue) => void;
    buttonLabel?: string;
};

export function DateTimePickerModal({
    value,
    onChange,
    buttonLabel = 'Выбрать дату и время',
}: DateTimePickerModalProps) {
    const theme = useTheme();
    const locale = useDatePickerLocale();

    const [date, setDate] = useState<Date | null>(value?.date ?? null);
    const [time, setTime] = useState<{ hours: number; minutes: number } | null>(
        value?.time ?? null,
    );

    const [dateVisible, setDateVisible] = useState(false);
    const [timeVisible, setTimeVisible] = useState(false);

    const handleConfirmDate = (params: any) => {
        setDate(params.date);
        setDateVisible(false);
        setTimeout(() => setTimeVisible(true), 300);
    };

    const handleConfirmTime = ({
        hours,
        minutes,
    }: {
        hours: number;
        minutes: number;
    }) => {
        const newTime = { hours, minutes };
        setTime(newTime);
        setTimeVisible(false);

        const result: DateTimeValue = { date, time: newTime };
        onChange?.(result);
    };

    const formatted = () => {
        if (!date) return buttonLabel;
        const dateStr = date.toLocaleDateString(locale);
        if (!time) return `${dateStr}`;
        return `${dateStr} ${time.hours}:${time.minutes.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <Button
                mode="contained-tonal"
                onPress={() => setDateVisible(true)}
                style={{
                    backgroundColor: theme.colors.surfaceVariant,
                }}
            >
                {formatted()}
            </Button>

            <DatePickerModal
                locale={locale}
                mode="single"
                visible={dateVisible}
                date={date ?? undefined}
                onDismiss={() => setDateVisible(false)}
                onConfirm={handleConfirmDate}
            />

            <TimePickerModal
                locale={locale}
                visible={timeVisible}
                onDismiss={() => setTimeVisible(false)}
                onConfirm={handleConfirmTime}
                hours={time?.hours}
                minutes={time?.minutes}
            />
        </>
    );
}
