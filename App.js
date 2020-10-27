import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity , TextInput} from 'react-native';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      word:"",
      definition:"",
      catagory:"",
    }
  }
  getInfo=async()=>{
    var word = this.state.word;
    var url = "https://rupinwhitehatjr.github.io/dictionary/" + word + ".json";
    var def = await fetch(url).then((data)=>{
      if(data.status===200){
        return data.json();
      }
      else{
        return null
      }
    });
    this.setState({
      catagory:def.definitions[0].wordtype,
      definition:def.definitions[0].description,
    });
    console.log(def);
    console.log(this.state.catagory);
    console.log(this.state.definition);
    //console.log(def);

  }
  render(){
    return (
      <View style={styles.container}>
        <View>
          <TextInput style={styles.textInputStyle} placeholder="Word" value={this.state.word} onChangeText={(text)=>{
            this.setState({
              word:text,
            });
          }}/>
          <TouchableOpacity style={styles.opacityStyle} onPress={()=>{this.getInfo()}} >
            <Text style={styles.opacityTextStyle}>Enter</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.outputStyle} >{this.state.word}</Text>
        <Text style={styles.outputStyle} >{this.state.definition}</Text>
        <Text style={styles.outputStyle} >{this.state.catagory}</Text>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  outputStyle:{
    color:"white",
    marginTop:20,
    justifyContent:'center',
    

  },
  textInputStyle:{
    borderColor:"white",
    borderWidth:5,
    width:200,
    height:30,
    
  },
  opacityStyle:{
    justifyContent:"center",
    width:200,
    height:20,
    marginTop:20,
    backgroundColor:"red",

  },
  opacityTextStyle:{
    justifyContent:"center",
    color:"white",
    marginLeft:80,

  }
});
