import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function RegisterScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flexWrapper}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    <View style={styles.headerBlock}>
                        <Text style={styles.titleText}>Create Account</Text>
                        <Text style={styles.subtitleText}>Sign up to start traveling safely across Iraq</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="person-outline" size={20} color="#8E8E93" style={styles.inputIcon} />
                            <TextInput
                                placeholder="Full Name"
                                placeholderTextColor="#AEAEB2"
                                style={styles.inputField}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Ionicons name="mail-outline" size={20} color="#8E8E93" style={styles.inputIcon} />
                            <TextInput
                                placeholder="Email Address"
                                placeholderTextColor="#AEAEB2"
                                style={styles.inputField}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Ionicons name="lock-closed-outline" size={20} color="#8E8E93" style={styles.inputIcon} />
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#AEAEB2"
                                style={styles.inputField}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={secureText}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                                <Ionicons name={secureText ? "eye-outline" : "eye-off-outline"} size={20} color="#8E8E93" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.actionBlock}>
                        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={() => router.replace('/(tabs)')}>
                            <Text style={styles.primaryButtonText}>Sign Up</Text>
                        </TouchableOpacity>

                        <View style={styles.footerRedirectRow}>
                            <Text style={styles.footerLabel}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text style={styles.redirectText}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFBFF',
    },
    flexWrapper: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        justifyContent: 'space-around',
        paddingVertical: 20,
    },
    headerBlock: {
        marginTop: 20,
    },
    titleText: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    subtitleText: {
        fontSize: 15,
        color: '#8E8E93',
        marginTop: 8,
        fontWeight: '500',
    },
    formContainer: {
        gap: 16,
        marginVertical: 30,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderRadius: 18,
        paddingHorizontal: 16,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    inputField: {
        flex: 1,
        fontSize: 15,
        color: '#1C1C1E',
        fontWeight: '600',
    },
    actionBlock: {
        gap: 20,
    },
    primaryButton: {
        backgroundColor: '#6236FF',
        height: 56,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6236FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    footerRedirectRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerLabel: {
        fontSize: 14,
        color: '#8E8E93',
        fontWeight: '500',
    },
    redirectText: {
        color: '#6236FF',
        fontSize: 14,
        fontWeight: '700',
    },
});