import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Card, useTheme, Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

interface Medication {
  time: string;
  status: string;
  statusColor: string;
  name: string;
  description: string;
}

export default function Schedule() {
  const theme = useTheme();

  // --- Лента дней года ---
  const [days, setDays] = useState<{ date: moment.Moment; isToday: boolean }[]>([]);
  const [selectedDay, setSelectedDay] = useState<moment.Moment>(moment());

  useEffect(() => {
    const start = moment().startOf('year');
    const end = moment().endOf('year');
    const allDays: { date: moment.Moment; isToday: boolean }[] = [];

    let day = start.clone();
    while (day.isBefore(end) || day.isSame(end, 'day')) {
      allDays.push({ date: day.clone(), isToday: day.isSame(moment(), 'day') });
      day.add(1, 'day');
    }

    setDays(allDays);
    setSelectedDay(moment());
  }, []);

  // --- Лекарства ---
  const [medications, setMedications] = useState<Medication[]>([
    { time: '08:00', status: 'Пропущено', statusColor: '#ff5b5b', name: 'Магний', description: '2 таблетки' },
    { time: '14:00', status: 'Принято', statusColor: '#4CAF50', name: 'Аспирин', description: '1 таблетка' },
    { time: '20:00', status: 'Не принято', statusColor: '#ff5b5b', name: 'Кетопрофен', description: '1 таблетка' },
  ]);

  // --- Форма добавления ---
  const [newName, setNewName] = useState('');
  const [newTime, setNewTime] = useState('');
  const [colvo, setColvo] = useState('');

  const addMedication = () => {
    if (!newName || !newTime || !colvo) return;

    setMedications([
      ...medications,
      {
        name: newName,
        time: newTime,
        status: 'Не принято',
        statusColor: '#ff5b5b',
        description: `${colvo} таблет${Number(colvo) > 1 ? 'ок' : 'ка'}`,
      },
    ]);

    setNewName('');
    setNewTime('');
    setColvo('');
  };

  // --- Модальное окно ---
  const [visible, setVisible] = useState(false);
  const [currentMedIndex, setCurrentMedIndex] = useState<number | null>(null);
  const [postponeTime, setPostponeTime] = useState('');

  const openModal = (index: number) => {
    setCurrentMedIndex(index);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setPostponeTime('');
  };

  const markDone = () => {
    if (currentMedIndex === null) return;
    const newMedications = [...medications];
    newMedications[currentMedIndex].status = 'Принято';
    newMedications[currentMedIndex].statusColor = '#4CAF50';
    setMedications(newMedications);
    closeModal();
  };

  const markFinished = () => {
    if (currentMedIndex === null) return;
    const newMedications = [...medications];
    newMedications[currentMedIndex].status = 'Закончились таблетки';
    newMedications[currentMedIndex].statusColor = '#ff5b5b';
    setMedications(newMedications);
    closeModal();
  };

  const postpone = () => {
    if (currentMedIndex === null || !postponeTime) return;
    const newMedications = [...medications];
    newMedications[currentMedIndex].time = postponeTime;
    newMedications[currentMedIndex].status = 'Отложено';
    newMedications[currentMedIndex].statusColor = '#FFA500';
    setMedications(newMedications);
    closeModal();
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: theme.colors.background }}>
      {/* --- Горизонтальная лента дней года --- */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 10 }}>
        {days.map((d) => {
          const isSelected = d.date.isSame(selectedDay, 'day');
          return (
            <TouchableOpacity
              key={d.date.format('YYYY-MM-DD')}
              onPress={() => setSelectedDay(d.date)}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                paddingVertical: 8,
                marginHorizontal: 2,
                borderRadius: 25,
                backgroundColor: isSelected
                  ? theme.colors.primary
                  : d.isToday
                  ? '#4444FF'
                  : 'transparent',
              }}
            >
              <Text style={{ color: isSelected || d.isToday ? '#fff' : theme.colors.onSurface }}>
                {d.date.format('DD')}
              </Text>
              <Text style={{ color: isSelected || d.isToday ? '#fff' : theme.colors.onSurface, fontSize: 10 }}>
                {d.date.format('MMM')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* --- Форма добавления лекарства --- */}
      <View style={{ marginBottom: 20 }}>
        <TextInput
          label="Название лекарства"
          value={newName}
          onChangeText={setNewName}
          style={{ marginBottom: 8 }}
        />
        <TextInput
          label="Время (HH:MM)"
          value={newTime}
          onChangeText={setNewTime}
          style={{ marginBottom: 8 }}
        />
        <TextInput
          label="Количество таблеток"
          value={colvo}
          onChangeText={setColvo}
          keyboardType="numeric"
          style={{ marginBottom: 8 }}
        />
        <Button mode="contained" onPress={addMedication}>Добавить</Button>
      </View>

      {/* --- Список лекарств --- */}
      {medications.map((item, i) => (
        <TouchableOpacity key={i} onPress={() => openModal(i)}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: item.statusColor, marginBottom: 4 }}>
              {item.time} | {item.status}
            </Text>
            <Card style={{ padding: 12, borderRadius: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="pill" size={28} style={{ marginRight: 12 }} />
                <View>
                  <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                  <Text>{item.description}</Text>
                </View>
              </View>
            </Card>
          </View>
        </TouchableOpacity>
      ))}

      {/* --- Модальное окно --- */}
      <Portal>
  <Modal
    visible={visible}
    onDismiss={closeModal}
    contentContainerStyle={{
      backgroundColor: 'white',
      padding: 20,
      margin: 20,
      borderRadius: 12,
    }}
  >
    <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
      {currentMedIndex !== null ? medications[currentMedIndex].name : ''}
    </Text>

    {/* Кнопка Сделал */}
    <Button
      mode="contained"
      onPress={markDone}
      style={{ marginBottom: 12 }}
    >
      Сделал
    </Button>

    {/* Поле для отложенного времени */}
    <TextInput
      label="Отложить на (HH:MM)"
      value={postponeTime}
      onChangeText={setPostponeTime}
      style={{ marginBottom: 12 }}
    />

    {/* Кнопка Отложить */}
    <Button
      mode="contained"
      onPress={postpone}
      style={{ marginBottom: 12 }}
    >
      Отложить
    </Button>

    {/* Кнопка Закончились таблетки */}
    <Button
      mode="contained"
      onPress={markFinished}
      style={{ backgroundColor: '#ff5b5b' }}
    >
      Закончились таблетки
    </Button>
  </Modal>
</Portal>

    </ScrollView>
  );
}





