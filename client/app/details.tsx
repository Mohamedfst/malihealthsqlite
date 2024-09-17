import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Modal,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import i18next, { languageResources } from "../services/i18next";
import { useTranslation } from "react-i18next";
import languagesList from "../services/languagesList.json";

export default function details() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
    setVisible(false);
  };

  const passedParams = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.conatainer}>
      <ScrollView>
        <Modal visible={visible} onRequestClose={() => setVisible(false)}>
          <View style={styles.languagesList}>
            <FlatList
              data={Object.keys(languageResources)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.languageButton}
                  onPress={() => changeLng(item)}
                >
                  <Text style={styles.lngName}>
                    {languagesList[item].nativeName}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.buttonText}>
            {t("indexPageWorkerList.language")}
          </Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.titleUserInfo}>
            {" "}
            {t("detailsPageWorkerList.title")}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.id")}:{passedParams.id}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.name")}: {passedParams.name}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.lastName")}: {passedParams.lastname}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.dob")}: {passedParams.dob}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.phoneNumber")}: {passedParams.phone}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.emergencyNumber")}:{" "}
            {passedParams.emergencyNumber}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.medicalLicense")}:{" "}
            {passedParams.medlicense}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.nationaId")}: {passedParams.matlicense}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.spokenLanguages")}:{" "}
            {passedParams.languages}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.teamName")}: {passedParams.team}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.centerName")}: {passedParams.center}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.organization")}:{" "}
            {passedParams.organization}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.role")}: {passedParams.role}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.picture")}: {passedParams.photo}
          </Text>
          <Text style={styles.item}>
            {t("detailsPageWorkerList.createdAt")}: {passedParams.created_at}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: "#6258e8",
    borderRadius: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  languagesList: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#6258e8",
  },

  languageButton: {
    padding: 10,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
  },
  lngName: {
    fontSize: 16,
    color: "white",
  },
  conatainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
    paddingHorizontal: 20,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "#f4511e",
    fontSize: 12,
  },
  titleUserInfo: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "pink",
    fontSize: 24,
  },
});
