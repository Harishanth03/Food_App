import {View, Text, Button} from 'react-native'
import React from 'react'
import CustomInput from "@/Components/CustomInput";
import CustomButton from "@/Components/CustomButton";
import {Link} from "expo-router";

const SignIn = () => {
    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <CustomInput
                placeholder="Enter your Email"
                value={''}
                onChangeText={(text) => {}}
                label="Email"
                keyboardType="email-address"
            />

            <CustomInput
                placeholder="Enter your Password"
                value={''}
                onChangeText={(text) => {}}
                label="Password"
                secureTextEntry={true}
            />
            <CustomButton
                title="Sign In"
            />

            <View className="flex flex-row justify-center mt-1 gap-2">
                <Text className="base-regular text-gray-100">Don't have an account?</Text>
                <Link href="/sign-up" className="base-bold text-primary">
                    Sign Up
                </Link>
            </View>
        </View>


    )
}
export default SignIn
