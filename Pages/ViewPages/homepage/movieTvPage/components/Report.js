import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import useFavoriteWatch from "../../../viewPagecustomehook/useFavoriteWatch";
import { SelectList } from "react-native-dropdown-select-list";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import constant from "../../../../../constant";
export default function Report({ title, MovieId, visible, setVisible }) {
  const [selected, setSelected] = useState("not interested");
  const [content, setContent] = useState(null);
  const data = [
    { key: "1", value: "promotes terrorism" },
    { key: "2", value: "destroys culture" },
    { key: "3", value: "legal issue" },
    { key: "4", value: "Harmfull or dangerous acts" },
    { key: "5", value: "miss information" },
    { key: "7", value: "child abuse" },
  ];

  const requestConfig = {
    url: `${constant.url}/report/add/`,
    body: JSON.stringify({
      title: title,
      movie_id: MovieId,
      Report_Content: selected,
      Aditional_content: content,
    }),
  };
  const { isPending, Add, added } = useFavoriteWatch(requestConfig);
  const handleTextChange = (text) => {
    setContent(text);
  };
  const handleReport = () => {
    Add();
    setContent("");
    setTimeout(() => {
      setVisible(!visible);
    }, 3000);
  };
  return (
    <View style={{ display: visible ? "none" : "flex", margin: 10 }}>
      <Text style={tw`text-gray-500`}>Select one</Text>
      <SelectList
        setSelected={setSelected}
        data={data}
        save="value"
        maxHeight={200}
        dropdownStyles={{ backgroundColor: "#12244a" }}
        dropdownTextStyles={{ color: "white" }}
        inputStyles={{
          color: "black",
        }}
        boxStyles={{
          backgroundColor: "white",
        }}
      />
      <View>
        <Text style={tw`text-gray-500 pt-5`}>provide Additional detail</Text>
        <TextInput
          multiline={true}
          placeholder="Additional ditail"
          value={content}
          style={{
            backgroundColor: "white",
            color: "black",
            borderRadius: 5,
            marginTop: 5,
            borderColor: "black",
            borderWidth: 1,
            padding: 4,
          }}
          onChangeText={handleTextChange}
        />
        <View style={tw`flex-row justify-around items-center mt-2`}>
          <TouchableOpacity
            style={tw`bg-red-600 rounded-lg`}
            onPress={() => setVisible(!visible)}
          >
            <Text style={tw`text-white px-4 py-1`}>Calcel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-green-600 rounded-lg`}
            onPress={handleReport}
          >
            {isPending ? (
              <Text style={tw`text-white px-4 py-1`}>Reporting...</Text>
            ) : (
              <Text style={tw`text-white px-4 py-1`}>Report</Text>
            )}
          </TouchableOpacity>
        </View>
        {added ? (
          <Text style={tw`ml-20 mt-2 text-green-500`}>
            Reported successfuly
          </Text>
        ) : (
          ""
        )}
      </View>
    </View>
  );
}
