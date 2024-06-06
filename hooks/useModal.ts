import { CommonActions, NavigationProp, Route } from '@react-navigation/native';
import { router } from 'expo-router';

type navigationType = NavigationProp<ReactNavigation.RootParamList>;

export function resetState(navigation: navigationType, routes: string[]) {
  if (!router.canGoBack()) {
    navigation.dispatch(CommonActions.reset({
      routes: routes.map((route: string) => ({ name: route } as Route<string>)),
    }))
  }
}

export function useModal() {
  if (!router.canGoBack()) {
    router.navigate("/");
    router.dismissAll();
  }
}
