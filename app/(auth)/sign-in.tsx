import CustomButton from "@/Components/CustomButton";
import CustomInput from "@/Components/CustomInput";
import { signIn } from "@/lib/appwrite";
import * as Sentry from "@sentry/react";
import { Link, router } from "expo-router";
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const SignIn = () => {

    const  [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<{email?: string; password?: string}>({});

    const validateEmail = (email: string) => {
        const re = /^\S+@\S+\.\S+$/;
        return re.test(email.trim());
    }

    const validatePassword = (password: string) => {
        return password.trim().length >= 6;
    }
    const submit = async () => {

        const {email, password} = form;
        const trimmedEmail = email.trim();
        const trimmedPassword = password;

        const newErrors: {email?: string; password?: string} = {};
        if (!trimmedEmail) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(trimmedEmail)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!trimmedPassword) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(trimmedPassword)) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            Alert.alert('Invalid input', 'Please fix the errors and try again');
            return;
        }

        setIsSubmitting(true)

        try {
            await signIn({email: trimmedEmail, password: trimmedPassword});

            Alert.alert('Success', 'Sign in Successfully');
            router.replace('/');
        }catch (error: any){
            Alert.alert('Error', error.message)
            Sentry.captureEvent(error)
        }finally {
            setIsSubmitting(false)
        }
    }
    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <CustomInput
                placeholder="Enter your Email"
                value={form.email}
                onChangeText={(text) => {
                    setForm((prev) => ({...prev, email: text}));
                    setErrors((prev) => ({...prev, email: undefined}));
                }}
                label="Email"
                keyboardType="email-address"
            />

            {errors.email ? (
                <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
            ) : null}

            <CustomInput
                placeholder="Enter your Password"
                value={form.password}
                onChangeText={(text) => {
                    setForm((prev) => ({...prev, password: text}));
                    setErrors((prev) => ({...prev, password: undefined}));
                }}
                label="Password"
                secureTextEntry={true}
            />

            {errors.password ? (
                <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
            ) : null}
            <CustomButton
                title="Sign In"
                isLoading={isSubmitting}
                onPress={() => {
                    if (isSubmitting) return;
                    if (!validateEmail(form.email) || !validatePassword(form.password)) {
                        const quickErrs: {email?: string; password?: string} = {};
                        if (!validateEmail(form.email)) quickErrs.email = 'Please enter a valid email';
                        if (!validatePassword(form.password)) quickErrs.password = 'Password must be at least 6 characters';
                        setErrors((prev) => ({...prev, ...quickErrs}));
                        Alert.alert('Invalid input', 'Please fix the errors and try again');
                        return;
                    }
                    submit();
                }}
                style={isSubmitting || !validateEmail(form.email) || !validatePassword(form.password) ? 'opacity-50' : ''}
                
            />

            <View className="flex flex-row justify-center mt-1 gap-2">
                <Text className="base-regular text-gray-100">Don&apos;t you have an account?</Text>
                <Link href="/sign-up" className="base-bold text-primary">
                    Sign UP
                </Link>
            </View>
        </View>


    )
}
export default SignIn
