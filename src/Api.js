export const ENDPOINT_VENUE = '/venues';

const Api = ({ url, instance = '', queryString = '', method, data = null }) => {
  const apiUrl = (window.API_URL || 'http://tennisfolder.com/api') + '/v1'; 
  
  return new Promise((resolve, reject) => {
    const ajaxParams = {
      url: apiUrl + url,
      type: method,
      data, 
      success: (response) => {
        console.log('full response from server ' + response);
        if ( response.trim().length)
          resolve(JSON.parse(response).data);
        resolve();
      },
      error: (error) => {
        console.warn('Server error:' + error);
        reject(error);
      }
    };

    if ( data) {
      if ( method == 'GET' ) {
        ajaxParams.data = data;
      } else {
        ajaxParams.data = JSON.stringify(data);
        ajaxParams.dataType = 'text';
      } 
    }
    jQuery.ajax(ajaxParams);
  });
};

export default Api;
