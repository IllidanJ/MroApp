import {StyleSheet, View, Text} from 'react-native';

const Subtitle = props => {
  return (
    <View style={styles.subTitleContainer}>
      <Text style={styles.subTitle}>{props.children}</Text>
    </View>
  );
};

export default Subtitle;

const styles = StyleSheet.create({
  subTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    margin: 4,
    padding: 8,
    textAlign: 'center',
  },
  subTitleContainer: {
    padding: 8,
    marginHorizontal: 8,
    marginVertical: 16,
    borderBottomColor: '#441313',
    borderBottomWidth: 2,
  },
});
