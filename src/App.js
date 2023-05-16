
import { useEffect } from 'react';
import React, { useState } from 'react';
import './App.css';
import styled from "styled-components";

function App() {
  const Lodingbar = styled.div`
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 30px;
  transform: translate(-50%, -50%);
`;
  const [footballData, setFootballData] = useState([]);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    const getData = async() => {
      setLoading(true);
      //한국: 17, 토트넘 : 47
      const url = 'https://api-football-v1.p.rapidapi.com/v3/players/squads?team=50';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      };
  
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
        if(result.response && result.response.length > 0) {
          setFootballData(result)
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData();  
  }, []);
  

  
  // if (loading) {
  //   return <Lodingbar>로딩 중입니다...</Lodingbar>;
  // } 
if(footballData.response && footballData.response.length > 0){
  const sortedData = footballData.response[0].players.sort((a,b) => a.number - b.number)
  return (
      <div className="App">
        <img src={footballData.response[0].team.logo} className='App-logo'></img>
        {
          sortedData.map(item => {
            console.log(footballData.response)
            return (
              <div>
                <a href={`https://www.google.com/search?q=${item.name}&aqs=chrome.0.69i59.3534j0j7&sourceid=chrome&ie=UTF-8`} target='blank'><img src={item.photo}></img></a>
                <div>{item.name}  no.{item.number}</div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
