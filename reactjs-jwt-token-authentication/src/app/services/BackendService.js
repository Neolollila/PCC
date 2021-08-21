import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});

class BackendService {
  async getUserBoard() {
    return await axios.get("/api/test/user");
  }


  async getAdminBoard() {
    return await axios.get("/api/test/admin");
  }

  async getThemeList() {
    return await axios.get("/api/collection/theme");
  }
  async addNewCollection(data) {
    return await axios.post("/api/collection/new",data);
  }

  async getCurrentUserCollections() {
    return await axios.get("/api/collection/user");
  }

  async removeCollectionById(id){
    return await axios.delete(`/api/collection/delete/${id}`);
  }

  // async removeUserById(id) {
  //   return await axios.delete(`/user/${id}`);
  // }
}

export default new BackendService();