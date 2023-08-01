import React, { useEffect, useState } from "react";
import styled from "styled-components";
function Quiz() {
  // const response = await fetch("./question.json");
  // const jsonData = await response.json();
  const [QuizData, setQuizData] = useState([]);
  const [EnKr, setleng] = useState(true);
  const Exambox = styled.div`
    width: 300px;
    height: 300px;
    border: 1px solid;
  `;
  useEffect(() => {
    const getData = async () => {
      //   try {
      const response = await fetch("./question.json");
      const result = await response.json();
      // console.log(result);
      // if (result.response && result.response.length > 0) {
      // console.log(result)
      if (EnKr === true && result.kr && result.kr.length > 0) {
        setQuizData(result.kr);
      } else if (EnKr === false && result.en && result.en.length > 0) {
        setQuizData(result.en);
      }
      // }
      //   } catch (error) {
      //     console.error(error);
      //   }
    };
    getData();
  }, [EnKr]);
  console.log(QuizData[0].step1[0]);
  //   const step1 =QuizData[0].step1[0]
  // const
  // console.log(QuizData[0].step1[0].length)
  if (QuizData[0].step1[0] && QuizData[0].step1[0].length > 0) {
    return (
      <>
        <div className="examcontainer">
          <div className="choose">
            <button className="step1">step1</button>
            <button className="step2">step2</button>
            <button className="step3">step3</button>
          </div>
          <div className="exambox">
            {QuizData[0].step1[0].forEach((element) => {
              console.log(element);
            })}
          </div>
          <div className="exambox"></div>
          <div className="exambox"></div>
        </div>
      </>
    );
  }
}

export default Quiz;
