import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function details() {
  const passedParams = useLocalSearchParams();
  return (
    <View style={styles.conatainer}>
      <ScrollView>
        <View>
          <Text style={styles.titleUserInfo}> User Information</Text>
          <Text style={styles.item}>Name: {passedParams.name}</Text>
          <Text style={styles.item}>Last Name: {passedParams.lastname}</Text>
          <Text style={styles.item}>DOB: {passedParams.dob}</Text>
          <Text style={styles.item}>Phone#: {passedParams.phone}</Text>
          <Text style={styles.item}>
            Emergency#: {passedParams.emergencyNumber}
          </Text>
          <Text style={styles.item}>
            Medical License#: {passedParams.medlicense}
          </Text>
          <Text style={styles.item}>
            National Id#: {passedParams.matlicense}
          </Text>
          <Text style={styles.item}>
            Language(s) Spoken: {passedParams.languages}
          </Text>
          <Text style={styles.item}>Team Name: {passedParams.team}</Text>
          <Text style={styles.item}>Center Name: {passedParams.center}</Text>
          <Text style={styles.item}>
            Organization Name: {passedParams.organization}
          </Text>
          <Text style={styles.item}>Role: {passedParams.role}</Text>
          <Text style={styles.item}>Picture: {passedParams.photo}</Text>
          <Text style={styles.item}>Joined on: {passedParams.created_at}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
    paddingHorizontal: 20,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "pink",
    fontSize: 12,
  },
  titleUserInfo: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "red",
    fontSize: 24,
  },
});
