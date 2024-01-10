import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Pressable, Text, View, Image, Platform } from "react-native";
import MealDetails from "../MealDetails";

const MealItem = (props) => {

    const navigation = useNavigation();


    function onPressHandler() {
        navigation.navigate('MealDetail', {
            id: props.id,
        });
    }

    return (
        <View style={styles.mealItem}>
            <Pressable
                style={({ pressed }) => pressed ? styles.buttonPressed : null}
                android_ripple={{ color: '#bf3f3f' }}
                onPress={onPressHandler}
            >
                <View style={styles.innerContainer}>
                    <View>
                        <Image source={{ uri: props.imageUrl }} style={styles.image} />
                        <Text style={styles.title}>{props.title}</Text>
                    </View>

                    <MealDetails
                        duration={props.duration}
                        complexity={props.complexity}
                        affordability={props.affordability}
                    />

                </View>
            </Pressable>
        </View>

    );
}

export default MealItem;

const styles = StyleSheet.create({    
    title: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '700',
        padding: 8,
    },
    innerContainer: {
        borderRadius: 8,
        overflow: "hidden"
    },
    buttonPressed: {
        opacity: 0.5,
    },
    mealItem: {
        margin: 8,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 8, // android - only
        shadowColor: '#370c0c', // ios
        shadowOpacity: 0.25, // ios
        shadowOffset: { width: 0, height: 2 }, // ios
        shadowRadius: 8, // ios
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // android - ripple effect overflow

    },
    details: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12,
    },
    image: {
        width: '100%',
        height: 300,
    },
})