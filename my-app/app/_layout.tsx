import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack, Tabs} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import {GluestackUIProvider} from "@gluestack-ui/themed-native-base";
import {config} from "@gluestack-ui/config";
import {useColorScheme} from 'react-native';
import {QueryClientProvider, useQuery} from "react-query";
import {queryClient} from "shared/lib/query/queryClient";
import axios from "axios";
import {ReactQueryDevtools} from "react-query/devtools";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav/>;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <GluestackUIProvider config={config}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <QueryClientProvider client={queryClient}>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                        <Stack.Screen name="(tabs)/todo" options={{headerShown: false}}/>
                        <Stack.Screen name="personForm" options={{headerShown: false}}/>
                        <Stack.Screen name="modal" options={{presentation: 'modal'}}/>
                        <ReactQueryDevtools initialIsOpen={false}/>
                    </Stack>
                </QueryClientProvider>

            </ThemeProvider>
        </GluestackUIProvider>
    );
}
