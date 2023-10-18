import {
  View,
  ScrollView,
  StyleSheet,
  DimensionValue,
  RefreshControl,
} from "react-native";
import React, { createContext, useContext } from "react";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
});

type ScrollContainerContextType = {};
const ScrollContainerContext = createContext<ScrollContainerContextType>({});

type ScrollContainerProps = {
  children: React.ReactNode;
  style?: {
    gap?: number;
    maxHeight?: DimensionValue;
    paddingVertical?: DimensionValue;
    paddingTop?: DimensionValue;
    paddingBottom?: DimensionValue;
  };
};
const ScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  style,
}) => {
  return (
    <ScrollContainerContext.Provider value={{}}>
      <ScrollView        
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {}}
          />
        }
        style={{ ...styles.container, maxHeight: style?.maxHeight }}
      >
        <View
          style={{
            paddingVertical: style?.paddingVertical ?? 10,
            paddingTop: style?.paddingTop,
            paddingBottom: style?.paddingBottom,
            gap: style?.gap ?? 15,
          }}
        >
          {children}
        </View>
      </ScrollView>
    </ScrollContainerContext.Provider>
  );
};

export default ScrollContainer;
export function useScrollContainer() {
  return useContext(ScrollContainerContext);
}
