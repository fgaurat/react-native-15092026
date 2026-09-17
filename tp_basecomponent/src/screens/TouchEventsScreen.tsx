import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Section } from "../components/Section";
import { EventLog, stamp } from "../components/EventLog";
import { colors, radius, spacing } from "../theme";

const TouchEventsScreen = () => {
  const [entries, setEntries] = useState<string[]>([]);
  const [finger, setFinger] = useState<{ x: number; y: number } | null>(null);
  const log = (message: string) =>
    setEntries((previous) => [stamp(message), ...previous].slice(0, 30));

  return (
    <>
      <Text>TouchEventsScreen</Text>

      <Section title="Button & Touchable" description="Button & Touchable">
        <View style={styles.row}>
          <Button
            color={colors.primary}
            title="Button"
            onPress={() => log("Button onPress")}
          />
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => log("TouchableOpacity onPress")}
            activeOpacity={0.4}
          >
            <Text style={styles.touchableText}>Opacity</Text>
          </TouchableOpacity>

          <TouchableHighlight
            style={styles.touchable}
            underlayColor={colors.accent}
            onPress={() => log("TouchableHighlight onPress")}
          >
            <Text style={styles.touchableText}>Highlight</Text>
          </TouchableHighlight>
        </View>
      </Section>

      {/* <Section title="Pressable" description="Pressable">
        <Pressable
          onPressIn={() => log("Pressable onPressIn")}
          onPressOut={() => log("Pressable onPressOut")}
          onPress={() => log("Pressable onPress")}
          onLongPress={() => log("Pressable onLongPress")}
          delayLongPress={600}
          onHoverIn={() => log("Pressable onHoverIn")}
          onHoverOut={() => log("Pressable onHoverOut")}
          style={(pressed) => [
            styles.pressable,
            pressed && styles.pressablePressed,
          ]}
        >
          <Text style={styles.touchableText}>Pressable</Text>
        </Pressable>
      </Section> */}

      <Section
        title="Gesture Responder"
        description="Gesture Responder"
      >
        <View 
        style={styles.touchPad}
        onStartShouldSetResponder={() => true}
        
        onResponderGrant={(event)=>{
            setFinger({x:event.nativeEvent.locationX,y:event.nativeEvent.locationY})
            log("Touch event grant"+JSON.stringify({x:event.nativeEvent.locationX,y:event.nativeEvent.locationY}))

        }}
        onResponderMove={ (event)=>{
                setFinger({x:event.nativeEvent.locationX,y:event.nativeEvent.locationY})
                log("Touch event move"+JSON.stringify({x:event.nativeEvent.locationX,y:event.nativeEvent.locationY}))
            }
            
        }
        onResponderRelease={
            (event)=>{
                setFinger(null)
                log("Touch event release"+JSON.stringify({x:event.nativeEvent.locationX,y:event.nativeEvent.locationY}))
            }
        }
        onResponderTerminate={()=>{
            setFinger(null)
            log("Touch event terminate")
        }}

        >


        </View>

      </Section>

      <Section title="Logs" description="Logs">
        <EventLog entries={entries} />
      </Section>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
  },
  touchable: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  touchableText: {
    color: "#fff",
    fontWeight: "600",
  },
  pressable: {
    backgroundColor: colors.accent,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
  },
  pressablePressed: {
    backgroundColor: "#B45309",
    transform: [{ scale: 0.97 }],
  },
  pressableText: {
    color: "#fff",
    fontWeight: "700",
  },
  touchPad: {
    height: 180,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  touchPadHint: {
    color: colors.muted,
  },
  fingerDot: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    opacity: 0.6,
  },
  logHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  logHint: {
    color: colors.muted,
    fontSize: 12,
  },
});

export default TouchEventsScreen;
