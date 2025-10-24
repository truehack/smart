import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Create() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/modals/add-modal');
    }, [router]);

    return null;
}
