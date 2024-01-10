import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Pressable, Text, View, Platform} from 'react-native';

const CategoryGridTile = ({id, title, color, onPress}) => {
  const navigation = useNavigation();
  // function navigate() {
  //     navigation.navigate('MealsOverview',{
  //         id: id,
  //     })
  // }

  return (
    <View style={styles.gridItem}>
      <Pressable
        style={({pressed}) => [
          styles.buttonStyle,
          pressed ? styles.buttonPressed : null,
        ]}
        android_ripple={{color: '#bf3f3f'}}
        // onPress={navigation.navigate('MealsOverview')}
        onPress={onPress}>
        <View style={[styles.innerContainer, {backgroundColor: color}]}>
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 8,
    height: 160,
    borderRadius: 8,
    backgroundColor: '#bf8787e8', // ios
    elevation: 8, // android - only
    shadowColor: '#370c0c', // ios
    shadowOpacity: 0.25, // ios
    shadowOffset: {width: 0, height: 2}, // ios
    shadowRadius: 8, // ios
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // android - ripple effect overflow
  },
  buttonStyle: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  titleStyle: {
    fontWeight: '700',
    fontSize: 18,
  },
});
