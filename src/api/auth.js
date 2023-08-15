import { API } from "../config";
const axios = require("axios");
// signup
export const registerUser = async (mobile, password) => {
  try {
    const response = await axios.post(`${API}/userCreate`, {
      mobile: mobile,
      password: password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// login
export const loginUser = async (mobile, password) => {
  try {
    const response = await axios.post(`${API}/login`, {
      mobile: mobile,
      password: password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// mobile otp
export const mobileOtp = async (mobile, otp) => {
  const url = "https://api.sms.net.bd/sendsms";

  const data = new FormData();
  data.append("api_key", "QRa72z0YlJt58U7gxw7WgAXNdyYw0PpeCTrsnT0l");
  data.append("msg", `Your verification code is ${otp} "Area phonebook"`);
  data.append("to", mobile);

  axios
    .post(url, data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
// category add
export const categoryAdd = async (body={}) => {
  try {
      const response = await axios.post(`${API}/category`, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
};
// category delete
export const deleteCategory = async (category_name) => {
  try {
    const response = await axios.delete(`${API}/categoryDelete/${category_name}`);
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};
// category delete
export const deleteSubCategory = async (subcategory_name) => {
  try {
    const response = await axios.delete(`${API}/subcategoryDelete/${subcategory_name}`);
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};
// category delete
export const deleteTags = async (filter_id,tag_name) => {
  console.log(filter_id,tag_name);
  try {
    const response = await axios.delete(`${API}/filterTagDelete/${filter_id}/${tag_name}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// category list
export const categoryList = async () => {
  try {
    const response = await axios.get(`${API}/categoryList`);
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};
// sub category add
export const subCategoryAdd = async (body={}) => {
  try {
    const response = await axios.post(`${API}/subcategory`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// sub category list
export const subCategoryList = async (category_name) => {
  try {
    const response = await axios.post(`${API}/subcategorylist`, {
      category_name: category_name,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// sub category list
export const allSubCategoryList = async () => {
  try {
    const response = await axios.get(`${API}/allSubcategoryList`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// shop create
export const shopCreate = async (body={}) => {
  try {
    const response = await axios.post(`${API}/create`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// sub category shop list
export const subCategoryShopList = async (subcategory_name) => {
  try {
    const response = await axios.post(`${API}/AllShopList`, {
      subcategory_name: subcategory_name,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// admin login
export const loginAdmin = async (name, password) => {
  try {
    const response = await axios.post(`${API}/admin`, {
      name: name,
      password: password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// admin login
export const userInfo = async (userMobile) => {
  try {
    const response = await axios.post(`${API}/userDashboard`, {
      userMobile: userMobile,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// pending shop create
export const pendingShopList = async (body={}) => {
  try {
    const response = await axios.post(`${API}/pendingShop`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// category list
export const pendingList = async () => {
  try {
    const response = await axios.get(`${API}/pending`);
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};
// pending shop delete
export const pendingDel = async (shopId) => {
  try {
    const response = await axios.delete(`${API}/pendingDelete/${shopId}`);
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};
// shop details
export const shopDetails = async (shopId) => {
  try {
    const response = await axios.post(`${API}/singleShopShow/${shopId}`);
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};
export const numberCheck = async (mobile) => {
  try {
    const response = await axios.post(`${API}/mobileCheck`, {
      mobileNumber: mobile,
    });
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};
// post list
export const userPost = async (mobile) => {
  try {
    const response = await axios.post(`${API}/allPost`, {
      userMobile: mobile,
    });
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};
// report add
export const reportApi = async (reportName,reportComplain) => {
  try {
    const response = await axios.post(`${API}/addReport`, {
      name: reportName,
      complain: reportComplain,
    });
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};
// report list
export const reportList = async () => {
  try {
    const response = await axios.get(`${API}/allReport`);
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};
// all shop list
export const allShopList = async () => {
  try {
    const response = await axios.get(`${API}/showAll`);
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};
// delete shop
export const shopDelete = async (shopId) => {
  try {
    const response = await axios.delete(`${API}/shopDelete/${shopId}`);
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};
// shop and post update
export const shopUpdate = async (body={},shopId) => {

  try {
    const response = await axios.put(`${API}/update/${shopId}`, body );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const logout = async () => {
  localStorage.removeItem("areaphonebook");
};

export const payment=async ()=>{
  try {
    const config = {
      headers: {
        'accept': 'application/json',
        'RT-UDDOKTAPAY-API-KEY': '5588e865c2a8c3cc109ecfe2e4b70f680ad7fa30',
        'content-type': 'application/json'
      },
      withCredentials: true
    };

    const body = {
      full_name: "paymentInfo.name",
      email: "abc@gmail.com",
      amount: "100",
      metadata: { user_id: "11", order_id: "22" },
      redirect_url: 'https://online-seba.xyz/success',
      cancel_url: 'https://online-seba.xyz/cancel',
      webhook_url: 'https://online-seba.xyz/ipn'
    };

    const response = await axios.post('https://pay.online-seba.xyz/api/checkout', body, config);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// filter tags add
export const filterFormAdd = async (body={}) => {
  try {
    const response = await axios.post(`${API}/filterAdd`,body);
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};
// filter list
export const filterList= async (categoryTitle,suCategoryTitle) => {
  try {
    const response = await axios.post(`${API}/filterList`,{
      category_name: categoryTitle,
      sub_category_name: suCategoryTitle
    });
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};

// sub category list
export const allFilter = async () => {
  try {
    const response = await axios.get(`${API}/allFilter`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// single category
export const categorySingle = async (id) => {
  try {
    const response = await axios.get(`${API}/singleCategory/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// category update
export const categoryUpdate = async (body={},id) => {

  try {
    const response = await axios.put(`${API}/categoryUpdate/${id}`, body );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// news post
export const postNews = async (id) => {
  try {
    const response = await axios.get(`${API}/newsFeed/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// news post tags
export const postNewsTags = async (id) => {
  try {
    const response = await axios.get(`${API}/postTags/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};


// https://api.sms.net.bd/sendsms?api_key={QRa72z0YlJt58U7gxw7WgAXNdyYw0PpeCTrsnT0l}&msg={saidul}&to=8801632663430

export const cardList = async () => {
  try {
    const response = await axios.get(`${API}/listCard`);
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};

// related shop
export const relatedShop = async (id) => {
  try {
    const response = await axios.get(`${API}/related_shop/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};