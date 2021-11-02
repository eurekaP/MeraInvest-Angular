import { FormControl, AbstractControl } from '@angular/forms';

export function validateEmail(input: FormControl) {
  //let EMAIL_REGEXP = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  return ( EMAIL_REGEXP.test(input.value) || input.value == '' ) ? null : {
    validateEmail: {
      valid: false
    }
  };
}


export function validatePassword(input: FormControl) {
  let val = input.value;
  let PASS_REGEXP =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if (!PASS_REGEXP.test(val) && val != '' )  {
      return {
          invalid: true
      }
  }
  return null;
}


export function checkPassword(control: AbstractControl) {
  let pass = control.get('password')?.value;
  let confirmpassword = control.get('confirmPassword')?.value;

  if( (pass != confirmpassword) && confirmpassword != '' ) {
    return { passMismatch : true }
  } else {
      return null;
  }
}


export function validPhoneNumber(input:FormControl) {
  let PHONE_REGEXP = /^[0-9]{5,15}$/;
  return ( PHONE_REGEXP.test(input.value) || input.value == '' ) ? null : {
    validatePhone: {
      valid: false
    }
  };
}


export function validWebsite(input:FormControl) {
  let WEBSITE_REGEXP = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/;
  return ( WEBSITE_REGEXP.test(input.value) || input.value == '' ) ? null : {
    validateUrl: {
      valid: false
    }
  };
}

export function validNumber(input:FormControl) {
  let NUMBER_REGEXP = /^([a-zA-Z0-9 _-]+)$/
  ;
  return ( NUMBER_REGEXP.test(input.value) || input.value == '' ) ? null : {
    validateNumber: {
      valid: false
    }
  };
}

/*export function validDesiredListing(input:FormControl) {
  let timestamp = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
  let selectedDate = input.value;
  if (timestamp > selectedDate) {
    return  {
      validateDLDAte: {
        valid: false
      }
    };
  } else if (timestamp < selectedDate) {
      return null
  }
}*/


export function ValidAge(input:FormControl) {
  let dob:any = new Date(input.value);
  let selectedYear = dob.getFullYear();
  let currentYear = new Date().getFullYear();
  if( (currentYear - selectedYear) > 18 ) {
    return null;
  } else {
    return {
      validateAge: {
        valid: false
      }
    }
  }
}

export function validNumberWithDecimal(input:FormControl) {
  let NUMBER_REGEXP = /^(\d*\.)?\d+$/;
  return ( NUMBER_REGEXP.test(input.value) || input.value == '' ) ? null : {
    validateNumberDecimal: {
      valid: false
    }
  };
}


export function validatePrice(input: FormControl) {
  let PRICE_REGEXP = /^\d+(\.\d{1,20})?$/;
  return ( PRICE_REGEXP.test(input.value) || input.value == '' ) ? null : {
    validatePrice: {
      valid: false
    }
  };
}


export function shareValValidate(input: FormControl) {
  let shareVal = input.value;
  if( shareVal > 20 ) {
    return { shareValInvalid : true }
  } else {
      return null;
  }
}
