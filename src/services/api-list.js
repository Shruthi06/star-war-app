import swapi from './swapi';

const api = {
    getUserDetails: (data) => (
        console.log("data",data),       
        swapi.get('/people',{
            params: { search: data.username }
        })
    ),
    getlanets: () => (
       swapi.get('/planets',{  })
    ),
    getplanetsByName: (data) => (
        console.log("data",data),       
        swapi.get('/planets',{
            params: { search: data.name }
        })
    ),
};
module.exports = api;
