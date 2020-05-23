import React, { Component } from 'react';
import { TouchableOpacity, Image, SafeAreaView, ScrollView, StyleSheet, Dimensions, View, Button, Picker} from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { VictoryArea, VictoryBar, VictoryChart, VictoryTheme,VictoryLine } from "victory-native";

import { Block, Card, Text, Icon, Label } from '../components';
import * as theme from '../constants/theme';
import API_config from '../config/API_config';
import { bindActionCreators } from 'redux';
import { getDownlink, getUplink, getModem, getHeadline } from '../action/dashboard';
import { getAsyncStorage } from '../action/asyncStorage';
import { connect } from 'react-redux';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function Unix_timestamp(t)
{
var dt = new Date(t*1000);
var hr = dt.getHours();
var m = dt.getMinutes();
var s = dt.getSeconds();
var time = hr + ":" + m;
return time;  
}

function Nowdate(t)
{
var dt = new Date(t*1000);
var hr = dt.getDate();
var m = dt.getMonth();
var s = dt.getFullYear();
var time = hr + " " + monthNames[m] + " " + s;
return time;  
}

const styles = StyleSheet.create({
  secontainer: {
    marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    inputBox: {
      opacity: 0.8,
      borderRadius: 5,
      justifyContent: 'center',
      marginHorizontal: 20,
      marginBottom: 10,
      backgroundColor: 'rgba(255,255,255,0.5)',
  },
  picker: {
    flex: 1
  },
  overview: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.blue,
  },
  margin: {
    marginHorizontal: 25,
  },
  driver: {
    marginBottom: 11,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#4e73df',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labeluser: {
    fontSize: 13,
    fontWeight:"bold",
    color:'#87cefa',
    textAlign: 'left',
    alignSelf: "flex-start",
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  signupTextBorder: {
    flexGrow: 1,
    fontSize: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 15,
    flexDirection:'row'
  },
  signupText:{
    color:'rgba(255,255,255,0.3)',
    fontSize:20
  },
  buttonText: {
    fontSize:16,
    fontWeight:"bold",
    color:'#87cefa'
  },
  button:{
    width:300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#002171',
    fontSize:16,
    fontWeight:"500",
    borderRadius:10,
    padding: 10
  },
  boxinput:{
    width:300,
    backgroundColor:'rgba(255,255,255,0.5)',
    borderRadius:10,
    paddingVertical:10,
    paddingHorizontal:20,
    fontSize:16,
    marginVertical:5,
  },
  signupButton:{
    color:'#87cefa',
    fontSize:14,
    fontWeight:'500'
  },
  filterTime: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden'
  },
  filterTimeButton: {
    backgroundColor: '#6c757d',
    padding: 18
  },
  filterTimeText: {
    color: '#ffff'
  }
});


class Dashboard extends Component {
  static navigationOptions = {
    headerRightContainerStyle: {
      paddingRight: 24
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      a : 14,
      b : 13,
      c : 12,
      d : 11,
      e : 10,
      modemnow : "Modem 1",
      data: [],
      isLoading1: true,
      isLoading2: true,
      isLoading3: true,
      
      downlink: [],
      uplink: [],
      modem: [],
      headline: [],
      router: '',
      downlinkChart: 'today',
      uplinkChart: 'today'
    }
  } 

  updateRouter1 = () => {
    this.setState({     
      a : 14,
      b : 13,
      c : 12,
      d : 11,
      e : 10,
      modemnow : "Modem 1"
    })
  }

  updateRouter2 = () => {
    this.setState({     
      a : 9,
      b : 8,
      c : 7,
      d : 6,
      e : 5,
      modemnow : "Modem 2"
    })
  }

  updateRouter3 = () => {
    this.setState({     
        a : 4,
        b : 3,
        c : 2,
        d : 1,
        e : 0,
        modemnow : "Modem 3"
      })
  }

