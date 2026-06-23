import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3000';

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        fullname: string;
        email: string;
        role: string;
    };
}

function extractErrorMessage(data: any): string {
    if (!data) return 'Login failed. Please try again.';

    if (typeof data.error === 'string') {
        return data.error;
    }

    const errorObj = data.error ?? data;
    const raw = errorObj?.message ?? data.message;

    if (typeof raw === 'string') {
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                return parsed.map((item: any) => item?.message).filter(Boolean).join('\n');
            }
        } catch {
            return raw;
        }
        return raw;
    }

    return 'Login failed. Please try again.';
}

type FieldName = 'email' | 'password' | null;

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [focusedField, setFocusedField] = useState<FieldName>(null);

    const validate = (): string | null => {
        if (!email.trim()) return 'Please enter your email';
        if (!/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email';
        if (!password) return 'Please enter your password';
        return null;
    };

    const handleLogin = async () => {
        const validationError = validate();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setErrorMessage(null);
        setLoading(true);

        try {
            const payload = {
                email: email.trim().toLowerCase(),
                password,
            };

            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(extractErrorMessage(data));
            }

            const result = data as LoginResponse;

            await SecureStore.setItemAsync('authToken', result.accessToken);
            await SecureStore.setItemAsync('refreshToken', result.refreshToken);

            router.replace('/(tabs)');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
            setErrorMessage(message);
            Alert.alert('Login Failed', message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.innerContainer}>

                <View style={styles.headerBlock}>
                    <Text style={styles.titleText}>Welcome Back</Text>
                    <Text style={styles.subtitleText}>Sign in to book your next ride easily</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={[styles.inputWrapper, focusedField === 'email' && styles.inputWrapperFocused]}>
                        <Ionicons
                            name="mail-outline"
                            size={20}
                            color={focusedField === 'email' ? '#6236FF' : '#8E8E93'}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder="Email Address"
                            placeholderTextColor="#AEAEB2"
                            style={styles.inputField}
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!loading}
                        />
                    </View>

                    <View style={[styles.inputWrapper, focusedField === 'password' && styles.inputWrapperFocused]}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color={focusedField === 'password' ? '#6236FF' : '#8E8E93'}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#AEAEB2"
                            style={styles.inputField}
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField(null)}
                            secureTextEntry={secureText}
                            autoCapitalize="none"
                            editable={!loading}
                        />
                        <TouchableOpacity onPress={() => setSecureText(!secureText)} disabled={loading} hitSlop={8}>
                            <Ionicons name={secureText ? "eye-outline" : "eye-off-outline"} size={20} color="#8E8E93" />
                        </TouchableOpacity>
                    </View>

                    {errorMessage && (
                        <View style={styles.errorBox}>
                            <Ionicons name="alert-circle" size={16} color="#FF3B30" />
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    )}

                    <TouchableOpacity style={styles.forgotBtn} disabled={loading} hitSlop={8}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',   // Yeh buttons ko wrap karega
                    gap: 10,

                }}>
                    <TouchableOpacity
                        style={{}}
                        onPress={() => router.push('/tracking')}
                    >
                        <Text style={{ textDecorationLine: 'underline', color: '#6236FF' }}>Traking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/active-ride')}
                    >
                        <Text style={{ textDecorationLine: 'underline', color: '#6236FF' }}>active-ride</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/on-map')}
                    >
                        <Text style={{ textDecorationLine: 'underline', color: '#6236FF' }}>on-map</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/rate-ride')}
                    >
                        <Text style={{ textDecorationLine: 'underline', color: '#6236FF' }}>Rate Ride</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/reviews')}
                    >
                        <Text style={{ textDecorationLine: 'underline', color: '#6236FF' }}>Reviws</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/rides')}
                    >
                        <Text style={{ textDecorationLine: 'underline', color: '#6236FF' }}>Rides</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/save-location')}
                    >
                        <Text style={{ textDecorationLine: 'underline', color: '#6236FF' }}>Save Locations</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/saved-places')}
                    >
                        <Text style={{ textDecorationLine: 'underline', color: '#6236FF' }}>saved-places</Text>
                    </TouchableOpacity>
                </View>
                {/* Action Controls */}
                <View style={styles.actionBlock}>
                    <TouchableOpacity
                        style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
                        activeOpacity={0.85}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.primaryButtonText}>Sign In</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.footerRedirectRow}>
                        <Text style={styles.footerLabel}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push("/auth/register")} disabled={loading} hitSlop={8}>
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
        letterSpacing: -0.5,
    },
    subtitleText: {
        fontSize: 15,
        color: '#8E8E93',
        marginTop: 8,
        fontWeight: '500',
        lineHeight: 21,
    },
    formContainer: {
        gap: 14,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#EFEFEF',
        borderRadius: 18,
        paddingHorizontal: 16,
        height: 56,
        shadowColor: '#1C1C1E',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    inputWrapperFocused: {
        borderColor: '#6236FF',
        shadowColor: '#6236FF',
        shadowOpacity: 0.1,
        shadowRadius: 8,
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
    errorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(255, 59, 48, 0.08)',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    errorText: {
        flex: 1,
        color: '#FF3B30',
        fontSize: 13,
        fontWeight: '600',
        lineHeight: 18,
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
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.28,
        shadowRadius: 10,
        elevation: 4,
    },
    primaryButtonDisabled: {
        opacity: 0.6,
        shadowOpacity: 0.1,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.2,
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