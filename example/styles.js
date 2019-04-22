import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10
  },
  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 5,
    fontSize: 18
  },
  switchContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  switch: { transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] },
  switchText: {
      fontSize: 18,
      fontWeight: "bold"
  }
});
