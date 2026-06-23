import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);

    return (

        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.innerContainer}>

                {/* Header Block */}
                <View style={styles.headerBlock}>
                    <Text style={styles.titleText}>Welcome Back</Text>
                    <Text style={styles.subtitleText}>Sign in to book your next ride easily</Text>
                </View>

                {/* Input Form Fields */}
                <View style={styles.formContainer}>
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

                    <TouchableOpacity style={styles.forgotBtn}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Action Controls */}
                <View style={styles.actionBlock}>
                    <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}
                        onPress={() => router.replace('/(tabs)')}
                    >
                        <Text style={styles.primaryButtonText}>Sign In</Text>
                    </TouchableOpacity>

                    <View style={styles.footerRedirectRow}>
                        <Text style={styles.footerLabel}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/auth/register')}
                        >
                            <Text style={styles.redirectText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFBFF',
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'space-around',
    },
    headerBlock: {
        marginTop: 40,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
        elevation: 1,
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
    forgotBtn: {
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    forgotText: {
        color: '#6236FF',
        fontSize: 13,
        fontWeight: '700',
    },
    actionBlock: {
        gap: 20,
        marginBottom: 20,
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