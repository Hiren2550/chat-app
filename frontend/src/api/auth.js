import api from "./Api";

export const handleData = async () => {
  try {
    const data = await api.get("/user");
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
