
import { Header } from '@/components/ui/Header'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { Colors } from '@/constants/Colors'

const ProfileHeader = ({ onPress, edit,heading }: any) => {
    const router = useRouter();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            router.back();
        }
    };
    return (
        <View style={[styles.container, { justifyContent: edit && 'space-between' }]}>
            <TouchableOpacity
                onPress={handlePress}
                accessibilityLabel={'Go back'}
            >
                <ThemedText style={styles.icon}>
                    ←
                </ThemedText>
            </TouchableOpacity>
            <View style={styles.view}>
                <ThemedText style={styles.text}>
                    {heading}
                </ThemedText>
            </View>
            {edit && <TouchableOpacity style={styles.button}>
                <ThemedText style={styles.buttonText}>
                    Edit
                </ThemedText>
            </TouchableOpacity>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal:16,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical:8,
        width:'100%'
    },
    button: {
        paddingVertical: 8, 
        paddingHorizontal :16,
        borderRadius:18,
        backgroundColor:'#261D2A0D'
    },
    icon: {
        fontSize: 24,
        color: Colors.light.text,
    },
    text: {
        color: '#052222',
        fontWeight: 600,
        fontSize: 20,
        fontFamily :'Poppins',
     },
    buttonText:{
        fontSize :16,
        fontWeight : 400,
        lineHeight : 22,
        color:'#111727'
    },
    view:{
        position: "absolute",
        left: '55%',
        transform: [{ translateX: '-55%' }],
        flex:1,
        alignItems: 'center',
        alignSelf :'center',
    }
});
export default ProfileHeader