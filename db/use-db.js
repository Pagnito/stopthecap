import user from './mongo-realm';

const useEmail = () => {
    const insertEmail = async (email) => {
        let result = user.functions.insertEmail(email);
        return result;
    }
 
    return {
        insertEmail
    };
}

export default useEmail