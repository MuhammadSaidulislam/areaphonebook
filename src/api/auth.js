const axios = require("axios");
// signup
export const registerUser = async (mobile, password) => {
  try {
    const response = await axios.post("http://localhost:8000/userCreate", {
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
    const response = await axios.post("http://localhost:8000/login", {
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
    const response = await axios.post("http://localhost:8000/category", {
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
    const response = await axios.get(`http://localhost:8000/categoryList`);
    return response.data;
    // console.log(response.data);
  } catch (error) {
    return error.response.data;
  }
};
// sub category add
export const subCategoryAdd = async (categoryName, subCategoryName) => {
  try {
    const response = await axios.post("http://localhost:8000/subcategory", {
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
    const response = await axios.post("http://localhost:8000/subcategorylist", {
      categoryName: categoryName,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// shop create
export const shopCreate = async (shop) => {
  try {
    const response = await axios.post("http://localhost:8000/create", { shop});
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// https://api.sms.net.bd/sendsms?api_key={QRa72z0YlJt58U7gxw7WgAXNdyYw0PpeCTrsnT0l}&msg={saidul}&to=8801632663430
