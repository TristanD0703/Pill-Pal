import React, { ChangeEvent, useState }  from 'react';
import './DrugForm.css'; // Assuming your CSS file is renamed to DrugForm.css
import PillHeart from './HomePageIcons/PillHeart.png'
import { addDrugToUser } from './Database';
import { getAuth} from 'firebase/auth';
const DrugForm = () => {


 // State variables to store form data
 const [name, setName] = useState('');
 const [daysToTake, setDaysToTake] = useState({
  sunday: false,
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
 });
 const [timeToTake, setTimeToTake] = useState('');
 const [stopDate, setStopDate] = useState('');
 const [dosage, setDosage] = useState('');
 const [dosageUnit, setDosageUnit] = useState('');
 

 // Function to handle form submission
 const handleSubmit = async (event) => {
     event.preventDefault(); // Prevents the default form submission behavior
     
     // Call the addDrugToUser function with form data
     try {
         await addDrugToUser(
             getAuth().currentUser?.uid,
             name,
             daysToTake,
             timeToTake,
             stopDate,
             dosage,
             dosageUnit
         );

         // Clear the form after successful submission
         clearForm();
     } catch (err) {
         console.log(err); // Log any errors
     }
 };

 // Function to clear form fields
 const clearForm = () => {
     setName('');
     setDaysToTake({
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
     });
     setTimeToTake('');
     setStopDate('');
     setDosage('');
     setDosageUnit('');
 };


 return (
   <div className="form-page absolute">


     <form className="form" id="addDrugForm" onSubmit={handleSubmit}>
     <div className="Name-Quantity">


     <label className="form-labels" htmlFor="drugname">Name</label>
         <label className="form-labels" htmlFor="Quantity">Quantity</label>
         <label  className="form-labels" htmlFor="Quantity">Units</label>


         <input className="name-text-box" type="text" id="drugName" name="drugName" onChange={(e) => setName(e.target.value)}/>


         <input style={{width: "45px" }}     className="Quantity" type="number" id="Quantity"  placeholder="00"  maxLength={2} name="Quantity" />
         <select className="dropdown2" id="item1" required onChange={(e) => setDosageUnit(e.target.value)}>
           <option value="Ounces">Oz.</option>
           <option value="Miligrams">Mg</option>
           <option value="Liter">L</option>
         </select >
   </div>
   <br/>
   <label style={{margin: "10px"}} id="Routine">Routine</label>
      
       <div className="checkbox-container">
           <div className="checkbox-contents">
             <input id="Sunday-check" className="checkmark" type="checkbox" checked={daysToTake.sunday === true} onChange={(event: ChangeEvent) => setDaysToTake({...daysToTake, sunday: !daysToTake.sunday})}/>
             <label>Su</label>
           </div>


           <div className="checkbox-contents">
             <input id="Monday-check" className="checkmark" type="checkbox" checked={daysToTake.monday === true} onChange={(event: ChangeEvent) => setDaysToTake({...daysToTake, monday: !daysToTake.monday})}/>
             <label>M</label>
           </div>




           <div className="checkbox-contents">
             <input id="Tuesday-check" className="checkmark" type="checkbox" checked={daysToTake.tuesday === true} onChange={(event: ChangeEvent) => setDaysToTake({...daysToTake, tuesday: !daysToTake.tuesday})}/>
             <label>Tu</label>
           </div>


           <div className="checkbox-contents">
             <input id="Wednesday-check" className="checkmark" type="checkbox" checked={daysToTake.wednesday === true} onChange={(event: ChangeEvent) => setDaysToTake({...daysToTake, wednesday: !daysToTake.wednesday})}/>
             <label>W</label>
           </div>




           <div className="checkbox-contents">
             <input id="Thursday-check" className="checkmark" type="checkbox" checked={daysToTake.thursday === true} onChange={(event: ChangeEvent) => setDaysToTake({...daysToTake, thursday: !daysToTake.thursday})}/>
             <label>Th</label>
           </div>




           <div className="checkbox-contents">
             <input id="Friday-check" className="checkmark" type="checkbox" checked={daysToTake.friday === true} onChange={(event: ChangeEvent) => setDaysToTake({...daysToTake, friday: !daysToTake.friday})}/>
             <label>F</label>
           </div>




           <div className="checkbox-contents">
             <input id="Saturday-check" className="checkmark" type="checkbox" checked={daysToTake.saturday === true} onChange={(event: ChangeEvent) => setDaysToTake({...daysToTake, saturday: !daysToTake.saturday})}/>
             <label>Sa</label>
           </div>


       </div>
       <br/>


      
       <label style={{margin: "10px"}} id="Time" htmlFor="Time">Time Taken</label>
      
      
         <div className="clock-input" id="clock">
         
           <input style={{width: "75px" }} type="text" id="timeInput" placeholder="00:00"  maxLength={5} required onChange={(e) => setTimeToTake(e.target.value)}/>
           <p>:</p>
          
           <select className="dropdown" id="item1" required>
             <option value="Morning">A.M</option>
             <option value="Night">P.M</option>
           </select>


         </div>


         <div className="Duration-container">
           <label className="form-labels" htmlFor="Duration">Duration</label>
           <input className="Duration-input"type="number" id="Duration" name="Quantity" placeholder="Total Days" onChange={(e) => setTimeToTake(e.target.value)}/>
         </div>
        
      


       <button type="submit" onChange ={handleSubmit}>
         Submit
       </button>


     </form>
     <img className="Pillmascot" src= {PillHeart} alt="Pill Mascot" />


   </div>
 );
};
export default DrugForm;

