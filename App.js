import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [asset, setAsset] = useState(null);
  const selectImage = async ({ allowsEditing }) => {
    const result = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing,
        quality: 1,
      });
    if (result.assets) {
      const [asset] = result.assets;
      console.log(asset);
      setAsset(asset);
    }
  }

  const aspectRatio = asset ? asset?.width / asset?.height : 1;
  return (
    <View style={styles.container}>
      <Button
        onPress={() => selectImage({ allowsEditing: true })}
        title="Select Image [allowsEditing: true]"
      />
      <Button
        onPress={() => selectImage({ allowsEditing: false })}
        title="Select Image [allowsEditing: false]"
      />

      <Text
        style={{ marginTop: 20 }}>
        Image:
      </Text>
      <Image
        source={{ uri: asset?.uri, }}
        style={{ width: 300, height: 300 / aspectRatio, backgroundColor: "grey" }}
      />
    </View>
  );
}

const Button = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 12,
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 4,
    margin: 12,
  }
});
