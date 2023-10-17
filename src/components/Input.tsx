import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { gSC } from "@/styles/global";

const styles = StyleSheet.create({
  container: { width: "100%" },
  label: { fontWeight: "600", color: gSC("emerald600"), fontSize: 16 },
  input: {
    backgroundColor: gSC("white", 0.1),
    borderRadius: 5,
    height: "auto",
    padding: 10,
    color: gSC("white"),
  },
});

type InputProps = {
  label?: string;
  labelStyle?: TextStyle;
  inputStyle?: ViewStyle;
  inputProps?: TextInputProps;
  containerStyle?: ViewStyle;
};
const Input: React.FC<InputProps> = ({
  label,
  labelStyle,
  inputStyle,
  inputProps,
  containerStyle,
}) => {
  const {
    multiline = true,
    placeholder = "Digite aqui...",
    placeholderTextColor = gSC("white", 0.6),
  } = inputProps ?? {};

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      {label ? (
        <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
      ) : null}
      <TextInput
        {...inputProps}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={{
          ...styles.input,
          ...inputStyle,
        }}
      />
    </View>
  );
};

export default Input;
