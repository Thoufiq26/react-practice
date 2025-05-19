import React, { useState } from 'react'

function BMI() {
    const [weight,setweight]=useState(0)
    const [height,setHeight]=useState(0)
    const[BMI,setBMI]=useState(0)
    const [status,setStatus]=useState("None")
    console.log(weight,height)

    function calculate(){
        let value=weight/(height**2)*10000
        setBMI(value);
        if(BMI>40){
            setStatus("Obese Class III")
        }
        else if(BMI>=35 && BMI<40){
            setStatus("Obese Class II")
        }
        else if(BMI>=30 && BMI<35){
            setStatus("Obese Class I")
        }
        else if(BMI>=25 && BMI<30){
            setStatus("Over Weight")
        }
        else if(BMI>=18.25 && BMI<20){
            setStatus("Normal")
        }  else if(BMI>=17 && BMI<18.5){
            setStatus("Mild Thinness")
        }
        else{
            setStatus("Severe Thinness")
        }
        
        
        

        console.log(BMI)

    }
  return (
    <div className='bmi'>
        <h1>BMI Calculator</h1>
        {/* <div className="gender">
            <div className="female">
                <div className="icon">
                <i class="fa-solid fa-person-dress">
                    <div>Female</div>
                </i>
                </div>
               
            </div>
            <div className="male">
                <div className="icon">
                <i class="fa-solid fa-person">
                <div>Male</div>
                </i>
                
                </div>
            </div>
        </div> */}
        <div className="con">
        <div className="user-details">
            <div className="user weight">
                <p>Enter Your Weight in KG</p>
                <input type="text" name="weight" id="weight" onChange={(e)=>setweight(e.target.value)} />
                <p>Enter Your Height in Meters</p>
                <input type="text" name="height" id="height" onChange={(e)=>setHeight(e.target.value)}/>
            </div>
          
           
           
        </div>
        <div className="result-btn">
                <button onClick={calculate}>Calculate BMI</button>
                <div>
                <div className='dis'> Your BMI :{BMI}</div> 
                <div>Condition : {status}</div> 
                </div>
                 

            </div>
           
    </div>
    </div>
  )
}

export default BMI