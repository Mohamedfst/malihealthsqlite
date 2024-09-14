import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import axios from "axios";

const apiUrl = "http://10.0.0.103:3000/hcworkers";

const index = () => {
  const [workerList, setWorkerList] = useState<string[]>([]);
  const fetchWorkerList = async () => {
    try {
      const httpResponse = await axios.get(apiUrl);
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
        <DataTable.Title>Id</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title numeric>DOB</DataTable.Title>
      </DataTable.Header>

      {workerList &&
        workerList.map((worker, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{worker.id}</DataTable.Cell>
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
