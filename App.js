import{GestureHandlerRootView}from "react-native-gesture-handler"
import Navigation from "./Navigation";
import { store } from "./Redux/store/store";
import { Provider } from "react-redux";

export default function App() {
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Navigation/>
      </Provider>
    </GestureHandlerRootView>
  );
}
