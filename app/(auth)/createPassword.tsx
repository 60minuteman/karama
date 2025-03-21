import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Header } from '@/components/ui/Header'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { TextInput } from '@/components/ui/TextInput'
import { Button } from '@/components/ui/Button'
import { useUserStore } from '@/services/state/user'
import { useMutation } from '@tanstack/react-query'
import customAxios from '@/services/api/envConfig'
import { router, useLocalSearchParams } from 'expo-router'
import Toast from 'react-native-toast-message'
import { Colors } from '@/constants/Colors'

const CreatePassword = () => {
    const [password, setPassword] = useState<string>('')
    const { phoneNumber, isChecked } = useLocalSearchParams();

    const createPassword = useMutation({
        mutationFn: (data: any) => {
            return customAxios.post(`/auth/phone/signup/complete`, data);
        },
        onSuccess: async (data: any) => {
            console.log(data.data)
            console.log('password created')
            router.push({
                pathname: '/(auth)/signInPhone',
            });
        },
        onError: (error: any) => {
            console.log('error', error['response'].data);
            Toast.show({
                type: 'problem',
                text1: 'Something went wrong',
                text2: error['response'].data?.message,
            });
        }
    });
    function containsUppercaseAndNumber(str: string) {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?!.*\s)/;
        return regex.test(str);
    }
    const handleCreatePassword = () => {
        if (containsUppercaseAndNumber(password)) {
            createPassword.mutate({
                phone_number: phoneNumber,
                password: password.trim(),
                subscribed_to_promotions: isChecked === '1' ? true : false,

            })
        } else {
            Toast.show({
                type: 'problem',
                text1: 'Password must contain an uppercase and number',
            });
        }

    }
    return (
        <ThemedView style={styles.container}>
            <Header variant='back' />

            <View style={styles.content}>
                <View style={styles.spacer} />
                <ThemedText style={[styles.title, { fontFamily: 'Bogart-Semibold' }]}>
                    Create Password
                </ThemedText>

                <View style={styles.inputWrapper}>
                    <View
                        style={[
                            styles.inputContainer,
                            styles.inputActive,
                        ]}
                    >
                        <TextInput
                            style={[styles.input, { marginTop: 0 }]}
                            placeholder='Password'
                            placeholderTextColor='#261D2A4D'

                            autoFocus
                            value={password.trim()}
                            onChangeText={(value) => setPassword(value.trim())}
                            accessibilityLabel='create password input'
                            accessibilityHint='create your password'
                        />
                    </View>
                </View>

                <Button
                    label='Next'
                    onPress={handleCreatePassword}
                    variant={password?.length > 5 ? 'primary' : 'disabled'}
                    disabled={password.length < 5}
                    loading={createPassword.isPending}
                />
            </View>
        </ThemedView>
    )
}

export default CreatePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    closeButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 1,
        padding: 10,
    },
    closeIcon: {
        fontSize: 24,
        color: Colors.light.text,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    spacer: {
        height: 120,
    },
    title: {
        fontFamily: 'Poppins',
        fontSize: 32,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 20,
        lineHeight: 37,
    },
    inputWrapper: {
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: Colors.light.primary,
        marginTop: 12,

    },
    input: {
        flex: 1,
        fontFamily: 'Poppins',
        fontSize: 24,
        paddingVertical: 8,
        color: "000000",
    },

    inputActive: {
        borderBottomColor: Colors.light.primary,
    },
});