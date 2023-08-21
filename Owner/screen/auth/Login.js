import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native'
import AnimatedLoader from "react-native-animated-loader";
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = require("./../../assets/logo.png");
const animLoading = require("./../../assets/loading.json");
import DATA_API from "./../api/dataAPI";



const Login = ({ navigation }) => {

    useEffect(() => {
        cekLogin()
    }, [])

    // Cek apakah user sudah login sebelumnya
    async function cekLogin() {
        try {
            const userLogin = await AsyncStorage.getItem('id')
            

            if (userLogin != null) {
                navigation.replace('Home')
            }
        } catch (e) {
            // read error
        }
    }


    const [email, setEmail] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [passIcon, setPassIcon] = useState('eye-off');

    function checkShow() {

        if (showPassword) {
            setShowPassword(false)
            setPassIcon('eye')
        } else {
            setShowPassword(true)
            setPassIcon('eye-off')
        }
    }

    async function sendLogin() {
        //navigation.replace("Home");
        setLoading(true)
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        if (email != '' && password != '') {
            fetch(`${DATA_API}/login`, {
                method: 'POST',
                headers: {
                   
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            })
                .then(response => response.json())
                .then(async data => {
                    setLoading(false)

                    if (data.status === 200) {
                        const id = JSON.stringify(data.data.id);
                        await AsyncStorage.setItem('id', id)
                        navigation.replace('Home')
                    } else {
                        
                        Alert.alert(`LOGIN GAGAL`, `Username dan Password Salah !`, [
                            { text: 'OK' },
                        ])

                    }
                })
                .catch((error) => {
                    setLoading(false)
                    Alert.alert(`405`, `${error}`, [
                        { text: 'OK' },
                    ])
                });
        } else {
            setLoading(false)
            Alert.alert('Peringatan !', "Inputan tidak boleh ada yang kosong !", [
                { text: 'OK' },
            ])
        }
    }




    if (loading) {
        return (
            <>
                <StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent />
                <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={animLoading}
                    animationStyle={{
                        width: 200,
                        height: 200,
                    }}
                    speed={2}
                    loop={true}
                >
                    <Text>Sedang memuat data ...</Text>
                </AnimatedLoader>
            </>
        )
    }


    return (
        <View className="flex-1 bg-white items-center justify-center">
            <StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent />
            <View className="mb-3 px-6 pt-12 items-center ">
                <Image
                    source={logo}
                    resizeMode='contain'
                    className="w-[150px] h-[150px]"
                />

                <View className="mt-3">
                    <Text className="text-blue-600 font-bold text-3xl text-center">MITRA HS 68</Text>
                    <Text className="text-slate-400 font-medium text-base text-center">Selamat bergabung menjadi Mitra HS 68</Text>
                </View>
            </View>
            <View className="p-6 w-full">
                <View className="mb-6">
                    <Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 ${emailFocus === false && email.length == 0 ? ('top-[15px]') : ('top-[-12px] text-blue-600')}`}>Email</Text>
                    <View className={`border-2 relative  rounded-md ${emailFocus == false && email.length == 0 ? ('border-slate-300') : ('border-blue-600')}`}>
                        <TextInput
                            className="pl-12 text-slate-500 font-bold text-base"
                            onChangeText={(value) => setEmail(value)}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />

                    </View>
                    <View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
                        <Icon name="mail" size={20} color={`${emailFocus == false && email.length == 0 ? ('#9ca3af') : ('#2563eb')}`} />
                    </View>
                </View>
                <View className="mb-6">
                    <Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 ${passwordFocus === false && password.length == 0 ? ('top-[15px]') : ('top-[-12px] text-blue-600')}`}>Password</Text>
                    <View className={`border-2 relative  rounded-md ${passwordFocus == false && password.length == 0 ? ('border-slate-300') : ('border-blue-600')}`}>
                        <TextInput
                            className="pl-12 text-slate-500 font-bold text-base"
                            secureTextEntry={showPassword}
                            onChangeText={(value) => setPassword(value)}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />

                    </View>
                    <View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
                        <Icon name="lock" size={20} color={`${passwordFocus == false && password.length == 0 ? ('#9ca3af') : ('#2563eb')}`} />
                    </View>
                    <TouchableOpacity
                        onPress={checkShow}
                        className="absolute h-[49px] w-[49px] items-center justify-center z-50 right-0"
                    >
                        <Icon name={passIcon} size={20} color={`${showPassword ? ('#9ca3af') : ('#2563eb')}`} />
                    </TouchableOpacity>
                </View>
                <View className="mb-6 mt-6">
                    <TouchableOpacity
                        onPress={sendLogin}
                        className="w-full px-6 py-4 bg-blue-600 items-center justify-center rounded-md"
                    >
                        <Text className="text-white font-medium text-base text-center uppercase">sign-in</Text>
                    </TouchableOpacity>

                </View>
                <View className="mb-6 mt-6">
                    <TouchableOpacity
                        onPress={() => navigation.replace("Register")}
                        className="w-full px-6 py-4 flex-row items-center justify-center rounded-md"
                    >
                        <Text className="text-slate-400 font-normal text-base text-center">Belum punya akun ?!, </Text>
                        <Text className="text-blue-600 font-medium text-base text-center ml-3">Registrasi disini</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    )
}

export default Login