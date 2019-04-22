import React, { Component } from "react";
import { View, ScrollView, TextInput, Switch, Text } from "react-native";
import ReactNativeGalleryImage from "react-native-gallery-image";

import styles from "./styles";
import images from "./config/images";
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      imagesEachRow: 3,
      shouldFit: false
    };
  }

  handleTextInput = text => {
    const parsed = parseInt(text);
    let imagesEachRow = parsed;

    if (!parsed) imagesEachRow = 3;

    this.setState({ imagesEachRow });
  };

  render() {
    const { imagesEachRow, shouldFit } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            keyboardType="number-pad"
            onChangeText={this.handleTextInput}
            style={styles.textInput}
            placeholder="Enter number of images you want in one row"
          />
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Should Fit</Text>
            <Switch
              style={styles.switch}
              value={shouldFit}
              onValueChange={shouldFit => this.setState({ shouldFit })}
            />
          </View>
        </View>
        <ReactNativeGalleryImage
          images={images}
          shouldFit={shouldFit}
          imagesEachRow={imagesEachRow}
        />
      </ScrollView>
    );
  }
}
