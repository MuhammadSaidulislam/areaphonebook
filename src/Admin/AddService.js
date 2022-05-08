import React, { useEffect, useState } from 'react';
import mainData from '../jsonData/Categhory.json';
 // import subData from '../jsonData/SubCateghory.json';

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

 //   window.localStorage.setItem("Category", JSON.stringify(mainData));
 //   window.localStorage.setItem("SubCategory", JSON.stringify(subData));
    let Category = window.localStorage.getItem("Category");
    let subCat = window.localStorage.getItem("SubCategory");
  let suv=JSON.parse(subCat)
console.log('json',suv.subCateghory);

    const [showCategory, setCategory] = useState([]);
    const [subMenu, setSubMenu] = useState(false);
    let subValue = mainData.categhory;
    const submenu = (data) => {
        for (let i = 0; i < subValue.length; i++) {
            // console.log('main data',data);
             
            if (data === subValue[i].pageLink) {
                let savedata = subValue[i].subCategory;
                setCategory(savedata);
               // console.log('previous', savedata);
                setSubMenu(true);
              //  console.log('next', savedata);
            }
        }
    }
    const secondData=(value)=>{
     //   console.log('main',value);
     //   console.log(subData.subCateghory);
        for (let i = 0; i < suv.subCateghory.length; i++) {
            // console.log('main data',data);
            //  console.log(subData[i]);
             if (value === suv.subCateghory[i].link) {
              //  console.log(subData.subCateghory[i].details);
                 let savedata = suv.subCateghory[i].details;
            //     setCategory(savedata);
            //    console.log('previous', savedata);
            //     setSubMenu(true);
            savedata.push(obj);

                 console.log('next', savedata);
             }
        }
    }
    const pushData = () => {
        console.log('submit');
        window.localStorage.setItem("SubCategory", JSON.stringify(suv));
    }

   
    // const newData=()=>{
    //     for (let i = 0; i < subValue.length; i++) {
    //         if (data === subValue[i].pageLink) {
    //             let savedata = subValue[i].subCategory;
    //             savedata.push(obj)
    //         }
    //     }
    // }
    return (
        <div>
            <select className="form-select" aria-label="Default select example">
                <option defaultValue>Open this select menu</option>
                {subValue.map(data =>
                    <option value="1" onClick={() => submenu(data.pageLink)}>{data.name}</option>)}
            </select>
            {subMenu ? <select className="form-select" aria-label="Default select example">
                <option defaultValue>Open this select menu</option>
                {showCategory.map(data =>
                    <option value="1" onClick={() => secondData(data.link)}>{data.name}</option>)}
            </select> : null}

            <button type='submit' className='btn btn-info' onClick={() => pushData()}>Submit data</button>

        </div>
    )
}

export default AddService