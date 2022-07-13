import React, { useEffect, useState } from 'react';
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
    const [showCategory, setCategory] = useState([]);
    const [subMenu, setSubMenu] = useState(false);
    let subValue = mainData.categhory;
    const submenu = (data) => {
        for (let i = 0; i < subValue.length; i++) {
            if (data === subValue[i].pageLink) {
                let savedata = subValue[i].subCategory;
                setCategory(savedata);
                setSubMenu(true);
                savedata.push(obj);
                console.log(savedata);
                

            }
        }
    }
    
window.localStorage.setItem("Category", JSON.stringify(subValue));
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
                    <option value="1">{data.name}</option>)}
            </select> : null}
            {showCategory.map(data =>
                <button type='submit' className='btn btn-info' onClick={() => submenu(data.pageLink)}>Submit data</button>)}
            
        </div>
    )
}

export default AddService