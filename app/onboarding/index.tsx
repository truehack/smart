import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Title, Caption } from 'react-native-paper';
import { Link } from 'expo-router';

export default function Onboarding1() {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Не забывайте принимать лекарства вовремя!</Title>
      <Caption style={styles.subtitle}>
        Наше приложение напомнит вам о каждом приёме лекарств — даже если вы заняты, устали или в дороге.
      </Caption>

      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <Link href="/onboarding/screen2" asChild>
        <Button mode="text" style={styles.nextButton}>
          Далее
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
    marginBottom: 40,
    lineHeight: 22,
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
  nextButton: {
    marginTop: 20,
  },
});
