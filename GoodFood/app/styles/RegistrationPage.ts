import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#F7F7F7",
  },
  signupButton: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderColor: "#800080",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 10,
  },
  signupButtonText: {
    color: "#800080",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 16,
    fontSize: 14,
  },
  loginText: {
    color: "#800080",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "20%",
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: "#A0A0A0",
  },
  orText: {
    marginHorizontal: 10,
    color: "#A0A0A0",
  },
  socialButton: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#F7F7F7",
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#4D4D4D",
  },
});

export default styles;
