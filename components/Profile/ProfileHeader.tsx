import { Header } from '@/components/ui/Header'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useRouter, usePathname } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { Colors } from '@/constants/Colors'

const ProfileHeader = ({ onBack, edit, heading }: { onBack: () => void, edit?: boolean, heading: string }) => {
    const router = useRouter();

    const handleEdit = () => {
        Alert.alert(
            "Feature Not Available",
            "This feature is not available yet. We will notify you when it becomes available.",
            [{ text: "OK" }]
        );
    };

    return (
        <View style={[styles.container, { justifyContent: edit && 'space-between' }]}>
            <TouchableOpacity
                onPress={onBack}
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
            {edit && <TouchableOpacity style={styles.button} onPress={handleEdit}>
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