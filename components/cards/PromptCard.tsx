import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedText'

const PromptCard = ({ heading, details }: any) => {
    return (
        <View style={styles.cardStyle}>
            <ThemedText style={styles.heading}>{heading}</ThemedText>
            <ThemedText style={styles.details}>{details}</ThemedText>
            <View style={styles.absolute}>
                <TouchableOpacity>
                    <View style={styles.cancelStyle} >
                        <Image style={{width:10, height:10}} resizeMode='contain' source={require("@/assets/icons/cancel.png")} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: '#FFFFFFB2',
        paddingTop: 8,
        paddingBottom: 24,
        paddingHorizontal: 16,
        gap: 8,
        borderRadius: 20,
        width: '100%',
    },
    heading: {
        fontSize : 14,
        fontWeight :500,
        fontFamily : 'Poppins', 
        color:'#261D2A4D',
        lineHeight : 18
    },
    details: {
        color:'#261D2A',
        fontWeight :500,
        fontSize : 14,
        fontFamily : 'Poppins',
        lineHeight : 18
    },
    absolute: {
        position: 'absolute',
        top: 0,
        right :0
    },
    cancelStyle: {
        width: 24,
        height: 24,
        backgroundColor:"#FFFFFF",
        borderRadius : '50%',
        boxShadow: '0 0 9px 0 rgba(0, 0, 0, 0.15)',
        justifyContent :'center',
        alignItems : 'center',
    }
})
export default PromptCard