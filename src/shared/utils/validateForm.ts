interface IData {
    email?: string;
    password?: string;
}

interface IResultValidation {
    result: boolean;
    message: string;
}

type TValidateFunction = (data: any) => ({ result: boolean; message: string; })

type TValidateFC = (data: IData, validateFunctionList: TValidateFunction[]) => IResultValidation;

export const validateEmail = (data: {email: string}) => {
    const messageError = 'Email is not valid.'
    const messageSuccess = 'Success'

    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = reg.test(data.email) ? {result: true, message: messageSuccess} : {result: false, message: messageError}

    return result;
}

export const validatePassword = (data: {password: string}) => {
    const messageError = 'Password is not valid.'
    const messageSuccess = 'Success'
    const minlength = 5;
    const maxLength = 20;

    const passWithoutSpace = data.password.trim();

    const validatinLength = minlength < passWithoutSpace.length && passWithoutSpace.length < maxLength;

    const result = validatinLength ? {result: true, message: messageSuccess} : {result: false, message: messageError}

    return result;
  }

const validateForm: TValidateFC = (data, validateFunctionList) => {
    const messageValidationList: string[] = [];

    const resultValidationList = validateFunctionList.map((validateFC) => validateFC(data))

    resultValidationList.forEach(resultValidation => {
        if(!resultValidation.result) messageValidationList.push(resultValidation.message)
    })

    const messageValidation = messageValidationList.join(' ');

    const resultValidation = messageValidationList.length === 0 ? {result: true, message: 'Success'} : {result: false, message: messageValidation}

    return resultValidation;
}

export { validateForm }