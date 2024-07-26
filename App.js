import { LogBox, StyleSheet, Text, View } from 'react-native';
import Index from "./components/screens/Index";
import { Host } from "react-native-portalize";

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);

  return (
    // <MainProvider>
    <Host>
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
        }}
      >
        <Index />
      </View>
    </Host>

    // </MainProvider>

  );
}