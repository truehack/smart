import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';

export type Medication = {
  id?: number;
  name: string;
  description: string;
  time: string;
  status?: string;
};

// ✅ новое подключение (Expo SDK 54)
const db = SQLite.openDatabaseSync('medications.db');

export function useDatabase() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS medications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            time TEXT,
            status TEXT
          );
        `);
        setReady(true);
        console.log('✅ SQLite таблица готова');
      } catch (err) {
        console.error('❌ Ошибка инициализации БД:', err);
      }
    };

    init();
  }, []);

  // получить все записи
  const getAll = async (): Promise<Medication[]> => {
    return await db.getAllAsync<Medication>(
      'SELECT * FROM medications ORDER BY time ASC;'
    );
  };

  // добавить запись
  const add = async (item: Medication): Promise<void> => {
    await db.runAsync(
      'INSERT INTO medications (name, description, time, status) VALUES (?, ?, ?, ?)',
      [item.name, item.description, item.time, 'Не принято']
    );
  };

  return { ready, getAll, add };
}

