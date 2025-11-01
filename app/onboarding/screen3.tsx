// app/onboarding/screen3.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Title, Caption } from 'react-native-paper';
import { Link } from 'expo-router';

export default function Onboarding3() {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Всё готово!</Title>
      <Caption style={styles.subtitle}>
        Теперь вы всегда будете в курсе приёма лекарств. Здоровье — в ваших руках!
      </Caption>

      <View style={styles.icon}>
        <Text style={{ fontSize: 60 }}>✅</Text>
      </View>

      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>

      <Link href="/(tabs)" asChild>
        <Button mode="contained" style={styles.startButton}>
          Начать использовать
        </Button>
      </Link>
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
    marginBottom: 40,
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
  startButton: {
    width: '80%',
  },
});
