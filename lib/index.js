import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";

export default class ReactNativeGalleryImage extends Component {
  constructor() {
    super();

    this.state = {
      containerWidth: 0,
      selectedImages: [],
      selectedIndexes: []
    };
  }

  onRotate = a => {
    const {
      width: containerWidth,
      height: containerHeight
    } = a.nativeEvent.layout;

    this.setState({ containerWidth, containerWidth });
  };

  pressHandler(image, index) {
    const { onImagePress } = this.props;

    if (onImagePress) onImagePress(image);

    this.toggleSelection(image, index);
  }

  toggleSelection(image, index) {
    const { onSelect } = this.props;
    const { selectedImages, selectedIndexes } = this.state;
    const foundIndex = selectedIndexes.indexOf(index);

    if (foundIndex === -1) {
      selectedImages.push(image);
      selectedIndexes.push(index);
    } else {
      selectedIndexes.splice(foundIndex, 1);
      selectedImages.splice(foundIndex, 1);
    }

    if (onSelect) onSelect(selectedImages);
    
    this.setState({ selectedImages, selectedIndexes });
  }

  renderImages(i, index) {
    const {
      imagesEachRow = 3,
      shouldFit,
      selectionColor = "blue"
    } = this.props;
    const { containerWidth, selectedIndexes } = this.state;
    const width = containerWidth / imagesEachRow;
    const styleObject = {
      flexBasis: width,
      height: width,
      boxSizing: "border-box",
      borderColor: "white",
      borderWidth: 1
    };
    let source = i;

    if (shouldFit) styleObject.flex = 1;
    if (typeof i !== "number") source = { uri: i };

    return (
      <TouchableOpacity
        onPress={this.pressHandler.bind(this, i, index)}
        key={Math.random().toString()}
        style={[styleObject]}
      >
        <Image
          source={source}
          style={[
            styles.image,
            selectedIndexes.includes(index) && styles.selectedImage,
            { borderColor: selectionColor }
          ]}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const { images } = this.props;

    return (
      <ScrollView>
        <View onLayout={this.onRotate} style={styles.container}>
          {images.map((i, index) => this.renderImages(i, index))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  image: { width: "100%", height: "100%" },
  selectedImage: {
    borderColor: "blue",
    borderWidth: 3
  }
});
