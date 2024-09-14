import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
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
    <View style={styles.container}>
      {workerList &&
        workerList.map((worker, index) => (
          <View key={index}>
            <Text>{worker.id}</Text>
            <Text>{worker.name}</Text>
            <Text>{worker.middlename}</Text>
            <Text>{worker.lastname}</Text>
            <Text>{worker.dob}</Text>
            <Text>{worker.phone}</Text>
            <Text>{worker.emergencyNumber}</Text>
            <Text>{worker.email}</Text>
            <Text>{worker.address}</Text>
            <Text>{worker.medlicense}</Text>
            <Text>{worker.natlicense}</Text>
            <Text>{worker.languages}</Text>
            <Text>{worker.team}</Text>
            <Text>{worker.center}</Text>
            <Text>{worker.organization}</Text>
            <Text>{worker.role}</Text>
            <Text>{worker.photo}</Text>
            <Text>{worker.created_at}</Text>
          </View>
        ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default index;
