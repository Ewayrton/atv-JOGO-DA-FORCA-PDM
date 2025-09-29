import { Stack } from "expo-router";
import IconeForca from '../components/IconeForca';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: '',
          // 2. Usando o componente SVG como título
          headerTitle: () => (
            <IconeForca width={70} height={60} />
          ),
          
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
}