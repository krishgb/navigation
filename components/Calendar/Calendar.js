import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useUsers} from '../../UserContext'
//  import email from 'react-native-email';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const Cal = ({route}) => {
  const {setSchedule} = useUsers()
  const [email, setEmail] = useState()

  const D = new Date();
  const [selectedDate, setSelectedDate] = useState({
    dateString: D.toISOString().split('T')[0],
    day: D.getDate(),
    month: D.getMonth(),
  });
  const [events, setEvents] = useState({});
  const [newEve, setNewEve] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  //  const [hours, setHours] = useState(0)
  //  const [mins, setMins] = useState(0)

  useEffect(() => {
    const {email, schedules} = route.params
    setEmail(email)
    if(schedules) {
      setEvents(schedules)
      const marks = {}
      for(let i of Object.keys(schedules)){
        marks[i] = {selected: true, selectedColor: 'blue'}
      }
      setMarkedDates({...markedDates, ...marks})
    } 
  }, [])

  const dateChange = e => {
    setSelectedDate(e);
  };

  const setNewEvent = () => {
    const old = events[selectedDate.dateString] || [];
    const d = new Date();
    const is_pm = d.getHours() > 12;
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const n_event = {
      ...selectedDate,
    };
    n_event.str = `${MONTHS[month]} ${day}, ${
      is_pm ? d.getHours() - 12 : d.getHours()
    }:${d.getMinutes()} ${is_pm ? 'pm' : 'am'}`;
    n_event.event = newEve;
    old.push(n_event);
    setEvents({...events, [selectedDate.dateString]: old});
    setSchedule(email,{...events, [selectedDate.dateString]: old});
    setNewEve('');
    setMarkedDates({
      ...markedDates,
      [selectedDate.dateString]: {selected: true, selectedColor: 'blue'},
    });
    //    email("harr1ypotter1000@gmail.com", {
    //      subject: "New Event",
    //      body: `Event Remainder - ${n_event.event}`,
    //      checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
    //  }).catch(console.error)
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        onDayPress={dateChange}
        current={selectedDate.dateString}
        enableSwipeMonths={true}
        hideExtraDays={true}
        marking={true}
        markingType={'multi-dot'}
        markedDates={{
          [selectedDate.dateString]: {selected: true, selectedColor: '#70d7c7'},
          ...markedDates,
        }}
      />
      <View style={styles.line} />
      <Text style={styles.events}>Events</Text>

      <ScrollView contentContainerStyle={styles.eventsScroll}>
        {events?.[selectedDate.dateString] ? (
          [...events[selectedDate.dateString]].map((eve, i) => {
            return (
              <Text key={i} style={styles.no}>
                {eve.event}
              </Text>
            );
          })
        ) : (
          <Text style={styles.no_eve}>No events </Text>
        )}
      </ScrollView>

      <View style={styles.addEventView}>
        <TextInput
          placeholder="Add a new one"
          value={newEve}
          onChange={e => setNewEve(e.nativeEvent.text)}
          style={styles.txtInp}
        />

        <Pressable onPress={setNewEvent}>
          <Text style={styles.addBtn}>Add</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  eveShow: {
    flexDirection: 'row',
  },
  no: {
    color: 'black',
    fontSize: 18,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: 'lightgreen',
    margin: 10,
    width: '95%',
  },
  not: {
    color: 'white',
    fontSize: 18,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: 'red',
    margin: 10,
    width: '50%',
  },
  no_eve: {
    fontSize: 18,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: 'orangered',
    margin: 10,
  },
  eventsScroll: {
    margin: 'auto',
  },
  events: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  txtInp: {
    color: 'white',
    width: '87%',
    backgroundColor: '#333',
    fontSize: 15,
    padding: 4,
  },
  addBtn: {
    color: 'black',
    backgroundColor: '#ccc',
    padding: 8,
    borderRadius: 2,
    paddingHorizontal: 12,
    width: '100%',
    fontWeight: 'bold',
    fontSize: 15,
  },
  addEventView: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    backgroundColor: 'black',
    borderWidth: 0.2,
  },
  time: {
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'black',
    padding: 0,
  },
  timeView: {
    backgroundColor: '#ccc',
    padding: 0,
    border: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '17%',
  },
});
