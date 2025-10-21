import { useState, useEffect } from "react";
import ApiService from "../services/ApiService";

export const useInvite = () => {
    const [inviteUser, setInviteUser] = useState([]);
    const [activateAccount, setActivateAccount] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const invite_user = async (employees) => {
        try {
            setLoading(true);
            setError(null);
            const response = await ApiService.InviteUser(employees);
            setInviteUser(prev => [...prev, response]);
            return response;
        }catch(err){
            setError(err.message);
            throw err;
        }finally {
            setLoading(false);
        }
    };

    const activate_account = async (token, name, password, passwordConfirm) => {
        try{
            setLoading(true);
            const response = await ApiService.ActiveAccount(token, name, password, passwordConfirm);
            setActivateAccount(prev => [...prev, response]);
            return response;
        }catch(err) {
            setError(err.message);
            throw err;
        }finally {
            setLoading(false);
        }

    }
    return {
        inviteUser,
        activateAccount,
        loading,
        error,
        invite_user,
        activate_account,
    }
};
