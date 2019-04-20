# React Native Image Container

## installation

You can install this package with the following command:

`yarn add react-native-image-container`

or

`npm install react-native-image-container`


### In the top level component add

```
import ReactNativeImageContainer from 'react-native-image-container';

export default class App extends Component {
  render() {
    return (
      <ReactNativeImageContainer
        shouldFit={true}
        imagesEachRow={2}
        selectionColor="blue"
        onSelect={(selectedImages) => console.log(selectedImages)}
        onImagePress={(pressedImage) => console.log(pressedImage)}
      />
    );
}
}
```

## API

### Props

| Props            | Type       | Notes                                                     | Required | Default |
| -----------------| ---------- | --------------------------------------------------------- | -------- |
| imagesEachRow    | `Number`   | Number of images required in one line                     | ❌       |3
| shouldFit        | `Boolean` | if true then images will fit on line if extra space is left in row     | ❌       |