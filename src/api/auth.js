import { API } from '../config';
const axios = require("axios");
// signup
export const registerUser = async (mobile, password) => {
  try {
    const response = await axios.post(`${API}/userCreate`, {
      mobile: mobile,
      password: password,
    });

    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
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
export const categoryAdd = async (categoryName) => {
  try {
    const response = await axios.post(`${API}/category`, {
      categoryName: categoryName,
    });
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
export const subCategoryAdd = async (categoryName, subCategoryName) => {
  try {
    const response = await axios.post(`${API}/subcategory`, {
      categoryName: categoryName,
      subCategoryName: subCategoryName,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// sub category list
export const subCategoryList = async (categoryName) => {
  try {
    const response = await axios.post(`${API}/subcategorylist`, {
      categoryName: categoryName,
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
export const shopCreate = async (shop) => {
  try {
    const response = await axios.post(`${API}/create`, { shop});
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// sub category shop list
export const subCategoryShopList = async (subCategoryName) => {
  try {
    const response = await axios.post(`${API}/AllShopList`, {
      subCategoryName: subCategoryName,
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
// https://api.sms.net.bd/sendsms?api_key={QRa72z0YlJt58U7gxw7WgAXNdyYw0PpeCTrsnT0l}&msg={saidul}&to=8801632663430
