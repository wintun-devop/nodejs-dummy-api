import bcrypt from 'bcrypt';

// make hashing
export const createHash = async (input: string) => {
    return bcrypt.hash(input, 10).then( (hash: string)=> {
      return hash;
    });
}

// checking hash
export const  checkHash = async (unHashInput: string | Buffer, hashInput: string )=>{
    return bcrypt.compare(unHashInput, hashInput).then( (result: Boolean)=> {
        return result;
    });
}