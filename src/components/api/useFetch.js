import {useState} from 'react';
import firebase from "firebase/app";

export default function useFetch(baseUrl) {
    const [loading, setLoading] = useState(true);

    async function getAccessToken() {
        let storedToken = sessionStorage.getItem('access_token');
        
        if (storedToken != null) {
            return storedToken;
        } else {
        let idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
              // store for later use  
              sessionStorage.setItem('access_token', idToken)
              // pass this id token in headers
              return idToken;
              
            // ..
          }).catch(function(error) {
          // handle error
          alert('not authenticated')
          return
        })
        return idToken
    }
        
    }

    async function get(url) {

        let token = await getAccessToken()
        
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url, {
                headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    setLoading(false);
                    return reject(data);
                }
                setLoading(false)
                resolve(data);
            })
            .catch(error => {
                setLoading(false);
                reject(error);
            });
        });
    }

    async function post(url, body) {

        let token = await getAccessToken()

        return new Promise((resolve, reject) => {
            fetch(baseUrl + url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    setLoading(false);
                    return reject(data);
                }
                setLoading(false)
                resolve(data);
            })
            .catch(error => {
                setLoading(false);
                reject(error);
            });
        });
    }
    
    async function put(url, body) {

        let token = await getAccessToken()

        return new Promise((resolve, reject) => {
            fetch(baseUrl + url, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    setLoading(false);
                    return reject(data);
                }
                setLoading(false)
                resolve(data);
            })
            .catch(error => {
                setLoading(false);
                reject(error);
            });
        });
    }
    return {get,post,put,loading}
}
