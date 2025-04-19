interface IResultValidation {
    result: boolean;
    message: string;
}

type TValidateFunction = (data: any) => IResultValidation

type TValidateFC = (data: any, validateFunctionList: TValidateFunction[]) => IResultValidation;

export const validateEmail = (data: {email: string}) => {
    const message = {
        error: 'Email is not valid',
        success: 'Success'
    }

    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const result = reg.test(data.email) 
                    ? {result: true, message: message.success} 
                    : {result: false, message: message.error}

    return result;
}

export const validatePassword = (data: {password: string}) => {
    const message = {
        error: 'Password is not valid.',
        success: 'Success'
    }

    const params = {
        minlength: 5,
        maxLength: 20
    }

    const passWithoutSpace = data.password.trim();

    const validatinLength = params.minlength < passWithoutSpace.length && passWithoutSpace.length < params.maxLength;

    const result = validatinLength 
                    ? {result: true, message: message.success} 
                    : {result: false, message: message.error}

    return result;
  }

export const validateEmptyArea = (data: Record<string, unknown>) => {
    const message = {
        error: 'Empty areas!',
        success: 'Success'
    }

    const resultValidationAreas = Object.values(data).filter(item => {
        if(!item) return true
    })
    
    const result = !resultValidationAreas.length 
                     ? {result: true, message: message.success} 
                     : {result: false, message: message.error}
    
    return result;
}

const validateForm: TValidateFC = (data, validateFunctionList) => {
    const messageValidationList: string[] = [];

    const resultValidationList = validateFunctionList.map((validateFC) => validateFC(data))

    resultValidationList.forEach(resultValidation => {
        if(!resultValidation.result) messageValidationList.push(resultValidation.message)
    })

    const messageValidation = messageValidationList.join(' ');

    const resultValidation = messageValidationList.length === 0 
                              ? {result: true, message: 'Success'} 
                              : {result: false, message: messageValidation}

    return resultValidation;
}

export { validateForm }