import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image,StyleSheet, Clipboard } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // Import FontAwesome
import Share from "react-native-share"; 
import { Linking } from "react-native";

const AppM = () => {
  const [Quote, setQuote] = useState("");
  const [Author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const shareToTwitter = () => {
    const tweetContent = `${Quote} - ${Author}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`;
  
    Linking.openURL(tweetUrl)
      .then((data) => {
        console.log("Twitter opened successfully");
      })
      .catch(() => {
        console.error("An error occurred while opening Twitter");
      });
  };
  
  const randomQuote = () => {
    setIsLoading(true);
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((result) => {
        setQuote(result.content);
        setAuthor(result.author);
        setIsLoading(false);
      });
  };
  const copyToClipboard = () => {
    Clipboard.setString(`${Quote} - ${Author}`);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00ffff" }}>
      
      <View style={styles.mainF}>
        <Text style={styles.headingT}>"Quote of The Day"</Text>
        <View style={styles.screenM}>
        <FontAwesome name="quote-left" size={20} color="#ff7f50"/>
          <Text style={styles.quotes}>{Quote}</Text>
          <FontAwesome name="quote-right"  style={{textAlign:"right",fontSize:20,color:"#ff7f50"}}/>
          <Text style={styles.author}>Author: {Author}</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#00ffff",
            borderRadius: 30,
            margin: 20,
            padding: 20,
          }}
          onPress={randomQuote}
        >
          <Text style={styles.button}>Generate Quote</Text>
        </TouchableOpacity>
        <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={styles.icon1} onPress={() => copyToClipboard()}>
          <FontAwesome name="copy" size={30} color="#6495ed"/>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.icon1} onPress={()=> shareToTwitter()}>
          <FontAwesome name="share" size={30} color="#6495ed"/>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon1:{
    borderColor:"#6495ed",
    borderRadius:50,
    borderWidth:2,
    padding:15,
    marginBottom:5,
    marginLeft:80
  },
  button: {
    textAlign: "center",
    fontSize: 20,
  },
  author: {
    padding: 10,
    fontSize: 25,
    color: "#000000",
    textAlign: "right",
    marginBottom:10
  },
  quotes: {
    color:"#dc143ccrimson",
    fontStyle: "italic",
    textShadowColor: "#0000FF",
    padding: 10,
    textAlign: "center",
    fontSize: 18,
  },
  headingT: {
    color: "#00bfff",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "1000",
    marginTop: 20,
    marginBottom: 20,
  },
  mainF: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderColor: "#0000FF",
    borderWidth: 5,
    padding: 2,
  },
  screenM: {
    height: 250,
    backgroundColor: "#e0ffff",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderColor: "#0000FF",
    borderWidth: 5,
  },
});

export default AppM;