  componentDidMount() {
    this.getDownlink();
    this.getUplink();
    this.getModem();
    this.getHeadline();
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.downlink !== this.props.downlink) {
      if (this.props.downlink !== null) {
        if (this.props.downlink) {
          this.setState({
            downlink: this.props.downlink.data,
            isLoading1: false
          })
        }
      }
    }
    if (prevProps.uplink !== this.props.uplink) {
      if (this.props.uplink !== null) {
        if (this.props.uplink) {
          this.setState({
            uplink: this.props.uplink.data,
            isLoading2: false
          })
        }
      }
    }
    if (prevProps.modem !== this.props.modem) {
      if (this.props.modem !== null) {
        if (this.props.modem.status) {
          this.setState({
            modem: this.props.modem.data,
            isLoading3: false
          })
        }
      }
    }
    if (prevProps.headline !== this.props.headline) {
      if (this.props.headline !== null) {
        if (this.props.headline.status) {
          this.setState({headline: this.props.headline.data})
        }
      }
    }
  }

  getDownlink = (type = 'today') => {
    this.setState({downlink: []})
    let data = {}
    if (type === null) {
      data = {
        token: API_config.token
      }
    }else{
      data = {
        token: API_config.token,
        type: type
      }
    }
    this.props.getDownlink(data);
  }     
  getUplink = (type = 'today') => {
    this.setState({uplink: []})
    let data = {}
    if (type === null) {
      data = {
        token: API_config.token
      }
    }else{
      data = {
        token: API_config.token,
        type: type
      }
    }
    this.props.getUplink(data);
  }     
  getModem = () => {
    let data = {
      token: API_config.token
    }
    this.props.getModem(data);
  }     
  getHeadline = () => {
    let data = {
      token: API_config.token
    }
    this.props.getHeadline(data);
  }
  updateRouter = (e) => {
    this.setState({router: e})
    switch (e) {
      case 'm1':
        this.updateRouter1();
        break;
      case 'm2':
        this.updateRouter2();
        break;
      case 'm3':
        this.updateRouter3();
        break;
    
      default:
        break;
    }
  }   
  
  handleDownlinkChart = {
    today: () => {
      this.setState({downlinkChart: 'today'});
      this.getDownlink('today')
    },
    yesterday: () => {
      this.setState({downlinkChart: 'yesterday'});
      this.getDownlink('yesterday')
    },
    week: () => {
      this.setState({downlinkChart: 'week'});
      this.getDownlink('week')
    },
  }
  handleUplinkChart = {
    today: () => {
      this.setState({uplinkChart: 'today'});
      this.getUplink('today')
    },
    yesterday: () => {
      this.setState({uplinkChart: 'yesterday'});
      this.getUplink('yesterday')
    },
    week: () => {
      this.setState({uplinkChart: 'week'});
      this.getUplink('week')
    },
  }

  dataDownlink = () => {
    if (this.state.downlinkChart === 'week') {
      return [
          {  x: this.state.downlink.length ? this.state.downlink[2].timestamp : 0, y: parseInt(this.state.downlink.length ? this.state.downlink[2].sqf ? this.state.downlink[2].sqf : 0 : 0), label: this.state.downlink.length ? this.state.downlink[2].sqf ? this.state.downlink[2].sqf : 0 : 0},
          {  x: this.state.downlink.length ? this.state.downlink[3].timestamp : 0, y: parseInt(this.state.downlink.length ? this.state.downlink[3].sqf ? this.state.downlink[3].sqf : 0 : 0), label: this.state.downlink.length ? this.state.downlink[3].sqf ? this.state.downlink[3].sqf : 0 : 0},
          {  x: this.state.downlink.length ? this.state.downlink[4].timestamp : 0, y: parseInt(this.state.downlink.length ? this.state.downlink[4].sqf ? this.state.downlink[4].sqf : 0 : 0), label: this.state.downlink.length ? this.state.downlink[4].sqf ? this.state.downlink[4].sqf : 0 : 0},
          {  x: this.state.downlink.length ? this.state.downlink[5].timestamp : 0, y: parseInt(this.state.downlink.length ? this.state.downlink[5].sqf ? this.state.downlink[5].sqf : 0 : 0), label: this.state.downlink.length ? this.state.downlink[5].sqf ? this.state.downlink[5].sqf : 0 : 0},
          {  x: this.state.downlink.length ? this.state.downlink[6].timestamp : 0, y: parseInt(this.state.downlink.length ? this.state.downlink[6].sqf ? this.state.downlink[6].sqf : 0 : 0), label: this.state.downlink.length ? this.state.downlink[6].sqf ? this.state.downlink[6].sqf : 0 : 0}
          ]
    } else {
      return [
        {  x: Unix_timestamp(this.state.downlink.length ? this.state.downlink[this.state.a].timestamp ? this.state.downlink[this.state.a].timestamp : 0 : 0), y: parseInt(this.state.downlink.length ? this.state.downlink[this.state.a].sqf ? this.state.downlink[this.state.a].sqf : 0 : 0), label: this.state.downlink.length ? this.state.downlink[this.state.a].sqf ? this.state.downlink[this.state.a].sqf : 0 : 0},
        {  x: Unix_timestamp(this.state.downlink.length ? this.state.downlink[this.state.b].timestamp ? this.state.downlink[this.state.b].timestamp : 0 : 0), y: parseInt(this.state.downlink.length ? this.state.downlink[this.state.b].sqf ? this.state.downlink[this.state.b].sqf : 0 : 0), label: this.state.downlink.length ? this.state.downlink[this.state.b].sqf ? this.state.downlink[this.state.b].sqf : 0 : 0},
        {  x: Unix_timestamp(this.state.downlink.length ? this.state.downlink[this.state.c].timestamp ? this.state.downlink[this.state.c].timestamp : 0 : 0), y: parseInt(this.state.downlink.length ? this.state.downlink[this.state.c].sqf ? this.state.downlink[this.state.c].sqf : 0 : 0), label: this.state.downlink.length ? this.state.downlink[this.state.c].sqf ? this.state.downlink[this.state.c].sqf : 0 : 0},
        {  x: Unix_timestamp(this.state.downlink.length ? this.state.downlink[this.state.d].timestamp ? this.state.downlink[this.state.d].timestamp : 0 : 0), y: parseInt(this.state.downlink.length ? this.state.downlink[this.state.d].sqf ? this.state.downlink[this.state.d].sqf : 0 : 0), label: this.state.downlink.length ? this.state.downlink[this.state.d].sqf ? this.state.downlink[this.state.d].sqf : 0 : 0},
        {  x: Unix_timestamp(this.state.downlink.length ? this.state.downlink[this.state.e].timestamp ? this.state.downlink[this.state.e].timestamp : 0 : 0), y: parseInt(this.state.downlink.length ? this.state.downlink[this.state.e].sqf ? this.state.downlink[this.state.e].sqf : 0 : 0), label: this.state.downlink.length ? this.state.downlink[this.state.e].sqf ? this.state.downlink[this.state.e].sqf : 0 : 0}
        ]
    }
  }
  dataUplink = () => {
    if (this.state.uplinkChart === 'week') {
      return [
        {  x: this.state.uplink.length ? this.state.uplink[2].timestamp  : 0, y: this.state.uplink.length ? this.state.uplink[2].power_atten : 0, label: this.state.uplink.length ? this.state.uplink[2].power_atten : 0},
        {  x: this.state.uplink.length ? this.state.uplink[3].timestamp  : 0, y: this.state.uplink.length ? this.state.uplink[3].power_atten : 0, label: this.state.uplink.length ? this.state.uplink[3].power_atten : 0},
        {  x: this.state.uplink.length ? this.state.uplink[4].timestamp  : 0, y: this.state.uplink.length ? this.state.uplink[4].power_atten : 0, label: this.state.uplink.length ? this.state.uplink[4].power_atten : 0},
        {  x: this.state.uplink.length ? this.state.uplink[5].timestamp  : 0, y: this.state.uplink.length ? this.state.uplink[5].power_atten : 0, label: this.state.uplink.length ? this.state.uplink[5].power_atten : 0},
        {  x: this.state.uplink.length ? this.state.uplink[6].timestamp  : 0, y: this.state.uplink.length ? this.state.uplink[6].power_atten : 0, label: this.state.uplink.length ? this.state.uplink[6].power_atten : 0}
        ]
    }
    return [
      {  x: Unix_timestamp(this.state.uplink.length ? this.state.uplink[this.state.a].timestamp ? this.state.uplink[this.state.a].timestamp : 0 : 0), y: this.state.uplink.length ? this.state.uplink[this.state.a].power_atten ? this.state.uplink[this.state.a].power_atten : 0 : 0, label: this.state.uplink.length ? this.state.uplink[this.state.a].power_atten ? this.state.uplink[this.state.a].power_atten : 0 : 0},
      {  x: Unix_timestamp(this.state.uplink.length ? this.state.uplink[this.state.b].timestamp ? this.state.uplink[this.state.b].timestamp : 0 : 0), y: this.state.uplink.length ? this.state.uplink[this.state.b].power_atten ? this.state.uplink[this.state.b].power_atten : 0 : 0, label: this.state.uplink.length ? this.state.uplink[this.state.b].power_atten ? this.state.uplink[this.state.b].power_atten : 0 : 0},
      {  x: Unix_timestamp(this.state.uplink.length ? this.state.uplink[this.state.c].timestamp ? this.state.uplink[this.state.c].timestamp : 0 : 0), y: this.state.uplink.length ? this.state.uplink[this.state.c].power_atten ? this.state.uplink[this.state.c].power_atten : 0 : 0, label: this.state.uplink.length ? this.state.uplink[this.state.c].power_atten ? this.state.uplink[this.state.c].power_atten : 0 : 0},
      {  x: Unix_timestamp(this.state.uplink.length ? this.state.uplink[this.state.d].timestamp ? this.state.uplink[this.state.d].timestamp : 0 : 0), y: this.state.uplink.length ? this.state.uplink[this.state.d].power_atten ? this.state.uplink[this.state.d].power_atten : 0 : 0, label: this.state.uplink.length ? this.state.uplink[this.state.d].power_atten ? this.state.uplink[this.state.d].power_atten : 0 : 0},
      {  x: Unix_timestamp(this.state.uplink.length ? this.state.uplink[this.state.e].timestamp ? this.state.uplink[this.state.e].timestamp : 0 : 0), y: this.state.uplink.length ? this.state.uplink[this.state.e].power_atten ? this.state.uplink[this.state.e].power_atten : 0 : 0, label: this.state.uplink.length ? this.state.uplink[this.state.e].power_atten ? this.state.uplink[this.state.e].power_atten : 0 : 0}
      ]
  }
  render() {
      if(this.state.isLoading1 || this.state.isLoading2 || this.state.isLoading3){
        return <View><Text>Loading...</Text></View>
      }

    return (
      <SafeAreaView style={styles.overview}>
        <ScrollView contentContainerStyle={{ paddingVertical: 25 }}>
          <View style = {styles.inputBox}>
                <Picker
                    selectedValue={this.state.router}
                    style={styles.picker}
                    mode='dropdown'
                    onValueChange={this.updateRouter}
                >
                    <Picker.Item label="Modem 1" value="m1" />
                    <Picker.Item label="Modem 2" value="m2" />
                    <Picker.Item label="Modem 3" value="m3" />
                </Picker>
          </View>

          <Block row style={[styles.margin, { marginTop: 18 }]}>
            <Card middle style={{ marginRight: 7 }}>
              <Icon sqf />
              {
                this.state.downlinkChart === 'week'
                ?
                <Text h2 style={{ marginTop: 17 }}>{this.state.downlink.length ? this.state.downlink[6].sqf : 0}</Text>
                :
                <Text h2 style={{ marginTop: 17 }}>{this.state.downlink.length ? this.state.downlink[this.state.e].sqf : 0}</Text>
              }
              <Text paragraph color="gray">LATEST SQF</Text>
              {
                this.state.downlinkChart === 'week'
                ?
                <Text paragraph color="blue">{Nowdate(this.state.downlink.length ? this.state.downlink[6].timestamp : 0)}</Text>
                :
                <Text paragraph color="blue">{Nowdate(this.state.downlink.length ? this.state.downlink[this.state.e].timestamp : 0)}</Text>
              }
            </Card>
            
            <Card middle style={{ marginLeft: 7 }}>
              <Icon attenuation />
              {
                this.state.uplinkChart === 'week'
                ?
                <React.Fragment>
                  <Text h2 style={{ marginTop: 17 }}>{this.state.uplink.length ? this.state.uplink[6].power_atten : 0}</Text>
                  <Text paragraph color="gray">LATEST ATTENUATION</Text>
                  <Text paragraph color="blue">{Nowdate(this.state.uplink.length ? this.state.uplink[6].timestamp : 0)}</Text>
                </React.Fragment>
                :
                <React.Fragment>
                  <Text h2 style={{ marginTop: 17 }}>{this.state.uplink.length ? this.state.uplink[this.state.e].power_atten : 0}</Text>
                  <Text paragraph color="gray">LATEST ATTENUATION</Text>
                  <Text paragraph color="blue">{Nowdate(this.state.uplink.length ? this.state.uplink[this.state.e].timestamp : 0)}</Text>
                </React.Fragment>
              }
            </Card>
          </Block>

          <Block row style={[styles.margin, { marginTop: 18 }]}>
            <Card middle style={{ marginRight: 7 }}>
              <Icon time />
              <Text h2 style={{ marginTop: 17 }}>{this.state.modem[this.state.e].uptime}</Text>
              <Text paragraph color="gray">UPTIME</Text>
              <Text paragraph color="blue">{Nowdate(this.state.modem[this.state.e].timestamp)}</Text>
            </Card>
            
            <Card middle style={{ marginLeft: 7 }}>
              <Icon memory />
              <Text h2 style={{ marginTop: 17 }}>{this.state.modem[this.state.e].memory}</Text>
              <Text paragraph color="gray">AVAILABLE MEMORY</Text>
              {
                this.state.downlinkChart === 'week'
                ?
                <Text paragraph color="blue">{Nowdate(this.state.downlink.length ? this.state.downlink[6].timestamp : 0)}</Text>
                :
                <Text paragraph color="blue">{Nowdate(this.state.downlink.length ? this.state.downlink[this.state.e].timestamp : 0)}</Text>
              }
            </Card>
          </Block>
              
          <Card
            title="SQF CHART"
            style={[styles.margin, { marginTop: 18 }]}>
            <Block row right>
              <Block flex={2} row center right>
                {
                  this.state.downlinkChart === 'week'
                  ?
                  <Text paragraph color="blue">{Nowdate(new Date() / 1000)}</Text>
                  :
                  <Text paragraph color="blue">{Nowdate(this.state.downlink.length ? this.state.downlink[this.state.e].timestamp : new Date() / 1000)}</Text>
                }
              </Block>
            </Block>
            <Block>
              <Text>Chart</Text>
               <VictoryChart width={300} minDomain={{ y: 100 }} maxDomain={{ y: 170 }} theme={VictoryTheme.material} domainPadding={15}>
                
                <VictoryLine

                    style={{
                      parent: { border: "3px solid #ccc"},
                      stroke: "#073060",
                      strokeWidth: 15
                    }}
                    data={this.dataDownlink()}
                      > 
                </VictoryLine>
              </VictoryChart>
            </Block>
            <View style={styles.filterTime}>
              <TouchableOpacity
              onPress={() => this.handleDownlinkChart.today()}
              style={[styles.filterTimeButton, {backgroundColor: this.state.downlinkChart === 'today' ? theme.colors.blue : '#6c757d'}]}>
                <Text style={styles.filterTimeText}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => this.handleDownlinkChart.yesterday()}
              style={[styles.filterTimeButton, {backgroundColor: this.state.downlinkChart === 'yesterday' ? theme.colors.blue : '#6c757d'}]}>
                <Text style={styles.filterTimeText}>Yesterday</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => this.handleDownlinkChart.week()}
              style={[styles.filterTimeButton, {backgroundColor: this.state.downlinkChart === 'week' ? theme.colors.blue : '#6c757d'}]}>
                <Text style={styles.filterTimeText}>Week</Text>
              </TouchableOpacity>
            </View>
          </Card>
          <Card
            title="ATTENUATION CHART"
            style={[styles.margin, { marginTop: 18 }]}>
            <Block row right>
              <Block flex={2} row center right>
                {
                  this.state.downlinkChart === 'week'
                  ?
                  <Text paragraph color="blue">{Nowdate(new Date() / 1000)}</Text>
                  :
                  <Text paragraph color="blue">{Nowdate(this.state.downlink.length ? this.state.downlink[this.state.e].timestamp : new Date() / 1000)}</Text>
                }
              </Block>
              </Block>
            <Block>
              <Text>Chart</Text>
              <VictoryChart width={300} maxDomain={{ y: 5 }} theme={VictoryTheme.material} domainPadding={15}>
                
                <VictoryLine

                    style={{
                      parent: { border: "3px solid #ccc"},
                      stroke: "#073060",
                      strokeWidth: 15
                    }}
                    data={this.dataUplink()}
                      > 
                </VictoryLine>
              </VictoryChart>
            </Block>
            <View style={styles.filterTime}>
              <TouchableOpacity
              onPress={() => this.handleUplinkChart.today()}
              style={[styles.filterTimeButton, {backgroundColor: this.state.uplinkChart === 'today' ? theme.colors.blue : '#6c757d'}]}>
                <Text style={styles.filterTimeText}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => this.handleUplinkChart.yesterday()}
              style={[styles.filterTimeButton, {backgroundColor: this.state.uplinkChart === 'yesterday' ? theme.colors.blue : '#6c757d'}]}>
                <Text style={styles.filterTimeText}>Yesterday</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => this.handleUplinkChart.week()}
              style={[styles.filterTimeButton, {backgroundColor: this.state.uplinkChart === 'week' ? theme.colors.blue : '#6c757d'}]}>
                <Text style={styles.filterTimeText}>Week</Text>
              </TouchableOpacity>
            </View>
          </Card>


        </ScrollView>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state) {
  return {
      user: state.getAsyncStorage.data,
      downlink: state.downlink.data,
      uplink: state.uplink.data,
      modem: state.modem.data,
      headline: state.headline.data,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getAsyncStorage, getDownlink, getUplink, getModem, getHeadline }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);