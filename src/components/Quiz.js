import React, { useEffect, useState } from "react";
import styled from "styled-components";
function Quiz() {
    // const response = await fetch("./question.json");
    // const jsonData = await response.json();
    const [QuizData, setQuizData] = useState([]);
    const [EnKr, setleng] = useState(true);
    const Exambox = styled.div`
                    width: 100px; 
                    height: 100px; 
                    border: 1px solid;
                
                `;
    useEffect(() => {
        const getData = async () => {
        //   try {
            const response = await fetch("./question.json");
            const result = await response.json();
            // console.log(result);
            // if (result.response && result.response.length > 0) {
                console.log(result)
                if(EnKr === true && result.kr && result.kr.length >0){
                    setQuizData(result.kr);
                }else if(EnKr === false && result.en && result.en.length >0){
                    setQuizData(result.en);
                }
            // }
        //   } catch (error) {
        //     console.error(error);
        //   }
        };
        getData();
      }, [EnKr]);
      
    //   const step1 =QuizData[0].step1[0]
    // const
    // console.log(QuizData[0].step1[0].length)
    let i =0;
    function Clickstep(el){
        el.preventDefault();
        const steps =document.querySelectorAll(".stepbox h2")
        const choose = document.querySelector(".choose")
        const exams = document.querySelectorAll(".exambox")
        steps.forEach(element => {
            element.classList.remove("act")
        });
        
        el.target.classList.add("act")
        if(i === 0){
            choose.classList.add("zero")
            choose.classList.remove("one")
            choose.classList.remove("two")
            i ++
        }else if(i===1){
            choose.classList.remove("zero")
            choose.classList.add("one")
            choose.classList.remove("two")
            i ++
        }else if(i===2){
            choose.classList.remove("zero")
            choose.classList.remove("one")
            choose.classList.add("two")
            i =0
        }
        const act = document.querySelector(".act")
        console.log(act);
        if(act.innerText === "Step 1"){
            exams[0].classList.add("opa")
            exams[1].classList.remove("opa")
            exams[2].classList.remove("opa")
        }else if(act.innerText ==="Step 2"){
            exams[0].classList.remove("opa")
            exams[1].classList.add("opa")
            exams[2].classList.remove("opa")
        }else if(act.innerText ==="Step 3"){
            exams[0].classList.remove("opa")
            exams[1].classList.remove("opa")
            exams[2].classList.add("opa")
        }
        
    }
    if(QuizData.length >0){
    return (
        <>
            <div className="examcontainer">
                <div className="choose zero">
                    <div className="stepbox">
                        <div className="step1"><label for="input1"><h2 className="act"  onClick={Clickstep}>Step 1</h2></label></div>
                        <p>선수 이름 맞추기</p>
                    </div>
                    <div className="stepbox">
                        <div className="step2"><label for="input2"><h2 onClick={Clickstep}>Step 2</h2></label></div>
                        <p>소속 팀 보고 선수 맞추기</p>
                    </div>
                    <div className="stepbox">
                        <div className="step3"><label for="input3"><h2 onClick={Clickstep}>Step 3</h2></label></div>
                        <p>스쿼드 보고 팀 이름 맞추기</p>
                    </div>
                </div>
                <input type="radio" name="boxinput" id="input1" hidden checked></input>
                <input type="radio" name="boxinput" id="input2" hidden></input>
                <input type="radio" name="boxinput" id="input3" hidden></input>
                <div className="exambox opa" >
                    {QuizData[0].step1[0].map(element => {
                      console.log(element.title);
                      return(
                        <div>{element.title}</div>
                        )
                    })}
                </div>
                <div className="exambox " >
                    {QuizData[1].step2[0].map(element => {
                      console.log(element.title);
                      return(
                        <div>{element.title}</div>
                        )
                    })}
                </div>
                <div className="exambox " >
                    {QuizData[2].step3[0].map(element => {
                      console.log(element.title);
                      return(
                        <div>{element.title}</div>
                        )
                    })}
                </div>
            </div>
        </>
    );
    }
  }
  
  export default Quiz;