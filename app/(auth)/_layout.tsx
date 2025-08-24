import {KeyboardAvoidingView, Platform, ScrollView, View, Dimensions, ImageBackground, Image} from 'react-native'
import React from 'react'
import {Slot} from "expo-router";
import {images} from "@/constants";
import CustomInput from "@/Components/CustomInput";
import CustomButton from "@/Components/CustomButton";

export default function _Layout() {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <View className="w-full relative" style={{height: Dimensions.get('screen').height / 2.25}}>
                    <ImageBackground source={images.loginGraphic} className="size-full rounded-b-lg" resizeMode={"stretch"}/>
                    <Image source={images.logo} className="absolute -bottom-16 z-10 self-center size-48"/>
                </View>

                <CustomInput
                    placeholder="Enter your Email"
                    value={''}
                    onChangeText={(text) => {}}
                    label="Email"
                    keyboardType="email-address"
                />
                <CustomButton/>
            </ScrollView>
            <Slot/>
        </KeyboardAvoidingView>
    )
}
