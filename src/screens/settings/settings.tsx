import styles from './settings.styles';
import { colors } from "../../utilis";
import React, { ReactElement } from 'react';
import { View, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { GradientBackground, Text } from '../../components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const difficulties = {
  "1": "Beginner",
  "3": "Intermediate",
  "4": "Hard",
  "-1": "Impossible"
}
type SettingsType ={
  difficulty: keyof typeof difficulties;
  sounds: boolean;
}
const defaultSettings: SettingsType = {
  difficulty: '-1',
  sounds: true
};

export default function Settings(): ReactElement | null {
  const [settings, setSettings] = React.useState<SettingsType | null>(null);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('@settings');
      settings !== null ? setSettings(JSON.parse(settings )) : setSettings(defaultSettings);
    } catch (error) {
      console.log("Encountered an Error loading Settings!");
      setSettings(defaultSettings);
    }
  }

  const saveSetting = async <T extends keyof SettingsType>(setting: T, value: SettingsType[T]) => {
    try {
      const oldSettings = settings ?? defaultSettings;
      const newSetting = {...oldSettings, [setting]: value};
      const jsonSettings = JSON.stringify(newSetting);
      await AsyncStorage.setItem("@settings", jsonSettings);
      setSettings(newSetting);
    } catch (error) {
      Alert.alert("Error", "There was a problem fetching your settings");
    }
  }

  React.useEffect(() => {
    loadSettings();
  }, [])

  return (!settings) ? null : (
    <GradientBackground>
      <SafeAreaView style={{justifyContent: 'center'}}>
        <ScrollView contentContainerStyle={styles.container}>

          <View style={styles.field}>
            <Text style={styles.label}>Bot Difficulties</Text>
            <View style={styles.choices}>
              {Object.keys(difficulties).map((level) => {
                const difficulty = difficulties[level as keyof typeof difficulties];
                return (
                  <TouchableOpacity 
                    style={[
                      styles.choice, 
                      { backgroundColor: level==settings.difficulty 
                          ? colors.lightPurple 
                          : colors.lightGreen 
                      }
                    ]} 
                    key={level}
                    onPress={() => { saveSetting('difficulty', level as keyof typeof difficulties) }}>
                    <Text 
                      style={[
                        styles.choiceText, 
                        { color: level==settings.difficulty 
                            ? '#fff' 
                            : colors.darkPurple 
                        }
                      ]}
                      >{difficulty}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
          
          <View style={[styles.field, styles.switchField]}> 
            <Text style={styles.label}>Sounds</Text>
            <Switch 
              trackColor={{
                false: colors.purple,
                true: colors.lightPurple
              }}
              thumbColor={colors.lightGreen}
              value={settings?.sounds || false } 
              onValueChange={(newVal) => { saveSetting('sounds', newVal) }} />
          </View>

        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  )
}