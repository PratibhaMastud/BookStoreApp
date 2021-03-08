import axios from "axios";
import apiConstant from '../apiConstants/UserApiConstants';

export function getBook(){
    try{
        const response = axios.get(process.env.REACT_APP_USER_URL+apiConstant.getBookPath);
        return response;
    }
    catch(error){
        return error;
    }
}

export function addToCard(book_id){
    try{
        const response = axios.post(process.env.REACT_APP_USER_URL+apiConstant.addCard+book_id,null,
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                  },
            });
        return response;
    }
    catch(error){
        return error;
    }
}
export function getAddedBook(){
    try{
        const response = axios.get(process.env.REACT_APP_USER_URL+apiConstant.getaddedBook,
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                  },
            }
            );
        return response;
    }
    catch(error){
        return error;
    }
}

export function cartItemQuantity(id,data){
    try{
        const response = axios.put(process.env.REACT_APP_USER_URL+apiConstant.cart_quantity+id,data, {
            headers: {
                'x-access-token': localStorage.getItem('token')
              },
        }
        );
        return response;
    }
    catch(error){
        return error;
    }
}
export function removeCartItem(id){
    try{
        const response = axios.delete(process.env.REACT_APP_USER_URL+apiConstant.remove_cart+id, {
            headers: {
                'x-access-token': localStorage.getItem('token')
              },
        }
        );
        return response;
    }
    catch(error){
        return error;
    }
}
export function orderAdd(user){
    try{
        const response = axios.delete(process.env.REACT_APP_USER_URL+apiConstant.addOrder,user, {
            headers: {
                'x-access-token': localStorage.getItem('token')
              },
        }
        );
        return response;
    }
    catch(error){
        return error;
    }
}


export function addWishList(id){
    try{
        const response = axios.post(process.env.REACT_APP_USER_URL+apiConstant.add_wishList+id,null, {
            headers: {
                'x-access-token': localStorage.getItem('token')
              },
        });
        return response;
    }
    catch(error){
        return error;
    }
}
export function removeWishList(id){
    try{
        const response = axios.delete(process.env.REACT_APP_USER_URL+apiConstant.removerWishList+id, {
            headers: {
                'x-access-token': localStorage.getItem('token')
              },
        });
        return response;
    }
    catch(error){
        return error;
    }
}
export function getWishList(){
    try{
        const response = axios.get(process.env.REACT_APP_USER_URL+apiConstant.get_wishList,
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                  },
            })
        return response;
    }
    catch(error){
        return error;
    }
}
export function placeOrder(orders){
    try{
        const response = axios.post(process.env.REACT_APP_USER_URL+apiConstant.addOrder,orders,
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                  },
            })
        return response;
    }
    catch(error){
        return error;
    }
}