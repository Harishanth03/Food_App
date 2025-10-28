import {View, Text, Alert} from 'react-native'
import React, {useState} from 'react'
import CustomInput from "@/Components/CustomInput";
import CustomButton from "@/Components/CustomButton";
import {Link, router} from "expo-router";
import {signIn} from "@/lib/appwrite";
import * as Sentry from "@sentry/react";

const SignIn = () => {

    const  [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const submit = async () => {

        const {email, password} = form;
        if (!email || !password) {
            Alert.alert('Error', 'Please enter an valid email or password');
            return;
        }


        setIsSubmitting(true)

        try {
            await signIn({email, password});

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
                onChangeText={(text) => setForm((prev) => ({...prev, email: text}))}
                label="Email"
                keyboardType="email-address"
            />

            <CustomInput
                placeholder="Enter your Password"
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
                label="Password"
                secureTextEntry={true}
            />
            <CustomButton
                title="Sign In"
                isLoading={isSubmitting}
                onPress={submit}
                
            />

            <View className="flex flex-row justify-center mt-1 gap-2">
                <Text className="base-regular text-gray-100">Don't you have an account?</Text>
                <Link href="/sign-up" className="base-bold text-primary">
                    Sign UP
                </Link>
            </View>
        </View>


    )
}
export default SignIn
