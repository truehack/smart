import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Title, Caption } from 'react-native-paper';
import { Link } from 'expo-router';

export default function Onboarding2() {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Напоминания под ваш график</Title>
      <Caption style={styles.subtitle}>
        Вы сами выбираете время, частоту и название препарата. Мы будем напоминать — мягко, но надёжно.
      </Caption>

      {/* Простая иллюстрация: часы */}
      <View style={styles.icon}>
        <Text style={{ fontSize: 60 }}>⏰</Text>
      </View>

      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>

      <View style={styles.buttonRow}>
        <Link href="/onboarding" asChild>
          <Button mode="text">Назад</Button>
        </Link>
        <Link href="/onboarding/screen3" asChild>
          <Button mode="text">Далее</Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center' as const,
    marginBottom: 20,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center' as const,
    color: '#555',
    marginBottom: 30,
    lineHeight: 22,
  },
  icon: {
    marginBottom: 30,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#3498db',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});