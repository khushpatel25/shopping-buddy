import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  submitButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#800080",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    borderColor: "#800080",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#007BFF",
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#800080",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#B0B0B0",
    borderRadius: 15,
    padding: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000', // Text color
    backgroundColor: '#F7F7F7', // Background color
    borderWidth: 1,
    borderColor: '#800080', // Border color for visibility
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },  

});

export default styles;
