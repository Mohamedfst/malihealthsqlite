import React, { useEffect, useState, Suspense } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Modal,
  View,
  FlatList,
} from "react-native";
import { DataTable } from "react-native-paper";
import { router } from "expo-router";
import axios from "axios";
import i18next, { languageResources } from "../services/i18next";
import { useTranslation } from "react-i18next";
import languagesList from "../services/languagesList.json";
import { createStore } from "tinybase";
import { SQLiteProvider } from "expo-sqlite";
import { createRemotePersister } from "tinybase/persisters/persister-remote";

const index = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const dbConfig = async (httpResponseDataRows) => {
    const store = createStore().setTables({
      workers: {
        newWorker: {
          name: "Mohamed",
          lastname: "Mohamed",
          middlename: "Moussa",
          dob: "Mohamed",
          phone: "Mohamed",
          emergencyNumber: "Mohamed",
          email: "Mohamed",
          address: "Mohamed",
          medlicense: "Mohamed",
          natlicense: "Mohamed",
          languages: "Mohamed",
          team: "Mohamed",
          center: "Mohamed",
          organization: "Mohamed",
          role: "Mohamed",
          photo: "Mohamed",
        },
      },
    });

    const loadUrl = "http://localhost:3000/hcworkerlist";
    const saveUrl = "http://localhost:3000/hcworkerlist";
    //const saveUrl = 'https://tinybase.org/assets/countries.json';
    const persister = createRemotePersister(
      store,
      loadUrl,
      saveUrl,
      5,
      (error: any) => console.log(error)
    );

    console.log("AllRows", store.getTables());

    persister.save();

    persister.startAutoLoad();
  };

  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
    setVisible(false);
  };

  const [workerList, setWorkerList] = useState<string[]>([]);
  const fetchWorkerList = async () => {
    try {
      const httpResponse = await axios.get(process.env.EXPO_PUBLIC_API_URL);
      const httpResponseDataRows = await httpResponse.data.rows;
      const combineLocalServerResponses = await dbConfig(httpResponseDataRows);
      setWorkerList(httpResponseDataRows);
    } catch (error) {
      console.error("Error fetching data:", error);
      setWorkerList(await dbConfig([]));
    }
  };

  useEffect(() => {
    fetchWorkerList();
  }, []);

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <SQLiteProvider databaseName="workerList.db" useSuspense={true}>
        <SafeAreaView style={styles.container}>
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
          <DataTable>
            <DataTable.Header>
              <DataTable.Title sortDirection="descending">Id</DataTable.Title>
              <DataTable.Title>{t("indexPageWorkerList.name")}</DataTable.Title>
              <DataTable.Title numeric>
                {t("indexPageWorkerList.dob")}
              </DataTable.Title>
            </DataTable.Header>
            {workerList &&
              workerList.map((worker, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell
                    onPress={() => {
                      router.push({
                        pathname: "./details",
                        params: worker,
                      });
                    }}
                  >
                    {worker.id || worker._id}
                  </DataTable.Cell>
                  <DataTable.Cell
                    numeric
                    onPress={() => {
                      router.push({
                        pathname: "./details_",
                        params: worker,
                      });
                    }}
                  >
                    {worker.name}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{worker.dob}</DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </SafeAreaView>
      </SQLiteProvider>
    </Suspense>
  );
};

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
});
export default index;
