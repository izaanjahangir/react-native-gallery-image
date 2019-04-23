import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text
} from "react-native";

export default class ReactNativeGalleryImage extends Component {
  constructor() {
    super();

    this.state = {
      containerWidth: 0,
      selectedImages: [],
      selectedIndexes: [],
      selectionColor: "#3498db"
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
    const { selectionColor: color } = this.state;
    let { imagesEachRow = 3, shouldFit, selectionColor = color } = this.props;
    const { containerWidth, selectedIndexes } = this.state;

    if (imagesEachRow < 0) imagesEachRow = 3;

    const width = containerWidth / imagesEachRow;
    const styleObject = {
      flexBasis: width,
      position: "relative",
      height: width,
      boxSizing: "border-box",
      borderColor: "white",
      borderWidth: 1
    };
    const numberingStyleObject = {
      width: width * 0.15,
      height: width * 0.15,
      borderRadius: width * 0.15
    };

    let source = i;
    let foundIndex = selectedIndexes.indexOf(index);
    foundIndex = foundIndex === -1 ? false : foundIndex + 1;

    if (shouldFit) styleObject.flex = 1;
    if (typeof i !== "number") source = { uri: i };

    return (
      <TouchableOpacity
        onPress={this.pressHandler.bind(this, i, index)}
        key={Math.random().toString()}
        style={[styleObject]}
      >
        {!!foundIndex && (
          <View
            style={[
              styles.selectedNumberContainer,
              { backgroundColor: selectionColor },
              numberingStyleObject
            ]}
          >
            <Text
              style={[styles.selectedNumberText, { fontSize: width * 0.08 }]}
            >
              {foundIndex}
            </Text>
          </View>
        )}
        <Image
          source={source}
          style={[
            styles.image,
            foundIndex && styles.selectedImage,
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
    borderWidth: 5
  },
  selectedNumberContainer: {
    width: 25,
    height: 25,
    borderRadius: 25,
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 0.5
  },
  selectedNumberText: {
    color: "white",
    fontWeight: "bold"
  }
});
