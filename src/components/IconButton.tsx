import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IConButton = props => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({pressed}) => pressed && styles.pressed}>
      <Ionicons
        name={props.icon}
        size={24}
        color={props.color}
        style={props.styles}
      />
    </Pressable>
  );
};

export default IConButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
