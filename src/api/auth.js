const axios = require("axios");

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

// https://api.sms.net.bd/sendsms?api_key={QRa72z0YlJt58U7gxw7WgAXNdyYw0PpeCTrsnT0l}&msg={saidul}&to=8801632663430
