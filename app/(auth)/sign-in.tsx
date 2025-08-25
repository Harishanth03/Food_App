import {View, Text, Button} from 'react-native'
import React from 'react'
import CustomInput from "@/Components/CustomInput";
import CustomButton from "@/Components/CustomButton";

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
                keyboardType="email-address"
                secureTextEntry={true}
            />
            <CustomButton
                title="Sign In"
            />
        </View>
    )
}
export default SignIn
