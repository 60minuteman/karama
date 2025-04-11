import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'

const LockedIndicator = ({ isEditable }: any) => {
    return (
        <View>
            {isEditable ?
                <ThemedText style={styles.text}>Edit</ThemedText>
                :
                <Image
                    source={require('@/assets/icons/lock.png')}
                    style={styles.lockIcon}
                />}
        </View>
    )
}

const styles = StyleSheet.create({
    lockIcon: {
        width: 20,
        height: 20,
    },
    text: {
        color: '#EB4430',
        fontFamily: 'Poppins_400Regular'
    }
})
export default LockedIndicator