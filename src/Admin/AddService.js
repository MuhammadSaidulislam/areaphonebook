import React, { useState } from 'react';
import mainData from '../jsonData/Categhory.json';
import subData from '../jsonData/SubCateghory.json';

const obj = {
    "photo": "./photo.png",
    "name": "মায়ের দোয়া রেফ্রিজারেশন এন্ড ওয়ার্কশপ",
    "number": "01994956071",
    "wordNo": "৪",
    "location": "দেলপাড়া বাজার সংলগ্ন",
    "detail": "এসি, ফ্রিজ, মাইক্রোওভেন, ওয়াশিং মেশিন সার্ভিসিং করা হয়।",
    "postLink": "http://fb.com/areaPhonebook",
    "videoLink": "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fyiralcrazy%2Fvideos%2F614052535735551%2F&width=500&show_text=false&height=280&appId"
}

const AddService = () => {
    const [showCategory, setCategory] = useState();
    // let categhoryArray = subCategory.subCateghory[1].details;
    // categhoryArray.push(obj);
    // console.log('array', categhoryArray);
    // console.log('id: ',userdata.subCateghory);
    let subValue = mainData.categhory;
  //  console.log(subValue[0]);
   // console.log(subValue.length);
        for (let i = 0; i < subValue.length; i++) {
            // let valueSet=subValue[i].id
            // setCategory(valueSet)
            console.log('array',subValue[i].id);
           // setCategory(subValue[i].id)
        }
      // console.log(showCategory);
    return (
        <div>
           
            <select className="form-select" aria-label="Default select example">
           <option defaultValue>Open this select menu</option>
           {subValue.map(data =>
           <option value="1">{data.name}</option>)}
       </select>
        
       
        </div>
    )
}

export default AddService