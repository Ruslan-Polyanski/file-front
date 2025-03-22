interface IParams {
    email?: string;
    password?: string;
}

interface IResultValidation {
    result: boolean;
    message: string;
}

type TValidateFC = (params: IParams) => IResultValidation;

const validateEmail = (email: string) => {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(email) == false) return false;
    return true;
}

const validatePassword = (password: string) => {
    const minlength = 5;
    const maxLength = 20;
    const passWithoutSpace = password.trim();
    const result = minlength < passWithoutSpace.length && passWithoutSpace.length < maxLength;
    return result;
  }

const validateForm: TValidateFC = ({email, password}) => {
    const messageValidationList: string[] = [];

    if(email !== undefined && !validateEmail(email)) messageValidationList.push('Email is not valid.')
    if(password !== undefined && !validatePassword(password)) messageValidationList.push('Password is not valid.')

    const messageValidation = messageValidationList.join(' ');

    const resultValidation = messageValidation.length === 0 ? {result: true, message: 'Success'} : {result: false, message: messageValidation}

    return resultValidation;
}

export { validateForm }