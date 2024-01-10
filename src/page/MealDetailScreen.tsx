import {StyleSheet, Image, Text, View, ScrollView, Button} from 'react-native';
import {MEALS} from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import {useCallback, useContext, useLayoutEffect} from 'react';
import IConButton from '../components/IconButton';
import {FavoritesContext} from '../store/context/favorites-context';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite, removeFavorite} from '../store/redux/favorites';

function MetalDetailScreen({route, navigation}) {
  const favoritesMealCtx = useContext(FavoritesContext);
  // redus state selector
  const favoritesMealIds = useSelector(state => state.favoriteMeals.ids);
  // redux action dispatcher
  const dispatch = useDispatch();
  // get id from navigation params
  const id = route.params.id;

  const selectedMeal = MEALS.find(meal => meal.id === id);
  // [include] works best with premetive values
  // using context
  //const isMealFavorite = favoritesMealCtx.ids.includes(id)

  // using redux
  const isMealFavorite = favoritesMealIds.includes(id);

  const favouritPressHandler = useCallback(() => {
    if (isMealFavorite) {
      // using context
      //favoritesMealCtx.removeFavorite(id);

      // using redux
      dispatch(removeFavorite({id: id}));
    } else {
      // using context
      //favoritesMealCtx.addFavorite(id);

      // using redux
      dispatch(addFavorite({id: id}));
    }
  }, [dispatch, id, isMealFavorite]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IConButton
            title="Favoret"
            onPress={favouritPressHandler}
            icon={isMealFavorite ? 'star' : 'star-outline'}
            color="white"
          />
        );
      },
    });
  }, [navigation, favouritPressHandler, isMealFavorite]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />

      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />

          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MetalDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'black',
  },
  detailText: {
    color: 'black',
  },
  listContainer: {
    maxWidth: '80%',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
});
