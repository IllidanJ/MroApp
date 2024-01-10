import {StyleSheet, View, Text} from 'react-native';

const List = ({data}) => {
  return data.map((item, index) => (
    <View style={styles.listitem} key={item}>
      <Text key={index} style={styles.itemText}>
        {item}
        {index}
      </Text>
    </View>
  ));
};

export default List;

const styles = StyleSheet.create({
  listitem: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 8,
    marginVertical: 4,
    backgroundColor: '#f1b1b1',
  },
  itemText: {
    color: '#171616',
    textAlign: 'center',
  },
});
