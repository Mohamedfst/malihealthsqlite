import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { router } from "expo-router";
import axios from "axios";

const index = () => {
  const [workerList, setWorkerList] = useState<string[]>([]);
  const fetchWorkerList = async () => {
    try {
      const httpResponse = await axios.get(process.env.EXPO_PUBLIC_API_URL);
      setWorkerList(await httpResponse.data.rows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWorkerList();
  }, []);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title sortDirection="descending">Id</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title numeric>DOB</DataTable.Title>
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
              {worker.id}
            </DataTable.Cell>
            <DataTable.Cell numeric>{worker.name}</DataTable.Cell>
            <DataTable.Cell numeric>{worker.dob}</DataTable.Cell>
          </DataTable.Row>
        ))}
    </DataTable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
export default index;
